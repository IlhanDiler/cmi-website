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

    manifest_pages = load_share_manifest(issues)
    fallback_pages = load_instagram_export_fallback_pages(issues)

    share_page_files = sorted(
        path.name for path in SHARE_DIR.glob("*.html") if path.name != "instagram-export.html"
    )

    if manifest_pages is not None:
        missing_share_files = sorted(page for page in manifest_pages if not (SHARE_DIR / page).is_file())
        if missing_share_files:
            add_issue(
                issues,
                "high",
                "release-files",
                f"Manifest entries without matching share file: {', '.join(missing_share_files)}",
            )

        unlisted_share_files = sorted(set(share_page_files) - set(manifest_pages))
        if unlisted_share_files:
            add_issue(
                issues,
                "medium",
                "release-files",
                f"Share HTML files missing from share/share-pages.json: {', '.join(unlisted_share_files)}",
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


def get_mobile_context_options(browser_target, device):
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

    for selector, label in (
        (".navbar", "index-desktop navigation"),
        (".hero-bg", "index-desktop hero"),
        ("footer", "index-desktop footer"),
    ):
        await wait_visible(page, selector, scope_name(browser_target, label), issues)

    desktop_shot = OUT_DIR / f"index-release-desktop-{browser_target}.png"
    await save_page_screenshot(page, desktop_shot, screenshots, browser_target)

    await page.locator("#langEn").click()
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

    current_before = (await page.locator("#heroGalleryCurrent").text_content() or "").strip()
    await page.locator(".hero-gallery-control--next").click()
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

    trigger = page.locator(".event-lightbox-trigger").first
    await trigger.scroll_into_view_if_needed()
    await trigger.click()
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
    await archive_toggle.click()
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
        await first_review_toggle.click()
        if await first_review_toggle.get_attribute("aria-expanded") != "true":
            add_issue(
                issues,
                "medium",
                scope_name(browser_target, "review-archive"),
                "Review card did not expand on first toggle",
            )
        await first_review_toggle.click()
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
    context = await browser.new_context(**get_mobile_context_options(browser_target, device), locale="de-DE")
    page = await context.new_page()
    attach_page_monitors(page, issues, scope_name(browser_target, "index-mobile"))

    await page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    await page.wait_for_timeout(1200)

    mobile_button = page.locator(".mobile-menu-btn")
    await mobile_button.click()

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


async def check_subpage(browser, issues, screenshots, browser_target, path_name, page_name, unique_selector, expected_title):
    context = await browser.new_context(viewport={"width": 1440, "height": 1100}, locale="de-DE")
    page = await context.new_page()
    attach_page_monitors(page, issues, scope_name(browser_target, page_name))

    await page.goto(f"{BASE_URL}/{path_name}", wait_until="domcontentloaded")
    await page.wait_for_timeout(1000)

    await wait_visible(page, ".subpage-topbar", scope_name(browser_target, f"{page_name} topbar"), issues)
    await wait_visible(page, unique_selector, scope_name(browser_target, f"{page_name} main content"), issues)

    if await page.locator("#langEn").count() > 0:
        await page.locator("#langEn").click()
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
        await check_subpage(browser, issues, screenshots, resolved_target, "chronik.html", "chronik-release", ".timeline-section", "The CMI Timeline")
        await check_subpage(browser, issues, screenshots, resolved_target, "datenschutz.html", "datenschutz-release", ".subpage-hero--privacy", "Privacy Policy")
        await check_subpage(browser, issues, screenshots, resolved_target, "impressum.html", "impressum-release", ".subpage-hero--imprint", "Legal Notice")
        await check_share_page(
            browser,
            issues,
            screenshots,
            resolved_target,
            "share/querbeet-roundup-2025.html",
            "querbeet-roundup-share",
            ".share-card--poster",
            "CMI Konser Yili",
        )
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