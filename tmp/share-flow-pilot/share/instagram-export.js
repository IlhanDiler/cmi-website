const SHARE_MANIFEST_URL = "share-pages.json";

const FALLBACK_SHARE_PAGES = [
    "querbeet-roundup-2025.html",
    "internationales-galakonzert-ochsenfurt-2026.html",
    "benefiz-trommelworkshop-2026.html",
];

const DEFAULT_HASHTAGS = [
    "#CMIOchsenfurt",
    "#CollegiumMusicum",
    "#Ochsenfurt",
    "#MusikVerbindet",
    "#KlassischeMusik"
];

const KEYWORD_TAGS = [
    { pattern: /galakonzert|gala concert|concerto di gala/, tags: ["#Galakonzert", "#LiveMusik"] },
    { pattern: /masterclass|workshop|meierott/, tags: ["#Workshop", "#Streicher"] },
    { pattern: /benefiz|benefit|benefico/, tags: ["#Benefizkonzert", "#MusikFuerDenGutenZweck"] },
    { pattern: /weihnacht|christmette|nikolaus|natale/, tags: ["#Weihnachtsmusik", "#Adventszeit"] },
    { pattern: /neujahr|new year|capodanno/, tags: ["#Neujahrskonzert", "#Jahresauftakt"] },
    { pattern: /frieden|peace|pace/, tags: ["#Frieden", "#Erinnerungskultur"] },
    { pattern: /querbeet|veeh/, tags: ["#Querbeet", "#GemeinsamMusizieren"] },
    { pattern: /symphonic|kurswoche|wir musizieren|orchester|orchestra/, tags: ["#Orchester", "#GemeinsamMusizieren"] }
];

const POST_COPY_TRANSLATIONS = {
    de: {
        storyCta: "Mehr auf unserer Website",
        captionFootnote: "Mehr dazu auf unserer Website. Den passenden Link legen wir in Bio, Story oder Link-Sammlung.",
        storyLinkInstruction: "Link-Sticker hier setzen",
        storyLinkSupport: "Nur so wird die Story in Instagram klickbar.",
        storyFormatNote: "Die Story-Datei bleibt ein Bild. Fuer eine klickbare Story in Instagram danach den Link-Sticker auf www.cmi-ochsenfurt.de setzen."
    },
    en: {
        storyCta: "More on our website",
        captionFootnote: "Find more on our website. We place the matching link in the bio, story or link collection.",
        storyLinkInstruction: "Add the link sticker here",
        storyLinkSupport: "This is what makes the story clickable on Instagram.",
        storyFormatNote: "The exported story stays an image. To make it clickable on Instagram, add a link sticker to www.cmi-ochsenfurt.de afterwards."
    },
    fr: {
        storyCta: "Plus sur notre site",
        captionFootnote: "Plus d'informations sur notre site. Nous plaçons le lien approprie dans la bio, la story ou une collection de liens.",
        storyLinkInstruction: "Ajouter ici le sticker de lien",
        storyLinkSupport: "C'est ce qui rend la story cliquable sur Instagram.",
        storyFormatNote: "Le fichier story exporte reste une image. Pour la rendre cliquable sur Instagram, ajoutez ensuite un sticker de lien vers www.cmi-ochsenfurt.de."
    },
    ln: {
        storyCta: "Makambo mingi na site",
        captionFootnote: "Makambo mosusu ezali na site na biso. Tokotia lien oyo ebongi na bio, na story to na esika ya ba liens.",
        storyLinkInstruction: "Bakisa sticker ya lien awa",
        storyLinkSupport: "Yango nde ekosala ete story ekoma clickable na Instagram.",
        storyFormatNote: "Fichier ya story oyo eexportami ezali kaka image. Po ezala clickable na Instagram, bakisa sticker ya lien na www.cmi-ochsenfurt.de sima."
    },
    it: {
        storyCta: "Di piu sul nostro sito",
        captionFootnote: "Trovi di piu sul nostro sito. Inseriamo il link adatto nella bio, nella story o nella raccolta link.",
        storyLinkInstruction: "Aggiungi qui il link sticker",
        storyLinkSupport: "E' questo che rende la story cliccabile su Instagram.",
        storyFormatNote: "La story esportata resta un'immagine. Per renderla cliccabile su Instagram, aggiungi poi un link sticker a www.cmi-ochsenfurt.de."
    },
    tr: {
        storyCta: "Sitemizde daha fazlasi",
        captionFootnote: "Daha fazlasi web sitemizde. Uygun baglantiyi biyografi, hikaye veya link koleksiyonunda paylasiyoruz.",
        storyLinkInstruction: "Link etiketini buraya ekleyin",
        storyLinkSupport: "Hikayeyi Instagram'da tiklanabilir yapan sey budur.",
        storyFormatNote: "Disa aktarılan hikaye bir gorsel olarak kalir. Instagram'da tiklanabilir olmasi icin daha sonra www.cmi-ochsenfurt.de icin link etiketi ekleyin."
    },
    uk: {
        storyCta: "Більше на нашому сайті",
        captionFootnote: "Більше на нашому сайті. Відповідне посилання ми розміщуємо в біо, сторіз або збірці посилань.",
        storyLinkInstruction: "Додайте стікер-посилання тут",
        storyLinkSupport: "Саме це робить сторіз клікабельною в Instagram.",
        storyFormatNote: "Експортована сторіз залишається зображенням. Щоб зробити її клікабельною в Instagram, потім додайте стікер-посилання на www.cmi-ochsenfurt.de."
    }
};

const SUPPORTED_POST_LANGUAGES = Object.freeze(Object.keys(POST_COPY_TRANSLATIONS));
const DEFAULT_POST_LANGUAGE = "de";
const LOCALIZED_SOURCE_URL = new URL("../index.html", window.location.href).href;
const LOCALIZED_SUMMARY_MAX_LENGTH = 320;
const POSTER_SOURCE_IDS = [
    "review-neujahrskonzert-2025",
    "review-internationales-benefizkonzert-2025",
    "review-musik-an-der-furt-2025",
    "review-concello-kurswoche-2025",
    "review-johann-strauss-marktbreit-2025",
    "review-weihnachtsklaenge-an-der-furt-2025"
];
const POSTER_COPY_TRANSLATIONS = {
    de: {
        title: "CMI Konzertjahr 2025",
        meta: "Konzertcollage 2025",
        lead: "Ein visueller Rueckblick auf Konzertmomente, Benefizprojekte und Begegnungen aus dem CMI-Jahr 2025.",
        imageAlt: "CMI Konzertcollage 2025"
    },
    en: {
        title: "CMI Concert Year 2025",
        meta: "Concert collage 2025",
        lead: "A visual recap of concert moments, benefit projects, and encounters from the CMI year 2025.",
        imageAlt: "CMI concert collage 2025"
    },
    fr: {
        title: "Annee de concerts du CMI 2025",
        meta: "Collage de concerts 2025",
        lead: "Un retour visuel sur les concerts, les projets benefices et les rencontres de l'annee CMI 2025.",
        imageAlt: "Collage de concerts CMI 2025"
    },
    ln: {
        title: "Mobu ya ba konser ya CMI 2025",
        meta: "Kolaji ya ba konser 2025",
        lead: "Talatala ya bililingi ya ba ntango ya konser, misala ya lisungi mpe bokutani ya mobu ya CMI 2025.",
        imageAlt: "Kolaji ya ba konser ya CMI 2025"
    },
    it: {
        title: "Stagione concertistica CMI 2025",
        meta: "Collage concerti 2025",
        lead: "Un riepilogo visivo di concerti, iniziative benefiche e incontri dell'anno CMI 2025.",
        imageAlt: "Collage concerti CMI 2025"
    },
    tr: {
        title: "CMI Konser Yili 2025",
        meta: "Konser kolaji 2025",
        lead: "CMI'nin 2025 konser yilindan muzik anlari, yardim projeleri ve bulusmalara gorsel bir bakis.",
        imageAlt: "CMI konser kolaji 2025"
    },
    uk: {
        title: "Концертний рік КМІ 2025",
        meta: "Концертний колаж 2025",
        lead: "Візуальний огляд концертних моментів, благодійних проєктів і зустрічей року КМІ 2025.",
        imageAlt: "Концертний колаж КМІ 2025"
    }
};

let localizedSourceDocumentPromise = null;

const state = {
    posts: [],
    sharePages: [],
    failedFilesCount: 0,
    source: "manifest",
    language: DEFAULT_POST_LANGUAGE,
    statusRestoreTimerId: 0
};

const INSTAGRAM_EXPORT = {
    width: 1080,
    height: 1350,
    imageHeight: 700,
    bodyTop: 676,
    bodyHeight: 646,
    padding: 76,
    logoSize: 62,
    maxTitleLines: 3,
    maxTextLines: 4
};

const INSTAGRAM_STORY_EXPORT = {
    width: 1080,
    height: 1920,
    imageHeight: 920,
    bodyTop: 848,
    bodyHeight: 1042,
    padding: 86,
    logoSize: 70,
    maxTitleLines: 4,
    maxTextLines: 7
};

const SITE_ASSET_PATH_PATTERN = /^\/(bilder|files)\//i;
const PRODUCTION_SITE_HOSTNAMES = new Set(["www.cmi-ochsenfurt.de", "cmi-ochsenfurt.de"]);
const BRAND_LOGO_URL = "/files/logo_cmi1%20-%20schwarz.svg";
const initialSearchParams = new URLSearchParams(window.location.search);
const preferredPostLanguage = getPreferredPostLanguage();

const elements = {
    postGrid: document.getElementById("post-grid"),
    postSearch: document.getElementById("post-search"),
    exportStatus: document.getElementById("export-status"),
    copyAllJson: document.getElementById("copy-all-json"),
    template: document.getElementById("post-card-template")
};

function getMetaContent(doc, selector) {
    return doc.querySelector(selector)?.getAttribute("content")?.trim() || "";
}

function resolveExportAssetUrl(value) {
    const rawValue = collapseWhitespace(value);

    if (!rawValue) {
        return "";
    }

    try {
        const resolvedUrl = new URL(rawValue, window.location.href);

        if (PRODUCTION_SITE_HOSTNAMES.has(resolvedUrl.hostname) && SITE_ASSET_PATH_PATTERN.test(resolvedUrl.pathname)) {
            return new URL(`${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`, window.location.origin).href;
        }

        return resolvedUrl.href;
    } catch (_error) {
        return rawValue;
    }
}

function collapseWhitespace(value) {
    return (value || "").replace(/\s+/g, " ").trim();
}

function normalizeText(value) {
    return collapseWhitespace(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function uniqueTags(tags) {
    return [...new Set(tags.filter(Boolean))].slice(0, 8);
}

function buildHashtags(title, text) {
    const normalizedTitle = normalizeText(title);
    const normalizedText = normalizeText(text);
    const derived = KEYWORD_TAGS
        .filter((entry) => entry.pattern.test(normalizedTitle) || entry.pattern.test(normalizedText))
        .flatMap((entry) => entry.tags);

    return uniqueTags([...DEFAULT_HASHTAGS, ...derived]);
}

function normalizePostLanguage(locale) {
    const normalizedLocale = collapseWhitespace(locale).toLowerCase();
    const language = normalizedLocale.split(/[_-]/)[0];

    if (language && POST_COPY_TRANSLATIONS[language]) {
        return language;
    }

    return "de";
}

function getPostCopy(language) {
    return POST_COPY_TRANSLATIONS[normalizePostLanguage(language)];
}

function getStoredSiteLanguage() {
    try {
        return collapseWhitespace(window.localStorage.getItem("siteLang") || "");
    } catch (_error) {
        return "";
    }
}

function getPreferredPostLanguage() {
    return normalizePostLanguage(
        initialSearchParams.get("lang") ||
        getStoredSiteLanguage() ||
        navigator.language ||
        document.documentElement.getAttribute("lang") ||
        DEFAULT_POST_LANGUAGE
    );
}

function getLanguageFallbackOrder(language) {
    return [...new Set([normalizePostLanguage(language), DEFAULT_POST_LANGUAGE, ...SUPPORTED_POST_LANGUAGES])];
}

function getLocalizedElement(container, selector, language) {
    if (!container) {
        return null;
    }

    const matches = Array.from(container.querySelectorAll(selector));
    if (!matches.length) {
        return null;
    }

    for (const fallbackLanguage of getLanguageFallbackOrder(language)) {
        const matchingLanguageNode = matches.find((candidate) => candidate.getAttribute("data-lang") === fallbackLanguage);
        if (matchingLanguageNode) {
            return matchingLanguageNode;
        }
    }

    return matches.find((candidate) => !candidate.hasAttribute("data-lang")) || matches[0];
}

function extractNodeText(node) {
    if (!node) {
        return "";
    }

    if (node.matches("ul, ol")) {
        return Array.from(node.children)
            .filter((child) => child.matches("li"))
            .map((item) => collapseWhitespace(item.textContent))
            .filter(Boolean)
            .join(" · ");
    }

    return collapseWhitespace(node.textContent);
}

function getLocalizedText(container, selector, language) {
    return extractNodeText(getLocalizedElement(container, selector, language));
}

function getSourceHashFromHref(value) {
    const rawValue = collapseWhitespace(value);

    if (!rawValue) {
        return "";
    }

    try {
        return new URL(rawValue, window.location.href).hash || "";
    } catch (_error) {
        const hashIndex = rawValue.indexOf("#");
        return hashIndex >= 0 ? rawValue.slice(hashIndex) : "";
    }
}

function getSourceHashFromShareDocument(doc) {
    return getSourceHashFromHref(doc.querySelector(".share-card__button[href]")?.getAttribute("href") || "");
}

function getSourceElement(sourceDoc, sourceHash) {
    if (!sourceDoc || !sourceHash.startsWith("#")) {
        return null;
    }

    return sourceDoc.getElementById(sourceHash.slice(1));
}

function findLinkByHref(sourceDoc, selector, hrefValue) {
    if (!sourceDoc) {
        return null;
    }

    const normalizedHref = collapseWhitespace(hrefValue);
    if (!normalizedHref) {
        return null;
    }

    return Array.from(sourceDoc.querySelectorAll(selector)).find((candidate) => {
        return collapseWhitespace(candidate.getAttribute("href")) === normalizedHref;
    }) || null;
}

function shortenTextBySentence(text, maxLength) {
    const normalizedText = collapseWhitespace(text);

    if (normalizedText.length <= maxLength) {
        return normalizedText;
    }

    const sentenceMatches = normalizedText.match(/[^.!?]+(?:[.!?]+|$)/g) || [normalizedText];
    let summary = "";

    for (const sentence of sentenceMatches) {
        const trimmedSentence = collapseWhitespace(sentence);
        if (!trimmedSentence) {
            continue;
        }

        const candidate = summary ? `${summary} ${trimmedSentence}` : trimmedSentence;
        if (candidate.length > maxLength) {
            break;
        }

        summary = candidate;

        if (summary.length >= maxLength * 0.7) {
            break;
        }
    }

    return summary || shortenText(normalizedText, maxLength);
}

function buildSummaryFromFragments(fragments, fallbackText) {
    let summary = "";

    for (const fragment of fragments) {
        const normalizedFragment = collapseWhitespace(fragment);
        if (!normalizedFragment) {
            continue;
        }

        const candidate = summary ? `${summary} ${normalizedFragment}` : normalizedFragment;
        summary = shortenTextBySentence(candidate, LOCALIZED_SUMMARY_MAX_LENGTH);

        if (summary.length >= Math.min(220, LOCALIZED_SUMMARY_MAX_LENGTH * 0.7)) {
            break;
        }
    }

    return summary || collapseWhitespace(fallbackText);
}

function buildLocalizedReviewPost(sourceDoc, sourceHash, sourceRoot, language, fallbackPost) {
    const title = getLocalizedText(sourceRoot, ".charity-title, .event-headline, .event-title", language) || fallbackPost.title;
    const meta = getLocalizedText(sourceRoot, ".charity-meta", language) || fallbackPost.meta;
    const newsCard = findLinkByHref(sourceDoc, ".news-feed-card-link[href]", sourceHash)?.closest(".news-feed-card");
    const teaser = getLocalizedText(newsCard, ".news-feed-card-copy", language);
    const description = getLocalizedText(sourceRoot, ".charity-description", language);
    const text = buildSummaryFromFragments([teaser, description], fallbackPost.text);

    return {
        title,
        meta,
        text,
        imageAlt: title || fallbackPost.imageAlt || fallbackPost.title,
        language: normalizePostLanguage(language)
    };
}

function buildLocalizedEventPost(sourceRoot, language, fallbackPost) {
    const title = getLocalizedText(sourceRoot, ".event-headline, .event-title", language) || fallbackPost.title;
    const date = collapseWhitespace(sourceRoot.querySelector(".event-date")?.textContent || "");
    const time = getLocalizedText(sourceRoot, ".event-time", language);
    const location = getLocalizedText(sourceRoot, ".event-location", language);
    const description = getLocalizedText(sourceRoot, ".event-description", language);
    const program = getLocalizedText(sourceRoot, ".event-program", language);
    const note = getLocalizedText(sourceRoot, ".event-note", language);
    const meta = collapseWhitespace([date, time, location].filter(Boolean).join(" · ")) || fallbackPost.meta;
    const text = buildSummaryFromFragments([description, program, note], fallbackPost.text);

    return {
        title,
        meta,
        text,
        imageAlt: title || fallbackPost.imageAlt || fallbackPost.title,
        language: normalizePostLanguage(language)
    };
}

function getPosterCopy(language) {
    return POSTER_COPY_TRANSLATIONS[normalizePostLanguage(language)] || POSTER_COPY_TRANSLATIONS[DEFAULT_POST_LANGUAGE];
}

function buildLocalizedPosterPost(sourceDoc, language, fallbackPost) {
    const localizedPosterCopy = getPosterCopy(language);
    const featuredTitles = sourceDoc
        ? POSTER_SOURCE_IDS
            .map((sourceId) => getLocalizedText(sourceDoc.getElementById(sourceId), ".charity-title, .event-headline", language))
            .filter(Boolean)
        : [];
    const text = buildSummaryFromFragments([
        localizedPosterCopy.lead,
        featuredTitles.join(" · ")
    ], fallbackPost.text || localizedPosterCopy.lead);

    return {
        title: localizedPosterCopy.title,
        meta: localizedPosterCopy.meta,
        text,
        imageAlt: localizedPosterCopy.imageAlt,
        language: normalizePostLanguage(language)
    };
}

function resolveLocalizedPost(sourceDoc, sourceHash, language, fallbackPost) {
    if (fallbackPost.fileName === "querbeet-roundup-2025.html") {
        return buildLocalizedPosterPost(sourceDoc, language, fallbackPost);
    }

    const sourceRoot = getSourceElement(sourceDoc, sourceHash);
    if (!sourceRoot) {
        return null;
    }

    if (sourceRoot.id.startsWith("event-") || sourceRoot.classList.contains("event-card")) {
        return buildLocalizedEventPost(sourceRoot, language, fallbackPost);
    }

    return buildLocalizedReviewPost(sourceDoc, sourceHash, sourceRoot, language, fallbackPost);
}

function loadLocalizedSourceDocument() {
    if (!localizedSourceDocumentPromise) {
        localizedSourceDocumentPromise = fetch(LOCALIZED_SOURCE_URL, { cache: "no-store" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Lokalisierte Inhaltsquelle konnte nicht geladen werden: ${LOCALIZED_SOURCE_URL}`);
                }

                return response.text();
            })
            .then((html) => new DOMParser().parseFromString(html, "text/html"))
            .catch((error) => {
                console.warn("Lokalisierte Inhalte aus index.html konnten nicht geladen werden, Share-Seiten-Fallback bleibt aktiv.", error);
                return null;
            });
    }

    return localizedSourceDocumentPromise;
}

function buildCaption(post) {
    const localizedCopy = getPostCopy(post.language);

    return [
        post.title,
        "",
        post.meta,
        "",
        post.text,
        "",
        localizedCopy.captionFootnote,
        "",
        post.hashtags.join(" ")
    ].join("\n");
}

function buildSearchIndex(post) {
    return normalizeText([
        post.title,
        post.meta,
        post.text,
        post.fileName,
        post.hashtags.join(" ")
    ].join(" "));
}

function buildExportFileName(post, suffix) {
    return post.fileName.replace(/\.html$/i, `${suffix}.png`);
}

function getInitialSearchQuery() {
    return collapseWhitespace(initialSearchParams.get("post") || initialSearchParams.get("search") || "");
}

function scrollToFirstVisiblePost() {
    const firstCard = elements.postGrid.querySelector(".post-card");
    if (!firstCard) {
        return;
    }

    window.requestAnimationFrame(() => {
        firstCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
}

function shortenText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function clearExportStatusRestoreTimer() {
    if (!state.statusRestoreTimerId) {
        return;
    }

    window.clearTimeout(state.statusRestoreTimerId);
    state.statusRestoreTimerId = 0;
}

function setExportStatusMessage(message) {
    clearExportStatusRestoreTimer();
    elements.exportStatus.textContent = message;
}

function getExportResultsStatusMessage() {
    const visibleCount = elements.postGrid.querySelectorAll(".post-card").length;
    let message = `${visibleCount} von ${state.posts.length} Beitraegen sichtbar`;

    if (state.failedFilesCount) {
        message += `, ${state.failedFilesCount} Datei(en) uebersprungen`;
    }

    if (state.source === "fallback") {
        message += " (Fallback-Liste aktiv)";
    }

    return message;
}

function syncExportResultsStatus() {
    if (!state.posts.length) {
        return;
    }

    setExportStatusMessage(getExportResultsStatusMessage());
}

function announceTransientExportStatus(message, duration) {
    const restoreDelay = typeof duration === "number" ? duration : 1600;

    setExportStatusMessage(message);

    if (!state.posts.length) {
        return;
    }

    state.statusRestoreTimerId = window.setTimeout(() => {
        elements.exportStatus.textContent = getExportResultsStatusMessage();
        state.statusRestoreTimerId = 0;
    }, restoreDelay);
}

function captureControlLabelState(trigger) {
    return {
        text: trigger.textContent,
        ariaLabel: trigger.getAttribute("aria-label"),
        title: trigger.getAttribute("title")
    };
}

function applyControlLabelState(trigger, state) {
    trigger.textContent = state.text;

    if (state.ariaLabel) {
        trigger.setAttribute("aria-label", state.ariaLabel);
    } else {
        trigger.removeAttribute("aria-label");
    }

    if (state.title) {
        trigger.setAttribute("title", state.title);
    } else {
        trigger.removeAttribute("title");
    }
}

function setControlFeedbackState(trigger, text, accessibilityLabel) {
    trigger.textContent = text;

    if (accessibilityLabel) {
        trigger.setAttribute("aria-label", accessibilityLabel);
        trigger.setAttribute("title", accessibilityLabel);
    }
}

async function copyText(value, trigger, successLabel, successAccessibilityLabel) {
    const originalState = captureControlLabelState(trigger);
    const successStatus = successAccessibilityLabel || successLabel;

    try {
        await navigator.clipboard.writeText(value);
        setControlFeedbackState(trigger, successLabel, successStatus);
        announceTransientExportStatus(successStatus);
        window.setTimeout(() => {
            applyControlLabelState(trigger, originalState);
        }, 1500);
    } catch (error) {
        announceTransientExportStatus("Kopieren fehlgeschlagen. Bitte Text manuell kopieren.", 2200);
        window.alert("Kopieren hat im Browser nicht funktioniert. Bitte den Text manuell kopieren.");
    }
}

function getExportFormatPresentation(format, language) {
    const postCopy = getPostCopy(language);

    if (format === "story") {
        return {
            summaryLabel: "Story 9:16",
            buttonLabel: "9:16 PNG exportieren",
            exportLabel: "Story PNG exportieren",
            optionLabel: "Story-Vorlage 9 zu 16",
            summaryNote: postCopy.storyFormatNote
        };
    }

    return {
        summaryLabel: "Feed 4:5",
        buttonLabel: "4:5 PNG exportieren",
        exportLabel: "Feed PNG exportieren",
        optionLabel: "Feed-Vorlage 4 zu 5",
        summaryNote: "Der Feed-Export nutzt nur Motiv oder Plakat. Alle weiteren Infos stehen in der Caption."
    };
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Bild konnte nicht geladen werden: ${url}`));
        image.src = url;
    });
}

function parseCssPx(value) {
    const parsedValue = Number.parseFloat(value);
    return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function splitCssFunctionArguments(value) {
    const args = [];
    let current = "";
    let depth = 0;

    for (const character of value) {
        if (character === "(") {
            depth += 1;
        } else if (character === ")") {
            depth = Math.max(0, depth - 1);
        } else if (character === "," && depth === 0) {
            args.push(current.trim());
            current = "";
            continue;
        }

        current += character;
    }

    if (current.trim()) {
        args.push(current.trim());
    }

    return args;
}

function parseLinearGradient(value) {
    const match = /^linear-gradient\((.*)\)$/i.exec((value || "").trim());

    if (!match) {
        return null;
    }

    const args = splitCssFunctionArguments(match[1]);
    if (args.length < 2) {
        return null;
    }

    let angle = 180;
    let stopArgs = args;

    if (/^-?\d+(?:\.\d+)?deg$/i.test(args[0])) {
        angle = Number.parseFloat(args[0]);
        stopArgs = args.slice(1);
    }

    const stops = stopArgs.map((stop, index) => {
        const trimmedStop = stop.trim();
        const lastSpaceIndex = trimmedStop.lastIndexOf(" ");
        let color = trimmedStop;
        let offset = stopArgs.length > 1 ? index / (stopArgs.length - 1) : 0;

        if (lastSpaceIndex > 0) {
            const potentialOffset = trimmedStop.slice(lastSpaceIndex + 1).trim();

            if (/^-?\d+(?:\.\d+)?%$/i.test(potentialOffset)) {
                color = trimmedStop.slice(0, lastSpaceIndex).trim();
                offset = Number.parseFloat(potentialOffset) / 100;
            }
        }

        return { color, offset };
    });

    return { angle, stops };
}

function fillRoundedRectWithBackground(ctx, rect, radius, backgroundColor, backgroundImage) {
    ctx.save();
    drawRoundedRect(ctx, rect.x, rect.y, rect.width, rect.height, radius);
    ctx.clip();

    const gradient = parseLinearGradient(backgroundImage);

    if (gradient) {
        const angleInRadians = (gradient.angle - 90) * (Math.PI / 180);
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;
        const halfSpan = Math.max(rect.width, rect.height);
        const deltaX = Math.cos(angleInRadians) * halfSpan;
        const deltaY = Math.sin(angleInRadians) * halfSpan;
        const canvasGradient = ctx.createLinearGradient(
            centerX - deltaX,
            centerY - deltaY,
            centerX + deltaX,
            centerY + deltaY
        );

        for (const stop of gradient.stops) {
            canvasGradient.addColorStop(Math.min(1, Math.max(0, stop.offset)), stop.color);
        }

        ctx.fillStyle = canvasGradient;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    if (backgroundColor && backgroundColor !== "transparent" && backgroundColor !== "rgba(0, 0, 0, 0)") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    }

    ctx.restore();
}

function buildCanvasFontFromComputedStyle(style, scaleY) {
    const fontStyle = style.fontStyle && style.fontStyle !== "normal" ? `${style.fontStyle} ` : "";
    const fontWeight = style.fontWeight || "400";
    const fontSize = `${Math.max(1, parseCssPx(style.fontSize) * scaleY)}px`;
    const fontFamily = style.fontFamily || "sans-serif";

    return `${fontStyle}${fontWeight} ${fontSize} ${fontFamily}`;
}

function getComputedLineClamp(style) {
    const lineClampValue = style.getPropertyValue("-webkit-line-clamp") || style.getPropertyValue("line-clamp");
    const parsedValue = Number.parseInt(lineClampValue, 10);
    return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 0;
}

function resolveComputedLineHeight(style, fontSize, scaleY) {
    const rawLineHeight = (style.lineHeight || "").trim().toLowerCase();

    if (!rawLineHeight || rawLineHeight === "normal") {
        return fontSize * 1.2;
    }

    const parsedLineHeight = Number.parseFloat(rawLineHeight);

    if (!Number.isFinite(parsedLineHeight) || parsedLineHeight <= 0) {
        return fontSize * 1.2;
    }

    if (rawLineHeight.endsWith("px")) {
        return parsedLineHeight * scaleY;
    }

    if (parsedLineHeight < fontSize * 0.5) {
        return parsedLineHeight * fontSize;
    }

    return parsedLineHeight;
}

function getScaledElementRect(element, rootRect, scaleX, scaleY) {
    const rect = element.getBoundingClientRect();

    return {
        x: (rect.left - rootRect.left) * scaleX,
        y: (rect.top - rootRect.top) * scaleY,
        width: rect.width * scaleX,
        height: rect.height * scaleY
    };
}

function getScaledContentRect(element, rootRect, scaleX, scaleY) {
    const rect = getScaledElementRect(element, rootRect, scaleX, scaleY);
    const style = window.getComputedStyle(element);
    const paddingLeft = parseCssPx(style.paddingLeft) * scaleX;
    const paddingRight = parseCssPx(style.paddingRight) * scaleX;
    const paddingTop = parseCssPx(style.paddingTop) * scaleY;
    const paddingBottom = parseCssPx(style.paddingBottom) * scaleY;

    return {
        x: rect.x + paddingLeft,
        y: rect.y + paddingTop,
        width: Math.max(0, rect.width - paddingLeft - paddingRight),
        height: Math.max(0, rect.height - paddingTop - paddingBottom)
    };
}

function drawComputedTextBlock(ctx, element, rect, scaleY, maxLinesOverride) {
    const style = window.getComputedStyle(element);
    const text = collapseWhitespace(element.textContent);

    if (!text || rect.width <= 0 || rect.height <= 0 || style.display === "none") {
        return;
    }

    const font = buildCanvasFontFromComputedStyle(style, scaleY);
    const fontSize = parseCssPx(style.fontSize) * scaleY;
    const lineHeight = resolveComputedLineHeight(style, fontSize, scaleY);
    const computedLineClamp = getComputedLineClamp(style);
    const heightBoundLines = Math.max(1, Math.floor((rect.height + fontSize * 0.2) / lineHeight));
    const requestedMaxLines = maxLinesOverride || computedLineClamp || heightBoundLines;
    const maxLines = Math.max(1, Math.min(requestedMaxLines, computedLineClamp || requestedMaxLines, heightBoundLines));
    const lines = getTextLines(ctx, text, rect.width, maxLines, font);

    ctx.save();
    ctx.font = font;
    ctx.fillStyle = style.color;
    ctx.textBaseline = "top";

    lines.forEach((line, index) => {
        ctx.fillText(line, rect.x, rect.y + index * lineHeight);
    });

    ctx.restore();
}

function drawComputedPanel(ctx, element, rect, scaleX, scaleY, options) {
    const style = window.getComputedStyle(element);
    const scale = Math.min(scaleX, scaleY);
    const borderWidth = parseCssPx(style.borderTopWidth) * scale;
    const shadowColor = options?.shadowColor;
    const shadowBlur = options?.shadowBlur ? options.shadowBlur * scale : 0;
    const shadowOffsetY = options?.shadowOffsetY ? options.shadowOffsetY * scale : 0;

    drawRoundedPanel(ctx, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        radius: parseCssPx(style.borderTopLeftRadius) * scale,
        fillStyle: style.backgroundColor && style.backgroundColor !== "rgba(0, 0, 0, 0)" ? style.backgroundColor : (options?.fillStyle || "rgba(255, 255, 255, 0.94)"),
        strokeStyle: borderWidth > 0 ? style.borderTopColor : undefined,
        lineWidth: borderWidth || undefined,
        shadowColor,
        shadowBlur,
        shadowOffsetY
    });
}

async function exportPreviewElementAsPng(previewElement, exportWidth, exportHeight, fileName) {
    const rootRect = previewElement.getBoundingClientRect();

    if (!rootRect.width || !rootRect.height) {
        throw new Error("Preview-Element hat keine renderbare Groesse.");
    }

    const previewImageElement = previewElement.querySelector(".story-preview__image");
    const overlayElement = previewElement.querySelector(".story-preview__overlay");
    const metaElement = previewElement.querySelector(".story-preview__meta");
    const titleElement = previewElement.querySelector(".story-preview__title");
    const footerElement = previewElement.querySelector(".story-preview__footer");
    const siteElement = previewElement.querySelector(".story-preview__site");

    if (!(previewImageElement instanceof HTMLImageElement) || !overlayElement || !metaElement || !titleElement || !footerElement || !siteElement) {
        throw new Error("Story-Preview ist unvollstaendig und kann nicht exportiert werden.");
    }

    const storyImage = await loadImage(previewImageElement.currentSrc || previewImageElement.src);
    const scaleX = exportWidth / rootRect.width;
    const scaleY = exportHeight / rootRect.height;
    const scale = Math.min(scaleX, scaleY);
    const canvas = document.createElement("canvas");
    canvas.width = exportWidth;
    canvas.height = exportHeight;
    const ctx = canvas.getContext("2d");
    const previewStyle = window.getComputedStyle(previewElement);
    const previewRadius = parseCssPx(previewStyle.borderTopLeftRadius) * scale;

    fillRoundedRectWithBackground(
        ctx,
        { x: 0, y: 0, width: exportWidth, height: exportHeight },
        previewRadius,
        previewStyle.backgroundColor,
        previewStyle.backgroundImage
    );

    ctx.save();
    drawRoundedRect(ctx, 0, 0, exportWidth, exportHeight, previewRadius);
    ctx.clip();

    const imageRect = getScaledContentRect(previewImageElement, rootRect, scaleX, scaleY);
    drawContainedImage(ctx, storyImage, imageRect.x, imageRect.y, imageRect.width, imageRect.height);

    const overlayRect = getScaledElementRect(overlayElement, rootRect, scaleX, scaleY);
    drawComputedPanel(ctx, overlayElement, overlayRect, scaleX, scaleY, {
        shadowColor: "rgba(18, 65, 58, 0.16)",
        shadowBlur: 22,
        shadowOffsetY: 10
    });

    drawComputedTextBlock(ctx, metaElement, getScaledElementRect(metaElement, rootRect, scaleX, scaleY), scaleY, 1);
    drawComputedTextBlock(ctx, titleElement, getScaledElementRect(titleElement, rootRect, scaleX, scaleY), scaleY);

    const footerRect = getScaledElementRect(footerElement, rootRect, scaleX, scaleY);
    drawComputedPanel(ctx, footerElement, footerRect, scaleX, scaleY);
    drawComputedTextBlock(ctx, siteElement, getScaledElementRect(siteElement, rootRect, scaleX, scaleY), scaleY, 2);

    ctx.restore();

    if (parseCssPx(previewStyle.borderTopWidth) > 0) {
        ctx.save();
        drawRoundedRect(ctx, 0, 0, exportWidth, exportHeight, previewRadius);
        ctx.strokeStyle = previewStyle.borderTopColor;
        ctx.lineWidth = Math.max(1, parseCssPx(previewStyle.borderTopWidth) * scale);
        ctx.stroke();
        ctx.restore();
    }

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = fileName;
    link.click();
}

async function exportPosterOnlyStoryImage(post, fileName) {
    const heroImage = await loadImage(post.image);
    const canvas = document.createElement("canvas");
    canvas.width = INSTAGRAM_STORY_EXPORT.width;
    canvas.height = INSTAGRAM_STORY_EXPORT.height;
    const ctx = canvas.getContext("2d");

    const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    backgroundGradient.addColorStop(0, "#f9fdfc");
    backgroundGradient.addColorStop(1, "#dfefeb");
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawImageStage(ctx, heroImage, {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
        framePadding: 24,
        frameInset: 12,
        frameRadius: 44,
        backdropOpacity: 0.2,
        backdropTint: "rgba(8, 30, 27, 0.08)",
        frameFill: "rgba(255, 255, 255, 0.28)"
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = fileName;
    link.click();
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
    const rounded = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + rounded, y);
    ctx.lineTo(x + width - rounded, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + rounded);
    ctx.lineTo(x + width, y + height - rounded);
    ctx.quadraticCurveTo(x + width, y + height, x + width - rounded, y + height);
    ctx.lineTo(x + rounded, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - rounded);
    ctx.lineTo(x, y + rounded);
    ctx.quadraticCurveTo(x, y, x + rounded, y);
    ctx.closePath();
}

function drawCoverImage(ctx, image, x, y, width, height) {
    const imageRatio = image.width / image.height;
    const targetRatio = width / height;
    let sourceWidth = image.width;
    let sourceHeight = image.height;
    let sourceX = 0;
    let sourceY = 0;

    if (imageRatio > targetRatio) {
        sourceWidth = image.height * targetRatio;
        sourceX = (image.width - sourceWidth) / 2;
    } else {
        sourceHeight = image.width / targetRatio;
        sourceY = (image.height - sourceHeight) / 2;
    }

    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawContainedImage(ctx, image, x, y, width, height) {
    if (!image || !image.width || !image.height || width <= 0 || height <= 0) {
        return null;
    }

    const scale = Math.min(width / image.width, height / image.height);
    const targetWidth = image.width * scale;
    const targetHeight = image.height * scale;
    const targetX = x + (width - targetWidth) / 2;
    const targetY = y + (height - targetHeight) / 2;

    ctx.drawImage(image, targetX, targetY, targetWidth, targetHeight);

    return {
        x: targetX,
        y: targetY,
        width: targetWidth,
        height: targetHeight
    };
}

function drawImageStage(ctx, image, options) {
    const {
        x,
        y,
        width,
        height,
        framePadding,
        frameInset,
        frameRadius,
        backdropOpacity,
        backdropTint,
        frameFill
    } = options;

    if (!image || width <= 0 || height <= 0) {
        return;
    }

    ctx.save();
    ctx.globalAlpha = typeof backdropOpacity === "number" ? backdropOpacity : 0.2;
    drawCoverImage(ctx, image, x, y, width, height);
    ctx.restore();

    if (backdropTint) {
        ctx.fillStyle = backdropTint;
        ctx.fillRect(x, y, width, height);
    }

    const stageX = x + framePadding;
    const stageY = y + framePadding;
    const stageWidth = width - framePadding * 2;
    const stageHeight = height - framePadding * 2;

    ctx.save();
    ctx.shadowColor = "rgba(13, 49, 45, 0.18)";
    ctx.shadowBlur = 36;
    ctx.shadowOffsetY = 14;
    drawRoundedRect(ctx, stageX, stageY, stageWidth, stageHeight, frameRadius);
    ctx.fillStyle = frameFill || "rgba(255, 255, 255, 0.24)";
    ctx.fill();
    ctx.restore();

    ctx.save();
    drawRoundedRect(ctx, stageX, stageY, stageWidth, stageHeight, frameRadius);
    ctx.clip();
    drawContainedImage(
        ctx,
        image,
        stageX + frameInset,
        stageY + frameInset,
        stageWidth - frameInset * 2,
        stageHeight - frameInset * 2
    );
    ctx.restore();

    ctx.save();
    drawRoundedRect(ctx, stageX, stageY, stageWidth, stageHeight, frameRadius);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.72)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

function drawRoundedPanel(ctx, options) {
    const {
        x,
        y,
        width,
        height,
        radius,
        fillStyle,
        strokeStyle,
        lineWidth,
        shadowColor,
        shadowBlur,
        shadowOffsetY
    } = options;

    ctx.save();

    if (shadowColor && shadowBlur) {
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetY = shadowOffsetY || 0;
    }

    drawRoundedRect(ctx, x, y, width, height, radius);
    ctx.fillStyle = fillStyle;
    ctx.fill();

    if (strokeStyle) {
        drawRoundedRect(ctx, x, y, width, height, radius);
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth || 1;
        ctx.stroke();
    }

    ctx.restore();
}

function fitTextIntoLines(ctx, text, maxWidth, maxLines) {
    const words = text.split(/\s+/).filter(Boolean);
    const lines = [];
    let currentLine = "";

    for (const word of words) {
        const candidate = currentLine ? `${currentLine} ${word}` : word;
        if (ctx.measureText(candidate).width <= maxWidth) {
            currentLine = candidate;
            continue;
        }

        if (currentLine) {
            lines.push(currentLine);
        }

        currentLine = word;

        if (lines.length === maxLines - 1) {
            break;
        }
    }

    if (currentLine && lines.length < maxLines) {
        lines.push(currentLine);
    }

    if (lines.length === maxLines) {
        let lastLine = lines[maxLines - 1];
        while (ctx.measureText(`${lastLine}…`).width > maxWidth && lastLine.includes(" ")) {
            lastLine = lastLine.slice(0, lastLine.lastIndexOf(" "));
        }

        if (lastLine !== lines[maxLines - 1]) {
            lines[maxLines - 1] = `${lastLine}…`;
        }
    }

    return lines;
}

function getTextLines(ctx, text, maxWidth, maxLines, font) {
    ctx.save();
    ctx.font = font;
    const lines = fitTextIntoLines(ctx, text, maxWidth, maxLines);
    ctx.restore();
    return lines;
}

function drawTextLines(ctx, options) {
    const { lines, x, y, lineHeight, color, font } = options;

    ctx.save();
    ctx.fillStyle = color;
    ctx.font = font;

    lines.forEach((line, index) => {
        ctx.fillText(line, x, y + index * lineHeight);
    });

    ctx.restore();

    return lines.length ? y + (lines.length - 1) * lineHeight : y;
}

function drawTextBlock(ctx, options) {
    const { text, x, y, maxWidth, lineHeight, maxLines, color, font } = options;
    const lines = getTextLines(ctx, text, maxWidth, maxLines, font);
    drawTextLines(ctx, { lines, x, y, lineHeight, color, font });
    return lines.length;
}

function drawPillLabel(ctx, options) {
    const {
        text,
        x,
        y,
        height,
        paddingX,
        fillStyle,
        textColor,
        font,
        strokeStyle,
        lineWidth,
        shadowColor,
        shadowBlur,
        shadowOffsetY
    } = options;

    ctx.save();
    ctx.font = font;
    const width = ctx.measureText(text).width + paddingX * 2;
    ctx.restore();

    drawRoundedPanel(ctx, {
        x,
        y,
        width,
        height,
        radius: height / 2,
        fillStyle,
        strokeStyle,
        lineWidth,
        shadowColor,
        shadowBlur,
        shadowOffsetY
    });

    ctx.save();
    ctx.fillStyle = textColor;
    ctx.font = font;
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + paddingX, y + height / 2 + 1);
    ctx.restore();

    return width;
}

function drawWebsiteRow(ctx, options) {
    const { x, y, logoImage, logoSize, url, color, font } = options;
    const textX = x + (logoImage ? logoSize + 18 : 0);

    if (logoImage) {
        ctx.drawImage(logoImage, x, y, logoSize, logoSize);
    }

    ctx.save();
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textBaseline = "middle";
    ctx.fillText(url, textX, y + logoSize / 2 + 1);
    ctx.restore();
}

async function exportInstagramImage(post, trigger) {
    const originalState = captureControlLabelState(trigger);
    const postLabel = post.title || post.fileName || "Share-Beitrag";

    setControlFeedbackState(trigger, "Export laeuft...", `PNG-Export laeuft: ${postLabel}`);
    trigger.disabled = true;

    try {
        const [heroImage] = await Promise.allSettled([
            loadImage(post.image)
        ]);

        if (heroImage.status !== "fulfilled") {
            throw heroImage.reason;
        }

        const canvas = document.createElement("canvas");
        canvas.width = INSTAGRAM_EXPORT.width;
        canvas.height = INSTAGRAM_EXPORT.height;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#f4fbfa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        backgroundGradient.addColorStop(0, "#fdfefe");
        backgroundGradient.addColorStop(1, "#e8f3f1");
        ctx.fillStyle = backgroundGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const topAura = ctx.createRadialGradient(170, 120, 36, 170, 120, 460);
        topAura.addColorStop(0, "rgba(21, 155, 140, 0.18)");
        topAura.addColorStop(1, "rgba(21, 155, 140, 0)");
        ctx.fillStyle = topAura;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const bottomAura = ctx.createRadialGradient(canvas.width - 150, canvas.height - 120, 40, canvas.width - 150, canvas.height - 120, 360);
        bottomAura.addColorStop(0, "rgba(17, 120, 109, 0.12)");
        bottomAura.addColorStop(1, "rgba(17, 120, 109, 0)");
        ctx.fillStyle = bottomAura;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawImageStage(ctx, heroImage.value, {
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height,
            framePadding: 48,
            frameInset: 24,
            frameRadius: 44,
            backdropOpacity: 0.18,
            backdropTint: "rgba(8, 30, 27, 0.08)",
            frameFill: "rgba(255, 255, 255, 0.3)"
        });

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = buildExportFileName(post, "-instagram-4x5");
        link.click();

        setControlFeedbackState(trigger, "PNG exportiert", `PNG exportiert: ${postLabel}`);
        announceTransientExportStatus(`PNG exportiert: ${postLabel}`);
    } catch (error) {
        console.error(error);
        announceTransientExportStatus(`PNG-Export fehlgeschlagen: ${postLabel}`, 2200);
        window.alert("Der PNG-Export hat nicht funktioniert. Bitte die Export-Seite ueber die live Website oder lokal ueber einen Webserver oeffnen; direkt ueber file:// klappt der Canvas-Export nicht.");
        setControlFeedbackState(trigger, "Export fehlgeschlagen", `PNG-Export fehlgeschlagen: ${postLabel}`);
    } finally {
        window.setTimeout(() => {
            applyControlLabelState(trigger, originalState);
            trigger.disabled = false;
        }, 1600);
    }
}

async function exportInstagramStoryImage(post, trigger, previewElement) {
    const originalState = captureControlLabelState(trigger);
    const postLabel = post.title || post.fileName || "Share-Beitrag";
    const fileName = buildExportFileName(post, "-instagram-story-9x16");

    setControlFeedbackState(trigger, "Story laeuft...", `Story-Export laeuft: ${postLabel}`);
    trigger.disabled = true;

    try {
        try {
            if (!(previewElement instanceof Element)) {
                throw new Error("Keine Story-Preview fuer den Export gefunden.");
            }

            await exportPreviewElementAsPng(
                previewElement,
                INSTAGRAM_STORY_EXPORT.width,
                INSTAGRAM_STORY_EXPORT.height,
                fileName
            );

            setControlFeedbackState(trigger, "Story exportiert", `Story exportiert: ${postLabel}`);
            announceTransientExportStatus(`Story exportiert: ${postLabel}`);
        } catch (previewError) {
            console.warn(previewError);
            await exportPosterOnlyStoryImage(post, fileName);
            window.alert("Die Story-Preview konnte in diesem Browser nicht direkt exportiert werden. Es wurde stattdessen nur das Plakat exportiert.");
            setControlFeedbackState(trigger, "Poster exportiert", `Preview-Export nicht moeglich, Poster exportiert: ${postLabel}`);
            announceTransientExportStatus(`Preview-Export nicht moeglich, Poster exportiert: ${postLabel}`);
        }
    } catch (error) {
        console.error(error);
        announceTransientExportStatus(`Story-Export fehlgeschlagen: ${postLabel}`, 2200);
        window.alert("Der Story-Export hat nicht funktioniert. Bitte die Export-Seite ueber die live Website oder lokal ueber einen Webserver oeffnen; direkt ueber file:// klappt der Export nicht.");
        setControlFeedbackState(trigger, "Story fehlgeschlagen", `Story-Export fehlgeschlagen: ${postLabel}`);
    } finally {
        window.setTimeout(() => {
            applyControlLabelState(trigger, originalState);
            trigger.disabled = false;
        }, 1600);
    }
}

async function loadPost(fileName, localizedSourcePromise) {
    const response = await fetch(fileName, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Share-Seite konnte nicht geladen werden: ${fileName}`);
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const title = collapseWhitespace(getMetaContent(doc, 'meta[property="og:title"]') || doc.title.trim());
    const description = collapseWhitespace(getMetaContent(doc, 'meta[name="description"]') || getMetaContent(doc, 'meta[property="og:description"]'));
    const sharePageLanguage = normalizePostLanguage(
        getMetaContent(doc, 'meta[property="og:locale"]') || doc.documentElement.getAttribute("lang") || "de"
    );
    const image = resolveExportAssetUrl(
        doc.querySelector(".share-card__hero")?.getAttribute("src") || getMetaContent(doc, 'meta[property="og:image"]') || ""
    );
    const imageAlt = collapseWhitespace(
        doc.querySelector(".share-card__hero")?.getAttribute("alt") ||
        getMetaContent(doc, 'meta[property="og:image:alt"]') ||
        getMetaContent(doc, 'meta[name="twitter:image:alt"]') ||
        title
    );
    const shareUrl = getMetaContent(doc, 'meta[property="og:url"]') || new URL(fileName, window.location.href).href;
    const fallbackMeta = collapseWhitespace(doc.querySelector(".share-card__meta")?.textContent) || "Share-Beitrag";
    const fallbackText = collapseWhitespace(doc.querySelector(".share-card__text")?.textContent) || description;
    const sourceHash = getSourceHashFromShareDocument(doc);
    const localizedSourceDoc = localizedSourcePromise ? await localizedSourcePromise : null;
    const localizedPost = resolveLocalizedPost(localizedSourceDoc, sourceHash, preferredPostLanguage, {
        fileName,
        title,
        meta: fallbackMeta,
        text: fallbackText,
        imageAlt,
        language: sharePageLanguage
    });
    const resolvedLanguage = localizedPost?.language || preferredPostLanguage || sharePageLanguage;
    const resolvedTitle = localizedPost?.title || title;
    const resolvedMeta = localizedPost?.meta || fallbackMeta;
    const resolvedText = localizedPost?.text || fallbackText;
    const resolvedImageAlt = localizedPost?.imageAlt || imageAlt || resolvedTitle;
    const hashtags = buildHashtags(resolvedTitle, resolvedText);

    return {
        fileName,
        title: resolvedTitle,
        description: resolvedText || description,
        language: resolvedLanguage,
        image,
        imageAlt: resolvedImageAlt,
        shareUrl,
        meta: resolvedMeta,
        text: resolvedText,
        hashtags,
        caption: buildCaption({ title: resolvedTitle, meta: resolvedMeta, text: resolvedText, hashtags, language: resolvedLanguage })
    };
}

async function loadSharePageList() {
    try {
        const response = await fetch(SHARE_MANIFEST_URL, { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`Manifest konnte nicht geladen werden: ${SHARE_MANIFEST_URL}`);
        }

        const manifest = await response.json();
        const pages = Array.isArray(manifest) ? manifest : manifest?.pages;

        if (!Array.isArray(pages)) {
            throw new Error("Manifest hat kein gueltiges pages-Array.");
        }

        const cleanedPages = pages
            .map((entry) => collapseWhitespace(typeof entry === "string" ? entry : ""))
            .filter((entry) => entry && /\.html$/i.test(entry) && entry !== "instagram-export.html");

        if (!cleanedPages.length) {
            throw new Error("Manifest enthaelt keine gueltigen Share-Seiten.");
        }

        return {
            pages: cleanedPages,
            source: "manifest"
        };
    } catch (error) {
        console.warn("Share-Manifest fehlt oder ist ungueltig, Fallback-Liste wird verwendet.", error);
        return {
            pages: FALLBACK_SHARE_PAGES,
            source: "fallback"
        };
    }
}

async function loadPosts() {
    const { pages, source } = await loadSharePageList();
    const localizedSourcePromise = loadLocalizedSourceDocument();
    const results = await Promise.allSettled(pages.map((page) => loadPost(page, localizedSourcePromise)));
    const posts = [];
    const failedFiles = [];

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            posts.push(result.value);
            return;
        }

        failedFiles.push(pages[index]);
        console.error(result.reason);
    });

    return { posts, failedFiles, sharePages: pages, source };
}

function createTag(label) {
    const tag = document.createElement("span");
    tag.textContent = label;
    return tag;
}

function buildPostDomId(post, index) {
    const slug = normalizeText(post.fileName || post.title || `post ${index + 1}`)
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return slug || `post-${index + 1}`;
}

function renderPosts(posts) {
    elements.postGrid.innerHTML = "";

    if (!posts.length) {
        const empty = document.createElement("p");
        empty.className = "export-status";
        empty.textContent = "Keine passenden Beitraege gefunden.";
        elements.postGrid.appendChild(empty);
        return;
    }

    for (const [index, post] of posts.entries()) {
        const fragment = elements.template.content.cloneNode(true);
        const card = fragment.querySelector(".post-card");
        const image = fragment.querySelector(".post-card__image");
        const meta = fragment.querySelector(".post-card__meta");
        const title = fragment.querySelector(".post-card__title");
        const text = fragment.querySelector(".post-card__text");
        const hashtags = fragment.querySelector(".post-card__hashtags");
        const captionLabel = fragment.querySelector(".post-card__caption-label");
        const caption = fragment.querySelector(".post-card__caption");
        const formatValue = fragment.querySelector(".post-card__format-value");
        const formatNote = fragment.querySelector(".post-card__format-note");
        const feedPreviewOption = fragment.querySelector(".preview-option--feed");
        const feedPreview = fragment.querySelector(".insta-preview");
        const previewImage = fragment.querySelector(".insta-preview__image");
        const previewMeta = fragment.querySelector(".insta-preview__meta");
        const previewTitle = fragment.querySelector(".insta-preview__title");
        const previewText = fragment.querySelector(".insta-preview__text");
        const storyPreviewOption = fragment.querySelector(".preview-option--story");
        const storyPreview = fragment.querySelector(".story-preview");
        const storyPreviewImage = fragment.querySelector(".story-preview__image");
        const storyPreviewMeta = fragment.querySelector(".story-preview__meta");
        const storyPreviewTitle = fragment.querySelector(".story-preview__title");
        const storyPreviewText = fragment.querySelector(".story-preview__text");
        const storyPreviewCta = fragment.querySelector(".story-preview__cta");
        const storyPreviewHint = fragment.querySelector(".story-preview__hint");
        const exportFeedButton = fragment.querySelector(".post-card__export-feed");
        const exportStoryButton = fragment.querySelector(".post-card__export-story");
        const copyCaptionButton = fragment.querySelector(".post-card__copy-caption");
        const copyLinkButton = fragment.querySelector(".post-card__copy-link");
        const openImageLink = fragment.querySelector(".post-card__open-image");
        const openShareLink = fragment.querySelector(".post-card__open-share");
        const postLabel = post.title || post.fileName || "Share-Beitrag";
        const postDomId = buildPostDomId(post, index);
        const titleId = `${postDomId}-title`;
        const captionLabelId = `${postDomId}-caption-label`;
        const captionId = `${postDomId}-caption`;
        const openInNewWindowHint = "oeffnet in neuem Fenster";

        card.dataset.search = buildSearchIndex(post);
        card.setAttribute("aria-labelledby", titleId);
        image.src = post.image;
        image.alt = post.imageAlt;
        image.loading = "lazy";
        image.decoding = "async";
        meta.textContent = post.meta;
        title.id = titleId;
        title.textContent = post.title;
        text.textContent = post.text;
        if (captionLabel) {
            captionLabel.id = captionLabelId;
            captionLabel.textContent = `Instagram-Caption fuer ${postLabel}`;
        }
        caption.id = captionId;
        caption.value = post.caption;
        caption.setAttribute("aria-labelledby", captionLabel ? captionLabelId : titleId);
        caption.setAttribute("title", `Instagram-Caption: ${postLabel}`);
        previewImage.src = post.image;
        previewImage.alt = "";
        previewImage.setAttribute("aria-hidden", "true");
        previewImage.loading = "lazy";
        previewImage.decoding = "async";
        previewMeta.textContent = post.meta;
        previewTitle.textContent = post.title;
        previewText.textContent = post.text;
        storyPreviewImage.src = post.image;
        storyPreviewImage.alt = "";
        storyPreviewImage.setAttribute("aria-hidden", "true");
        storyPreviewImage.loading = "lazy";
        storyPreviewImage.decoding = "async";
        storyPreviewMeta.textContent = post.meta;
        storyPreviewTitle.textContent = post.title;
        storyPreviewText.textContent = post.text;
        if (storyPreviewCta) {
            storyPreviewCta.textContent = getPostCopy(post.language).storyCta;
        }

        if (storyPreviewHint) {
            storyPreviewHint.textContent = getPostCopy(post.language).storyLinkInstruction;
        }

        if (feedPreview) {
            feedPreview.setAttribute("aria-hidden", "true");
        }

        if (storyPreview) {
            storyPreview.setAttribute("aria-hidden", "true");
        }

        openImageLink.href = post.image;
        openShareLink.href = post.shareUrl;
        copyCaptionButton.setAttribute("aria-label", `Caption kopieren: ${postLabel}`);
        copyCaptionButton.setAttribute("title", `Caption kopieren: ${postLabel}`);
        copyLinkButton.setAttribute("aria-label", `Link kopieren: ${postLabel}`);
        copyLinkButton.setAttribute("title", `Link kopieren: ${postLabel}`);
        openImageLink.setAttribute("aria-label", `Bild oeffnen: ${postLabel} (${openInNewWindowHint})`);
        openImageLink.setAttribute("title", `Bild oeffnen: ${postLabel} (${openInNewWindowHint})`);
        openShareLink.setAttribute("aria-label", `Share-Seite oeffnen: ${postLabel} (${openInNewWindowHint})`);
        openShareLink.setAttribute("title", `Share-Seite oeffnen: ${postLabel} (${openInNewWindowHint})`);
        exportFeedButton.setAttribute("aria-label", `Feed PNG exportieren: ${postLabel}`);
        exportFeedButton.setAttribute("title", `Feed PNG exportieren: ${postLabel}`);
        exportStoryButton.setAttribute("aria-label", `Story PNG exportieren: ${postLabel}`);
        exportStoryButton.setAttribute("title", `Story PNG exportieren: ${postLabel}`);

        let selectedFormat = "feed";

        function syncSelectedFormat(format) {
            selectedFormat = format === "story" ? "story" : "feed";
            const selectedPresentation = getExportFormatPresentation(selectedFormat, post.language);

            if (formatValue) {
                formatValue.textContent = selectedPresentation.summaryLabel;
            }

            if (formatNote) {
                formatNote.textContent = selectedPresentation.summaryNote;
            }

            if (exportFeedButton) {
                exportFeedButton.classList.toggle("export-button--primary", selectedFormat === "feed");
                exportFeedButton.classList.toggle("export-button--secondary", selectedFormat !== "feed");
            }

            if (exportStoryButton) {
                exportStoryButton.classList.toggle("export-button--primary", selectedFormat === "story");
                exportStoryButton.classList.toggle("export-button--secondary", selectedFormat !== "story");
            }

            [feedPreviewOption, storyPreviewOption].forEach((option) => {
                if (!option) {
                    return;
                }

                const optionFormat = option.dataset.exportFormat === "story" ? "story" : "feed";
                const optionPresentation = getExportFormatPresentation(optionFormat, post.language);
                const isActive = optionFormat === selectedFormat;
                const stateLabel = option.querySelector(".preview-option__state");

                option.setAttribute("aria-pressed", String(isActive));
                option.setAttribute(
                    "aria-label",
                    `${optionPresentation.optionLabel} ${isActive ? "aktiv" : "aktivieren"}: ${post.title}`
                );

                if (stateLabel) {
                    stateLabel.textContent = isActive ? "Aktiv fuer Export" : "Zum Aktivieren";
                }
            });
        }

        function activateSelectedFormat(format) {
            const nextFormat = format === "story" ? "story" : "feed";

            if (selectedFormat === nextFormat) {
                return;
            }

            syncSelectedFormat(nextFormat);
            announceTransientExportStatus(`${getExportFormatPresentation(nextFormat, post.language).summaryLabel} aktiviert: ${postLabel}`, 1200);
        }

        function bindPreviewSelection(option, format) {
            if (!option) {
                return;
            }

            option.addEventListener("click", () => {
                activateSelectedFormat(format);
            });

            option.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") {
                    return;
                }

                event.preventDefault();
                activateSelectedFormat(format);
            });
        }

        bindPreviewSelection(feedPreviewOption, "feed");
        bindPreviewSelection(storyPreviewOption, "story");
        syncSelectedFormat(selectedFormat);

        for (const tag of post.hashtags) {
            hashtags.appendChild(createTag(tag));
        }

        exportFeedButton.addEventListener("click", () => {
            exportInstagramImage(post, exportFeedButton);
        });

        exportStoryButton.addEventListener("click", () => {
            exportInstagramStoryImage(post, exportStoryButton, storyPreview);
        });

        copyCaptionButton.addEventListener("click", () => {
            copyText(post.caption, copyCaptionButton, "Caption kopiert", `Caption kopiert: ${postLabel}`);
        });

        copyLinkButton.addEventListener("click", () => {
            copyText(post.shareUrl, copyLinkButton, "Link kopiert", `Link kopiert: ${postLabel}`);
        });

        elements.postGrid.appendChild(fragment);
    }
}

function applySearchFilter() {
    const query = normalizeText(elements.postSearch.value);
    const filtered = !query
        ? state.posts
        : state.posts.filter((post) => buildSearchIndex(post).includes(query));

    renderPosts(filtered);
    syncExportResultsStatus();
}

async function initialize() {
    try {
        document.documentElement.lang = preferredPostLanguage;
        const { posts, failedFiles, sharePages, source } = await loadPosts();
        state.posts = posts;
        state.sharePages = sharePages;
        state.failedFilesCount = failedFiles.length;
        state.source = source;
        state.language = preferredPostLanguage;
        renderPosts(posts);

        if (!posts.length) {
            setExportStatusMessage("Keine Share-Seiten konnten geladen werden. Die Export-Seite funktioniert nur ueber einen Webserver und nicht ueber file://.");
            return;
        }

        const initialSearchQuery = getInitialSearchQuery();
        if (initialSearchQuery) {
            elements.postSearch.value = initialSearchQuery;
            applySearchFilter();
            scrollToFirstVisiblePost();
            return;
        }

        syncExportResultsStatus();
    } catch (error) {
        setExportStatusMessage("Die Share-Seiten konnten nicht geladen werden. Die Export-Seite funktioniert nur ueber einen Webserver und nicht ueber file://.");
        console.error(error);
    }
}

elements.postSearch.addEventListener("input", applySearchFilter);
elements.copyAllJson.addEventListener("click", () => {
    const exportPayload = state.posts.map((post) => ({
        title: post.title,
        meta: post.meta,
        image: post.image,
        shareUrl: post.shareUrl,
        text: post.text,
        hashtags: post.hashtags,
        caption: post.caption
    }));

    copyText(JSON.stringify(exportPayload, null, 2), elements.copyAllJson, "JSON kopiert", "Alle Daten als JSON kopiert");
});

initialize();
