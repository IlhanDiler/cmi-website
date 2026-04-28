function applySiteLanguage(lang) {
    if (!isSupportedSiteLanguage(lang)) {
        return;
    }

    syncLangAttributesFromDataLang();

    const fallbackOrder = getSiteLanguageFallbackOrder(lang);
    const parentsWithLanguageVariants = new Set();

    document.querySelectorAll('[data-lang]').forEach(function(element) {
        if (element.parentElement) {
            parentsWithLanguageVariants.add(element.parentElement);
        }
    });

    parentsWithLanguageVariants.forEach(function(parent) {
        applyLanguageVariantsForParent(parent, fallbackOrder);
    });

    syncCurrentPageLinks();
    syncNavigationAccessibility(lang);

    document.documentElement.setAttribute('lang', lang);

    try {
        localStorage.setItem('siteLang', lang);
    } catch (e) {}

    syncStaticContentAccessibility();

    if (typeof refreshHeroGalleryUi === 'function') {
        refreshHeroGalleryUi();
    }

    if (typeof ensureMbondaTimelineLinksAccessible === 'function') {
        ensureMbondaTimelineLinksAccessible();
    }

    if (typeof scheduleCookieConsentLanguageUpdate === 'function') {
        scheduleCookieConsentLanguageUpdate();
    }

    document.dispatchEvent(new CustomEvent('site-language-change', { detail: { lang: lang } }));
}

window.setLang = applySiteLanguage;

function initSiteLanguage() {
    applySiteLanguage(getCurrentSiteLanguage());
}