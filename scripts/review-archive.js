const reviewCardCollapsedUiLabels = {
    de: 'Mehr lesen',
    en: 'Read more',
    fr: 'Lire la suite',
    ln: 'Tanga lisusu',
    it: 'Leggi di più',
    tr: 'Devamını oku',
    uk: 'Читати далі'
};

const reviewCardExpandedUiLabels = {
    de: 'Weniger anzeigen',
    en: 'Show less',
    fr: 'Afficher moins',
    ln: 'Monisa moke',
    it: 'Mostra meno',
    tr: 'Daha az göster',
    uk: 'Показати менше'
};

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

    const scheduleIntroScrollIntoView = createAnimationFrameScheduler(scrollIntroIntoView);

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

    function expandArchiveForHash() {
        const target = getReviewHashTarget();

        if (!target) {
            return;
        }

        if (archive.contains(target)) {
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

        if (!textColumn || !lastDescription || section.querySelector('.review-card-toggle')) {
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
            buildReviewLanguageLabelMarkup(reviewCardCollapsedUiLabels),
            '</span>',
            '<span class="review-card-toggle__label" data-state="expanded" hidden>',
            buildReviewLanguageLabelMarkup(reviewCardExpandedUiLabels),
            '</span>'
        ].join('');

        toggle.addEventListener('click', function() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            setCardExpanded(section, !isExpanded);
        });

        toggleWrap.appendChild(toggle);
        lastDescription.insertAdjacentElement('afterend', toggleWrap);
        syncReviewGeneratedLanguageVariants(toggleWrap);
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

        const section = target.closest('.review-archive .charity-projects-section[id^="review-"]');

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