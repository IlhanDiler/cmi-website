// Lightbox für Event-Bilder
document.addEventListener('DOMContentLoaded', function() {
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
    const getVisibleNodeText = function(container, selector) {
        if (!container) {
            return '';
        }

        const matchingNode = Array.from(container.querySelectorAll(selector)).find(function(node) {
            return window.getComputedStyle(node).display !== 'none';
        });

        return matchingNode ? matchingNode.textContent.trim() : '';
    };
    const getActiveLanguage = function(image) {
        const eventCard = image ? image.closest('.event-card') : null;
        if (!eventCard) {
            return 'de';
        }

        const visibleHeadline = Array.from(eventCard.querySelectorAll('.event-headline[data-lang]')).find(function(node) {
            return window.getComputedStyle(node).display !== 'none';
        });

        return visibleHeadline ? visibleHeadline.getAttribute('data-lang') || 'de' : 'de';
    };
    const getLightboxCaption = function(image) {
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
    };
    const openLightbox = function(image) {
        if (!lightboxImg || !lightboxModal) {
            return;
        }

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
        document.body.style.overflow = 'hidden';
        if (lightboxCloseBtn) {
            lightboxCloseBtn.focus();
        }
    };
    const closeLightbox = function() {
        if (!lightboxImg || !lightboxModal) {
            return;
        }

        lightboxModal.style.display = 'none';
        lightboxImg.src = '';
        lightboxImg.alt = 'Event Bild';
        if (lightboxCaptionTitle) {
            lightboxCaptionTitle.textContent = '';
        }
        if (lightboxCaptionMeta) {
            lightboxCaptionMeta.textContent = '';
        }
        document.body.style.overflow = '';
    };
    document.querySelectorAll('.event-lightbox-img, .event-lightbox-trigger').forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this);
        });
    });
    if (lightboxCloseBtn && lightboxModal && lightboxImg) {
        lightboxCloseBtn.addEventListener('click', function() {
            closeLightbox();
        });
    }
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal || e.target === lightboxImg) {
                closeLightbox();
            }
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.style.display === 'flex') {
            closeLightbox();
        }
    });
});
// Dynamisch Abstand zwischen Gallery und nächster Section minimieren
function minimizeGallerySectionGap() {
    const heroBg = document.querySelector('.hero-bg');
    // Finde die nächste Section nach .hero-bg
    let nextSection = heroBg;
    while (nextSection && nextSection.nextElementSibling && nextSection.nextElementSibling.nodeType !== 1) {
        nextSection = nextSection.nextElementSibling;
    }
    nextSection = nextSection && nextSection.nextElementSibling;
    if (nextSection) {
        // Setze einen festen Abstand, z.B. 8vw, damit der Abstand zur Navbar und zur Section gleich ist
        nextSection.style.marginTop = '8vw';
    }
}
window.addEventListener('resize', minimizeGallerySectionGap);
window.addEventListener('DOMContentLoaded', minimizeGallerySectionGap);
// Bild in .hero-bg immer vollständig anzeigen, unabhängig von der Screen-Größe
window.addEventListener('DOMContentLoaded', function() {
    // Dynamisch hero-bg-Containerhöhe an Bildhöhe für mobile Screens anpassen
    function setHeroBgHeightResponsive() {
        const heroBg = document.querySelector('.hero-bg');
        if (!heroBg) return;
        let heroImg = heroBg.querySelector('img');
        if (window.innerWidth <= 900 && heroImg && heroImg.complete && heroImg.naturalHeight) {
            // Für mobile und Tablet: Containerhöhe exakt wie Bildhöhe, aber max 100vh
            let imgRatio = heroImg.naturalWidth / heroImg.naturalHeight;
            let containerWidth = heroBg.offsetWidth;
            let newHeight = containerWidth / imgRatio;
            if (newHeight > window.innerHeight) newHeight = window.innerHeight;
            heroBg.style.height = newHeight + 'px';
            heroBg.style.minHeight = '0';
        } else {
            // Für größere Screens: Standardhöhe (z.B. 100vh)
            heroBg.style.height = '';
            heroBg.style.minHeight = '100vh';
        }
    }
    setHeroBgHeightResponsive();
    window.addEventListener('resize', setHeroBgHeightResponsive);
    const heroBgImg = document.querySelector('.hero-bg img');
    if (heroBgImg) heroBgImg.onload = setHeroBgHeightResponsive;

    // Charity-Projekt: Christmette 2024 Bild auf mobilen Screens volle Breite und flexible Höhe
    function fitChristmetteImg() {
        var christmetteImg = document.querySelector('.christmette-img-tall');
        if (!christmetteImg) return;
        if (window.innerWidth <= 600) {
            christmetteImg.style.width = '100vw';
            christmetteImg.style.height = 'auto';
            christmetteImg.style.objectFit = 'cover';
            christmetteImg.style.display = 'block';
            christmetteImg.style.margin = '0 auto';
        } else {
            christmetteImg.style.width = '';
            christmetteImg.style.height = '';
            christmetteImg.style.objectFit = '';
            christmetteImg.style.display = '';
            christmetteImg.style.margin = '';
        }
    }
    fitChristmetteImg();
    window.addEventListener('resize', fitChristmetteImg);
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    const heroImg = heroBg.querySelector('img');
    if (!heroImg) return;

    function fitHeroImg() {
        // Setze das Bild so, dass es immer komplett sichtbar ist
        heroImg.style.width = '';
        heroImg.style.height = '';
        heroImg.style.maxWidth = '100%';
        heroImg.style.maxHeight = '100vh';
        heroImg.style.objectFit = 'contain';
        heroImg.style.display = 'block';
        heroImg.style.margin = '0 auto';
        // Optional: Passe Höhe an, falls Container kleiner als Bild ist
        const containerRect = heroBg.getBoundingClientRect();
        if (heroImg.naturalWidth && heroImg.naturalHeight) {
            const aspect = heroImg.naturalWidth / heroImg.naturalHeight;
            let newWidth = containerRect.width;
            let newHeight = newWidth / aspect;
            if (newHeight > window.innerHeight) {
                newHeight = window.innerHeight;
                newWidth = newHeight * aspect;
            }
            heroImg.style.width = newWidth + 'px';
            heroImg.style.height = newHeight + 'px';
        }
    }

    if (heroImg.complete) {
        fitHeroImg();
    } else {
        heroImg.onload = fitHeroImg;
    }
    window.addEventListener('resize', fitHeroImg);
});
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
        captionNode.style.transform = title ? 'translateY(0)' : 'translateY(34px)';
        captionNode.style.transition = title ? '' : 'none';
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

    if (!duration || duration <= 0) {
        return;
    }

    heroGalleryUiVisibilityTimeout = setTimeout(function() {
        if (!galleryUi.matches(':focus-within')) {
            galleryUi.classList.remove('hero-gallery-ui--active');
        }
        heroGalleryUiVisibilityTimeout = null;
    }, duration);
}

function hideHeroGalleryUi() {
    const galleryUi = document.querySelector('.hero-gallery-ui');
    if (!galleryUi || galleryUi.matches(':focus-within')) {
        return;
    }

    clearHeroGalleryUiVisibilityTimeout();
    galleryUi.classList.remove('hero-gallery-ui--active');
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

function setHeroBgCrossfade(idx) {
    if (isFading) return;
    isFading = true;
    const fadeContainer = document.querySelector('.hero-bg-fade-container');
    if (!fadeContainer) { isFading = false; return; }
    const fadeA = fadeContainer.children[0];
    const fadeB = fadeContainer.children[1];
    const current = fadeToggle ? fadeA : fadeB;
    const next = fadeToggle ? fadeB : fadeA;
    const heroTitle = getHeroGalleryTitle(heroGallery[idx]);
    // Set next image and bring to front
    next.style.backgroundImage = `url('${heroGallery[idx].src}')`;
    next.style.opacity = '0';
    next.style.transition = `opacity ${heroFadeDuration / 1000}s cubic-bezier(.22,1,.36,1)`;
    // Set or update fadein-text overlay
    let fadeinDiv = next.querySelector('.fadein-text');
    if (!fadeinDiv) {
        fadeinDiv = document.createElement('div');
        fadeinDiv.className = 'fadein-text';
        next.appendChild(fadeinDiv);
    }
    fadeinDiv.textContent = heroTitle;
    if (heroTitle === '') {
        fadeinDiv.style.opacity = '0';
        fadeinDiv.style.transform = 'translateY(34px)';
        fadeinDiv.style.transition = 'none';
    } else {
        fadeinDiv.style.opacity = '0';
        fadeinDiv.style.transform = 'translateY(46px)';
        fadeinDiv.style.transition = '';
    }
    // Individual background position logic (existing)
    if (window.innerWidth <= 600) {
        if (idx === 2) {
            next.style.backgroundPosition = 'center 8%';
            next.style.backgroundSize = '100vw auto';
        } else {
            next.style.backgroundPosition = 'center 10%';
            next.style.backgroundSize = '100vw auto';
        }
    } else {
    if (
        heroGallery[idx].src.includes('bilder/Weihnachtskonzert Spitalkirche.png') ||
        heroGallery[idx].src.includes('bilder/Jubiläumskonzert_2016.jpg')||
        heroGallery[idx].src.includes('bilder/gruppe_2007.jpeg') ||
        heroGallery[idx].src.includes('bilder/Ochsenfurt 23.07.2005.JPG') ||
        heroGallery[idx].src.includes('bilder/Opern-Gala-BGS - 20 von 44.jpg') ||
        heroGallery[idx].src.includes('bilder/Ochsenfurt 05.03.2011.JPG') ||
        heroGallery[idx].src.includes('bilder/CMI in chiesa St.Wolfgang.jpg') ||
        heroGallery[idx].src.includes('bilder/Totale.jpg') ||
        heroGallery[idx].src.includes('bilder/6 Gruppe 05.01.2013.jpg') ||
        heroGallery[idx].src.includes('bilder/DSC_4255.JPG') ||
        heroGallery[idx].src.includes('bilder/Gruppenbild 2022.jpg') ||
        heroGallery[idx].src.includes('bilder/salboro_santa_maria_assunta_2024.jpg') ||
        heroGallery[idx].src.includes('bilder/salboro_santa_maria_assunta_2024_2.jpg') ||
        heroGallery[idx].src.includes('bilder/peterbild.jpg') ||
        heroGallery[idx].src.includes('bilder/klosterkirche.jpg') ||
        heroGallery[idx].src.includes('salboro_santa_maria_assunta_2024.jpg') ||
        heroGallery[idx].src.includes('salboro_santa_maria_assunta_2024_2.jpg') ||
        heroGallery[idx].src.includes('christuskirche_27_april_2024.jpg') ||
        heroGallery[idx].src.includes('christuskirche_27_april_2024_2.jpg') ||
        heroGallery[idx].src.includes('concello.jfif')
    ) {
        next.style.backgroundPosition = 'center 60%';
    } else   {
        next.style.backgroundPosition = 'center 10%';
    } 
}
    // Start fade in
    setTimeout(() => {
        next.style.opacity = '1';
        current.style.opacity = '0';
        current.style.transition = `opacity ${heroFadeDuration / 1000}s cubic-bezier(.22,1,.36,1)`;
        // Fade in fadein-text overlay nur wenn nicht leer
        if (heroTitle !== '') {
            setTimeout(() => {
                fadeinDiv.style.opacity = '1';
                fadeinDiv.style.transform = 'translateY(0)';
            }, 180);
        } else {
            fadeinDiv.style.opacity = '0';
            fadeinDiv.style.transform = 'translateY(34px)';
        }
        // Hide previous fadein-text
        let prevFadein = current.querySelector('.fadein-text');
        if (prevFadein) {
            prevFadein.style.opacity = '0';
            prevFadein.style.transform = 'translateY(20px)';
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

document.addEventListener('DOMContentLoaded', function() {
    const heroBg = document.querySelector('.hero-bg');
    const prevButton = document.querySelector('.hero-gallery-control--prev');
    const nextButton = document.querySelector('.hero-gallery-control--next');
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
            showHeroGalleryUi(0);
            stopHeroGalleryAuto();
        });
        heroBg.addEventListener('mouseleave', function() {
            hideHeroGalleryUi();
            scheduleHeroGalleryAuto(heroSlideDuration);
        });
        heroBg.addEventListener('pointerdown', function() {
            showHeroGalleryUi();
        }, { passive: true });
        heroBg.addEventListener('focusin', function() {
            showHeroGalleryUi(0);
        });
        heroBg.addEventListener('focusout', function() {
            requestAnimationFrame(function() {
                if (!heroBg.matches(':focus-within')) {
                    hideHeroGalleryUi();
                }
            });
        });
        heroBg.addEventListener('touchstart', function(event) {
            if (!event.changedTouches || !event.changedTouches[0]) return;
            touchStartX = event.changedTouches[0].clientX;
            showHeroGalleryUi();
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
            showHeroGalleryUi();
            pauseHeroGalleryAuto();
        }, { passive: true });
    }
});

// Update dots on manual/auto change
const origSetHeroBgCrossfade = setHeroBgCrossfade;
setHeroBgCrossfade = function(idx) {
    origSetHeroBgCrossfade(idx);
    refreshHeroGalleryUi();
};
// Dynamisch Hintergrundlayer für about-me-section je nach Screengröße
function updateAboutMeBackground() {
    const aboutMeSection = document.querySelector('.about-me-section');
    if (!aboutMeSection) return;
    if (window.innerWidth <= 600) {
        aboutMeSection.style.background = 'none';
    } else {
        aboutMeSection.style.background = "url('bilder/Astrid var.jpg') center center/cover no-repeat";
    }
}

window.addEventListener('resize', updateAboutMeBackground);
window.addEventListener('resize', syncHeroGalleryResponsiveState);
window.addEventListener('DOMContentLoaded', updateAboutMeBackground);
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

document.addEventListener('DOMContentLoaded', function() {
    revealOnScroll('.modern-card');
    revealOnScroll('.musikfamilie-card');
});
// Highlight active nav link on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Remove duplicate nav-link click handler, keep only smooth scrolling logic below
});
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Keyboard accessibility: close menu with Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Smooth scrolling ONLY for navigation links (not all a[href^="#"])
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Only handle if href starts with # and target exists
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    e.preventDefault();
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form Submissions
    const joinForm = document.getElementById('joinForm');
    const contactForm = document.getElementById('contactForm');

    // Hilfsfunktion für Mail-Popup
    // Accordion für Chronik-Timeline
    function initAccordion() {
        // Event Delegation für maximale Zuverlässigkeit
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('accordion-toggle')) {
                const btn = e.target;
                const content = btn.parentElement.querySelector('.accordion-content');
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', !expanded);
                if (expanded) {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            }
        });
    }
    window.addEventListener('DOMContentLoaded', function() {
        initAccordion();
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles for notification only once
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    z-index: 10;
                    max-width: 400px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    transform: translateX(100%);
                    transition: transform 0.3s ease-in-out;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-success {
                    border-left: 4px solid var(--accent-green);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 20px;
                }
                .notification-content i:first-child {
                    color: var(--accent-green);
                    font-size: 18px;
                }
                .notification-content span {
                    flex: 1;
                    color: var(--dark);
                    font-weight: 500;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--gray-400);
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    transition: color 0.2s;
                }
                .notification-close:hover {
                    color: var(--gray-600);
                }
            `;
            document.head.appendChild(style);
        }

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Join form submission



    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Add/remove background based on scroll position
        if (scrollTop > 50) {
            navbar.style.background = '#000';
            navbar.style.zindex = '5000';
        } else {
            navbar.style.background = 'transparent';
        }
        lastScrollTop = scrollTop;
    });

    function setNavbarStyle(isScrolled) {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (isScrolled) {
            navbar.style.background = '#222';
            navbar.style.zIndex = '5000';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.zIndex = '5000'; // Optional: keep high z-index always
        }
    }

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 40) {
            setNavbarStyle(true);
        } else {
            setNavbarStyle(false);
        }
    });

    // Parallax effect for hero shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.stat-card, .cause-card, .event-card');
    cards.forEach(card => {
        // Removed hover effect for flat design
    });

    // Form validation enhancements
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



    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
    const cookieDeclineBtn = document.getElementById('cookieDeclineBtn');
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '')  + expires + '; path=/';
    }
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    function setCookieConsent(value) {
        setCookie('cookieAccepted', value === 'accepted' ? 'true' : '', 365);
        setCookie('cookieDeclined', value === 'declined' ? 'true' : '', 365);
        localStorage.setItem('cookieConsent', value);
    }
    function getCookieConsent() {
        if (getCookie('cookieAccepted')) return 'accepted';
        if (getCookie('cookieDeclined')) return 'declined';
        return localStorage.getItem('cookieConsent');
    }
    if (cookieBanner && cookieAcceptBtn && cookieDeclineBtn) {
        if (getCookieConsent()) {
            cookieBanner.style.display = 'none';
        } else {
            cookieBanner.style.display = 'flex';
            cookieAcceptBtn.addEventListener('click', function() {
                setCookieConsent('accepted');
                cookieBanner.style.display = 'none';
            });
            cookieDeclineBtn.addEventListener('click', function() {
                setCookieConsent('declined');
                cookieBanner.style.display = 'none';
            });
        }
    }

    // Zeitspanne seit gründung berechnen
    const currentYear = new Date().getFullYear();
    const yearsSince1981 = currentYear - 1981;
    const yearsPassedEl = document.getElementById("yearsPassed");
    if (yearsPassedEl) {
        yearsPassedEl.textContent = yearsSince1981;
    }
});

const hamburger = document.getElementById('navbarHamburger');
const mobileMenu = document.getElementById('navbarMobileMenu');
hamburger && hamburger.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});
window.addEventListener('resize', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (window.innerWidth > 700 && mobileMenu) mobileMenu.style.display = 'none';
});

// Dynamische Anpassung des Hintergrundbildes
function updateHeroBg() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    if (window.innerWidth <= 900) {
        heroBg.style.backgroundSize = '120vw 100vh';
        heroBg.style.backgroundPosition = '60% 35%';
        heroBg.style.backgroundRepeat = 'no-repeat';
    } else {
        heroBg.style.backgroundSize = 'cover';
        heroBg.style.backgroundPosition = 'center 35%';
        heroBg.style.backgroundRepeat = 'no-repeat';
    }
}
window.addEventListener('resize', updateHeroBg);
window.addEventListener('DOMContentLoaded', updateHeroBg);
// Sprachumschalter: Zeige nur die passende Sprache
function setLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        if (el.getAttribute('data-lang') === lang) {
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    });
    document.documentElement.setAttribute('lang', lang);
    // Sprache persistent speichern
    try {
        localStorage.setItem('siteLang', lang);
    } catch (e) {}
    refreshHeroGalleryUi();
    // Entferne alle Event-Handler für Mbonda Lokito Link, damit Standardverhalten greift
    var mbondaLinks = document.querySelectorAll('.timeline-item-title a[href="https://www.mbonda-lokito.org/home.html"]');
    mbondaLinks.forEach(function(link) {
        link.onclick = null;
        link.removeAttribute('onclick');
        // Nur der Timeline-Link braucht diese Sicherheitsbehandlung.
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
    });
}
window.setLang = setLang;
// Beim Laden der Seite: Sprache aus localStorage übernehmen
window.addEventListener('DOMContentLoaded', function() {
    try {
        var lang = localStorage.getItem('siteLang');
        if (lang && (lang === 'de' || lang === 'en' || lang === 'it')) {
            setLang(lang);
        }
    } catch (e) {}

    // EXPLIZIT: Für mobile Geräte - verhindere jegliche JS-Blockade für Mbonda Lokito Link in der Timeline
    if (window.innerWidth <= 700) {
        var mbondaLinks = document.querySelectorAll('.timeline-item-title a[href="https://www.mbonda-lokito.org/home.html"]');
        mbondaLinks.forEach(function(link) {
            link.onclick = null;
            link.removeAttribute('onclick');
            link.addEventListener('click', function(e) {
                // Lass alles durch, verhindere keine Events
                e.stopPropagation = function(){};
                e.stopImmediatePropagation = function(){};
                // Kein preventDefault!
            }, {capture: true});
            link.addEventListener('touchend', function(e) {
                e.stopPropagation = function(){};
                e.stopImmediatePropagation = function(){};
            }, {capture: true});
            link.style.pointerEvents = 'auto';
            link.style.zIndex = '2147483647';
        });
    }
});