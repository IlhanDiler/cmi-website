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
const reviewCopyButtonResetDelay = 2200;
const reviewCopyDefaultUiLabels = {
    de: 'Link kopieren',
    en: 'Copy link',
    fr: 'Copier le lien',
    ln: 'Copier lien',
    it: 'Copia link',
    tr: 'Bağlantıyı kopyala',
    uk: 'Скопіювати посилання'
};
const reviewCopySuccessUiLabels = {
    de: 'Link kopiert',
    en: 'Link copied',
    fr: 'Lien copié',
    ln: 'Lien ecopyami',
    it: 'Link copiato',
    tr: 'Bağlantı kopyalandı',
    uk: 'Посилання скопійовано'
};
const reviewCopySuccessStatusUiLabels = {
    de: 'In Zwischenablage kopiert',
    en: 'Copied to clipboard',
    fr: 'Copié dans le presse-papiers',
    ln: 'Ecopié na presse-papiers',
    it: 'Copiato negli appunti',
    tr: 'Panoya kopyalandı',
    uk: 'Скопійовано в буфер обміну'
};
const reviewCopyFailedAlertUiLabels = {
    de: 'Kopieren fehlgeschlagen. Bitte Link manuell kopieren.',
    en: 'Copying failed. Please copy the link manually.',
    fr: 'La copie a échoué. Merci de copier le lien manuellement.',
    ln: 'Copier elongi te. Svp copier lien na maboko.',
    it: 'Copia non riuscita. Copia il link manualmente.',
    tr: 'Kopyalama başarısız. Lütfen bağlantıyı elle kopyalayın.',
    uk: 'Не вдалося скопіювати. Скопіюйте посилання вручну.'
};

function buildReviewLanguageLabelMarkup(labelMap) {
    return reviewLanguageOrder.map(function(language) {
        const label = labelMap[language];
        const isDefaultLanguage = language === 'de';
        const hiddenAttributes = isDefaultLanguage ? '' : ' hidden aria-hidden="true"';

        return `<span data-lang="${language}"${hiddenAttributes}>${label}</span>`;
    }).join('');
}

function getReviewLocalizedUiLabel(labelMap) {
    const currentLanguage = typeof getCurrentSiteLanguage === 'function'
        ? getCurrentSiteLanguage()
        : 'de';

    return labelMap[currentLanguage] || labelMap.de;
}

function fallbackCopyReviewLink(value) {
    const textArea = document.createElement('textarea');
    textArea.value = value;
    textArea.setAttribute('readonly', 'readonly');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);

    const copied = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (!copied) {
        throw new Error('Copy command failed');
    }
}

async function copyReviewLinkToClipboard(value) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(value);
        return;
    }

    fallbackCopyReviewLink(value);
}

function setReviewCopyButtonLabel(button, labelMap) {
    const label = button.querySelector('.event-social-button__copy-label');

    if (label) {
        label.innerHTML = buildReviewLanguageLabelMarkup(labelMap);
    }

    const accessibleLabel = getReviewLocalizedUiLabel(labelMap);
    button.setAttribute('aria-label', accessibleLabel);
    button.setAttribute('title', accessibleLabel);
    syncReviewGeneratedLanguageVariants(button);
}

function getOrCreateReviewCopyStatusElement(actionGroup) {
    if (!actionGroup) {
        return null;
    }

    const existingStatus = actionGroup.querySelector('.event-social-copy-status');

    if (existingStatus) {
        return existingStatus;
    }

    const status = document.createElement('p');
    status.className = 'event-social-copy-status';
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    status.hidden = true;

    const lastSocialButton = Array.from(actionGroup.querySelectorAll('.event-social-button')).pop();

    if (lastSocialButton) {
        lastSocialButton.insertAdjacentElement('afterend', status);
    } else {
        actionGroup.appendChild(status);
    }

    return status;
}

function setReviewCopyStatus(actionGroup, labelMap, state) {
    const status = getOrCreateReviewCopyStatusElement(actionGroup);

    if (!status) {
        return;
    }

    if (!labelMap) {
        status.textContent = '';
        status.hidden = true;
        delete status.dataset.state;
        return;
    }

    status.textContent = getReviewLocalizedUiLabel(labelMap);
    status.hidden = false;

    if (state) {
        status.dataset.state = state;
    } else {
        delete status.dataset.state;
    }
}

function buildReviewCopyLinkUrl(sectionId) {
    const url = new URL(window.location.pathname + window.location.search, window.location.origin);

    if (typeof getCurrentSiteLanguage === 'function') {
        const language = getCurrentSiteLanguage();

        if (typeof isSupportedSiteLanguage !== 'function' || isSupportedSiteLanguage(language)) {
            url.searchParams.set('lang', language);
        }
    }

    url.hash = sectionId;
    return url.toString();
}

function getReviewCopyActionGroup(sectionOrActionGroup) {
    if (!sectionOrActionGroup) {
        return null;
    }

    if (sectionOrActionGroup.matches && sectionOrActionGroup.matches('.event-social-actions')) {
        return sectionOrActionGroup;
    }

    return getOrCreateReviewSocialActions(sectionOrActionGroup);
}

function getReviewCopyUrl(actionGroup, sectionOrActionGroup) {
    const whatsappButton = actionGroup.querySelector('.event-social-button--whatsapp[href]');

    if (whatsappButton) {
        try {
            const shareUrl = new URL(whatsappButton.href, window.location.href).searchParams.get('text');

            if (shareUrl) {
                return shareUrl.trim();
            }
        } catch (_parseError) {}
    }

    const fallbackSection = sectionOrActionGroup && sectionOrActionGroup.id
        ? sectionOrActionGroup
        : actionGroup.closest(reviewSectionSelector);

    return fallbackSection && fallbackSection.id
        ? buildReviewCopyLinkUrl(fallbackSection.id)
        : '';
}

function getOrCreateReviewSocialActions(section) {
    const textColumn = section.querySelector('.charity-flex-left');

    if (!textColumn) {
        return null;
    }

    const existingActions = textColumn.querySelector('.event-social-actions.review-social-actions');

    if (existingActions) {
        return existingActions;
    }

    const actions = document.createElement('div');
    actions.className = 'event-social-actions review-social-actions';
    actions.setAttribute('aria-label', 'Artikelaktionen');

    const metaElements = Array.from(textColumn.querySelectorAll('.charity-meta'));
    const insertionTarget = metaElements.length ? metaElements[metaElements.length - 1] : textColumn.firstElementChild;

    if (insertionTarget) {
        insertionTarget.insertAdjacentElement('afterend', actions);
    } else {
        textColumn.appendChild(actions);
    }

    return actions;
}

function createReviewCopyLinkButton(sectionOrActionGroup) {
    const actions = getReviewCopyActionGroup(sectionOrActionGroup);

    if (!actions || actions.querySelector('.event-copy-link-button, .review-copy-link-button')) {
        return;
    }

    const copyUrl = getReviewCopyUrl(actions, sectionOrActionGroup);

    if (!copyUrl) {
        return;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'event-social-button event-social-button--copy-link event-copy-link-button review-copy-link-button';
    button.dataset.copyUrl = copyUrl;
    button.innerHTML = [
        '<svg class="event-social-button__icon event-social-button__icon--copy" viewBox="0 0 24 24" aria-hidden="true">',
        '<rect x="9" y="9" width="10" height="10" rx="2"></rect>',
        '<path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"></path>',
        '</svg>',
        '<svg class="event-social-button__icon event-social-button__icon--success" viewBox="0 0 24 24" aria-hidden="true">',
        '<path d="M5 12.5 9.2 16.7 19 7.4"></path>',
        '</svg>',
        `<strong class="event-social-button__copy-label">${buildReviewLanguageLabelMarkup(reviewCopyDefaultUiLabels)}</strong>`
    ].join('');

    button.addEventListener('click', async function() {
        window.clearTimeout(button._reviewCopyResetTimer);

        try {
            await copyReviewLinkToClipboard(button.dataset.copyUrl);
            button.dataset.copyState = 'success';
            setReviewCopyButtonLabel(button, reviewCopySuccessUiLabels);
            setReviewCopyStatus(actions, reviewCopySuccessStatusUiLabels, 'success');
        } catch (error) {
            button.dataset.copyState = 'default';
            setReviewCopyButtonLabel(button, reviewCopyDefaultUiLabels);
            setReviewCopyStatus(actions, reviewCopyFailedAlertUiLabels, 'error');
        }

        button._reviewCopyResetTimer = window.setTimeout(function() {
            button.dataset.copyState = 'default';
            setReviewCopyButtonLabel(button, reviewCopyDefaultUiLabels);
            setReviewCopyStatus(actions, null, '');
        }, reviewCopyButtonResetDelay);
    });

    actions.appendChild(button);
    button.dataset.copyState = 'default';
    setReviewCopyButtonLabel(button, reviewCopyDefaultUiLabels);
}

function syncAllReviewCopyLinkButtons() {
    document.querySelectorAll('.event-copy-link-button, .review-copy-link-button').forEach(function(button) {
        const actionGroup = button.closest('.event-social-actions');
        const fallbackSection = actionGroup?.closest(reviewSectionSelector) || null;
        const nextCopyUrl = actionGroup ? getReviewCopyUrl(actionGroup, fallbackSection) : '';
        const labelMap = button.dataset.copyState === 'success'
            ? reviewCopySuccessUiLabels
            : reviewCopyDefaultUiLabels;

        if (nextCopyUrl) {
            button.dataset.copyUrl = nextCopyUrl;
        }

        setReviewCopyButtonLabel(button, labelMap);

        if (button.dataset.copyState === 'success') {
            setReviewCopyStatus(
                button.closest('.event-social-actions'),
                reviewCopySuccessStatusUiLabels,
                'success'
            );
        }
    });
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

    function scrollTargetIntoView() {
        focusElementWithoutScroll(target);

        window.scrollTo({
            top: getScrollTargetTop(target, 12),
            behavior: getPreferredScrollBehavior()
        });
    }

    runAfterNextPaint(scrollTargetIntoView);
    window.setTimeout(scrollTargetIntoView, 350);
}

function initReviewNewsFeedNavigation() {
    if (!document.body || document.body.dataset.reviewNewsFeedNavigationInit === 'true') {
        return;
    }

    document.querySelectorAll('.event-social-actions').forEach(function(actionGroup) {
        createReviewCopyLinkButton(actionGroup);
    });

    if (document.body.dataset.reviewCopyLinkLanguageSyncInit !== 'true') {
        document.body.dataset.reviewCopyLinkLanguageSyncInit = 'true';
        document.addEventListener('site-language-change', syncAllReviewCopyLinkButtons);
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