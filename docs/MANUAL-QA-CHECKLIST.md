# Manual QA Checklist

## Ziel

Diese Checkliste deckt die manuelle Browser-QA nach der Aufteilung der JavaScript-Runtime ab. Sie ist als kurzer Regression-Check fuer die Hauptseite und die wichtigsten Subpages gedacht.

Wenn nur eine schnelle Freigabe noetig ist, zuerst die Kurzfassung unter [docs/RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md) verwenden.

## Test-Setup

- Seite ueber HTTP ausliefern, zum Beispiel mit `python -m http.server 8123` aus dem Projektwurzelverzeichnis.
- Einmal hart neu laden, falls der Browser noch alte Asset-Versionen im Cache haelt.
- Mindestens zwei Viewports pruefen: Desktop ab ca. 1280 px Breite und Mobile um ca. 390 px Breite.
- Wenn moeglich mindestens in Chromium/Edge pruefen; fuer finale Freigaben zusaetzlich Safari oder Firefox einbeziehen.
- Fuer den automatisierten Vorfilter kann `tmp/visual-qa/release_qa_smoke.py` optional mit `QA_BROWSER_TARGETS=msedge,chrome,firefox` in einer kleinen Browser-Matrix laufen.

## Seiten-Smoketest

- [ ] [index.html](../index.html) laedt ohne sichtbare Layout-Brueche.
- [ ] [chronik.html](../chronik.html) laedt ohne ueberlappende Topbar oder abgeschnittene Timeline.
- [ ] [datenschutz.html](../datenschutz.html) laedt ohne Layoutfehler oder versetzte Ueberschriften.
- [ ] [impressum.html](../impressum.html) laedt ohne Layoutfehler oder versetzte Ueberschriften.
- [ ] Optional eine Share-Seite wie [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html) kurz visuell gegenpruefen.

## Load- und Scroll-Verhalten

- [ ] Hauptseite ohne Hash aufrufen, neu laden und pruefen, dass die Seite oben startet.
- [ ] Eine Hash-URL wie `index.html#review` aufrufen und pruefen, dass der Zielbereich erreichbar bleibt.
- [ ] Nach Reload mit Hash pruefen, dass kein Scroll-Flackern oder Sprungloop auftritt.
- [ ] Zwischen Hauptseite und Subpages wechseln und pruefen, dass keine unerwartete Scroll-Position erhalten bleibt.

## Navigation und Sprache

- [ ] Desktop-Navigation auf der Hauptseite pruefen: Links scrollen in die passenden Sektionen.
- [ ] Mobile Menue pruefen: Oeffnen, Schliessen, erneutes Oeffnen, keine festhaengende Overlay-Situation.
- [ ] Sprachumschaltung pruefen: Navigation, Tagline und Abschnittslabels wechseln sichtbar.
- [ ] Sprachzustand pruefen: Nach Wechsel auf eine Subpage und zurueck bleibt die gewaehlt Sprache erhalten.
- [ ] Subpage-Topbar pruefen: Labels und Links bleiben auch nach Sprachwechsel korrekt.

## Hero-Gallery

- [ ] Erste Hero-Folie erscheint ohne sichtbaren Layoutsprung.
- [ ] Prev/Next-Buttons wechseln die Slides sauber.
- [ ] Dots wechseln die aktive Folie und aktualisieren den aktiven Zustand.
- [ ] Caption passt zur aktuellen Sprache.
- [ ] Autoplay wechselt nach kurzer Wartezeit weiter.
- [ ] Auf Mobile per Swipe pruefen, dass die Galerie vor und zurueck schaltet.

## Event-Lightbox

- [ ] Ein Event-Bild oder Poster auf der Hauptseite oeffnen.
- [ ] Titel und Meta in der Lightbox werden aus dem sichtbaren Event-Inhalt korrekt uebernommen.
- [ ] Schliessen per Close-Button funktioniert.
- [ ] Schliessen per `Escape` funktioniert.
- [ ] Schliessen per Overlay-Klick funktioniert.
- [ ] Nach dem Schliessen springt der Fokus zur ausloesenden Karte bzw. zum Trigger zurueck.
- [ ] Lightbox in mindestens einer zweiten Sprache gegenpruefen.

## Review und Archiv

- [ ] Review-Archiv oeffnen und schliessen.
- [ ] Einzelne Review-Karten auf- und zuklappen.
- [ ] Hash-basierte Oeffnung eines Review-Ziels pruefen, falls ein direkter Link auf einen Rueckblick genutzt wird.
- [ ] Nach Sprachwechsel pruefen, dass Review-Interaktionen weiter funktionieren.

## Cookie-Consent und Footer

- [ ] Wenn das Cookie-Banner sichtbar ist: Sprache wechseln und pruefen, dass Texte und Buttons nachziehen.
- [ ] Footer-Jahreszaehler zeigt das aktuelle Jahr minus 1981 an.
- [ ] Datenschutz- und Impressumsseite behalten nach Sprachwechsel ihre korrekte Struktur.

## Scroll-Reveal und Bewegungsdetails

- [ ] Cards mit Reveal-Effekt erscheinen beim Scrollen sichtbar und nur einmal.
- [ ] Hintergrundformen bewegen sich subtil und ueberlagern keine Inhalte.
- [ ] Zwischen Desktop- und Mobile-Breite wechseln und pruefen, dass keine Hero- oder Shape-Artefakte sichtbar bleiben.

## Abschluss

- [ ] Browser-Konsole auf der Hauptseite einmal kurz auf neue Fehler pruefen.
- [ ] Wenn Screenshots fuer die Freigabe gebraucht werden, mindestens Hauptseite, Chronik und eine Legal-Seite erfassen.