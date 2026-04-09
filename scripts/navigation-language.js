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
            return isNodeVisiblyRendered(element);
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

const mbondaTimelineLinkSelector = '.timeline-item-title a[href="https://www.mbonda-lokito.org/home.html"]';

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

function initMbondaTimelineAccessibility() {
    if (!document.body || !getMbondaTimelineLinks().length || document.body.dataset.mbondaTimelineRuntimeInit === 'true') {
        return;
    }

    document.body.dataset.mbondaTimelineRuntimeInit = 'true';

    const requestMbondaTimelineAccessibilitySync = createAnimationFrameScheduler(ensureMbondaTimelineLinksAccessible);

    ensureMbondaTimelineLinksAccessible();
    window.addEventListener('resize', requestMbondaTimelineAccessibilitySync);
}

function initNavigationFeatures() {
    const mobileNavigation = initMobileNavigation();

    initInPageSectionNavigation(function(link) {
        if (link.classList.contains('mobile-nav-link') && mobileNavigation && typeof mobileNavigation.closeMobileMenu === 'function') {
            mobileNavigation.closeMobileMenu();
        }
    });

    initMbondaTimelineAccessibility();
    initHomepageNavigationWayfinding();
    initNavbarScroll();
}
