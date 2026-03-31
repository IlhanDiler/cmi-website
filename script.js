// Lightbox für Event-Bilder
function initEventLightbox() {
    const lightboxModal = document.getElementById('eventLightboxModal');
    const lightboxImg = document.getElementById('eventLightboxImg');
    const lightboxCloseBtn = document.getElementById('eventLightboxClose');
    const lightboxCaptionKicker = document.getElementById('eventLightboxCaptionKicker');
    const lightboxCaptionTitle = document.getElementById('eventLightboxCaptionTitle');
    const lightboxCaptionMeta = document.getElementById('eventLightboxCaptionMeta');
    const lightboxLanguageLabels = {
        de: { kicker: 'Konzertplakat' },
        en: { kicker: 'Concert Poster' },
        it: { kicker: 'Manifesto del concerto' }
    };
    let lastTrigger = null;

    if (!lightboxModal || !lightboxImg) {
        return;
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
            return 'de';
        }

        const visibleHeadline = Array.from(eventCard.querySelectorAll('.event-headline[data-lang]')).find(function(node) {
            return window.getComputedStyle(node).display !== 'none';
        });

        return visibleHeadline ? visibleHeadline.getAttribute('data-lang') || 'de' : 'de';
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
        lightboxImg.alt = image.alt || 'Event Bild';

        const caption = getLightboxCaption(image);
        if (lightboxCaptionKicker) {
            lightboxCaptionKicker.textContent = (lightboxLanguageLabels[caption.language] || lightboxLanguageLabels.de).kicker;
        }
        if (lightboxCaptionTitle) {
            lightboxCaptionTitle.textContent = caption.title || lightboxImg.alt;
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
        lightboxImg.alt = 'Event Bild';
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

    lightboxModal.setAttribute('aria-hidden', 'true');
}
// Dynamisch Abstand zwischen Gallery und nächster Section minimieren
function minimizeGallerySectionGap() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) {
        return;
    }

    let nextSection = heroBg;
    while (nextSection && nextSection.nextElementSibling && nextSection.nextElementSibling.nodeType !== 1) {
        nextSection = nextSection.nextElementSibling;
    }
    nextSection = nextSection && nextSection.nextElementSibling;
    if (nextSection) {
        nextSection.style.marginTop = '0';
    }
}

function fitChristmetteImg() {
    const christmetteImg = document.querySelector('.christmette-img-tall');
    if (!christmetteImg) {
        return;
    }

    if (window.innerWidth <= 600) {
        christmetteImg.style.width = '100vw';
        christmetteImg.style.height = 'auto';
        christmetteImg.style.objectFit = 'cover';
        christmetteImg.style.display = 'block';
        christmetteImg.style.margin = '0 auto';
        return;
    }

    christmetteImg.style.width = '';
    christmetteImg.style.height = '';
    christmetteImg.style.objectFit = '';
    christmetteImg.style.display = '';
    christmetteImg.style.margin = '';
}

function initHeroLayout() {
    minimizeGallerySectionGap();
    fitChristmetteImg();
}
// Hero-BG Gallery/Slideshow
const heroGalleryUiLabels = {
    de: {
        image: 'Bild',
        previous: 'Vorheriges Bild',
        next: 'Nächstes Bild',
        pagination: 'Hero Gallery Pagination'
    },
    en: {
        image: 'Image',
        previous: 'Previous image',
        next: 'Next image',
        pagination: 'Hero gallery pagination'
    },
    it: {
        image: 'Immagine',
        previous: 'Immagine precedente',
        next: 'Immagine successiva',
        pagination: 'Paginazione galleria hero'
    }
};

const heroGallery = [

    { src: 'bilder/Weihnachtskonzert Spitalkirche.png', title: { de: '„Weihnachtskonzert zum Mitsingen 2025“ in der Spitalkirche Ochsenfurt', en: '"Christmas Sing-Along Concert 2025" at Spitalkirche Ochsenfurt', it: '"Concerto di Natale da cantare insieme 2025" nella Spitalkirche di Ochsenfurt' }, shortTitle: { de: 'Weihnachtskonzert 2025 in Ochsenfurt', en: 'Christmas Sing-Along 2025 in Ochsenfurt', it: 'Concerto di Natale 2025 a Ochsenfurt' } },
    { src: 'bilder/Gruppenbild2.jpg', title: { de: 'Benefizkonzert für „Ärzte ohne Grenzen“ 2025 im Hotel Meintz Ochsenfurt', en: 'Benefit concert for "Doctors Without Borders" 2025 at Hotel Meintz Ochsenfurt', it: 'Concerto benefico per "Medici Senza Frontiere" 2025 all\'Hotel Meintz di Ochsenfurt' }, shortTitle: { de: 'Benefizkonzert 2025 im Hotel Meintz', en: 'Benefit concert 2025 at Hotel Meintz', it: 'Concerto benefico 2025 all\'Hotel Meintz' } },
     { src: 'bilder/gruppe_2007.jpeg', title: { de: 'CMI 2009', en: 'CMI 2009', it: 'CMI 2009' } },
    { src: 'bilder/peterbild.jpg', title: { de: 'Gedenkfeier - „80 Jahre Kriegsende, 80 Jahre Frieden“ in Ochsenfurt 2025', en: 'Commemorative event - "80 Years Since the End of War, 80 Years of Peace" in Ochsenfurt 2025', it: 'Cerimonia commemorativa - "80 anni dalla fine della guerra, 80 anni di pace" a Ochsenfurt 2025' }, shortTitle: { de: 'Gedenkfeier 80 Jahre Frieden 2025', en: '80 Years of Peace commemoration 2025', it: 'Commemorazione 80 anni di pace 2025' } },
    { src: 'bilder/concello.jfif', title: { de: 'ConCello 2025 in der Klosterkirche Ochsenfurt', en: 'ConCello 2025 at Klosterkirche Ochsenfurt', it: 'ConCello 2025 nella Klosterkirche di Ochsenfurt' }, shortTitle: { de: 'ConCello 2025 in Ochsenfurt', en: 'ConCello 2025 in Ochsenfurt', it: 'ConCello 2025 a Ochsenfurt' } },
    { src: 'bilder/gruppemitflagge.jpg', title: { de: 'CMI und Veeh-Harfengruppe Querbeet 2025', en: 'CMI and the Veeh Harp Ensemble Querbeet 2025', it: 'CMI e il gruppo di arpe Veeh Querbeet 2025' }, shortTitle: { de: 'CMI und Querbeet 2025', en: 'CMI and Querbeet 2025', it: 'CMI e Querbeet 2025' } },
     { src: 'bilder/klosterkirche.jpg', title: { de: 'Klosterkirche 2024', en: 'Klosterkirche 2024', it: 'Klosterkirche 2024' } },
     { src: 'bilder/salboro_santa_maria_assunta_2024.jpg', title: { de: 'Salboro Santa Maria Assunta 2024', en: 'Salboro Santa Maria Assunta 2024', it: 'Salboro Santa Maria Assunta 2024' } },
     { src: 'bilder/Jubiläumskonzert_2016.jpg', title: { de: 'Jubiläumskonzert 2016', en: 'Anniversary Concert 2016', it: 'Concerto anniversario 2016' } },
     { src: 'bilder/Gruppenfoto_St._Thekla_2022.jpg', title: { de: 'CMI und BGS St. Thekla 2022', en: 'CMI and BGS St. Thekla 2022', it: 'CMI e BGS St. Thekla 2022' } },
     { src: 'bilder/Scheunenkonzert 17.07.jpg',title: { de: '', en: '', it: '' } },
    { src: 'bilder/Gruppe17.09.11.png', title: { de: 'Jubiläumskonzert zum 30-jährigen Bestehen am 17.09.11', en: '30th anniversary concert on 17 September 2011', it: 'Concerto per il 30° anniversario il 17.09.11' }, shortTitle: { de: 'Jubiläumskonzert 30 Jahre CMI', en: '30th anniversary concert', it: 'Concerto per i 30 anni del CMI' } },
    
     //  { src: 'bilder/konzert.jpg', title: 'Benefizkonzert für „Ärzte ohne Grenzen“ 2025 im Maintz Hotel Ochsenfurt' },
  //   { src: 'bilder/maria_schnee_neujahrskonzert_2023.png', title: 'Neujahrskonzert 2023' },
   //  { src: 'bilder/Gruppenbild.jpg', title: 'Collegium Musicum Iuvenale 2025' },
   
     //   { src: 'bilder/gaukönigshofen.jpg', title: 'Benefizkonzert 2024 in Gaukönigshofen' },
   
  //   { src: 'bilder/christuskirche_27_april_2024_2.jpg', title: 'Christuskirche 2024' },
  //   { src: 'bilder/christuskirche_27_april_2024_3.jpg', title: 'Christuskirche 2024' },
//{ src: 'bilder/salboro_santa_maria_assunta_2024_2.jpg', title: 'Salboro Santa Maria Assunta 2024 – 2' },
//{ src: 'bilder/Gruppe CMI BGS Veehnklang April 2023.jpg', title: 'Gruppe CMI BGS Veehnklang April 2023' },
//{ src: 'bilder/Gruppenbild 2022.jpg', title: 'Gruppenbild 2022' },
//{ src: 'bilder/Grundschule.JPG', title: 'Grundschule' },
//{ src: 'bilder/Spendenübergabe.jpg', title: 'Spendenübergabe' },
//{ src: 'bilder/Singen schenke uns.png', title: 'Singen schenke uns' },
//{ src: 'bilder/Gib uns Fireden 1.png', title: 'Gib uns Frieden' },
//{ src: 'bilder/GoPro002 (4).png', title:'' },
//{ src: 'bilder/DSC_4255.JPG', title: 'St Thekla 2017' },
//{ src: 'bilder/Gruppe 2016 2.jpg', title: 'Gruppe 2016' },
//{ src: 'bilder/Tutti insieme 2016.jpg', title: 'Tutti insieme 2016' },
//{ src: 'bilder/7 Gruppe CMI 2013.JPG', title: 'Gruppe CMI 2013' },
//{ src: 'bilder/6 Gruppe 05.01.2013.jpg', title: 'Gruppe 05.01.2013' },
// { src: 'bilder/Mitte.jpg', title: '' },
// { src: 'bilder/CMI in chiesa St.Wolfgang.jpg', title: 'CMI in St.Wolfgang' },
// { src: 'bilder/Totale.jpg', title: '' },
// { src: 'bilder/Mitte.jpg', title: '' },
// { src: 'bilder/Ochsenfurt 05.03.2011.JPG', title: 'Ochsenfurt 05.03.2011' },
// { src: 'bilder/DSC_6083.JPG', title: '' },
// { src: 'bilder/DSC_4296.JPG', title: '' }, 
// { src: 'bilder/Gruppenfoto Weikersheim.jpg', title: 'Gruppenfoto Weikersheim 2006' },
// { src: 'bilder/Opern-Gala-BGS - 20 von 44.jpg', title: 'Opern-Gala-BGS' },
//{ src: 'bilder/Weikersheim_2006.png', title: 'Weikersheim 2006' }, 
//{ src: 'bilder/Ochsenfurt 23.07.2005.JPG', title: 'Ochsenfurt 23.07.2005' }, 
    
];
    const heroGalleryDesktopFocusImages = new Set([
        'bilder/Weihnachtskonzert Spitalkirche.png',
        'bilder/Jubiläumskonzert_2016.jpg',
        'bilder/gruppe_2007.jpeg',
        'bilder/peterbild.jpg',
        'bilder/klosterkirche.jpg',
        'bilder/concello.jfif'
    ]);
let heroIndex = 0;
const heroSlideDuration = 6500;
const heroFadeDuration = 1400;
const heroInteractionPauseDuration = 12000;
let fadeToggle = false;
let isFading = false;
let heroGalleryTimeout = null;
let heroGalleryResponsiveRefreshFrame = null;
let heroGalleryUiVisibilityTimeout = null;

function getCurrentSiteLanguage() {
    try {
        const storedLanguage = localStorage.getItem('siteLang');
        if (storedLanguage === 'de' || storedLanguage === 'en' || storedLanguage === 'it') {
            return storedLanguage;
        }
    } catch (e) {}

    const htmlLanguage = document.documentElement.getAttribute('lang');
    if (htmlLanguage === 'de' || htmlLanguage === 'en' || htmlLanguage === 'it') {
        return htmlLanguage;
    }

    return 'de';
}

function isCompactHeroGalleryViewport() {
    return window.matchMedia('(max-width: 700px)').matches;
}

function getHeroGalleryTitle(entry, language = getCurrentSiteLanguage(), preferCompact = false) {
    if (!entry) {
        return '';
    }

    if (typeof entry.title === 'string') {
        return entry.title;
    }

    if (preferCompact && entry.shortTitle) {
        return entry.shortTitle[language] || entry.shortTitle.de || entry.title[language] || entry.title.de || '';
    }

    return entry.title[language] || entry.title.de || '';
}

function formatHeroGalleryIndex(index) {
    return String(index + 1).padStart(2, '0');
}

function updateHeroGalleryProgress(duration) {
    const progressBar = document.getElementById('heroGalleryProgressBar');
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.transform = 'scaleX(0)';
    if (!duration || duration <= 0) return;
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            progressBar.style.transition = `transform ${duration}ms linear`;
            progressBar.style.transform = 'scaleX(1)';
        });
    });
}

function updateHeroGalleryMeta() {
    const current = document.getElementById('heroGalleryCurrent');
    const total = document.getElementById('heroGalleryTotal');
    if (current) current.textContent = formatHeroGalleryIndex(heroIndex);
    if (total) total.textContent = String(heroGallery.length).padStart(2, '0');
}

function updateHeroGalleryA11yLabels() {
    const language = getCurrentSiteLanguage();
    const labels = heroGalleryUiLabels[language] || heroGalleryUiLabels.de;
    const prevButton = document.querySelector('.hero-gallery-control--prev');
    const nextButton = document.querySelector('.hero-gallery-control--next');
    const pagination = document.querySelector('.hero-gallery-pagination');

    if (prevButton) {
        prevButton.setAttribute('aria-label', labels.previous);
        prevButton.setAttribute('title', labels.previous);
    }

    if (nextButton) {
        nextButton.setAttribute('aria-label', labels.next);
        nextButton.setAttribute('title', labels.next);
    }

    if (pagination) {
        pagination.setAttribute('aria-label', labels.pagination);
    }
}

function refreshHeroGalleryCaption() {
    const title = getHeroGalleryTitle(heroGallery[heroIndex], getCurrentSiteLanguage(), isCompactHeroGalleryViewport());
    document.querySelectorAll('.hero-bg-fade .fadein-text').forEach(function(captionNode) {
        captionNode.textContent = title;
        captionNode.style.opacity = title ? '1' : '0';
        captionNode.style.transform = 'none';
        captionNode.style.transition = 'none';
    });
}

function syncHeroGalleryResponsiveState() {
    if (heroGalleryResponsiveRefreshFrame !== null) {
        return;
    }

    heroGalleryResponsiveRefreshFrame = requestAnimationFrame(function() {
        heroGalleryResponsiveRefreshFrame = null;
        refreshHeroGalleryUi();
    });
}

function refreshHeroGalleryUi() {
    updateHeroGalleryA11yLabels();
    refreshHeroGalleryCaption();
    renderHeroGalleryDots();
    updateHeroGalleryMeta();
}

function clearHeroGalleryUiVisibilityTimeout() {
    if (heroGalleryUiVisibilityTimeout) {
        clearTimeout(heroGalleryUiVisibilityTimeout);
        heroGalleryUiVisibilityTimeout = null;
    }
}

function showHeroGalleryUi(duration = 2600) {
    const galleryUi = document.querySelector('.hero-gallery-ui');
    if (!galleryUi) {
        return;
    }

    galleryUi.classList.add('hero-gallery-ui--active');
    clearHeroGalleryUiVisibilityTimeout();
}

function hideHeroGalleryUi() {
    const galleryUi = document.querySelector('.hero-gallery-ui');
    if (!galleryUi) {
        return;
    }

    clearHeroGalleryUiVisibilityTimeout();
    galleryUi.classList.add('hero-gallery-ui--active');
}

function clearHeroGalleryAuto() {
    if (heroGalleryTimeout) {
        clearTimeout(heroGalleryTimeout);
        heroGalleryTimeout = null;
    }
}

function scheduleHeroGalleryAuto(delay = heroSlideDuration) {
    clearHeroGalleryAuto();
    updateHeroGalleryProgress(delay);
    heroGalleryTimeout = setTimeout(() => {
        nextHeroBgImage();
        scheduleHeroGalleryAuto(heroSlideDuration);
    }, delay);
}

function pauseHeroGalleryAuto() {
    scheduleHeroGalleryAuto(heroInteractionPauseDuration);
}

function stopHeroGalleryAuto() {
    clearHeroGalleryAuto();
    updateHeroGalleryProgress(0);
}

function getHeroGallerySlideStyle(entry, index) {
    if (!entry) {
        return { backgroundPosition: 'center 10%', backgroundSize: 'cover' };
    }

    if (window.innerWidth <= 700) {
        return {
            backgroundPosition: 'center center',
            backgroundSize: 'contain'
        };
    }

    return {
        backgroundPosition: heroGalleryDesktopFocusImages.has(entry.src) ? 'center 60%' : 'center 10%',
        backgroundSize: 'cover'
    };
}

function setHeroBgCrossfade(idx) {
    if (isFading) return;
    isFading = true;
    const fadeContainer = document.querySelector('.hero-bg-fade-container');
    if (!fadeContainer) { isFading = false; return; }
    const fadeA = fadeContainer.children[0];
    const fadeB = fadeContainer.children[1];
    const current = fadeToggle ? fadeA : fadeB;
    const next = fadeToggle ? fadeB : fadeA;
    const currentEntry = heroGallery[idx];
    const heroTitle = getHeroGalleryTitle(currentEntry);
    const slideStyle = getHeroGallerySlideStyle(currentEntry, idx);

    next.style.backgroundImage = `url('${currentEntry.src}')`;
    next.style.opacity = '0';
    next.style.transition = `opacity ${heroFadeDuration / 1000}s cubic-bezier(.22,1,.36,1)`;
    next.style.backgroundPosition = slideStyle.backgroundPosition;
    next.style.backgroundSize = slideStyle.backgroundSize;

    let fadeinDiv = next.querySelector('.fadein-text');
    if (!fadeinDiv) {
        fadeinDiv = document.createElement('div');
        fadeinDiv.className = 'fadein-text';
        next.appendChild(fadeinDiv);
    }
    fadeinDiv.textContent = heroTitle;
    if (heroTitle === '') {
        fadeinDiv.style.opacity = '0';
        fadeinDiv.style.transform = 'none';
        fadeinDiv.style.transition = 'none';
    } else {
        fadeinDiv.style.opacity = '1';
        fadeinDiv.style.transform = 'none';
        fadeinDiv.style.transition = 'none';
    }

    refreshHeroGalleryUi();

    // Start fade in
    setTimeout(() => {
        next.style.opacity = '1';
        current.style.opacity = '0';
        current.style.transition = `opacity ${heroFadeDuration / 1000}s cubic-bezier(.22,1,.36,1)`;

        if (heroTitle !== '') {
            fadeinDiv.style.opacity = '1';
            fadeinDiv.style.transform = 'none';
        } else {
            fadeinDiv.style.opacity = '0';
            fadeinDiv.style.transform = 'none';
        }

        let prevFadein = current.querySelector('.fadein-text');
        if (prevFadein) {
            prevFadein.style.opacity = '0';
            prevFadein.style.transform = 'none';
        }
        setTimeout(() => {
            fadeToggle = !fadeToggle;
            isFading = false;
        }, heroFadeDuration);
    }, 50);
}
function nextHeroBgImage() {
    heroIndex = (heroIndex + 1) % heroGallery.length;
    setHeroBgCrossfade(heroIndex);
}

function prevHeroBgImage() {
    heroIndex = (heroIndex - 1 + heroGallery.length) % heroGallery.length;
    setHeroBgCrossfade(heroIndex);
}

function renderHeroGalleryDots() {
    const pagination = document.querySelector('.hero-gallery-pagination');
    if (!pagination) return;
    const language = getCurrentSiteLanguage();
    const labels = heroGalleryUiLabels[language] || heroGalleryUiLabels.de;
    // Remove all children
    pagination.innerHTML = '';
    for (let i = 0; i < heroGallery.length; i++) {
        const heroTitle = getHeroGalleryTitle(heroGallery[i], language);
        const btn = document.createElement('button');
        btn.className = 'hero-gallery-dot';
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-label', heroTitle ? `${labels.image} ${i + 1}: ${heroTitle}` : `${labels.image} ${i + 1}`);
        btn.setAttribute('tabindex', i === heroIndex ? '0' : '-1');
        btn.setAttribute('aria-selected', i === heroIndex ? 'true' : 'false');
        btn.setAttribute('title', heroTitle || `${labels.image} ${i + 1}`);
        if (i === heroIndex) btn.classList.add('active');
        btn.addEventListener('click', function() {
            if (heroIndex !== i) {
                heroIndex = i;
                setHeroBgCrossfade(heroIndex);
                pauseHeroGalleryAuto();
            }
        });
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                let prev = (i - 1 + heroGallery.length) % heroGallery.length;
                pagination.children[prev].focus();
                pagination.children[prev].click();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                let next = (i + 1) % heroGallery.length;
                pagination.children[next].focus();
                pagination.children[next].click();
            }
        });
        pagination.appendChild(btn);
    }
}

function initHeroGallery() {
    const heroBg = document.querySelector('.hero-bg');
    const fadeContainer = document.querySelector('.hero-bg-fade-container');
    const galleryUi = document.querySelector('.hero-gallery-ui');
    const prevButton = document.querySelector('.hero-gallery-control--prev');
    const nextButton = document.querySelector('.hero-gallery-control--next');
    if (!heroBg || !fadeContainer || fadeContainer.children.length < 2 || !heroGallery.length) {
        return;
    }

    if (galleryUi) {
        galleryUi.classList.add('hero-gallery-ui--active');
    }

    setHeroBgCrossfade(heroIndex);
    scheduleHeroGalleryAuto(heroSlideDuration);

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            showHeroGalleryUi();
            prevHeroBgImage();
            pauseHeroGalleryAuto();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            showHeroGalleryUi();
            nextHeroBgImage();
            pauseHeroGalleryAuto();
        });
    }

    if (heroBg) {
        let touchStartX = 0;
        heroBg.addEventListener('mouseenter', function() {
        });
        heroBg.addEventListener('mouseleave', function() {
        });
        heroBg.addEventListener('pointerdown', function() {
        }, { passive: true });
        heroBg.addEventListener('focusin', function() {
        });
        heroBg.addEventListener('focusout', function() {
        });
        heroBg.addEventListener('touchstart', function(event) {
            if (!event.changedTouches || !event.changedTouches[0]) return;
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });
        heroBg.addEventListener('touchend', function(event) {
            if (!event.changedTouches || !event.changedTouches[0]) return;
            const deltaX = event.changedTouches[0].clientX - touchStartX;
            if (Math.abs(deltaX) < 40) return;
            if (deltaX > 0) {
                prevHeroBgImage();
            } else {
                nextHeroBgImage();
            }
            pauseHeroGalleryAuto();
        }, { passive: true });
    }
}

window.addEventListener('resize', minimizeGallerySectionGap);
window.addEventListener('resize', fitChristmetteImg);
window.addEventListener('resize', syncHeroGalleryResponsiveState);
// Scroll-Reveal für Cards
function revealOnScroll(selector) {
    const elements = document.querySelectorAll(selector);
    const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
}

function initMobileNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    function closeMobileMenu() {
        if (!mobileMenu || !mobileMenuBtn) {
            return;
        }

        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', String(mobileMenu.classList.contains('active')));
        });

        document.addEventListener('click', function(event) {
            if (!mobileMenu.classList.contains('active')) {
                return;
            }

            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 700) {
                closeMobileMenu();
            }
        });
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) {
                return;
            }

            const targetSection = document.querySelector(targetId);
            if (!targetSection) {
                return;
            }

            event.preventDefault();
            closeMobileMenu();
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar || navbar.dataset.scrollInit === 'true') {
        return;
    }

    navbar.dataset.scrollInit = 'true';

    function setNavbarStyle(isScrolled) {
        navbar.classList.toggle('navbar-scrolled', isScrolled);

        if (isScrolled) {
            navbar.style.setProperty('background', 'rgba(1, 3, 4, 0.98)', 'important');
            navbar.style.setProperty('border-bottom-color', 'rgba(255, 255, 255, 0.18)', 'important');
            navbar.style.setProperty('box-shadow', '0 10px 24px rgba(0, 0, 0, 0.26)', 'important');
            return;
        }

        navbar.style.removeProperty('background');
        navbar.style.removeProperty('border-bottom-color');
        navbar.style.removeProperty('box-shadow');
    }

    function handleNavbarScroll() {
        const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        setNavbarStyle(scrollTop > 12);
    }

    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
}

function initShapeParallax() {
    const shapes = document.querySelectorAll('.shape');
    if (!shapes.length) {
        return;
    }

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });
}

function initFieldValidation() {
    if (typeof validateField !== 'function') {
        return;
    }

    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function updateYearsPassed() {
    const yearsPassedEl = document.getElementById('yearsPassed');
    if (!yearsPassedEl) {
        return;
    }

    yearsPassedEl.textContent = new Date().getFullYear() - 1981;
}

const supportedSiteLanguages = new Set(['de', 'en', 'it']);
const mbondaTimelineLinkSelector = '.timeline-item-title a[href="https://www.mbonda-lokito.org/home.html"]';

function isSupportedSiteLanguage(lang) {
    return supportedSiteLanguages.has(lang);
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

function applySiteLanguage(lang) {
    if (!isSupportedSiteLanguage(lang)) {
        return;
    }

    document.querySelectorAll('[data-lang]').forEach(function(element) {
        element.style.display = element.getAttribute('data-lang') === lang ? '' : 'none';
    });

    document.documentElement.setAttribute('lang', lang);

    try {
        localStorage.setItem('siteLang', lang);
    } catch (e) {}

    refreshHeroGalleryUi();
    ensureMbondaTimelineLinksAccessible();
}

window.setLang = applySiteLanguage;

function initSiteLanguage() {
    applySiteLanguage(getCurrentSiteLanguage());
}

function initSiteFeatures() {
    initEventLightbox();
    initHeroLayout();
    initHeroGallery();
    revealOnScroll('.modern-card');
    revealOnScroll('.musikfamilie-card');
    if (typeof initAccordion === 'function') {
        initAccordion();
    }
    initMobileNavigation();
    initNavbarScroll();
    initShapeParallax();
    initFieldValidation();
    updateYearsPassed();
    initSiteLanguage();
}

document.addEventListener('DOMContentLoaded', initSiteFeatures);
document.addEventListener('DOMContentLoaded', initNavbarScroll);

window.addEventListener('load', initNavbarScroll);

window.addEventListener('resize', ensureMbondaTimelineLinksAccessible);