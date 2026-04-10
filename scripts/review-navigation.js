const reviewNewsFeedLinkSelector = '.news-feed-card-link[href^="#review-"]';
const reviewSectionSelector = '.charity-projects-section[id^="review-"]';
const reviewNavigationStateKey = 'cmiReviewNavigation';
const reviewReturnOriginEntryType = 'review-return-origin';
const reviewDetailEntryType = 'review-detail';
const reviewReturnFallbackSectionId = 'news-feed';
const reviewLanguageOrder = ['de', 'en', 'fr', 'ln', 'it', 'tr', 'uk'];
const reviewReturnUiLabels = {
    de: 'Zurueck zu Aktuellem',
    en: 'Back to latest',
    fr: 'Retour a l\'actualite',
    ln: 'Zonga na makambo ya sika',
    it: 'Torna alle novita',
    tr: 'Guncel bolume don',
    uk: 'Назад до актуального'
};

function buildReviewLanguageLabelMarkup(labelMap) {
    return reviewLanguageOrder.map(function(language) {
        const label = labelMap[language];
        const isDefaultLanguage = language === 'de';
        const hiddenAttributes = isDefaultLanguage ? '' : ' hidden aria-hidden="true"';

        return `<span data-lang="${language}"${hiddenAttributes}>${label}</span>`;
    }).join('');
}

function syncReviewGeneratedLanguageVariants(root) {
    if (!root) {
        return;
    }

    if (typeof syncLangAttributesFromDataLang === 'function') {
        syncLangAttributesFromDataLang();
    }

    if (
        typeof applyLanguageVariantsForParent !== 'function'
        || typeof getCurrentSiteLanguage !== 'function'
        || typeof getSiteLanguageFallbackOrder !== 'function'
    ) {
        return;
    }

    const fallbackOrder = getSiteLanguageFallbackOrder(getCurrentSiteLanguage());
    const parentsWithLanguageVariants = new Set();

    root.querySelectorAll('[data-lang]').forEach(function(element) {
        if (element.parentElement) {
            parentsWithLanguageVariants.add(element.parentElement);
        }
    });

    parentsWithLanguageVariants.forEach(function(parent) {
        applyLanguageVariantsForParent(parent, fallbackOrder);
    });
}

function getReviewHashTarget() {
    const hash = window.location.hash ? window.location.hash.slice(1) : '';

    if (!hash) {
        return null;
    }

    return document.getElementById(hash);
}

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
    syncReviewReturnLinksVisibility();

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

function setReviewReturnLinkVisibility(section, isVisible) {
    if (!section) {
        return;
    }

    const wrap = section.querySelector('.review-return-link-wrap');

    if (!wrap) {
        return;
    }

    wrap.hidden = !isVisible;
    section.classList.toggle('review-section--has-return-link', Boolean(isVisible));
}

function syncReviewReturnLinksVisibility() {
    const reviewState = getReviewNavigationState();
    const activeTarget = getReviewHashTarget();
    const activeSection = activeTarget ? activeTarget.closest(reviewSectionSelector) : null;
    const activeTargetId = reviewState
        ? reviewState.targetId || reviewState.reviewTargetId || ''
        : '';

    document.querySelectorAll(reviewSectionSelector).forEach(function(section) {
        const shouldShow = Boolean(
            activeSection
            && activeSection.id === section.id
            && reviewState
            && reviewState.entryType === reviewDetailEntryType
            && activeTargetId === section.id
            && getReviewReturnSourceLink(reviewState, section.id)
        );

        setReviewReturnLinkVisibility(section, shouldShow);
    });
}

function createReviewReturnLink(section) {
    const textColumn = section.querySelector('.charity-flex-left');

    if (!textColumn || textColumn.querySelector('.review-return-link')) {
        return;
    }

    const wrap = document.createElement('div');
    wrap.className = 'review-return-link-wrap';
    wrap.hidden = true;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'review-return-link';
    button.dataset.reviewReturnTarget = section.id;
    button.innerHTML = buildReviewLanguageLabelMarkup(reviewReturnUiLabels);

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
    syncReviewGeneratedLanguageVariants(wrap);
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

    syncReviewReturnLinksVisibility();
    window.addEventListener('hashchange', syncReviewReturnLinksVisibility);

    window.addEventListener('popstate', function(event) {
        const reviewState = getReviewNavigationState(event.state);

        if (reviewState && reviewState.entryType === reviewReturnOriginEntryType) {
            restoreReviewOriginFromHistory(reviewState);
        }

        syncReviewReturnLinksVisibility();
    });
}