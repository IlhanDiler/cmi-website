function initEventLightbox() {
    const lightboxModal = document.getElementById('eventLightboxModal');
    const lightboxImg = document.getElementById('eventLightboxImg');
    const lightboxCloseBtn = document.getElementById('eventLightboxClose');
    const lightboxCaptionKicker = document.getElementById('eventLightboxCaptionKicker');
    const lightboxCaptionTitle = document.getElementById('eventLightboxCaptionTitle');
    const lightboxCaptionMeta = document.getElementById('eventLightboxCaptionMeta');
    const lightboxLanguageLabels = {
        de: { kicker: 'Konzertplakat', fallbackTitle: 'Eventbild', closeLabel: 'Vollansicht schließen' },
        en: { kicker: 'Concert Poster', fallbackTitle: 'Event image', closeLabel: 'Close full view' },
        fr: { kicker: 'Affiche du concert', fallbackTitle: 'Image de l\'evenement', closeLabel: 'Fermer la vue agrandie' },
        ln: { kicker: 'Affiche ya konser', fallbackTitle: 'Elilingi ya event', closeLabel: 'Kanga emoniseli monene' },
        it: { kicker: 'Manifesto del concerto', fallbackTitle: 'Immagine dell\'evento', closeLabel: 'Chiudi la vista ingrandita' },
        tr: { kicker: 'Konser afişi', fallbackTitle: 'Etkinlik görseli', closeLabel: 'Tam görünümü kapat' },
        uk: { kicker: 'Афіша концерту', fallbackTitle: 'Зображення події', closeLabel: 'Закрити повний перегляд' }
    };
    let lastTrigger = null;

    if (!lightboxModal || !lightboxImg) {
        return;
    }

    function syncEventLightboxStaticAccessibility(language) {
        const activeLanguage = language || getCurrentSiteLanguage();
        const labelSet = lightboxLanguageLabels[activeLanguage] || lightboxLanguageLabels.de;

        if (lightboxCloseBtn) {
            lightboxCloseBtn.setAttribute('aria-label', labelSet.closeLabel);
            lightboxCloseBtn.setAttribute('title', labelSet.closeLabel);
        }
    }

    function getVisibleNodeText(container, selector) {
        if (!container) {
            return '';
        }

        const matchingNode = Array.from(container.querySelectorAll(selector)).find(function(node) {
            return window.getComputedStyle(node).display !== 'none';
        });

        return matchingNode ? matchingNode.textContent.trim() : '';
    }

    function getActiveLanguage(image) {
        const eventCard = image ? image.closest('.event-card') : null;
        if (!eventCard) {
            return getCurrentSiteLanguage();
        }

        const visibleHeadline = Array.from(eventCard.querySelectorAll('.event-headline[data-lang]')).find(function(node) {
            return window.getComputedStyle(node).display !== 'none';
        });

        return visibleHeadline ? visibleHeadline.getAttribute('data-lang') || getCurrentSiteLanguage() : getCurrentSiteLanguage();
    }

    function getLightboxCaption(image) {
        if (!image) {
            return { title: '', meta: '', language: 'de' };
        }

        if (image.dataset.lightboxCaption) {
            return {
                title: image.dataset.lightboxCaption,
                meta: '',
                language: getActiveLanguage(image)
            };
        }

        const eventCard = image.closest('.event-card');
        const headline = getVisibleNodeText(eventCard, '.event-headline');
        const date = getVisibleNodeText(eventCard, '.event-date');
        const location = getVisibleNodeText(eventCard, '.event-location');
        return {
            title: headline,
            meta: [location, date].filter(Boolean).join(' • '),
            language: getActiveLanguage(image)
        };
    }

    function isLightboxOpen() {
        return lightboxModal.style.display === 'flex';
    }

    function openLightbox(image) {
        if (!image) {
            return;
        }

        lastTrigger = image;
        lightboxImg.src = image.dataset.lightboxSrc || image.src;

        const caption = getLightboxCaption(image);
        const labelSet = lightboxLanguageLabels[caption.language] || lightboxLanguageLabels.de;
        const fallbackTitle = caption.title || image.alt || labelSet.fallbackTitle;

        syncEventLightboxStaticAccessibility(caption.language);
        lightboxImg.alt = image.alt || caption.title || labelSet.fallbackTitle;
        if (lightboxCaptionKicker) {
            lightboxCaptionKicker.textContent = labelSet.kicker;
        }
        if (lightboxCaptionTitle) {
            lightboxCaptionTitle.textContent = fallbackTitle;
        }
        if (lightboxCaptionMeta) {
            lightboxCaptionMeta.textContent = caption.meta || '';
        }

        lightboxModal.style.display = 'flex';
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (lightboxCloseBtn) {
            lightboxCloseBtn.focus();
        }
    }

    function closeLightbox() {
        if (!isLightboxOpen()) {
            return;
        }

        lightboxModal.style.display = 'none';
        lightboxModal.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        lightboxImg.alt = '';
        if (lightboxCaptionTitle) {
            lightboxCaptionTitle.textContent = '';
        }
        if (lightboxCaptionMeta) {
            lightboxCaptionMeta.textContent = '';
        }
        document.body.style.overflow = '';
        if (lastTrigger && typeof lastTrigger.focus === 'function') {
            lastTrigger.focus();
        }
        lastTrigger = null;
    }

    document.addEventListener('click', function(event) {
        const trigger = event.target.closest('.event-lightbox-img, .event-lightbox-trigger');
        if (!trigger) {
            return;
        }

        openLightbox(trigger);
    });

    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', function() {
            closeLightbox();
        });
    }

    lightboxModal.addEventListener('click', function(event) {
        if (event.target === lightboxModal || event.target === lightboxImg) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isLightboxOpen()) {
            closeLightbox();
        }
    });

    window.syncEventLightboxStaticAccessibility = syncEventLightboxStaticAccessibility;
    syncEventLightboxStaticAccessibility();
    lightboxModal.setAttribute('aria-hidden', 'true');
}