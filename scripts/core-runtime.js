const supportedSiteLanguages = new Set(['de', 'en', 'fr', 'ln', 'it', 'tr', 'uk']);

function isSupportedSiteLanguage(lang) {
    return supportedSiteLanguages.has(lang);
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

    history.replaceState(null, '', window.location.pathname + window.location.search);
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

function initSiteFeatures() {
    enforceTopOnLoad();

    initEventLightbox();
    initHeroLayout();
    initHeroGallery();
    initCookieConsentLanguageSync();
    revealOnScroll('.modern-card');
    revealOnScroll('.musikfamilie-card');
    initNavigationFeatures();
    initShapeParallax();
    updateYearsPassed();
    initReviewArchiveToggle();
    initReviewCardToggles();
    initSiteLanguage();
}

document.addEventListener('DOMContentLoaded', initSiteFeatures);

window.addEventListener('load', enforceTopOnLoad);
window.addEventListener('pageshow', enforceTopOnLoad);