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

## Offene Grenze

Technisch ist der Stand sauber validiert. Nicht vollautomatisiert abgedeckt ist nur echte Pixel-/Rendering-QA im Browser. Fuer finale visuelle Freigaben sollte daher immer noch ein kurzer manueller Blick auf Hauptseite, Chronik, Legal-Seiten und neue Share-Seiten erfolgen.