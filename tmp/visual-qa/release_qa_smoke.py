from __future__ import annotations

import asyncio
import json
import os
import re
from pathlib import Path

from playwright.async_api import TimeoutError as PlaywrightTimeoutError
from playwright.async_api import async_playwright


BASE_URL = os.environ.get("QA_BASE_URL", "http://127.0.0.1:8123")
OUT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = OUT_DIR.parent.parent
SHARE_DIR = PROJECT_ROOT / "share"
SHARE_DATA_PATH = SHARE_DIR / "share-pages-data.json"
SHARE_MANIFEST_PATH = SHARE_DIR / "share-pages.json"
INSTAGRAM_EXPORT_SCRIPT_PATH = SHARE_DIR / "instagram-export.js"
RESULT_PATH = OUT_DIR / "release-qa-results.json"
REQUIRED_ROOT_FILES = (
    "index.html",
    "chronik.html",
    "datenschutz.html",
    "impressum.html",
    "robots.txt",
    "sitemap.xml",
)
BROWSER_LAUNCH_CONFIGS = {
    "chromium": {
        "browser_type": "chromium",
        "launch_options": {"headless": True},
        "label": "Chromium",
    },
    "msedge": {
        "browser_type": "chromium",
        "launch_options": {"channel": "msedge", "headless": True},
        "label": "Microsoft Edge",
    },
    "chrome": {
        "browser_type": "chromium",
        "launch_options": {"channel": "chrome", "headless": True},
        "label": "Google Chrome",
    },
    "firefox": {
        "browser_type": "firefox",
        "launch_options": {"headless": True},
        "label": "Firefox",
    },
}

COOKIE_CONSENT_DIALOG_SELECTOR = "#cookiescript_injected_wrapper, #cookiescript_injected, #cookiescript_injected_fsd, #cookiescript_fsd_wrapper"
COOKIE_CONSENT_DISMISS_SELECTORS = (
    "#cookiescript_reject",
    "#cookiescript_accept",
    "#cookiescript_close",
)


def should_fail_on_issues():
    return os.environ.get("QA_FAIL_ON_ISSUES", "").strip().lower() in {"1", "true", "yes", "on"}


def add_issue(issues, severity, area, message):
    issues.append(
        {
            "severity": severity,
            "area": area,
            "message": message,
        }
    )


def load_canonical_share_pages(issues):
    if not SHARE_DATA_PATH.is_file():
        add_issue(issues, "high", "release-files", f"Missing share data source: {SHARE_DATA_PATH.relative_to(PROJECT_ROOT)}")
        return None

    try:
        data = json.loads(SHARE_DATA_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        add_issue(issues, "high", "release-files", f"Invalid share data JSON: {error}")
        return None

    entries = data.get("pages")
    if not isinstance(entries, list):
        add_issue(issues, "high", "release-files", "share/share-pages-data.json must expose a 'pages' array")
        return None

    filenames = []

    for entry in entries:
        if not isinstance(entry, dict):
            add_issue(issues, "high", "release-files", "share/share-pages-data.json contains a non-object page entry")
            return None

        filename = entry.get("filename")
        if not isinstance(filename, str) or not filename.endswith(".html"):
            add_issue(issues, "high", "release-files", "share/share-pages-data.json contains a page without a valid HTML filename")
            return None

        filenames.append(filename)

    if len(filenames) != len(set(filenames)):
        add_issue(issues, "medium", "release-files", "share/share-pages-data.json contains duplicate filenames")

    return filenames


def load_share_manifest(issues):
    if not SHARE_MANIFEST_PATH.is_file():
        add_issue(issues, "high", "release-files", f"Missing share manifest: {SHARE_MANIFEST_PATH.relative_to(PROJECT_ROOT)}")
        return None

    try:
        manifest = json.loads(SHARE_MANIFEST_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as error:
        add_issue(issues, "high", "release-files", f"Invalid share manifest JSON: {error}")
        return None

    pages = manifest.get("pages")
    if not isinstance(pages, list) or not all(isinstance(page, str) and page.endswith(".html") for page in pages):
        add_issue(issues, "high", "release-files", "share/share-pages.json must expose a 'pages' array of HTML filenames")
        return None

    if len(pages) != len(set(pages)):
        add_issue(issues, "medium", "release-files", "share/share-pages.json contains duplicate page entries")

    return pages


def load_instagram_export_fallback_pages(issues):
    if not INSTAGRAM_EXPORT_SCRIPT_PATH.is_file():
        add_issue(
            issues,
            "high",
            "release-files",
            f"Missing Instagram export script: {INSTAGRAM_EXPORT_SCRIPT_PATH.relative_to(PROJECT_ROOT)}",
        )
        return None

    source = INSTAGRAM_EXPORT_SCRIPT_PATH.read_text(encoding="utf-8")
    match = re.search(r"const FALLBACK_SHARE_PAGES = \[(.*?)\];", source, re.S)

    if match is None:
        add_issue(issues, "high", "release-files", "Could not parse FALLBACK_SHARE_PAGES from share/instagram-export.js")
        return None

    return re.findall(r'"([^"\\]+\.html)"', match.group(1))


def validate_release_files(issues):
    for relative_path in REQUIRED_ROOT_FILES:
        if not (PROJECT_ROOT / relative_path).is_file():
            add_issue(issues, "high", "release-files", f"Missing required file: {relative_path}")

    robots_path = PROJECT_ROOT / "robots.txt"
    if robots_path.is_file():
        robots_text = robots_path.read_text(encoding="utf-8")
        if "Sitemap:" not in robots_text:
            add_issue(issues, "medium", "release-files", "robots.txt does not declare a sitemap")

    canonical_pages = load_canonical_share_pages(issues)
    manifest_pages = load_share_manifest(issues)
    fallback_pages = load_instagram_export_fallback_pages(issues)

    if canonical_pages is not None:
        missing_share_files = sorted(page for page in canonical_pages if not (SHARE_DIR / page).is_file())
        if missing_share_files:
            add_issue(
                issues,
                "high",
                "release-files",
                f"Share pages declared in share/share-pages-data.json are missing generated HTML files: {', '.join(missing_share_files)}",
            )

    if canonical_pages is not None and manifest_pages is not None and manifest_pages != canonical_pages:
        missing_manifest_entries = [page for page in canonical_pages if page not in manifest_pages]
        unexpected_manifest_entries = [page for page in manifest_pages if page not in canonical_pages]
        manifest_drift = []

        if missing_manifest_entries:
            manifest_drift.append(f"missing: {', '.join(missing_manifest_entries)}")

        if unexpected_manifest_entries:
            manifest_drift.append(f"unexpected: {', '.join(unexpected_manifest_entries)}")

        add_issue(
            issues,
            "medium",
            "release-files",
            "share/share-pages.json is out of sync with share/share-pages-data.json"
            + (f" ({'; '.join(manifest_drift)})" if manifest_drift else ""),
        )

    if canonical_pages is not None and fallback_pages is not None and fallback_pages != canonical_pages:
        missing_fallback_entries = [page for page in canonical_pages if page not in fallback_pages]
        unexpected_fallback_entries = [page for page in fallback_pages if page not in canonical_pages]
        fallback_drift = []

        if missing_fallback_entries:
            fallback_drift.append(f"missing: {', '.join(missing_fallback_entries)}")

        if unexpected_fallback_entries:
            fallback_drift.append(f"unexpected: {', '.join(unexpected_fallback_entries)}")

        add_issue(
            issues,
            "medium",
            "release-files",
            "FALLBACK_SHARE_PAGES in share/instagram-export.js is out of sync with share/share-pages-data.json"
            + (f" ({'; '.join(fallback_drift)})" if fallback_drift else ""),
        )

    if manifest_pages is not None:
        missing_manifest_files = sorted(page for page in manifest_pages if not (SHARE_DIR / page).is_file())
        if missing_manifest_files:
            add_issue(
                issues,
                "high",
                "release-files",
                f"Manifest entries without matching share file: {', '.join(missing_manifest_files)}",
            )

    if manifest_pages is not None and fallback_pages is not None and manifest_pages != fallback_pages:
        add_issue(
            issues,
            "medium",
            "release-files",
            "share/share-pages.json and FALLBACK_SHARE_PAGES in share/instagram-export.js are out of sync",
        )


def attach_page_monitors(page, issues, page_name):
    def handle_console(message):
        if message.type == "error":
            add_issue(issues, "high", page_name, f"Console error: {message.text}")

    def handle_page_error(error):
        add_issue(issues, "high", page_name, f"Page error: {error}")

    page.on("console", handle_console)
    page.on("pageerror", handle_page_error)


async def wait_visible(page, selector, label, issues, timeout=8000):
    try:
        await page.locator(selector).first.wait_for(state="visible", timeout=timeout)
        return True
    except PlaywrightTimeoutError:
        add_issue(issues, "high", label, f"Selector not visible: {selector}")
        return False


async def first_visible_text(page, selector):
    return await page.evaluate(
        r"""
        (query) => {
            const nodes = Array.from(document.querySelectorAll(query));
            const visibleNode = nodes.find((node) => {
                if (node.hidden || node.closest('[hidden]')) {
                    return false;
                }

                const style = window.getComputedStyle(node);
                return style.display !== 'none' && style.visibility !== 'hidden';
            });

            return visibleNode ? visibleNode.textContent.replace(/\s+/g, ' ').trim() : '';
        }
        """,
        selector,
    )


async def save_page_screenshot(page, screenshot_path, screenshots, browser_target):
    screenshot_options = {"path": str(screenshot_path)}

    if browser_target != "firefox":
        screenshot_options["full_page"] = True

    await page.screenshot(**screenshot_options)
    screenshots.append(str(screenshot_path))


async def dismiss_cookie_consent(page, timeout=1000):
    dialog = page.locator(COOKIE_CONSENT_DIALOG_SELECTOR).first

    try:
        await dialog.wait_for(state="visible", timeout=timeout)
    except PlaywrightTimeoutError:
        return

    for selector in COOKIE_CONSENT_DISMISS_SELECTORS:
        control = page.locator(selector).first
        if await control.count() == 0:
            continue

        try:
            if not await control.is_visible():
                continue
        except PlaywrightTimeoutError:
            continue

        try:
            await control.click(timeout=5000)
        except PlaywrightTimeoutError:
            await control.evaluate("node => node.click()")

        break

    try:
        await page.wait_for_function(
            """
            (selector) => {
                const nodes = Array.from(document.querySelectorAll(selector));
                if (nodes.length === 0) {
                    return true;
                }

                return nodes.every((node) => {
                    if (!(node instanceof HTMLElement)) {
                        return true;
                    }

                    if (node.hidden || node.getAttribute('aria-hidden') === 'true') {
                        return true;
                    }

                    const style = window.getComputedStyle(node);
                    return style.display === 'none' || style.visibility === 'hidden' || style.pointerEvents === 'none';
                });
            }
            """,
            arg=COOKIE_CONSENT_DIALOG_SELECTOR,
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        await page.evaluate(
            """
            (selector) => {
                document.querySelectorAll(selector).forEach((node) => {
                    if (!(node instanceof HTMLElement)) {
                        return;
                    }

                    node.style.setProperty('display', 'none', 'important');
                    node.style.setProperty('pointer-events', 'none', 'important');
                    node.setAttribute('aria-hidden', 'true');
                });
            }
            """,
            COOKIE_CONSENT_DIALOG_SELECTOR,
        )


async def safe_click(page, locator, timeout=5000):
    await dismiss_cookie_consent(page)
    await locator.scroll_into_view_if_needed()

    try:
        await locator.click(timeout=timeout)
    except PlaywrightTimeoutError:
        await dismiss_cookie_consent(page, timeout=3000)
        await locator.evaluate("node => node.scrollIntoView({ block: 'center', inline: 'nearest' })")

        try:
            await locator.click(timeout=timeout)
        except PlaywrightTimeoutError:
            await locator.evaluate("node => node.click()")


def get_requested_browser_targets():
    raw_targets = os.environ.get("QA_BROWSER_TARGETS", "auto")
    requested_targets = []

    for raw_target in raw_targets.split(","):
        target = raw_target.strip().lower()
        if not target:
            continue

        if target != "auto" and target not in BROWSER_LAUNCH_CONFIGS:
            raise ValueError(f"Unsupported QA browser target: {target}")

        requested_targets.append(target)

    return requested_targets or ["auto"]


async def launch_browser(playwright, requested_target):
    if requested_target == "auto":
        last_error = None
        for fallback_target in ("msedge", "chrome"):
            try:
                return await launch_browser(playwright, fallback_target)
            except Exception as error:  # noqa: BLE001
                last_error = error

        raise RuntimeError(f"Unable to launch an installed Chromium browser: {last_error}")

    browser_config = BROWSER_LAUNCH_CONFIGS[requested_target]
    browser_type = getattr(playwright, browser_config["browser_type"])
    browser = await browser_type.launch(**browser_config["launch_options"])
    return browser, requested_target


def scope_name(browser_target, name):
    return f"{browser_target}:{name}"


def get_device_context_options(browser_target, device):
    context_options = dict(device)

    if browser_target == "firefox":
        context_options.pop("isMobile", None)
        context_options.pop("is_mobile", None)

    return context_options


async def check_index_desktop(browser, issues, screenshots, browser_target):
    context = await browser.new_context(viewport={"width": 1440, "height": 1100}, locale="de-DE")
    page = await context.new_page()
    attach_page_monitors(page, issues, scope_name(browser_target, "index-desktop"))

    await page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    await page.wait_for_timeout(1200)
    await dismiss_cookie_consent(page)

    for selector, label in (
        (".navbar", "index-desktop navigation"),
        (".hero-bg", "index-desktop hero"),
        ("footer", "index-desktop footer"),
    ):
        await wait_visible(page, selector, scope_name(browser_target, label), issues)

    desktop_shot = OUT_DIR / f"index-release-desktop-{browser_target}.png"
    await save_page_screenshot(page, desktop_shot, screenshots, browser_target)

    await safe_click(page, page.locator("#langEn"))
    await page.wait_for_timeout(250)

    visible_review_label = await first_visible_text(page, 'a[href="#review"][data-lang]')
    if visible_review_label != "Review":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop language"),
            f"Expected English review label, got: {visible_review_label or '[empty]'}",
        )

    visible_hero_title = await first_visible_text(page, ".image-caption-title[data-lang]")
    if visible_hero_title != "Music builds bridges":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop language"),
            f"Expected English hero title, got: {visible_hero_title or '[empty]'}",
        )

    visible_video_kicker = await first_visible_text(page, ".image-caption-video-kicker[data-lang]")
    if visible_video_kicker != "Anniversary film":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop intro"),
            f"Expected English anniversary film kicker, got: {visible_video_kicker or '[empty]'}",
        )

    visible_founder_subtitle = await first_visible_text(page, ".about-me-modern-subtitle[data-lang]")
    if visible_founder_subtitle != "Founder of Collegium Musicum Iuvenale":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop about"),
            f"Expected English founder subtitle, got: {visible_founder_subtitle or '[empty]'}",
        )

    visible_founder_bio = await first_visible_text(page, ".about-me-bio-text[data-lang]")
    if not visible_founder_bio.startswith("Astrid Eitschberger learned piano, cello"):
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop about"),
            f"Expected English founder bio lead, got: {visible_founder_bio or '[empty]'}",
        )

    event_card_count = await page.locator(".event-card").count()
    if event_card_count < 1:
        visible_event_empty_state = await first_visible_text(page, ".event-empty-state [data-lang]")
        if visible_event_empty_state != "No upcoming concerts are currently published. New dates will appear here as soon as they are confirmed.":
            add_issue(
                issues,
                "medium",
                scope_name(browser_target, "index-desktop events"),
                "Expected event empty state when no event cards are published, got: "
                f"{visible_event_empty_state or '[empty]'}",
            )

    visible_event_title = await first_visible_text(page, ".event-title[data-lang]")
    if visible_event_title != "Upcoming Events":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop events"),
            f"Expected English event title, got: {visible_event_title or '[empty]'}",
        )

    visible_event_poster_hint = await first_visible_text(page, ".event-poster-hint-text[data-lang]")
    if event_card_count > 0 and visible_event_poster_hint != "Tap or click to enlarge":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop events"),
            f"Expected English event poster hint, got: {visible_event_poster_hint or '[empty]'}",
        )

    visible_news_feed_title = await first_visible_text(page, ".news-feed-title[data-lang]")
    if visible_news_feed_title != "Current Highlights from CMI":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop news-feed"),
            f"Expected English news feed title, got: {visible_news_feed_title or '[empty]'}",
        )

    visible_news_feed_featured = await first_visible_text(
        page,
        ".news-feed-grid .news-feed-card:first-child .news-feed-card-title [data-lang]",
    )
    if visible_news_feed_featured != "Workshop with Florian Meierott":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop news-feed"),
            f"Expected English first news feed card title, got: {visible_news_feed_featured or '[empty]'}",
        )

    visible_news_feed_cards = await page.locator(".news-feed-grid .news-feed-card").count()
    if visible_news_feed_cards != 6:
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop news-feed"),
            f"Expected 6 news feed cards, got: {visible_news_feed_cards}",
        )

    news_feed_link = page.locator(".news-feed-grid .news-feed-card:first-child .news-feed-card-link")
    await news_feed_link.scroll_into_view_if_needed()
    news_feed_scroll_before = await page.evaluate("() => window.scrollY")
    await safe_click(page, news_feed_link)

    try:
        await page.wait_for_function(
            "() => window.location.hash === '#review-masterclass-florian-meierott'",
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "index-desktop news-feed"),
            "News feed detail navigation did not update the review hash",
        )

    try:
        await page.wait_for_function(
            """
            () => {
                const section = document.getElementById('review-masterclass-florian-meierott');
                if (!section) {
                    return false;
                }

                const rect = section.getBoundingClientRect();
                return rect.top >= 0 && rect.top < (window.innerHeight * 0.45);
            }
            """,
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "index-desktop news-feed"),
            "News feed detail navigation did not scroll the selected review section into view",
        )

    visible_review_back_label = await first_visible_text(
        page,
        "#review-masterclass-florian-meierott .review-return-link [data-lang]",
    )
    if visible_review_back_label != "Back to latest":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop news-feed"),
            f"Expected English review back label, got: {visible_review_back_label or '[empty]'}",
        )

    await page.go_back()
    try:
        await page.wait_for_function(
            "expected => Math.abs(window.scrollY - expected) < 80",
            arg=news_feed_scroll_before,
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        restored_scroll = await page.evaluate("() => window.scrollY")
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "index-desktop news-feed"),
            f"Browser back did not restore the previous news feed position (expected about {news_feed_scroll_before:.0f}, got {restored_scroll:.0f})",
        )

    visible_contact_title = await first_visible_text(page, ".contact-info-title[data-lang]")
    if visible_contact_title != "Contact":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop contact"),
            f"Expected English contact title, got: {visible_contact_title or '[empty]'}",
        )

    visible_contact_cta = await first_visible_text(page, ".contact-info-primary-link")
    if visible_contact_cta != "Send an email":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop contact"),
            f"Expected English contact CTA, got: {visible_contact_cta or '[empty]'}",
        )

    visible_footer_events_link = await first_visible_text(page, ".site-footer__link[href='#events']")
    if visible_footer_events_link != "Concerts":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-desktop footer"),
            f"Expected English footer events link, got: {visible_footer_events_link or '[empty]'}",
        )

    current_before = (await page.locator("#heroGalleryCurrent").text_content() or "").strip()
    await safe_click(page, page.locator(".hero-gallery-control--next"))
    try:
        await page.wait_for_function(
            "previous => (document.getElementById('heroGalleryCurrent')?.textContent || '').trim() !== previous",
            arg=current_before,
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "hero-gallery"),
            "Next button did not advance the hero gallery counter",
        )

    pagination_count = await page.locator(".hero-gallery-pagination button, .hero-gallery-pagination [role='tab']").count()
    if pagination_count < 2:
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "hero-gallery"),
            "Hero gallery pagination did not render enough controls",
        )

    if await page.locator(".event-lightbox-trigger").count() > 0:
        trigger = page.locator(".event-lightbox-trigger").first
        await trigger.scroll_into_view_if_needed()
        await safe_click(page, trigger)
        if await wait_visible(page, "#eventLightboxModal", scope_name(browser_target, "event-lightbox open"), issues, timeout=5000):
            await page.keyboard.press("Escape")
            try:
                await page.locator("#eventLightboxModal").wait_for(state="hidden", timeout=5000)
            except PlaywrightTimeoutError:
                add_issue(
                    issues,
                    "high",
                    scope_name(browser_target, "event-lightbox"),
                    "Lightbox did not close on Escape",
                )

            active_class_name = await page.evaluate("() => document.activeElement ? document.activeElement.className : ''")
            if "event-lightbox-trigger" not in active_class_name and "event-poster-image" not in active_class_name:
                add_issue(
                    issues,
                    "medium",
                    scope_name(browser_target, "event-lightbox"),
                    f"Focus was not restored to a poster trigger after close: {active_class_name!r}",
                )

    archive_toggle = page.locator(".review-archive-toggle")
    await archive_toggle.scroll_into_view_if_needed()
    await safe_click(page, archive_toggle)
    try:
        await page.wait_for_function(
            "() => { const archive = document.getElementById('reviewArchive'); return archive && !archive.hidden; }",
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "review-archive"),
            "Archive did not open after toggle",
        )

    first_review_toggle = page.locator(".review-card-toggle").first
    if await first_review_toggle.count() == 0:
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "review-archive"),
            "No review card toggle found inside the archive",
        )
    else:
        await safe_click(page, first_review_toggle)
        if await first_review_toggle.get_attribute("aria-expanded") != "true":
            add_issue(
                issues,
                "medium",
                scope_name(browser_target, "review-archive"),
                "Review card did not expand on first toggle",
            )
        await safe_click(page, first_review_toggle)
        if await first_review_toggle.get_attribute("aria-expanded") != "false":
            add_issue(
                issues,
                "medium",
                scope_name(browser_target, "review-archive"),
                "Review card did not collapse on second toggle",
            )

    hash_page = await context.new_page()
    attach_page_monitors(hash_page, issues, scope_name(browser_target, "index-hash-review"))
    await hash_page.goto(f"{BASE_URL}/index.html#review", wait_until="domcontentloaded")
    await hash_page.wait_for_timeout(900)
    hash_state = await hash_page.evaluate(
        """
        () => {
            const target = document.getElementById('review');
            if (!target) {
                return { found: false, top: null, scrollY: window.scrollY, innerHeight: window.innerHeight };
            }

            const rect = target.getBoundingClientRect();
            return { found: true, top: rect.top, scrollY: window.scrollY, innerHeight: window.innerHeight };
        }
        """
    )
    if not hash_state.get("found"):
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "hash-navigation"),
            "Review section was not found for hash navigation",
        )
    elif hash_state.get("scrollY", 0) <= 0 or hash_state.get("top", 99999) > hash_state.get("innerHeight", 0):
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "hash-navigation"),
            f"Hash navigation did not bring the review section into view cleanly: {hash_state}",
        )

    await hash_page.close()
    await context.close()


async def check_index_mobile(browser, issues, screenshots, browser_target, device):
    context = await browser.new_context(**get_device_context_options(browser_target, device), locale="de-DE")
    page = await context.new_page()
    attach_page_monitors(page, issues, scope_name(browser_target, "index-mobile"))

    await page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    await page.wait_for_timeout(1200)
    await dismiss_cookie_consent(page)

    mobile_button = page.locator(".mobile-menu-btn")
    await safe_click(page, mobile_button)

    try:
        await page.wait_for_function(
            "() => document.querySelector('.mobile-menu-btn')?.getAttribute('aria-expanded') === 'true'",
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "mobile-navigation"),
            "Mobile menu button did not switch to expanded=true",
        )

    if not await page.locator(".mobile-menu.active").is_visible():
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "mobile-navigation"),
            "Mobile menu did not become visibly active",
        )

    await page.keyboard.press("Escape")
    try:
        await page.wait_for_function(
            "() => document.querySelector('.mobile-menu-btn')?.getAttribute('aria-expanded') === 'false'",
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "mobile-navigation"),
            "Mobile menu did not close on Escape",
        )

    mobile_shot = OUT_DIR / f"index-release-mobile-{browser_target}.png"
    await save_page_screenshot(page, mobile_shot, screenshots, browser_target)

    await context.close()


async def check_index_tablet(browser, issues, screenshots, browser_target, device):
    context = await browser.new_context(**get_device_context_options(browser_target, device), locale="de-DE")
    page = await context.new_page()
    attach_page_monitors(page, issues, scope_name(browser_target, "index-tablet"))

    await page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    await page.wait_for_timeout(1200)
    await dismiss_cookie_consent(page)

    for selector, label in (
        (".navbar", "index-tablet navigation"),
        (".hero-bg", "index-tablet hero"),
        (".news-feed-section", "index-tablet news"),
        (".event-section", "index-tablet events"),
    ):
        await wait_visible(page, selector, scope_name(browser_target, label), issues)

    await safe_click(page, page.locator("#langEn"))
    await page.wait_for_timeout(250)

    visible_contact_title = await first_visible_text(page, ".contact-info-title[data-lang]")
    if visible_contact_title != "Contact":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "index-tablet language"),
            f"Expected English contact title on tablet, got: {visible_contact_title or '[empty]'}",
        )

    tablet_shot = OUT_DIR / f"index-release-tablet-portrait-{browser_target}.png"
    await save_page_screenshot(page, tablet_shot, screenshots, browser_target)

    await context.close()


async def check_subpage(browser, issues, screenshots, browser_target, path_name, page_name, unique_selector, expected_title):
    context = await browser.new_context(viewport={"width": 1440, "height": 1100}, locale="de-DE")
    page = await context.new_page()
    attach_page_monitors(page, issues, scope_name(browser_target, page_name))

    await page.goto(f"{BASE_URL}/{path_name}", wait_until="domcontentloaded")
    await page.wait_for_timeout(1000)
    await dismiss_cookie_consent(page)

    await wait_visible(page, ".subpage-topbar", scope_name(browser_target, f"{page_name} topbar"), issues)
    await wait_visible(page, unique_selector, scope_name(browser_target, f"{page_name} main content"), issues)

    if await page.locator("#langEn").count() > 0:
        await safe_click(page, page.locator("#langEn"))
        await page.wait_for_timeout(250)
        visible_title = await first_visible_text(page, ".subpage-hero__title[data-lang]")
        if visible_title != expected_title:
            add_issue(
                issues,
                "medium",
                scope_name(browser_target, page_name),
                f"English hero title mismatch after language switch: {visible_title or '[empty]'}",
            )

    screenshot_path = OUT_DIR / f"{page_name}-{browser_target}.png"
    await save_page_screenshot(page, screenshot_path, screenshots, browser_target)
    await context.close()


async def check_share_page(browser, issues, screenshots, browser_target, path_name, page_name, main_selector, expected_title_fragment):
    context = await browser.new_context(viewport={"width": 1280, "height": 1600}, locale="tr-TR")
    page = await context.new_page()
    attach_page_monitors(page, issues, scope_name(browser_target, page_name))

    await page.goto(f"{BASE_URL}/{path_name}", wait_until="domcontentloaded")
    await page.wait_for_timeout(1000)
    await dismiss_cookie_consent(page)

    await wait_visible(page, main_selector, scope_name(browser_target, f"{page_name} main content"), issues)
    await wait_visible(page, ".share-card__poster-image", scope_name(browser_target, f"{page_name} hero image"), issues)
    await wait_visible(page, ".share-card__poster-qr-image", scope_name(browser_target, f"{page_name} qr image"), issues)

    share_title = await first_visible_text(page, ".share-card__title-main")
    if expected_title_fragment not in share_title:
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, page_name),
            f"Expected share title to contain {expected_title_fragment!r}, got: {share_title or '[empty]'}",
        )

    screenshot_path = OUT_DIR / f"{page_name}-{browser_target}.png"
    await save_page_screenshot(page, screenshot_path, screenshots, browser_target)
    await context.close()


async def check_instagram_export_page(browser, issues, screenshots, browser_target):
    context = await browser.new_context(
        viewport={"width": 1440, "height": 1800},
        locale="tr-TR",
        accept_downloads=True,
    )
    page = await context.new_page()
    dialog_messages = []
    attach_page_monitors(page, issues, scope_name(browser_target, "instagram-export"))

    async def handle_dialog(dialog):
        dialog_messages.append(dialog.message)
        await dialog.dismiss()

    page.on("dialog", handle_dialog)

    await page.goto(f"{BASE_URL}/share/instagram-export.html", wait_until="domcontentloaded")
    await page.wait_for_timeout(1400)
    await dismiss_cookie_consent(page)

    await wait_visible(page, ".post-card", scope_name(browser_target, "instagram-export card"), issues)
    await wait_visible(page, ".story-preview__image-shell", scope_name(browser_target, "instagram-export story preview"), issues)

    visible_post_count = await page.locator(".post-card").count()
    if visible_post_count <= 0:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "instagram-export"),
            "Instagram export page did not render any post cards",
        )

    first_caption = await page.locator(".post-card__caption").first.input_value()
    if "Daha fazlasi web sitemizde." not in first_caption:
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "instagram-export translation"),
            "Expected Turkish caption helper copy in the first export card",
        )

    first_card = page.locator(".post-card").first
    await safe_click(page, first_card.locator(".preview-option--story"))
    await page.wait_for_timeout(250)

    selected_story_format = await first_visible_text(page, ".post-card:first-child .post-card__format-value")
    if selected_story_format != "Story 9:16":
        add_issue(
            issues,
            "medium",
            scope_name(browser_target, "instagram-export translation"),
            f"Expected story format summary after selecting story preview, got: {selected_story_format or '[empty]'}",
        )

    selected_story_note = await first_visible_text(page, ".post-card:first-child .post-card__format-note")
    if "www.cmi-ochsenfurt.de icin link etiketi ekleyin." not in selected_story_note:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "instagram-export translation"),
            f"Expected Turkish story format note, got: {selected_story_note or '[empty]'}",
        )

    try:
        async with page.expect_download(timeout=10000) as download_info:
            await safe_click(page, first_card.locator(".post-card__export-feed"), timeout=10000)
        feed_download = await download_info.value
        feed_download_name = feed_download.suggested_filename
        if not feed_download_name.endswith("-instagram-4x5.png"):
            add_issue(
                issues,
                "medium",
                scope_name(browser_target, "instagram-export feed"),
                f"Unexpected feed export filename: {feed_download_name}",
            )
    except PlaywrightTimeoutError:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "instagram-export feed"),
            "Feed PNG export did not trigger a download",
        )

    try:
        async with page.expect_download(timeout=10000) as download_info:
            await safe_click(page, first_card.locator(".post-card__export-story"), timeout=10000)
        story_download = await download_info.value
        story_download_name = story_download.suggested_filename
        if not story_download_name.endswith("-instagram-story-9x16.png"):
            add_issue(
                issues,
                "medium",
                scope_name(browser_target, "instagram-export story"),
                f"Unexpected story export filename: {story_download_name}",
            )
    except PlaywrightTimeoutError:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "instagram-export story"),
            "Story PNG export did not trigger a download",
        )

    if dialog_messages:
        add_issue(
            issues,
            "high",
            scope_name(browser_target, "instagram-export dialogs"),
            f"Unexpected export dialogs: {' | '.join(dialog_messages)}",
        )

    screenshot_path = OUT_DIR / f"instagram-export-{browser_target}.png"
    await save_page_screenshot(page, screenshot_path, screenshots, browser_target)
    await context.close()

async def run_release_smoke_for_target(playwright, requested_target):
    issues = []
    screenshots = []

    try:
        browser, resolved_target = await launch_browser(playwright, requested_target)
    except Exception as error:  # noqa: BLE001
        return {
            "requestedTarget": requested_target,
            "resolvedTarget": None,
            "browserLabel": None,
            "skipped": True,
            "launchError": str(error),
            "issueCount": 0,
            "issues": [],
            "screenshots": [],
        }

    try:
        await check_index_desktop(browser, issues, screenshots, resolved_target)
        await check_index_mobile(browser, issues, screenshots, resolved_target, playwright.devices["iPhone 12"])
        await check_index_tablet(browser, issues, screenshots, resolved_target, playwright.devices["iPad Pro 11"])
        await check_subpage(browser, issues, screenshots, resolved_target, "chronik.html", "chronik-release", ".timeline-section", "The CMI Timeline")
        await check_subpage(browser, issues, screenshots, resolved_target, "datenschutz.html", "datenschutz-release", ".subpage-hero--privacy", "Privacy Policy")
        await check_subpage(browser, issues, screenshots, resolved_target, "impressum.html", "impressum-release", ".subpage-hero--imprint", "Legal Notice")
        await check_share_page(
            browser,
            issues,
            screenshots,
            resolved_target,
            "share/querbeet-roundup-2025--tr.html?lang=tr",
            "querbeet-roundup-share",
            ".share-card--poster",
            "CMI Konzertjahr",
        )
        await check_instagram_export_page(browser, issues, screenshots, resolved_target)
    except Exception as error:  # noqa: BLE001
        add_issue(
            issues,
            "high",
            scope_name(resolved_target, "runner"),
            f"Unexpected QA runner error: {error}",
        )
    finally:
        await browser.close()

    return {
        "requestedTarget": requested_target,
        "resolvedTarget": resolved_target,
        "browserLabel": BROWSER_LAUNCH_CONFIGS[resolved_target]["label"],
        "skipped": False,
        "launchError": None,
        "issueCount": len(issues),
        "issues": issues,
        "screenshots": screenshots,
    }


async def main():
    browser_runs = []
    issues = []
    screenshots = []
    requested_targets = get_requested_browser_targets()

    validate_release_files(issues)

    async with async_playwright() as playwright:
        for requested_target in requested_targets:
            browser_runs.append(await run_release_smoke_for_target(playwright, requested_target))

    for browser_run in browser_runs:
        screenshots.extend(browser_run["screenshots"])
        if browser_run["skipped"]:
            continue

        for issue in browser_run["issues"]:
            issues.append({**issue, "browser": browser_run["resolvedTarget"]})

    if not any(not browser_run["skipped"] for browser_run in browser_runs):
        add_issue(issues, "high", "browser-launch", "No requested browser target could be launched for release QA")

    RESULT_PATH.write_text(
        json.dumps(
            {
                "baseUrl": BASE_URL,
                "requestedBrowserTargets": requested_targets,
                "browserRuns": browser_runs,
                "issueCount": len(issues),
                "issues": issues,
                "screenshots": screenshots,
            },
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )

    print(json.dumps({"issueCount": len(issues), "resultPath": str(RESULT_PATH)}, ensure_ascii=False))

    if issues and should_fail_on_issues():
        raise SystemExit(1)


if __name__ == "__main__":
    asyncio.run(main())