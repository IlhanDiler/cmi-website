function getReviewHashTarget() {
    const hash = window.location.hash ? window.location.hash.slice(1) : '';

    if (!hash) {
        return null;
    }

    return document.getElementById(hash);
}

const reviewNewsFeedLinkSelector = '.news-feed-card-link[href^="#review-"]';
const reviewNavigationStateKey = 'cmiReviewNavigation';
const reviewReturnOriginEntryType = 'review-return-origin';
const reviewDetailEntryType = 'review-detail';
const reviewReturnFallbackSectionId = 'news-feed';
const reviewReturnUiLabels = {
    de: 'Zurueck zu Aktuellem',
    en: 'Back to latest',
    fr: 'Retour a l\'actualite',
    ln: 'Zonga na makambo ya sika',
    it: 'Torna alle novita',
    tr: 'Guncel bolume don',
    uk: 'Назад до актуального'
};

function getReviewNavigationState(sourceState) {
    if (!sourceState || typeof sourceState !== 'object') {
        sourceState = window.history.state;
    }

    if (!sourceState || typeof sourceState !== 'object') {
        return null;
    }

    const reviewState = sourceState[reviewNavigationStateKey];

    return reviewState && typeof reviewState === 'object' ? reviewState : null;
}

function replaceReviewNavigationState(reviewStatePatch, url) {
    const currentState = window.history.state && typeof window.history.state === 'object'
        ? window.history.state
        : {};
    const currentReviewState = getReviewNavigationState(currentState) || {};

    window.history.replaceState({
        ...currentState,
        [reviewNavigationStateKey]: {
            ...currentReviewState,
            ...reviewStatePatch
        }
    }, '', url || window.location.href);
}

function pushReviewNavigationState(reviewState, url) {
    const currentState = window.history.state && typeof window.history.state === 'object'
        ? window.history.state
        : {};

    window.history.pushState({
        ...currentState,
        [reviewNavigationStateKey]: reviewState
    }, '', url || window.location.href);
}

function createReviewHashChangeEvent(oldUrl, newUrl) {
    if (typeof HashChangeEvent === 'function') {
        return new HashChangeEvent('hashchange', {
            oldURL: oldUrl,
            newURL: newUrl
        });
    }

    const hashChangeEvent = new Event('hashchange');
    hashChangeEvent.oldURL = oldUrl;
    hashChangeEvent.newURL = newUrl;
    return hashChangeEvent;
}

function clearReviewHashPreservingState() {
    if (!window.location.hash) {
        return;
    }

    window.history.replaceState(
        window.history.state,
        '',
        window.location.pathname + window.location.search
    );
}

function getReviewReturnSourceLink(reviewState, reviewTargetId) {
    const sourceHref = reviewState && reviewState.sourceLinkHref
        ? reviewState.sourceLinkHref
        : reviewTargetId
            ? `#${reviewTargetId}`
            : '';

    if (!sourceHref) {
        return null;
    }

    return document.querySelector(`.news-feed-card-link[href="${sourceHref}"]`);
}

function getReviewReturnScrollTarget(reviewState, reviewTargetId) {
    const sourceLink = getReviewReturnSourceLink(reviewState, reviewTargetId);

    if (sourceLink) {
        return sourceLink.closest('.news-feed-card') || sourceLink;
    }

    const sourceSectionId = reviewState && reviewState.sourceSectionId
        ? reviewState.sourceSectionId
        : reviewReturnFallbackSectionId;

    return document.getElementById(sourceSectionId) || null;
}

function restoreReviewOriginFromHistory(reviewState) {
    if (!reviewState) {
        return;
    }

    const scrollTarget = getReviewReturnScrollTarget(reviewState, reviewState.reviewTargetId || reviewState.targetId);
    const focusTarget = getReviewReturnSourceLink(reviewState, reviewState.reviewTargetId || reviewState.targetId)
        || document.getElementById(reviewState.sourceSectionId || reviewReturnFallbackSectionId);

    runAfterNextPaint(function() {
        if (focusTarget) {
            focusElementWithoutScroll(focusTarget);
        }

        window.scrollTo({
            top: typeof reviewState.scrollTop === 'number'
                ? reviewState.scrollTop
                : getScrollTargetTop(scrollTarget, 12),
            behavior: getPreferredScrollBehavior()
        });
    });
}

function fallbackReturnToReviewSource(reviewTargetId) {
    const fallbackState = {
        sourceSectionId: reviewReturnFallbackSectionId,
        sourceLinkHref: reviewTargetId ? `#${reviewTargetId}` : ''
    };
    const scrollTarget = getReviewReturnScrollTarget(fallbackState, reviewTargetId);
    const focusTarget = getReviewReturnSourceLink(fallbackState, reviewTargetId)
        || document.getElementById(reviewReturnFallbackSectionId);

    clearReviewHashPreservingState();

    if (!scrollTarget) {
        return;
    }

    if (focusTarget) {
        focusElementWithoutScroll(focusTarget);
    }

    window.scrollTo({
        top: getScrollTargetTop(scrollTarget, 12),
        behavior: getPreferredScrollBehavior()
    });
}

function createReviewReturnLink(section) {
    const textColumn = section.querySelector('.charity-flex-left');

    if (!textColumn || textColumn.querySelector('.review-return-link')) {
        return;
    }

    const wrap = document.createElement('div');
    wrap.className = 'review-return-link-wrap';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'review-return-link';
    button.dataset.reviewReturnTarget = section.id;
    button.innerHTML = [
        `<span data-lang="de">${reviewReturnUiLabels.de}</span>`,
        `<span data-lang="en" hidden aria-hidden="true">${reviewReturnUiLabels.en}</span>`,
        `<span data-lang="fr" hidden aria-hidden="true">${reviewReturnUiLabels.fr}</span>`,
        `<span data-lang="ln" hidden aria-hidden="true">${reviewReturnUiLabels.ln}</span>`,
        `<span data-lang="it" hidden aria-hidden="true">${reviewReturnUiLabels.it}</span>`,
        `<span data-lang="tr" hidden aria-hidden="true">${reviewReturnUiLabels.tr}</span>`,
        `<span data-lang="uk" hidden aria-hidden="true">${reviewReturnUiLabels.uk}</span>`
    ].join('');

    button.addEventListener('click', function() {
        const reviewState = getReviewNavigationState();

        if (reviewState && reviewState.entryType === reviewDetailEntryType && reviewState.targetId === section.id) {
            window.history.back();
            return;
        }

        fallbackReturnToReviewSource(section.id);
    });

    wrap.appendChild(button);
    textColumn.insertAdjacentElement('afterbegin', wrap);
}

function initReviewNewsFeedNavigation() {
    if (!document.body || document.body.dataset.reviewNewsFeedNavigationInit === 'true') {
        return;
    }

    const newsFeedLinks = Array.from(document.querySelectorAll(reviewNewsFeedLinkSelector));

    if (!newsFeedLinks.length) {
        return;
    }

    document.body.dataset.reviewNewsFeedNavigationInit = 'true';

    const initializedTargets = new Set();

    newsFeedLinks.forEach(function(link) {
        const targetId = getHashTargetId(link);
        const targetSection = targetId ? document.getElementById(targetId) : null;

        if (targetSection && !initializedTargets.has(targetId)) {
            createReviewReturnLink(targetSection);
            initializedTargets.add(targetId);
        }

        link.addEventListener('click', function(event) {
            if (
                event.defaultPrevented
                || event.button !== 0
                || event.metaKey
                || event.ctrlKey
                || event.shiftKey
                || event.altKey
                || !targetId
                || !targetSection
            ) {
                return;
            }

            event.preventDefault();

            const currentUrl = window.location.href;
            const nextUrl = new URL(currentUrl);
            nextUrl.hash = targetId;

            replaceReviewNavigationState({
                entryType: reviewReturnOriginEntryType,
                scrollTop: getViewportScrollTop(),
                sourceSectionId: reviewReturnFallbackSectionId,
                sourceLinkHref: `#${targetId}`,
                reviewTargetId: targetId
            }, currentUrl);

            pushReviewNavigationState({
                entryType: reviewDetailEntryType,
                targetId: targetId,
                sourceSectionId: reviewReturnFallbackSectionId,
                sourceLinkHref: `#${targetId}`
            }, nextUrl.toString());

            window.dispatchEvent(createReviewHashChangeEvent(currentUrl, nextUrl.toString()));

            if (!targetSection.closest('.review-archive')) {
                queueReviewHashTargetNavigation(targetSection);
            }
        });
    });

    window.addEventListener('popstate', function(event) {
        const reviewState = getReviewNavigationState(event.state);

        if (!reviewState || reviewState.entryType !== reviewReturnOriginEntryType) {
            return;
        }

        restoreReviewOriginFromHistory(reviewState);
    });
}

function queueReviewHashTargetNavigation(target) {
    if (!target) {
        return;
    }

    runAfterNextPaint(function() {
        focusElementWithoutScroll(target);

        window.scrollTo({
            top: getScrollTargetTop(target, 12),
            behavior: getPreferredScrollBehavior()
        });
    });
}

function initReviewArchiveToggle() {
    const archive = document.getElementById('reviewArchive');
    const toggle = document.querySelector('.review-archive-toggle');
    const intro = toggle ? toggle.closest('.review-archive-intro') : null;

    if (!archive || !toggle) {
        return;
    }

    const collapsedLabels = toggle.querySelectorAll('[data-state="collapsed"]');
    const expandedLabels = toggle.querySelectorAll('[data-state="expanded"]');

    function scrollIntroIntoView() {
        if (!intro) {
            return;
        }

        const targetTop = getScrollTargetTop(intro, 12);

        if (Math.abs(getViewportScrollTop() - targetTop) < 20) {
            return;
        }

        window.scrollTo({
            top: targetTop,
            behavior: getPreferredScrollBehavior()
        });
    }

    function setArchiveExpanded(isExpanded) {
        archive.hidden = !isExpanded;
        archive.classList.toggle('review-archive--open', isExpanded);
        toggle.setAttribute('aria-expanded', String(isExpanded));

        collapsedLabels.forEach(function(label) {
            label.hidden = isExpanded;
        });

        expandedLabels.forEach(function(label) {
            label.hidden = !isExpanded;
        });

        document.dispatchEvent(new CustomEvent('review-archive-state-change', {
            detail: { expanded: isExpanded }
        }));

        if (!isExpanded) {
            scheduleIntroScrollIntoView();
        }
    }

    const scheduleIntroScrollIntoView = createAnimationFrameScheduler(scrollIntroIntoView);

    function expandArchiveForHash() {
        const target = getReviewHashTarget();

        if (!target) {
            return;
        }

        if (target && archive.contains(target)) {
            setArchiveExpanded(true);
        }
    }

    toggle.addEventListener('click', function() {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        setArchiveExpanded(!isExpanded);
    });

    setArchiveExpanded(false);
    expandArchiveForHash();
    window.addEventListener('hashchange', expandArchiveForHash);
}

function initReviewCardToggles() {
    const archive = document.getElementById('reviewArchive');
    const archiveCards = document.querySelectorAll('.review-archive .charity-projects-section[id^="review-"]');

    if (!archive || !archiveCards.length) {
        return;
    }

    function setCardExpanded(section, isExpanded) {
        const toggle = section.querySelector('.review-card-toggle');
        if (!toggle) {
            return;
        }

        const nextExpanded = Boolean(isExpanded);

        section.dataset.reviewCardExpanded = String(nextExpanded);
        section.classList.toggle('review-card--expanded', nextExpanded);
        toggle.classList.toggle('review-card-toggle--expanded', nextExpanded);
        toggle.setAttribute('aria-expanded', String(nextExpanded));

        toggle.querySelectorAll('[data-state="collapsed"]').forEach(function(label) {
            label.hidden = nextExpanded;
        });

        toggle.querySelectorAll('[data-state="expanded"]').forEach(function(label) {
            label.hidden = !nextExpanded;
        });
    }

    function createToggle(section) {
        const textColumn = section.querySelector('.charity-flex-left');
        const descriptions = Array.from(section.querySelectorAll('.charity-description'));
        const lastDescription = descriptions[descriptions.length - 1];

        if (!textColumn || !lastDescription) {
            return;
        }

        if (section.querySelector('.review-card-toggle')) {
            return;
        }

        const toggleWrap = document.createElement('div');
        toggleWrap.className = 'review-card-toggle-wrap';
        toggleWrap.hidden = true;

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'review-card-toggle contact-info-secondary-link';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', section.id);
        toggle.innerHTML = [
            '<span class="review-card-toggle__label" data-state="collapsed">',
            '<span data-lang="de">Mehr lesen</span>',
            '<span data-lang="en" style="display:none;">Read more</span>',
            '<span data-lang="fr" style="display:none;">Lire la suite</span>',
            '<span data-lang="ln" style="display:none;">Tanga lisusu</span>',
            '<span data-lang="it" style="display:none;">Leggi di più</span>',
            '<span data-lang="tr" style="display:none;">Devamını oku</span>',
            '<span data-lang="uk" style="display:none;">Читати далі</span>',
            '</span>',
            '<span class="review-card-toggle__label" data-state="expanded" hidden>',
            '<span data-lang="de">Weniger anzeigen</span>',
            '<span data-lang="en" style="display:none;">Show less</span>',
            '<span data-lang="fr" style="display:none;">Afficher moins</span>',
            '<span data-lang="ln" style="display:none;">Monisa moke</span>',
            '<span data-lang="it" style="display:none;">Mostra meno</span>',
            '<span data-lang="tr" style="display:none;">Daha az göster</span>',
            '<span data-lang="uk" style="display:none;">Показати менше</span>',
            '</span>'
        ].join('');

        toggle.addEventListener('click', function() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            setCardExpanded(section, !isExpanded);
        });

        toggleWrap.appendChild(toggle);
        lastDescription.insertAdjacentElement('afterend', toggleWrap);
        setCardExpanded(section, false);
    }

    function getActiveDescriptions(section) {
        return Array.from(section.querySelectorAll('.charity-description')).filter(function(description) {
            return isNodeVisiblyRendered(description);
        });
    }

    function syncCardToggle(section) {
        const toggleWrap = section.querySelector('.review-card-toggle-wrap');
        const toggle = section.querySelector('.review-card-toggle');

        if (!toggleWrap || !toggle || archive.hidden) {
            return;
        }

        const activeDescriptions = getActiveDescriptions(section);
        const wasExpanded = toggle.getAttribute('aria-expanded') === 'true';

        if (!activeDescriptions.length) {
            toggleWrap.hidden = true;
            section.classList.remove('review-card--collapsible', 'review-card--expanded');
            section.removeAttribute('data-review-card-expanded');
            setCardExpanded(section, false);
            return;
        }

        section.classList.add('review-card--collapsible');
        section.classList.remove('review-card--expanded');

        const collapsedHeights = activeDescriptions.map(function(description) {
            return description.getBoundingClientRect().height;
        });

        section.classList.add('review-card--expanded');

        const expandedHeights = activeDescriptions.map(function(description) {
            return description.getBoundingClientRect().height;
        });

        const needsToggle = expandedHeights.some(function(height, index) {
            return height - collapsedHeights[index] > 4;
        });

        if (!wasExpanded) {
            section.classList.remove('review-card--expanded');
        }

        if (!needsToggle) {
            toggleWrap.hidden = true;
            section.classList.remove('review-card--collapsible', 'review-card--expanded');
            section.removeAttribute('data-review-card-expanded');
            setCardExpanded(section, false);
            return;
        }

        toggleWrap.hidden = false;
        section.classList.add('review-card--collapsible');
        setCardExpanded(section, wasExpanded);
    }

    function syncAllCardToggles() {
        archiveCards.forEach(function(section) {
            createToggle(section);
            syncCardToggle(section);
        });
    }

    const scheduleSyncAllCardToggles = createAnimationFrameScheduler(syncAllCardToggles);

    function expandCardForHash() {
        const target = getReviewHashTarget();

        if (!target) {
            return;
        }

        const section = target && target.closest('.review-archive .charity-projects-section[id^="review-"]');

        if (section) {
            createToggle(section);
            syncCardToggle(section);
            setCardExpanded(section, true);
            queueReviewHashTargetNavigation(target);
        }
    }

    archiveCards.forEach(createToggle);
    if (!archive.hidden) {
        syncAllCardToggles();
    }
    expandCardForHash();
    window.addEventListener('hashchange', expandCardForHash);
    window.addEventListener('resize', function() {
        if (!archive.hidden) {
            scheduleSyncAllCardToggles();
        }
    });
    document.addEventListener('site-language-change', function() {
        if (!archive.hidden) {
            scheduleSyncAllCardToggles();
        }
    });
    document.addEventListener('review-archive-state-change', function(event) {
        if (event.detail && event.detail.expanded) {
            scheduleSyncAllCardToggles();
        }
    });
}