# Follow-up Four-Week Plan: 10/10

Stand: 2026-04-08

## Ausgangslage

Der erste 4-Wochen-Plan in [docs/FOUR-WEEK-PLAN.md](../docs/FOUR-WEEK-PLAN.md) ist im gesetzten Pragmatik-Scope abgeschlossen.

Seitdem wurden direkt noch zwei kleine, aber echte Restpunkte bereinigt:

- Die grossen Sprachcluster auf [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) nutzen jetzt ebenfalls konsistent `hidden` plus `aria-hidden` statt verteiltem Inline-`display:none`.
- Ein korrektes [robots.txt](../robots.txt) liegt jetzt im Projektroot; [robot.txt](../robot.txt) bleibt als Altdatei vorerst unangetastet.

Der Stand ist damit technisch sauberer als im letzten Assessment, aber fuer einen echten 10/10-Unterbau reicht weiteres Kleinflicken nicht mehr.

## Messbare Restschuld

Aktuelle grobe Kennzahlen aus dem Codebestand:

- `data-lang`-Markup auf [index.html](../index.html): 1506 Vorkommen
- `data-lang`-Markup auf [datenschutz.html](../datenschutz.html): 1020 Vorkommen
- `data-lang`-Markup auf [impressum.html](../impressum.html): 413 Vorkommen
- `data-lang`-Markup auf [chronik.html](../chronik.html): 343 Vorkommen
- Verbleibendes Inline-`display:none` auf [index.html](../index.html): 1 Vorkommen, bewusst fuer den echten UI-Zustand der Event-Lightbox
- Groesste Runtime-Dateien nach dem Hero-Split: [scripts/review-interactions.js](../scripts/review-interactions.js) mit 453 Zeilen, [scripts/site-language.js](../scripts/site-language.js) mit 420 Zeilen, [scripts/cookie-consent.js](../scripts/cookie-consent.js) mit 390 Zeilen
- GitHub Actions existieren bereits unter [.github/workflows](../.github/workflows), sind aktuell aber faktisch deploy-orientiert und nicht als echter technischer Quality-Gate aufgebaut

## Was fuer 10/10 noch getan werden muss

1. Deployment darf nicht mehr die erste technische Pruefung sein. Vor dem Deploy braucht es einen reproduzierbaren Validierungs-Workflow.
2. Die Mehrsprachigkeit muss an mindestens einem grossen Block strukturell entdupliziert werden. Reines Umschalten von sichtbaren Varianten ist nicht mehr der grosse Hebel.
3. Die Runtime muss weiter zerlegt werden; nach dem Hero-Split liegen die groesseren verbleibenden Bloecke jetzt vor allem in [scripts/review-interactions.js](../scripts/review-interactions.js), [scripts/site-language.js](../scripts/site-language.js) und [scripts/cookie-consent.js](../scripts/cookie-consent.js).
4. Accessibility muss mit echten Geraete-, Zoom-, Tastatur- und Screenreader-Checks abgesichert werden, nicht nur ueber gute Heuristik und Smoke-Runs.
5. Die Share-Architektur sollte von handgepflegten Einzeldateien weiter in Richtung strukturierter Quelle plus Generierung bewegt werden.
6. Release-Dokumentation, manuelle QA und automatisierte QA muessen zusammenspielen, statt lose nebeneinander zu stehen.

## Zielbild fuer einen glaubwuerdigen 10/10-Stand

Ein echter 10/10-Stand ist hier nur dann glaubwuerdig, wenn am Ende dieses Folgeblocks folgende Punkte erreicht sind:

1. Jeder Push laeuft durch einen technischen Mindest-Check, bevor deployt wird.
2. Mindestens ein grosser mehrsprachiger Bereich wird nicht mehr als rohes, riesiges HTML-Duplikat gepflegt.
3. Kein einzelnes Frontend-Kernmodul ist noch ein gewachsener Sammelblock ohne klare Grenzen.
4. Hauptseite, Chronik, Datenschutz, Impressum und mindestens ein Share-Flow sind ueber Desktop, Mobile und Assistive-Technology bewusst gegengeprueft.
5. Deploy, QA und Dokumentation sind so konsistent, dass kuenftige Aenderungen nicht wieder in denselben Wartungsmodus zurueckfallen.

## Rahmen

- Verfuegbare Zeit: 15 Stunden pro Woche
- Planungszeitraum: 4 Wochen
- Gesamtbudget: 60 Stunden
- Technischer Anspruch: nicht nur 8/10 bis 9/10 polieren, sondern die noetigen Strukturhebel fuer echten 10/10-Unterbau ziehen

## Scope-Regeln

1. Pro Woche nur ein grosser Strukturblock, dazu kleine sichere Nacharbeiten.
2. Kein grosser Umbau ohne anschliessenden Smoke-Run und kurzen manuellen Regression-Check.
3. Accessibility-Funde werden nicht gesammelt und spaeter verschoben, sondern wo moeglich direkt mit Root-Cause-Fix geschlossen.
4. Wenn eine Woche kippt, wird zuerst Share-/Komfort-Scope gekuerzt, nicht die Validierung.
5. Fuer 10/10 gilt: weniger lokale Patches, mehr kontrollierte Strukturarbeit.

## Naechster empfohlener Strukturblock

Stand: 2026-04-09

Die bislang empfohlenen Strukturhebel sind abgeschlossen:

- Der Aktuelles-Bereich auf [index.html](../index.html) wird jetzt aus [scripts/legal-content/homepage-curated-feed.json](../scripts/legal-content/homepage-curated-feed.json) statisch gerendert.
- Die fruehere Navigation-/Sprach-Sammeldatei wurde erst in [scripts/site-language.js](../scripts/site-language.js) und [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js) aufgeteilt und anschliessend weiter in [scripts/navigation-mobile.js](../scripts/navigation-mobile.js), [scripts/navigation-shell.js](../scripts/navigation-shell.js) und [scripts/navigation-runtime.js](../scripts/navigation-runtime.js) geschnitten.
- Der Hero-/Gallery-Block wurde in [scripts/hero-layout.js](../scripts/hero-layout.js), [scripts/hero-gallery.js](../scripts/hero-gallery.js) und [scripts/hero-gallery-ui.js](../scripts/hero-gallery-ui.js) aufgeteilt, ohne die oeffentlichen Einstiege in [scripts/core-runtime.js](../scripts/core-runtime.js) zu aendern.
- Die Share-Architektur ist jetzt ebenfalls auf eine kanonische Quelle umgestellt: [share/share-pages-data.json](../share/share-pages-data.json) wird ueber [share/generate-share-pages.py](../share/generate-share-pages.py) in die einzelnen Share-HTMLs, [share/share-pages.json](../share/share-pages.json) und die Fallback-Liste in [share/instagram-export.js](../share/instagram-export.js) ausgerendert.

Der naechste technische Schuldenhebel liegt damit nicht mehr im Aktuelles-, Navigations-, Hero- oder Share-Bereich, sondern in [scripts/cookie-consent.js](../scripts/cookie-consent.js).

Begruendung:

- Die Share-Seiten werden nicht mehr an mehreren Stellen manuell synchron gehalten; Share-HTMLs, Manifest und Export-Fallback kommen jetzt aus derselben Quelle.
- Der lokale Chromium-Smoke fuer Share-Seite und Instagram-Export lief nach dem Umbau erneut mit 0 Funden durch.
- [scripts/cookie-consent.js](../scripts/cookie-consent.js) ist aktuell der groesste verbliebene Runtime-Block und mischt mehrsprachige Copy, Cookie-Definitionen, Rendering, UI-Zustand und Persistenz in einer Datei.
- Eine Trennung von strukturierten Consent-Daten und schlankerem Runtime-Code wuerde das gleiche Muster fortsetzen wie bei Navigation, Hero und Share.

Konkrete Empfehlung fuer den naechsten 15-Stunden-Block:

1. Die Copy- und Tabelleninhalte aus [scripts/cookie-consent.js](../scripts/cookie-consent.js) in eine strukturierte Quelle auslagern, statt sieben Sprachen und Cookie-Details im Runtime-Block zu halten.
2. Rendering, UI-Zustand und Persistenz im Consent-Runtime klar von diesen Daten trennen; wenn sinnvoll, den Block in kleinere Module schneiden.
3. Oeffentliche Hooks, bestehendes Markup und das Consent-Verhalten fuer Badge, Dialog, Save/Accept/Reject stabil lassen.
4. Danach gezielt den Privacy-/Consent-Flow, Sprachwechsel und den lokalen Release-Smoke erneut laufen lassen.

Repo-nahe Umsetzungsskizze:

1. Eine strukturierte Quelle fuer Consent-Texte, Kategorie-Beschreibungen und Cookie-Definitionen anlegen, damit Sprachpflege und Rechtscopy nicht mehr im Runtime-Code stecken.
2. Einen kleinen Render-/Hydrations-Schritt fuer den Consent-Dialog vorsehen oder die Daten zur Laufzeit sauber konsumieren, ohne das bestehende DOM-Verhalten zu aendern.
3. [scripts/cookie-consent.js](../scripts/cookie-consent.js) entlang Content, Rendering und Persistenz so schneiden, dass kuenftige Rechts- oder Sprachupdates keine grossen Runtime-Diffs mehr ausloesen.
4. Danach Smoke-QA fuer Datenschutz, Consent-Badge, Dialog und Sprachwechsel erneut laufen lassen.

Definition of Done fuer diesen naechsten Block:

- Consent-Copy und Cookie-Tabellen stehen nicht mehr hartcodiert im Runtime-Block.
- Der verbleibende Consent-Code ist kleiner und entlang Content, UI und Persistenz nachvollziehbar getrennt.
- Badge, Dialog, Save/Accept/Reject, Sprachwechsel und Datenschutzerklaerungs-Verlinkung bleiben stabil.
- Der Umbau bleibt im statischen Repo-Kontext reviewbar und ohne neues Laufzeit-Framework wartbar.

## Woche 1

Ziel: echte technische Eingangskontrolle vor Deployment herstellen und die QA-Basis von "optional" auf "verbindlich" heben.

Budget: 15 Stunden

### Stand 2026-04-08

- Abgeschlossen: Neuer Workflow unter [.github/workflows/site-quality-gate.yaml](../.github/workflows/site-quality-gate.yaml) prueft Pushes, Pull Requests und manuelle Runs vor dem Deploy.
- Abgeschlossen: [tmp/visual-qa/release_qa_smoke.py](../tmp/visual-qa/release_qa_smoke.py) validiert jetzt Root-Dateien, `robots.txt`, Share-Manifest und den Sync zu `FALLBACK_SHARE_PAGES` in [share/instagram-export.js](../share/instagram-export.js).
- Abgeschlossen: [.github/workflows/cmi-website-orchestration.yaml](../.github/workflows/cmi-website-orchestration.yaml) reagiert fuer Push-Deploys nur noch auf erfolgreiche Quality-Gate-Laeufe.
- Validiert: Lokaler End-to-End-Run mit `QA_BROWSER_TARGETS=chromium,firefox` und `QA_FAIL_ON_ISSUES=1` lief mit 0 Funden durch.
- Vorbereitet: [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md) ist jetzt als echte Browser-, Geraete- und Accessibility-Matrix statt nur als generischer Smoke-Text beschrieben.
- Abgeschlossen: [docs/RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md) verweist fuer Navigations-, Sprach-, Legal- und Interaktionsaenderungen jetzt gezielt auf die vertiefte manuelle Matrix.
- Abgeschlossen: Gezielter lokaler QA-Run fuer Tastatur, Reduced Motion und Legal-Reflow auf [index.html](../index.html), [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) wurde durchgefuehrt.
- Abgeschlossen: Die daraus abgeleiteten Funde sind direkt geschlossen worden: Hero-Autoplay respektiert Reduced Motion, Legal-Schnellnavigation fokussiert die Zielbereiche sauber und der kleine Horizontal-Overflow der Legal-Heroes ist behoben.

### Block A - 5h

- Bestehende GitHub-Workflows unter [.github/workflows](../.github/workflows) um einen echten Validierungs-Workflow ergaenzen
- Mindestens HTTP-Smoke, Root-Datei-Checks und einfache Struktursignale vor Deploy automatisieren
- Deployment weiter nutzen, aber nicht mehr als alleinigen technischen Workflow behandeln

### Block B - 5h

- [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md) als echte Geraete- und Accessibility-Matrix nachschaerfen
- Fokus auf Tastatur, 200-Prozent-Zoom, Reduced Motion, Screenreader-Kurzcheck, Mobile Safari oder iOS-Ersatzgeraet
- Ergebnisse in eine kleine Fundliste mit Priorisierung ueberfuehren

### Block C - 5h

- Week-1-Funde direkt in kleine Fixes rueckspielen
- Release-Checkliste nur dort erweitern, wo ein echter wiederkehrender Fehler verhindert wird
- Danach einmal kurzer lokaler Vollcheck ueber Hauptseite, Chronik, Datenschutz und Impressum

### Definition of Done

- Deployment ist nicht mehr ungefiltert push-getrieben
- Die QA-Basis ist technisch und organisatorisch schaerfer als vorher
- Erste Geraete-/Accessibility-Funde sind behoben oder bewusst priorisiert

## Woche 2

Ziel: den groessten Wartbarkeitshebel angehen, naemlich HTML-Duplikation in der Mehrsprachigkeit.

Budget: 15 Stunden

### Stand 2026-04-08

- Abgeschlossen: Fuer den ersten Legal-Piloten wurde die Zielarchitektur auf strukturierte Quelle plus statische Generierung festgelegt, nicht auf neue Client-Side-Hydration.
- Abgeschlossen: Der Rechtsblock `#imprint-legal` in [impressum.html](../impressum.html) wird jetzt aus [scripts/legal-content.json](../scripts/legal-content.json) ueber [scripts/render-legal-content.py](../scripts/render-legal-content.py) gerendert.
- Abgeschlossen: Der Generatoransatz deckt jetzt auch den grossen Datenschutz-Ueberblick `#privacy-overview` in [datenschutz.html](../datenschutz.html) ab; dafuer wurde der Renderer auf strukturierte Card-Inhalte mit Zwischenueberschriften, Listen und Gruppen erweitert.
- Abgeschlossen: Der Datenschutz-Block `#privacy-hosting` in [datenschutz.html](../datenschutz.html) wird jetzt ebenfalls generatorbasiert gepflegt; die Quelle liegt in [scripts/legal-content/privacy-hosting.json](../scripts/legal-content/privacy-hosting.json) und rendert den IONOS-Hinweis mitsamt Inline-Link statisch aus strukturierter Quelle.
- Abgeschlossen: Der Datenschutz-Block `#privacy-basics` in [datenschutz.html](../datenschutz.html) wird jetzt ebenfalls generatorbasiert gepflegt; groessere Quellen koennen dafuer jetzt zusaetzlich unter [scripts/legal-content](../scripts/legal-content) liegen.
- Abgeschlossen: Der Datenschutz-Block `#privacy-data` in [datenschutz.html](../datenschutz.html) wird jetzt ebenfalls generatorbasiert gepflegt; die Quelle liegt in [scripts/legal-content/privacy-data.json](../scripts/legal-content/privacy-data.json) und wurde gegen Sprachumschaltung sowie schmalen Reflow validiert.
- Abgeschlossen: Der Datenschutz-Block `#privacy-analytics` in [datenschutz.html](../datenschutz.html) wird jetzt ebenfalls generatorbasiert gepflegt; der Renderer unterstuetzt dafuer gezielt freigegebene Inline-Links, sodass externe Datenschutzhinweise im statisch gerenderten HTML klickbar bleiben.
- Abgeschlossen: Der Datenschutz-Block `#privacy-social` in [datenschutz.html](../datenschutz.html) wird jetzt ebenfalls generatorbasiert gepflegt; die Quelle liegt in [scripts/legal-content/privacy-social.json](../scripts/legal-content/privacy-social.json) und deckt die Facebook- und Instagram-Hinweise samt freigegebenen Links strukturiert ab.
- Abgeschlossen: Der Datenschutz-Block `#privacy-tools` in [datenschutz.html](../datenschutz.html) wird jetzt ebenfalls generatorbasiert gepflegt; die Quelle liegt in [scripts/legal-content/privacy-tools.json](../scripts/legal-content/privacy-tools.json) und rendert YouTube- und Google-Maps-Texte ohne doppelt escapte HTML-Entities.
- Abgeschlossen: Der gleiche Marker-Renderer wird jetzt auch auf breitere Chronik-Inhalte angewendet; Hero-Titel, Uebersichtskarten und Timeline-Summary kommen in [chronik.html](../chronik.html) aus [scripts/legal-content/chronik-overview.json](../scripts/legal-content/chronik-overview.json), ohne Wrapper wie `section`, `article` oder `div.timeline-summary` umzubauen.
- Abgeschlossen: Auch alle sieben Timeline-Stationen in [chronik.html](../chronik.html) werden jetzt aus [scripts/legal-content/chronik-timeline-items.json](../scripts/legal-content/chronik-timeline-items.json) gerendert; der Renderer unterstuetzt dafuer optional alternative Text-Tags, damit bestehende `div.timeline-item-text`-Semantik erhalten bleibt.
- Abgeschlossen: Der Generatoransatz deckt jetzt grosse Hauptseiten-Cluster von oben bis unten ab; in [index.html](../index.html) kommen der komplette Musikfamilie-Block, die Repertoire- und Engagement-Karten, der "Musik baut Bruecken"-Introblock inklusive Jubiläumsfilm-Card, der Astrid-Abschnitt sowie die Event-Einfuehrung, beide Event-Karten, der Kontaktbereich und der Footer aus [scripts/legal-content/homepage-music-family.json](../scripts/legal-content/homepage-music-family.json), [scripts/legal-content/homepage-repertoire.json](../scripts/legal-content/homepage-repertoire.json), [scripts/legal-content/homepage-bridge-about.json](../scripts/legal-content/homepage-bridge-about.json), [scripts/legal-content/homepage-events.json](../scripts/legal-content/homepage-events.json) und [scripts/legal-content/homepage-contact-footer.json](../scripts/legal-content/homepage-contact-footer.json), waehrend bestehende Fakten-, Karten-, Button- und Footer-Klassen erhalten bleiben.
- Abgeschlossen: Die Pflegehinweise dafuer wurden in [README.md](../README.md) und [docs/FRONTEND-HANDOFF.md](../docs/FRONTEND-HANDOFF.md) nachgezogen.
- Validiert: Generatorlauf sowie nachgelagerte Browser-QA-Runs fuer [index.html](../index.html), [datenschutz.html](../datenschutz.html), [impressum.html](../impressum.html) und [chronik.html](../chronik.html) liefen lokal ohne Funde durch; geprueft wurden sieben generatorisierte Datenschutz-Bloecke, die benannte Legal-Schnellnavigation, die erweiterten Chronik-Bloecke bis in die Timeline hinein sowie Intro-/About-Bereich, Musikfamilie, Repertoire, Engagement, Events, Kontakt und Footer auf der Hauptseite inklusive Sprachumschaltung. Der letzte Matrixlauf lief explizit ueber Edge, Chrome und Firefox.
- Offen: Der Ansatz ist jetzt fuer einen Impressum-Block, sieben Datenschutz-Bloecke, breite Chronik-Bereiche und grosse Hauptseiten-Bloecke vom Intro-/About-Bereich bis in Events, Kontakt und Footer umgesetzt, aber noch nicht ueber die gesamte Startseite hinweg ausgedehnt.

### Block A - 4h

- Zielarchitektur fuer mehrsprachige Inhalte entscheiden: strukturierte Quelle plus Generierung, nicht neues Client-Side-Gefrickel
- Fokus zunaechst auf [datenschutz.html](../datenschutz.html), [impressum.html](../impressum.html) oder einen anderen klaren Pilotblock
- Entscheidung dokumentieren: welche Quelle wird gepflegt, was wird generiert, was bleibt vorerst statisch

### Block B - 7h

- Einen grossen Pilotblock technisch umsetzen
- Ziel ist nicht nur weniger sichtbarer Code, sondern weniger Pflegeaufwand bei Textaenderungen und weniger Risiko fuer Inkonsistenzen zwischen Sprachen
- Wenn der Pilot stabil ist, nur dann auf den naechsten passenden Bereich erweitern

### Block C - 4h

- Regression-Check ueber den pilotierten Bereich
- Doku in [docs/FRONTEND-HANDOFF.md](../docs/FRONTEND-HANDOFF.md) und den betroffenen Build-/Pflegehinweisen nachziehen
- Restpunkte notieren: sofort weiterziehen oder bewusst in Woche 4 lassen

### Definition of Done

- Mindestens ein grosser mehrsprachiger Block wird nicht mehr als rohes HTML-Massen-Duplikat gepflegt
- Die gewaehlte Architektur ist fuer kuenftige Inhalte wiederverwendbar
- Der Pilot ist nicht nur technisch clever, sondern lokal und im Browser sauber geprueft

## Woche 3

Ziel: die gewachsenen Runtime-Sammelbloecke weiter aufbrechen und testbarer machen.

Budget: 15 Stunden

### Stand 2026-04-09

- Abgeschlossen: Der bisherige Navigation-/Sprach-Sammelblock ist schrittweise aufgeteilt worden; aktive Runtime-Dateien sind jetzt [scripts/site-language.js](../scripts/site-language.js), [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js), [scripts/navigation-mobile.js](../scripts/navigation-mobile.js), [scripts/navigation-shell.js](../scripts/navigation-shell.js) und [scripts/navigation-runtime.js](../scripts/navigation-runtime.js).
- Abgeschlossen: Der Hero-/Gallery-Block ist entlang echter Verantwortungen in [scripts/hero-layout.js](../scripts/hero-layout.js), [scripts/hero-gallery.js](../scripts/hero-gallery.js) und [scripts/hero-gallery-ui.js](../scripts/hero-gallery-ui.js) getrennt worden.
- Abgeschlossen: Die HTML-Ladereihenfolge auf [index.html](../index.html), [chronik.html](../chronik.html), [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) wurde entsprechend auf die neue Reihenfolge umgestellt.
- Validiert: Statische Fehlerchecks liefen nach jedem Split ohne Funde durch.
- Validiert: Der Chromium-Release-Smoke lief nach den Runtime-Splits erneut mit 0 Funden.

### Block A - 5h

- [x] Den Navigationsteil weiter in kleine Verantwortungsbereiche schneiden und die Orchestrierung schlank halten
- [x] Sprachzustand, Mobile-Menue, Wayfinding, Navbar-Shell und Initialisierung nicht wieder zu einem neuen Mischblock zusammenfalten

### Block B - 5h

- [x] Den Hero-/Gallery-Block in Layout-Messung, Slider-/Autoplay-Zustand und UI-/Accessibility-Sync trennen
- [x] Kleine pure Helfer aus DOM-lastiger Logik herausziehen, wenn das den Test- und Review-Aufwand senkt

### Block C - 5h

- [x] Nach jedem groesseren Refactor mindestens statische Fehlerchecks und den Chromium-Smoke mitlaufen lassen
- Wenn moeglich eine kleine technische Schutzschicht einziehen: script-level checks, assertions oder sehr leichte Regression-Helfer
- Keine grossen neuen Features in dieser Woche

### Definition of Done

- Die beiden groessten Frontend-Module sind sichtbar leichter lesbar und enger geschnitten
- Refactors sind durch QA abgesichert, nicht nur durch Hoffnung
- Neue Reibung wurde nicht an anderer Stelle wieder eingebaut

## Woche 4

Ziel: Share-Architektur, finaler QA-Sweep und Release-Haertung zusammenziehen.

Budget: 15 Stunden

### Block A - 5h

- Share-System unter [share](../share) auf strukturierte Pflege pruefen
- Zielbild: weniger handgepflegte Einzel-HTMLs, mehr Metadaten plus reproduzierbare Ableitung
- Nur den kleinsten sinnvollen Generierungshebel bauen, keinen unkontrollierten Komplettumbau

### Block B - 5h

- Finale QA-Runde: Desktop, Mobile, Tastatur, Screenreader-Kurzcheck, Browser-Matrix, Share-Flow
- [docs/RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md) und [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md) gegen die reale Praxis abgleichen

### Block C - 5h

- Nur noch High- und Medium-Funde schliessen
- Abschlussbewertung gegen [docs/SITE-ASSESSMENT.md](../docs/SITE-ASSESSMENT.md) aktualisieren
- Restliste fuer spaetere Komfort- oder Inhaltsarbeit trennen von echter technischer Schuld

### Definition of Done

- Share-Pflege ist strukturierter als zuvor
- Release-QA ist nicht nur mehrfach gelaufen, sondern verfahrensmaessig besser abgesichert
- Der verbleibende Rest ist klein, bewusst und nicht mehr systemisch

## Prioritaet

1. Quality-Gate vor Deploy
2. Strukturelle i18n-Entduplizierung
3. Runtime-Zerlegung
4. Echte Accessibility- und Geraete-QA
5. Share-Generierung und Komfortgewinne

## Nicht im Scope

- Vollstaendige Framework-Migration
- Komplett neuer Design-Layer
- CMS-Einfuehrung
- Mehrmonatiger Neuaufbau aller Seitenquellen auf einmal

## Wochen-Check-in

Am Ende jeder Woche kurz festhalten:

- Was wurde wirklich abgeschlossen?
- Welche Restpunkte sind strukturell und welche nur kosmetisch?
- Ist der 10/10-Pfad noch realistisch oder wurde nur mehr Patching produziert?
- Welcher Bereich ist der naechste groesste Hebel?
