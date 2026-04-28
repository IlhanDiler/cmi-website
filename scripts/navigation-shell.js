const mbondaTimelineLinkSelector = '.timeline-item-title a[href="https://www.mbonda-lokito.org/home.html"]';

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
        const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        setNavbarStyle(scrollTop > 18);
    }

    const handleNavbarScroll = createAnimationFrameScheduler(updateNavbarScrollState);

    updateNavbarScrollState();
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
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

function initMbondaTimelineAccessibility() {
    if (!document.body || !getMbondaTimelineLinks().length || document.body.dataset.mbondaTimelineRuntimeInit === 'true') {
        return;
    }

    document.body.dataset.mbondaTimelineRuntimeInit = 'true';

    const requestMbondaTimelineAccessibilitySync = createAnimationFrameScheduler(ensureMbondaTimelineLinksAccessible);

    ensureMbondaTimelineLinksAccessible();
    window.addEventListener('resize', requestMbondaTimelineAccessibilitySync);
}