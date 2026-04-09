# Follow-up Four-Week Plan: 10/10

Stand: 2026-04-09

Kurzstatus: Woche 1 bis 3 sind im 10/10-Folgeplan abgeschlossen; Woche 4 ist technisch fast abgeschlossen, offen ist nur noch der echte manuelle NVDA-/VoiceOver-Pass.

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
- Groesste verbliebene Interaktions-Runtimes nach dem Site-Language-Split: [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js) mit 307 Zeilen, [scripts/review-navigation.js](../scripts/review-navigation.js) mit 266 Zeilen und [scripts/review-archive.js](../scripts/review-archive.js) mit 218 Zeilen; [scripts/site-language.js](../scripts/site-language.js) ist auf 37 Zeilen geschrumpft, [scripts/site-language-variants.js](../scripts/site-language-variants.js) liegt bei 76 Zeilen und [scripts/cookie-consent.js](../scripts/cookie-consent.js) bei 106 Zeilen
- GitHub Actions stellen jetzt mit [site-quality-gate.yaml](../.github/workflows/site-quality-gate.yaml) einen echten technischen Mindest-Check vor Push-Deployments bereit; der verbleibende Reifegrad-Hebel liegt eher in Assistive-Technology- und Geraete-QA als in fehlender CI-Automation

## Was fuer 10/10 noch getan werden muss

1. Accessibility muss mit echten Geraete-, Zoom-, Tastatur- und Screenreader-Checks abgesichert werden, nicht nur ueber gute Heuristik und Smoke-Runs.
2. Die verbleibenden grossen Sprachcluster auf der Startseite sollten weiter strukturell entdupliziert werden; die Generatorarchitektur deckt schon grosse Teile ab, aber noch nicht die komplette Seite.
3. Die jetzt getrennten Runtime-Module duerfen nicht wieder zu Sammelbloecken anwachsen; weitere Schnitte in [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js) oder [scripts/review-navigation.js](../scripts/review-navigation.js) sollten nur noch durch echte QA- oder Produktfunde getrieben sein.
4. Release-Dokumentation, manuelle QA und automatisierte QA muessen als wiederholbarer Betriebsmodus zusammen genutzt werden, nicht nur als einmaliger Aufraeumzustand.

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
- Der Review-/Rueckblick-Block wurde jetzt entlang echter Verantwortungen in [scripts/review-navigation.js](../scripts/review-navigation.js), [scripts/review-archive.js](../scripts/review-archive.js) und [scripts/review-interactions.js](../scripts/review-interactions.js) getrennt, ohne den oeffentlichen Einstieg in [scripts/core-runtime.js](../scripts/core-runtime.js) wieder aufzublaehen.
- Der verbliebene Sprach-/Accessibility-Sammelblock wurde jetzt weiter geschnitten: [scripts/site-language-variants.js](../scripts/site-language-variants.js), [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js) und [scripts/site-language.js](../scripts/site-language.js) trennen `data-lang`-/`lang`-Sync, Label-/Accessibility-Sync und die Sprach-Orchestrierung.

Nach Consent-, Review- und Site-Language-Split liegt der naechste echte 10/10-Hebel damit weniger in weiterem Filesplitting als in einem bewussten Accessibility- und Device-Proof.

Begruendung:

- Die Consent-Copy und Tabellenlabels liegen weiter separat in [scripts/cookie-consent-content.js](../scripts/cookie-consent-content.js), waehrend [scripts/cookie-consent.js](../scripts/cookie-consent.js) nur noch Observer- und Sprachsync-Code enthaelt.
- Die Review-Runtime ist weiter in History-/Return-Logik, Archiv-/Card-Zustand und Orchestrierung getrennt; die Einstiegseiten laden dafuer [scripts/review-navigation.js](../scripts/review-navigation.js), [scripts/review-archive.js](../scripts/review-archive.js) und [scripts/review-interactions.js](../scripts/review-interactions.js) in dieser Reihenfolge.
- Die Sprach-Runtime trennt jetzt `data-lang`-/`lang`-Sync, statische Accessibility-Labels und Sprach-Orchestrierung; [scripts/site-language.js](../scripts/site-language.js) ist nur noch 37 Zeilen gross.
- Chromium-Smoke und ein gezielter Playwright-Pass fuer Sprachwechsel, Mobile-Menue-Labels, Review-Buttons und Legal-Navigation liefen nach dem Split ohne Funde durch.

Konkrete Empfehlung fuer den naechsten 15-Stunden-Block:

1. Einen vollstaendigen manuellen Accessibility-Sweep ueber [index.html](../index.html), [chronik.html](../chronik.html), [datenschutz.html](../datenschutz.html), [impressum.html](../impressum.html) und mindestens einen Share-Flow fahren.
2. Geraete-, Zoom-, Tastatur- und Screenreader-Funde direkt mit Root-Cause-Fixes schliessen statt sie als spaetere Sammelliste liegen zu lassen.
3. Die verbleibenden grossen Sprachcluster auf der Hauptseite nur dort weiter generatorisieren, wo der manuelle Sweep oder kuenftige Textpflege echten Wartungsdruck zeigt.
4. Danach lokalen Release-Smoke, gezielte Sprach-/Review-Regression und die QA-Dokumentation erneut abgleichen.

Repo-nahe Umsetzungsskizze:

1. Die Matrix in [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md) bewusst ueber Hauptseite, Chronik, Legal-Seiten und einen Share-/Export-Flow abarbeiten.
2. Bei Funden zuerst die bestehenden Split-Grenzen nutzen, statt neue Sammelhelfer in [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js) oder [scripts/review-navigation.js](../scripts/review-navigation.js) aufzubauen.
3. Wenn danach noch grosse Startseiten-Cluster uebrig bleiben, die Generatorarchitektur gezielt auf den naechsten wirklich wartungsintensiven Mehrsprachigkeitsblock ausweiten.
4. Danach Smoke-QA, Manual-QA und Release-QA-Doku wieder auf denselben Stand bringen.

Definition of Done fuer diesen naechsten Block:

- Hauptseite, Chronik, Legal-Seiten und ein Share-Flow sind bewusst ueber Desktop, Mobile, Tastatur, Zoom und Screenreader kurz gegengeprueft.
- Gefundene Accessibility- oder Device-Probleme sind direkt geschlossen oder klar priorisiert.
- Sprachwechsel, Review-Navigation und die gesplitteten Runtime-Module bleiben unter diesen Checks stabil.
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

- Abgeschlossen: Der bisherige Navigation-/Sprach-Sammelblock ist schrittweise aufgeteilt worden; aktive Runtime-Dateien sind jetzt [scripts/site-language-variants.js](../scripts/site-language-variants.js), [scripts/site-language-accessibility.js](../scripts/site-language-accessibility.js), [scripts/site-language.js](../scripts/site-language.js), [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js), [scripts/navigation-mobile.js](../scripts/navigation-mobile.js), [scripts/navigation-shell.js](../scripts/navigation-shell.js) und [scripts/navigation-runtime.js](../scripts/navigation-runtime.js).
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

### Stand 2026-04-09

- Abgeschlossen: Die Share-Architektur ist auf strukturierte Pflege umgestellt; [share/share-pages-data.json](../share/share-pages-data.json) ist die kanonische Quelle, [share/generate-share-pages.py](../share/generate-share-pages.py) rendert daraus die einzelnen Share-HTMLs, [share/share-pages.json](../share/share-pages.json) und die Fallback-Liste in [share/instagram-export.js](../share/instagram-export.js).
- Abgeschlossen: Browser-Matrix, Share-Smokes und der technische Mindest-Gate wurden wiederholt mit 0 Funden gefahren; der letzte lokale Gate-Run mit `QA_BROWSER_TARGETS=chromium,firefox` und `QA_FAIL_ON_ISSUES=1` lief am 2026-04-09 erneut erfolgreich durch.
- Abgeschlossen: [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md), [docs/RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md), [docs/FRONTEND-HANDOFF.md](../docs/FRONTEND-HANDOFF.md) und [docs/SITE-ASSESSMENT.md](../docs/SITE-ASSESSMENT.md) wurden auf denselben Release-/Accessibility-Stand gebracht.
- Abgeschlossen: Fuer den manuellen Homepage-Screenreader-Pass existieren jetzt ein kompakter Operator-Ablauf in [docs/NVDA-QUICK-PASS.md](../docs/NVDA-QUICK-PASS.md) und ein fester Ergebnisblock im Handoff.
- Offen: Der echte manuelle NVDA-/VoiceOver-Durchlauf selbst ist noch nicht ausgefuehrt; genau dieser Schritt ist der verbleibende Restpunkt fuer einen vollstaendig geschlossenen Week-4-Block.

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

Diese vier Grosshebel bleiben bewusst ausserhalb dieses Blocks und wandern in den Folgeplan [docs/POST-10-10-PLATFORM-PLAN.md](../docs/POST-10-10-PLATFORM-PLAN.md).

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
