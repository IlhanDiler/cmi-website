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
        it: { kicker: 'Manifesto del concerto' },
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
        pagination: 'Hero gallery pagination'
    },
    it: {
        image: 'Immagine',
        previous: 'Immagine precedente',
        next: 'Immagine successiva',
        pagination: 'Paginazione galleria hero'
    },
    uk: {
        image: 'Зображення',
        previous: 'Попереднє зображення',
        next: 'Наступне зображення',
        pagination: 'Пагінація головної галереї'
    }
};

const heroGallery = [

    { src: 'bilder/Weihnachtskonzert Spitalkirche 13.12.2025.jpeg', title: { de: '„Weihnachtskonzert zum Mitsingen 2025“ in der Spitalkirche Ochsenfurt', en: '"Christmas Sing-Along Concert 2025" at Spitalkirche Ochsenfurt', it: '"Concerto di Natale da cantare insieme 2025" nella Spitalkirche di Ochsenfurt' }, shortTitle: { de: 'Weihnachtskonzert 2025 in Ochsenfurt', en: 'Christmas Sing-Along 2025 in Ochsenfurt', it: 'Concerto di Natale 2025 a Ochsenfurt' } },
    { src: 'bilder/Gruppenbild2.jpg', title: { de: 'Benefizkonzert für „Ärzte ohne Grenzen“ 2025 im Hotel Meintz Ochsenfurt', en: 'Benefit concert for "Doctors Without Borders" 2025 at Hotel Meintz Ochsenfurt', it: 'Concerto benefico per "Medici Senza Frontiere" 2025 all\'Hotel Meintz di Ochsenfurt' }, shortTitle: { de: 'Benefizkonzert 2025 im Hotel Meintz', en: 'Benefit concert 2025 at Hotel Meintz', it: 'Concerto benefico 2025 all\'Hotel Meintz' } },
     { src: 'bilder/gruppe_2007.jpeg', title: { de: 'CMI 2009', en: 'CMI 2009', it: 'CMI 2009' } },
    { src: 'bilder/peterbild.jpg', title: { de: 'Gedenkfeier - „80 Jahre Kriegsende, 80 Jahre Frieden“ in Ochsenfurt 2025', en: 'Commemorative event - "80 Years Since the End of War, 80 Years of Peace" in Ochsenfurt 2025', it: 'Cerimonia commemorativa - "80 anni dalla fine della guerra, 80 anni di pace" a Ochsenfurt 2025', uk: 'Пам’ятний захід «80 років від завершення війни, 80 років миру» в Оксенфурті 2025' }, shortTitle: { de: 'Gedenkfeier 80 Jahre Frieden 2025', en: '80 Years of Peace commemoration 2025', it: 'Commemorazione 80 anni di pace 2025', uk: 'Пам’ятний захід 80 років миру 2025' } },
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
        'bilder/Weihnachtskonzert Spitalkirche 13.12.2025.jpeg',
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
        if (storedLanguage === 'de' || storedLanguage === 'en' || storedLanguage === 'it' || storedLanguage === 'uk') {
            return storedLanguage;
        }
    } catch (e) {}

    const htmlLanguage = (document.documentElement.getAttribute('lang') || '').toLowerCase().split('-')[0];
    if (htmlLanguage === 'de' || htmlLanguage === 'en' || htmlLanguage === 'it' || htmlLanguage === 'uk') {
        return htmlLanguage;
    }

    const browserLanguage = (navigator.language || '').toLowerCase().split('-')[0];
    if (browserLanguage === 'de' || browserLanguage === 'en' || browserLanguage === 'it' || browserLanguage === 'uk') {
        return browserLanguage;
    }

    return 'de';
}

const cookieConsentTranslations = {
    de: {
        dialogLabel: 'Cookie-Einwilligungsdialog',
        badgeLabel: 'Cookie-Einstellungen',
        closeLabel: 'Schliessen',
        header: 'Diese Webseite verwendet Cookies.',
        descriptionHtml: 'Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren und unseren Datenverkehr zu analysieren. Wir geben Informationen ueber Ihre Nutzung unserer Website auch an unsere Werbe- und Analysepartner weiter, die diese moeglicherweise mit anderen Informationen kombinieren, die Sie ihnen bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung ihrer Dienste gesammelt haben.',
        descriptionText: 'Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren und unseren Datenverkehr zu analysieren. Wir geben Informationen ueber Ihre Nutzung unserer Website auch an unsere Werbe- und Analysepartner weiter, die diese moeglicherweise mit anderen Informationen kombinieren, die Sie ihnen bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung ihrer Dienste gesammelt haben.',
        categories: {
            strict: 'Unbedingt erforderlich',
            performance: 'Performance',
            targeting: 'Targeting',
            functionality: 'Funktionalitaet'
        },
        categoryDescriptions: {
            strict: 'Unbedingt erforderliche Cookies ermoeglichen wesentliche Kernfunktionen der Website wie die Benutzeranmeldung und die Kontoverwaltung. Ohne die unbedingt erforderlichen Cookies kann die Website nicht ordnungsgemaess verwendet werden.',
            performance: 'Performance-Cookies sammeln Informationen darueber, wie Besucher eine Website nutzen, zum Beispiel Analyse-Cookies. Diese Cookies koennen nicht verwendet werden, um einen bestimmten Besucher direkt zu identifizieren.',
            targeting: 'Targeting-Cookies werden verwendet, um Besucher zwischen verschiedenen Websites zu identifizieren, zum Beispiel Content-Partner oder Banner-Netzwerke. Diese Cookies koennen von Unternehmen verwendet werden, um ein Profil der Besucherinteressen zu erstellen oder relevante Anzeigen auf anderen Websites zu schalten.',
            functionality: 'Funktionale Cookies werden verwendet, um Besucherinformationen auf der Website zu speichern, zum Beispiel Sprache, Zeitzone oder erweiterte Inhalte.'
        },
        buttons: {
            save: 'Speichern & Schliessen',
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
            declaration: 'Cookie-Erklaerung',
            about: 'Informationen zu Cookies'
        },
        table: {
            name: 'Name',
            provider: 'Anbieter',
            domain: 'Domaene',
            expiration: 'Ablaufdatum',
            description: 'Beschreibung'
        },
        about: {
            introHtml: 'Cookies sind kleine Textdateien, die auf Ihrem Computer abgelegt werden, wenn Sie bestimmte Websites besuchen. Websites verwenden Cookies, um Benutzern das Navigieren auf einer Website zu erleichtern und das Ausfuehren bestimmter Funktionen zu ermoeglichen. Cookies, die fuer den ordnungsgemaessen Betrieb der Website erforderlich sind, duerfen ohne Ihre Einwilligung gesetzt werden. Allen anderen Cookies muss erst zugestimmt werden, bevor sie im Browser gesetzt werden koennen.<br>Sie koennen Ihre Einwilligung zur Verwendung von Cookies auf unserer Website jederzeit in der Datenschutzerklaerung aendern.',
            introText: 'Cookies sind kleine Textdateien, die auf Ihrem Computer abgelegt werden, wenn Sie bestimmte Websites besuchen. Websites verwenden Cookies, um Benutzern das Navigieren auf einer Website zu erleichtern und das Ausfuehren bestimmter Funktionen zu ermoeglichen. Cookies, die fuer den ordnungsgemaessen Betrieb der Website erforderlich sind, duerfen ohne Ihre Einwilligung gesetzt werden. Allen anderen Cookies muss erst zugestimmt werden, bevor sie im Browser gesetzt werden koennen. Sie koennen Ihre Einwilligung zur Verwendung von Cookies auf unserer Website jederzeit in der Datenschutzerklaerung aendern.',
            adsHtml: 'Wir verwenden auch Cookies, um Daten zum Zweck der Personalisierung und Messung der Effektivitaet unserer Werbung zu sammeln. Weitere Informationen finden Sie in der <a href="https://business.safety.google/privacy/" target="_blank">Google-Datenschutzerklaerung</a>.',
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
            targeting: 'Targeting cookies are used to identify visitors across different websites, for example content partners or banner networks. These cookies may be used by companies to build a profile of visitor interests or show relevant ads on other websites.',
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
            introHtml: 'Cookies are small text files that are placed on your computer when you visit certain websites. Websites use cookies to help users navigate a website and to enable certain functions. Cookies that are required for the proper operation of the website may be set without your consent. All other cookies must be approved before they can be set in the browser.<br>You can change your consent to the use of cookies on our website at any time in the privacy policy.',
            introText: 'Cookies are small text files that are placed on your computer when you visit certain websites. Websites use cookies to help users navigate a website and to enable certain functions. Cookies that are required for the proper operation of the website may be set without your consent. All other cookies must be approved before they can be set in the browser. You can change your consent to the use of cookies on our website at any time in the privacy policy.',
            adsHtml: 'We also use cookies to collect data for the personalization and measurement of the effectiveness of our advertising. Further information can be found in the <a href="https://business.safety.google/privacy/" target="_blank">Google Privacy Policy</a>.',
            consentId: 'Cookie consent ID'
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
            functionality: 'Funzionalita'
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
    uk: {
        dialogLabel: 'Вікно згоди на cookie',
        badgeLabel: 'Налаштування cookie',
        closeLabel: 'Закрити',
        header: 'Цей вебсайт використовує файли cookie.',
        descriptionHtml: 'Ми використовуємо файли cookie, щоб персоналізувати вміст і рекламу та аналізувати наш трафік. Ми також передаємо інформацію про використання вами нашого вебсайту нашим рекламним і аналітичним партнерам, які можуть поєднувати її з іншими даними, наданими вами, або зібраними під час користування їхніми сервісами.',
        descriptionText: 'Ми використовуємо файли cookie, щоб персоналізувати вміст і рекламу та аналізувати наш трафік. Ми також передаємо інформацію про використання вами нашого вебсайту нашим рекламним і аналітичним партнерам, які можуть поєднувати її з іншими даними, наданими вами, або зібраними під час користування їхніми сервісами.',
        categories: {
            strict: 'Суворо необхідні',
            performance: 'Продуктивність',
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
            badge: 'Налаштування cookie'
        },
        tabs: {
            declaration: 'Декларація про cookie',
            about: 'Інформація про cookie'
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
            consentId: 'Ідентифікатор згоди на cookie'
        }
    }
};

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
            backgroundSize: 'cover',
            blurBackgroundPosition: 'center 10%',
            blurBackgroundSize: 'cover'
        };
    }

    if (window.innerWidth <= 700) {
        return {
            backgroundPosition: 'center center',
            backgroundSize: 'contain',
            blurBackgroundPosition: 'center center',
            blurBackgroundSize: 'cover'
        };
    }

    const desktopPosition = heroGalleryDesktopFocusImages.has(entry.src) ? 'center 60%' : 'center 10%';

    return {
        backgroundPosition: desktopPosition,
        backgroundSize: 'cover',
        blurBackgroundPosition: desktopPosition,
        blurBackgroundSize: 'cover'
    };
}

function applyHeroGallerySlideStyle(layer, entry, slideStyle) {
    if (!layer || !entry || !slideStyle) {
        return;
    }

    layer.style.setProperty('--hero-fade-image-url', `url('${entry.src}')`);
    layer.style.setProperty('--hero-fade-image-focus-position', slideStyle.backgroundPosition);
    layer.style.setProperty('--hero-fade-image-size', slideStyle.backgroundSize);
    layer.style.setProperty('--hero-fade-blur-position', slideStyle.blurBackgroundPosition || slideStyle.backgroundPosition);
    layer.style.setProperty('--hero-fade-blur-size', slideStyle.blurBackgroundSize || 'cover');
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

    function syncMobileMenuState(isOpen) {
        document.body.classList.toggle('mobile-menu-open', Boolean(isOpen));
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', String(Boolean(isOpen)));
        }
    }

    function closeMobileMenu() {
        if (!mobileMenu || !mobileMenuBtn) {
            return;
        }

        mobileMenu.classList.remove('active');
        syncMobileMenuState(false);
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            mobileMenu.classList.toggle('active');
            syncMobileMenuState(mobileMenu.classList.contains('active'));
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

    syncMobileMenuState(false);

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
        const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
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

const supportedSiteLanguages = new Set(['de', 'en', 'it', 'uk']);
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

function getSiteLanguageFallbackOrder(lang) {
    const fallbackOrder = [lang];

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

function applySiteLanguage(lang) {
    if (!isSupportedSiteLanguage(lang)) {
        return;
    }

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

        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
        const introTop = intro.getBoundingClientRect().top + window.scrollY;
        const targetTop = Math.max(0, introTop - navbarHeight - 12);

        if (Math.abs(window.scrollY - targetTop) < 20) {
            return;
        }

        window.scrollTo({
            top: targetTop,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
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

        section.classList.toggle('review-card--expanded', isExpanded);
        toggle.classList.toggle('review-card-toggle--expanded', isExpanded);
        toggle.setAttribute('aria-expanded', String(isExpanded));

        toggle.querySelectorAll('[data-state="collapsed"]').forEach(function(label) {
            label.hidden = isExpanded;
        });

        toggle.querySelectorAll('[data-state="expanded"]').forEach(function(label) {
            label.hidden = !isExpanded;
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
            '<span data-lang="it" style="display:none;">Leggi di piu</span>',
            '<span data-lang="uk" style="display:none;">Читати далі</span>',
            '</span>',
            '<span class="review-card-toggle__label" data-state="expanded" hidden>',
            '<span data-lang="de">Weniger anzeigen</span>',
            '<span data-lang="en" style="display:none;">Show less</span>',
            '<span data-lang="it" style="display:none;">Mostra meno</span>',
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
    initEventLightbox();
    initHeroLayout();
    initHeroGallery();
    initCookieConsentLanguageSync();
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
    initReviewArchiveToggle();
    initReviewCardToggles();
    initSiteLanguage();
}

document.addEventListener('DOMContentLoaded', initSiteFeatures);
document.addEventListener('DOMContentLoaded', initNavbarScroll);

window.addEventListener('load', initNavbarScroll);

window.addEventListener('resize', ensureMbondaTimelineLinksAccessible);