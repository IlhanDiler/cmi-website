const languageButtonLanguageMap = {
    langDe: 'de',
    langEn: 'en',
    langFr: 'fr',
    langLn: 'ln',
    langIt: 'it',
    langTr: 'tr',
    langUk: 'uk'
};

const instagramExportRevision = '20260410-export-lang-fix-1';
const localPreviewOriginDefault = 'http://127.0.0.1:8123';
const productionSiteOrigin = 'https://www.cmi-ochsenfurt.de';

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
        copyLink: 'Link kopieren',
        copyLinkSuccess: 'Link kopiert',
        opensInNewWindow: 'öffnet in neuem Fenster'
    },
    en: {
        share: 'Share',
        copyLink: 'Copy link',
        copyLinkSuccess: 'Link copied',
        opensInNewWindow: 'opens in new window'
    },
    fr: {
        share: 'Partager',
        copyLink: 'Copier le lien',
        copyLinkSuccess: 'Lien copié',
        opensInNewWindow: 's’ouvre dans une nouvelle fenêtre'
    },
    ln: {
        share: 'Kabola',
        copyLink: 'Copier lien',
        copyLinkSuccess: 'Lien ecopyami',
        opensInNewWindow: 'efungwami na lininisa ya sika'
    },
    it: {
        share: 'Condividi',
        copyLink: 'Copia link',
        copyLinkSuccess: 'Link copiato',
        opensInNewWindow: 'si apre in una nuova finestra'
    },
    tr: {
        share: 'Paylas',
        copyLink: 'Bağlantıyı kopyala',
        copyLinkSuccess: 'Bağlantı kopyalandı',
        opensInNewWindow: 'yeni pencerede açılır'
    },
    uk: {
        share: 'Поділитися',
        copyLink: 'Скопіювати посилання',
        copyLinkSuccess: 'Посилання скопійовано',
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

function getConfiguredLocalPreviewOrigin() {
    try {
        const storedPreviewOrigin = (window.localStorage.getItem('sitePreviewOrigin') || '').trim();

        if (storedPreviewOrigin) {
            return new URL(storedPreviewOrigin).origin;
        }
    } catch (_error) {}

    return localPreviewOriginDefault;
}

function appendLanguageToShareUrl(rawUrl, language, baseUrl) {
    if (!rawUrl || !isSupportedSiteLanguage(language)) {
        return rawUrl || '';
    }

    try {
        const localizedUrl = new URL(rawUrl, baseUrl || window.location.href);
        localizedUrl.searchParams.set('lang', language);
        return localizedUrl.toString();
    } catch (_error) {
        return rawUrl;
    }
}

function syncWhatsAppShareButtonHref(button, language) {
    if (!button || !button.classList.contains('event-social-button--whatsapp') || !button.hasAttribute('href')) {
        return;
    }

    if (!button.dataset.shareHrefBase) {
        button.dataset.shareHrefBase = button.getAttribute('href') || '';
    }

    try {
        const whatsappUrl = new URL(button.dataset.shareHrefBase, window.location.href);
        const shareUrl = whatsappUrl.searchParams.get('text');

        if (!shareUrl) {
            return;
        }

        whatsappUrl.searchParams.set('text', appendLanguageToShareUrl(shareUrl.trim(), language, productionSiteOrigin));
        button.setAttribute('href', whatsappUrl.toString());
    } catch (_error) {
        return;
    }
}

function syncInstagramExportButtonHref(button, language) {
    if (!button || !button.classList.contains('event-social-button--instagram') || !button.hasAttribute('href')) {
        return;
    }

    if (!button.dataset.exportHrefBase) {
        button.dataset.exportHrefBase = button.getAttribute('href') || '';
    }

    try {
        const rawHref = button.dataset.exportHrefBase;
        const shouldUseProductionExport = window.location.protocol === 'file:';
        const localPreviewOrigin = getConfiguredLocalPreviewOrigin();
        const exportUrl = shouldUseProductionExport
            ? new URL(rawHref.replace(/^[./]+/, ''), `${localPreviewOrigin}/`)
            : new URL(rawHref, window.location.href);

        if (!/\/share\/instagram-export\.html$/i.test(exportUrl.pathname)) {
            return;
        }

        exportUrl.searchParams.set('format', 'story');
        exportUrl.searchParams.set('lang', language);
        exportUrl.searchParams.set('v', instagramExportRevision);

        const canUseRelativeHref = !shouldUseProductionExport && /^https?:$/i.test(window.location.protocol) && exportUrl.origin === window.location.origin;
        const nextHref = canUseRelativeHref
            ? `${exportUrl.pathname}${exportUrl.search}${exportUrl.hash}`
            : exportUrl.href;

        button.setAttribute('href', nextHref);
    } catch (_error) {
        if (window.location.protocol !== 'file:') {
            return;
        }

        try {
            const fallbackUrl = new URL(button.dataset.exportHrefBase.replace(/^[./]+/, ''), `${productionSiteOrigin}/`);
            fallbackUrl.searchParams.set('format', 'story');
            fallbackUrl.searchParams.set('lang', language);
            fallbackUrl.searchParams.set('v', instagramExportRevision);
            button.setAttribute('href', fallbackUrl.href);
        } catch (_fallbackError) {
            return;
        }
    }
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
            const isCopyLinkButton = button.classList.contains('event-social-button--copy-link');
            const platform = button.classList.contains('event-social-button--whatsapp')
                ? 'WhatsApp'
                : button.classList.contains('event-social-button--instagram')
                    ? 'Instagram'
                    : isCopyLinkButton && button.dataset.copyState === 'success'
                        ? labels.copyLinkSuccess
                        : isCopyLinkButton
                            ? labels.copyLink
                            : labels.share;
            const baseLabel = title ? `${platform}: ${title}` : platform;
            const accessibilityLabel = isCopyLinkButton
                ? baseLabel
                : appendAccessibilityHint(baseLabel, labels.opensInNewWindow);

            button.setAttribute('aria-label', accessibilityLabel);
            button.setAttribute('title', accessibilityLabel);

            if (button.classList.contains('event-social-button--whatsapp')) {
                syncWhatsAppShareButtonHref(button, language);
            }

            if (button.classList.contains('event-social-button--instagram')) {
                syncInstagramExportButtonHref(button, language);
            }
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

function syncNamedRegionAccessibility() {
    document.querySelectorAll('[data-region-label-selector]').forEach(function(region) {
        const selector = region.getAttribute('data-region-label-selector');

        if (!selector) {
            return;
        }

        const label = getVisibleNodeText(region, selector);

        if (!label) {
            region.removeAttribute('role');
            region.removeAttribute('aria-label');
            return;
        }

        region.setAttribute('role', 'region');
        region.setAttribute('aria-label', label);
    });
}

function syncStaticContentAccessibility() {
    syncDecorativeContentAccessibility();
    syncAnniversaryVideoAccessibility();
    syncEventShareButtonAccessibility();
    syncExternalLinkAccessibility();
    syncNamedRegionAccessibility();
    syncLegalOverviewAccessibility();
    syncFooterNavigationAccessibility();

    if (typeof syncEventLightboxStaticAccessibility === 'function') {
        syncEventLightboxStaticAccessibility();
    }

    if (typeof syncEventLightboxTriggerAccessibility === 'function') {
        syncEventLightboxTriggerAccessibility();
    }
}