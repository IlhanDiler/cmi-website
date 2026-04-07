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

const heroGalleryUiLabels = {
    de: {
        image: 'Bild',
        previous: 'Vorheriges Bild',
        next: 'Nächstes Bild',
        pagination: 'Galerie-Navigation',
        region: 'Galerie mit Benefizkonzerten und Konzertimpressionen',
        controls: 'Steuerung der Galerie'
    },
    en: {
        image: 'Image',
        previous: 'Previous image',
        next: 'Next image',
        pagination: 'Main gallery pagination',
        region: 'Gallery with benefit concerts and concert highlights',
        controls: 'Gallery controls'
    },
    fr: {
        image: 'Image',
        previous: 'Image precedente',
        next: 'Image suivante',
        pagination: 'Pagination de la galerie d\'accueil',
        region: 'Galerie des concerts solidaires et des moments forts',
        controls: 'Commandes de la galerie'
    },
    ln: {
        image: 'Elilingi',
        previous: 'Elilingi ya liboso',
        next: 'Elilingi oyo elandi',
        pagination: 'Pagination ya galerie ya liboso',
        region: 'Galerie ya bakonser ya lisungi mpe makambo ya motuya',
        controls: 'Bisaleli ya galerie'
    },
    it: {
        image: 'Immagine',
        previous: 'Immagine precedente',
        next: 'Immagine successiva',
        pagination: 'Paginazione della galleria principale',
        region: 'Galleria con concerti benefici e momenti salienti',
        controls: 'Controlli della galleria'
    },
    tr: {
        image: 'Görsel',
        previous: 'Önceki görsel',
        next: 'Sonraki görsel',
        pagination: 'Hero galeri sayfalandırması',
        region: 'Yardım konserleri ve önemli anlar galerisi',
        controls: 'Galeri denetimleri'
    },
    uk: {
        image: 'Зображення',
        previous: 'Попереднє зображення',
        next: 'Наступне зображення',
        pagination: 'Пагінація головної галереї',
        region: 'Галерея благодійних концертів і ключових моментів',
        controls: 'Елементи керування галереєю'
    }
};

const heroGallery = [
    { src: 'bilder/Weihnachtskonzert Spitalkirche.png', title: { de: '„Weihnachtskonzert zum Mitsingen 2025“ in der Spitalkirche Ochsenfurt', en: '"Christmas Sing-Along Concert 2025" at Spitalkirche Ochsenfurt', fr: '« Concert de Noel participatif 2025 » a la Spitalkirche d\'Ochsenfurt', ln: '« Konser ya Noel mpo na koyemba elongo 2025 » na Spitalkirche Ochsenfurt', it: '"Concerto di Natale da cantare insieme 2025" nella Spitalkirche di Ochsenfurt', tr: 'Ochsenfurt Spitalkirche\'de "Birlikte Söylenen Noel Konseri 2025"', uk: '« Різдвяний концерт для спільного співу 2025 » у Шпіталькірхе Оксенфурта' }, shortTitle: { de: 'Weihnachtskonzert 2025 in Ochsenfurt', en: 'Christmas Sing-Along 2025 in Ochsenfurt', fr: 'Concert de Noel 2025 a Ochsenfurt', ln: 'Konser ya Noel 2025 na Ochsenfurt', it: 'Concerto di Natale 2025 a Ochsenfurt', tr: 'Ochsenfurt\'ta Noel Konseri 2025', uk: 'Різдвяний концерт 2025 в Оксенфурті' } },
    { src: 'bilder/Gruppenbild2.jpg', title: { de: 'Benefizkonzert für „Ärzte ohne Grenzen“ 2025 im Hotel Meintz Ochsenfurt', en: 'Benefit concert for "Doctors Without Borders" 2025 at Hotel Meintz Ochsenfurt', fr: 'Concert caritatif pour « Medecins Sans Frontieres » 2025 a l\'Hotel Meintz d\'Ochsenfurt', ln: 'Konser ya lisungi mpo na « Medecins Sans Frontieres » 2025 na Hotel Meintz Ochsenfurt', it: 'Concerto benefico per "Medici Senza Frontiere" 2025 all\'Hotel Meintz di Ochsenfurt', tr: 'Ochsenfurt\'taki Hotel Meintz\'te "Sınır Tanımayan Doktorlar" yararına 2025 yardım konseri', uk: 'Благодійний концерт для «Лікарів без кордонів» 2025 в готелі Meintz в Оксенфурті' }, shortTitle: { de: 'Benefizkonzert 2025 im Hotel Meintz', en: 'Benefit concert 2025 at Hotel Meintz', fr: 'Concert caritatif 2025 a l\'Hotel Meintz', ln: 'Konser ya lisungi 2025 na Hotel Meintz', it: 'Concerto benefico 2025 all\'Hotel Meintz', tr: 'Hotel Meintz\'te yardım konseri 2025', uk: 'Благодійний концерт 2025 в готелі Meintz' } },
    { src: 'bilder/gruppe_2007.jpeg', title: { de: 'CMI 2009', en: 'CMI 2009', fr: 'CMI 2009', ln: 'CMI 2009', it: 'CMI 2009', tr: 'CMI 2009', uk: 'CMI 2009' } },
    { src: 'bilder/peterbild.jpg', title: { de: 'Gedenkfeier - „80 Jahre Kriegsende, 80 Jahre Frieden“ in Ochsenfurt 2025', en: 'Commemorative event - "80 Years Since the End of War, 80 Years of Peace" in Ochsenfurt 2025', fr: 'Ceremonie commemorative - « 80 ans depuis la fin de la guerre, 80 ans de paix » a Ochsenfurt 2025', ln: 'Molulu ya ekaniseli - « Mibu 80 banda suka ya bitumba, mibu 80 ya kimia » na Ochsenfurt 2025', it: 'Cerimonia commemorativa - "80 anni dalla fine della guerra, 80 anni di pace" a Ochsenfurt 2025', tr: 'Anma töreni - "Savaşın Sona Erişinin 80. Yılı, Barışın 80. Yılı" Ochsenfurt 2025', uk: 'Пам’ятний захід «80 років від завершення війни, 80 років миру» в Оксенфурті 2025' }, shortTitle: { de: 'Gedenkfeier 80 Jahre Frieden 2025', en: '80 Years of Peace commemoration 2025', fr: 'Commemoration 80 ans de paix 2025', ln: 'Molulu ya mibu 80 ya kimia 2025', it: 'Commemorazione 80 anni di pace 2025', tr: '80 yıl barış anması 2025', uk: 'Пам’ятний захід 80 років миру 2025' } },
    { src: 'bilder/concello.jfif', title: { de: 'ConCello 2025 in der Klosterkirche Ochsenfurt', en: 'ConCello 2025 at Klosterkirche Ochsenfurt', fr: 'ConCello 2025 a la Klosterkirche d\'Ochsenfurt', ln: 'ConCello 2025 na Klosterkirche Ochsenfurt', it: 'ConCello 2025 nella Klosterkirche di Ochsenfurt', tr: 'Ochsenfurt Klosterkirche\'de ConCello 2025', uk: 'ConCello 2025 у монастирській церкві Оксенфурта' }, shortTitle: { de: 'ConCello 2025 in Ochsenfurt', en: 'ConCello 2025 in Ochsenfurt', fr: 'ConCello 2025 a Ochsenfurt', ln: 'ConCello 2025 na Ochsenfurt', it: 'ConCello 2025 a Ochsenfurt', tr: 'Ochsenfurt\'ta ConCello 2025', uk: 'ConCello 2025 в Оксенфурті' } },
    { src: 'bilder/gruppemitflagge.jpg', title: { de: 'CMI und Veeh-Harfengruppe Querbeet 2025', en: 'CMI and the Veeh Harp Ensemble Querbeet 2025', fr: 'CMI et l\'ensemble de harpes Veeh Querbeet 2025', ln: 'CMI mpe etuluku ya Veeh-Harfe Querbeet 2025', it: 'CMI e il gruppo di arpe Veeh Querbeet 2025', tr: 'CMI ve Querbeet Veeh arp topluluğu 2025', uk: 'CMI та ансамбль Veeh-Harfe Querbeet 2025' }, shortTitle: { de: 'CMI und Querbeet 2025', en: 'CMI and Querbeet 2025', fr: 'CMI et Querbeet 2025', ln: 'CMI mpe Querbeet 2025', it: 'CMI e Querbeet 2025', tr: 'CMI ve Querbeet 2025', uk: 'CMI та Querbeet 2025' } },
    { src: 'bilder/klosterkirche.jpg', title: { de: 'Klosterkirche 2024', en: 'Klosterkirche 2024', fr: 'Klosterkirche 2024', ln: 'Klosterkirche 2024', it: 'Klosterkirche 2024', tr: 'Klosterkirche 2024', uk: 'Клостеркірхе 2024' } },
    { src: 'bilder/salboro_santa_maria_assunta_2024.jpg', title: { de: 'Salboro Santa Maria Assunta 2024', en: 'Salboro Santa Maria Assunta 2024', fr: 'Salboro Santa Maria Assunta 2024', ln: 'Salboro Santa Maria Assunta 2024', it: 'Salboro Santa Maria Assunta 2024', tr: 'Salboro Santa Maria Assunta 2024', uk: 'Salboro Santa Maria Assunta 2024' } },
    { src: 'bilder/Gruppenfoto_St._Thekla_2022.jpg', title: { de: 'CMI und BGS St. Thekla 2022', en: 'CMI and BGS St. Thekla 2022', fr: 'CMI et BGS St. Thekla 2022', ln: 'CMI mpe BGS St. Thekla 2022', it: 'CMI e BGS St. Thekla 2022', tr: 'CMI ve BGS St. Thekla 2022', uk: 'CMI та BGS St. Thekla 2022' } },
    { src: 'bilder/Scheunenkonzert 17.07.jpg', title: { de: 'Scheunenkonzert am 17.07.', en: 'Barn concert on 17 July', fr: 'Concert dans la grange du 17 juillet', ln: 'Konser ya ndako ya bilanga na 17 juillet', it: 'Concerto nel fienile del 17 luglio', tr: '17 Temmuz ahır konseri', uk: 'Концерт у стодолі 17 липня' } },
    { src: 'bilder/Gruppe17.09.11.png', title: { de: 'Jubiläumskonzert zum 30-jährigen Bestehen am 17.09.11', en: '30th anniversary concert on 17 September 2011', fr: 'Concert du 30e anniversaire le 17.09.11', ln: 'Konser ya jubile ya mibu 30 na 17.09.11', it: 'Concerto per il 30° anniversario il 17.09.11', tr: '17.09.2011 tarihinde 30. yıl dönümü konseri', uk: 'Ювілейний концерт до 30-річчя 17.09.11' }, shortTitle: { de: 'Jubiläumskonzert 30 Jahre CMI', en: '30th anniversary concert', fr: 'Concert du 30e anniversaire du CMI', ln: 'Konser ya mibu 30 ya CMI', it: 'Concerto per i 30 anni del CMI', tr: 'CMI 30. yıl konseri', uk: 'Ювілейний концерт 30 років CMI' } }
];

const heroGalleryDesktopFocusImages = new Set([
    'bilder/Weihnachtskonzert Spitalkirche.png',
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
        const compactFallbackOrder = getSiteLanguageFallbackOrder(language);
        return compactFallbackOrder
            .map(function(candidateLanguage) {
                return entry.shortTitle[candidateLanguage] || entry.title[candidateLanguage];
            })
            .find(Boolean) || entry.shortTitle.de || entry.title.de || '';
    }

    return getSiteLanguageFallbackOrder(language)
        .map(function(candidateLanguage) {
            return entry.title[candidateLanguage];
        })
        .find(Boolean) || entry.title.de || '';
}

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

    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            progressBar.style.transition = `transform ${duration}ms linear`;
            progressBar.style.transform = 'scaleX(1)';
        });
    });
}

function updateHeroGalleryMeta() {
    const current = document.getElementById('heroGalleryCurrent');
    const total = document.getElementById('heroGalleryTotal');
    if (current) {
        current.textContent = formatHeroGalleryIndex(heroIndex);
    }
    if (total) {
        total.textContent = String(heroGallery.length).padStart(2, '0');
    }
}

function updateHeroGalleryA11yLabels() {
    const language = getCurrentSiteLanguage();
    const labels = heroGalleryUiLabels[language] || heroGalleryUiLabels.de;
    const heroRegion = document.querySelector('.hero-bg');
    const galleryUi = document.querySelector('.hero-gallery-ui');
    const prevButton = document.querySelector('.hero-gallery-control--prev');
    const nextButton = document.querySelector('.hero-gallery-control--next');
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
        syncHeroGalleryActiveSlideStyle();
        refreshHeroGalleryUi();
    });
}

function refreshHeroGalleryUi() {
    updateHeroGalleryA11yLabels();
    refreshHeroGalleryCaption();
    renderHeroGalleryDots();
    updateHeroGalleryMeta();
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
    heroGalleryTimeout = setTimeout(function() {
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

function getHeroGallerySlideStyle(entry) {
    if (!entry) {
        return {
            backgroundPosition: 'center 10%',
            backgroundSize: 'cover'
        };
    }

    if (window.innerWidth <= 700) {
        return {
            backgroundPosition: 'center center',
            backgroundSize: 'contain'
        };
    }

    const desktopPosition = heroGalleryDesktopFocusImages.has(entry.src) ? 'center 60%' : 'center 10%';

    return {
        backgroundPosition: desktopPosition,
        backgroundSize: 'cover'
    };
}

function applyHeroGallerySlideStyle(layer, entry, slideStyle) {
    if (!layer || !entry || !slideStyle) {
        return;
    }

    const heroImageUrl = getHeroGalleryCssImageUrl(entry.src);
    layer.style.setProperty('--hero-fade-image-url', `url('${heroImageUrl}')`);
    layer.style.setProperty('--hero-fade-image-focus-position', slideStyle.backgroundPosition);
    layer.style.setProperty('--hero-fade-image-size', slideStyle.backgroundSize);
}

function getHeroGalleryCssImageUrl(src) {
    if (!src) {
        return '';
    }

    if (/^(?:[a-z]+:|\/\/)/i.test(src)) {
        return src;
    }

    const normalizedSrc = src.startsWith('/') && window.location.protocol === 'file:'
        ? src.replace(/^\/+/, '')
        : src.replace(/^\.\/?/, '');

    try {
        return new URL(normalizedSrc, window.location.href).href;
    } catch (error) {
        return normalizedSrc;
    }
}

function syncHeroGalleryActiveSlideStyle() {
    const fadeContainer = document.querySelector('.hero-bg-fade-container');
    if (!fadeContainer || fadeContainer.children.length < 2 || !heroGallery.length) {
        return;
    }

    const activeLayer = fadeToggle ? fadeContainer.children[0] : fadeContainer.children[1];
    applyHeroGallerySlideStyle(activeLayer, heroGallery[heroIndex], getHeroGallerySlideStyle(heroGallery[heroIndex]));
}

function setHeroBgCrossfade(idx) {
    if (isFading) {
        return;
    }

    isFading = true;
    const fadeContainer = document.querySelector('.hero-bg-fade-container');
    if (!fadeContainer) {
        isFading = false;
        return;
    }

    const fadeA = fadeContainer.children[0];
    const fadeB = fadeContainer.children[1];
    const current = fadeToggle ? fadeA : fadeB;
    const next = fadeToggle ? fadeB : fadeA;
    const currentEntry = heroGallery[idx];
    const heroTitle = getHeroGalleryTitle(currentEntry);
    const slideStyle = getHeroGallerySlideStyle(currentEntry);

    next.style.opacity = '0';
    next.style.transition = `opacity ${heroFadeDuration / 1000}s cubic-bezier(.22,1,.36,1)`;
    applyHeroGallerySlideStyle(next, currentEntry, slideStyle);

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

    setTimeout(function() {
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

        const prevFadein = current.querySelector('.fadein-text');
        if (prevFadein) {
            prevFadein.style.opacity = '0';
            prevFadein.style.transform = 'none';
        }
        setTimeout(function() {
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
                heroIndex = index;
                setHeroBgCrossfade(heroIndex);
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

function initHeroGallery() {
    const heroBg = document.querySelector('.hero-bg');
    const fadeContainer = document.querySelector('.hero-bg-fade-container');
    const prevButton = document.querySelector('.hero-gallery-control--prev');
    const nextButton = document.querySelector('.hero-gallery-control--next');
    if (!heroBg || !fadeContainer || fadeContainer.children.length < 2 || !heroGallery.length) {
        return;
    }

    const initialLayer = fadeContainer.children[0];
    const initialSlide = heroGallery[heroIndex];
    applyHeroGallerySlideStyle(initialLayer, initialSlide, getHeroGallerySlideStyle(initialSlide));
    initialLayer.setAttribute('role', 'img');
    initialLayer.setAttribute('aria-hidden', 'false');
    initialLayer.setAttribute('aria-label', getHeroGalleryTitle(initialSlide));
    fadeContainer.children[1].style.opacity = '0';
    fadeContainer.children[1].setAttribute('role', 'img');
    fadeContainer.children[1].setAttribute('aria-hidden', 'true');

    setHeroBgCrossfade(heroIndex);
    scheduleHeroGalleryAuto(heroSlideDuration);

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            prevHeroBgImage();
            pauseHeroGalleryAuto();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            nextHeroBgImage();
            pauseHeroGalleryAuto();
        });
    }

    let touchStartX = 0;
    heroBg.addEventListener('touchstart', function(event) {
        if (!event.changedTouches || !event.changedTouches[0]) {
            return;
        }
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    heroBg.addEventListener('touchend', function(event) {
        if (!event.changedTouches || !event.changedTouches[0]) {
            return;
        }
        const deltaX = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(deltaX) < 40) {
            return;
        }
        if (deltaX > 0) {
            prevHeroBgImage();
        } else {
            nextHeroBgImage();
        }
        pauseHeroGalleryAuto();
    }, { passive: true });
}

window.addEventListener('resize', minimizeGallerySectionGap);
window.addEventListener('resize', fitChristmetteImg);
window.addEventListener('resize', syncHeroGalleryResponsiveState);