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

    function shouldEnableFloatingArchiveToggle() {
        return window.innerWidth <= 1440 || window.innerHeight <= 1080;
    }

    function getArchiveToggleFloatThreshold() {
        const navbar = document.querySelector('.navbar');
        const navbarBottom = navbar ? Math.ceil(navbar.getBoundingClientRect().bottom) : 0;

        return navbarBottom + 18;
    }

    function syncFloatingArchiveToggleState() {
        if (!intro) {
            toggle.classList.remove('review-archive-toggle--floating');
            archive.classList.remove('review-archive--toggle-floating');
            return;
        }

        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        const shouldFloat = isExpanded
            && shouldEnableFloatingArchiveToggle()
            && intro.getBoundingClientRect().bottom < getArchiveToggleFloatThreshold();

        toggle.classList.toggle('review-archive-toggle--floating', shouldFloat);
        archive.classList.toggle('review-archive--toggle-floating', shouldFloat);
    }

    const scheduleFloatingArchiveToggleStateSync = createAnimationFrameScheduler(syncFloatingArchiveToggleState);

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
            toggle.classList.remove('review-archive-toggle--floating');
            archive.classList.remove('review-archive--toggle-floating');
        }

        scheduleFloatingArchiveToggleStateSync();

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
    scheduleFloatingArchiveToggleStateSync();
    window.addEventListener('hashchange', function() {
        expandArchiveForHash();
        scheduleFloatingArchiveToggleStateSync();
    });
    window.addEventListener('scroll', scheduleFloatingArchiveToggleStateSync, { passive: true });
    window.addEventListener('resize', scheduleFloatingArchiveToggleStateSync);
}

function initReviewArchiveInlineMedia() {
    const archive = document.getElementById('reviewArchive');
    const archiveCards = Array.from(document.querySelectorAll('.review-archive .charity-projects-section[id^="review-"]'));

    if (!archive || !archiveCards.length) {
        return;
    }

    const mediaPlaceholders = new WeakMap();

    function shouldUseInlineArchiveMedia() {
        return window.matchMedia('(min-width: 821px) and (max-width: 1200px)').matches;
    }

    function getRow(section) {
        return section.querySelector('.charity-flex-row');
    }

    function getTextColumn(section) {
        const row = getRow(section);
        return row ? row.querySelector('.charity-flex-left') : null;
    }

    function getMovedMedia(section) {
        const textColumn = getTextColumn(section);
        return textColumn ? textColumn.querySelector('.review-archive-inline-media') : null;
    }

    function getDefaultMedia(section) {
        const row = getRow(section);
        const textColumn = getTextColumn(section);

        if (!row || !textColumn) {
            return null;
        }

        return Array.from(row.children).find(function(child) {
            return child !== textColumn
                && child instanceof HTMLElement
                && (child.classList.contains('gruppenbild-container') || child.classList.contains('charity-flex-right'));
        }) || null;
    }

    function countDirectImages(media) {
        return Array.from(media.children).filter(function(child) {
            return child.tagName === 'IMG';
        }).length;
    }

    function syncMediaClasses(media) {
        media.classList.add('review-archive-inline-media');
        media.classList.toggle('review-archive-inline-media--gallery', countDirectImages(media) > 1);
    }

    function moveMediaIntoText(section) {
        const textColumn = getTextColumn(section);
        const movedMedia = getMovedMedia(section);
        const media = movedMedia || getDefaultMedia(section);

        if (!textColumn || !media) {
            return false;
        }

        syncMediaClasses(media);
        section.classList.add('review-archive-card--inline-media');

        if (movedMedia) {
            return false;
        }

        const placeholder = document.createElement('div');
        placeholder.hidden = true;
        placeholder.className = 'review-archive-inline-media-placeholder';

        media.before(placeholder);
        mediaPlaceholders.set(media, placeholder);

        const socialActions = textColumn.querySelector('.event-social-actions.review-social-actions');
        const firstDescription = textColumn.querySelector('.charity-description');

        if (socialActions) {
            socialActions.insertAdjacentElement('afterend', media);
        } else if (firstDescription) {
            firstDescription.before(media);
        } else {
            textColumn.appendChild(media);
        }

        return true;
    }

    function restoreMedia(section) {
        const movedMedia = getMovedMedia(section);

        if (!movedMedia) {
            section.classList.remove('review-archive-card--inline-media');
            return false;
        }

        const placeholder = mediaPlaceholders.get(movedMedia);

        if (placeholder && placeholder.parentNode) {
            placeholder.before(movedMedia);
            placeholder.remove();
        }

        mediaPlaceholders.delete(movedMedia);
        movedMedia.classList.remove('review-archive-inline-media', 'review-archive-inline-media--gallery');
        section.classList.remove('review-archive-card--inline-media');

        return true;
    }

    function syncArchiveInlineMedia() {
        const shouldInline = shouldUseInlineArchiveMedia();
        let hasLayoutChanged = false;

        archiveCards.forEach(function(section) {
            if (shouldInline) {
                hasLayoutChanged = moveMediaIntoText(section) || hasLayoutChanged;
                return;
            }

            hasLayoutChanged = restoreMedia(section) || hasLayoutChanged;
        });

        if (hasLayoutChanged) {
            document.dispatchEvent(new CustomEvent('review-archive-inline-media-layout-change'));
        }
    }

    const scheduleArchiveInlineMediaSync = createAnimationFrameScheduler(syncArchiveInlineMedia);

    syncArchiveInlineMedia();
    window.addEventListener('resize', scheduleArchiveInlineMediaSync);
    document.addEventListener('review-archive-state-change', scheduleArchiveInlineMediaSync);
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
    document.addEventListener('review-archive-inline-media-layout-change', function() {
        if (!archive.hidden) {
            scheduleSyncAllCardToggles();
        }
    });
}