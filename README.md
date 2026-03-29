# cmi-webseite

## Social Share Links

Diese Website ist im Kern eine Single-Page-Website. Social-Media-Plattformen wie WhatsApp, Facebook, LinkedIn oder X lesen fuer Link-Vorschaubilder jedoch nicht den sichtbaren SPA-Zustand, sondern nur das HTML der aufgerufenen URL.

Darum gibt es fuer teilbare Inhalte eigene Share-Seiten im Ordner [share](share):

- Jede Share-Seite hat eigene `og:*`- und `twitter:*`-Meta-Tags.
- Jede Share-Seite zeigt eine kleine gebrandete Zwischenansicht.
- Danach erfolgt eine automatische Weiterleitung auf den passenden Abschnitt der Startseite per Anker-Link.

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

## Wichtige Hinweise

- Gepostet werden sollte immer die Share-URL, nicht nur ein Hash-Link wie `/#review-...`.
- Das Vorschaubild sollte moeglichst gross sein, idealerweise im Bereich `1200x630`.
- Manche Plattformen cachen Vorschauen. Nach Aenderungen muss der Link dort eventuell neu eingelesen werden.

Hilfreiche Tools zum Aktualisieren der Vorschau:

- Facebook Sharing Debugger
- LinkedIn Post Inspector
- Direkter Test ueber Messenger oder Social-App

## Instagram-Workflow

Instagram unterstuetzt keinen sauberen Direktimport von normalen Website-Inhalten. Darum gibt es fuer die bestehende Share-Struktur eine interne Export-Seite unter [share/instagram-export.html](share/instagram-export.html).

- Die Export-Seite liest Bild, Titel, Kurztext und Share-Link direkt aus den vorhandenen Share-Seiten.
- Die Liste der beruecksichtigten Share-Seiten kommt aus [share/share-pages.json](share/share-pages.json).
- Fuer jeden Beitrag gibt es eine sofort nutzbare Instagram-Caption, einen separaten Link-Button, einen Direktzugriff auf das Bild sowie PNG-Exporte fuer Feed im Format 4:5 und Story im Format 9:16.
- Zusaetzlich kann die komplette Liste als JSON kopiert werden, falls spaeter ein Planungs- oder Automatisierungs-Tool angebunden wird.

Empfohlener Ablauf:

1. Export-Seite oeffnen.
2. Beitrag auswaehlen.
3. 4:5-PNG fuer den Feed oder 9:16-PNG fuer Stories exportieren, alternativ das Bild direkt oeffnen.
4. Caption in Instagram oder Meta Business Suite einfuegen.
5. Share-Link separat in Bio, Story oder eine Link-Sammlung uebernehmen.

Hinweis: Die Export-Seite funktioniert ueber HTTP/HTTPS, also auf der deployed Website oder ueber einen lokalen Webserver. Direktes Oeffnen per `file://` blockiert die notwendigen `fetch`-Aufrufe im Browser. Die PNG-Exporte sind auf der live Website am verlaesslichsten, weil Browser lokale Cross-Origin-Bildquellen oft fuer Canvas blockieren.