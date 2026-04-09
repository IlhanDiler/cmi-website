const homepageNavigationLinkSelector = '.nav-link[href^="#"], .mobile-nav-link[href^="#"]';
const smoothScrollLinkSelector = [
    homepageNavigationLinkSelector,
    '.legal-overview__nav-link[href^="#"]',
    '.contact-info-secondary-link[href^="#"]',
    '.site-footer__link[href^="#"]'
].join(', ');

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

            focusElementWithoutScroll(targetSection);
            scrollToSectionTarget(targetSection);
        });
    });
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

        if (isNodeVisiblyRendered(link)) {
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