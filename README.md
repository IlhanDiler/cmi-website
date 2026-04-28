# cmi-webseite

## CSS-Architektur

Eine kurze Entwickler-Uebergabe zur finalen Struktur liegt auch in [docs/FRONTEND-HANDOFF.md](docs/FRONTEND-HANDOFF.md).
Eine zusammenfassende qualitative und technische Einordnung der Website liegt in [docs/SITE-ASSESSMENT.md](docs/SITE-ASSESSMENT.md).
Der abgeschlossene erste Arbeitsblock steht in [docs/FOUR-WEEK-PLAN.md](docs/FOUR-WEEK-PLAN.md), der Folgeplan Richtung 10/10 in [docs/FOUR-WEEK-PLAN-10-10.md](docs/FOUR-WEEK-PLAN-10-10.md).

Die Haupt-CSS ist nicht mehr eine einzelne grosse Datei, sondern modular aufgebaut:

- [style.css](style.css) ist der einzige Einstiegspunkt und importiert nur die Teilmodule.
- [styles/premium-foundation.css](styles/premium-foundation.css) enthaelt Design-Tokens, globale Typografie, Utilities und gemeinsame Basisregeln.
- Die eigentlichen Seitenteile liegen unter [styles/components](styles/components), zum Beispiel fuer Navigation, Hero, Events, Review, Music Family, Footer sowie Subpages und Legal-Seiten.

## JavaScript-Architektur

Das Frontend-JavaScript ist jetzt ebenfalls fachlich aufgeteilt:

- Ein kleines Inline-Snippet in den HTML-Koepfen setzt frueh `history.scrollRestoration = 'manual'`, damit Reloads und History-Navigation nicht gegen die spaetere Runtime-Steuerung arbeiten.
- [scripts/core-runtime.js](scripts/core-runtime.js) kapselt Scroll-/Load-Verhalten, Sprach-Fallback und die zentrale Runtime-Initialisierung.
- [scripts/event-lightbox.js](scripts/event-lightbox.js) kapselt die Event-Lightbox inklusive Caption-Ableitung, Fokus-Rueckgabe und Keyboard-/Overlay-Schliessen.
- [scripts/cookie-consent-content.js](scripts/cookie-consent-content.js) kapselt die mehrsprachige Consent-Copy und die Tabellenlabels des eingebundenen Cookie-Scripts.
- [scripts/cookie-consent.js](scripts/cookie-consent.js) kapselt den session-aware Vendor-Loader, Mutation-Tracking, Sprachsync und das persistente Ablehnen optionaler Cookies beim Schliessen des eingebundenen Cookie-Scripts.
- [scripts/site-language-variants.js](scripts/site-language-variants.js) kapselt Sprach-Fallbacks, `data-lang`-Variantengruppen und den `lang`-Attribut-Sync.
- [scripts/site-language-accessibility.js](scripts/site-language-accessibility.js) kapselt Navigationslabels, Link-/Share-Labels und den statischen Accessibility-Sync.
- [scripts/site-language.js](scripts/site-language.js) kapselt nur noch die Orchestrierung der Sprachmodule und den oeffentlichen Einstieg `setLang(...)`.
- [scripts/navigation-mobile.js](scripts/navigation-mobile.js) kapselt Mobile-Menue, Fokus-Falle und Close-/Restore-Focus-Logik.
- [scripts/navigation-wayfinding.js](scripts/navigation-wayfinding.js) kapselt In-Page-Wayfinding, Hash-Navigation und Active-State-Sync.
- [scripts/navigation-shell.js](scripts/navigation-shell.js) kapselt Navbar-Scrollzustand und den Mbonda-Timeline-Sonderfall.
- [scripts/navigation-runtime.js](scripts/navigation-runtime.js) kapselt nur noch die Orchestrierung dieser Navigationsmodule.
- [scripts/hero-layout.js](scripts/hero-layout.js) kapselt Hero-Layout-Messung und responsive Sonderfaelle wie das Christmette-Bild.
- [scripts/hero-gallery.js](scripts/hero-gallery.js) kapselt Galerie-Daten, Slider-Zustand, Crossfade, Autoplay und Initialisierung.
- [scripts/hero-gallery-ui.js](scripts/hero-gallery-ui.js) kapselt Galerie-Labels, Accessibility-Sync, Caption/Counter-UI und Dot-Navigation.
- [scripts/site-effects.js](scripts/site-effects.js) kapselt Scroll-Reveal, Shape-Parallax und den Jahreszaehler im Footer.
- [scripts/review-navigation.js](scripts/review-navigation.js) kapselt Review-Hash-/History-Navigation, Ruecksprung-Logik und die Sprach-Labels der dynamisch erzeugten Review-Steuerelemente.
- [scripts/review-archive.js](scripts/review-archive.js) kapselt Review-Archiv, Karten-Toggles und hash-basierte Aufklapp-Logik fuer aeltere Rueckblicke.
- [scripts/review-interactions.js](scripts/review-interactions.js) kapselt nur noch die Orchestrierung der Review-Module.

Wichtig fuer die Einbindung:

- Die HTML-Seiten setzen zuerst das kleine Inline-Snippet fuer `history.scrollRestoration` im Dokumentkopf und laden danach [scripts/core-runtime.js](scripts/core-runtime.js), [scripts/event-lightbox.js](scripts/event-lightbox.js), [scripts/cookie-consent-content.js](scripts/cookie-consent-content.js), [scripts/cookie-consent.js](scripts/cookie-consent.js), [scripts/site-language-variants.js](scripts/site-language-variants.js), [scripts/site-language-accessibility.js](scripts/site-language-accessibility.js), [scripts/site-language.js](scripts/site-language.js), [scripts/navigation-mobile.js](scripts/navigation-mobile.js), [scripts/navigation-wayfinding.js](scripts/navigation-wayfinding.js), [scripts/navigation-shell.js](scripts/navigation-shell.js), [scripts/navigation-runtime.js](scripts/navigation-runtime.js), [scripts/hero-layout.js](scripts/hero-layout.js), [scripts/hero-gallery.js](scripts/hero-gallery.js), [scripts/hero-gallery-ui.js](scripts/hero-gallery-ui.js), [scripts/site-effects.js](scripts/site-effects.js), [scripts/review-navigation.js](scripts/review-navigation.js), [scripts/review-archive.js](scripts/review-archive.js) und [scripts/review-interactions.js](scripts/review-interactions.js).
- Die Reihenfolge ist relevant, weil die spaeteren Runtime-Dateien Basisfunktionen aus den frueher geladenen Dateien verwenden.

Aktuelle Modulaufteilung:

- [styles/components/navigation.css](styles/components/navigation.css): Hauptnavigation, Mobile-Menue, Subpage-Topbar
- [styles/components/hero.css](styles/components/hero.css): Hero-Bereich und Gallery-UI
- [styles/components/image-caption.css](styles/components/image-caption.css): Intro- und Bild/Text-Bereich
- [styles/components/about-me.css](styles/components/about-me.css): Ueber-mich-Bereich
- [styles/components/events.css](styles/components/events.css): Event-Karten und Poster/Share-Aktionen
- [styles/components/review.css](styles/components/review.css): Rueckblicke und Review-Archive
- [styles/components/music-family.css](styles/components/music-family.css): Music Family / Anfaengergruppe
- [styles/components/repertoire.css](styles/components/repertoire.css): Repertoire und Engagement
- [styles/components/contact.css](styles/components/contact.css): Kontaktbereich
- [styles/components/footer.css](styles/components/footer.css): Footer
- [styles/components/timeline.css](styles/components/timeline.css): Chronik / Timeline
- [styles/components/subpages.css](styles/components/subpages.css): generische Subpage-Struktur
- [styles/components/legal.css](styles/components/legal.css): Datenschutz und Impressum

Wichtig:

- Neue oder groessere Style-Aenderungen moeglichst im passenden Modul machen, nicht gesammelt in [style.css](style.css).
- [style.css](style.css) sollte nur Importe enthalten.
- Die fruehere Legacy-Datei wurde entfernt; neue Regeln sollten nicht wieder als Sammelrest ausserhalb der Module aufgebaut werden.

## Pflege-Checkliste

Fuer normale Inhalts- oder Styling-Aenderungen reicht diese kurze Reihenfolge:

1. HTML im passenden Dokument anpassen, zum Beispiel [index.html](index.html), [chronik.html](chronik.html) oder eine Datei unter [share](share).
2. CSS nur im zustaendigen Modul unter [styles/components](styles/components) aendern; gemeinsame Tokens nur in [styles/premium-foundation.css](styles/premium-foundation.css).
3. Keine neuen Sammelregeln in [style.css](style.css) ablegen; die Datei bleibt der Import-Einstiegspunkt.
4. Bei neuen oder geaenderten Share-Seiten zuerst [share/share-pages-data.json](share/share-pages-data.json) pflegen; Meta-Tags, Copy und Weiterleitung werden daraus erzeugt.
5. Danach [share/generate-share-pages.py](share/generate-share-pages.py) ausfuehren; das aktualisiert die Share-HTMLs, [share/share-pages.json](share/share-pages.json) und die Fallback-Liste in [share/instagram-export.js](share/instagram-export.js).
6. Lokal immer ueber einen Webserver testen, nicht ueber `file://`, besonders fuer [share/instagram-export.html](share/instagram-export.html).
7. Nach groesseren Aenderungen mindestens Startseite, Chronik, Datenschutz, Impressum und betroffene Share-Seiten kurz ueber HTTP pruefen.
8. Fuer generierte Inhaltsbloecke in [index.html](index.html), [impressum.html](impressum.html), [datenschutz.html](datenschutz.html) und [chronik.html](chronik.html) zuerst die passende Quelle in [scripts/legal-content.json](scripts/legal-content.json) oder unter [scripts/legal-content](scripts/legal-content) pflegen und danach [scripts/render-legal-content.py](scripts/render-legal-content.py) ausfuehren.

## Automatischer Quality-Gate

Vor push-basierten Deployments laeuft jetzt ein technischer Mindestcheck ueber [/.github/workflows/site-quality-gate.yaml](.github/workflows/site-quality-gate.yaml).

- Der Workflow prueft Pflichtdateien im Projektroot, den Sync zwischen [share/share-pages.json](share/share-pages.json) und der Fallback-Liste in [share/instagram-export.js](share/instagram-export.js) sowie die browserbasierte Release-Smoke-QA.
- In CI verwendet die Smoke-QA `QA_BROWSER_TARGETS=chromium,firefox`, damit der Check ohne lokal installierte Edge- oder Chrome-Kanaele reproduzierbar laeuft.
- Der IONOS-Orchestrator in [/.github/workflows/cmi-website-orchestration.yaml](.github/workflows/cmi-website-orchestration.yaml) reagiert bei Pushes nur noch auf erfolgreiche Runs dieses Gates; manuelle Deploys bleiben weiter moeglich.

## Social Share Links

Diese Website ist im Kern eine Single-Page-Website. Social-Media-Plattformen wie WhatsApp, Facebook, LinkedIn oder X lesen fuer Link-Vorschaubilder jedoch nicht den sichtbaren SPA-Zustand, sondern nur das HTML der aufgerufenen URL.

Darum gibt es fuer teilbare Inhalte eigene Share-Seiten im Ordner [share](share):

- Die Share-HTMLs werden aus [share/share-pages-data.json](share/share-pages-data.json) via [share/generate-share-pages.py](share/generate-share-pages.py) erzeugt.
- Jede Share-Seite hat eigene `og:*`- und `twitter:*`-Meta-Tags.
- Jede Share-Seite zeigt eine kleine gebrandete Zwischenansicht.
- Danach erfolgt eine automatische Weiterleitung auf den passenden Abschnitt der Startseite per Anker-Link.
- Die Link-Vorschau nutzt direkt das jeweilige Originalbild aus `bilder/`, damit keine zusaetzlichen PNG-Ablagen auf dem Server noetig sind.

Beispiele:

- [share/masterclass-florian-meierott.html](share/masterclass-florian-meierott.html)
- [share/christmette-2025.html](share/christmette-2025.html)
- [share/neujahrskonzert-2025.html](share/neujahrskonzert-2025.html)

## Neue Share-Seite anlegen

Wenn ein neuer Rueckblick oder Event gezielt teilbar sein soll:

1. Dem Zielabschnitt in [index.html](index.html) eine stabile `id` geben.
2. In [share/share-pages-data.json](share/share-pages-data.json) einen neuen Eintrag mit `filename`, `variant`, Meta-Daten, Bild-URLs, Button-Text und `redirect_url` anlegen.
3. Fuer Bilder weiterhin absolute Produktions-URLs wie `https://www.cmi-ochsenfurt.de/bilder/...` verwenden.
4. [share/generate-share-pages.py](share/generate-share-pages.py) ausfuehren; dadurch werden die einzelnen Share-HTMLs sowie [share/share-pages.json](share/share-pages.json) und die Fallback-Liste in [share/instagram-export.js](share/instagram-export.js) neu erzeugt.
5. Generierte Share-HTMLs unter [share](share) nicht manuell nachpflegen.
6. Zum Gestalten die gemeinsame CSS-Datei [share/share-preview.css](share/share-preview.css) verwenden.
7. `og:image` und `twitter:image` direkt auf das vorhandene Hauptbild der Share-Seite zeigen lassen.
8. Optional kann fuer Social-Posts lokal `share/generate-share-preview-images.ps1` ausgefuehrt werden, ohne die erzeugten Dateien mit zu deployen.

## Wichtige Hinweise

- Gepostet werden sollte immer die Share-URL, nicht nur ein Hash-Link wie `/#review-...`.
- Das Vorschaubild fuer Link-Previews sollte moeglichst gross sein, idealerweise im Bereich `1200x630`.
- Es werden keine generierten Vorschaubilder mehr auf dem Server vorgehalten; Link-Vorschauen verwenden die bestehenden Bilder aus `bilder/`.
- Falls lokal Status- oder Social-Bilder erzeugt werden, liegen sie unter `share/preview-images/` und `share/status-images/`, sind aber nicht fuer das Deployment gedacht.
- Die Statusbilder werden nicht automatisch als Link-Vorschau genutzt, sondern sind nur fuer manuelles Posten im Status gedacht.
- Manche Plattformen cachen Vorschauen. Nach Aenderungen muss der Link dort eventuell neu eingelesen werden.

Hilfreiche Tools zum Aktualisieren der Vorschau:

- Facebook Sharing Debugger
- LinkedIn Post Inspector
- Direkter Test ueber Messenger oder Social-App

## Instagram-Workflow

Instagram unterstuetzt keinen sauberen Direktimport von normalen Website-Inhalten. Darum gibt es fuer die bestehende Share-Struktur eine interne Export-Seite unter [share/instagram-export.html](share/instagram-export.html).

- Die Export-Seite liest Bild, Titel, Kurztext und Share-Link direkt aus den vorhandenen Share-Seiten.
- Die Liste der beruecksichtigten Share-Seiten kommt aus [share/share-pages.json](share/share-pages.json), das aus [share/share-pages-data.json](share/share-pages-data.json) generiert wird.
- Falls das Manifest nicht geladen werden kann, nutzt [share/instagram-export.js](share/instagram-export.js) die eingebaute Fallback-Liste `FALLBACK_SHARE_PAGES`, die derselbe Generator-Schritt mitsynchronisiert.
- Fuer jeden Beitrag gibt es eine sofort nutzbare Instagram-Caption, einen separaten Link-Button, einen Direktzugriff auf das Bild sowie PNG-Exporte fuer Feed im Format 4:5 und Story im Format 9:16.
- Zusaetzlich kann die komplette Liste als JSON kopiert werden, falls spaeter ein Planungs- oder Automatisierungs-Tool angebunden wird.

Pflegehinweis:

- Neue oder geaenderte Share-Seiten immer zuerst in [share/share-pages-data.json](share/share-pages-data.json) pflegen.
- Danach [share/generate-share-pages.py](share/generate-share-pages.py) ausfuehren, damit HTML, Manifest und Fallback-Liste denselben Datenstand behalten.

Empfohlener Ablauf:

1. Export-Seite oeffnen.
2. Beitrag auswaehlen.
3. 4:5-PNG fuer den Feed oder 9:16-PNG fuer Stories exportieren, alternativ das Bild direkt oeffnen.
4. Caption in Instagram oder Meta Business Suite einfuegen.
5. Share-Link separat in Bio, Story oder eine Link-Sammlung uebernehmen.

Hinweis: Die Export-Seite funktioniert ueber HTTP/HTTPS, also auf der deployed Website oder ueber einen lokalen Webserver. Direktes Oeffnen per `file://` blockiert die notwendigen `fetch`-Aufrufe im Browser. Die PNG-Exporte sind auf der live Website am verlaesslichsten, weil Browser lokale Cross-Origin-Bildquellen oft fuer Canvas blockieren.

Lokale Vorschau ueber Datei-Aufruf:

- Wenn [index.html](index.html) direkt per `file://` geoeffnet wird, schreiben die Instagram-Buttons automatisch auf den lokalen Preview-Host `http://127.0.0.1:8123` um.
- Falls ein anderer lokaler Host oder Port verwendet wird, kann im Browser einmalig `localStorage.sitePreviewOrigin = 'http://127.0.0.1:8010'` gesetzt werden; danach nutzen die Instagram-Buttons diesen Ursprung fuer die Export-Seite.