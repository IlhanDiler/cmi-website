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