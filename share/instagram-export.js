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

const INSTAGRAM_EXPORT = {
    width: 1080,
    height: 1350,
    imageHeight: 760,
    bodyTop: 760,
    bodyHeight: 590,
    padding: 88,
    logoSize: 78,
    maxTitleLines: 3,
    maxTextLines: 4
};

const INSTAGRAM_STORY_EXPORT = {
    width: 1080,
    height: 1920,
    imageHeight: 980,
    bodyTop: 900,
    bodyHeight: 930,
    padding: 76,
    logoSize: 84,
    maxTitleLines: 4,
    maxTextLines: 6
};

const BRAND_LOGO_URL = "https://www.cmi-ochsenfurt.de/files/logo_cmi1%20-%20schwarz.svg";

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

function buildExportFileName(post, suffix) {
    return post.fileName.replace(/\.html$/i, `${suffix}.png`);
}

function shortenText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength - 1).trimEnd()}…`;
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

function drawTextBlock(ctx, options) {
    const { text, x, y, maxWidth, lineHeight, maxLines, color, font } = options;
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = font;
    const lines = fitTextIntoLines(ctx, text, maxWidth, maxLines);
    lines.forEach((line, index) => {
        ctx.fillText(line, x, y + index * lineHeight);
    });
    ctx.restore();
    return lines.length;
}

async function exportInstagramImage(post, trigger) {
    const originalLabel = trigger.textContent;
    trigger.textContent = "Export laeuft...";
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

        ctx.fillStyle = "#f4fbfa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        backgroundGradient.addColorStop(0, "#ffffff");
        backgroundGradient.addColorStop(1, "#eaf5f3");
        ctx.fillStyle = backgroundGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawCoverImage(ctx, heroImage.value, 0, 0, canvas.width, INSTAGRAM_EXPORT.imageHeight);

        ctx.fillStyle = "rgba(8, 30, 27, 0.15)";
        ctx.fillRect(0, INSTAGRAM_EXPORT.imageHeight - 140, canvas.width, 140);

        drawRoundedRect(ctx, 0, INSTAGRAM_EXPORT.bodyTop - 16, canvas.width, INSTAGRAM_EXPORT.bodyHeight + 16, 38);
        ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
        ctx.fill();

        ctx.fillStyle = "#159b8c";
        ctx.fillRect(INSTAGRAM_EXPORT.padding, INSTAGRAM_EXPORT.bodyTop + 62, 12, 180);

        if (logoImage.status === "fulfilled") {
            ctx.drawImage(logoImage.value, INSTAGRAM_EXPORT.padding, INSTAGRAM_EXPORT.bodyTop + 300, INSTAGRAM_EXPORT.logoSize, INSTAGRAM_EXPORT.logoSize);
        }

        ctx.fillStyle = "#11786d";
        ctx.font = "700 28px 'Segoe UI', sans-serif";
        ctx.fillText(post.meta, INSTAGRAM_EXPORT.padding + 34, INSTAGRAM_EXPORT.bodyTop + 88);

        drawTextBlock(ctx, {
            text: shortenText(post.title, 90),
            x: INSTAGRAM_EXPORT.padding + 34,
            y: INSTAGRAM_EXPORT.bodyTop + 160,
            maxWidth: canvas.width - INSTAGRAM_EXPORT.padding * 2 - 34,
            lineHeight: 72,
            maxLines: INSTAGRAM_EXPORT.maxTitleLines,
            color: "#17312d",
            font: "700 62px 'Segoe UI', sans-serif"
        });

        drawTextBlock(ctx, {
            text: shortenText(post.text, 170),
            x: INSTAGRAM_EXPORT.padding,
            y: INSTAGRAM_EXPORT.bodyTop + 430,
            maxWidth: canvas.width - INSTAGRAM_EXPORT.padding * 2,
            lineHeight: 44,
            maxLines: INSTAGRAM_EXPORT.maxTextLines,
            color: "#546d69",
            font: "400 34px 'Segoe UI', sans-serif"
        });

        ctx.fillStyle = "#11786d";
        ctx.font = "700 24px 'Segoe UI', sans-serif";
        ctx.fillText("www.cmi-ochsenfurt.de", INSTAGRAM_EXPORT.padding + INSTAGRAM_EXPORT.logoSize + 18, INSTAGRAM_EXPORT.bodyTop + 348);

        ctx.font = "600 22px 'Segoe UI', sans-serif";
        ctx.fillStyle = "#6a807c";
        ctx.fillText(post.hashtags.slice(0, 3).join("   "), INSTAGRAM_EXPORT.padding, canvas.height - 64);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = buildExportFileName(post, "-instagram-4x5");
        link.click();

        trigger.textContent = "PNG exportiert";
    } catch (error) {
        console.error(error);
        window.alert("Der PNG-Export hat nicht funktioniert. Auf der live Website klappt das zuverlaessiger; lokal kannst du die Vorschau alternativ als Screenshot verwenden.");
        trigger.textContent = originalLabel;
    } finally {
        window.setTimeout(() => {
            trigger.textContent = originalLabel;
            trigger.disabled = false;
        }, 1600);
    }
}

async function exportInstagramStoryImage(post, trigger) {
    const originalLabel = trigger.textContent;
    trigger.textContent = "Story laeuft...";
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

        const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        backgroundGradient.addColorStop(0, "#f8fdfc");
        backgroundGradient.addColorStop(1, "#deefeb");
        ctx.fillStyle = backgroundGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawCoverImage(ctx, heroImage.value, 0, 0, canvas.width, INSTAGRAM_STORY_EXPORT.imageHeight);

        const shadeGradient = ctx.createLinearGradient(0, INSTAGRAM_STORY_EXPORT.imageHeight - 240, 0, INSTAGRAM_STORY_EXPORT.imageHeight + 80);
        shadeGradient.addColorStop(0, "rgba(8, 30, 27, 0)");
        shadeGradient.addColorStop(1, "rgba(8, 30, 27, 0.28)");
        ctx.fillStyle = shadeGradient;
        ctx.fillRect(0, INSTAGRAM_STORY_EXPORT.imageHeight - 240, canvas.width, 320);

        drawRoundedRect(ctx, 26, INSTAGRAM_STORY_EXPORT.bodyTop, canvas.width - 52, INSTAGRAM_STORY_EXPORT.bodyHeight, 44);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fill();

        ctx.fillStyle = "#159b8c";
        ctx.fillRect(INSTAGRAM_STORY_EXPORT.padding, INSTAGRAM_STORY_EXPORT.bodyTop + 74, 14, 220);

        if (logoImage.status === "fulfilled") {
            ctx.drawImage(logoImage.value, INSTAGRAM_STORY_EXPORT.padding, canvas.height - 230, INSTAGRAM_STORY_EXPORT.logoSize, INSTAGRAM_STORY_EXPORT.logoSize);
        }

        ctx.fillStyle = "#11786d";
        ctx.font = "700 30px 'Segoe UI', sans-serif";
        ctx.fillText(post.meta, INSTAGRAM_STORY_EXPORT.padding + 40, INSTAGRAM_STORY_EXPORT.bodyTop + 100);

        drawTextBlock(ctx, {
            text: shortenText(post.title, 110),
            x: INSTAGRAM_STORY_EXPORT.padding + 40,
            y: INSTAGRAM_STORY_EXPORT.bodyTop + 190,
            maxWidth: canvas.width - INSTAGRAM_STORY_EXPORT.padding * 2 - 40,
            lineHeight: 74,
            maxLines: INSTAGRAM_STORY_EXPORT.maxTitleLines,
            color: "#17312d",
            font: "700 64px 'Segoe UI', sans-serif"
        });

        drawTextBlock(ctx, {
            text: shortenText(post.text, 230),
            x: INSTAGRAM_STORY_EXPORT.padding,
            y: INSTAGRAM_STORY_EXPORT.bodyTop + 560,
            maxWidth: canvas.width - INSTAGRAM_STORY_EXPORT.padding * 2,
            lineHeight: 46,
            maxLines: INSTAGRAM_STORY_EXPORT.maxTextLines,
            color: "#546d69",
            font: "400 34px 'Segoe UI', sans-serif"
        });

        drawRoundedRect(ctx, INSTAGRAM_STORY_EXPORT.padding, canvas.height - 360, 370, 88, 44);
        ctx.fillStyle = "rgba(21, 155, 140, 0.12)";
        ctx.fill();
        ctx.fillStyle = "#11786d";
        ctx.font = "700 30px 'Segoe UI', sans-serif";
        ctx.fillText("Mehr auf unserer Website", INSTAGRAM_STORY_EXPORT.padding + 34, canvas.height - 304);

        ctx.fillStyle = "#11786d";
        ctx.font = "700 24px 'Segoe UI', sans-serif";
        ctx.fillText("www.cmi-ochsenfurt.de", INSTAGRAM_STORY_EXPORT.padding + INSTAGRAM_STORY_EXPORT.logoSize + 18, canvas.height - 176);

        ctx.font = "600 22px 'Segoe UI', sans-serif";
        ctx.fillStyle = "#6a807c";
        ctx.fillText(post.hashtags.slice(0, 2).join("   "), INSTAGRAM_STORY_EXPORT.padding, canvas.height - 92);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = buildExportFileName(post, "-instagram-story-9x16");
        link.click();

        trigger.textContent = "Story exportiert";
    } catch (error) {
        console.error(error);
        window.alert("Der Story-Export hat nicht funktioniert. Auf der live Website klappt das zuverlaessiger; lokal kannst du die Vorschau alternativ als Screenshot verwenden.");
        trigger.textContent = originalLabel;
    } finally {
        window.setTimeout(() => {
            trigger.textContent = originalLabel;
            trigger.disabled = false;
        }, 1600);
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
        const previewImage = fragment.querySelector(".insta-preview__image");
        const previewMeta = fragment.querySelector(".insta-preview__meta");
        const previewTitle = fragment.querySelector(".insta-preview__title");
        const previewText = fragment.querySelector(".insta-preview__text");
        const storyPreviewImage = fragment.querySelector(".story-preview__image");
        const storyPreviewMeta = fragment.querySelector(".story-preview__meta");
        const storyPreviewTitle = fragment.querySelector(".story-preview__title");
        const storyPreviewText = fragment.querySelector(".story-preview__text");
        const exportImageButton = fragment.querySelector(".post-card__export-image");
        const exportStoryButton = fragment.querySelector(".post-card__export-story");
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
        previewImage.src = post.image;
        previewImage.alt = post.title;
        previewMeta.textContent = post.meta;
        previewTitle.textContent = post.title;
        previewText.textContent = post.text;
        storyPreviewImage.src = post.image;
        storyPreviewImage.alt = post.title;
        storyPreviewMeta.textContent = post.meta;
        storyPreviewTitle.textContent = post.title;
        storyPreviewText.textContent = post.text;
        openImageLink.href = post.image;
        openShareLink.href = post.shareUrl;

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