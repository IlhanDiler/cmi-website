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