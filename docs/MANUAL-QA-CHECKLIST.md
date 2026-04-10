# Manual QA Checklist

## Ziel

Diese Checkliste deckt die manuelle Browser-, Geraete- und Accessibility-QA nach der Aufteilung der JavaScript-Runtime ab. Sie ist als strukturierter Regression-Check fuer die Hauptseite und die wichtigsten Subpages gedacht.

Wenn nur eine schnelle Freigabe noetig ist, zuerst die Kurzfassung unter [docs/RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md) verwenden.

Fuer den naechsten breiten manuellen Sweep ueber [index.html](../index.html), [chronik.html](../chronik.html), [datenschutz.html](../datenschutz.html), [impressum.html](../impressum.html), eine Share-Seite und [share/instagram-export.html](../share/instagram-export.html) steht zusaetzlich [docs/ACCESSIBILITY-SWEEP-PLAN.md](./ACCESSIBILITY-SWEEP-PLAN.md) bereit. Die Datei ist als operator-tauglicher Laufzettel mit Reihenfolge, Matrix und Ergebnisbloecken gedacht.

## Test-Setup

- Seite ueber HTTP ausliefern, zum Beispiel mit `python -m http.server 8123` aus dem Projektwurzelverzeichnis.
- Einmal hart neu laden, falls der Browser noch alte Asset-Versionen im Cache haelt.
- Vor dem manuellen Lauf den automatischen Mindest-Gate einmal mit `QA_BROWSER_TARGETS=chromium,firefox` und `QA_FAIL_ON_ISSUES=1` ausfuehren oder den gruenden CI-Run unter [/.github/workflows/site-quality-gate.yaml](../.github/workflows/site-quality-gate.yaml) referenzieren.
- Fuer Layout-, Interaktions- oder Sprachzustands-Aenderungen mindestens zwei Viewports pruefen: Desktop ab ca. 1280 px Breite und Mobile um ca. 390 px Breite.
- Wenn moeglich mindestens in Chromium/Edge und Firefox pruefen; fuer finale Freigaben zusaetzlich Safari oder ein iOS-/macOS-Ersatzgeraet einbeziehen.
- Fuer breitere lokale Browser-QA kann `tmp/visual-qa/release_qa_smoke.py` optional mit `QA_BROWSER_TARGETS=msedge,chrome,firefox` in einer kleinen Browser-Matrix laufen.

## Mindestmatrix

- [ ] Desktop Chromium oder Edge bei ca. 1440 px Breite mit Maus und Tastatur pruefen.
- [ ] Desktop Firefox bei ca. 1440 px Breite mit Maus und Tastatur pruefen.
- [ ] Mobile bei ca. 390 px Breite oder auf einem realen Geraet mit Touch pruefen.
- [ ] Fuer finale Freigaben Safari oder einen Apple-Ersatzpfad gegenpruefen.
- [ ] Einen reinen Keyboard-Pass ohne Maus fahren.
- [ ] Einen 200-Prozent-Zoom- und Reflow-Pass fahren.
- [ ] Einen Reduced-Motion-Pass mit aktivierter Bewegungsreduktion fahren.
- [ ] Einen kurzen Screenreader-Pass fahren, zum Beispiel mit NVDA auf Windows oder VoiceOver auf Apple-Geraeten.

## Ergebnisprotokoll

Vor dem Start einmal kurz festhalten:

- Datum / Tester
- Commit / Branch
- HTTP-Basis
- Automatischer Gate-Status
- Desktop Chromium oder Edge
- Desktop Firefox
- Mobile
- Safari oder Ersatzgeraet
- Keyboard-only
- 200-Prozent-Zoom
- Reduced Motion
- Screenreader
- Findings mit `high`, `medium` oder `low`

## Seiten-Smoketest

- [ ] [index.html](../index.html) laedt ohne sichtbare Layout-Brueche.
- [ ] [chronik.html](../chronik.html) laedt ohne ueberlappende Topbar oder abgeschnittene Timeline.
- [ ] [datenschutz.html](../datenschutz.html) laedt ohne Layoutfehler oder versetzte Ueberschriften.
- [ ] [impressum.html](../impressum.html) laedt ohne Layoutfehler oder versetzte Ueberschriften.
- [ ] Mindestens eine Share-Seite wie [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html) kurz visuell und bezueglich Redirect pruefen.

## Tastatur und Fokus

- [ ] Skip-Link auf Hauptseite und mindestens einer Subpage pruefen: sichtbar bei Fokus, Sprung landet sauber im Hauptinhalt.
- [ ] Desktop-Navigation, Sprachumschalter und Mobile-Menue nur mit Tastatur bedienen: keine Fokusfalle, kein verlorener Fokus.
- [ ] Fokusindikatoren bleiben sichtbar und werden nicht durch Hover-/Shadow-Resets verschluckt.
- [ ] Event-Lightbox laesst sich per Tastatur oeffnen und schliessen; Fokus springt danach zum Trigger zurueck.
- [ ] Review-Archiv und aufklappbare Review-Karten lassen sich ohne Maus bedienen.

## Zoom und Reflow

- [ ] Bei 200 Prozent Zoom bleiben Navigation, Hero und Footer ohne unlesbare Ueberlagerungen.
- [ ] [chronik.html](../chronik.html) bleibt bei 200 Prozent Zoom ohne abgeschnittene Timeline oder ueberdeckte Topbar lesbar.
- [ ] [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) bleiben bei 200 Prozent Zoom ohne kollidierende Hero-Panels, Chip-Listen oder Sprungnavigation lesbar.
- [ ] Auf Mobile oder schmalem Reflow pruefen, dass keine kritischen horizontalen Scroll-Zustaende entstehen.

## Reduced Motion

- [ ] Mit aktivierter Bewegungsreduktion bleibt die Seite voll bedienbar und vermittelt keine Information nur ueber Animation.
- [ ] Hero-Gallery bleibt auch ohne visuell dominante Bewegung ueber Dots oder Buttons steuerbar.
- [ ] Scroll-Reveal, Parallax oder Hintergrundformen blockieren keine Inhalte und fuehlen sich bei aktiver Bewegungsreduktion nicht aufdringlich an.

## Screenreader-Kurzcheck

Wenn nur ein sehr kurzer NVDA-Lauf noetig ist, zuerst [docs/NVDA-QUICK-PASS.md](./NVDA-QUICK-PASS.md) verwenden und danach nur bei Auffaelligkeiten in diese Vollcheckliste zurueckfallen.

- [ ] Seitenstruktur pruefen: Dokumenttitel, Landmarken und Hauptueberschriften wirken sinnvoll.
- [ ] Sprachumschalter wird als Gruppe mit klaren Labels angekuendigt.
- [ ] Nicht aktive `data-lang`-Varianten werden nicht mit vorgelesen.
- [ ] Die Legal-Hero-Chips auf [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) werden als Liste angekuendigt.
- [ ] Skip-Link, Mobile-Menue, Lightbox-Close und Review-Toggles haben sinnvolle Ankuendigungen.

## Homepage-Screenreader-Pass

Fuer einen kompakten Operator-Durchlauf steht derselbe Ablauf auch separat in [docs/NVDA-QUICK-PASS.md](./NVDA-QUICK-PASS.md).

- [ ] [index.html](../index.html) in Deutsch laden und einmal mit sichtbarem Cookie-Dialog starten; wenn der Dialog erscheint, pruefen dass er als benannter Dialog angekuendigt wird und `Alle akzeptieren`, `Ablehnen` und die Checkbox per Tastatur erreichbar sind.
- [ ] Danach die Hauptseite ohne offenen Dialog vom Seitenanfang lesen oder per Rotor/Landmark-Liste pruefen: erwartet werden mindestens `Hauptnavigation`, `main` und benannte Regionen fuer `Musik baut Bruecken`, `Werde Teil unserer Musikfamilie`, `Musikalisches Repertoire`, `Soziales Engagement`, `Kommende Konzerte & Begegnungen`, `Chronik`, `Dr. Astrid Eitschberger`, `Aktuelle Einblicke aus dem CMI`, `Seit 1981` und `Kontakt`.
- [ ] Ueberschriftenliste pruefen: genau eine `h1`, danach sinnvolle `h2`-Abschnitte fuer die grossen Homepage-Bloecke; der Astrid-Block darf nicht mehr als isolierte `h3` zwischen zwei Top-Level-Sections auftauchen.
- [ ] Jubilaeumsfilm-Link pruefen: der Link sollte mit einem beschreibenden Namen inkl. Hinweis `oeffnet in neuem Fenster` angekuendigt werden.
- [ ] Event- und Kontaktbereich pruefen: Event-Sektion, Chronik und Kontakt sollen in der Landmark-Liste benannt erscheinen; Kontaktkarten sollen mit ihren `h4`-Titeln sinnvoll strukturiert sein.
- [ ] Sprachwechsel auf Englisch ausfuehren und die Landmark-Liste erneut kurz pruefen; mindestens `Music family`, `Upcoming Concerts & Gatherings` und `Contact` muessen als umbenannte Regionen auftauchen.
- [ ] News-Feed-Karten kurz anlesen: die Bildteaser duerfen keine zusaetzlichen redundanten Bildansagen erzeugen, die ueber den vorhandenen Linktext hinausgehen.

## Load- und Scroll-Verhalten

- [ ] Hauptseite ohne Hash aufrufen, neu laden und pruefen, dass die Seite oben startet.
- [ ] Eine Hash-URL wie `index.html#review` aufrufen und pruefen, dass der Zielbereich erreichbar bleibt.
- [ ] Nach Reload mit Hash pruefen, dass kein Scroll-Flackern oder Sprungloop auftritt.
- [ ] Zwischen Hauptseite und Subpages wechseln und pruefen, dass keine unerwartete Scroll-Position erhalten bleibt.

## Navigation und Sprache

- [ ] Desktop-Navigation auf der Hauptseite pruefen: Links scrollen in die passenden Sektionen.
- [ ] Mobile Menue pruefen: Oeffnen, Schliessen, erneutes Oeffnen, keine festhaengende Overlay-Situation.
- [ ] Sprachumschaltung pruefen: Navigation, Tagline, Abschnittslabels und Hero-Inhalte wechseln sichtbar.
- [ ] Sprachzustand pruefen: Nach Wechsel auf eine Subpage und zurueck bleibt die gewaehlt Sprache erhalten.
- [ ] Subpage-Topbar pruefen: Labels und Links bleiben auch nach Sprachwechsel korrekt.
- [ ] Auf Legal-Seiten pruefen, dass Sprungnavigation, Hero-Panel und Chips nach Sprachwechsel semantisch und visuell stabil bleiben.

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
- [ ] Footer-Links auf Datenschutz und Impressum bleiben bei Tastatur- und Sprachwechsel sauber erreichbar.

## Scroll-Reveal und Bewegungsdetails

- [ ] Cards mit Reveal-Effekt erscheinen beim Scrollen sichtbar und nur einmal.
- [ ] Hintergrundformen bewegen sich subtil und ueberlagern keine Inhalte.
- [ ] Zwischen Desktop- und Mobile-Breite wechseln und pruefen, dass keine Hero- oder Shape-Artefakte sichtbar bleiben.

## Abschluss

- [ ] Browser-Konsole auf der Hauptseite einmal kurz auf neue Fehler pruefen.
- [ ] Wenn Screenshots fuer die Freigabe gebraucht werden, mindestens Hauptseite, Chronik und eine Legal-Seite erfassen.
- [ ] Findings in eine kleine Fundliste mit Seite, Repro-Schritt, Schweregrad und Root-Cause-Hinweis ueberfuehren.