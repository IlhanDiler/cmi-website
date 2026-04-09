const languageButtonLanguageMap = {
    langDe: 'de',
    langEn: 'en',
    langFr: 'fr',
    langLn: 'ln',
    langIt: 'it',
    langTr: 'tr',
    langUk: 'uk'
};

const navigationUiLabels = {
    de: {
        mainNavigation: 'Hauptnavigation',
        subpageNavigation: 'Seitennavigation',
        legalOverviewNavigation: 'Navigation zu den Hauptabschnitten',
        mobileNavigation: 'Mobile Navigation',
        languageSwitcher: 'Sprache wählen',
        openMenu: 'Menü öffnen',
        closeMenu: 'Menü schließen',
        opensInNewWindow: 'öffnet in neuem Fenster'
    },
    en: {
        mainNavigation: 'Main navigation',
        subpageNavigation: 'Page navigation',
        legalOverviewNavigation: 'Navigation to the main sections',
        mobileNavigation: 'Mobile navigation',
        languageSwitcher: 'Choose language',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        opensInNewWindow: 'opens in new window'
    },
    fr: {
        mainNavigation: 'Navigation principale',
        subpageNavigation: 'Navigation de la page',
        legalOverviewNavigation: 'Navigation vers les sections principales',
        mobileNavigation: 'Navigation mobile',
        languageSwitcher: 'Choisir la langue',
        openMenu: 'Ouvrir le menu',
        closeMenu: 'Fermer le menu',
        opensInNewWindow: 's’ouvre dans une nouvelle fenêtre'
    },
    ln: {
        mainNavigation: 'Navigation ya monene',
        subpageNavigation: 'Navigation ya lokasa',
        legalOverviewNavigation: 'Navigation ya biteni ya ntina',
        mobileNavigation: 'Navigation ya telefone',
        languageSwitcher: 'Pona lokota',
        openMenu: 'Fungola menu',
        closeMenu: 'Kanga menu',
        opensInNewWindow: 'efungwami na lininisa ya sika'
    },
    it: {
        mainNavigation: 'Navigazione principale',
        subpageNavigation: 'Navigazione della pagina',
        legalOverviewNavigation: 'Navigazione alle sezioni principali',
        mobileNavigation: 'Navigazione mobile',
        languageSwitcher: 'Scegli la lingua',
        openMenu: 'Apri il menu',
        closeMenu: 'Chiudi il menu',
        opensInNewWindow: 'si apre in una nuova finestra'
    },
    tr: {
        mainNavigation: 'Ana gezinme',
        subpageNavigation: 'Sayfa gezinmesi',
        legalOverviewNavigation: 'Ana bölümlere gezinme',
        mobileNavigation: 'Mobil gezinme',
        languageSwitcher: 'Dil seç',
        openMenu: 'Menüyü aç',
        closeMenu: 'Menüyü kapat',
        opensInNewWindow: 'yeni pencerede açılır'
    },
    uk: {
        mainNavigation: 'Головна навігація',
        subpageNavigation: 'Навігація сторінкою',
        legalOverviewNavigation: 'Навігація до головних розділів',
        mobileNavigation: 'Мобільна навігація',
        languageSwitcher: 'Оберіть мову',
        openMenu: 'Відкрити меню',
        closeMenu: 'Закрити меню',
        opensInNewWindow: 'відкривається в новому вікні'
    }
};

const eventShareUiLabels = {
    de: {
        share: 'Teilen',
        opensInNewWindow: 'öffnet in neuem Fenster'
    },
    en: {
        share: 'Share',
        opensInNewWindow: 'opens in new window'
    },
    fr: {
        share: 'Partager',
        opensInNewWindow: 's’ouvre dans une nouvelle fenêtre'
    },
    ln: {
        share: 'Kabola',
        opensInNewWindow: 'efungwami na lininisa ya sika'
    },
    it: {
        share: 'Condividi',
        opensInNewWindow: 'si apre in una nuova finestra'
    },
    tr: {
        share: 'Paylas',
        opensInNewWindow: 'yeni pencerede açılır'
    },
    uk: {
        share: 'Поділитися',
        opensInNewWindow: 'відкривається в новому вікні'
    }
};

function getActiveDocumentLanguage() {
    const documentLanguage = document.documentElement.getAttribute('lang');

    if (isSupportedSiteLanguage(documentLanguage)) {
        return documentLanguage;
    }

    return 'de';
}

function getNavigationUiLabelSet(lang) {
    return navigationUiLabels[lang] || navigationUiLabels.de;
}

function getSiteLanguageFallbackOrder(lang) {
    const fallbackOrder = [lang];

    if (lang === 'ln') {
        fallbackOrder.push('fr');
    }

    if (lang !== 'en') {
        fallbackOrder.push('en');
    }

    if (lang !== 'de') {
        fallbackOrder.push('de');
    }

    if (lang !== 'it') {
        fallbackOrder.push('it');
    }

    return fallbackOrder;
}

function getLanguageVariantSignature(element) {
    const normalizedClassName = Array.from(element.classList)
        .filter(function(className) {
            return !className.includes('--');
        })
        .sort()
        .join(' ');

    return [element.tagName, normalizedClassName].join('|');
}

function syncLangAttributesFromDataLang() {
    document.querySelectorAll('[data-lang]').forEach(function(element) {
        const elementLanguage = element.getAttribute('data-lang');

        if (!isSupportedSiteLanguage(elementLanguage)) {
            return;
        }

        if (element.getAttribute('lang') !== elementLanguage) {
            element.setAttribute('lang', elementLanguage);
        }
    });
}

function applyLanguageVariantsForParent(parent, fallbackOrder) {
    let currentGroup = [];
    let currentSignature = '';
    let currentLanguages = new Set();

    function flushCurrentGroup() {
        if (!currentGroup.length) {
            return;
        }

        const chosenVariant = fallbackOrder
            .map(function(language) {
                return currentGroup.find(function(candidate) {
                    return candidate.getAttribute('data-lang') === language;
                });
            })
            .find(Boolean) || currentGroup[0];

        currentGroup.forEach(function(candidate) {
            const isChosenVariant = candidate === chosenVariant;

            candidate.hidden = !isChosenVariant;
            candidate.style.display = isChosenVariant ? '' : 'none';
            candidate.setAttribute('aria-hidden', String(!isChosenVariant));
        });

        currentGroup = [];
        currentSignature = '';
        currentLanguages = new Set();
    }

    Array.from(parent.children).forEach(function(child) {
        if (!child.hasAttribute('data-lang')) {
            return;
        }

        const childLanguage = child.getAttribute('data-lang');
        const childSignature = getLanguageVariantSignature(child);

        if (currentGroup.length && (childSignature !== currentSignature || currentLanguages.has(childLanguage))) {
            flushCurrentGroup();
        }

        currentGroup.push(child);
        currentSignature = childSignature;
        currentLanguages.add(childLanguage);
    });

    flushCurrentGroup();
}

function syncCurrentPageLinks() {
    const currentPageCandidates = document.querySelectorAll('[data-nav-current="page"]');

    currentPageCandidates.forEach(function(link) {
        link.removeAttribute('aria-current');
    });

    Array.from(currentPageCandidates)
        .filter(function(link) {
            return isNodeVisiblyRendered(link);
        })
        .forEach(function(link) {
            link.setAttribute('aria-current', 'page');
        });
}

function syncLanguageSwitcherAccessibility(lang) {
    document.querySelectorAll('.lang-switch-button').forEach(function(button) {
        const buttonLanguage = languageButtonLanguageMap[button.id];

        if (!buttonLanguage) {
            return;
        }

        button.setAttribute('aria-pressed', String(buttonLanguage === lang));
    });
}

function setAriaLabelForElements(selector, label) {
    document.querySelectorAll(selector).forEach(function(element) {
        element.setAttribute('aria-label', label);
    });
}

function syncMobileMenuButtonAccessibility(mobileMenuButton, labels) {
    if (!mobileMenuButton) {
        return;
    }

    const isMenuExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-label', isMenuExpanded ? labels.closeMenu : labels.openMenu);
}

function syncMobileMenuAccessibility(mobileMenu, labels) {
    if (!mobileMenu) {
        return;
    }

    mobileMenu.setAttribute('aria-label', labels.mobileNavigation);
}

function syncNavigationAccessibility(lang) {
    const labels = getNavigationUiLabelSet(lang);
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    setAriaLabelForElements('.navbar', labels.mainNavigation);
    setAriaLabelForElements('.subpage-topbar__links', labels.subpageNavigation);
    setAriaLabelForElements('.legal-overview__nav', labels.legalOverviewNavigation);
    setAriaLabelForElements('.language-switch, #langSwitcher', labels.languageSwitcher);
    syncMobileMenuButtonAccessibility(mobileMenuButton, labels);
    syncMobileMenuAccessibility(mobileMenu, labels);

    syncLanguageSwitcherAccessibility(lang);
}

function appendAccessibilityHint(label, hint) {
    if (!label || !hint || label.includes(hint)) {
        return label;
    }

    return `${label} (${hint})`;
}

function getAccessibleLinkLabel(link) {
    if (!link) {
        return '';
    }

    return [
        link.getAttribute('aria-label'),
        link.getAttribute('title'),
        link.textContent
    ].find(function(candidate) {
        return Boolean(candidate && candidate.trim());
    })?.replace(/\s+/g, ' ').trim() || '';
}

function syncAnniversaryVideoAccessibility() {
    const labels = getNavigationUiLabelSet(getCurrentSiteLanguage());
    const videoCard = document.querySelector('.image-caption-video-card');
    if (!videoCard) {
        return;
    }

    const videoLink = videoCard.querySelector('.image-caption-card-link');
    if (!videoLink) {
        return;
    }

    const labelParts = [
        getVisibleNodeText(videoCard, '.image-caption-video-kicker[data-lang], .image-caption-video-kicker'),
        getVisibleNodeText(videoCard, '.image-caption-video-title[data-lang], .image-caption-video-title'),
        getVisibleNodeText(videoCard, '.image-caption-card-footer[data-lang], .image-caption-card-footer')
    ].filter(Boolean);
    const accessibilityLabel = labelParts.join(' - ');
    const announcedLabel = appendAccessibilityHint(accessibilityLabel, labels.opensInNewWindow);
    const playBadge = videoCard.querySelector('.image-caption-card-play');

    if (playBadge) {
        playBadge.setAttribute('aria-hidden', 'true');
    }

    if (!announcedLabel) {
        return;
    }

    videoLink.setAttribute('aria-label', announcedLabel);
    videoLink.setAttribute('title', announcedLabel);
}

function getAccessibleEventTitle(container) {
    return getVisibleNodeText(
        container,
        '.event-headline[data-lang], .charity-title[data-lang], .event-title[data-lang], .event-headline, .charity-title, .event-title'
    );
}

function syncEventShareButtonAccessibility() {
    const language = getCurrentSiteLanguage();
    const labels = eventShareUiLabels[language] || eventShareUiLabels.de;

    document.querySelectorAll('.event-social-actions').forEach(function(actionGroup) {
        const contentRoot = actionGroup.closest('.event-card, .charity-projects-section, .review-featured, article, section') || actionGroup.parentElement;
        const title = getAccessibleEventTitle(contentRoot);
        const groupLabel = title ? `${labels.share}: ${title}` : labels.share;

        actionGroup.setAttribute('role', 'group');
        actionGroup.setAttribute('aria-label', groupLabel);

        actionGroup.querySelectorAll('.event-social-button').forEach(function(button) {
            const platform = button.classList.contains('event-social-button--whatsapp')
                ? 'WhatsApp'
                : button.classList.contains('event-social-button--instagram')
                    ? 'Instagram'
                    : labels.share;
            const baseLabel = title ? `${platform}: ${title}` : platform;
            const accessibilityLabel = appendAccessibilityHint(baseLabel, labels.opensInNewWindow);

            button.setAttribute('aria-label', accessibilityLabel);
            button.setAttribute('title', accessibilityLabel);
        });
    });
}

function syncExternalLinkAccessibility() {
    const labels = getNavigationUiLabelSet(getCurrentSiteLanguage());

    document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
        const accessibilityLabel = appendAccessibilityHint(getAccessibleLinkLabel(link), labels.opensInNewWindow);

        if (!accessibilityLabel) {
            return;
        }

        link.setAttribute('aria-label', accessibilityLabel);
    });
}

function syncDecorativeContentAccessibility() {
    document.querySelectorAll('.music-family-benefit-check').forEach(function(checkmark) {
        checkmark.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('svg[aria-hidden="true"]').forEach(function(svg) {
        svg.setAttribute('focusable', 'false');
    });
}

function syncLegalOverviewAccessibility() {
    document.querySelectorAll('.legal-overview__nav').forEach(function(navigationBlock) {
        const existingLabel = navigationBlock.getAttribute('aria-label');

        if (existingLabel && existingLabel.trim()) {
            return;
        }

        const label = getVisibleNodeText(
            navigationBlock,
            '.legal-overview__nav-title[data-lang], .legal-overview__nav-title, .legal-overview__nav-kicker[data-lang], .legal-overview__nav-kicker'
        );

        if (!label) {
            return;
        }

        navigationBlock.setAttribute('aria-label', label);
    });
}

function syncFooterNavigationAccessibility() {
    document.querySelectorAll('.site-footer__nav').forEach(function(navigationBlock) {
        const label = getVisibleNodeText(
            navigationBlock,
            '.site-footer__nav-title[data-lang], .site-footer__nav-title'
        );

        navigationBlock.setAttribute('role', 'navigation');

        if (!label) {
            return;
        }

        navigationBlock.setAttribute('aria-label', label);
    });
}

function syncStaticContentAccessibility() {
    syncDecorativeContentAccessibility();
    syncAnniversaryVideoAccessibility();
    syncEventShareButtonAccessibility();
    syncExternalLinkAccessibility();
    syncLegalOverviewAccessibility();
    syncFooterNavigationAccessibility();

    if (typeof syncEventLightboxStaticAccessibility === 'function') {
        syncEventLightboxStaticAccessibility();
    }

    if (typeof syncEventLightboxTriggerAccessibility === 'function') {
        syncEventLightboxTriggerAccessibility();
    }
}

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