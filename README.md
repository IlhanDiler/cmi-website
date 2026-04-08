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
- [scripts/cookie-consent.js](scripts/cookie-consent.js) kapselt Cookie-Consent-Texte, Mutation-Tracking und den Sprachsync fuer das Cookie-Script.
- [scripts/navigation-language.js](scripts/navigation-language.js) kapselt Navigation, In-Page-Wayfinding, Sprachumschaltung und die zugehoerigen Accessibility-Synchronisierungen.
- [scripts/hero-gallery.js](scripts/hero-gallery.js) kapselt Hero-Layout, Hero-Slider, Galerie-UI und die dazugehoerigen responsive Anpassungen.
- [scripts/site-effects.js](scripts/site-effects.js) kapselt Scroll-Reveal, Shape-Parallax und den Jahreszaehler im Footer.
- [scripts/review-interactions.js](scripts/review-interactions.js) kapselt das Review-Archiv, Karten-Toggles und hash-basierte Aufklapp-Logik fuer aeltere Rueckblicke.

Wichtig fuer die Einbindung:

- Die HTML-Seiten setzen zuerst das kleine Inline-Snippet fuer `history.scrollRestoration` im Dokumentkopf und laden danach [scripts/core-runtime.js](scripts/core-runtime.js), [scripts/event-lightbox.js](scripts/event-lightbox.js), [scripts/cookie-consent.js](scripts/cookie-consent.js), [scripts/navigation-language.js](scripts/navigation-language.js), [scripts/hero-gallery.js](scripts/hero-gallery.js), [scripts/site-effects.js](scripts/site-effects.js) und [scripts/review-interactions.js](scripts/review-interactions.js).
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
4. Bei neuen Share-Seiten immer sowohl Meta-Tags als auch Weiterleitung pruefen.
5. Neue Share-Dateien in [share/share-pages.json](share/share-pages.json) eintragen und bei Bedarf die Fallback-Liste in [share/instagram-export.js](share/instagram-export.js) mitziehen.
6. Lokal immer ueber einen Webserver testen, nicht ueber `file://`, besonders fuer [share/instagram-export.html](share/instagram-export.html).
7. Nach groesseren Aenderungen mindestens Startseite, Chronik, Datenschutz, Impressum und betroffene Share-Seiten kurz ueber HTTP pruefen.
8. Fuer den generierten Rechtsblock in [impressum.html](impressum.html) zuerst [scripts/legal-content.json](scripts/legal-content.json) pflegen und danach [scripts/render-legal-content.py](scripts/render-legal-content.py) ausfuehren.

## Automatischer Quality-Gate

Vor push-basierten Deployments laeuft jetzt ein technischer Mindestcheck ueber [/.github/workflows/site-quality-gate.yaml](.github/workflows/site-quality-gate.yaml).

- Der Workflow prueft Pflichtdateien im Projektroot, den Sync zwischen [share/share-pages.json](share/share-pages.json) und der Fallback-Liste in [share/instagram-export.js](share/instagram-export.js) sowie die browserbasierte Release-Smoke-QA.
- In CI verwendet die Smoke-QA `QA_BROWSER_TARGETS=chromium,firefox`, damit der Check ohne lokal installierte Edge- oder Chrome-Kanaele reproduzierbar laeuft.
- Der IONOS-Orchestrator in [/.github/workflows/cmi-website-orchestration.yaml](.github/workflows/cmi-website-orchestration.yaml) reagiert bei Pushes nur noch auf erfolgreiche Runs dieses Gates; manuelle Deploys bleiben weiter moeglich.

## Social Share Links

Diese Website ist im Kern eine Single-Page-Website. Social-Media-Plattformen wie WhatsApp, Facebook, LinkedIn oder X lesen fuer Link-Vorschaubilder jedoch nicht den sichtbaren SPA-Zustand, sondern nur das HTML der aufgerufenen URL.

Darum gibt es fuer teilbare Inhalte eigene Share-Seiten im Ordner [share](share):

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
2. Eine neue Datei im Ordner [share](share) anlegen.
3. In der Share-Datei passende Meta-Tags setzen:
	`og:title`, `og:description`, `og:image`, `og:url`, `twitter:*`
4. Fuer Bilder immer absolute URLs wie `https://www.cmi-ochsenfurt.de/bilder/...` verwenden.
5. Die Weiterleitung auf den Zielabschnitt der Startseite setzen.
6. Zum Gestalten die gemeinsame CSS-Datei [share/share-preview.css](share/share-preview.css) verwenden.
7. Den Dateinamen in [share/share-pages.json](share/share-pages.json) eintragen, damit der Instagram-Export den Beitrag automatisch findet.
8. `og:image` und `twitter:image` direkt auf das vorhandene Hauptbild der Share-Seite zeigen lassen.
9. Optional kann fuer Social-Posts lokal `share/generate-share-preview-images.ps1` ausgefuehrt werden, ohne die erzeugten Dateien mit zu deployen.
10. Wenn fuer [share/instagram-export.js](share/instagram-export.js) an der Fallback-Liste gearbeitet wird, muss sie mit [share/share-pages.json](share/share-pages.json) synchron bleiben.

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
- Die Liste der beruecksichtigten Share-Seiten kommt aus [share/share-pages.json](share/share-pages.json).
- Falls das Manifest nicht geladen werden kann, nutzt [share/instagram-export.js](share/instagram-export.js) die eingebaute Fallback-Liste `FALLBACK_SHARE_PAGES`.
- Fuer jeden Beitrag gibt es eine sofort nutzbare Instagram-Caption, einen separaten Link-Button, einen Direktzugriff auf das Bild sowie PNG-Exporte fuer Feed im Format 4:5 und Story im Format 9:16.
- Zusaetzlich kann die komplette Liste als JSON kopiert werden, falls spaeter ein Planungs- oder Automatisierungs-Tool angebunden wird.

Pflegehinweis:

- Neue Share-Seiten immer zuerst in [share/share-pages.json](share/share-pages.json) eintragen.
- Wenn die Fallback-Liste in [share/instagram-export.js](share/instagram-export.js) bewusst beibehalten wird, muss derselbe Dateiname dort ebenfalls eingetragen werden.

Empfohlener Ablauf:

1. Export-Seite oeffnen.
2. Beitrag auswaehlen.
3. 4:5-PNG fuer den Feed oder 9:16-PNG fuer Stories exportieren, alternativ das Bild direkt oeffnen.
4. Caption in Instagram oder Meta Business Suite einfuegen.
5. Share-Link separat in Bio, Story oder eine Link-Sammlung uebernehmen.

Hinweis: Die Export-Seite funktioniert ueber HTTP/HTTPS, also auf der deployed Website oder ueber einen lokalen Webserver. Direktes Oeffnen per `file://` blockiert die notwendigen `fetch`-Aufrufe im Browser. Die PNG-Exporte sind auf der live Website am verlaesslichsten, weil Browser lokale Cross-Origin-Bildquellen oft fuer Canvas blockieren.