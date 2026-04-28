function initEventLightbox() {
    const lightboxModal = document.getElementById('eventLightboxModal');
    const lightboxImg = document.getElementById('eventLightboxImg');
    const lightboxCloseBtn = document.getElementById('eventLightboxClose');
    const lightboxCaptionKicker = document.getElementById('eventLightboxCaptionKicker');
    const lightboxCaptionTitle = document.getElementById('eventLightboxCaptionTitle');
    const lightboxCaptionMeta = document.getElementById('eventLightboxCaptionMeta');
    const lightboxLanguageLabels = {
        de: { kicker: 'Konzertplakat', fallbackTitle: 'Eventbild', openLabel: 'Vollansicht öffnen', closeLabel: 'Vollansicht schließen' },
        en: { kicker: 'Concert Poster', fallbackTitle: 'Event image', openLabel: 'Open full view', closeLabel: 'Close full view' },
        fr: { kicker: 'Affiche du concert', fallbackTitle: 'Image de l\'evenement', openLabel: 'Ouvrir la vue agrandie', closeLabel: 'Fermer la vue agrandie' },
        ln: { kicker: 'Affiche ya konser', fallbackTitle: 'Elilingi ya event', openLabel: 'Fungola emoniseli monene', closeLabel: 'Kanga emoniseli monene' },
        it: { kicker: 'Manifesto del concerto', fallbackTitle: 'Immagine dell\'evento', openLabel: 'Apri la vista ingrandita', closeLabel: 'Chiudi la vista ingrandita' },
        tr: { kicker: 'Konser afişi', fallbackTitle: 'Etkinlik görseli', openLabel: 'Tam görünümü aç', closeLabel: 'Tam görünümü kapat' },
        uk: { kicker: 'Афіша концерту', fallbackTitle: 'Зображення події', openLabel: 'Відкрити повний перегляд', closeLabel: 'Закрити повний перегляд' }
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

    function getLightboxFocusableElements() {
        return Array.from(lightboxModal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(function(element) {
            return isNodeVisiblyRendered(element);
        });
    }

    function getActiveLanguage(image) {
        const eventCard = image ? image.closest('.event-card') : null;
        if (!eventCard) {
            return getCurrentSiteLanguage();
        }

        const visibleHeadline = getFirstVisibleNode(eventCard, '.event-headline[data-lang]');
        const headlineLanguage = visibleHeadline ? visibleHeadline.getAttribute('data-lang') : '';

        return isSupportedSiteLanguage(headlineLanguage) ? headlineLanguage : getCurrentSiteLanguage();
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

    function getLightboxTriggerLabel(image) {
        const caption = getLightboxCaption(image);
        const labelSet = lightboxLanguageLabels[caption.language] || lightboxLanguageLabels.de;
        const title = caption.title || image.alt || labelSet.fallbackTitle;

        return `${labelSet.openLabel}: ${title}`;
    }

    function syncEventLightboxTriggerAccessibility() {
        document.querySelectorAll('.event-lightbox-img, .event-lightbox-trigger').forEach(function(trigger) {
            trigger.setAttribute('tabindex', '0');
            trigger.setAttribute('role', 'button');
            trigger.setAttribute('aria-haspopup', 'dialog');
            trigger.setAttribute('aria-controls', 'eventLightboxModal');
            trigger.setAttribute('aria-label', getLightboxTriggerLabel(trigger));
        });
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
        const keyboardTrigger = event.target.closest('.event-lightbox-img, .event-lightbox-trigger');

        if ((event.key === 'Enter' || event.key === ' ') && keyboardTrigger) {
            event.preventDefault();
            openLightbox(keyboardTrigger);
            return;
        }

        if (event.key === 'Tab' && isLightboxOpen()) {
            const focusableElements = getLightboxFocusableElements();

            if (!focusableElements.length) {
                event.preventDefault();

                if (lightboxCloseBtn) {
                    lightboxCloseBtn.focus();
                }

                return;
            }

            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            const activeElement = document.activeElement;

            if (event.shiftKey) {
                if (activeElement === firstFocusable || !lightboxModal.contains(activeElement)) {
                    event.preventDefault();
                    lastFocusable.focus();
                }

                return;
            }

            if (activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
            }

            return;
        }

        if (event.key === 'Escape' && isLightboxOpen()) {
            closeLightbox();
        }
    });

    window.syncEventLightboxStaticAccessibility = syncEventLightboxStaticAccessibility;
    window.syncEventLightboxTriggerAccessibility = syncEventLightboxTriggerAccessibility;
    syncEventLightboxStaticAccessibility();
    syncEventLightboxTriggerAccessibility();
    lightboxModal.setAttribute('aria-hidden', 'true');
}