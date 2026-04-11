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

const EXPORT_UI_TRANSLATIONS = {
    de: {
        pageTitle: "Instagram Export | Collegium Musicum Iuvenale Ochsenfurt",
        metaDescription: "Interne Arbeitsseite zum Vorbereiten von Instagram-Posts auf Basis der bestehenden Share-Seiten.",
        heroEyebrow: "Interne Social-Media-Werkbank",
        heroTitle: "Instagram-Posts und Stories aus der Website vorbereiten",
        heroText: "Die Seite liest Titel, Kurztext, Bild und Share-Link direkt aus den vorhandenen Share-Seiten. So pflegt ihr die Inhalte nicht doppelt und habt trotzdem sofort nutzbare Captions sowie exportierbare Layouts fuer Feed und Story.",
        copyAllJsonButton: "Alle Daten als JSON kopieren",
        exampleSharePageButton: "Beispiel-Share-Seite ansehen",
        guideAriaLabel: "Empfohlener Workflow",
        guideTitle: "Empfohlener Ablauf",
        guideSteps: [
            "Beitrag auswaehlen, in der Vorschau 4:5 fuer Feed oder 9:16 fuer Story aktivieren und dann als PNG exportieren.",
            "Caption kopieren und in Instagram oder Meta Business Suite einfuegen.",
            "Share-Link separat kopieren und spaeter in Bio, Story oder einen Link-Sammeldienst setzen."
        ],
        noteTitle: "Wichtig fuer Instagram",
        noteText: "Instagram macht Links in normalen Beitrags-Captions nicht klickbar. Fuer eine klickbare Story muss nach dem Upload in Instagram ein Link-Sticker auf www.cmi-ochsenfurt.de gesetzt werden. Der PNG-Export fuer Feed und Story funktioniert ueber die live Website oder lokal ueber einen Webserver, aber nicht direkt ueber file://.",
        toolbarAriaLabel: "Filter und Status",
        searchLabel: "Suche",
        searchPlaceholder: "Titel, Ort oder Stichwort durchsuchen",
        statusLoading: "Share-Seiten werden geladen...",
        noMatches: "Keine passenden Beitraege gefunden.",
        noPages: "Keine Share-Seiten konnten geladen werden. Die Export-Seite funktioniert nur ueber einen Webserver und nicht ueber file://.",
        loadError: "Die Share-Seiten konnten nicht geladen werden. Die Export-Seite funktioniert nur ueber einen Webserver und nicht ueber file://.",
        previewEyebrow: "Visuelle Vorschau",
        previewNote: "4:5 oder 9:16 direkt in der Vorschau waehlen. Die PNG-Datei entsteht erst beim Export, nicht aus dem HTML selbst.",
        previewGroupLabel: "Vorlagen fuer Feed oder Story auswaehlen",
        feedOptionLabel: "Feed-Vorlage 4:5",
        storyOptionLabel: "Story-Vorlage 9:16",
        optionStateActive: "Aktiv fuer Export",
        optionStateInactive: "Zum Aktivieren",
        workflowEyebrow: "Arbeitsbereich",
        workflowNote: "Erst Vorlage waehlen und exportieren. Caption und Link bleiben darunter separat kopierbar.",
        formatKicker: "Aktive Vorlage",
        captionLabel: "Instagram-Caption",
        captionNote: "Direkt kopierbar fuer Instagram oder die Meta Business Suite. Der Link kommt separat.",
        copyCaptionButton: "Caption kopieren",
        copyLinkButton: "Link kopieren",
        openImageButton: "Bild oeffnen",
        openShareButton: "Share-Seite",
        feedSummaryLabel: "Feed 4:5",
        storySummaryLabel: "Story 9:16",
        feedSummaryNote: "Der Feed-Export nutzt nur Motiv oder Plakat. Alle weiteren Infos stehen in der Caption.",
        exportFeedButton: "4:5 PNG exportieren",
        exportStoryButton: "9:16 PNG exportieren",
        defaultPostLabel: "Share-Beitrag",
        copyCaptionAction: "Caption kopieren",
        copyLinkAction: "Link kopieren",
        openImageAction: "Bild oeffnen",
        openShareAction: "Share-Seite oeffnen",
        openInNewWindowHint: "oeffnet in neuem Fenster",
        feedExportAction: "Feed PNG exportieren",
        storyExportAction: "Story PNG exportieren",
        activatedState: "aktiviert",
        feedExportRunning: "Export laeuft...",
        feedExported: "PNG exportiert",
        feedExportFailed: "Export fehlgeschlagen",
        pngExportStatus: "PNG-Export laeuft",
        pngExportFailedStatus: "PNG-Export fehlgeschlagen",
        pngExportAlert: "Der PNG-Export hat nicht funktioniert. Bitte die Export-Seite ueber die live Website oder lokal ueber einen Webserver oeffnen; direkt ueber file:// klappt der Canvas-Export nicht.",
        storyExportRunning: "Story laeuft...",
        storyExported: "Story exportiert",
        storyFallbackExported: "Motiv exportiert",
        storyExportFailed: "Story fehlgeschlagen",
        storyExportStatus: "Story-Export laeuft",
        storyExportFailedStatus: "Story-Export fehlgeschlagen",
        previewFallbackStatus: "Preview-Export nicht moeglich, Motiv exportiert",
        storyPreviewFallbackAlert: "Die Story-Preview konnte in diesem Browser nicht direkt exportiert werden. Es wurde stattdessen nur das Motiv exportiert.",
        storyExportAlert: "Der Story-Export hat nicht funktioniert. Bitte die Export-Seite ueber die live Website oder lokal ueber einen Webserver oeffnen; direkt ueber file:// klappt der Export nicht.",
        captionCopied: "Caption kopiert",
        linkCopied: "Link kopiert",
        jsonCopied: "JSON kopiert",
        copyAllJsonSuccess: "Alle Daten als JSON kopiert",
        copyFailedStatus: "Kopieren fehlgeschlagen. Bitte Text manuell kopieren.",
        copyFailedAlert: "Kopieren hat im Browser nicht funktioniert. Bitte den Text manuell kopieren.",
        fallbackSourceStatus: " (Fallback-Liste aktiv)",
        resultsStatus: function(visibleCount, totalCount) {
            return `${visibleCount} von ${totalCount} Beitraegen sichtbar`;
        },
        skippedFilesStatus: function(count) {
            return count === 1 ? ", 1 Datei uebersprungen" : `, ${count} Dateien uebersprungen`;
        }
    },
    en: {
        pageTitle: "Instagram Export | Collegium Musicum Iuvenale Ochsenfurt",
        metaDescription: "Internal workspace for preparing Instagram posts from the existing share pages.",
        heroEyebrow: "Internal social media workspace",
        heroTitle: "Prepare Instagram posts and stories from the website",
        heroText: "This page reads title, summary, image and share link directly from the existing share pages. That keeps the content single-sourced while still giving you ready-to-use captions and exportable feed and story layouts.",
        copyAllJsonButton: "Copy all data as JSON",
        exampleSharePageButton: "Open example share page",
        guideAriaLabel: "Recommended workflow",
        guideTitle: "Recommended workflow",
        guideSteps: [
            "Choose a post, switch the preview to 4:5 for feed or 9:16 for story, then export it as PNG.",
            "Copy the caption and paste it into Instagram or Meta Business Suite.",
            "Copy the share link separately and place it later in your bio, story or link hub."
        ],
        noteTitle: "Important for Instagram",
        noteText: "Instagram does not make links in regular post captions clickable. For a clickable story you still need to add a link sticker to www.cmi-ochsenfurt.de after upload. PNG export for feed and story works on the live site or locally through a web server, but not directly via file://.",
        toolbarAriaLabel: "Filter and status",
        searchLabel: "Search",
        searchPlaceholder: "Search title, place or keyword",
        statusLoading: "Loading share pages...",
        noMatches: "No matching posts found.",
        noPages: "No share pages could be loaded. The export page only works via a web server, not via file://.",
        loadError: "The share pages could not be loaded. The export page only works via a web server, not via file://.",
        previewEyebrow: "Visual preview",
        previewNote: "Choose 4:5 or 9:16 directly in the preview. The PNG file is only created during export, not from the HTML itself.",
        previewGroupLabel: "Choose feed or story templates",
        feedOptionLabel: "Feed template 4:5",
        storyOptionLabel: "Story template 9:16",
        optionStateActive: "Active for export",
        optionStateInactive: "Activate to use",
        workflowEyebrow: "Workspace",
        workflowNote: "Choose the template and export first. Caption and link stay separately copyable below.",
        formatKicker: "Active template",
        captionLabel: "Instagram caption",
        captionNote: "Ready to copy for Instagram or Meta Business Suite. The link stays separate.",
        copyCaptionButton: "Copy caption",
        copyLinkButton: "Copy link",
        openImageButton: "Open image",
        openShareButton: "Share page",
        feedSummaryLabel: "Feed 4:5",
        storySummaryLabel: "Story 9:16",
        feedSummaryNote: "The feed export only uses the image or poster. All other information stays in the caption.",
        exportFeedButton: "Export 4:5 PNG",
        exportStoryButton: "Export 9:16 PNG",
        defaultPostLabel: "Share post",
        copyCaptionAction: "Copy caption",
        copyLinkAction: "Copy link",
        openImageAction: "Open image",
        openShareAction: "Open share page",
        openInNewWindowHint: "opens in new window",
        feedExportAction: "Export feed PNG",
        storyExportAction: "Export story PNG",
        activatedState: "activated",
        feedExportRunning: "Export running...",
        feedExported: "PNG exported",
        feedExportFailed: "Export failed",
        pngExportStatus: "PNG export running",
        pngExportFailedStatus: "PNG export failed",
        pngExportAlert: "PNG export did not work. Please open the export page via the live website or locally through a web server; canvas export does not work directly via file://.",
        storyExportRunning: "Story running...",
        storyExported: "Story exported",
        storyFallbackExported: "Image exported",
        storyExportFailed: "Story failed",
        storyExportStatus: "Story export running",
        storyExportFailedStatus: "Story export failed",
        previewFallbackStatus: "Preview export unavailable, image exported",
        storyPreviewFallbackAlert: "The story preview could not be exported directly in this browser. The image was exported instead.",
        storyExportAlert: "Story export did not work. Please open the export page via the live website or locally through a web server; export does not work directly via file://.",
        captionCopied: "Caption copied",
        linkCopied: "Link copied",
        jsonCopied: "JSON copied",
        copyAllJsonSuccess: "All data copied as JSON",
        copyFailedStatus: "Copying failed. Please copy the text manually.",
        copyFailedAlert: "Copying did not work in the browser. Please copy the text manually.",
        fallbackSourceStatus: " (fallback list active)",
        resultsStatus: function(visibleCount, totalCount) {
            return `${visibleCount} of ${totalCount} posts visible`;
        },
        skippedFilesStatus: function(count) {
            return count === 1 ? ", 1 file skipped" : `, ${count} files skipped`;
        }
    },
    fr: {
        pageTitle: "Export Instagram | Collegium Musicum Iuvenale Ochsenfurt",
        metaDescription: "Espace interne pour preparer des publications Instagram a partir des pages de partage existantes.",
        heroEyebrow: "Atelier interne reseaux sociaux",
        heroTitle: "Preparer des publications et stories Instagram depuis le site",
        heroText: "Cette page lit directement le titre, le resume, l'image et le lien de partage depuis les pages de partage existantes. Vous gardez ainsi une seule source de contenu tout en obtenant des captions et des mises en page exportables pour le feed et la story.",
        copyAllJsonButton: "Copier toutes les donnees en JSON",
        exampleSharePageButton: "Ouvrir une page de partage exemple",
        guideAriaLabel: "Workflow recommande",
        guideTitle: "Deroulement recommande",
        guideSteps: [
            "Choisissez une publication, activez l'aperçu 4:5 pour le feed ou 9:16 pour la story, puis exportez en PNG.",
            "Copiez la legende et collez-la dans Instagram ou Meta Business Suite.",
            "Copiez le lien de partage separement et placez-le ensuite dans la bio, la story ou une page de liens."
        ],
        noteTitle: "Important pour Instagram",
        noteText: "Instagram ne rend pas les liens cliquables dans les legendes normales. Pour une story cliquable, il faut encore ajouter un sticker de lien vers www.cmi-ochsenfurt.de apres l'upload. L'export PNG pour le feed et la story fonctionne sur le site en ligne ou localement via un serveur web, mais pas directement avec file://.",
        toolbarAriaLabel: "Filtres et statut",
        searchLabel: "Recherche",
        searchPlaceholder: "Rechercher un titre, un lieu ou un mot-cle",
        statusLoading: "Chargement des pages de partage...",
        noMatches: "Aucune publication correspondante trouvee.",
        noPages: "Aucune page de partage n'a pu etre chargee. La page d'export fonctionne uniquement via un serveur web, pas via file://.",
        loadError: "Les pages de partage n'ont pas pu etre chargees. La page d'export fonctionne uniquement via un serveur web, pas via file://.",
        previewEyebrow: "Apercu visuel",
        previewNote: "Choisissez 4:5 ou 9:16 directement dans l'aperçu. Le fichier PNG n'est cree qu'au moment de l'export, pas a partir du HTML.",
        previewGroupLabel: "Choisir les modeles feed ou story",
        feedOptionLabel: "Modele feed 4:5",
        storyOptionLabel: "Modele story 9:16",
        optionStateActive: "Actif pour l'export",
        optionStateInactive: "Activer",
        workflowEyebrow: "Espace de travail",
        workflowNote: "Choisissez d'abord le modele puis lancez l'export. La legende et le lien restent copiables separement en dessous.",
        formatKicker: "Modele actif",
        captionLabel: "Legende Instagram",
        captionNote: "Pret a copier pour Instagram ou Meta Business Suite. Le lien reste separe.",
        copyCaptionButton: "Copier la legende",
        copyLinkButton: "Copier le lien",
        openImageButton: "Ouvrir l'image",
        openShareButton: "Page de partage",
        feedSummaryLabel: "Feed 4:5",
        storySummaryLabel: "Story 9:16",
        feedSummaryNote: "L'export feed utilise seulement l'image ou l'affiche. Toutes les autres informations restent dans la legende.",
        exportFeedButton: "Exporter PNG 4:5",
        exportStoryButton: "Exporter PNG 9:16",
        defaultPostLabel: "Publication partagee",
        copyCaptionAction: "Copier la legende",
        copyLinkAction: "Copier le lien",
        openImageAction: "Ouvrir l'image",
        openShareAction: "Ouvrir la page de partage",
        openInNewWindowHint: "ouvre dans une nouvelle fenetre",
        feedExportAction: "Exporter le PNG feed",
        storyExportAction: "Exporter le PNG story",
        activatedState: "active",
        feedExportRunning: "Export en cours...",
        feedExported: "PNG exporte",
        feedExportFailed: "Export echoue",
        pngExportStatus: "Export PNG en cours",
        pngExportFailedStatus: "Export PNG echoue",
        pngExportAlert: "L'export PNG n'a pas fonctionne. Ouvrez la page d'export via le site en ligne ou localement avec un serveur web; l'export canvas ne fonctionne pas directement via file://.",
        storyExportRunning: "Story en cours...",
        storyExported: "Story exportee",
        storyFallbackExported: "Image exportee",
        storyExportFailed: "Story echouee",
        storyExportStatus: "Export story en cours",
        storyExportFailedStatus: "Export story echoue",
        previewFallbackStatus: "Export de l'aperçu indisponible, image exportee",
        storyPreviewFallbackAlert: "L'aperçu story n'a pas pu etre exporte directement dans ce navigateur. L'image a ete exportee a la place.",
        storyExportAlert: "L'export story n'a pas fonctionne. Ouvrez la page d'export via le site en ligne ou localement avec un serveur web; l'export ne fonctionne pas directement via file://.",
        captionCopied: "Legende copiee",
        linkCopied: "Lien copie",
        jsonCopied: "JSON copie",
        copyAllJsonSuccess: "Toutes les donnees ont ete copiees en JSON",
        copyFailedStatus: "La copie a echoue. Merci de copier le texte manuellement.",
        copyFailedAlert: "La copie n'a pas fonctionne dans le navigateur. Merci de copier le texte manuellement.",
        fallbackSourceStatus: " (liste de secours active)",
        resultsStatus: function(visibleCount, totalCount) {
            return `${visibleCount} sur ${totalCount} publications visibles`;
        },
        skippedFilesStatus: function(count) {
            return count === 1 ? ", 1 fichier ignore" : `, ${count} fichiers ignores`;
        }
    },
    ln: {
        pageTitle: "Instagram Export | Collegium Musicum Iuvenale Ochsenfurt",
        metaDescription: "Esika ya mosala ya kati mpo na kobongisa ba posts ya Instagram uta na ba share pages oyo ezali.",
        heroEyebrow: "Esika ya mosala ya social media na kati",
        heroTitle: "Bongisa ba posts mpe ba stories ya Instagram uta na site",
        heroText: "Lokasa oyo ezwi titre, mokuse ya makambo, image mpe lien ya share mbala moko uta na ba share pages oyo ezali. Ndenge wana bozali kobatela contenu na esika moko kasi bozali kozwa mbala moko ba captions mpe ba layouts mpo na feed mpe story.",
        copyAllJsonButton: "Copier ba donnees nyonso lokola JSON",
        exampleSharePageButton: "Fungola exemple ya share page",
        guideAriaLabel: "Molongo ya mosala oyo eteyami",
        guideTitle: "Molongo ya mosala oyo eteyami",
        guideSteps: [
            "Pona post, tia preview 4:5 mpo na feed to 9:16 mpo na story, sima exporte yango lokola PNG.",
            "Copier caption mpe tia yango na Instagram to Meta Business Suite.",
            "Copier share link na ndenge ekeseni mpe tia yango sima na bio, story to esika ya ba links."
        ],
        noteTitle: "Likambo ya ntina mpo na Instagram",
        noteText: "Instagram esalaka te ete ba links na ba captions ya posts ezala clickable. Mpo na story oyo ekoki kofinama, osengeli kobakisa link sticker na www.cmi-ochsenfurt.de sima ya upload. PNG export mpo na feed mpe story esalaka na site ya live to na web server ya local, kasi te na file:// mbala moko.",
        toolbarAriaLabel: "Ba filtres mpe etat",
        searchLabel: "Luka",
        searchPlaceholder: "Luka titre, esika to mot-clé",
        statusLoading: "Ba share pages ezali kocharger...",
        noMatches: "Ata post moko ya kokokana ezwami te.",
        noPages: "Share page moko te ekokaki kocharger. Lokasa ya export esalaka kaka na web server, kasi te na file://.",
        loadError: "Ba share pages ekokaki te kocharger. Lokasa ya export esalaka kaka na web server, kasi te na file://.",
        previewEyebrow: "Preview ya komona",
        previewNote: "Pona 4:5 to 9:16 mbala moko na preview. Fichier PNG esalamaka kaka tango ya export, kasi te uta na HTML yango moko.",
        previewGroupLabel: "Pona ba modeles ya feed to story",
        feedOptionLabel: "Modele ya feed 4:5",
        storyOptionLabel: "Modele ya story 9:16",
        optionStateActive: "Ezali actif mpo na export",
        optionStateInactive: "Activer",
        workflowEyebrow: "Esika ya mosala",
        workflowNote: "Pona modele mpe sala export liboso. Caption mpe lien ezali se kokoka ko-copier na se.",
        formatKicker: "Modele oyo ezali actif",
        captionLabel: "Caption ya Instagram",
        captionNote: "Esili mpo na ko-copier na Instagram to Meta Business Suite. Lien etikali na ndenge ekeseni.",
        copyCaptionButton: "Copier caption",
        copyLinkButton: "Copier lien",
        openImageButton: "Fungola image",
        openShareButton: "Share page",
        feedSummaryLabel: "Feed 4:5",
        storySummaryLabel: "Story 9:16",
        feedSummaryNote: "Export ya feed esaleli kaka image to poster. Makambo mosusu nyonso ezali na caption.",
        exportFeedButton: "Exporter PNG 4:5",
        exportStoryButton: "Exporter PNG 9:16",
        defaultPostLabel: "Post ya share",
        copyCaptionAction: "Copier caption",
        copyLinkAction: "Copier lien",
        openImageAction: "Fungola image",
        openShareAction: "Fungola share page",
        openInNewWindowHint: "efungwami na fenetre ya sika",
        feedExportAction: "Exporter PNG ya feed",
        storyExportAction: "Exporter PNG ya story",
        activatedState: "esili koactiver",
        feedExportRunning: "Export ezali kotambola...",
        feedExported: "PNG eexportami",
        feedExportFailed: "Export elongi te",
        pngExportStatus: "PNG export ezali kotambola",
        pngExportFailedStatus: "PNG export elongi te",
        pngExportAlert: "PNG export esalemi te. Fungola lokasa ya export na site ya live to na web server ya local; canvas export esalaka te mbala moko na file://.",
        storyExportRunning: "Story ezali kotambola...",
        storyExported: "Story eexportami",
        storyFallbackExported: "Image eexportami",
        storyExportFailed: "Story elongi te",
        storyExportStatus: "Story export ezali kotambola",
        storyExportFailedStatus: "Story export elongi te",
        previewFallbackStatus: "Preview export ekoki te, image eexportami",
        storyPreviewFallbackAlert: "Story preview ekokaki te koexportama mbala moko na navigateur oyo. Image nde eexportamaki na esika na yango.",
        storyExportAlert: "Story export esalemi te. Fungola lokasa ya export na site ya live to na web server ya local; export esalaka te mbala moko na file://.",
        captionCopied: "Caption ecopyami",
        linkCopied: "Lien ecopyami",
        jsonCopied: "JSON ecopyami",
        copyAllJsonSuccess: "Ba donnees nyonso ecopyami lokola JSON",
        copyFailedStatus: "Copier elongi te. Svp copier texte na maboko.",
        copyFailedAlert: "Copier esalemi te na navigateur. Svp copier texte na maboko.",
        fallbackSourceStatus: " (liste ya secours ezali actif)",
        resultsStatus: function(visibleCount, totalCount) {
            return `${visibleCount} kati na ${totalCount} posts emonani`;
        },
        skippedFilesStatus: function(count) {
            return count === 1 ? ", fichier 1 epumbwami" : `, ba fichiers ${count} epumbwami`;
        }
    },
    it: {
        pageTitle: "Instagram Export | Collegium Musicum Iuvenale Ochsenfurt",
        metaDescription: "Area interna per preparare post Instagram a partire dalle share page esistenti.",
        heroEyebrow: "Laboratorio interno social media",
        heroTitle: "Preparare post e stories Instagram dal sito",
        heroText: "Questa pagina legge titolo, testo breve, immagine e link di condivisione direttamente dalle share page esistenti. In questo modo i contenuti restano in un solo punto ma avete comunque caption pronte e layout esportabili per feed e story.",
        copyAllJsonButton: "Copia tutti i dati come JSON",
        exampleSharePageButton: "Apri una share page di esempio",
        guideAriaLabel: "Flusso consigliato",
        guideTitle: "Procedura consigliata",
        guideSteps: [
            "Scegli il post, attiva l'anteprima 4:5 per il feed o 9:16 per la story, poi esporta in PNG.",
            "Copia la caption e incollala in Instagram o Meta Business Suite.",
            "Copia il link separatamente e inseriscilo poi nella bio, nella story o in una raccolta link."
        ],
        noteTitle: "Importante per Instagram",
        noteText: "Instagram non rende cliccabili i link nelle normali caption dei post. Per una story cliccabile devi ancora aggiungere un link sticker a www.cmi-ochsenfurt.de dopo il caricamento. L'export PNG per feed e story funziona sul sito live o in locale tramite web server, ma non direttamente via file://.",
        toolbarAriaLabel: "Filtri e stato",
        searchLabel: "Cerca",
        searchPlaceholder: "Cerca titolo, luogo o parola chiave",
        statusLoading: "Caricamento share page in corso...",
        noMatches: "Nessun post corrispondente trovato.",
        noPages: "Non e' stato possibile caricare alcuna share page. La pagina di export funziona solo tramite web server, non via file://.",
        loadError: "Le share page non sono state caricate. La pagina di export funziona solo tramite web server, non via file://.",
        previewEyebrow: "Anteprima visiva",
        previewNote: "Scegli 4:5 o 9:16 direttamente nell'anteprima. Il file PNG viene creato solo durante l'export, non dal solo HTML.",
        previewGroupLabel: "Scegli i modelli feed o story",
        feedOptionLabel: "Modello feed 4:5",
        storyOptionLabel: "Modello story 9:16",
        optionStateActive: "Attivo per l'export",
        optionStateInactive: "Attiva",
        workflowEyebrow: "Area di lavoro",
        workflowNote: "Scegli prima il modello ed esporta. Caption e link restano copiabili separatamente sotto.",
        formatKicker: "Modello attivo",
        captionLabel: "Caption Instagram",
        captionNote: "Pronta da copiare per Instagram o Meta Business Suite. Il link resta separato.",
        copyCaptionButton: "Copia caption",
        copyLinkButton: "Copia link",
        openImageButton: "Apri immagine",
        openShareButton: "Share page",
        feedSummaryLabel: "Feed 4:5",
        storySummaryLabel: "Story 9:16",
        feedSummaryNote: "L'export feed usa solo immagine o poster. Tutte le altre informazioni restano nella caption.",
        exportFeedButton: "Esporta PNG 4:5",
        exportStoryButton: "Esporta PNG 9:16",
        defaultPostLabel: "Post share",
        copyCaptionAction: "Copia caption",
        copyLinkAction: "Copia link",
        openImageAction: "Apri immagine",
        openShareAction: "Apri share page",
        openInNewWindowHint: "si apre in una nuova finestra",
        feedExportAction: "Esporta PNG feed",
        storyExportAction: "Esporta PNG story",
        activatedState: "attivato",
        feedExportRunning: "Export in corso...",
        feedExported: "PNG esportato",
        feedExportFailed: "Export non riuscito",
        pngExportStatus: "Export PNG in corso",
        pngExportFailedStatus: "Export PNG non riuscito",
        pngExportAlert: "L'export PNG non ha funzionato. Apri la pagina di export tramite il sito live o localmente con un web server; l'export canvas non funziona direttamente via file://.",
        storyExportRunning: "Story in corso...",
        storyExported: "Story esportata",
        storyFallbackExported: "Immagine esportata",
        storyExportFailed: "Story non riuscita",
        storyExportStatus: "Export story in corso",
        storyExportFailedStatus: "Export story non riuscito",
        previewFallbackStatus: "Export anteprima non disponibile, immagine esportata",
        storyPreviewFallbackAlert: "L'anteprima story non ha potuto essere esportata direttamente in questo browser. Al suo posto e' stata esportata l'immagine.",
        storyExportAlert: "L'export story non ha funzionato. Apri la pagina di export tramite il sito live o localmente con un web server; l'export non funziona direttamente via file://.",
        captionCopied: "Caption copiata",
        linkCopied: "Link copiato",
        jsonCopied: "JSON copiato",
        copyAllJsonSuccess: "Tutti i dati copiati come JSON",
        copyFailedStatus: "Copia non riuscita. Copia il testo manualmente.",
        copyFailedAlert: "La copia non ha funzionato nel browser. Copia il testo manualmente.",
        fallbackSourceStatus: " (lista fallback attiva)",
        resultsStatus: function(visibleCount, totalCount) {
            return `${visibleCount} di ${totalCount} post visibili`;
        },
        skippedFilesStatus: function(count) {
            return count === 1 ? ", 1 file saltato" : `, ${count} file saltati`;
        }
    },
    tr: {
        pageTitle: "Instagram Export | Collegium Musicum Iuvenale Ochsenfurt",
        metaDescription: "Mevcut share sayfalarindan Instagram gonderileri hazirlamak icin dahili calisma alani.",
        heroEyebrow: "Dahili sosyal medya calisma alani",
        heroTitle: "Web sitesinden Instagram gonderileri ve hikayeleri hazirlayin",
        heroText: "Bu sayfa baslik, ozet, gorsel ve share baglantisini dogrudan mevcut share sayfalarindan okur. Boylece icerik tek kaynaktan gelir ama yine de hazir captionlar ve feed ile story icin disa aktarilabilir yerlesimler elde edersiniz.",
        copyAllJsonButton: "Tum verileri JSON olarak kopyala",
        exampleSharePageButton: "Ornek share sayfasini ac",
        guideAriaLabel: "Onerilen akis",
        guideTitle: "Onerilen akis",
        guideSteps: [
            "Gonderiyi secin, onizlemede feed icin 4:5 veya story icin 9:16 secin ve sonra PNG olarak disa aktarın.",
            "Caption'ı kopyalayin ve Instagram'a veya Meta Business Suite'e yapistirin.",
            "Share baglantisini ayri kopyalayin ve sonra biyografi, hikaye ya da link koleksiyonuna yerlestirin."
        ],
        noteTitle: "Instagram icin onemli",
        noteText: "Instagram normal gonderi captionlarindaki baglantilari tiklanabilir yapmaz. Tiklanabilir bir story icin yuklemeden sonra yine de www.cmi-ochsenfurt.de adresine bir link cikartmasi eklemelisiniz. Feed ve story icin PNG disa aktarma canli sitede veya yerel bir web sunucusunda calisir, ancak dogrudan file:// uzerinden calismaz.",
        toolbarAriaLabel: "Filtreler ve durum",
        searchLabel: "Ara",
        searchPlaceholder: "Baslik, yer veya anahtar kelime ara",
        statusLoading: "Share sayfalari yukleniyor...",
        noMatches: "Eslesen gonderi bulunamadi.",
        noPages: "Hicbir share sayfasi yuklenemedi. Export sayfasi yalnizca bir web sunucusu uzerinden calisir, file:// ile degil.",
        loadError: "Share sayfalari yuklenemedi. Export sayfasi yalnizca bir web sunucusu uzerinden calisir, file:// ile degil.",
        previewEyebrow: "Gorsel onizleme",
        previewNote: "4:5 veya 9:16 secimini dogrudan onizlemede yapin. PNG dosyasi ancak disa aktarma sirasinda olusturulur, HTML'den dogrudan olusmaz.",
        previewGroupLabel: "Feed veya story sablonlarini secin",
        feedOptionLabel: "Feed sablonu 4:5",
        storyOptionLabel: "Story sablonu 9:16",
        optionStateActive: "Export icin aktif",
        optionStateInactive: "Etkinlestir",
        workflowEyebrow: "Calisma alani",
        workflowNote: "Once sablonu secin ve disa aktarın. Caption ve baglanti asagida ayri olarak kopyalanabilir kalir.",
        formatKicker: "Aktif sablon",
        captionLabel: "Instagram caption",
        captionNote: "Instagram veya Meta Business Suite icin hemen kopyalanabilir. Baglanti ayri kalir.",
        copyCaptionButton: "Caption kopyala",
        copyLinkButton: "Baglantiyi kopyala",
        openImageButton: "Gorseli ac",
        openShareButton: "Share sayfasi",
        feedSummaryLabel: "Feed 4:5",
        storySummaryLabel: "Story 9:16",
        feedSummaryNote: "Feed disa aktarmasi sadece gorsel ya da afisi kullanir. Diger tum bilgiler caption'da kalir.",
        exportFeedButton: "4:5 PNG disa aktar",
        exportStoryButton: "9:16 PNG disa aktar",
        defaultPostLabel: "Share gonderisi",
        copyCaptionAction: "Caption kopyala",
        copyLinkAction: "Baglantiyi kopyala",
        openImageAction: "Gorseli ac",
        openShareAction: "Share sayfasini ac",
        openInNewWindowHint: "yeni pencerede acilir",
        feedExportAction: "Feed PNG disa aktar",
        storyExportAction: "Story PNG disa aktar",
        activatedState: "etkinlestirildi",
        feedExportRunning: "Disa aktarma suruyor...",
        feedExported: "PNG disa aktarildi",
        feedExportFailed: "Disa aktarma basarisiz",
        pngExportStatus: "PNG disa aktarma suruyor",
        pngExportFailedStatus: "PNG disa aktarma basarisiz",
        pngExportAlert: "PNG disa aktarma calismadi. Lutfen export sayfasini canli site uzerinden ya da yerelde bir web sunucusuyla acin; canvas disa aktarmasi dogrudan file:// uzerinden calismaz.",
        storyExportRunning: "Story suruyor...",
        storyExported: "Story disa aktarildi",
        storyFallbackExported: "Gorsel disa aktarildi",
        storyExportFailed: "Story basarisiz",
        storyExportStatus: "Story disa aktarma suruyor",
        storyExportFailedStatus: "Story disa aktarma basarisiz",
        previewFallbackStatus: "Onizleme disa aktarmasi yok, gorsel disa aktarildi",
        storyPreviewFallbackAlert: "Story onizlemesi bu tarayicida dogrudan disa aktarılamadi. Onun yerine gorsel disa aktarildi.",
        storyExportAlert: "Story disa aktarma calismadi. Lutfen export sayfasini canli site uzerinden ya da yerelde bir web sunucusuyla acin; export dogrudan file:// uzerinden calismaz.",
        captionCopied: "Caption kopyalandi",
        linkCopied: "Baglanti kopyalandi",
        jsonCopied: "JSON kopyalandi",
        copyAllJsonSuccess: "Tum veriler JSON olarak kopyalandi",
        copyFailedStatus: "Kopyalama basarisiz. Lutfen metni elle kopyalayin.",
        copyFailedAlert: "Kopyalama tarayicida calismadi. Lutfen metni elle kopyalayin.",
        fallbackSourceStatus: " (yedek liste aktif)",
        resultsStatus: function(visibleCount, totalCount) {
            return `${visibleCount} / ${totalCount} gonderi gorunuyor`;
        },
        skippedFilesStatus: function(count) {
            return count === 1 ? ", 1 dosya atlandi" : `, ${count} dosya atlandi`;
        }
    },
    uk: {
        pageTitle: "Експорт Instagram | Collegium Musicum Iuvenale Ochsenfurt",
        metaDescription: "Внутрішня сторінка для підготовки дописів Instagram на основі наявних share-сторінок.",
        heroEyebrow: "Внутрішня social media майстерня",
        heroTitle: "Підготуйте дописи та сторіз Instagram з вебсайту",
        heroText: "Ця сторінка читає заголовок, короткий текст, зображення й посилання на share-сторінку безпосередньо з наявних сторінок. Так контент залишається в одному джерелі, але ви все одно одразу отримуєте готові підписи та експортовані макети для feed і story.",
        copyAllJsonButton: "Скопіювати всі дані як JSON",
        exampleSharePageButton: "Відкрити приклад share-сторінки",
        guideAriaLabel: "Рекомендований сценарій",
        guideTitle: "Рекомендований порядок",
        guideSteps: [
            "Виберіть допис, увімкніть у прев'ю формат 4:5 для feed або 9:16 для story, а потім експортуйте PNG.",
            "Скопіюйте підпис і вставте його в Instagram або Meta Business Suite.",
            "Окремо скопіюйте share-посилання й пізніше розмістіть його в біо, сторіз або добірці посилань."
        ],
        noteTitle: "Важливо для Instagram",
        noteText: "Instagram не робить посилання у звичайних підписах клікабельними. Щоб сторіз була клікабельною, після завантаження потрібно додати стікер-посилання на www.cmi-ochsenfurt.de. Експорт PNG для feed і story працює на live-сайті або локально через вебсервер, але не напряму через file://.",
        toolbarAriaLabel: "Фільтри та статус",
        searchLabel: "Пошук",
        searchPlaceholder: "Шукати заголовок, місце або ключове слово",
        statusLoading: "Share-сторінки завантажуються...",
        noMatches: "Відповідних дописів не знайдено.",
        noPages: "Не вдалося завантажити жодної share-сторінки. Сторінка експорту працює лише через вебсервер, а не через file://.",
        loadError: "Не вдалося завантажити share-сторінки. Сторінка експорту працює лише через вебсервер, а не через file://.",
        previewEyebrow: "Візуальне прев'ю",
        previewNote: "Оберіть 4:5 або 9:16 безпосередньо в прев'ю. PNG-файл створюється лише під час експорту, а не з самого HTML.",
        previewGroupLabel: "Оберіть шаблон feed або story",
        feedOptionLabel: "Шаблон feed 4:5",
        storyOptionLabel: "Шаблон story 9:16",
        optionStateActive: "Активно для експорту",
        optionStateInactive: "Активувати",
        workflowEyebrow: "Робоча зона",
        workflowNote: "Спочатку виберіть шаблон і виконайте експорт. Підпис і посилання нижче залишаються окремо доступними для копіювання.",
        formatKicker: "Активний шаблон",
        captionLabel: "Підпис Instagram",
        captionNote: "Готово до копіювання для Instagram або Meta Business Suite. Посилання лишається окремо.",
        copyCaptionButton: "Скопіювати підпис",
        copyLinkButton: "Скопіювати посилання",
        openImageButton: "Відкрити зображення",
        openShareButton: "Share-сторінка",
        feedSummaryLabel: "Feed 4:5",
        storySummaryLabel: "Story 9:16",
        feedSummaryNote: "Експорт feed використовує лише зображення або афішу. Уся інша інформація залишається в підписі.",
        exportFeedButton: "Експортувати PNG 4:5",
        exportStoryButton: "Експортувати PNG 9:16",
        defaultPostLabel: "Share-допис",
        copyCaptionAction: "Скопіювати підпис",
        copyLinkAction: "Скопіювати посилання",
        openImageAction: "Відкрити зображення",
        openShareAction: "Відкрити share-сторінку",
        openInNewWindowHint: "відкривається в новому вікні",
        feedExportAction: "Експортувати PNG feed",
        storyExportAction: "Експортувати PNG story",
        activatedState: "активовано",
        feedExportRunning: "Експорт триває...",
        feedExported: "PNG експортовано",
        feedExportFailed: "Експорт не вдався",
        pngExportStatus: "Триває експорт PNG",
        pngExportFailedStatus: "Експорт PNG не вдався",
        pngExportAlert: "Експорт PNG не спрацював. Відкрийте сторінку експорту через live-сайт або локально через вебсервер; canvas-експорт не працює напряму через file://.",
        storyExportRunning: "Story триває...",
        storyExported: "Story експортовано",
        storyFallbackExported: "Зображення експортовано",
        storyExportFailed: "Story не вдалася",
        storyExportStatus: "Триває експорт story",
        storyExportFailedStatus: "Експорт story не вдався",
        previewFallbackStatus: "Експорт прев'ю недоступний, зображення експортовано",
        storyPreviewFallbackAlert: "Прев'ю story не вдалося напряму експортувати в цьому браузері. Натомість було експортовано зображення.",
        storyExportAlert: "Експорт story не спрацював. Відкрийте сторінку експорту через live-сайт або локально через вебсервер; експорт не працює напряму через file://.",
        captionCopied: "Підпис скопійовано",
        linkCopied: "Посилання скопійовано",
        jsonCopied: "JSON скопійовано",
        copyAllJsonSuccess: "Усі дані скопійовано як JSON",
        copyFailedStatus: "Не вдалося скопіювати. Скопіюйте текст вручну.",
        copyFailedAlert: "Копіювання не спрацювало в браузері. Скопіюйте текст вручну.",
        fallbackSourceStatus: " (активний резервний список)",
        resultsStatus: function(visibleCount, totalCount) {
            return `${visibleCount} з ${totalCount} дописів видно`;
        },
        skippedFilesStatus: function(count) {
            return count === 1 ? ", 1 файл пропущено" : `, ${count} файлів пропущено`;
        }
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
const EXPORT_WEBSITE_LABEL = "www.cmi-ochsenfurt.de";
const INSTAGRAM_FEED_LANDSCAPE_THRESHOLD = 1.08;
const initialSearchParams = new URLSearchParams(window.location.search);
const preferredPostLanguage = getPreferredPostLanguage();
const preferredInitialExportFormat = getInitialExportFormat();

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

function getExportUiCopy(language) {
    return EXPORT_UI_TRANSLATIONS[normalizePostLanguage(language)] || EXPORT_UI_TRANSLATIONS[DEFAULT_POST_LANGUAGE];
}

function buildPostScopedLabel(baseLabel, postLabel, suffixLabel) {
    const normalizedBaseLabel = collapseWhitespace(baseLabel);
    const normalizedPostLabel = collapseWhitespace(postLabel);
    const normalizedSuffixLabel = collapseWhitespace(suffixLabel);
    let label = normalizedBaseLabel;

    if (normalizedPostLabel) {
        label = `${label}: ${normalizedPostLabel}`;
    }

    if (normalizedSuffixLabel) {
        label = `${label} (${normalizedSuffixLabel})`;
    }

    return label;
}

function setTextContentIfPresent(element, text) {
    if (element) {
        element.textContent = text;
    }
}

function updateStaticUiLanguage(language) {
    const uiCopy = getExportUiCopy(language);
    const metaDescription = document.querySelector('meta[name="description"]');
    const guideCards = document.querySelectorAll('.export-guide__card');
    const workflowSteps = guideCards[0] ? guideCards[0].querySelectorAll('li') : [];
    const heroGhostLink = document.querySelector('.export-hero__actions .export-button--ghost');
    const searchLabel = document.querySelector('.export-search span');

    document.documentElement.lang = normalizePostLanguage(language);
    document.title = uiCopy.pageTitle;

    if (metaDescription) {
        metaDescription.setAttribute('content', uiCopy.metaDescription);
    }

    setTextContentIfPresent(document.querySelector('.export-hero__eyebrow'), uiCopy.heroEyebrow);
    setTextContentIfPresent(document.querySelector('.export-hero__title'), uiCopy.heroTitle);
    setTextContentIfPresent(document.querySelector('.export-hero__text'), uiCopy.heroText);

    if (elements.copyAllJson) {
        elements.copyAllJson.textContent = uiCopy.copyAllJsonButton;
        elements.copyAllJson.setAttribute('aria-label', uiCopy.copyAllJsonButton);
        elements.copyAllJson.setAttribute('title', uiCopy.copyAllJsonButton);
    }

    if (heroGhostLink) {
        heroGhostLink.textContent = uiCopy.exampleSharePageButton;
        heroGhostLink.setAttribute('aria-label', uiCopy.exampleSharePageButton);
        heroGhostLink.setAttribute('title', uiCopy.exampleSharePageButton);
    }

    if (guideCards[0]) {
        guideCards[0].querySelector('h2').textContent = uiCopy.guideTitle;
        workflowSteps.forEach((step, index) => {
            step.textContent = uiCopy.guideSteps[index] || '';
        });
    }

    if (guideCards[1]) {
        guideCards[1].querySelector('h2').textContent = uiCopy.noteTitle;
        guideCards[1].querySelector('p').textContent = uiCopy.noteText;
    }

    if (guideCards.length) {
        document.querySelector('.export-guide').setAttribute('aria-label', uiCopy.guideAriaLabel);
    }

    const toolbar = document.querySelector('.export-toolbar');
    if (toolbar) {
        toolbar.setAttribute('aria-label', uiCopy.toolbarAriaLabel);
    }

    if (searchLabel) {
        searchLabel.textContent = uiCopy.searchLabel;
    }

    if (elements.postSearch) {
        elements.postSearch.setAttribute('placeholder', uiCopy.searchPlaceholder);
        elements.postSearch.setAttribute('title', uiCopy.searchPlaceholder);
    }

    if (elements.exportStatus && !state.posts.length) {
        elements.exportStatus.textContent = uiCopy.statusLoading;
    }
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

function getInitialExportFormat() {
    const rawFormat = collapseWhitespace(initialSearchParams.get("format") || initialSearchParams.get("view") || "").toLowerCase();

    return rawFormat === "story" ? "story" : "feed";
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

function focusFirstVisibleExportControl(format) {
    const firstCard = elements.postGrid.querySelector(".post-card");
    if (!firstCard) {
        return;
    }

    const selector = format === "story" ? ".post-card__export-story" : ".post-card__export-feed";
    const targetControl = firstCard.querySelector(selector);

    if (!(targetControl instanceof HTMLElement)) {
        return;
    }

    window.requestAnimationFrame(() => {
        targetControl.focus({ preventScroll: true });
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
    const uiCopy = getExportUiCopy(state.language);
    const visibleCount = elements.postGrid.querySelectorAll(".post-card").length;
    let message = uiCopy.resultsStatus(visibleCount, state.posts.length);

    if (state.failedFilesCount) {
        message += uiCopy.skippedFilesStatus(state.failedFilesCount);
    }

    if (state.source === "fallback") {
        message += uiCopy.fallbackSourceStatus;
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
    const uiCopy = getExportUiCopy(state.language);

    try {
        await navigator.clipboard.writeText(value);
        setControlFeedbackState(trigger, successLabel, successStatus);
        announceTransientExportStatus(successStatus);
        window.setTimeout(() => {
            applyControlLabelState(trigger, originalState);
        }, 1500);
    } catch (error) {
        announceTransientExportStatus(uiCopy.copyFailedStatus, 2200);
        window.alert(uiCopy.copyFailedAlert);
    }
}

function getExportFormatPresentation(format, language) {
    const postCopy = getPostCopy(language);
    const uiCopy = getExportUiCopy(language);

    if (format === "story") {
        return {
            summaryLabel: uiCopy.storySummaryLabel,
            buttonLabel: uiCopy.exportStoryButton,
            exportLabel: uiCopy.storyExportAction,
            optionLabel: uiCopy.storyOptionLabel,
            summaryNote: postCopy.storyFormatNote
        };
    }

    return {
        summaryLabel: uiCopy.feedSummaryLabel,
        buttonLabel: uiCopy.exportFeedButton,
        exportLabel: uiCopy.feedExportAction,
        optionLabel: uiCopy.feedOptionLabel,
        summaryNote: uiCopy.feedSummaryNote
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

    const backdropImageElement = previewElement.querySelector(".story-preview__backdrop-image");
    const previewImageElement = previewElement.querySelector(".story-preview__image");
    const imageShellElement = previewElement.querySelector(".story-preview__image-shell");

    if (!(previewImageElement instanceof HTMLImageElement) || !(imageShellElement instanceof Element)) {
        throw new Error("Story-Preview ist unvollstaendig und kann nicht exportiert werden.");
    }

    const storyImage = await loadImage(previewImageElement.currentSrc || previewImageElement.src);
    const backdropImage = backdropImageElement instanceof HTMLImageElement
        ? await loadImage(backdropImageElement.currentSrc || backdropImageElement.src)
        : storyImage;
    const scaleX = exportWidth / rootRect.width;
    const scaleY = exportHeight / rootRect.height;
    const scale = Math.min(scaleX, scaleY);
    const canvas = document.createElement("canvas");
    canvas.width = exportWidth;
    canvas.height = exportHeight;
    const ctx = canvas.getContext("2d");
    const previewStyle = window.getComputedStyle(previewElement);
    const previewRadius = parseCssPx(previewStyle.borderTopLeftRadius) * scale;
    const imageRect = getScaledContentRect(imageShellElement, rootRect, scaleX, scaleY);
    const isLandscape = previewElement.classList.contains("story-preview--landscape") || isLandscapeFeedImage(storyImage);

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

    drawStoryBackdropImage(ctx, backdropImage, exportWidth, exportHeight, isLandscape);
    drawStoryContainedImage(ctx, storyImage, imageRect.x, imageRect.y, imageRect.width, imageRect.height);

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
    backgroundGradient.addColorStop(0, "#dbeceb");
    backgroundGradient.addColorStop(1, "#eff8f7");
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStoryBackdropImage(ctx, heroImage, canvas.width, canvas.height, isLandscapeFeedImage(heroImage));

    const storyImageRect = getDefaultStoryImageRect(canvas.width, canvas.height, heroImage);
    drawStoryContainedImage(
        ctx,
        heroImage,
        storyImageRect.x,
        storyImageRect.y,
        storyImageRect.width,
        storyImageRect.height
    );

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

function getImageAspectRatio(imageSource) {
    if (typeof imageSource === "number") {
        return Number.isFinite(imageSource) && imageSource > 0 ? imageSource : 1;
    }

    const width = Number(imageSource?.naturalWidth || imageSource?.width || 0);
    const height = Number(imageSource?.naturalHeight || imageSource?.height || 0);

    if (!width || !height) {
        return 1;
    }

    return width / height;
}

function isLandscapeFeedImage(imageSource) {
    return getImageAspectRatio(imageSource) > INSTAGRAM_FEED_LANDSCAPE_THRESHOLD;
}

function syncFeedPreviewLayout(previewElement, previewImageElement) {
    if (!(previewElement instanceof Element) || !(previewImageElement instanceof HTMLImageElement)) {
        return;
    }

    const applyLayout = () => {
        previewElement.classList.toggle("insta-preview--landscape", isLandscapeFeedImage(previewImageElement));
    };

    if (previewImageElement.complete && previewImageElement.naturalWidth > 0 && previewImageElement.naturalHeight > 0) {
        applyLayout();
        return;
    }

    previewImageElement.addEventListener("load", applyLayout, { once: true });
    previewImageElement.addEventListener("error", () => {
        previewElement.classList.remove("insta-preview--landscape");
    }, { once: true });
}

function syncStoryPreviewLayout(previewElement, previewImageElement) {
    if (!(previewElement instanceof Element) || !(previewImageElement instanceof HTMLImageElement)) {
        return;
    }

    const applyLayout = () => {
        const isLandscape = isLandscapeFeedImage(previewImageElement);
        previewElement.classList.toggle("story-preview--landscape", isLandscape);
        previewElement.classList.toggle("story-preview--portrait", !isLandscape);
    };

    if (previewImageElement.complete && previewImageElement.naturalWidth > 0 && previewImageElement.naturalHeight > 0) {
        applyLayout();
        return;
    }

    previewImageElement.addEventListener("load", applyLayout, { once: true });
    previewImageElement.addEventListener("error", () => {
        previewElement.classList.remove("story-preview--landscape");
        previewElement.classList.remove("story-preview--portrait");
    }, { once: true });
}

function drawStoryBackdropImage(ctx, image, width, height, isLandscape) {
    const bleed = isLandscape ? 72 : 54;

    ctx.save();
    ctx.globalAlpha = isLandscape ? 0.56 : 0.48;
    ctx.filter = `blur(${isLandscape ? 34 : 30}px) saturate(0.86)`;
    drawCoverImage(ctx, image, -bleed, -bleed, width + bleed * 2, height + bleed * 2);
    ctx.restore();

    const softOverlay = ctx.createLinearGradient(0, 0, 0, height);
    softOverlay.addColorStop(0, isLandscape ? "rgba(247, 251, 250, 0.38)" : "rgba(248, 252, 251, 0.42)");
    softOverlay.addColorStop(1, isLandscape ? "rgba(230, 241, 239, 0.66)" : "rgba(231, 242, 240, 0.72)");
    ctx.fillStyle = softOverlay;
    ctx.fillRect(0, 0, width, height);
}

function drawStoryContainedImage(ctx, image, x, y, width, height) {
    ctx.save();
    ctx.shadowColor = "rgba(18, 65, 58, 0.22)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetY = 18;
    drawContainedImage(ctx, image, x, y, width, height);
    ctx.restore();
}

function getDefaultStoryImageRect(canvasWidth, canvasHeight, imageSource) {
    const isLandscape = isLandscapeFeedImage(imageSource);
    const insetX = isLandscape ? 26 : 16;
    const insetY = isLandscape ? 140 : 34;

    return {
        x: insetX,
        y: insetY,
        width: Math.max(0, canvasWidth - insetX * 2),
        height: Math.max(0, canvasHeight - insetY * 2)
    };
}

function drawFeedBackdropImage(ctx, image, width, height) {
    const bleed = 56;

    ctx.save();
    ctx.globalAlpha = 0.42;
    ctx.filter = "blur(28px) saturate(0.82)";
    drawCoverImage(ctx, image, -bleed, -bleed, width + bleed * 2, height + bleed * 2);
    ctx.restore();

    const softOverlay = ctx.createLinearGradient(0, 0, 0, height);
    softOverlay.addColorStop(0, "rgba(245, 250, 248, 0.18)");
    softOverlay.addColorStop(1, "rgba(245, 250, 248, 0.58)");
    ctx.fillStyle = softOverlay;
    ctx.fillRect(0, 0, width, height);

    const topAura = ctx.createRadialGradient(width * 0.2, height * 0.14, 30, width * 0.2, height * 0.14, width * 0.46);
    topAura.addColorStop(0, "rgba(21, 155, 140, 0.18)");
    topAura.addColorStop(1, "rgba(21, 155, 140, 0)");
    ctx.fillStyle = topAura;
    ctx.fillRect(0, 0, width, height);

    const bottomAura = ctx.createRadialGradient(width * 0.82, height * 0.84, 36, width * 0.82, height * 0.84, width * 0.38);
    bottomAura.addColorStop(0, "rgba(17, 120, 109, 0.12)");
    bottomAura.addColorStop(1, "rgba(17, 120, 109, 0)");
    ctx.fillStyle = bottomAura;
    ctx.fillRect(0, 0, width, height);
}

function drawFeedWebsitePill(ctx, canvasWidth, canvasHeight) {
    const pillHeight = 76;
    const pillPaddingX = 32;
    const pillFont = "800 28px 'Segoe UI', sans-serif";

    ctx.save();
    ctx.font = pillFont;
    const pillWidth = ctx.measureText(EXPORT_WEBSITE_LABEL).width + pillPaddingX * 2;
    ctx.restore();

    const pillX = (canvasWidth - pillWidth) / 2;
    const pillY = canvasHeight - pillHeight - 36;

    drawRoundedPanel(ctx, {
        x: pillX,
        y: pillY,
        width: pillWidth,
        height: pillHeight,
        radius: pillHeight / 2,
        fillStyle: "rgba(255, 255, 255, 0.84)",
        shadowColor: "rgba(18, 65, 58, 0.14)",
        shadowBlur: 26,
        shadowOffsetY: 10
    });

    ctx.save();
    ctx.fillStyle = "#11786d";
    ctx.font = pillFont;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(EXPORT_WEBSITE_LABEL, pillX + pillWidth / 2, pillY + pillHeight / 2 + 1);
    ctx.restore();
}

function drawDefaultInstagramFeedExport(ctx, heroImage, canvasWidth, canvasHeight) {
    ctx.fillStyle = "#f4fbfa";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    backgroundGradient.addColorStop(0, "#fdfefe");
    backgroundGradient.addColorStop(1, "#e8f3f1");
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const topAura = ctx.createRadialGradient(170, 120, 36, 170, 120, 460);
    topAura.addColorStop(0, "rgba(21, 155, 140, 0.18)");
    topAura.addColorStop(1, "rgba(21, 155, 140, 0)");
    ctx.fillStyle = topAura;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const bottomAura = ctx.createRadialGradient(canvasWidth - 150, canvasHeight - 120, 40, canvasWidth - 150, canvasHeight - 120, 360);
    bottomAura.addColorStop(0, "rgba(17, 120, 109, 0.12)");
    bottomAura.addColorStop(1, "rgba(17, 120, 109, 0)");
    ctx.fillStyle = bottomAura;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawImageStage(ctx, heroImage, {
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
        framePadding: 48,
        frameInset: 24,
        frameRadius: 44,
        backdropOpacity: 0.18,
        backdropTint: "rgba(8, 30, 27, 0.08)",
        frameFill: "rgba(255, 255, 255, 0.3)"
    });
}

function drawLandscapeInstagramFeedExport(ctx, heroImage, canvasWidth, canvasHeight) {
    const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    backgroundGradient.addColorStop(0, "#f6fbf9");
    backgroundGradient.addColorStop(1, "#edf5f2");
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    drawFeedBackdropImage(ctx, heroImage, canvasWidth, canvasHeight);

    ctx.save();
    ctx.shadowColor = "rgba(18, 65, 58, 0.22)";
    ctx.shadowBlur = 38;
    ctx.shadowOffsetY = 18;
    drawContainedImage(ctx, heroImage, 44, 72, canvasWidth - 88, canvasHeight - 178);
    ctx.restore();

    drawFeedWebsitePill(ctx, canvasWidth, canvasHeight);
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
    const uiCopy = getExportUiCopy(post.language);
    const postLabel = post.title || post.fileName || uiCopy.defaultPostLabel;

    setControlFeedbackState(trigger, uiCopy.feedExportRunning, buildPostScopedLabel(uiCopy.pngExportStatus, postLabel));
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

        if (isLandscapeFeedImage(heroImage.value)) {
            drawLandscapeInstagramFeedExport(ctx, heroImage.value, canvas.width, canvas.height);
        } else {
            drawDefaultInstagramFeedExport(ctx, heroImage.value, canvas.width, canvas.height);
        }

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = buildExportFileName(post, "-instagram-4x5");
        link.click();

        setControlFeedbackState(trigger, uiCopy.feedExported, buildPostScopedLabel(uiCopy.feedExported, postLabel));
        announceTransientExportStatus(buildPostScopedLabel(uiCopy.feedExported, postLabel));
    } catch (error) {
        console.error(error);
        announceTransientExportStatus(buildPostScopedLabel(uiCopy.pngExportFailedStatus, postLabel), 2200);
        window.alert(uiCopy.pngExportAlert);
        setControlFeedbackState(trigger, uiCopy.feedExportFailed, buildPostScopedLabel(uiCopy.pngExportFailedStatus, postLabel));
    } finally {
        window.setTimeout(() => {
            applyControlLabelState(trigger, originalState);
            trigger.disabled = false;
        }, 1600);
    }
}

async function exportInstagramStoryImage(post, trigger, previewElement) {
    const originalState = captureControlLabelState(trigger);
    const uiCopy = getExportUiCopy(post.language);
    const postLabel = post.title || post.fileName || uiCopy.defaultPostLabel;
    const fileName = buildExportFileName(post, "-instagram-story-9x16");

    setControlFeedbackState(trigger, uiCopy.storyExportRunning, buildPostScopedLabel(uiCopy.storyExportStatus, postLabel));
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

            setControlFeedbackState(trigger, uiCopy.storyExported, buildPostScopedLabel(uiCopy.storyExported, postLabel));
            announceTransientExportStatus(buildPostScopedLabel(uiCopy.storyExported, postLabel));
        } catch (previewError) {
            console.warn(previewError);
            await exportPosterOnlyStoryImage(post, fileName);
            window.alert(uiCopy.storyPreviewFallbackAlert);
            setControlFeedbackState(trigger, uiCopy.storyFallbackExported, buildPostScopedLabel(uiCopy.previewFallbackStatus, postLabel));
            announceTransientExportStatus(buildPostScopedLabel(uiCopy.previewFallbackStatus, postLabel));
        }
    } catch (error) {
        console.error(error);
        announceTransientExportStatus(buildPostScopedLabel(uiCopy.storyExportFailedStatus, postLabel), 2200);
        window.alert(uiCopy.storyExportAlert);
        setControlFeedbackState(trigger, uiCopy.storyExportFailed, buildPostScopedLabel(uiCopy.storyExportFailedStatus, postLabel));
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
        empty.textContent = getExportUiCopy(state.language).noMatches;
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
        const captionNote = fragment.querySelector(".post-card__caption-note");
        const formatValue = fragment.querySelector(".post-card__format-value");
        const formatNote = fragment.querySelector(".post-card__format-note");
        const formatKicker = fragment.querySelector(".post-card__format-kicker");
        const previewSectionEyebrow = fragment.querySelector(".post-card__overview .post-card__section-eyebrow");
        const previewSectionNote = fragment.querySelector(".post-card__overview .post-card__section-note");
        const previewStack = fragment.querySelector(".preview-stack");
        const feedPreviewOption = fragment.querySelector(".preview-option--feed");
        const feedPreviewLabel = fragment.querySelector(".preview-option--feed .preview-option__label");
        const feedPreview = fragment.querySelector(".insta-preview");
        const previewBackdropImage = fragment.querySelector(".insta-preview__backdrop-image");
        const previewImage = fragment.querySelector(".insta-preview__image");
        const previewMeta = fragment.querySelector(".insta-preview__meta");
        const previewTitle = fragment.querySelector(".insta-preview__title");
        const previewText = fragment.querySelector(".insta-preview__text");
        const storyPreviewOption = fragment.querySelector(".preview-option--story");
        const storyPreviewLabel = fragment.querySelector(".preview-option--story .preview-option__label");
        const storyPreview = fragment.querySelector(".story-preview");
        const storyPreviewBackdropImage = fragment.querySelector(".story-preview__backdrop-image");
        const storyPreviewImage = fragment.querySelector(".story-preview__image");
        const workflowEyebrow = fragment.querySelector(".post-card__workflow .post-card__section-eyebrow");
        const workflowNote = fragment.querySelector(".post-card__workflow .post-card__section-note");
        const exportFeedButton = fragment.querySelector(".post-card__export-feed");
        const exportStoryButton = fragment.querySelector(".post-card__export-story");
        const copyCaptionButton = fragment.querySelector(".post-card__copy-caption");
        const copyLinkButton = fragment.querySelector(".post-card__copy-link");
        const openImageLink = fragment.querySelector(".post-card__open-image");
        const openShareLink = fragment.querySelector(".post-card__open-share");
        const uiCopy = getExportUiCopy(post.language);
        const postLabel = post.title || post.fileName || uiCopy.defaultPostLabel;
        const postDomId = buildPostDomId(post, index);
        const titleId = `${postDomId}-title`;
        const captionLabelId = `${postDomId}-caption-label`;
        const captionId = `${postDomId}-caption`;

        card.dataset.search = buildSearchIndex(post);
        card.setAttribute("aria-labelledby", titleId);
        setTextContentIfPresent(previewSectionEyebrow, uiCopy.previewEyebrow);
        setTextContentIfPresent(previewSectionNote, uiCopy.previewNote);
        setTextContentIfPresent(feedPreviewLabel, uiCopy.feedOptionLabel);
        setTextContentIfPresent(storyPreviewLabel, uiCopy.storyOptionLabel);
        setTextContentIfPresent(workflowEyebrow, uiCopy.workflowEyebrow);
        setTextContentIfPresent(workflowNote, uiCopy.workflowNote);
        setTextContentIfPresent(formatKicker, uiCopy.formatKicker);
        setTextContentIfPresent(captionNote, uiCopy.captionNote);
        if (previewStack) {
            previewStack.setAttribute("aria-label", uiCopy.previewGroupLabel);
        }
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
            captionLabel.textContent = buildPostScopedLabel(uiCopy.captionLabel, postLabel);
        }
        caption.id = captionId;
        caption.value = post.caption;
        caption.setAttribute("aria-labelledby", captionLabel ? captionLabelId : titleId);
        caption.setAttribute("title", buildPostScopedLabel(uiCopy.captionLabel, postLabel));
        if (previewBackdropImage) {
            previewBackdropImage.src = post.image;
            previewBackdropImage.alt = "";
            previewBackdropImage.setAttribute("aria-hidden", "true");
            previewBackdropImage.loading = "lazy";
            previewBackdropImage.decoding = "async";
        }
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

        if (storyPreviewBackdropImage) {
            storyPreviewBackdropImage.src = post.image;
            storyPreviewBackdropImage.alt = "";
            storyPreviewBackdropImage.setAttribute("aria-hidden", "true");
            storyPreviewBackdropImage.loading = "lazy";
            storyPreviewBackdropImage.decoding = "async";
        }

        if (feedPreview) {
            feedPreview.setAttribute("aria-hidden", "true");
            syncFeedPreviewLayout(feedPreview, previewImage);
        }

        if (storyPreview) {
            storyPreview.setAttribute("aria-hidden", "true");
            syncStoryPreviewLayout(storyPreview, storyPreviewImage);
        }

        openImageLink.href = post.image;
        openShareLink.href = post.shareUrl;
        copyCaptionButton.textContent = uiCopy.copyCaptionButton;
        copyCaptionButton.setAttribute("aria-label", buildPostScopedLabel(uiCopy.copyCaptionAction, postLabel));
        copyCaptionButton.setAttribute("title", buildPostScopedLabel(uiCopy.copyCaptionAction, postLabel));
        copyLinkButton.textContent = uiCopy.copyLinkButton;
        copyLinkButton.setAttribute("aria-label", buildPostScopedLabel(uiCopy.copyLinkAction, postLabel));
        copyLinkButton.setAttribute("title", buildPostScopedLabel(uiCopy.copyLinkAction, postLabel));
        openImageLink.textContent = uiCopy.openImageButton;
        openImageLink.setAttribute("aria-label", buildPostScopedLabel(uiCopy.openImageAction, postLabel, uiCopy.openInNewWindowHint));
        openImageLink.setAttribute("title", buildPostScopedLabel(uiCopy.openImageAction, postLabel, uiCopy.openInNewWindowHint));
        openShareLink.textContent = uiCopy.openShareButton;
        openShareLink.setAttribute("aria-label", buildPostScopedLabel(uiCopy.openShareAction, postLabel, uiCopy.openInNewWindowHint));
        openShareLink.setAttribute("title", buildPostScopedLabel(uiCopy.openShareAction, postLabel, uiCopy.openInNewWindowHint));
        exportFeedButton.textContent = uiCopy.exportFeedButton;
        exportFeedButton.setAttribute("aria-label", buildPostScopedLabel(uiCopy.feedExportAction, postLabel));
        exportFeedButton.setAttribute("title", buildPostScopedLabel(uiCopy.feedExportAction, postLabel));
        exportStoryButton.textContent = uiCopy.exportStoryButton;
        exportStoryButton.setAttribute("aria-label", buildPostScopedLabel(uiCopy.storyExportAction, postLabel));
        exportStoryButton.setAttribute("title", buildPostScopedLabel(uiCopy.storyExportAction, postLabel));

        let selectedFormat = preferredInitialExportFormat;

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
                    buildPostScopedLabel(
                        `${optionPresentation.optionLabel} ${isActive ? uiCopy.optionStateActive : uiCopy.optionStateInactive}`,
                        postLabel
                    )
                );

                if (stateLabel) {
                    stateLabel.textContent = isActive ? uiCopy.optionStateActive : uiCopy.optionStateInactive;
                }
            });
        }

        function activateSelectedFormat(format) {
            const nextFormat = format === "story" ? "story" : "feed";

            if (selectedFormat === nextFormat) {
                return;
            }

            syncSelectedFormat(nextFormat);
            announceTransientExportStatus(
                buildPostScopedLabel(
                    `${getExportFormatPresentation(nextFormat, post.language).summaryLabel} ${uiCopy.activatedState}`,
                    postLabel
                ),
                1200
            );
        }

        function bindPreviewSelection(option, format) {
            if (!option) {
                return;
            }

            option.addEventListener("click", () => {
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
            copyText(post.caption, copyCaptionButton, uiCopy.captionCopied, buildPostScopedLabel(uiCopy.captionCopied, postLabel));
        });

        copyLinkButton.addEventListener("click", () => {
            copyText(post.shareUrl, copyLinkButton, uiCopy.linkCopied, buildPostScopedLabel(uiCopy.linkCopied, postLabel));
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
        state.language = preferredPostLanguage;
        updateStaticUiLanguage(state.language);
        const { posts, failedFiles, sharePages, source } = await loadPosts();
        state.posts = posts;
        state.sharePages = sharePages;
        state.failedFilesCount = failedFiles.length;
        state.source = source;
        renderPosts(posts);

        if (!posts.length) {
            setExportStatusMessage(getExportUiCopy(state.language).noPages);
            return;
        }

        const initialSearchQuery = getInitialSearchQuery();
        if (initialSearchQuery) {
            elements.postSearch.value = initialSearchQuery;
            applySearchFilter();
            scrollToFirstVisiblePost();
            focusFirstVisibleExportControl(preferredInitialExportFormat);
            return;
        }

        if (preferredInitialExportFormat === "story") {
            focusFirstVisibleExportControl(preferredInitialExportFormat);
        }

        syncExportResultsStatus();
    } catch (error) {
        setExportStatusMessage(getExportUiCopy(state.language).loadError);
        console.error(error);
    }
}

elements.postSearch.addEventListener("input", applySearchFilter);
elements.copyAllJson.addEventListener("click", () => {
    const uiCopy = getExportUiCopy(state.language);
    const exportPayload = state.posts.map((post) => ({
        title: post.title,
        meta: post.meta,
        image: post.image,
        shareUrl: post.shareUrl,
        text: post.text,
        hashtags: post.hashtags,
        caption: post.caption
    }));

    copyText(JSON.stringify(exportPayload, null, 2), elements.copyAllJson, uiCopy.jsonCopied, uiCopy.copyAllJsonSuccess);
});

initialize();
