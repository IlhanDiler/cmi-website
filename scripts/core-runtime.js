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
        if (storedLanguage === 'de' || storedLanguage === 'en' || storedLanguage === 'fr' || storedLanguage === 'ln' || storedLanguage === 'it' || storedLanguage === 'tr' || storedLanguage === 'uk') {
            return storedLanguage;
        }
    } catch (e) {}

    const htmlLanguage = (document.documentElement.getAttribute('lang') || '').toLowerCase().split('-')[0];
    if (htmlLanguage === 'de' || htmlLanguage === 'en' || htmlLanguage === 'fr' || htmlLanguage === 'ln' || htmlLanguage === 'it' || htmlLanguage === 'tr' || htmlLanguage === 'uk') {
        return htmlLanguage;
    }

    const browserLanguage = (navigator.language || '').toLowerCase().split('-')[0];
    if (browserLanguage === 'de' || browserLanguage === 'en' || browserLanguage === 'fr' || browserLanguage === 'ln' || browserLanguage === 'it' || browserLanguage === 'tr' || browserLanguage === 'uk') {
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