# Responsive UX/UI Findings

Stand: 2026-04-10

## Zweck

Diese Fundliste uebersetzt den Folgeplan aus [docs/RESPONSIVE-UX-UI-10-10-PLAN.md](../docs/RESPONSIVE-UX-UI-10-10-PLAN.md) in konkrete Arbeitsobjekte. Sie ist bewusst knapp gehalten und soll zuerst die groessten Hebel fuer Responsive-Verhalten, Flow-Ruhe und visuelle Prioritaet festhalten.

## Priorisierte Funde

### 1. `high` - Rueckweg im Aktuelles-/Rueckblick-Flow war dauerhaft sichtbar

- Bereich: Hauptseite, Aktuelles -> Rueckblick-Detail
- Evidenz: [docs/SOCIAL-FEED-ASSESSMENT.md](../docs/SOCIAL-FEED-ASSESSMENT.md), [scripts/review-navigation.js](../scripts/review-navigation.js), [styles/components/review.css](../styles/components/review.css)
- Problem: Der Rueck-Link im Review-Detail wurde fuer alle Review-Sektionen erzeugt und blieb auch bei direkten Deep-Links oder normalen Hash-Spruengen sichtbar. Dadurch war der Rueckweg funktional doppelt abgesichert, aber visuell unruhiger als noetig.
- UX-Wirkung: Besucher sehen im Detailbereich einen Rueckweg auch dann, wenn sie nicht ueber den Aktuelles-Block eingestiegen sind. Das verwischt die Informationshierarchie und macht den Flow weniger bewusst.
- Schwierigkeit: niedrig bis mittel
- Status: am 2026-04-10 als erster Folgeblock-Fix umgesetzt; der Rueck-Link ist jetzt nur noch sichtbar, wenn der Einstieg wirklich aus dem Aktuelles-Flow kommt.

### 2. `medium` - Mobile Hauptnavigation bleibt auf sehr schmalen Viewports dicht gepackt

- Bereich: globale Navigation auf der Hauptseite
- Evidenz: [styles/components/navigation.css](../styles/components/navigation.css)
- Problem: Die Mobile-Navbar bleibt dreispaltig aufgebaut, waehrend `brand-main` und `brand-sub` nicht umbrechen. Das ist technisch stabil, aber die Dichte bleibt auf sehr schmalen Geraeten und bei langen Sprachvarianten knapp.
- UX-Wirkung: Orientierung und Ruhe im Einstieg leiden zuerst genau dort, wo Besucher die Seite betreten.
- Schwierigkeit: niedrig
- Status: am 2026-04-10 im Bereich 601 bis 760 px beruhigt; Brand steht dort jetzt als eigene erste Zeile, der Untertitel faellt weg und Menue plus Sprachschalter teilen sich eine ruhigere zweite Zeile. Der ultra-kompakte Modus unter 600 px bleibt separat bestehen.

### 3. `medium` - Hero-Galerie kippt auf Mobile hart von `cover` auf `contain`

- Bereich: Hero / Einstiegszone der Hauptseite
- Evidenz: [scripts/hero-gallery.js](../scripts/hero-gallery.js)
- Problem: Unter 700 px wird fuer alle Slides pauschal `background-size: contain` gesetzt. Das verhindert zwar aggressiven Beschnitt, schwankt aber deutlich in Bildgewicht, Leeraum und Komposition.
- UX-Wirkung: Die Hero-Zone verliert auf Mobile schneller Wertigkeit und fuehlt sich je nach Motiv uneinheitlich an.
- Schwierigkeit: mittel
- Status: am 2026-04-10 auf motivschaerferes Mobile-Verhalten umgestellt; breite Gruppen- und Panorama-Motive bleiben `contain`, die kompakteren Hero-Motive laufen auf Mobile wieder mit `cover`.

### 4. `medium` - Subpage-Topbar bleibt unter schmalem Reflow funktional, aber visuell noch zu gleichgewichtig

- Bereich: Chronik, Datenschutz, Impressum
- Evidenz: [styles/components/navigation.css](../styles/components/navigation.css), [chronik.html](../chronik.html), [datenschutz.html](../datenschutz.html), [impressum.html](../impressum.html)
- Problem: Brand, Seitennavigation und Sprachwechsel teilen sich in der Sticky-Topbar auf kleinen Breiten fast dieselbe visuelle Prioritaet. Die Umbrueche bei 900 px, 760 px und 600 px sind solide, wirken aber noch nicht wie ein wirklich beruhigtes System.
- UX-Wirkung: Rechtliche und chronologische Subpages wirken dadurch schneller wie Werkzeugleisten statt wie ruhige Leseflaechen.
- Schwierigkeit: mittel
- Status: am 2026-04-10 im schmalen Reflow beruhigt; die Linkgruppe ist jetzt die klare Hauptzeile, der Sprachwechsel sitzt als kleinere Folgeaktion darunter und der Brand-Subtitle faellt im kleinsten Modus weg.

### 5. `medium` - Review-Archiv-Toggle wird in offenen mobilen Zustaenden fix am unteren Viewport verankert

- Bereich: Rueckblick / Archiv auf Mobile und mittleren Hoehen
- Evidenz: [styles/components/review.css](../styles/components/review.css)
- Problem: Der Archiv-Toggle wird im offenen Zustand mehrfach als `position: fixed` an den unteren Bildschirmrand gelegt. Das ist funktional absichtlich, muss aber gegen Browser-Chrome, Touch-Komfort und konkurrierende Aktionen nochmals ruhig geprueft werden.
- UX-Wirkung: Kann sich auf kleineren Hoehen wie ein eingeblendeter Fremd-CTA anfuehlen statt wie eine kontrollierte Archivsteuerung.
- Schwierigkeit: mittel
- Status: offen

### 6. `medium` - Share-/Export-Flow ist in der Kartendichte noch arbeitsstark statt ruhig priorisiert

- Bereich: [share/instagram-export.html](../share/instagram-export.html)
- Evidenz: [share/instagram-export.html](../share/instagram-export.html)
- Problem: Jede Export-Karte kombiniert Bild, Feed-Vorschau, Story-Vorschau, Caption-Feld und sechs Aktionen. Das ist fuer das interne Tool funktional stark, aber in der visuellen Priorisierung noch dicht.
- UX-Wirkung: Auf schmalen Viewports entsteht schneller eine Arbeitsflaeche mit hoher Interaktionsdichte statt ein klar gefuehrter Export-Flow.
- Schwierigkeit: mittel
- Status: offen

### 7. `low` - Section-CTA und Karten-CTA im Aktuelles-Block koennen noch klarer gewichtet werden

- Bereich: Aktuelles / News-Feed
- Evidenz: [styles/components/review.css](../styles/components/review.css), [index.html](../index.html)
- Problem: Der Uebersichts-Link auf Section-Ebene und die Karten-CTAs sind stilistisch nah beieinander. Das ist nicht kaputt, aber noch nicht maximal klar priorisiert.
- UX-Wirkung: Die naechste sinnvolle Aktion aus Besuchersicht ist etwas weniger eindeutig als moeglich.
- Schwierigkeit: niedrig
- Status: offen

## Naechster Fokus

Die naechsten zwei sinnvollen Arbeitsschritte nach dem ersten Rueckweg-Fix sind:

1. Review-Archiv-Toggle im mobilen offenen Zustand auf Touch-Ruhe und Konkurrenz zu anderen Aktionen pruefen.
2. CTA-Gewichtung im Aktuelles-Block zwischen Section-Link und Karten-CTAs nachziehen.