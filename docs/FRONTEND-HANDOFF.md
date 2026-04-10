# Frontend Handoff

## Zielbild

Die Website nutzt jetzt eine modulare CSS-Architektur mit einem klaren Einstiegspunkt und getrennten Verantwortlichkeiten pro Bereich. Ziel der Umstellung war:

- bessere Wartbarkeit
- konsistentere Typografie und Kontraste
- weniger Seiteneffekte zwischen Sektionen
- saubere Trennung zwischen Hauptseite, Subpages und Share-Flow

## Aufbau

- [style.css](../style.css) ist der einzige Runtime-Einstiegspunkt fuer die Hauptwebsite.
- [styles/premium-foundation.css](../styles/premium-foundation.css) enthaelt Tokens, globale Typografie, Utilities und Basisschutzregeln.
- [styles/components/navigation.css](../styles/components/navigation.css) kapselt Hauptnavigation, Mobile-Menue und Subpage-Topbar.
- [styles/components/hero.css](../styles/components/hero.css) kapselt Hero und Gallery-UI.
- [styles/components/image-caption.css](../styles/components/image-caption.css) kapselt Intro- und Bild/Text-Bereich.
- [styles/components/about-me.css](../styles/components/about-me.css) kapselt den Ueber-mich-Bereich.
- [styles/components/events.css](../styles/components/events.css) kapselt Event-Karten, Poster-Interaktion und Social-Buttons.
- [styles/components/review.css](../styles/components/review.css) kapselt Rueckblicke, Archive und Review-Karten.
- [styles/components/music-family.css](../styles/components/music-family.css) kapselt Music Family / Anfaengergruppe.
- [styles/components/repertoire.css](../styles/components/repertoire.css) kapselt Repertoire und Engagement.
- [styles/components/contact.css](../styles/components/contact.css) kapselt Kontaktbereich.
- [styles/components/footer.css](../styles/components/footer.css) kapselt Footer.
- [styles/components/timeline.css](../styles/components/timeline.css) kapselt Chronik / Timeline.
- [styles/components/subpages.css](../styles/components/subpages.css) kapselt generische Subpage-Struktur.
- [styles/components/legal.css](../styles/components/legal.css) kapselt Datenschutz und Impressum.

Die JavaScript-Runtime ist jetzt in achtzehn Dateien geschnitten:

- Ein kleines Inline-Snippet im HTML-`head` setzt frueh `history.scrollRestoration = 'manual'`, damit die Browser-eigene Scroll-Wiederherstellung die Runtime nicht ueberlagert.
- [scripts/core-runtime.js](../scripts/core-runtime.js) kapselt Scroll-/Load-Verhalten, Sprach-Fallback und die zentrale Runtime-Initialisierung.
- [scripts/event-lightbox.js](../scripts/event-lightbox.js) kapselt die Event-Lightbox inklusive Caption-Ableitung, Fokus-Rueckgabe und Keyboard-/Overlay-Schliessen.
- [scripts/cookie-consent-content.js](../scripts/cookie-consent-content.js) kapselt die mehrsprachige Consent-Copy und die Tabellenlabels des eingebundenen Cookie-Scripts.
- [scripts/cookie-consent.js](../scripts/cookie-consent.js) kapselt nur noch Observer-Logik und den Sprachsync fuer das eingebundene Cookie-Script.
- [scripts/site-language-variants.js](../scripts/site-language-variants.js) kapselt Sprach-Fallbacks, `data-lang`-Variantengruppen und den `lang`-Attribut-Sync.
- [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js) kapselt Navigationslabels, Link-/Share-Labels und den statischen Accessibility-Sync.
- [scripts/site-language.js](../scripts/site-language.js) kapselt nur noch die Orchestrierung der Sprachmodule und den oeffentlichen Einstieg `setLang(...)`.
- [scripts/navigation-mobile.js](../scripts/navigation-mobile.js) kapselt Mobile-Menue, Fokus-Falle und Close-/Restore-Focus-Logik.
- [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js) kapselt Smooth-Scroll, Hash-Zielbehandlung und aktiven Navigationszustand fuer In-Page-Links.
- [scripts/navigation-shell.js](../scripts/navigation-shell.js) kapselt Navbar-Scrollzustand und den Mbonda-Timeline-Sonderfall.
- [scripts/navigation-runtime.js](../scripts/navigation-runtime.js) kapselt nur noch die Orchestrierung der Navigationsmodule.
- [scripts/hero-layout.js](../scripts/hero-layout.js) kapselt Hero-Layout-Messung und responsive Bild-Sonderfaelle.
- [scripts/hero-gallery.js](../scripts/hero-gallery.js) kapselt Galerie-Daten, Slider-Zustand, Crossfade, Autoplay und Initialisierung.
- [scripts/hero-gallery-ui.js](../scripts/hero-gallery-ui.js) kapselt Galerie-Labels, Accessibility-Sync, Caption/Counter-UI und Dot-Navigation.
- [scripts/site-effects.js](../scripts/site-effects.js) kapselt Scroll-Reveal, Shape-Parallax und den Jahreszaehler.
- [scripts/review-navigation.js](../scripts/review-navigation.js) kapselt Review-Hash-/History-Navigation, Ruecksprung-Logik und die Sprach-Labels dynamisch erzeugter Review-Steuerelemente.
- [scripts/review-archive.js](../scripts/review-archive.js) kapselt das Review-Archiv, Karten-Toggles und die hash-getriebene Oeffnungslogik fuer aeltere Rueckblicke.
- [scripts/review-interactions.js](../scripts/review-interactions.js) kapselt nur noch die Orchestrierung der Review-Module.

Wichtig: Die HTML-Dateien setzen zuerst das kleine Inline-Snippet fuer `history.scrollRestoration` im `head` und laden danach [scripts/core-runtime.js](../scripts/core-runtime.js), [scripts/event-lightbox.js](../scripts/event-lightbox.js), [scripts/cookie-consent-content.js](../scripts/cookie-consent-content.js), [scripts/cookie-consent.js](../scripts/cookie-consent.js), [scripts/site-language-variants.js](../scripts/site-language-variants.js), [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js), [scripts/site-language.js](../scripts/site-language.js), [scripts/navigation-mobile.js](../scripts/navigation-mobile.js), [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js), [scripts/navigation-shell.js](../scripts/navigation-shell.js), [scripts/navigation-runtime.js](../scripts/navigation-runtime.js), [scripts/hero-layout.js](../scripts/hero-layout.js), [scripts/hero-gallery.js](../scripts/hero-gallery.js), [scripts/hero-gallery-ui.js](../scripts/hero-gallery-ui.js), [scripts/site-effects.js](../scripts/site-effects.js), [scripts/review-navigation.js](../scripts/review-navigation.js), [scripts/review-archive.js](../scripts/review-archive.js) und [scripts/review-interactions.js](../scripts/review-interactions.js), weil die spaeteren Runtime-Dateien auf Basisfunktionen aus den frueher geladenen Dateien aufsetzen.

## Wichtige Regeln

- Neue Styles immer zuerst dem fachlich passenden Modul zuordnen.
- [style.css](../style.css) nicht wieder zu einer Sammeldatei ausbauen.
- Gemeinsame Variablen und globale Verhaltensregeln nur in [styles/premium-foundation.css](../styles/premium-foundation.css) pflegen.
- Grossflaechige visuelle Aenderungen immer auf Desktop und Mobile gegenpruefen, weil viele Module eigene responsive Regeln haben.

## Share-Flow

Der Share-Bereich ist absichtlich getrennt von der Hauptseiten-CSS:

- Share-Seiten liegen unter [share](../share).
- Die kanonische Inhaltsquelle fuer Share-Seiten steht in [share/share-pages-data.json](../share/share-pages-data.json).
- [share/generate-share-pages.py](../share/generate-share-pages.py) rendert daraus die einzelnen Share-HTMLs sowie [share/share-pages.json](../share/share-pages.json) und die Fallback-Liste in [share/instagram-export.js](../share/instagram-export.js).
- Die Vorschau-Layouts nutzen [share/share-preview.css](../share/share-preview.css).
- Der Instagram-Export nutzt [share/instagram-export.html](../share/instagram-export.html), [share/instagram-export.css](../share/instagram-export.css) und [share/instagram-export.js](../share/instagram-export.js).
- [share/share-pages.json](../share/share-pages.json) bleibt die Laufzeitliste fuer den Export, wird aber generatorbasiert aus derselben Quelle abgeleitet.
- Die Fallback-Liste in [share/instagram-export.js](../share/instagram-export.js) wird im selben Schritt mitaktualisiert und sollte nicht separat vorgepflegt werden.

## Verifizierter Stand

Zum Abschluss der Migration wurde lokal ueber einen HTTP-Server geprueft:

- [index.html](../index.html)
- [chronik.html](../chronik.html)
- [datenschutz.html](../datenschutz.html)
- [impressum.html](../impressum.html)
- [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html)
- [share/instagram-export.html](../share/instagram-export.html)

Dabei wurden sowohl HTTP-Erreichbarkeit als auch Strukturmarker geprueft. Zusaetzlich wurde geprueft, dass [share/share-pages-data.json](../share/share-pages-data.json), [share/share-pages.json](../share/share-pages.json) und `FALLBACK_SHARE_PAGES` in [share/instagram-export.js](../share/instagram-export.js) denselben Datenstand ausliefern.

## Abschlussstand 2026-04-10

- Der 4-Wochen-Arbeitsplan in [docs/FOUR-WEEK-PLAN.md](../docs/FOUR-WEEK-PLAN.md) ist im gesetzten Pragmatik-Scope abgeschlossen.
- Die groessten `data-lang`-Hotspots auf Hauptseite, Chronik und Legal-Seiten sind auf ein gemeinsames `hidden`-/`aria-hidden`-Muster vereinheitlicht.
- Nicht-sprachliche UI-Zustaende bleiben bewusst separat behandelt; ein Beispiel ist die Event-Lightbox, die weiter ihren eigenen `display:none`-Zustand nutzt.
- Die Browser-Matrix ueber Edge, Chrome und Firefox lief mehrfach mit 0 Funden, zuletzt nach dem erweiterten Homepage-Rollout fuer Intro-/About-Bloecke am 2026-04-08.
- Ein gezielter QA-Pass fuer Tastatur, Reduced Motion und Legal-Reflow auf [index.html](../index.html), [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) ist abgeschlossen; die dabei gefundenen Issues wurden direkt behoben.
- Der erste strukturelle i18n-Pilot ist eingefuehrt: Der Rechtsblock `#imprint-legal` in [impressum.html](../impressum.html) wird aus [scripts/legal-content.json](../scripts/legal-content.json) via [scripts/render-legal-content.py](../scripts/render-legal-content.py) in statisches HTML gerendert.
- Der Generatorpilot ist erweitert: Die Datenschutz-Bloecke `#privacy-overview`, `#privacy-hosting`, `#privacy-basics`, `#privacy-data`, `#privacy-social`, `#privacy-analytics` und `#privacy-tools` in [datenschutz.html](../datenschutz.html) werden jetzt generatorbasiert erzeugt; der Renderer unterstuetzt strukturierte Cards mit Ueberschriften, Listen, Inhaltsgruppen und gezielt freigegebene Inline-Links und zieht groessere Quellen bei Bedarf aus [scripts/legal-content](../scripts/legal-content) nach.
- Der gleiche Marker-Renderer wird jetzt auch auf breitere Chronik-Inhalte angewendet: In [chronik.html](../chronik.html) kommen Hero-Titel, Uebersichts-Karten, Timeline-Intro/Summary und alle sieben Timeline-Stationen aus [scripts/legal-content/chronik-overview.json](../scripts/legal-content/chronik-overview.json) sowie [scripts/legal-content/chronik-timeline-items.json](../scripts/legal-content/chronik-timeline-items.json) statt aus rohen `data-lang`-Duplikaten.
- Der Startseiten-Rollout ist jetzt deutlich breiter generatorbasiert: In [index.html](../index.html) kommen der komplette Musikfamilie-Block, die Repertoire- und Engagement-Karten, der obere "Musik baut Bruecken"-Introblock inklusive Jubiläumsfilm-Card, der Astrid-Abschnitt sowie die Event-Einfuehrung, beide Event-Karten, der Kontaktbereich und der Footer aus [scripts/legal-content/homepage-music-family.json](../scripts/legal-content/homepage-music-family.json), [scripts/legal-content/homepage-repertoire.json](../scripts/legal-content/homepage-repertoire.json), [scripts/legal-content/homepage-bridge-about.json](../scripts/legal-content/homepage-bridge-about.json), [scripts/legal-content/homepage-events.json](../scripts/legal-content/homepage-events.json) und [scripts/legal-content/homepage-contact-footer.json](../scripts/legal-content/homepage-contact-footer.json); der Renderer kann dafuer alternative Text-Tags, mehrzeiliges vertrauenswuerdiges HTML in Wrappern, sprachspezifische `lang`-Attribute und gezielt freigegebenes Listen-/Inline-HTML ausgeben, damit bestehende Karten-, Fakten-, Button- und Footer-Klassen erhalten bleiben.
- Der Aktuelles-Bereich auf [index.html](../index.html) ist jetzt ebenfalls generatorbasiert: Intro und Kartenliste kommen aus [scripts/legal-content/homepage-curated-feed.json](../scripts/legal-content/homepage-curated-feed.json), waehrend [scripts/render-legal-content.py](../scripts/render-legal-content.py) wiederholte Kartenlisten statisch mit bestehenden Klassen rendert.
- Der bisherige Navigations-/Sprach-Sammelblock ist jetzt entlang echter Verantwortungen zerlegt: [scripts/site-language-variants.js](../scripts/site-language-variants.js), [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js), [scripts/site-language.js](../scripts/site-language.js), [scripts/navigation-mobile.js](../scripts/navigation-mobile.js), [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js), [scripts/navigation-shell.js](../scripts/navigation-shell.js) und [scripts/navigation-runtime.js](../scripts/navigation-runtime.js) trennen Sprach-Fallbacks, Accessibility-/Label-Sync, Sprach-Orchestrierung, Mobile-Menue, In-Page-Wayfinding, Navbar-/Mbonda-Logik und Initialisierung.
- Der Hero-/Gallery-Block ist jetzt ebenfalls entlang echter Verantwortungen zerlegt: [scripts/hero-layout.js](../scripts/hero-layout.js), [scripts/hero-gallery.js](../scripts/hero-gallery.js) und [scripts/hero-gallery-ui.js](../scripts/hero-gallery-ui.js) trennen Layout-Messung, Slider-/Autoplay-Zustand sowie Accessibility- und UI-Sync.
- Der Share-Bereich ist jetzt generatorbasiert: [share/share-pages-data.json](../share/share-pages-data.json) ist die kanonische Quelle, [share/generate-share-pages.py](../share/generate-share-pages.py) erzeugt daraus die einzelnen Share-Seiten, [share/share-pages.json](../share/share-pages.json) und die Export-Fallback-Liste in [share/instagram-export.js](../share/instagram-export.js); ein lokaler Chromium-Smoke fuer Share-Seite und Export lief danach mit 0 Funden.
- Der Share-/Export-Output ist jetzt auch manuell als kompletter Asset-Satz gegengeprueft: 22 Social- und 22 Story-PNGs wurden am 2026-04-10 ueber [tmp/visual-qa/share-social-contact-sheet.png](../tmp/visual-qa/share-social-contact-sheet.png) und [tmp/visual-qa/share-status-contact-sheet.png](../tmp/visual-qa/share-status-contact-sheet.png) visuell gesichtet, ohne leere Slots, abgeschnittene Karten oder auffaellige Typo-/Cropping-Ausreisser.
- Der Review-/Rueckblick-Block ist jetzt ebenfalls entlang echter Verantwortungen zerlegt: [scripts/review-navigation.js](../scripts/review-navigation.js), [scripts/review-archive.js](../scripts/review-archive.js) und [scripts/review-interactions.js](../scripts/review-interactions.js) trennen Hash-/History-Navigation, Archiv-/Kartenzustand und die Orchestrierung; dynamisch erzeugte Review-Labels werden dabei sofort an den aktuellen Sprachzustand angeglichen.
- Die Homepage-Semantik wurde im letzten Pass weiter gehaertet: der Jubilaeumsfilm nutzt jetzt einen statischen Initial-`aria-label`, mehrere bisher visuelle Untertitel und Kartentitel sind echte Headings, und der eigenstaendige Astrid-Block fuehrt nun mit `h2` statt mit einer isolierten `h3`.
- Grosse Homepage-Bloecke exponieren jetzt sprachsynchronisierte Regionen ueber `data-region-label-selector` in [index.html](../index.html) und `syncNamedRegionAccessibility()` in [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js); dadurch tauchen Bruecken-Block, Musikfamilie, Repertoire, Engagement, Events, Chronik, Astrid-Block, News, Review-Ueberblick und Kontakt als benannte Regionen im Accessibility Tree auf.
- Browsernahe A11y-Pruefungen mit Playwright und Chromium-CDP liefen fuer Hauptseite und Cookie-Dialog erfolgreich: geprueft wurden `h1`/`main`, sichtbare Fokusziele, Landmark-/Regionsnamen, der Jubilaeumsfilm-Link, Kontakt sowie die Tastaturbedienung des Cookie-Dialogs in Deutsch und stichprobenartig nach Sprachwechsel auch in Englisch.
- Der automatische Mindest-Gate lief lokal am 2026-04-10 erneut mit `QA_BROWSER_TARGETS=chromium,firefox` und `QA_FAIL_ON_ISSUES=1` mit 0 Funden durch; der Ergebnisstand liegt in [tmp/visual-qa/release-qa-results.json](../tmp/visual-qa/release-qa-results.json).
- Der geplante Homepage-NVDA-Kurzpass ist am 2026-04-10 erfolgreich dokumentiert worden; der konkrete Ablauf bleibt unter `Homepage-Screenreader-Pass` in [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md) festgehalten.
- Die technische Einordnung und der Abschlussabgleich stehen in [docs/SITE-ASSESSMENT.md](../docs/SITE-ASSESSMENT.md).

## Freigabestatus

- Automatischer QA-Status: bestanden am 2026-04-10; lokaler Mindest-Gate mit `chromium` und `firefox` lief mit 0 Funden durch, Details in [tmp/visual-qa/release-qa-results.json](../tmp/visual-qa/release-qa-results.json).
- Manueller Share-/Export-PNG-Status: bestanden am 2026-04-10; 22 Social- und 22 Story-Exporte wurden ueber [tmp/visual-qa/share-social-contact-sheet.png](../tmp/visual-qa/share-social-contact-sheet.png) und [tmp/visual-qa/share-status-contact-sheet.png](../tmp/visual-qa/share-status-contact-sheet.png) gesichtet, ohne leere Slots, abgeschnittene Karten oder auffaellige Typo-/Cropping-Ausreisser.
- Manueller Screenreader-Status: bestanden am 2026-04-10; Homepage-NVDA-Kurzpass durch Ilhan Diler mit `pass` in Edge oder Chrome, keine Blocker bei Landmarken, Heading-Struktur, Jubilaeumsfilm-Link, Kontaktstruktur, Sprachwechsel Deutsch/Englisch oder News-Teaser-Bildansagen.
- Empfohlener Kurzablauf: [docs/NVDA-QUICK-PASS.md](../docs/NVDA-QUICK-PASS.md)
- Erwartete Pruefziele: benannte Homepage-Regionen, `h1`/`h2`-Struktur, Jubilaeumsfilm-Link, Kontaktstruktur, Sprachwechsel Deutsch/Englisch
- Ergebnisblock fuer den echten manuellen Lauf:
  Tester: Ilhan Diler
  Datum: 10.04.2026
  Screenreader / Version: NVDA, Version nicht protokolliert
  Browser: Edge oder Chrome
  Ergebnis: `pass`
  Findings: Keine Blocker. Homepage-Landmarken, Heading-Struktur, Jubilaeumsfilm-Link, Kontaktstruktur und Sprachwechsel Deutsch/Englisch wurden sinnvoll angekuendigt; keine redundanten News-Teaser-Bildansagen aufgefallen.

## Bewusst offene Grenzen

- Ein vollstaendiger Screenreader- und Geraeteklassen-Check ueber alle Seiten und Zustaende ist noch nicht erfolgt.
- Die grossen Sprachcluster sind vereinheitlicht; die strukturelle Entduplizierung ist jetzt fuer einen Impressum-Block, sieben Datenschutz-Bloecke, breite Chronik-Bereiche und grosse Hauptseiten-Bloecke vom oberen Intro-/About-Bereich bis hinein in Events, Kontakt und Footer umgesetzt, aber noch nicht ueber die gesamte Startseite hinweg abgeschlossen.
- Einige gewachsene Muster in Markup und Runtime sind reduziert, aber nicht vollstaendig entfernt.

## Naechste sinnvolle Schritte

1. Den Generatoransatz von Legal-, Chronik- und Homepage-Bloecken auf weitere grosse Sprachbereiche oder den Share-Flow ausweiten.
2. Vor einer finalen Freigabe einen kurzen manuellen Browser-, Mobile- und Screenreader-Sweep ueber Hauptseite, Chronik, Legal-Seiten und Share-Flow fahren.
3. Fuer den neuen Aktuelles-/Rueckblick-Flow spaeter ein bewusstes UX-/UI-Fine-Tuning einplanen; die konkreten Follow-up-Punkte stehen in [docs/SOCIAL-FEED-ASSESSMENT.md](../docs/SOCIAL-FEED-ASSESSMENT.md).
4. Als naechsten echten 10/10-Hebel einen vollstaendigen manuellen Accessibility-Sweep ueber Hauptseite, Chronik, Legal-Seiten und mindestens einen Share-Flow fahren und Funde direkt mit Root-Cause-Fixes schliessen.
5. Weitere Runtime-Schnitte nur noch dann ziehen, wenn konkrete QA- oder Produktfunde das in [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js) oder [scripts/review-navigation.js](../scripts/review-navigation.js) rechtfertigen.

## Offene Grenze

Technisch ist der Stand sauber validiert. Nicht vollautomatisiert abgedeckt ist nur echte Pixel-/Rendering-QA im Browser. Fuer finale visuelle Freigaben sollte daher immer noch ein kurzer manueller Blick auf Hauptseite, Chronik, Legal-Seiten und neue Share-Seiten erfolgen.

Fuer einen schnellen Release-Check gibt es jetzt die Kurzfassung unter [docs/RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md).
Fuer diesen manuellen Durchgang gibt es jetzt eine kompakte Checkliste unter [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md).