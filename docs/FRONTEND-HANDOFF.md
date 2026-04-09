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

Die JavaScript-Runtime ist jetzt in elf Dateien geschnitten:

- Ein kleines Inline-Snippet im HTML-`head` setzt frueh `history.scrollRestoration = 'manual'`, damit die Browser-eigene Scroll-Wiederherstellung die Runtime nicht ueberlagert.
- [scripts/core-runtime.js](../scripts/core-runtime.js) kapselt Scroll-/Load-Verhalten, Sprach-Fallback und die zentrale Runtime-Initialisierung.
- [scripts/event-lightbox.js](../scripts/event-lightbox.js) kapselt die Event-Lightbox inklusive Caption-Ableitung, Fokus-Rueckgabe und Keyboard-/Overlay-Schliessen.
- [scripts/cookie-consent.js](../scripts/cookie-consent.js) kapselt Cookie-Consent-Texte, Observer-Logik und den Sprachsync fuer das eingebundene Cookie-Script.
- [scripts/site-language.js](../scripts/site-language.js) kapselt Sprachumschaltung, Fallback-Auswahl fuer `data-lang`-Varianten und den statischen Accessibility-Sync.
- [scripts/navigation-mobile.js](../scripts/navigation-mobile.js) kapselt Mobile-Menue, Fokus-Falle und Close-/Restore-Focus-Logik.
- [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js) kapselt Smooth-Scroll, Hash-Zielbehandlung und aktiven Navigationszustand fuer In-Page-Links.
- [scripts/navigation-shell.js](../scripts/navigation-shell.js) kapselt Navbar-Scrollzustand und den Mbonda-Timeline-Sonderfall.
- [scripts/navigation-runtime.js](../scripts/navigation-runtime.js) kapselt nur noch die Orchestrierung der Navigationsmodule.
- [scripts/hero-gallery.js](../scripts/hero-gallery.js) kapselt Hero-Layout, Hero-Slider, Galerie-UI und responsive Bildanpassungen.
- [scripts/site-effects.js](../scripts/site-effects.js) kapselt Scroll-Reveal, Shape-Parallax und den Jahreszaehler.
- [scripts/review-interactions.js](../scripts/review-interactions.js) kapselt das Review-Archiv, Karten-Toggles und die hash-getriebene Oeffnungslogik fuer aeltere Rueckblicke.

Wichtig: Die HTML-Dateien setzen zuerst das kleine Inline-Snippet fuer `history.scrollRestoration` im `head` und laden danach [scripts/core-runtime.js](../scripts/core-runtime.js), [scripts/event-lightbox.js](../scripts/event-lightbox.js), [scripts/cookie-consent.js](../scripts/cookie-consent.js), [scripts/site-language.js](../scripts/site-language.js), [scripts/navigation-mobile.js](../scripts/navigation-mobile.js), [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js), [scripts/navigation-shell.js](../scripts/navigation-shell.js), [scripts/navigation-runtime.js](../scripts/navigation-runtime.js), [scripts/hero-gallery.js](../scripts/hero-gallery.js), [scripts/site-effects.js](../scripts/site-effects.js) und [scripts/review-interactions.js](../scripts/review-interactions.js), weil die spaeteren Runtime-Dateien auf Basisfunktionen aus den frueher geladenen Dateien aufsetzen.

## Wichtige Regeln

- Neue Styles immer zuerst dem fachlich passenden Modul zuordnen.
- [style.css](../style.css) nicht wieder zu einer Sammeldatei ausbauen.
- Gemeinsame Variablen und globale Verhaltensregeln nur in [styles/premium-foundation.css](../styles/premium-foundation.css) pflegen.
- Grossflaechige visuelle Aenderungen immer auf Desktop und Mobile gegenpruefen, weil viele Module eigene responsive Regeln haben.

## Share-Flow

Der Share-Bereich ist absichtlich getrennt von der Hauptseiten-CSS:

- Share-Seiten liegen unter [share](../share).
- Die Vorschau-Layouts nutzen [share/share-preview.css](../share/share-preview.css).
- Der Instagram-Export nutzt [share/instagram-export.html](../share/instagram-export.html), [share/instagram-export.css](../share/instagram-export.css) und [share/instagram-export.js](../share/instagram-export.js).
- Die kanonische Liste der exportierten Share-Seiten steht in [share/share-pages.json](../share/share-pages.json).
- In [share/instagram-export.js](../share/instagram-export.js) existiert zusaetzlich eine Fallback-Liste. Wenn sie erhalten bleibt, muss sie zum Manifest passen.

## Verifizierter Stand

Zum Abschluss der Migration wurde lokal ueber einen HTTP-Server geprueft:

- [index.html](../index.html)
- [chronik.html](../chronik.html)
- [datenschutz.html](../datenschutz.html)
- [impressum.html](../impressum.html)
- [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html)
- [share/instagram-export.html](../share/instagram-export.html)

Dabei wurden sowohl HTTP-Erreichbarkeit als auch Strukturmarker geprueft. Zusaetzlich wurde der Share-Export gegen das Dateisystem abgeglichen, damit [share/share-pages.json](../share/share-pages.json) und die vorhandenen Share-Dateien wieder deckungsgleich sind.

## Abschlussstand 2026-04-09

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
- Der bisherige Navigations-Sammelblock ist jetzt entlang echter Verantwortungen zerlegt: [scripts/site-language.js](../scripts/site-language.js), [scripts/navigation-mobile.js](../scripts/navigation-mobile.js), [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js), [scripts/navigation-shell.js](../scripts/navigation-shell.js) und [scripts/navigation-runtime.js](../scripts/navigation-runtime.js) trennen Sprachzustand, Mobile-Menue, In-Page-Wayfinding, Navbar-/Mbonda-Logik und Orchestrierung.
- Die technische Einordnung und der Abschlussabgleich stehen in [docs/SITE-ASSESSMENT.md](../docs/SITE-ASSESSMENT.md).

## Bewusst offene Grenzen

- Ein vollstaendiger Screenreader- und Geraeteklassen-Check ueber alle Seiten und Zustaende ist noch nicht erfolgt.
- Die grossen Sprachcluster sind vereinheitlicht; die strukturelle Entduplizierung ist jetzt fuer einen Impressum-Block, sieben Datenschutz-Bloecke, breite Chronik-Bereiche und grosse Hauptseiten-Bloecke vom oberen Intro-/About-Bereich bis hinein in Events, Kontakt und Footer umgesetzt, aber noch nicht ueber die gesamte Startseite hinweg abgeschlossen.
- Einige gewachsene Muster in Markup und Runtime sind reduziert, aber nicht vollstaendig entfernt.

## Naechste sinnvolle Schritte

1. Den Generatoransatz von Legal-, Chronik- und Homepage-Bloecken auf weitere grosse Sprachbereiche oder den Share-Flow ausweiten.
2. Vor einer finalen Freigabe einen kurzen manuellen Browser-, Mobile- und Screenreader-Sweep ueber Hauptseite, Chronik, Legal-Seiten und Share-Flow fahren.
3. Fuer den neuen Aktuelles-/Rueckblick-Flow spaeter ein bewusstes UX-/UI-Fine-Tuning einplanen; die konkreten Follow-up-Punkte stehen in [docs/SOCIAL-FEED-ASSESSMENT.md](../docs/SOCIAL-FEED-ASSESSMENT.md).
4. Als naechsten Runtime-Hebel [scripts/hero-gallery.js](../scripts/hero-gallery.js) in Layout-Messung, Slider-Zustand und UI-Sync schneiden, statt dort wieder einen neuen Sammelblock wachsen zu lassen.
5. Die Share-Architektur unter [share](../share) in Richtung strukturierter Quelle plus Generierung weiterziehen, bevor neue Einzel-HTMLs denselben Pflegeaufwand wieder aufbauen.

## Offene Grenze

Technisch ist der Stand sauber validiert. Nicht vollautomatisiert abgedeckt ist nur echte Pixel-/Rendering-QA im Browser. Fuer finale visuelle Freigaben sollte daher immer noch ein kurzer manueller Blick auf Hauptseite, Chronik, Legal-Seiten und neue Share-Seiten erfolgen.

Fuer einen schnellen Release-Check gibt es jetzt die Kurzfassung unter [docs/RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md).
Fuer diesen manuellen Durchgang gibt es jetzt eine kompakte Checkliste unter [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md).