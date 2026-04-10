const SHARE_MANIFEST_URL = "share-pages.json";

const FALLBACK_SHARE_PAGES = [
    "internationales-galakonzert-ochsenfurt-2026.html",
    "internationales-galakonzert-giebelstadt-2026.html",
    "benefiz-trommelworkshop-2026.html",
    "masterclass-florian-meierott.html",
    "christmette-2025.html",
    "nikolausfeier-2025.html",
    "weihnachtskonzert-zum-mitsingen-2025.html",
    "weihnachtsklaenge-an-der-furt-2025.html",
    "vdk-weihnachtsfeier-2025.html",
    "johann-strauss-meintz-2025.html",
    "johann-strauss-marktbreit-2025.html",
    "wir-musizieren-gemeinsam-2025.html",
    "querbeet-roundup-2025.html",
    "concello-kurswoche-2025.html",
    "symphonic-mob-kissinger-sommer-2025.html",
    "ausflug-nuernberg-2025.html",
    "musik-an-der-furt-2025.html",
    "internationales-benefizkonzert-2025.html",
    "80-jahre-frieden-2025.html",
    "neujahrskonzert-2025.html",
    "kauzensitzung-2025.html",
    "christmette-2024.html",
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
        captionFootnote: "Mehr dazu auf unserer Website. Den passenden Link legen wir in Bio, Story oder Link-Sammlung."
    },
    en: {
        storyCta: "More on our website",
        captionFootnote: "Find more on our website. We place the matching link in the bio, story or link collection."
    },
    fr: {
        storyCta: "Plus sur notre site",
        captionFootnote: "Plus d'informations sur notre site. Nous plaçons le lien approprie dans la bio, la story ou une collection de liens."
    },
    ln: {
        storyCta: "Makambo mingi na site",
        captionFootnote: "Makambo mosusu ezali na site na biso. Tokotia lien oyo ebongi na bio, na story to na esika ya ba liens."
    },
    it: {
        storyCta: "Di piu sul nostro sito",
        captionFootnote: "Trovi di piu sul nostro sito. Inseriamo il link adatto nella bio, nella story o nella raccolta link."
    },
    tr: {
        storyCta: "Sitemizde daha fazlasi",
        captionFootnote: "Daha fazlasi web sitemizde. Uygun baglantiyi biyografi, hikaye veya link koleksiyonunda paylasiyoruz."
    },
    uk: {
        storyCta: "Більше на нашому сайті",
        captionFootnote: "Більше на нашому сайті. Відповідне посилання ми розміщуємо в біо, сторіз або збірці посилань."
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
    maxTextLines: 5
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
    const location = getLocalizedText(sourceRoot, ".event-location", language);
    const description = getLocalizedText(sourceRoot, ".event-description", language);
    const program = getLocalizedText(sourceRoot, ".event-program", language);
    const note = getLocalizedText(sourceRoot, ".event-note", language);
    const meta = collapseWhitespace([date, location].filter(Boolean).join(" · ")) || fallbackPost.meta;
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

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Bild konnte nicht geladen werden: ${url}`));
        image.src = url;
    });
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
        const [heroImage, logoImage] = await Promise.allSettled([
            loadImage(post.image),
            loadImage(BRAND_LOGO_URL)
        ]);

        if (heroImage.status !== "fulfilled") {
            throw heroImage.reason;
        }

        const canvas = document.createElement("canvas");
        canvas.width = INSTAGRAM_EXPORT.width;
        canvas.height = INSTAGRAM_EXPORT.height;
        const ctx = canvas.getContext("2d");
        const logoGraphic = logoImage.status === "fulfilled" ? logoImage.value : null;
        const contentX = INSTAGRAM_EXPORT.padding;
        const contentWidth = canvas.width - INSTAGRAM_EXPORT.padding * 2;

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
            height: INSTAGRAM_EXPORT.imageHeight,
            framePadding: 42,
            frameInset: 18,
            frameRadius: 40,
            backdropOpacity: 0.18,
            backdropTint: "rgba(8, 30, 27, 0.08)",
            frameFill: "rgba(255, 255, 255, 0.3)"
        });

        const imageFade = ctx.createLinearGradient(0, INSTAGRAM_EXPORT.imageHeight - 170, 0, INSTAGRAM_EXPORT.imageHeight + 32);
        imageFade.addColorStop(0, "rgba(8, 30, 27, 0)");
        imageFade.addColorStop(1, "rgba(8, 30, 27, 0.16)");
        ctx.fillStyle = imageFade;
        ctx.fillRect(0, INSTAGRAM_EXPORT.imageHeight - 170, canvas.width, 202);

        drawRoundedPanel(ctx, {
            x: 24,
            y: INSTAGRAM_EXPORT.bodyTop - 24,
            width: canvas.width - 48,
            height: INSTAGRAM_EXPORT.bodyHeight,
            radius: 44,
            fillStyle: "rgba(255, 255, 255, 0.97)",
            strokeStyle: "rgba(17, 120, 109, 0.08)",
            lineWidth: 2,
            shadowColor: "rgba(14, 53, 48, 0.12)",
            shadowBlur: 34,
            shadowOffsetY: 10
        });

        const metaPillY = INSTAGRAM_EXPORT.bodyTop + 24;
        drawPillLabel(ctx, {
            text: post.meta,
            x: contentX,
            y: metaPillY,
            height: 52,
            paddingX: 22,
            fillStyle: "rgba(21, 155, 140, 0.12)",
            textColor: "#11786d",
            font: "700 24px 'Segoe UI', sans-serif",
            strokeStyle: "rgba(21, 155, 140, 0.14)",
            lineWidth: 1.5
        });

        const titleFont = "700 58px 'Segoe UI', sans-serif";
        const titleLineHeight = 64;
        const titleY = metaPillY + 96;
        const titleLines = getTextLines(ctx, shortenText(post.title, 96), contentWidth, INSTAGRAM_EXPORT.maxTitleLines, titleFont);
        const titleBottom = drawTextLines(ctx, {
            lines: titleLines,
            x: contentX,
            y: titleY,
            lineHeight: titleLineHeight,
            color: "#17312d",
            font: titleFont
        });

        const footerTop = canvas.height - 172;
        const summaryBoxY = titleBottom + 40;
        const summaryBoxHeight = Math.max(132, footerTop - summaryBoxY);
        drawRoundedPanel(ctx, {
            x: contentX,
            y: summaryBoxY,
            width: contentWidth,
            height: summaryBoxHeight,
            radius: 30,
            fillStyle: "rgba(240, 248, 246, 0.96)",
            strokeStyle: "rgba(21, 155, 140, 0.1)",
            lineWidth: 1.5
        });

        const summaryFont = "400 32px 'Segoe UI', sans-serif";
        const summaryLineHeight = 42;
        const summaryMaxLines = Math.max(
            2,
            Math.min(INSTAGRAM_EXPORT.maxTextLines, Math.floor((summaryBoxHeight - 48) / summaryLineHeight))
        );
        const summaryLines = getTextLines(ctx, shortenText(post.text, 210), contentWidth - 48, summaryMaxLines, summaryFont);
        drawTextLines(ctx, {
            lines: summaryLines,
            x: contentX + 24,
            y: summaryBoxY + 40,
            lineHeight: summaryLineHeight,
            color: "#546d69",
            font: summaryFont
        });

        drawWebsiteRow(ctx, {
            x: contentX,
            y: canvas.height - 160,
            logoImage: logoGraphic,
            logoSize: INSTAGRAM_EXPORT.logoSize,
            url: "www.cmi-ochsenfurt.de",
            color: "#11786d",
            font: "700 24px 'Segoe UI', sans-serif"
        });

        ctx.font = "600 20px 'Segoe UI', sans-serif";
        ctx.fillStyle = "#6a807c";
        ctx.fillText(post.hashtags.slice(0, 2).join("   "), contentX, canvas.height - 76);

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

async function exportInstagramStoryImage(post, trigger) {
    const originalState = captureControlLabelState(trigger);
    const postLabel = post.title || post.fileName || "Share-Beitrag";

    setControlFeedbackState(trigger, "Story laeuft...", `Story-Export laeuft: ${postLabel}`);
    trigger.disabled = true;

    try {
        const [heroImage, logoImage] = await Promise.allSettled([
            loadImage(post.image),
            loadImage(BRAND_LOGO_URL)
        ]);

        if (heroImage.status !== "fulfilled") {
            throw heroImage.reason;
        }

        const canvas = document.createElement("canvas");
        canvas.width = INSTAGRAM_STORY_EXPORT.width;
        canvas.height = INSTAGRAM_STORY_EXPORT.height;
        const ctx = canvas.getContext("2d");
        const logoGraphic = logoImage.status === "fulfilled" ? logoImage.value : null;
        const contentX = INSTAGRAM_STORY_EXPORT.padding;
        const contentWidth = canvas.width - INSTAGRAM_STORY_EXPORT.padding * 2;

        const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        backgroundGradient.addColorStop(0, "#f9fdfc");
        backgroundGradient.addColorStop(1, "#dfefeb");
        ctx.fillStyle = backgroundGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const topAura = ctx.createRadialGradient(canvas.width - 180, 120, 46, canvas.width - 180, 120, 460);
        topAura.addColorStop(0, "rgba(21, 155, 140, 0.16)");
        topAura.addColorStop(1, "rgba(21, 155, 140, 0)");
        ctx.fillStyle = topAura;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawImageStage(ctx, heroImage.value, {
            x: 0,
            y: 0,
            width: canvas.width,
            height: INSTAGRAM_STORY_EXPORT.imageHeight,
            framePadding: 46,
            frameInset: 22,
            frameRadius: 44,
            backdropOpacity: 0.2,
            backdropTint: "rgba(8, 30, 27, 0.08)",
            frameFill: "rgba(255, 255, 255, 0.28)"
        });

        const shadeGradient = ctx.createLinearGradient(0, INSTAGRAM_STORY_EXPORT.imageHeight - 220, 0, INSTAGRAM_STORY_EXPORT.imageHeight + 96);
        shadeGradient.addColorStop(0, "rgba(8, 30, 27, 0)");
        shadeGradient.addColorStop(1, "rgba(8, 30, 27, 0.28)");
        ctx.fillStyle = shadeGradient;
        ctx.fillRect(0, INSTAGRAM_STORY_EXPORT.imageHeight - 220, canvas.width, 336);

        drawRoundedPanel(ctx, {
            x: 22,
            y: INSTAGRAM_STORY_EXPORT.bodyTop - 20,
            width: canvas.width - 44,
            height: INSTAGRAM_STORY_EXPORT.bodyHeight,
            radius: 48,
            fillStyle: "rgba(255, 255, 255, 0.95)",
            strokeStyle: "rgba(17, 120, 109, 0.08)",
            lineWidth: 2,
            shadowColor: "rgba(14, 53, 48, 0.15)",
            shadowBlur: 40,
            shadowOffsetY: 14
        });

        const metaPillY = INSTAGRAM_STORY_EXPORT.bodyTop + 26;
        drawPillLabel(ctx, {
            text: post.meta,
            x: contentX,
            y: metaPillY,
            height: 54,
            paddingX: 22,
            fillStyle: "rgba(21, 155, 140, 0.12)",
            textColor: "#11786d",
            font: "700 24px 'Segoe UI', sans-serif",
            strokeStyle: "rgba(21, 155, 140, 0.14)",
            lineWidth: 1.5
        });

        const titleFont = "700 62px 'Segoe UI', sans-serif";
        const titleLineHeight = 70;
        const titleY = metaPillY + 106;
        const titleLines = getTextLines(ctx, shortenText(post.title, 112), contentWidth, INSTAGRAM_STORY_EXPORT.maxTitleLines, titleFont);
        const titleBottom = drawTextLines(ctx, {
            lines: titleLines,
            x: contentX,
            y: titleY,
            lineHeight: titleLineHeight,
            color: "#17312d",
            font: titleFont
        });

        const ctaY = canvas.height - 314;
        const summaryBoxY = titleBottom + 46;
        const summaryBoxHeight = Math.max(210, ctaY - summaryBoxY - 28);
        drawRoundedPanel(ctx, {
            x: contentX,
            y: summaryBoxY,
            width: contentWidth,
            height: summaryBoxHeight,
            radius: 34,
            fillStyle: "rgba(240, 248, 246, 0.95)",
            strokeStyle: "rgba(21, 155, 140, 0.1)",
            lineWidth: 1.5
        });

        const summaryFont = "400 34px 'Segoe UI', sans-serif";
        const summaryLineHeight = 46;
        const summaryMaxLines = Math.max(
            3,
            Math.min(INSTAGRAM_STORY_EXPORT.maxTextLines, Math.floor((summaryBoxHeight - 56) / summaryLineHeight))
        );
        const summaryLines = getTextLines(ctx, shortenText(post.text, 240), contentWidth - 52, summaryMaxLines, summaryFont);
        drawTextLines(ctx, {
            lines: summaryLines,
            x: contentX + 26,
            y: summaryBoxY + 44,
            lineHeight: summaryLineHeight,
            color: "#546d69",
            font: summaryFont
        });

        drawPillLabel(ctx, {
            text: getPostCopy(post.language).storyCta,
            x: contentX,
            y: ctaY,
            height: 84,
            paddingX: 32,
            fillStyle: "rgba(21, 155, 140, 0.14)",
            textColor: "#11786d",
            font: "700 30px 'Segoe UI', sans-serif",
            strokeStyle: "rgba(21, 155, 140, 0.16)",
            lineWidth: 1.5,
            shadowColor: "rgba(17, 120, 109, 0.08)",
            shadowBlur: 18,
            shadowOffsetY: 6
        });

        drawWebsiteRow(ctx, {
            x: contentX,
            y: canvas.height - 206,
            logoImage: logoGraphic,
            logoSize: INSTAGRAM_STORY_EXPORT.logoSize,
            url: "www.cmi-ochsenfurt.de",
            color: "#11786d",
            font: "700 24px 'Segoe UI', sans-serif"
        });

        ctx.font = "600 20px 'Segoe UI', sans-serif";
        ctx.fillStyle = "#6a807c";
        ctx.fillText(post.hashtags.slice(0, 2).join("   "), contentX, canvas.height - 102);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = buildExportFileName(post, "-instagram-story-9x16");
        link.click();

        setControlFeedbackState(trigger, "Story exportiert", `Story exportiert: ${postLabel}`);
        announceTransientExportStatus(`Story exportiert: ${postLabel}`);
    } catch (error) {
        console.error(error);
        announceTransientExportStatus(`Story-Export fehlgeschlagen: ${postLabel}`, 2200);
        window.alert("Der Story-Export hat nicht funktioniert. Bitte die Export-Seite ueber die live Website oder lokal ueber einen Webserver oeffnen; direkt ueber file:// klappt der Canvas-Export nicht.");
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
        const feedPreview = fragment.querySelector(".insta-preview");
        const previewImage = fragment.querySelector(".insta-preview__image");
        const previewMeta = fragment.querySelector(".insta-preview__meta");
        const previewTitle = fragment.querySelector(".insta-preview__title");
        const previewText = fragment.querySelector(".insta-preview__text");
        const storyPreview = fragment.querySelector(".story-preview");
        const storyPreviewImage = fragment.querySelector(".story-preview__image");
        const storyPreviewMeta = fragment.querySelector(".story-preview__meta");
        const storyPreviewTitle = fragment.querySelector(".story-preview__title");
        const storyPreviewText = fragment.querySelector(".story-preview__text");
        const storyPreviewCta = fragment.querySelector(".story-preview__cta");
        const exportImageButton = fragment.querySelector(".post-card__export-image");
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

        if (feedPreview) {
            feedPreview.setAttribute("aria-label", `Instagram 4 zu 5 Vorschau: ${post.title}`);
        }

        if (storyPreview) {
            storyPreview.setAttribute("aria-label", `Instagram Story 9 zu 16 Vorschau: ${post.title}`);
        }

        openImageLink.href = post.image;
        openShareLink.href = post.shareUrl;
        exportImageButton.setAttribute("aria-label", `PNG exportieren: ${postLabel}`);
        exportImageButton.setAttribute("title", `PNG exportieren: ${postLabel}`);
        exportStoryButton.setAttribute("aria-label", `Story PNG exportieren: ${postLabel}`);
        exportStoryButton.setAttribute("title", `Story PNG exportieren: ${postLabel}`);
        copyCaptionButton.setAttribute("aria-label", `Caption kopieren: ${postLabel}`);
        copyCaptionButton.setAttribute("title", `Caption kopieren: ${postLabel}`);
        copyLinkButton.setAttribute("aria-label", `Link kopieren: ${postLabel}`);
        copyLinkButton.setAttribute("title", `Link kopieren: ${postLabel}`);
        openImageLink.setAttribute("aria-label", `Bild oeffnen: ${postLabel} (${openInNewWindowHint})`);
        openImageLink.setAttribute("title", `Bild oeffnen: ${postLabel} (${openInNewWindowHint})`);
        openShareLink.setAttribute("aria-label", `Share-Seite oeffnen: ${postLabel} (${openInNewWindowHint})`);
        openShareLink.setAttribute("title", `Share-Seite oeffnen: ${postLabel} (${openInNewWindowHint})`);

        for (const tag of post.hashtags) {
            hashtags.appendChild(createTag(tag));
        }

        exportImageButton.addEventListener("click", () => {
            exportInstagramImage(post, exportImageButton);
        });

        exportStoryButton.addEventListener("click", () => {
            exportInstagramStoryImage(post, exportStoryButton);
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
