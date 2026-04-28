const heroGalleryUiLabels = {
    de: {
        image: 'Bild',
        previous: 'Vorheriges Bild',
        next: 'Nächstes Bild',
        pause: 'Galerie pausieren',
        play: 'Galerie wiedergeben',
        pagination: 'Galerie-Navigation',
        region: 'Galerie mit Benefizkonzerten und Konzertimpressionen',
        controls: 'Steuerung der Galerie'
    },
    en: {
        image: 'Image',
        previous: 'Previous image',
        next: 'Next image',
        pause: 'Pause gallery',
        play: 'Play gallery',
        pagination: 'Main gallery pagination',
        region: 'Gallery with benefit concerts and concert highlights',
        controls: 'Gallery controls'
    },
    fr: {
        image: 'Image',
        previous: 'Image precedente',
        next: 'Image suivante',
        pause: 'Mettre la galerie en pause',
        play: 'Lancer la galerie',
        pagination: 'Pagination de la galerie d\'accueil',
        region: 'Galerie des concerts solidaires et des moments forts',
        controls: 'Commandes de la galerie'
    },
    ln: {
        image: 'Elilingi',
        previous: 'Elilingi ya liboso',
        next: 'Elilingi oyo elandi',
        pause: 'Pemisa galerie',
        play: 'Bandisa galerie',
        pagination: 'Pagination ya galerie ya liboso',
        region: 'Galerie ya bakonser ya lisungi mpe makambo ya motuya',
        controls: 'Bisaleli ya galerie'
    },
    it: {
        image: 'Immagine',
        previous: 'Immagine precedente',
        next: 'Immagine successiva',
        pause: 'Metti in pausa la galleria',
        play: 'Avvia la galleria',
        pagination: 'Paginazione della galleria principale',
        region: 'Galleria con concerti benefici e momenti salienti',
        controls: 'Controlli della galleria'
    },
    tr: {
        image: 'Görsel',
        previous: 'Önceki görsel',
        next: 'Sonraki görsel',
        pause: 'Galeriyi duraklat',
        play: 'Galeriyi oynat',
        pagination: 'Hero galeri sayfalandırması',
        region: 'Yardım konserleri ve önemli anlar galerisi',
        controls: 'Galeri denetimleri'
    },
    uk: {
        image: 'Зображення',
        previous: 'Попереднє зображення',
        next: 'Наступне зображення',
        pause: 'Призупинити галерею',
        play: 'Запустити галерею',
        pagination: 'Пагінація головної галереї',
        region: 'Галерея благодійних концертів і ключових моментів',
        controls: 'Елементи керування галереєю'
    }
};

function formatHeroGalleryIndex(index) {
    return String(index + 1).padStart(2, '0');
}

function updateHeroGalleryProgress(duration) {
    const progressBar = document.getElementById('heroGalleryProgressBar');
    if (!progressBar) {
        return;
    }

    progressBar.style.transition = 'none';
    progressBar.style.transform = 'scaleX(0)';
    if (!duration || duration <= 0) {
        return;
    }

    runAfterNextPaint(function() {
        progressBar.style.transition = `transform ${duration}ms linear`;
        progressBar.style.transform = 'scaleX(1)';
    });
}

function updateHeroGalleryMeta(announce) {
    const current = document.getElementById('heroGalleryCurrent');
    const total = document.getElementById('heroGalleryTotal');
    const counter = document.querySelector('.hero-gallery-counter');

    if (counter) {
        counter.setAttribute('aria-live', announce ? 'polite' : 'off');
        counter.setAttribute('aria-atomic', 'true');
    }

    if (current) {
        current.textContent = formatHeroGalleryIndex(heroIndex);
    }
    if (total) {
        total.textContent = String(heroGallery.length).padStart(2, '0');
    }

    if (!counter || !announce) {
        return;
    }

    if (heroGalleryCounterAnnouncementTimeout !== null) {
        window.clearTimeout(heroGalleryCounterAnnouncementTimeout);
    }

    heroGalleryCounterAnnouncementTimeout = window.setTimeout(function() {
        counter.setAttribute('aria-live', 'off');
        heroGalleryCounterAnnouncementTimeout = null;
    }, 1800);
}

function updateHeroGalleryA11yLabels() {
    const language = getCurrentSiteLanguage();
    const labels = heroGalleryUiLabels[language] || heroGalleryUiLabels.de;
    const heroRegion = document.querySelector('.hero-bg');
    const galleryUi = document.querySelector('.hero-gallery-ui');
    const prevButton = document.querySelector('.hero-gallery-control--prev');
    const nextButton = document.querySelector('.hero-gallery-control--next');
    const autoplayButton = document.querySelector('.hero-gallery-control--autoplay');
    const pagination = document.querySelector('.hero-gallery-pagination');

    if (heroRegion) {
        heroRegion.setAttribute('aria-label', labels.region);
    }

    if (galleryUi) {
        galleryUi.setAttribute('role', 'group');
        galleryUi.setAttribute('aria-label', labels.controls);
    }

    if (prevButton) {
        prevButton.setAttribute('aria-label', labels.previous);
        prevButton.setAttribute('title', labels.previous);
    }

    if (nextButton) {
        nextButton.setAttribute('aria-label', labels.next);
        nextButton.setAttribute('title', labels.next);
    }

    if (autoplayButton) {
        const autoplayLabel = isHeroGalleryAutoplayInactive() ? labels.play : labels.pause;
        autoplayButton.setAttribute('aria-label', autoplayLabel);
        autoplayButton.setAttribute('title', autoplayLabel);
        autoplayButton.setAttribute('aria-pressed', String(isHeroGalleryAutoplayInactive()));
        autoplayButton.classList.toggle('is-paused', isHeroGalleryAutoplayInactive());
    }

    if (pagination) {
        pagination.setAttribute('aria-label', labels.pagination);
    }

    syncHeroGallerySlideAccessibility();
}

function syncHeroGallerySlideAccessibility() {
    const fadeContainer = document.querySelector('.hero-bg-fade-container');

    if (!fadeContainer || fadeContainer.children.length < 2 || !heroGallery.length) {
        return;
    }

    const language = getCurrentSiteLanguage();
    const labels = heroGalleryUiLabels[language] || heroGalleryUiLabels.de;
    const activeLayer = fadeToggle ? fadeContainer.children[0] : fadeContainer.children[1];
    const inactiveLayer = fadeToggle ? fadeContainer.children[1] : fadeContainer.children[0];
    const activeTitle = getHeroGalleryTitle(heroGallery[heroIndex], language) || `${labels.image} ${heroIndex + 1}`;

    if (activeLayer) {
        activeLayer.setAttribute('role', 'img');
        activeLayer.setAttribute('aria-hidden', 'false');
        activeLayer.setAttribute('aria-label', activeTitle);
    }

    if (inactiveLayer) {
        inactiveLayer.setAttribute('role', 'img');
        inactiveLayer.setAttribute('aria-hidden', 'true');
    }
}

function refreshHeroGalleryCaption() {
    const title = getHeroGalleryTitle(heroGallery[heroIndex], getCurrentSiteLanguage(), isCompactHeroGalleryViewport());
    document.querySelectorAll('.hero-bg-fade').forEach(function(layer) {
        const captionNode = ensureHeroGalleryCaptionLayer(layer);
        if (!captionNode) {
            return;
        }

        captionNode.textContent = title;
        captionNode.style.opacity = title ? '1' : '0';
        captionNode.style.transform = 'none';
        captionNode.style.transition = 'none';
    });
}

const requestHeroGalleryResponsiveSync = createAnimationFrameScheduler(function() {
    syncHeroGalleryActiveSlideStyle();
    refreshHeroGalleryUi(false);
});

function syncHeroGalleryResponsiveState() {
    requestHeroGalleryResponsiveSync();
}

function refreshHeroGalleryUi(announce) {
    updateHeroGalleryA11yLabels();
    refreshHeroGalleryCaption();
    renderHeroGalleryDots();
    updateHeroGalleryMeta(Boolean(announce));
}

function renderHeroGalleryDots() {
    const pagination = document.querySelector('.hero-gallery-pagination');
    if (!pagination) {
        return;
    }

    const language = getCurrentSiteLanguage();
    const labels = heroGalleryUiLabels[language] || heroGalleryUiLabels.de;
    pagination.innerHTML = '';

    for (let index = 0; index < heroGallery.length; index += 1) {
        const heroTitle = getHeroGalleryTitle(heroGallery[index], language);
        const button = document.createElement('button');
        button.className = 'hero-gallery-dot';
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-label', heroTitle ? `${labels.image} ${index + 1}: ${heroTitle}` : `${labels.image} ${index + 1}`);
        button.setAttribute('tabindex', index === heroIndex ? '0' : '-1');
        button.setAttribute('aria-selected', index === heroIndex ? 'true' : 'false');
        button.setAttribute('title', heroTitle || `${labels.image} ${index + 1}`);

        if (index === heroIndex) {
            button.classList.add('active');
        }

        button.addEventListener('click', function() {
            if (heroIndex !== index) {
                setHeroBgCrossfade(index, true);
                pauseHeroGalleryAuto();
            }
        });

        button.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                const previousIndex = (index - 1 + heroGallery.length) % heroGallery.length;
                pagination.children[previousIndex].focus();
                pagination.children[previousIndex].click();
            } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                const nextIndex = (index + 1) % heroGallery.length;
                pagination.children[nextIndex].focus();
                pagination.children[nextIndex].click();
            }
        });

        pagination.appendChild(button);
    }
}