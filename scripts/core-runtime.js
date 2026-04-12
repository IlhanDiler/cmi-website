const supportedSiteLanguages = new Set(['de', 'en', 'fr', 'ln', 'it', 'tr', 'uk']);
const supportedSiteThemes = new Set(['light', 'dark']);
const siteThemeStorageKey = 'siteTheme';
const siteThemeMetaColors = {
    light: '#f7f9f8',
    dark: '#0b171a'
};

function isSupportedSiteLanguage(lang) {
    return supportedSiteLanguages.has(lang);
}

function isSupportedSiteTheme(theme) {
    return supportedSiteThemes.has(theme);
}

function isNodeVisiblyRendered(node) {
    if (!node) {
        return false;
    }

    if (node.hidden || node.closest('[hidden]')) {
        return false;
    }

    const computedStyle = window.getComputedStyle(node);

    return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
}

function getFirstVisibleNode(container, selector) {
    if (!container) {
        return null;
    }

    return Array.from(container.querySelectorAll(selector)).find(isNodeVisiblyRendered) || null;
}

function getVisibleNodeText(container, selector) {
    const visibleNode = getFirstVisibleNode(container, selector);

    return visibleNode ? visibleNode.textContent.replace(/\s+/g, ' ').trim() : '';
}

function focusElementWithoutScroll(target) {
    if (!target || typeof target.focus !== 'function') {
        return;
    }

    const hadTabindex = target.hasAttribute('tabindex');

    if (!hadTabindex) {
        target.setAttribute('tabindex', '-1');
    }

    target.focus({ preventScroll: true });

    if (!hadTabindex) {
        target.addEventListener('blur', function handleBlur() {
            target.removeAttribute('tabindex');
        }, { once: true });
    }
}

function createAnimationFrameScheduler(callback) {
    let frameId = null;

    return function scheduleAnimationFrame() {
        if (frameId !== null) {
            return;
        }

        frameId = window.requestAnimationFrame(function() {
            frameId = null;
            callback();
        });
    };
}

function runAfterNextPaint(callback) {
    if (typeof callback !== 'function') {
        return;
    }

    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(callback);
    });
}

function resetPageScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function clearCurrentHash() {
    if (!window.location.hash) {
        return;
    }

    history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
}

function getNavigationType() {
    const navigationEntry = performance.getEntriesByType('navigation')[0];

    if (navigationEntry && navigationEntry.type) {
        return navigationEntry.type;
    }

    if (performance.navigation) {
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            return 'reload';
        }

        if (performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
            return 'back_forward';
        }
    }

    return 'navigate';
}

function isReloadNavigation() {
    return getNavigationType() === 'reload';
}

function shouldForceTopOnLoad() {
    return !window.location.hash || isReloadNavigation();
}

function enforceTopOnLoad() {
    if (!shouldForceTopOnLoad()) {
        return;
    }

    if (window.location.hash && isReloadNavigation()) {
        clearCurrentHash();
    }

    resetPageScrollToTop();
    window.requestAnimationFrame(resetPageScrollToTop);
    window.setTimeout(resetPageScrollToTop, 0);
}

function getCurrentSiteLanguage() {
    try {
        const storedLanguage = localStorage.getItem('siteLang');
        if (isSupportedSiteLanguage(storedLanguage)) {
            return storedLanguage;
        }
    } catch (e) {}

    const htmlLanguage = (document.documentElement.getAttribute('lang') || '').toLowerCase().split('-')[0];
    if (isSupportedSiteLanguage(htmlLanguage)) {
        return htmlLanguage;
    }

    const browserLanguage = (navigator.language || '').toLowerCase().split('-')[0];
    if (isSupportedSiteLanguage(browserLanguage)) {
        return browserLanguage;
    }

    return 'de';
}

function getStoredSiteTheme() {
    try {
        const storedTheme = localStorage.getItem(siteThemeStorageKey);
        if (isSupportedSiteTheme(storedTheme)) {
            return storedTheme;
        }
    } catch (e) {}

    return null;
}

function getCurrentSiteTheme() {
    const activeTheme = document.documentElement.dataset.theme;
    if (isSupportedSiteTheme(activeTheme)) {
        return activeTheme;
    }

    return getStoredSiteTheme() || 'light';
}

function getThemeToggleLabel(theme, lang) {
    const themeToggleLabels = {
        light: {
            de: 'Zum dunklen Design wechseln',
            en: 'Switch to dark theme',
            fr: 'Passer au mode sombre',
            ln: 'Kobongola na mode ya molili',
            it: 'Passa al tema scuro',
            tr: 'Koyu temaya geç',
            uk: 'Перемкнути на темну тему'
        },
        dark: {
            de: 'Zum hellen Design wechseln',
            en: 'Switch to light theme',
            fr: 'Passer au mode clair',
            ln: 'Kobongola na mode ya polele',
            it: 'Passa al tema chiaro',
            tr: 'Açık temaya geç',
            uk: 'Перемкнути на світлу тему'
        }
    };

    const labelSet = themeToggleLabels[theme] || themeToggleLabels.light;

    return labelSet[lang] || labelSet.de;
}

function setThemeColorMeta(theme) {
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (!themeColorMeta) {
        themeColorMeta = document.createElement('meta');
        themeColorMeta.setAttribute('name', 'theme-color');
        document.head.appendChild(themeColorMeta);
    }

    themeColorMeta.setAttribute('content', siteThemeMetaColors[theme] || siteThemeMetaColors.light);
}

function syncThemeToggleButtons() {
    const currentTheme = getCurrentSiteTheme();
    const currentLanguage = getCurrentSiteLanguage();
    const toggleLabel = getThemeToggleLabel(currentTheme, currentLanguage);

    document.querySelectorAll('.theme-switch-button').forEach(function(button) {
        const isDarkTheme = currentTheme === 'dark';
        button.dataset.themeMode = currentTheme;
        button.setAttribute('aria-pressed', String(isDarkTheme));
        button.setAttribute('aria-label', toggleLabel);
        button.setAttribute('title', toggleLabel);
    });
}

function applySiteTheme(theme, options) {
    if (!isSupportedSiteTheme(theme)) {
        return;
    }

    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    setThemeColorMeta(theme);

    if (!options || options.persist !== false) {
        try {
            localStorage.setItem(siteThemeStorageKey, theme);
        } catch (e) {}
    }

    syncThemeToggleButtons();
    document.dispatchEvent(new CustomEvent('site-theme-change', { detail: { theme: theme } }));
}

function toggleSiteTheme() {
    applySiteTheme(getCurrentSiteTheme() === 'dark' ? 'light' : 'dark');
}

function createThemeToggleButton() {
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'theme-switch-button';
    button.innerHTML = [
        '<span class="theme-switch-button__icon theme-switch-button__icon--sun" aria-hidden="true">',
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">',
        '<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/>',
        '<path d="M12 2.75V5.1M12 18.9V21.25M21.25 12H18.9M5.1 12H2.75M18.54 5.46L16.88 7.12M7.12 16.88L5.46 18.54M18.54 18.54L16.88 16.88M7.12 7.12L5.46 5.46" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
        '</svg>',
        '</span>',
        '<span class="theme-switch-button__icon theme-switch-button__icon--moon" aria-hidden="true">',
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">',
        '<path d="M18.45 14.88A7.7 7.7 0 0 1 9.12 5.55a8.55 8.55 0 1 0 9.33 9.33Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
        '</svg>',
        '</span>'
    ].join('');
    button.addEventListener('click', toggleSiteTheme);

    return button;
}

function ensureThemeToggle() {
    const langSwitcher = document.getElementById('langSwitcher');

    if (!langSwitcher) {
        return;
    }

    let controls = langSwitcher.parentElement;

    if (!controls || !controls.classList.contains('site-toolbar-controls')) {
        controls = document.createElement('div');
        controls.className = 'site-toolbar-controls';

        if (langSwitcher.classList.contains('subpage-language-switch')) {
            controls.classList.add('site-toolbar-controls--subpage');
        }

        langSwitcher.parentNode.insertBefore(controls, langSwitcher);
        controls.appendChild(langSwitcher);
    }

    if (!controls.querySelector('.theme-switch-button')) {
        controls.insertBefore(createThemeToggleButton(), controls.firstChild);
    }

    syncThemeToggleButtons();
}

function initSiteTheme() {
    applySiteTheme(getCurrentSiteTheme(), { persist: false });
    ensureThemeToggle();
    document.addEventListener('site-language-change', syncThemeToggleButtons);
}

function initSiteFeatures() {
    enforceTopOnLoad();
    initSiteTheme();

    initEventLightbox();
    initHeroLayout();
    initHeroGallery();
    initCookieConsentLanguageSync();
    revealOnScroll('.modern-card');
    revealOnScroll('.musikfamilie-card');
    initNavigationFeatures();
    initShapeParallax();
    updateYearsPassed();
    initReviewFeatures();
    initSiteLanguage();
}

document.addEventListener('DOMContentLoaded', initSiteFeatures);

window.addEventListener('load', enforceTopOnLoad);
window.addEventListener('pageshow', enforceTopOnLoad);