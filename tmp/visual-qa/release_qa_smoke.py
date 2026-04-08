from __future__ import annotations

import asyncio
import json
import os
from pathlib import Path

from playwright.async_api import TimeoutError as PlaywrightTimeoutError
from playwright.async_api import async_playwright


BASE_URL = os.environ.get("QA_BASE_URL", "http://127.0.0.1:8123")
OUT_DIR = Path(__file__).resolve().parent
RESULT_PATH = OUT_DIR / "release-qa-results.json"


def add_issue(issues, severity, area, message):
    issues.append({
        "severity": severity,
        "area": area,
        "message": message,
    })


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


async def launch_browser(playwright):
    launch_attempts = [
        {"channel": "msedge", "headless": True},
        {"channel": "chrome", "headless": True},
    ]

    last_error = None
    for launch_options in launch_attempts:
        try:
            return await playwright.chromium.launch(**launch_options)
        except Exception as error:  # noqa: BLE001
            last_error = error

    raise RuntimeError(f"Unable to launch an installed Chromium browser: {last_error}")


async def check_index_desktop(browser, issues, screenshots):
    context = await browser.new_context(viewport={"width": 1440, "height": 1100}, locale="de-DE")
    page = await context.new_page()
    attach_page_monitors(page, issues, "index-desktop")

    await page.goto(f"{BASE_URL}/index.html", wait_until="domcontentloaded")
    await page.wait_for_timeout(1200)

    for selector, label in (
        (".navbar", "index-desktop navigation"),
        (".hero-bg", "index-desktop hero"),
        ("footer", "index-desktop footer"),
    ):
        await wait_visible(page, selector, label, issues)

    desktop_shot = OUT_DIR / "index-release-desktop.png"
    await page.screenshot(path=str(desktop_shot), full_page=True)
    screenshots.append(str(desktop_shot))

    await page.locator("#langEn").click()
    await page.wait_for_timeout(250)

    visible_review_label = await first_visible_text(page, 'a[href="#review"][data-lang]')
    if visible_review_label != "Review":
        add_issue(issues, "medium", "index-desktop language", f"Expected English review label, got: {visible_review_label or '[empty]'}")

    visible_hero_title = await first_visible_text(page, ".image-caption-title[data-lang]")
    if visible_hero_title != "Music builds bridges":
        add_issue(issues, "medium", "index-desktop language", f"Expected English hero title, got: {visible_hero_title or '[empty]'}")

    current_before = (await page.locator("#heroGalleryCurrent").text_content() or "").strip()
    await page.locator(".hero-gallery-control--next").click()
    try:
        await page.wait_for_function(
            "previous => (document.getElementById('heroGalleryCurrent')?.textContent || '').trim() !== previous",
            arg=current_before,
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        add_issue(issues, "high", "hero-gallery", "Next button did not advance the hero gallery counter")

    pagination_count = await page.locator(".hero-gallery-pagination button, .hero-gallery-pagination [role='tab']").count()
    if pagination_count < 2:
        add_issue(issues, "medium", "hero-gallery", "Hero gallery pagination did not render enough controls")

    trigger = page.locator(".event-lightbox-trigger").first
    await trigger.scroll_into_view_if_needed()
    await trigger.click()
    if await wait_visible(page, "#eventLightboxModal", "event-lightbox open", issues, timeout=5000):
        await page.keyboard.press("Escape")
        try:
            await page.locator("#eventLightboxModal").wait_for(state="hidden", timeout=5000)
        except PlaywrightTimeoutError:
            add_issue(issues, "high", "event-lightbox", "Lightbox did not close on Escape")

        active_class_name = await page.evaluate("() => document.activeElement ? document.activeElement.className : ''")
        if "event-lightbox-trigger" not in active_class_name and "event-poster-image" not in active_class_name:
            add_issue(issues, "medium", "event-lightbox", f"Focus was not restored to a poster trigger after close: {active_class_name!r}")

    archive_toggle = page.locator(".review-archive-toggle")
    await archive_toggle.scroll_into_view_if_needed()
    await archive_toggle.click()
    try:
        await page.wait_for_function(
            "() => { const archive = document.getElementById('reviewArchive'); return archive && !archive.hidden; }",
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        add_issue(issues, "high", "review-archive", "Archive did not open after toggle")

    first_review_toggle = page.locator(".review-card-toggle").first
    if await first_review_toggle.count() == 0:
        add_issue(issues, "medium", "review-archive", "No review card toggle found inside the archive")
    else:
        await first_review_toggle.click()
        if await first_review_toggle.get_attribute("aria-expanded") != "true":
            add_issue(issues, "medium", "review-archive", "Review card did not expand on first toggle")
        await first_review_toggle.click()
        if await first_review_toggle.get_attribute("aria-expanded") != "false":
            add_issue(issues, "medium", "review-archive", "Review card did not collapse on second toggle")

    hash_page = await context.new_page()
    attach_page_monitors(hash_page, issues, "index-hash-review")
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
        add_issue(issues, "high", "hash-navigation", "Review section was not found for hash navigation")
    elif hash_state.get("scrollY", 0) <= 0 or hash_state.get("top", 99999) > hash_state.get("innerHeight", 0):
        add_issue(issues, "medium", "hash-navigation", f"Hash navigation did not bring the review section into view cleanly: {hash_state}")

    await hash_page.close()
    await context.close()


async def check_index_mobile(browser, issues, screenshots, device):
    context = await browser.new_context(**device, locale="de-DE")
    page = await context.new_page()
    attach_page_monitors(page, issues, "index-mobile")

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
        add_issue(issues, "high", "mobile-navigation", "Mobile menu button did not switch to expanded=true")

    if not await page.locator(".mobile-menu.active").is_visible():
        add_issue(issues, "high", "mobile-navigation", "Mobile menu did not become visibly active")

    await page.keyboard.press("Escape")
    try:
        await page.wait_for_function(
            "() => document.querySelector('.mobile-menu-btn')?.getAttribute('aria-expanded') === 'false'",
            timeout=5000,
        )
    except PlaywrightTimeoutError:
        add_issue(issues, "high", "mobile-navigation", "Mobile menu did not close on Escape")

    mobile_shot = OUT_DIR / "index-release-mobile.png"
    await page.screenshot(path=str(mobile_shot), full_page=True)
    screenshots.append(str(mobile_shot))

    await context.close()


async def check_subpage(browser, issues, screenshots, path_name, page_name, unique_selector, expected_title):
    context = await browser.new_context(viewport={"width": 1440, "height": 1100}, locale="de-DE")
    page = await context.new_page()
    attach_page_monitors(page, issues, page_name)

    await page.goto(f"{BASE_URL}/{path_name}", wait_until="domcontentloaded")
    await page.wait_for_timeout(1000)

    await wait_visible(page, ".subpage-topbar", f"{page_name} topbar", issues)
    await wait_visible(page, unique_selector, f"{page_name} main content", issues)

    if await page.locator("#langEn").count() > 0:
        await page.locator("#langEn").click()
        await page.wait_for_timeout(250)
        visible_title = await first_visible_text(page, ".subpage-hero__title[data-lang]")
        if visible_title != expected_title:
            add_issue(issues, "medium", page_name, f"English hero title mismatch after language switch: {visible_title or '[empty]'}")

    screenshot_path = OUT_DIR / f"{page_name}.png"
    await page.screenshot(path=str(screenshot_path), full_page=True)
    screenshots.append(str(screenshot_path))
    await context.close()


async def main():
    issues = []
    screenshots = []

    async with async_playwright() as playwright:
        browser = await launch_browser(playwright)
        try:
            await check_index_desktop(browser, issues, screenshots)
            await check_index_mobile(browser, issues, screenshots, playwright.devices["iPhone 12"])
            await check_subpage(browser, issues, screenshots, "chronik.html", "chronik-release", ".timeline-section", "The CMI Timeline")
            await check_subpage(browser, issues, screenshots, "datenschutz.html", "datenschutz-release", ".subpage-hero--privacy", "Privacy Policy")
            await check_subpage(browser, issues, screenshots, "impressum.html", "impressum-release", ".subpage-hero--imprint", "Legal Notice")
        finally:
            await browser.close()

    RESULT_PATH.write_text(
        json.dumps(
            {
                "baseUrl": BASE_URL,
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


if __name__ == "__main__":
    asyncio.run(main())