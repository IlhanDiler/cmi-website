function initMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    let lastMenuTrigger = null;

    function isMobileMenuOpen() {
        return Boolean(mobileMenuBtn) && mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    }

    function getVisibleMobileMenuLinks() {
        if (!mobileMenu) {
            return [];
        }

        return Array.from(mobileMenu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(function(element) {
            return !element.hasAttribute('hidden') && window.getComputedStyle(element).display !== 'none';
        });
    }

    function focusFirstMobileMenuLink() {
        const firstFocusableLink = getVisibleMobileMenuLinks()[0];

        if (firstFocusableLink) {
            firstFocusableLink.focus();
        }
    }

    function trapMobileMenuFocus(event) {
        const focusableLinks = getVisibleMobileMenuLinks();

        if (!focusableLinks.length) {
            event.preventDefault();
            mobileMenuBtn.focus();
            return;
        }

        const firstFocusableLink = focusableLinks[0];
        const lastFocusableLink = focusableLinks[focusableLinks.length - 1];

        if (event.shiftKey && document.activeElement === firstFocusableLink) {
            event.preventDefault();
            lastFocusableLink.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusableLink) {
            event.preventDefault();
            firstFocusableLink.focus();
        }
    }

    function syncMobileMenuState(isOpen, options) {
        const settings = options || {};
        document.body.classList.toggle('mobile-menu-open', Boolean(isOpen));

        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', String(Boolean(isOpen)));
        }

        if (mobileMenu) {
            mobileMenu.classList.toggle('active', Boolean(isOpen));
            mobileMenu.hidden = !isOpen;
            mobileMenu.setAttribute('aria-hidden', String(!isOpen));

            if ('inert' in mobileMenu) {
                mobileMenu.inert = !isOpen;
            }
        }

        syncNavigationAccessibility(getActiveDocumentLanguage());

        if (isOpen && settings.moveFocus) {
            window.requestAnimationFrame(focusFirstMobileMenuLink);
        }

        if (!isOpen && settings.restoreFocus && lastMenuTrigger && typeof lastMenuTrigger.focus === 'function') {
            lastMenuTrigger.focus();
        }
    }

    function closeMobileMenu(options) {
        if (!mobileMenu || !mobileMenuBtn) {
            return;
        }

        syncMobileMenuState(false, options);
    }

    function handleMobileMenuToggle(event) {
        event.stopPropagation();

        const nextIsOpen = !isMobileMenuOpen();

        if (nextIsOpen) {
            lastMenuTrigger = mobileMenuBtn;
        }

        syncMobileMenuState(nextIsOpen, {
            moveFocus: nextIsOpen,
            restoreFocus: !nextIsOpen
        });
    }

    function handleDocumentClick(event) {
        if (!isMobileMenuOpen()) {
            return;
        }

        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    }

    function handleMobileMenuKeydown(event) {
        if (!isMobileMenuOpen()) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            closeMobileMenu({ restoreFocus: true });
            return;
        }

        if (event.key !== 'Tab') {
            return;
        }

        trapMobileMenuFocus(event);
    }

    function handleMobileMenuResize() {
        if (window.innerWidth > 700) {
            closeMobileMenu();
        }
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', handleMobileMenuToggle);
        document.addEventListener('click', handleDocumentClick);
        document.addEventListener('keydown', handleMobileMenuKeydown);
        window.addEventListener('resize', handleMobileMenuResize);
    }

    syncMobileMenuState(false);

    return {
        closeMobileMenu: closeMobileMenu
    };
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar || navbar.dataset.scrollInit === 'true') {
        return;
    }

    navbar.dataset.scrollInit = 'true';
    let isScrolled = false;

    function setNavbarStyle(nextScrolled) {
        if (isScrolled === nextScrolled) {
            return;
        }

        isScrolled = nextScrolled;
        navbar.classList.toggle('navbar-scrolled', nextScrolled);
    }

    function updateNavbarScrollState() {
        const scrollTop = getViewportScrollTop();
        setNavbarStyle(scrollTop > 18);
    }

    const handleNavbarScroll = createAnimationFrameScheduler(updateNavbarScrollState);

    updateNavbarScrollState();
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
}

const supportedSiteLanguages = new Set(['de', 'en', 'fr', 'ln', 'it', 'tr', 'uk']);
const mbondaTimelineLinkSelector = '.timeline-item-title a[href="https://www.mbonda-lokito.org/home.html"]';
const homepageNavigationLinkSelector = '.nav-link[href^="#"], .mobile-nav-link[href^="#"]';
const smoothScrollLinkSelector = [
    homepageNavigationLinkSelector,
    '.contact-info-secondary-link[href^="#"]',
    '.site-footer__link[href^="#"]'
].join(', ');
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
        mobileNavigation: 'Mobile Navigation',
        languageSwitcher: 'Sprache wählen',
        openMenu: 'Menü öffnen',
        closeMenu: 'Menü schließen'
    },
    en: {
        mainNavigation: 'Main navigation',
        subpageNavigation: 'Page navigation',
        mobileNavigation: 'Mobile navigation',
        languageSwitcher: 'Choose language',
        openMenu: 'Open menu',
        closeMenu: 'Close menu'
    },
    fr: {
        mainNavigation: 'Navigation principale',
        subpageNavigation: 'Navigation de la page',
        mobileNavigation: 'Navigation mobile',
        languageSwitcher: 'Choisir la langue',
        openMenu: 'Ouvrir le menu',
        closeMenu: 'Fermer le menu'
    },
    ln: {
        mainNavigation: 'Navigation ya monene',
        subpageNavigation: 'Navigation ya lokasa',
        mobileNavigation: 'Navigation ya telefone',
        languageSwitcher: 'Pona lokota',
        openMenu: 'Fungola menu',
        closeMenu: 'Kanga menu'
    },
    it: {
        mainNavigation: 'Navigazione principale',
        subpageNavigation: 'Navigazione della pagina',
        mobileNavigation: 'Navigazione mobile',
        languageSwitcher: 'Scegli la lingua',
        openMenu: 'Apri il menu',
        closeMenu: 'Chiudi il menu'
    },
    tr: {
        mainNavigation: 'Ana gezinme',
        subpageNavigation: 'Sayfa gezinmesi',
        mobileNavigation: 'Mobil gezinme',
        languageSwitcher: 'Dil seç',
        openMenu: 'Menüyü aç',
        closeMenu: 'Menüyü kapat'
    },
    uk: {
        mainNavigation: 'Головна навігація',
        subpageNavigation: 'Навігація сторінкою',
        mobileNavigation: 'Мобільна навігація',
        languageSwitcher: 'Оберіть мову',
        openMenu: 'Відкрити меню',
        closeMenu: 'Закрити меню'
    }
};

const eventShareUiLabels = {
    de: {
        share: 'Teilen'
    },
    en: {
        share: 'Share'
    },
    fr: {
        share: 'Partager'
    },
    ln: {
        share: 'Kabola'
    },
    it: {
        share: 'Condividi'
    },
    tr: {
        share: 'Paylas'
    },
    uk: {
        share: 'Поділитися'
    }
};

function isSupportedSiteLanguage(lang) {
    return supportedSiteLanguages.has(lang);
}

function getViewportScrollTop() {
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    return navbar ? navbar.getBoundingClientRect().height : 0;
}

function getPreferredScrollBehavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function getScrollTargetTop(targetElement, additionalOffset) {
    if (!targetElement) {
        return 0;
    }

    const elementTop = targetElement.getBoundingClientRect().top + getViewportScrollTop();
    const offset = typeof additionalOffset === 'number' ? additionalOffset : 0;

    return Math.max(0, elementTop - getNavbarHeight() - offset);
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

function getHomepageNavigationLinks() {
    return Array.from(document.querySelectorAll(homepageNavigationLinkSelector));
}

function getHashTargetId(link) {
    if (!link) {
        return '';
    }

    const href = link.getAttribute('href');

    if (!href || !href.startsWith('#') || href.length < 2) {
        return '';
    }

    return href.slice(1);
}

function getHomepageNavigationSections(homepageNavigationLinks) {
    const seenTargets = new Set();

    return homepageNavigationLinks
        .map(function(link) {
            return getHashTargetId(link);
        })
        .filter(function(targetId) {
            return targetId && !seenTargets.has(targetId) && seenTargets.add(targetId);
        })
        .map(function(targetId) {
            return document.getElementById(targetId);
        })
        .filter(Boolean);
}

function getActiveHomepageSectionId(sections) {
    if (!sections.length) {
        return '';
    }

    const scrollTop = getViewportScrollTop();
    const activationLine = scrollTop + getNavbarHeight() + 120;
    const documentBottom = scrollTop + window.innerHeight;
    const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

    if (documentBottom >= pageHeight - 24) {
        return sections[sections.length - 1].id;
    }

    let currentSection = sections[0];

    sections.forEach(function(section) {
        if (section.offsetTop <= activationLine) {
            currentSection = section;
        }
    });

    return currentSection ? currentSection.id : '';
}

function focusNavigationTarget(targetSection) {
    if (!targetSection || typeof targetSection.focus !== 'function') {
        return;
    }

    const hadTabindex = targetSection.hasAttribute('tabindex');

    if (!hadTabindex) {
        targetSection.setAttribute('tabindex', '-1');
    }

    targetSection.focus({ preventScroll: true });

    if (!hadTabindex) {
        targetSection.addEventListener('blur', function handleBlur() {
            targetSection.removeAttribute('tabindex');
        }, { once: true });
    }
}

function scrollToSectionTarget(targetSection) {
    if (!targetSection) {
        return;
    }

    const targetTop = getScrollTargetTop(targetSection, 12);

    clearCurrentHash();
    window.scrollTo({
        top: targetTop,
        behavior: getPreferredScrollBehavior()
    });
}

function initInPageSectionNavigation(onNavigate) {
    const inPageLinks = document.querySelectorAll(smoothScrollLinkSelector);

    inPageLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const targetId = getHashTargetId(link);

            if (!targetId) {
                return;
            }

            const targetSection = document.getElementById(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            if (typeof onNavigate === 'function') {
                onNavigate(link, targetSection);
            }

            focusNavigationTarget(targetSection);
            scrollToSectionTarget(targetSection);
        });
    });
}

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

function getMbondaTimelineLinks() {
    return document.querySelectorAll(mbondaTimelineLinkSelector);
}

function normalizeMbondaTimelineLink(link) {
    link.onclick = null;
    link.removeAttribute('onclick');
    link.style.position = 'relative';
    link.style.left = '';
    link.style.top = '';
    link.style.width = '';
    link.style.height = '';
    link.style.zIndex = '2147483647';
    link.style.pointerEvents = 'auto';
    link.style.background = '';
    link.style.outline = '';
    link.style.color = '';
    link.style.fontWeight = '';
    link.style.display = 'inline-block';
    link.style.fontSize = '';
    link.style.textAlign = '';
    link.style.lineHeight = '';
}

function installMbondaMobilePassthrough(link) {
    if (link.dataset.mbondaPassthroughInstalled === 'true') {
        return;
    }

    const allowNativeNavigation = function(event) {
        event.stopPropagation = function() {};
        event.stopImmediatePropagation = function() {};
    };

    link.addEventListener('click', allowNativeNavigation, { capture: true });
    link.addEventListener('touchend', allowNativeNavigation, { capture: true });
    link.dataset.mbondaPassthroughInstalled = 'true';
}

function ensureMbondaTimelineLinksAccessible() {
    const isMobileViewport = window.innerWidth <= 700;
    getMbondaTimelineLinks().forEach(function(link) {
        normalizeMbondaTimelineLink(link);
        if (isMobileViewport) {
            installMbondaMobilePassthrough(link);
        }
    });
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
            return window.getComputedStyle(link).display !== 'none';
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
    setAriaLabelForElements('.language-switch, #langSwitcher', labels.languageSwitcher);
    syncMobileMenuButtonAccessibility(mobileMenuButton, labels);
    syncMobileMenuAccessibility(mobileMenu, labels);

    syncLanguageSwitcherAccessibility(lang);
}

function getFirstVisibleText(container, selector) {
    if (!container) {
        return '';
    }

    const matchingNode = Array.from(container.querySelectorAll(selector)).find(function(node) {
        return window.getComputedStyle(node).display !== 'none';
    });

    if (!matchingNode) {
        return '';
    }

    return matchingNode.textContent.replace(/\s+/g, ' ').trim();
}

function syncAnniversaryVideoAccessibility() {
    const videoCard = document.querySelector('.image-caption-video-card');
    if (!videoCard) {
        return;
    }

    const videoLink = videoCard.querySelector('.image-caption-card-link');
    if (!videoLink) {
        return;
    }

    const labelParts = [
        getFirstVisibleText(videoCard, '.image-caption-video-kicker[data-lang], .image-caption-video-kicker'),
        getFirstVisibleText(videoCard, '.image-caption-video-title[data-lang], .image-caption-video-title'),
        getFirstVisibleText(videoCard, '.image-caption-card-footer[data-lang], .image-caption-card-footer')
    ].filter(Boolean);
    const accessibilityLabel = labelParts.join(' - ');
    const playBadge = videoCard.querySelector('.image-caption-card-play');

    if (playBadge) {
        playBadge.setAttribute('aria-hidden', 'true');
    }

    if (!accessibilityLabel) {
        return;
    }

    videoLink.setAttribute('aria-label', accessibilityLabel);
    videoLink.setAttribute('title', accessibilityLabel);
}

function getAccessibleEventTitle(container) {
    return getFirstVisibleText(
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
            const accessibilityLabel = title ? `${platform}: ${title}` : platform;

            button.setAttribute('aria-label', accessibilityLabel);
            button.setAttribute('title', accessibilityLabel);
        });
    });
}

function syncDecorativeContentAccessibility() {
    document.querySelectorAll('.music-family-benefit-check').forEach(function(checkmark) {
        checkmark.setAttribute('aria-hidden', 'true');
    });
}

function syncLegalOverviewAccessibility() {
    document.querySelectorAll('.legal-overview__nav').forEach(function(navigationBlock) {
        const label = getFirstVisibleText(
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
        const label = getFirstVisibleText(
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
    syncLegalOverviewAccessibility();
    syncFooterNavigationAccessibility();

    if (typeof syncEventLightboxStaticAccessibility === 'function') {
        syncEventLightboxStaticAccessibility();
    }
}

function syncInPageNavigationState(activeSectionId) {
    const inPageNavigationLinks = getHomepageNavigationLinks();

    inPageNavigationLinks.forEach(function(link) {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });

    if (!activeSectionId) {
        return;
    }

    const matchingLinks = Array.from(inPageNavigationLinks).filter(function(link) {
        return link.getAttribute('href') === `#${activeSectionId}`;
    });

    matchingLinks.forEach(function(link) {
        link.classList.add('active');

        if (window.getComputedStyle(link).display !== 'none') {
            link.setAttribute('aria-current', 'location');
        }
    });
}

function initHomepageNavigationWayfinding() {
    const homepageNavigationLinks = getHomepageNavigationLinks();

    if (!homepageNavigationLinks.length) {
        return;
    }

    const sections = getHomepageNavigationSections(homepageNavigationLinks);

    if (!sections.length) {
        return;
    }

    let activeSectionId = '';

    function updateActiveNavigationState() {
        const nextActiveSectionId = getActiveHomepageSectionId(sections);

        if (nextActiveSectionId === activeSectionId) {
            return;
        }

        activeSectionId = nextActiveSectionId;
        syncInPageNavigationState(activeSectionId);
    }

    const requestNavigationStateUpdate = createAnimationFrameScheduler(updateActiveNavigationState);

    homepageNavigationLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const targetId = getHashTargetId(link);

            if (!targetId) {
                return;
            }

            activeSectionId = targetId;
            syncInPageNavigationState(activeSectionId);
        });
    });

    updateActiveNavigationState();
    window.addEventListener('scroll', requestNavigationStateUpdate, { passive: true });
    window.addEventListener('resize', requestNavigationStateUpdate);
    window.addEventListener('hashchange', requestNavigationStateUpdate);
    document.addEventListener('site-language-change', requestNavigationStateUpdate);
}

function initNavigationFeatures() {
    const mobileNavigation = initMobileNavigation();

    initInPageSectionNavigation(function(link) {
        if (link.classList.contains('mobile-nav-link') && mobileNavigation && typeof mobileNavigation.closeMobileMenu === 'function') {
            mobileNavigation.closeMobileMenu();
        }
    });

    initHomepageNavigationWayfinding();
    initNavbarScroll();
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

    ensureMbondaTimelineLinksAccessible();

    if (typeof scheduleCookieConsentLanguageUpdate === 'function') {
        scheduleCookieConsentLanguageUpdate();
    }

    document.dispatchEvent(new CustomEvent('site-language-change', { detail: { lang: lang } }));
}

window.setLang = applySiteLanguage;

function initSiteLanguage() {
    applySiteLanguage(getCurrentSiteLanguage());
}

window.addEventListener('resize', ensureMbondaTimelineLinksAccessible);