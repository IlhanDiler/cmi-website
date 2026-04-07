if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function resetPageScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function clearCurrentHash() {
    if (!window.location.hash) {
        return;
    }

    history.replaceState(null, '', window.location.pathname + window.location.search);
}

function getNavigationType() {
    const navigationEntry = performance.getEntriesByType('navigation')[0];

    if (navigationEntry && navigationEntry.type) {
        return navigationEntry.type;
    }

    if (performance.navigation) {
        if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
            return 'reload';
        }

        if (performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
            return 'back_forward';
        }
    }

    return 'navigate';
}

function isReloadNavigation() {
    return getNavigationType() === 'reload';
}

function shouldForceTopOnLoad() {
    return !window.location.hash || isReloadNavigation();
}

function enforceTopOnLoad() {
    if (!shouldForceTopOnLoad()) {
        return;
    }

    if (window.location.hash && isReloadNavigation()) {
        clearCurrentHash();
    }

    resetPageScrollToTop();
    window.requestAnimationFrame(resetPageScrollToTop);
    window.setTimeout(resetPageScrollToTop, 0);
}

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
        fr: { kicker: 'Affiche du concert' },
        ln: { kicker: 'Affiche ya konser' },
        it: { kicker: 'Manifesto del concerto' },
        tr: { kicker: 'Konser afişi' },
        uk: { kicker: 'Афіша концерту' }
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
        pagination: 'Main gallery pagination'
    },
    fr: {
        image: 'Image',
        previous: 'Image precedente',
        next: 'Image suivante',
        pagination: 'Pagination de la galerie d\'accueil'
    },
    ln: {
        image: 'Elilingi',
        previous: 'Elilingi ya liboso',
        next: 'Elilingi oyo elandi',
        pagination: 'Pagination ya galerie ya liboso'
    },
    it: {
        image: 'Immagine',
        previous: 'Immagine precedente',
        next: 'Immagine successiva',
        pagination: 'Paginazione della galleria principale'
    },
    tr: {
        image: 'Görsel',
        previous: 'Önceki görsel',
        next: 'Sonraki görsel',
        pagination: 'Hero galeri sayfalandırması'
    },
    uk: {
        image: 'Зображення',
        previous: 'Попереднє зображення',
        next: 'Наступне зображення',
        pagination: 'Пагінація головної галереї'
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
     { src: 'bilder/Jubiläumskonzert_2016.jpg', title: { de: 'Jubiläumskonzert 2016', en: 'Anniversary Concert 2016', fr: 'Concert anniversaire 2016', ln: 'Konser ya jubile 2016', it: 'Concerto anniversario 2016', tr: 'Jubile konseri 2016', uk: 'Ювілейний концерт 2016' } },
     { src: 'bilder/Gruppenfoto_St._Thekla_2022.jpg', title: { de: 'CMI und BGS St. Thekla 2022', en: 'CMI and BGS St. Thekla 2022', fr: 'CMI et BGS St. Thekla 2022', ln: 'CMI mpe BGS St. Thekla 2022', it: 'CMI e BGS St. Thekla 2022', tr: 'CMI ve BGS St. Thekla 2022', uk: 'CMI та BGS St. Thekla 2022' } },
     { src: 'bilder/Scheunenkonzert 17.07.jpg', title: { de: 'Scheunenkonzert am 17.07.', en: 'Barn concert on 17 July', fr: 'Concert dans la grange du 17 juillet', ln: 'Konser ya ndako ya bilanga na 17 juillet', it: 'Concerto nel fienile del 17 luglio', tr: '17 Temmuz ahır konseri', uk: 'Концерт у стодолі 17 липня' } },
    { src: 'bilder/Gruppe17.09.11.png', title: { de: 'Jubiläumskonzert zum 30-jährigen Bestehen am 17.09.11', en: '30th anniversary concert on 17 September 2011', fr: 'Concert du 30e anniversaire le 17.09.11', ln: 'Konser ya jubile ya mibu 30 na 17.09.11', it: 'Concerto per il 30° anniversario il 17.09.11', tr: '17.09.2011 tarihinde 30. yıl dönümü konseri', uk: 'Ювілейний концерт до 30-річчя 17.09.11' }, shortTitle: { de: 'Jubiläumskonzert 30 Jahre CMI', en: '30th anniversary concert', fr: 'Concert du 30e anniversaire du CMI', ln: 'Konser ya mibu 30 ya CMI', it: 'Concerto per i 30 anni del CMI', tr: 'CMI 30. yıl konseri', uk: 'Ювілейний концерт 30 років CMI' } },
    
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
        if (storedLanguage === 'de' || storedLanguage === 'en' || storedLanguage === 'fr' || storedLanguage === 'ln' || storedLanguage === 'it' || storedLanguage === 'tr' || storedLanguage === 'uk') {
            return storedLanguage;
        }
    } catch (e) {}

    const htmlLanguage = (document.documentElement.getAttribute('lang') || '').toLowerCase().split('-')[0];
    if (htmlLanguage === 'de' || htmlLanguage === 'en' || htmlLanguage === 'fr' || htmlLanguage === 'ln' || htmlLanguage === 'it' || htmlLanguage === 'tr' || htmlLanguage === 'uk') {
        return htmlLanguage;
    }

    const browserLanguage = (navigator.language || '').toLowerCase().split('-')[0];
    if (browserLanguage === 'de' || browserLanguage === 'en' || browserLanguage === 'fr' || browserLanguage === 'ln' || browserLanguage === 'it' || browserLanguage === 'tr' || browserLanguage === 'uk') {
        return browserLanguage;
    }

    return 'de';
}

const cookieConsentTranslations = {
    de: {
        dialogLabel: 'Cookie-Einwilligungsdialog',
        badgeLabel: 'Cookie-Einstellungen',
        closeLabel: 'Schließen',
        header: 'Diese Webseite verwendet Cookies.',
        descriptionHtml: 'Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren und unseren Datenverkehr zu analysieren. Wir geben Informationen über Ihre Nutzung unserer Website auch an unsere Werbe- und Analysepartner weiter, die diese möglicherweise mit anderen Informationen kombinieren, die Sie ihnen bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung ihrer Dienste gesammelt haben.',
        descriptionText: 'Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren und unseren Datenverkehr zu analysieren. Wir geben Informationen über Ihre Nutzung unserer Website auch an unsere Werbe- und Analysepartner weiter, die diese möglicherweise mit anderen Informationen kombinieren, die Sie ihnen bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung ihrer Dienste gesammelt haben.',
        categories: {
            strict: 'Unbedingt erforderlich',
            performance: 'Performance',
            targeting: 'Targeting',
            functionality: 'Funktionalität'
        },
        categoryDescriptions: {
            strict: 'Unbedingt erforderliche Cookies ermöglichen wesentliche Kernfunktionen der Website wie die Benutzeranmeldung und die Kontoverwaltung. Ohne die unbedingt erforderlichen Cookies kann die Website nicht ordnungsgemäß verwendet werden.',
            performance: 'Performance-Cookies sammeln Informationen darüber, wie Besucher eine Website nutzen, zum Beispiel Analyse-Cookies. Diese Cookies können nicht verwendet werden, um einen bestimmten Besucher direkt zu identifizieren.',
            targeting: 'Targeting-Cookies werden verwendet, um Besucher zwischen verschiedenen Websites zu identifizieren, zum Beispiel Content-Partner oder Banner-Netzwerke. Diese Cookies können von Unternehmen verwendet werden, um ein Profil der Besucherinteressen zu erstellen oder relevante Anzeigen auf anderen Websites zu schalten.',
            functionality: 'Funktionale Cookies werden verwendet, um Besucherinformationen auf der Website zu speichern, zum Beispiel Sprache, Zeitzone oder erweiterte Inhalte.'
        },
        buttons: {
            save: 'Speichern & Schließen',
            accept: 'Alle akzeptieren',
            reject: 'Alle ablehnen'
        },
        details: {
            show: 'Details anzeigen',
            hide: 'Details ausblenden',
            openCookies: 'Cookies anzeigen',
            closeCookies: 'Cookies verstecken',
            badge: 'Cookie-Einstellungen'
        },
        tabs: {
            declaration: 'Cookie-Erklärung',
            about: 'Informationen zu Cookies'
        },
        table: {
            name: 'Name',
            provider: 'Anbieter',
            domain: 'Domäne',
            expiration: 'Ablaufdatum',
            description: 'Beschreibung'
        },
        about: {
            introHtml: 'Cookies sind kleine Textdateien, die auf Ihrem Computer abgelegt werden, wenn Sie bestimmte Websites besuchen. Websites verwenden Cookies, um Benutzern das Navigieren auf einer Website zu erleichtern und das Ausführen bestimmter Funktionen zu ermöglichen. Cookies, die für den ordnungsgemäßen Betrieb der Website erforderlich sind, dürfen ohne Ihre Einwilligung gesetzt werden. Allen anderen Cookies muss erst zugestimmt werden, bevor sie im Browser gesetzt werden können.<br>Sie können Ihre Einwilligung zur Verwendung von Cookies auf unserer Website jederzeit in der Datenschutzerklärung ändern.',
            introText: 'Cookies sind kleine Textdateien, die auf Ihrem Computer abgelegt werden, wenn Sie bestimmte Websites besuchen. Websites verwenden Cookies, um Benutzern das Navigieren auf einer Website zu erleichtern und das Ausführen bestimmter Funktionen zu ermöglichen. Cookies, die für den ordnungsgemäßen Betrieb der Website erforderlich sind, dürfen ohne Ihre Einwilligung gesetzt werden. Allen anderen Cookies muss erst zugestimmt werden, bevor sie im Browser gesetzt werden können. Sie können Ihre Einwilligung zur Verwendung von Cookies auf unserer Website jederzeit in der Datenschutzerklärung ändern.',
            adsHtml: 'Wir verwenden auch Cookies, um Daten zum Zweck der Personalisierung und Messung der Effektivität unserer Werbung zu sammeln. Weitere Informationen finden Sie in der <a href="https://business.safety.google/privacy/" target="_blank">Google-Datenschutzerklärung</a>.',
            consentId: 'Cookie-Zustimmungs-ID'
        }
    },
    en: {
        dialogLabel: 'Cookie consent dialog',
        badgeLabel: 'Cookie settings',
        closeLabel: 'Close',
        header: 'This website uses cookies.',
        descriptionHtml: 'We use cookies to personalize content and ads and to analyze our traffic. We also share information about your use of our website with our advertising and analytics partners, who may combine it with other information that you have provided to them or that they have collected through your use of their services.',
        descriptionText: 'We use cookies to personalize content and ads and to analyze our traffic. We also share information about your use of our website with our advertising and analytics partners, who may combine it with other information that you have provided to them or that they have collected through your use of their services.',
        categories: {
            strict: 'Strictly necessary',
            performance: 'Performance',
            targeting: 'Targeting',
            functionality: 'Functionality'
        },
        categoryDescriptions: {
            strict: 'Strictly necessary cookies enable core website functions such as user login and account management. The website cannot be used properly without these cookies.',
            performance: 'Performance cookies collect information about how visitors use a website, for example analytics cookies. These cookies cannot be used to directly identify a particular visitor.',
            targeting: 'Targeting cookies are used to identify visitors across different websites, for example, content partners or banner networks. These cookies may be used by companies to build a profile of visitor interests or show relevant ads on other websites.',
            functionality: 'Functionality cookies are used to store visitor information on the website, for example language, time zone, or enhanced content.'
        },
        buttons: {
            save: 'Save & close',
            accept: 'Accept all',
            reject: 'Reject all'
        },
        details: {
            show: 'Show details',
            hide: 'Hide details',
            openCookies: 'Show cookies',
            closeCookies: 'Hide cookies',
            badge: 'Cookie settings'
        },
        tabs: {
            declaration: 'Cookie declaration',
            about: 'About cookies'
        },
        table: {
            name: 'Name',
            provider: 'Provider',
            domain: 'Domain',
            expiration: 'Expiration',
            description: 'Description'
        },
        about: {
            introHtml: 'Cookies are small text files that are placed on your computer when you visit certain websites. Websites use cookies to help users navigate a website and to enable certain functions. Essential cookies may be set without your consent to ensure the website functions properly. All other cookies must be approved before they can be set in the browser.<br>You can change your consent to the use of cookies on our website at any time in the privacy policy.',
            introText: 'Cookies are small text files that are placed on your computer when you visit certain websites. Websites use cookies to help users navigate a website and to enable certain functions. Essential cookies may be set without your consent to ensure the website functions properly. All other cookies must be approved before they can be set in the browser. You can change your consent to the use of cookies on our website at any time in the privacy policy.',
            adsHtml: 'We also use cookies to collect data for the personalization and measurement of the effectiveness of our advertising. Further information can be found in the <a href="https://business.safety.google/privacy/" target="_blank">Google Privacy Policy</a>.',
            consentId: 'Cookie consent ID'
        }
    },
    fr: {
        dialogLabel: 'Fenetre de consentement aux cookies',
        badgeLabel: 'Parametres des cookies',
        closeLabel: 'Fermer',
        header: 'Ce site web utilise des cookies.',
        descriptionHtml: 'Nous utilisons des cookies pour personnaliser les contenus et les annonces et pour analyser notre trafic. Nous partageons egalement des informations sur votre utilisation de notre site avec nos partenaires publicitaires et analytiques, qui peuvent les combiner avec d\'autres informations que vous leur avez fournies ou qu\'ils ont collectees lors de votre utilisation de leurs services.',
        descriptionText: 'Nous utilisons des cookies pour personnaliser les contenus et les annonces et pour analyser notre trafic. Nous partageons egalement des informations sur votre utilisation de notre site avec nos partenaires publicitaires et analytiques, qui peuvent les combiner avec d\'autres informations que vous leur avez fournies ou qu\'ils ont collectees lors de votre utilisation de leurs services.',
        categories: {
            strict: 'Strictement necessaires',
            performance: 'Performance',
            targeting: 'Ciblage',
            functionality: 'Fonctionnalites'
        },
        categoryDescriptions: {
            strict: 'Les cookies strictement necessaires permettent les fonctions essentielles du site, comme la connexion utilisateur et la gestion du compte. Le site ne peut pas fonctionner correctement sans eux.',
            performance: 'Les cookies de performance recueillent des informations sur la facon dont les visiteurs utilisent un site web, par exemple les cookies d\'analyse. Ils ne peuvent pas etre utilises pour identifier directement un visiteur precis.',
            targeting: 'Les cookies de ciblage servent a reconnaitre les visiteurs sur differents sites web, par exemple via des partenaires de contenu ou des reseaux publicitaires. Ils peuvent etre utilises pour etablir un profil des interets des visiteurs ou afficher des annonces pertinentes sur d\'autres sites.',
            functionality: 'Les cookies fonctionnels sont utilises pour memoriser des informations sur les visiteurs du site, comme la langue, le fuseau horaire ou des contenus etendus.'
        },
        buttons: {
            save: 'Enregistrer et fermer',
            accept: 'Tout accepter',
            reject: 'Tout refuser'
        },
        details: {
            show: 'Afficher les details',
            hide: 'Masquer les details',
            openCookies: 'Afficher les cookies',
            closeCookies: 'Masquer les cookies',
            badge: 'Parametres des cookies'
        },
        tabs: {
            declaration: 'Declaration sur les cookies',
            about: 'A propos des cookies'
        },
        table: {
            name: 'Nom',
            provider: 'Fournisseur',
            domain: 'Domaine',
            expiration: 'Expiration',
            description: 'Description'
        },
        about: {
            introHtml: 'Les cookies sont de petits fichiers texte qui sont places sur votre ordinateur lorsque vous consultez certains sites web. Les sites utilisent des cookies pour faciliter la navigation et permettre certaines fonctions. Les cookies necessaires au bon fonctionnement du site peuvent etre definis sans votre consentement. Tous les autres cookies doivent etre approuves avant d\'etre installes dans le navigateur.<br>Vous pouvez modifier a tout moment votre consentement a l\'utilisation des cookies sur notre site dans la politique de confidentialite.',
            introText: 'Les cookies sont de petits fichiers texte qui sont places sur votre ordinateur lorsque vous consultez certains sites web. Les sites utilisent des cookies pour faciliter la navigation et permettre certaines fonctions. Les cookies necessaires au bon fonctionnement du site peuvent etre definis sans votre consentement. Tous les autres cookies doivent etre approuves avant d\'etre installes dans le navigateur. Vous pouvez modifier a tout moment votre consentement a l\'utilisation des cookies sur notre site dans la politique de confidentialite.',
            adsHtml: 'Nous utilisons egalement des cookies pour collecter des donnees afin de personnaliser et de mesurer l\'efficacite de notre publicite. Vous trouverez plus d\'informations dans la <a href="https://business.safety.google/privacy/" target="_blank">politique de confidentialite de Google</a>.',
            consentId: 'Identifiant du consentement aux cookies'
        }
    },
    it: {
        dialogLabel: 'Finestra di consenso ai cookie',
        badgeLabel: 'Impostazioni cookie',
        closeLabel: 'Chiudi',
        header: 'Questo sito web utilizza i cookie.',
        descriptionHtml: 'Utilizziamo i cookie per personalizzare contenuti e annunci e per analizzare il nostro traffico. Condividiamo inoltre informazioni sul tuo utilizzo del nostro sito web con i nostri partner pubblicitari e di analisi, che possono combinarle con altre informazioni che hai fornito loro o che hanno raccolto tramite l\'uso dei loro servizi.',
        descriptionText: 'Utilizziamo i cookie per personalizzare contenuti e annunci e per analizzare il nostro traffico. Condividiamo inoltre informazioni sul tuo utilizzo del nostro sito web con i nostri partner pubblicitari e di analisi, che possono combinarle con altre informazioni che hai fornito loro o che hanno raccolto tramite l\'uso dei loro servizi.',
        categories: {
            strict: 'Strettamente necessari',
            performance: 'Prestazioni',
            targeting: 'Targeting',
            functionality: 'Funzionalità'
        },
        categoryDescriptions: {
            strict: 'I cookie strettamente necessari consentono funzioni fondamentali del sito web come il login utente e la gestione dell\'account. Senza questi cookie il sito non puo funzionare correttamente.',
            performance: 'I cookie di prestazione raccolgono informazioni su come i visitatori utilizzano un sito web, ad esempio i cookie di analisi. Questi cookie non possono essere utilizzati per identificare direttamente un visitatore specifico.',
            targeting: 'I cookie di targeting vengono utilizzati per identificare i visitatori su diversi siti web, ad esempio partner di contenuto o reti pubblicitarie. Questi cookie possono essere usati per creare un profilo degli interessi dei visitatori o mostrare annunci pertinenti su altri siti web.',
            functionality: 'I cookie di funzionalita vengono utilizzati per memorizzare informazioni dei visitatori sul sito web, ad esempio lingua, fuso orario o contenuti avanzati.'
        },
        buttons: {
            save: 'Salva e chiudi',
            accept: 'Accetta tutti',
            reject: 'Rifiuta tutti'
        },
        details: {
            show: 'Mostra dettagli',
            hide: 'Nascondi dettagli',
            openCookies: 'Mostra cookie',
            closeCookies: 'Nascondi cookie',
            badge: 'Impostazioni cookie'
        },
        tabs: {
            declaration: 'Dichiarazione sui cookie',
            about: 'Informazioni sui cookie'
        },
        table: {
            name: 'Nome',
            provider: 'Fornitore',
            domain: 'Dominio',
            expiration: 'Scadenza',
            description: 'Descrizione'
        },
        about: {
            introHtml: 'I cookie sono piccoli file di testo che vengono memorizzati sul tuo computer quando visiti determinati siti web. I siti web utilizzano i cookie per facilitare la navigazione e permettere l\'esecuzione di determinate funzioni. I cookie necessari al corretto funzionamento del sito possono essere impostati senza il tuo consenso. Tutti gli altri cookie devono essere approvati prima di poter essere impostati nel browser.<br>Puoi modificare in qualsiasi momento il tuo consenso all\'uso dei cookie sul nostro sito web nella politica sulla privacy.',
            introText: 'I cookie sono piccoli file di testo che vengono memorizzati sul tuo computer quando visiti determinati siti web. I siti web utilizzano i cookie per facilitare la navigazione e permettere l\'esecuzione di determinate funzioni. I cookie necessari al corretto funzionamento del sito possono essere impostati senza il tuo consenso. Tutti gli altri cookie devono essere approvati prima di poter essere impostati nel browser. Puoi modificare in qualsiasi momento il tuo consenso all\'uso dei cookie sul nostro sito web nella politica sulla privacy.',
            adsHtml: 'Utilizziamo inoltre i cookie per raccogliere dati ai fini della personalizzazione e della misurazione dell\'efficacia della nostra pubblicita. Ulteriori informazioni sono disponibili nella <a href="https://business.safety.google/privacy/" target="_blank">Norme sulla privacy di Google</a>.',
            consentId: 'ID del consenso ai cookie'
        }
    },
    tr: {
        dialogLabel: 'Çerez onay penceresi',
        badgeLabel: 'Çerez ayarları',
        closeLabel: 'Kapat',
        header: 'Bu web sitesi çerez kullanır.',
        descriptionHtml: 'İçeriği ve reklamları kişiselleştirmek, ayrıca trafiğimizi analiz etmek için çerezler kullanıyoruz. Bunun yanında, web sitemizi kullanımınıza ilişkin bilgileri reklam ve analiz ortaklarımızla paylaşıyoruz; bu ortaklar söz konusu bilgileri, kendilerine sağladığınız veya hizmetlerini kullanırken topladıkları diğer verilerle birleştirebilir.',
        descriptionText: 'İçeriği ve reklamları kişiselleştirmek, ayrıca trafiğimizi analiz etmek için çerezler kullanıyoruz. Bunun yanında, web sitemizi kullanımınıza ilişkin bilgileri reklam ve analiz ortaklarımızla paylaşıyoruz; bu ortaklar söz konusu bilgileri, kendilerine sağladığınız veya hizmetlerini kullanırken topladıkları diğer verilerle birleştirebilir.',
        categories: {
            strict: 'Kesinlikle gerekli',
            performance: 'Performans',
            targeting: 'Hedefleme',
            functionality: 'İşlevsellik'
        },
        categoryDescriptions: {
            strict: 'Kesinlikle gerekli çerezler; kullanıcı girişi ve hesap yönetimi gibi temel site işlevlerini etkinleştirir. Bu çerezler olmadan site doğru şekilde çalışamaz.',
            performance: 'Performans çerezleri, ziyaretçilerin bir web sitesini nasıl kullandığına dair bilgi toplar; buna analiz çerezleri de dahildir. Bu çerezler belirli bir ziyaretçiyi doğrudan tanımlamak için kullanılamaz.',
            targeting: 'Hedefleme çerezleri, ziyaretçileri farklı web siteleri arasında tanımak için kullanılır; örneğin içerik ortakları veya reklam ağları tarafından. Bu çerezler, ziyaretçi ilgi alanlarının profilini oluşturmak ya da diğer sitelerde ilgili reklamlar göstermek için kullanılabilir.',
            functionality: 'İşlevsel çerezler, dil, saat dilimi veya gelişmiş içerik gibi ziyaretçi tercihlerini web sitesinde saklamak için kullanılır.'
        },
        buttons: {
            save: 'Kaydet ve kapat',
            accept: 'Tümünü kabul et',
            reject: 'Tümünü reddet'
        },
        details: {
            show: 'Ayrıntıları göster',
            hide: 'Ayrıntıları gizle',
            openCookies: 'Çerezleri göster',
            closeCookies: 'Çerezleri gizle',
            badge: 'Çerez ayarları'
        },
        tabs: {
            declaration: 'Çerez bildirimi',
            about: 'Çerezler hakkında'
        },
        table: {
            name: 'Ad',
            provider: 'Sağlayıcı',
            domain: 'Alan adı',
            expiration: 'Saklama süresi',
            description: 'Açıklama'
        },
        about: {
            introHtml: 'Çerezler, belirli web sitelerini ziyaret ettiğinizde bilgisayarınıza yerleştirilen küçük metin dosyalarıdır. Web siteleri çerezleri, kullanıcıların sitede gezinmesini kolaylaştırmak ve belirli işlevleri etkinleştirmek için kullanır. Web sitesinin düzgün çalışması için gerekli çerezler, onayınız olmadan ayarlanabilir. Diğer tüm çerezlerin tarayıcıda ayarlanabilmesi için önce onaylanması gerekir.<br>Web sitemizde çerez kullanımı için verdiğiniz onayı gizlilik politikası üzerinden istediğiniz zaman değiştirebilirsiniz.',
            introText: 'Çerezler, belirli web sitelerini ziyaret ettiğinizde bilgisayarınıza yerleştirilen küçük metin dosyalarıdır. Web siteleri çerezleri, kullanıcıların sitede gezinmesini kolaylaştırmak ve belirli işlevleri etkinleştirmek için kullanır. Web sitesinin düzgün çalışması için gerekli çerezler, onayınız olmadan ayarlanabilir. Diğer tüm çerezlerin tarayıcıda ayarlanabilmesi için önce onaylanması gerekir. Web sitemizde çerez kullanımı için verdiğiniz onayı gizlilik politikası üzerinden istediğiniz zaman değiştirebilirsiniz.',
            adsHtml: 'Ayrıca reklamlarımızın etkisini kişiselleştirmek ve ölçmek amacıyla veri toplamak için de çerezler kullanıyoruz. Daha fazla bilgiye <a href="https://business.safety.google/privacy/" target="_blank">Google Gizlilik Politikası</a> üzerinden ulaşabilirsiniz.',
            consentId: 'Çerez onay kimliği'
        }
    },
    uk: {
        dialogLabel: 'Вікно згоди на файли cookie',
        badgeLabel: 'Налаштування файлів cookie',
        closeLabel: 'Закрити',
        header: 'Цей вебсайт використовує файли cookie.',
        descriptionHtml: 'Ми використовуємо файли cookie, щоб персоналізувати вміст і рекламу та аналізувати наш трафік. Ми також передаємо інформацію про використання вами нашого вебсайту нашим рекламним і аналітичним партнерам, які можуть поєднувати її з іншими даними, наданими вами, або зібраними під час користування їхніми сервісами.',
        descriptionText: 'Ми використовуємо файли cookie, щоб персоналізувати вміст і рекламу та аналізувати наш трафік. Ми також передаємо інформацію про використання вами нашого вебсайту нашим рекламним і аналітичним партнерам, які можуть поєднувати її з іншими даними, наданими вами, або зібраними під час користування їхніми сервісами.',
        categories: {
            strict: 'Суворо необхідні',
            performance: 'Аналітика',
            targeting: 'Таргетинг',
            functionality: 'Функціональність'
        },
        categoryDescriptions: {
            strict: 'Суворо необхідні файли cookie забезпечують основні функції сайту, наприклад вхід користувача та керування обліковим записом. Без них сайт не може працювати належним чином.',
            performance: 'Файли cookie продуктивності збирають інформацію про те, як відвідувачі користуються вебсайтом, наприклад аналітичні cookie. Ці cookie не можуть бути використані для безпосередньої ідентифікації конкретного відвідувача.',
            targeting: 'Файли cookie таргетингу використовуються для розпізнавання відвідувачів на різних вебсайтах, наприклад у партнерів із контенту або рекламних мереж. Такі cookie можуть використовуватися для створення профілю інтересів відвідувача або показу релевантної реклами на інших сайтах.',
            functionality: 'Функціональні файли cookie використовуються для збереження інформації про відвідувачів на сайті, наприклад мови, часового поясу або розширеного вмісту.'
        },
        buttons: {
            save: 'Зберегти і закрити',
            accept: 'Прийняти всі',
            reject: 'Відхилити всі'
        },
        details: {
            show: 'Показати деталі',
            hide: 'Приховати деталі',
            openCookies: 'Показати cookie',
            closeCookies: 'Сховати cookie',
            badge: 'Налаштування файлів cookie'
        },
        tabs: {
            declaration: 'Декларація щодо файлів cookie',
            about: 'Про файли cookie'
        },
        table: {
            name: 'Назва',
            provider: 'Постачальник',
            domain: 'Домен',
            expiration: 'Термін дії',
            description: 'Опис'
        },
        about: {
            introHtml: 'Файли cookie - це невеликі текстові файли, які зберігаються на вашому комп\'ютері, коли ви відвідуєте певні вебсайти. Вебсайти використовують cookie, щоб полегшити навігацію та забезпечити роботу окремих функцій. Cookie, необхідні для належної роботи сайту, можуть встановлюватися без вашої згоди. Усі інші cookie мають бути схвалені, перш ніж їх можна буде встановити у браузері.<br>Ви можете будь-коли змінити свою згоду на використання cookie на нашому вебсайті в політиці конфіденційності.',
            introText: 'Файли cookie - це невеликі текстові файли, які зберігаються на вашому комп\'ютері, коли ви відвідуєте певні вебсайти. Вебсайти використовують cookie, щоб полегшити навігацію та забезпечити роботу окремих функцій. Cookie, необхідні для належної роботи сайту, можуть встановлюватися без вашої згоди. Усі інші cookie мають бути схвалені, перш ніж їх можна буде встановити у браузері. Ви можете будь-коли змінити свою згоду на використання cookie на нашому вебсайті в політиці конфіденційності.',
            adsHtml: 'Ми також використовуємо cookie для збору даних з метою персоналізації та вимірювання ефективності нашої реклами. Додаткову інформацію можна знайти в <a href="https://business.safety.google/privacy/" target="_blank">політиці конфіденційності Google</a>.',
            consentId: 'Ідентифікатор згоди на файли cookie'
        }
    }
};

cookieConsentTranslations.ln = cookieConsentTranslations.fr;

let cookieConsentMutationObserver = null;
let cookieConsentUpdateFrame = null;

function setCookieConsentText(selector, text) {
    document.querySelectorAll(selector).forEach(function(node) {
        node.textContent = text;
    });
}

function setCookieConsentHtml(selector, html, plainText) {
    document.querySelectorAll(selector).forEach(function(node) {
        node.innerHTML = html;
        if (node.hasAttribute('data-cs-i18n-read')) {
            node.setAttribute('data-cs-i18n-read', plainText || node.textContent.trim());
        }
    });
}

function setCookieConsentAttribute(selector, attribute, value) {
    document.querySelectorAll(selector).forEach(function(node) {
        node.setAttribute(attribute, value);
    });
}

function updateCookieConsentLanguage() {
    if (!document.getElementById('cookiescript_injected_wrapper') &&
        !document.getElementById('cookiescript_injected_fsd') &&
        !document.getElementById('cookiescript_badge')) {
        return;
    }

    const language = getCurrentSiteLanguage();
    const labels = cookieConsentTranslations[language] || cookieConsentTranslations.de;

    setCookieConsentAttribute('#cookiescript_injected, #cookiescript_fsd_wrapper', 'aria-label', labels.dialogLabel);
    setCookieConsentAttribute('#cookiescript_badge', 'aria-label', labels.badgeLabel);
    setCookieConsentAttribute('#cookiescript_close', 'aria-label', labels.closeLabel);

    setCookieConsentText('#cookiescript_header, .cookiescript_fsd_title', labels.header);
    setCookieConsentHtml('#cookiescript_description [data-cs-desc-box="true"], .cookiescript_fsd_description [data-cs-desc-box="true"]', labels.descriptionHtml, labels.descriptionText);

    setCookieConsentText('label[for="cookiescript_category_strict"] .cookiescript_checkbox_text, [data-fsd-category="strict"] .cookiescript_fsd__category_name', labels.categories.strict);
    setCookieConsentText('label[for="cookiescript_category_performance"] .cookiescript_checkbox_text, [data-fsd-category="performance"] .cookiescript_fsd__category_name', labels.categories.performance);
    setCookieConsentText('label[for="cookiescript_category_targeting"] .cookiescript_checkbox_text, [data-fsd-category="targeting"] .cookiescript_fsd__category_name', labels.categories.targeting);
    setCookieConsentText('label[for="cookiescript_category_functionality"] .cookiescript_checkbox_text, [data-fsd-category="functionality"] .cookiescript_fsd__category_name', labels.categories.functionality);

    setCookieConsentText('[data-fsd-category="strict"] .cookiescript_category_description', labels.categoryDescriptions.strict);
    setCookieConsentText('[data-fsd-category="performance"] .cookiescript_category_description', labels.categoryDescriptions.performance);
    setCookieConsentText('[data-fsd-category="targeting"] .cookiescript_category_description', labels.categoryDescriptions.targeting);
    setCookieConsentText('[data-fsd-category="functionality"] .cookiescript_category_description', labels.categoryDescriptions.functionality);

    setCookieConsentText('#cookiescript_save', labels.buttons.save);
    setCookieConsentText('#cookiescript_accept', labels.buttons.accept);
    setCookieConsentText('#cookiescript_reject', labels.buttons.reject);

    setCookieConsentText('span[data-cs-show-title="cookie-script"]', labels.details.show);
    setCookieConsentText('span[data-cs-hide-title="cookie-script"]', labels.details.hide);
    setCookieConsentText('[data-cs-cookies-open-text]', labels.details.openCookies);
    setCookieConsentText('[data-cs-cookies-close-text]', labels.details.closeCookies);
    setCookieConsentText('#cookiescript_badgetext', labels.details.badge);

    setCookieConsentText('#cookiescript_declaration', labels.tabs.declaration);
    setCookieConsentText('#cookiescript_aboutcookies', labels.tabs.about);

    setCookieConsentText('th[data-cs-report-name="true"]', labels.table.name);
    setCookieConsentText('th[data-cs-report-expiration="true"]', labels.table.expiration);
    setCookieConsentText('th[data-cs-report-description="true"]', labels.table.description);
    setCookieConsentText('[data-cs-report-vendor="true"]', labels.table.provider);
    setCookieConsentText('[data-cs-report-domain="true"]', labels.table.domain);

    setCookieConsentHtml('#cookiescript_aboutwrap > span[data-cs-i18n-text]', labels.about.introHtml, labels.about.introText);
    setCookieConsentHtml('#cookiescript_aboutwrap > div > span[data-cs-i18n-text]', labels.about.adsHtml);
    setCookieConsentText('[data-cs-consent-key-box="cookie-script"] > span[data-cs-i18n-text]', labels.about.consentId);
}

function scheduleCookieConsentLanguageUpdate() {
    if (cookieConsentUpdateFrame !== null) {
        return;
    }

    cookieConsentUpdateFrame = window.requestAnimationFrame(function() {
        cookieConsentUpdateFrame = null;
        updateCookieConsentLanguage();
    });
}

function initCookieConsentLanguageSync() {
    if (cookieConsentMutationObserver || !document.body) {
        scheduleCookieConsentLanguageUpdate();
        return;
    }

    cookieConsentMutationObserver = new MutationObserver(function(mutations) {
        const hasCookieConsentMutation = mutations.some(function(mutation) {
            return Array.from(mutation.addedNodes).some(function(node) {
                if (!(node instanceof HTMLElement)) {
                    return false;
                }

                return node.id === 'cookiescript_injected_wrapper' ||
                    node.id === 'cookiescript_injected_fsd' ||
                    node.id === 'cookiescript_badge' ||
                    Boolean(node.querySelector('#cookiescript_injected_wrapper, #cookiescript_injected_fsd, #cookiescript_badge'));
            });
        });

        if (hasCookieConsentMutation) {
            scheduleCookieConsentLanguageUpdate();
        }
    });

    cookieConsentMutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('CookieScriptLoaded', scheduleCookieConsentLanguageUpdate);
    window.addEventListener('load', scheduleCookieConsentLanguageUpdate);
    scheduleCookieConsentLanguageUpdate();
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
    applyHeroGallerySlideStyle(activeLayer, heroGallery[heroIndex], getHeroGallerySlideStyle(heroGallery[heroIndex], heroIndex));
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

    const initialLayer = fadeContainer.children[0];
    const initialSlide = heroGallery[heroIndex];
    applyHeroGallerySlideStyle(initialLayer, initialSlide, getHeroGallerySlideStyle(initialSlide, heroIndex));
    initialLayer.setAttribute('aria-label', getHeroGalleryTitle(initialSlide));
    fadeContainer.children[1].style.opacity = '0';

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
    let lastMenuTrigger = null;

    function getVisibleMobileMenuLinks() {
        if (!mobileMenu) {
            return [];
        }

        return Array.from(mobileMenu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(function(element) {
            return !element.hasAttribute('hidden') && window.getComputedStyle(element).display !== 'none';
        });
    }

    function syncMobileMenuState(isOpen, options) {
        const settings = options || {};
        document.body.classList.toggle('mobile-menu-open', Boolean(isOpen));

        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', String(Boolean(isOpen)));
        }

        if (mobileMenu) {
            mobileMenu.classList.toggle('active', Boolean(isOpen));
            mobileMenu.hidden = !isOpen;
            mobileMenu.setAttribute('aria-hidden', String(!isOpen));

            if ('inert' in mobileMenu) {
                mobileMenu.inert = !isOpen;
            }
        }

        syncNavigationAccessibility(getActiveDocumentLanguage());

        if (isOpen && settings.moveFocus) {
            window.requestAnimationFrame(function() {
                const firstFocusableLink = getVisibleMobileMenuLinks()[0];

                if (firstFocusableLink) {
                    firstFocusableLink.focus();
                }
            });
        }

        if (!isOpen && settings.restoreFocus && lastMenuTrigger && typeof lastMenuTrigger.focus === 'function') {
            lastMenuTrigger.focus();
        }
    }

    function closeMobileMenu(options) {
        if (!mobileMenu || !mobileMenuBtn) {
            return;
        }

        syncMobileMenuState(false, options);
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(event) {
            event.stopPropagation();

            const nextIsOpen = mobileMenuBtn.getAttribute('aria-expanded') !== 'true';

            if (nextIsOpen) {
                lastMenuTrigger = mobileMenuBtn;
            }

            syncMobileMenuState(nextIsOpen, {
                moveFocus: nextIsOpen,
                restoreFocus: !nextIsOpen
            });
        });

        document.addEventListener('click', function(event) {
            if (mobileMenuBtn.getAttribute('aria-expanded') !== 'true') {
                return;
            }

            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                closeMobileMenu();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (mobileMenuBtn.getAttribute('aria-expanded') !== 'true') {
                return;
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                closeMobileMenu({ restoreFocus: true });
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusableLinks = getVisibleMobileMenuLinks();

            if (!focusableLinks.length) {
                event.preventDefault();
                mobileMenuBtn.focus();
                return;
            }

            const firstFocusableLink = focusableLinks[0];
            const lastFocusableLink = focusableLinks[focusableLinks.length - 1];

            if (event.shiftKey && document.activeElement === firstFocusableLink) {
                event.preventDefault();
                lastFocusableLink.focus();
            } else if (!event.shiftKey && document.activeElement === lastFocusableLink) {
                event.preventDefault();
                firstFocusableLink.focus();
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 700) {
                closeMobileMenu();
            }
        });
    }

    syncMobileMenuState(false);

    return {
        closeMobileMenu: closeMobileMenu
    };
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar || navbar.dataset.scrollInit === 'true') {
        return;
    }

    navbar.dataset.scrollInit = 'true';
    let isScrolled = false;
    let scrollFrame = null;

    function setNavbarStyle(nextScrolled) {
        if (isScrolled === nextScrolled) {
            return;
        }

        isScrolled = nextScrolled;
        navbar.classList.toggle('navbar-scrolled', nextScrolled);
    }

    function updateNavbarScrollState() {
        scrollFrame = null;
        const scrollTop = getViewportScrollTop();
        setNavbarStyle(scrollTop > 18);
    }

    function handleNavbarScroll() {
        if (scrollFrame !== null) {
            return;
        }

        scrollFrame = requestAnimationFrame(updateNavbarScrollState);
    }

    updateNavbarScrollState();
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
}

function initShapeParallax() {
    const shapes = document.querySelectorAll('.shape');
    if (!shapes.length) {
        return;
    }

    window.addEventListener('scroll', function() {
        const scrolled = getViewportScrollTop();
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

const supportedSiteLanguages = new Set(['de', 'en', 'fr', 'ln', 'it', 'tr', 'uk']);
const mbondaTimelineLinkSelector = '.timeline-item-title a[href="https://www.mbonda-lokito.org/home.html"]';
const homepageNavigationLinkSelector = '.nav-link[href^="#"], .mobile-nav-link[href^="#"]';
const smoothScrollLinkSelector = [
    homepageNavigationLinkSelector,
    '.contact-info-secondary-link[href^="#"]',
    '.site-footer__link[href^="#"]'
].join(', ');
const languageButtonLanguageMap = {
    langDe: 'de',
    langEn: 'en',
    langFr: 'fr',
    langLn: 'ln',
    langIt: 'it',
    langTr: 'tr',
    langUk: 'uk'
};
const navigationUiLabels = {
    de: {
        mainNavigation: 'Hauptnavigation',
        subpageNavigation: 'Seitennavigation',
        mobileNavigation: 'Mobile Navigation',
        languageSwitcher: 'Sprache wählen',
        openMenu: 'Menü öffnen',
        closeMenu: 'Menü schließen'
    },
    en: {
        mainNavigation: 'Main navigation',
        subpageNavigation: 'Page navigation',
        mobileNavigation: 'Mobile navigation',
        languageSwitcher: 'Choose language',
        openMenu: 'Open menu',
        closeMenu: 'Close menu'
    },
    fr: {
        mainNavigation: 'Navigation principale',
        subpageNavigation: 'Navigation de la page',
        mobileNavigation: 'Navigation mobile',
        languageSwitcher: 'Choisir la langue',
        openMenu: 'Ouvrir le menu',
        closeMenu: 'Fermer le menu'
    },
    ln: {
        mainNavigation: 'Navigation ya monene',
        subpageNavigation: 'Navigation ya lokasa',
        mobileNavigation: 'Navigation ya telefone',
        languageSwitcher: 'Pona lokota',
        openMenu: 'Fungola menu',
        closeMenu: 'Kanga menu'
    },
    it: {
        mainNavigation: 'Navigazione principale',
        subpageNavigation: 'Navigazione della pagina',
        mobileNavigation: 'Navigazione mobile',
        languageSwitcher: 'Scegli la lingua',
        openMenu: 'Apri il menu',
        closeMenu: 'Chiudi il menu'
    },
    tr: {
        mainNavigation: 'Ana gezinme',
        subpageNavigation: 'Sayfa gezinmesi',
        mobileNavigation: 'Mobil gezinme',
        languageSwitcher: 'Dil seç',
        openMenu: 'Menüyü aç',
        closeMenu: 'Menüyü kapat'
    },
    uk: {
        mainNavigation: 'Головна навігація',
        subpageNavigation: 'Навігація сторінкою',
        mobileNavigation: 'Мобільна навігація',
        languageSwitcher: 'Оберіть мову',
        openMenu: 'Відкрити меню',
        closeMenu: 'Закрити меню'
    }
};

function isSupportedSiteLanguage(lang) {
    return supportedSiteLanguages.has(lang);
}

function getViewportScrollTop() {
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getNavbarHeight() {
    const navbar = document.querySelector('.navbar');
    return navbar ? navbar.getBoundingClientRect().height : 0;
}

function getPreferredScrollBehavior() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

function getScrollTargetTop(targetElement, additionalOffset) {
    if (!targetElement) {
        return 0;
    }

    const elementTop = targetElement.getBoundingClientRect().top + getViewportScrollTop();
    const offset = typeof additionalOffset === 'number' ? additionalOffset : 0;

    return Math.max(0, elementTop - getNavbarHeight() - offset);
}

function focusNavigationTarget(targetSection) {
    if (!targetSection || typeof targetSection.focus !== 'function') {
        return;
    }

    const hadTabindex = targetSection.hasAttribute('tabindex');

    if (!hadTabindex) {
        targetSection.setAttribute('tabindex', '-1');
    }

    targetSection.focus({ preventScroll: true });

    if (!hadTabindex) {
        targetSection.addEventListener('blur', function handleBlur() {
            targetSection.removeAttribute('tabindex');
        }, { once: true });
    }
}

function scrollToSectionTarget(targetSection) {
    if (!targetSection) {
        return;
    }

    const targetTop = getScrollTargetTop(targetSection, 12);

    clearCurrentHash();
    window.scrollTo({
        top: targetTop,
        behavior: getPreferredScrollBehavior()
    });
}

function initInPageSectionNavigation(onNavigate) {
    const inPageLinks = document.querySelectorAll(smoothScrollLinkSelector);

    inPageLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const targetId = link.getAttribute('href');

            if (!targetId || !targetId.startsWith('#') || targetId.length < 2) {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            if (typeof onNavigate === 'function') {
                onNavigate(link, targetSection);
            }

            focusNavigationTarget(targetSection);
            scrollToSectionTarget(targetSection);
        });
    });
}

function getActiveDocumentLanguage() {
    const documentLanguage = document.documentElement.getAttribute('lang');

    if (isSupportedSiteLanguage(documentLanguage)) {
        return documentLanguage;
    }

    return 'de';
}

function getNavigationUiLabelSet(lang) {
    return navigationUiLabels[lang] || navigationUiLabels.de;
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

function getSiteLanguageFallbackOrder(lang) {
    const fallbackOrder = [lang];

    if (lang === 'ln') {
        fallbackOrder.push('fr');
    }

    if (lang !== 'en') {
        fallbackOrder.push('en');
    }

    if (lang !== 'de') {
        fallbackOrder.push('de');
    }

    if (lang !== 'it') {
        fallbackOrder.push('it');
    }

    return fallbackOrder;
}

function getLanguageVariantSignature(element) {
    const normalizedClassName = Array.from(element.classList)
        .filter(function(className) {
            return !className.includes('--');
        })
        .sort()
        .join(' ');

    return [element.tagName, normalizedClassName].join('|');
}

function syncLangAttributesFromDataLang() {
    document.querySelectorAll('[data-lang]').forEach(function(element) {
        const elementLanguage = element.getAttribute('data-lang');

        if (!isSupportedSiteLanguage(elementLanguage)) {
            return;
        }

        if (element.getAttribute('lang') !== elementLanguage) {
            element.setAttribute('lang', elementLanguage);
        }
    });
}

function applyLanguageVariantsForParent(parent, fallbackOrder) {
    let currentGroup = [];
    let currentSignature = '';
    let currentLanguages = new Set();

    function flushCurrentGroup() {
        if (!currentGroup.length) {
            return;
        }

        const chosenVariant = fallbackOrder
            .map(function(language) {
                return currentGroup.find(function(candidate) {
                    return candidate.getAttribute('data-lang') === language;
                });
            })
            .find(Boolean) || currentGroup[0];

        currentGroup.forEach(function(candidate) {
            candidate.style.display = candidate === chosenVariant ? '' : 'none';
        });

        currentGroup = [];
        currentSignature = '';
        currentLanguages = new Set();
    }

    Array.from(parent.children).forEach(function(child) {
        if (!child.hasAttribute('data-lang')) {
            return;
        }

        const childLanguage = child.getAttribute('data-lang');
        const childSignature = getLanguageVariantSignature(child);

        if (currentGroup.length && (childSignature !== currentSignature || currentLanguages.has(childLanguage))) {
            flushCurrentGroup();
        }

        currentGroup.push(child);
        currentSignature = childSignature;
        currentLanguages.add(childLanguage);
    });

    flushCurrentGroup();
}

function syncCurrentPageLinks() {
    const currentPageCandidates = document.querySelectorAll('[data-nav-current="page"]');

    currentPageCandidates.forEach(function(link) {
        link.removeAttribute('aria-current');
    });

    Array.from(currentPageCandidates)
        .filter(function(link) {
            return window.getComputedStyle(link).display !== 'none';
        })
        .forEach(function(link) {
            link.setAttribute('aria-current', 'page');
        });
}

function syncLanguageSwitcherAccessibility(lang) {
    document.querySelectorAll('.lang-switch-button').forEach(function(button) {
        const buttonLanguage = languageButtonLanguageMap[button.id];

        if (!buttonLanguage) {
            return;
        }

        button.setAttribute('aria-pressed', String(buttonLanguage === lang));
    });
}

function syncNavigationAccessibility(lang) {
    const labels = getNavigationUiLabelSet(lang);
    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const isMenuExpanded = mobileMenuButton && mobileMenuButton.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.navbar').forEach(function(navbar) {
        navbar.setAttribute('aria-label', labels.mainNavigation);
    });

    document.querySelectorAll('.subpage-topbar__links').forEach(function(navigation) {
        navigation.setAttribute('aria-label', labels.subpageNavigation);
    });

    document.querySelectorAll('.language-switch, #langSwitcher').forEach(function(languageSwitcher) {
        languageSwitcher.setAttribute('aria-label', labels.languageSwitcher);
    });

    if (mobileMenuButton) {
        mobileMenuButton.setAttribute('aria-label', isMenuExpanded ? labels.closeMenu : labels.openMenu);
    }

    if (mobileMenu) {
        mobileMenu.setAttribute('aria-label', labels.mobileNavigation);
    }

    syncLanguageSwitcherAccessibility(lang);
}

function syncInPageNavigationState(activeSectionId) {
    const inPageNavigationLinks = document.querySelectorAll('.nav-link[href^="#"], .mobile-nav-link[href^="#"]');

    inPageNavigationLinks.forEach(function(link) {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });

    if (!activeSectionId) {
        return;
    }

    const matchingLinks = Array.from(inPageNavigationLinks).filter(function(link) {
        return link.getAttribute('href') === `#${activeSectionId}`;
    });

    matchingLinks.forEach(function(link) {
        link.classList.add('active');

        if (window.getComputedStyle(link).display !== 'none') {
            link.setAttribute('aria-current', 'location');
        }
    });
}

function initHomepageNavigationWayfinding() {
    const homepageNavigationLinks = Array.from(document.querySelectorAll(homepageNavigationLinkSelector));

    if (!homepageNavigationLinks.length) {
        return;
    }

    const navbar = document.querySelector('.navbar');
    const seenTargets = new Set();
    const sections = homepageNavigationLinks
        .map(function(link) {
            return link.getAttribute('href');
        })
        .filter(function(href) {
            return href && href.length > 1 && !seenTargets.has(href) && seenTargets.add(href);
        })
        .map(function(href) {
            return document.querySelector(href);
        })
        .filter(Boolean);

    if (!sections.length) {
        return;
    }

    let activeSectionId = '';
    let scrollFrame = null;

    function getCurrentSectionId() {
        const scrollTop = getViewportScrollTop();
        const navbarHeight = getNavbarHeight();
        const activationLine = scrollTop + navbarHeight + 120;
        const documentBottom = scrollTop + window.innerHeight;
        const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

        if (documentBottom >= pageHeight - 24) {
            return sections[sections.length - 1].id;
        }

        let currentSection = sections[0];

        sections.forEach(function(section) {
            if (section.offsetTop <= activationLine) {
                currentSection = section;
            }
        });

        return currentSection ? currentSection.id : '';
    }

    function updateActiveNavigationState() {
        scrollFrame = null;

        const nextActiveSectionId = getCurrentSectionId();

        if (nextActiveSectionId === activeSectionId) {
            return;
        }

        activeSectionId = nextActiveSectionId;
        syncInPageNavigationState(activeSectionId);
    }

    function requestNavigationStateUpdate() {
        if (scrollFrame !== null) {
            return;
        }

        scrollFrame = window.requestAnimationFrame(updateActiveNavigationState);
    }

    homepageNavigationLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const href = link.getAttribute('href');

            if (!href || href.length < 2) {
                return;
            }

            const targetId = href.slice(1);

            if (!targetId) {
                return;
            }

            activeSectionId = targetId;
            syncInPageNavigationState(activeSectionId);
        });
    });

    updateActiveNavigationState();
    window.addEventListener('scroll', requestNavigationStateUpdate, { passive: true });
    window.addEventListener('resize', requestNavigationStateUpdate);
    window.addEventListener('hashchange', requestNavigationStateUpdate);
    document.addEventListener('site-language-change', requestNavigationStateUpdate);
}

function initNavigationFeatures() {
    const mobileNavigation = initMobileNavigation();

    initInPageSectionNavigation(function(link) {
        if (link.classList.contains('mobile-nav-link') && mobileNavigation && typeof mobileNavigation.closeMobileMenu === 'function') {
            mobileNavigation.closeMobileMenu();
        }
    });

    initHomepageNavigationWayfinding();
    initNavbarScroll();
}

function applySiteLanguage(lang) {
    if (!isSupportedSiteLanguage(lang)) {
        return;
    }

    syncLangAttributesFromDataLang();

    const fallbackOrder = getSiteLanguageFallbackOrder(lang);
    const parentsWithLanguageVariants = new Set();

    document.querySelectorAll('[data-lang]').forEach(function(element) {
        if (element.parentElement) {
            parentsWithLanguageVariants.add(element.parentElement);
        }
    });

    parentsWithLanguageVariants.forEach(function(parent) {
        applyLanguageVariantsForParent(parent, fallbackOrder);
    });

    syncCurrentPageLinks();
    syncNavigationAccessibility(lang);

    document.documentElement.setAttribute('lang', lang);

    try {
        localStorage.setItem('siteLang', lang);
    } catch (e) {}

    refreshHeroGalleryUi();
    ensureMbondaTimelineLinksAccessible();
    scheduleCookieConsentLanguageUpdate();
    document.dispatchEvent(new CustomEvent('site-language-change', { detail: { lang: lang } }));
}

window.setLang = applySiteLanguage;

function initSiteLanguage() {
    applySiteLanguage(getCurrentSiteLanguage());
}

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
            window.requestAnimationFrame(scrollIntroIntoView);
        }
    }

    function expandArchiveForHash() {
        const hash = window.location.hash ? window.location.hash.slice(1) : '';
        if (!hash) {
            return;
        }

        const target = document.getElementById(hash);
        if (target && archive.contains(target)) {
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

        if (!textColumn || !lastDescription) {
            return;
        }

        if (section.querySelector('.review-card-toggle')) {
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
            '<span data-lang="de">Mehr lesen</span>',
            '<span data-lang="en" style="display:none;">Read more</span>',
            '<span data-lang="fr" style="display:none;">Lire la suite</span>',
            '<span data-lang="ln" style="display:none;">Tanga lisusu</span>',
            '<span data-lang="it" style="display:none;">Leggi di più</span>',
            '<span data-lang="tr" style="display:none;">Devamını oku</span>',
            '<span data-lang="uk" style="display:none;">Читати далі</span>',
            '</span>',
            '<span class="review-card-toggle__label" data-state="expanded" hidden>',
            '<span data-lang="de">Weniger anzeigen</span>',
            '<span data-lang="en" style="display:none;">Show less</span>',
            '<span data-lang="fr" style="display:none;">Afficher moins</span>',
            '<span data-lang="ln" style="display:none;">Monisa moke</span>',
            '<span data-lang="it" style="display:none;">Mostra meno</span>',
            '<span data-lang="tr" style="display:none;">Daha az göster</span>',
            '<span data-lang="uk" style="display:none;">Показати менше</span>',
            '</span>'
        ].join('');

        toggle.addEventListener('click', function() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            setCardExpanded(section, !isExpanded);
        });

        toggleWrap.appendChild(toggle);
        lastDescription.insertAdjacentElement('afterend', toggleWrap);
        setCardExpanded(section, false);
    }

    function getActiveDescriptions(section) {
        return Array.from(section.querySelectorAll('.charity-description')).filter(function(description) {
            return window.getComputedStyle(description).display !== 'none';
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

    function expandCardForHash() {
        const hash = window.location.hash ? window.location.hash.slice(1) : '';
        if (!hash) {
            return;
        }

        const target = document.getElementById(hash);
        const section = target && target.closest('.review-archive .charity-projects-section[id^="review-"]');

        if (section) {
            createToggle(section);
            syncCardToggle(section);
            setCardExpanded(section, true);
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
            window.requestAnimationFrame(syncAllCardToggles);
        }
    });
    document.addEventListener('site-language-change', function() {
        if (!archive.hidden) {
            window.requestAnimationFrame(syncAllCardToggles);
        }
    });
    document.addEventListener('review-archive-state-change', function(event) {
        if (event.detail && event.detail.expanded) {
            window.requestAnimationFrame(syncAllCardToggles);
        }
    });
}

function initSiteFeatures() {
    enforceTopOnLoad();

    initEventLightbox();
    initHeroLayout();
    initHeroGallery();
    initCookieConsentLanguageSync();
    revealOnScroll('.modern-card');
    revealOnScroll('.musikfamilie-card');
    if (typeof initAccordion === 'function') {
        initAccordion();
    }
    initNavigationFeatures();
    initShapeParallax();
    initFieldValidation();
    updateYearsPassed();
    initReviewArchiveToggle();
    initReviewCardToggles();
    initSiteLanguage();
}

document.addEventListener('DOMContentLoaded', initSiteFeatures);

window.addEventListener('load', enforceTopOnLoad);
window.addEventListener('pageshow', enforceTopOnLoad);

window.addEventListener('resize', ensureMbondaTimelineLinksAccessible);