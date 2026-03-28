const SHARE_PAGES = [
    "internationales-galakonzert-ochsenfurt-2026.html",
    "internationales-galakonzert-giebelstadt-2026.html",
    "masterclass-florian-meierott.html",
    "christmette-2025.html",
    "nikolausfeier-2025.html",
    "weihnachtskonzert-zum-mitsingen-2025.html",
    "weihnachtsklaenge-an-der-furt-2025.html",
    "vdk-weihnachtsfeier-2025.html",
    "johann-strauss-meintz-2025.html",
    "johann-strauss-marktbreit-2025.html",
    "wir-musizieren-gemeinsam-2025.html",
    "concello-kurswoche-2025.html",
    "symphonic-mob-kissinger-sommer-2025.html",
    "ausflug-nuernberg-2025.html",
    "musik-an-der-furt-2025.html",
    "internationales-benefizkonzert-2025.html",
    "80-jahre-frieden-2025.html",
    "neujahrskonzert-2025.html",
    "kauzensitzung-2025.html",
    "christmette-2024.html"
];

const DEFAULT_HASHTAGS = [
    "#CMIOchsenfurt",
    "#CollegiumMusicum",
    "#Ochsenfurt",
    "#MusikVerbindet",
    "#KlassischeMusik"
];

const KEYWORD_TAGS = [
    { pattern: /galakonzert/i, tags: ["#Galakonzert", "#LiveMusik"] },
    { pattern: /masterclass/i, tags: ["#Masterclass", "#Streicher"] },
    { pattern: /benefiz/i, tags: ["#Benefizkonzert", "#MusikFuerDenGutenZweck"] },
    { pattern: /weihnacht|christmette|nikolaus/i, tags: ["#Weihnachtsmusik", "#Adventszeit"] },
    { pattern: /neujahr/i, tags: ["#Neujahrskonzert", "#Jahresauftakt"] },
    { pattern: /frieden/i, tags: ["#Frieden", "#Erinnerungskultur"] },
    { pattern: /symphonic|kurswoche|wir musizieren/i, tags: ["#Orchester", "#GemeinsamMusizieren"] }
];

const state = {
    posts: []
};

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

function uniqueTags(tags) {
    return [...new Set(tags.filter(Boolean))].slice(0, 8);
}

function buildHashtags(title, text) {
    const derived = KEYWORD_TAGS
        .filter((entry) => entry.pattern.test(title) || entry.pattern.test(text))
        .flatMap((entry) => entry.tags);

    return uniqueTags([...DEFAULT_HASHTAGS, ...derived]);
}

function buildCaption(post) {
    return [
        post.title,
        "",
        post.text,
        "",
        "Mehr dazu auf unserer Website. Den passenden Link legen wir in Bio, Story oder Link-Sammlung.",
        "",
        post.hashtags.join(" ")
    ].join("\n");
}

async function copyText(value, trigger, successLabel) {
    try {
        await navigator.clipboard.writeText(value);
        const original = trigger.textContent;
        trigger.textContent = successLabel;
        window.setTimeout(() => {
            trigger.textContent = original;
        }, 1500);
    } catch (error) {
        window.alert("Kopieren hat im Browser nicht funktioniert. Bitte den Text manuell kopieren.");
    }
}

async function loadPost(fileName) {
    const response = await fetch(fileName, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`Share-Seite konnte nicht geladen werden: ${fileName}`);
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const title = getMetaContent(doc, 'meta[property="og:title"]') || doc.title.trim();
    const description = getMetaContent(doc, 'meta[name="description"]') || getMetaContent(doc, 'meta[property="og:description"]');
    const image = getMetaContent(doc, 'meta[property="og:image"]') || doc.querySelector(".share-card__hero")?.getAttribute("src") || "";
    const shareUrl = getMetaContent(doc, 'meta[property="og:url"]') || new URL(fileName, window.location.href).href;
    const meta = doc.querySelector(".share-card__meta")?.textContent?.trim() || "Share-Beitrag";
    const text = doc.querySelector(".share-card__text")?.textContent?.trim() || description;
    const hashtags = buildHashtags(title, `${description} ${text}`);

    return {
        fileName,
        title,
        description,
        image,
        shareUrl,
        meta,
        text,
        hashtags,
        caption: buildCaption({ title, text, hashtags })
    };
}

function createTag(label) {
    const tag = document.createElement("span");
    tag.textContent = label;
    return tag;
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

    for (const post of posts) {
        const fragment = elements.template.content.cloneNode(true);
        const card = fragment.querySelector(".post-card");
        const image = fragment.querySelector(".post-card__image");
        const meta = fragment.querySelector(".post-card__meta");
        const title = fragment.querySelector(".post-card__title");
        const text = fragment.querySelector(".post-card__text");
        const hashtags = fragment.querySelector(".post-card__hashtags");
        const caption = fragment.querySelector(".post-card__caption");
        const copyCaptionButton = fragment.querySelector(".post-card__copy-caption");
        const copyLinkButton = fragment.querySelector(".post-card__copy-link");
        const openImageLink = fragment.querySelector(".post-card__open-image");
        const openShareLink = fragment.querySelector(".post-card__open-share");

        card.dataset.search = `${post.title} ${post.meta} ${post.text}`.toLowerCase();
        image.src = post.image;
        image.alt = post.title;
        meta.textContent = post.meta;
        title.textContent = post.title;
        text.textContent = post.text;
        caption.value = post.caption;
        openImageLink.href = post.image;
        openShareLink.href = post.shareUrl;

        for (const tag of post.hashtags) {
            hashtags.appendChild(createTag(tag));
        }

        copyCaptionButton.addEventListener("click", () => {
            copyText(post.caption, copyCaptionButton, "Caption kopiert");
        });

        copyLinkButton.addEventListener("click", () => {
            copyText(post.shareUrl, copyLinkButton, "Link kopiert");
        });

        elements.postGrid.appendChild(fragment);
    }
}

function applySearchFilter() {
    const query = elements.postSearch.value.trim().toLowerCase();
    const filtered = !query
        ? state.posts
        : state.posts.filter((post) => `${post.title} ${post.meta} ${post.text}`.toLowerCase().includes(query));

    renderPosts(filtered);
    elements.exportStatus.textContent = `${filtered.length} von ${state.posts.length} Beitraegen sichtbar`;
}

async function initialize() {
    try {
        const posts = await Promise.all(SHARE_PAGES.map(loadPost));
        state.posts = posts;
        renderPosts(posts);
        elements.exportStatus.textContent = `${posts.length} Beitraege geladen`;
    } catch (error) {
        elements.exportStatus.textContent = "Die Share-Seiten konnten nicht geladen werden. Die Export-Seite funktioniert nur ueber einen Webserver und nicht ueber file://.";
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

    copyText(JSON.stringify(exportPayload, null, 2), elements.copyAllJson, "JSON kopiert");
});

initialize();