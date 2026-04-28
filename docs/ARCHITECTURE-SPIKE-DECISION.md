# Architecture Spike Decision

Stand: 2026-04-10

## Zweck

Diese Datei uebersetzt Phase 1 aus [docs/POST-10-10-PLATFORM-PLAN.md](./POST-10-10-PLATFORM-PLAN.md) in ein echtes Arbeitsartefakt. Sie soll nicht sofort eine neue Plattform festlegen, sondern die spaetere Entscheidung ueber Design-Layer, CMS oder Framework-Pilot auf dieselben Fragen, Kriterien und Go- oder No-Go-Schwellen ziehen.

Die finale Entscheidung aus diesem Dokument sollte erst nach dem Responsive- und UX-Block aus [docs/RESPONSIVE-UX-UI-10-10-PLAN.md](./RESPONSIVE-UX-UI-10-10-PLAN.md) getroffen werden. Vorher bleibt die Empfehlung bewusst konservativ.

## Gesicherte Ausgangslage im aktuellen Repo

- Die Website ist heute weiterhin statisch deploybar und hat einen belastbaren Mindest-Gate ueber [tmp/visual-qa/release_qa_smoke.py](../tmp/visual-qa/release_qa_smoke.py) sowie [/.github/workflows/site-quality-gate.yaml](../.github/workflows/site-quality-gate.yaml).
- HTML, CSS und JavaScript sind nicht mehr monolithisch, sondern in fachliche Module zerlegt; die Haupt-CSS und die Runtime folgen bereits einer klareren Komponenten- und Verantwortungsgrenze.
- Fuer strukturierte Inhalte existiert schon eine Generatorbasis: Legal- und breite Homepage-Bloecke laufen ueber [scripts/render-legal-content.py](../scripts/render-legal-content.py) und Quellen unter [scripts/legal-content](../scripts/legal-content).
- Der Share-Bereich hat bereits ein eigenstaendiges Inhaltsmodell ueber [share/share-pages-data.json](../share/share-pages-data.json), daraus generierte Share-HTMLs, ein Manifest und die Instagram-Export-Fallback-Liste.
- Private Projektdoku kann separat ueber [scripts/build_private_docs_preview.py](../scripts/build_private_docs_preview.py) in [tmp/private-docs-preview](../tmp/private-docs-preview) gebaut werden.
- Der groesste aktuell dokumentierte Restschmerz liegt laut [docs/RESPONSIVE-UX-UI-FINDINGS.md](./RESPONSIVE-UX-UI-FINDINGS.md) eher in sichtbarer Responsive- und Flow-Qualitaet als in einem klar belegten Plattformversagen.

## Kernfragen des Spikes

1. Reicht die bestehende Static-plus-Generator-Architektur fuer die naechsten 6 bis 12 Monate, wenn der Responsive-Block sauber abgeschlossen wird?
2. Falls nein: Ist der naechste Hebel eher ein Design-Layer, ein statischer Komponenten-Framework-Pilot oder ein Build-Time- oder Headless-CMS-Pilot?
3. Welcher kleine Pilotbereich beantwortet diese Frage mit dem kleinsten Risiko und dem besten Lerngewinn?

## Nicht-Ziele

- keine Big-Bang-Migration der gesamten Site
- kein paralleler Start von Framework, CMS und Redesign
- keine Abschwaechung des bestehenden QA-, Preview- oder Deploy-Pfads vor einem bewiesenen Pilot
- keine Hersteller- oder Toolauswahl aus Prestigegruenden allein

## Bewertungsachsen

Jede Option soll gegen dieselben Achsen bewertet werden:

1. Redaktionsnutzen: reduziert sie realen Pflege- oder Preview-Schmerz?
2. Komponenten- und Layoutnutzen: senkt sie Wiederholungen bei UI und Interaktion?
3. Mehrsprachigkeitsnutzen: verbessert sie das Modell fuer strukturierte Sprachvarianten wirklich?
4. QA- und Deploy-Fit: bleibt der bestehende Static- und Quality-Gate-Pfad erhalten oder besser reproduzierbar?
5. Migrationsrisiko: wie viel Umbau, Parallelbetrieb und Rueckfallaufwand ist noetig?
6. Pilot-Faehigkeit: laesst sich die Hypothese an einem kleinen Bereich ohne Seitenschaeden pruefen?

## Entscheidungsoptionen

### Option A - Bestehenden Static- und Generatorpfad vertiefen

Geeignet, wenn die groessten Schmerzen weiter bei einzelnen Quellbloecken, Mehrsprachigkeitsstruktur und manueller Pflege liegen, aber noch kein echter Framework- oder CMS-Zwang sichtbar ist.

Erwarteter Nutzen:

- niedrigstes Migrationsrisiko
- bester Fit zum bestehenden QA- und Deploy-Pfad
- vorhandene Generatorquellen koennen weiter auf Homepage- oder Share-Bloecke ausgeweitet werden

Grenzen:

- Preview und komponentisierte Wiederverwendung bleiben begrenzt
- visuelle Systematik muss weiter bewusst im bestehenden Stack gebaut werden

### Option B - Design-Layer-Pilot auf dem bestehenden Stack

Geeignet, wenn nach dem Responsive-Block vor allem visuelle Inkonsistenz, fehlende Token-Systematik oder uneinheitliche Komponentenoberflaechen als Hauptschmerz uebrig bleiben.

Erwarteter Nutzen:

- sichtbare Systematik ohne sofortige Plattformmigration
- gute Anschlussfaehigkeit an die bestehende CSS-Modulstruktur
- geringeres Risiko als Framework- oder CMS-Einfuehrung

Grenzen:

- loest keinen echten Redaktions- oder Preview-Bedarf
- kann scheitern, wenn die eigentlichen Schmerzen nicht visuell-systemisch, sondern strukturell-redaktionell sind

### Option C - Static-First-Framework-Pilot

Geeignet, wenn Wiederverwendung, komponentisierte Komposition und Build-Time-Layouts klar zum Hauptschmerz werden. Die konkrete Framework-Wahl ist nachgelagert; in diesem Dokument geht es nur um die Kategorie eines statischen Komponenten-Layers.

Erwarteter Nutzen:

- bessere Wiederverwendung fuer Komponenten, Layouts und Inhaltsbausteine
- moeglich bessere lokale Preview- und Entwicklungsisolation fuer einzelne Bereiche
- saubere Grundlage fuer einen spaeteren Ausbau, falls der Pilot echten Mehrwert zeigt

Grenzen:

- hoeheres Einfuehrungs- und Parallelbetriebsrisiko als Option A oder B
- braucht einen klar abgegrenzten Pilot, damit das Repo nicht halb migriert stehenbleibt

### Option D - Build-Time- oder Headless-CMS-Pilot

Geeignet, wenn mehrere Bearbeiter, haeufige Inhaltsaenderungen, Vorschau-Bedarf oder strukturierte Pflegefluesse real und wiederkehrend belegt sind.

Erwarteter Nutzen:

- klarster Hebel fuer redaktionelle Pflege, Vorschau und strukturierte Inhaltsmodelle
- Share-Daten und generatorisierte Inhaltsbloecke koennen als erste CMS-Kandidaten dienen

Grenzen:

- fuehrt ohne echten Redaktionsschmerz leicht nur zu mehr Systemkomplexitaet
- braucht Integrationsarbeit fuer Quality-Gate, Preview und Build-Vertrag

## Vorbefuellte Erstbewertung fuer den heutigen Repo-Stand

| Kriterium | Option A: Static plus Generatoren | Option B: Design-Layer-Pilot | Option C: Static-First-Framework-Pilot | Option D: Build-Time- oder Headless-CMS-Pilot |
| --- | --- | --- | --- | --- |
| Fit zum aktuellen Deploy- und QA-Pfad | stark | stark | mittel | mittel |
| Migrationsrisiko | niedrig | niedrig bis mittel | mittel bis hoch | mittel bis hoch |
| Nutzen fuer strukturierte Inhalte | mittel | niedrig | mittel | stark |
| Nutzen fuer Komponentenwiederverwendung | mittel | mittel | stark | niedrig bis mittel |
| Nutzen fuer Preview und Redaktion | niedrig bis mittel | niedrig | mittel | stark |
| Sinnvoll als erster kleiner Pilot | mittel | mittel | mittel | stark fuer redaktionelle Hypothesen |

## Go- oder No-Go-Schwellen

### Framework-Pilot wird erst gruen, wenn mindestens drei Punkte zutreffen

- Komponenten- oder Interaktionslogik wird in mehreren Bereichen wiederholt kopiert statt nur angepasst.
- Der bestehende Generatorpfad fuehlt sich fuer neue Inhaltsbloecke oder Layoutvarianten sichtbar zu grob an.
- Ein kleiner Pilotbereich braucht echte Build-Time-Komposition statt nur weitere HTML- oder JSON-Generierung.
- Der Mehrwert liegt primaer in Entwicklungs- und Wiederverwendungslogik, nicht in Redaktion oder Preview.

### CMS-Pilot wird erst gruen, wenn mindestens drei Punkte zutreffen

- mehr als eine Person pflegt Inhalte regelmaessig
- Vorschau oder Freigabe vor Publikation ist wiederkehrend noetig
- Share-, News- oder Homepage-Inhalte aendern sich haeufig genug, dass JSON- oder HTML-Pflege zum Engpass wird
- ein strukturierter Inhaltsfluss ist wichtiger als weitere UI-Komponentenarbeit

### Design-Layer-Pilot wird erst gruen, wenn mindestens drei Punkte zutreffen

- nach dem Responsive-Block bleibt der Restschmerz vor allem visuell-systemisch
- bestehende CSS-Module reichen funktional, aber nicht mehr fuer konsistente Tokens und Komponentenoberflaechen
- kein echter CMS- oder Framework-Druck ist zugleich nachweisbar
- der Pilot kann im bestehenden Static-Stack sauber bewaehrt werden

## Vorlaeufige Empfehlung auf Basis des heutigen Standes

1. Kein Go fuer eine breite Framework-Migration.
2. Kein Go fuer einen CMS-Rollout ueber die ganze Site.
3. Kein Go fuer einen visuellen Komplettreset.
4. Default-Basis bleibt vorerst Option A: bestehende Static- und Generatorarchitektur weiter stabilisieren.
5. Wenn nach dem Responsive-Block ein Pilot noetig ist, zuerst genau eine Hypothese pruefen statt mehrere parallel.

## Vorgezogene Pilotempfehlung fuer dieses Repo

Wenn nach dem Responsive-Block wirklich genau ein Pilot gestartet wird, ist die vorbefuellte Empfehlung derzeit der Share-Flow rund um [share/share-pages-data.json](../share/share-pages-data.json), die daraus erzeugten Share-Seiten unter [share](../share), [share/share-pages.json](../share/share-pages.json) und [share/instagram-export.html](../share/instagram-export.html).

Der konkrete Arbeitsumriss fuer genau diesen Pilot liegt unter [docs/SHARE-FLOW-PILOT-OUTLINE.md](./SHARE-FLOW-PILOT-OUTLINE.md).

Die direkte Umsetzungsreihenfolge mit Abnahmepunkten steht unter [docs/SHARE-FLOW-PILOT-CHECKLIST.md](./SHARE-FLOW-PILOT-CHECKLIST.md).

Der aktuell zugeschnittene, nicht-produktive Phase-2-Pilotpfad liegt unter [docs/SHARE-FLOW-PILOT-PATH-2026-04-10.md](./SHARE-FLOW-PILOT-PATH-2026-04-10.md).

Warum gerade dieser Bereich zuerst:

- Er ist bereits strukturiert modelliert und damit naeher an einem echten Inhalts- oder Komponentenpilot als grosse freie Homepage-Bloecke.
- Er ist fachlich abgegrenzt und beruehrt die globale Navigation, Hero-Zone und Kernruntime deutlich weniger als ein Pilot direkt auf der Startseite.
- Er verbindet bereits heute Inhaltspflege, Generierung, Preview, Link-Distribution und Export in einem einzigen kleinen End-to-End-Flow.
- Erfolg oder Misserfolg ist gut messbar: Pflegezeit, Preview-Fit, Export-Stabilitaet, Manifest-Sync und Quality-Gate-Kompatibilitaet.

Was damit bewusst noch nicht pilotiert wird:

- nicht der Aktuelles- oder Rueckblick-Flow, weil dort UI-, Navigations- und Runtime-Fragen zu stark mit dem Plattformtest vermischt waeren
- nicht ein grosser Homepage-Block, weil dort Design-Layer-, Inhaltsmodell- und Responsive-Fragen gleichzeitig aufbrechen wuerden

Vorgezogene Hypothese fuer den Pilot:

- Ein kleiner Pilot im Share-Flow kann zuerst belegen, ob strukturierte Inhaltsquellen, bessere Preview-Vertraege oder ein spaeterer CMS- oder Komponentenlayer realen Nutzen bringen, ohne den heutigen Static-, QA- und Deploy-Pfad zu gefaehrden.

## Empfohlene Pilotkandidaten nach Hypothese

- Wenn der Hauptschmerz redaktionell oder preview-bezogen ist: Share-Flow rund um [share/share-pages-data.json](../share/share-pages-data.json), generierte Share-Seiten und [share/instagram-export.html](../share/instagram-export.html).
- Wenn der Hauptschmerz eher bei Komponenten, Karten, Rueckwegen und wiederkehrender UI-Komposition liegt: Aktuelles- und Rueckblick-Cluster auf [index.html](../index.html) inklusive Review-Runtime.
- Wenn der Hauptschmerz vor allem visuell-systemisch ist: ein begrenzter Design-Layer-Pilot auf einem klaren Homepage- oder Export-Cluster, ohne Inhaltsmodell und Plattform zugleich zu wechseln.

## Phase-1-Vergleichsmatrix fuer den ersten Pilot

| Pilotkandidat | Leit-Hypothese | Primaere Erfolgsmetriken | Stop-Kriterien | Heutige Einschaetzung |
| --- | --- | --- | --- | --- |
| Share-Flow, empfohlen | Strukturierte Inhalte, Preview und Export koennen in einem kleinen isolierten Flow verbessert werden, ohne den Static- und QA-Pfad zu destabilisieren. | Eine repräsentative Inhaltsaenderung braucht weniger manuelle Sync-Schritte; Share-Seite, Manifest und Export bleiben konsistent; lokaler Preview- und Gate-Pfad bleiben gleich gut oder werden klarer; Rueckfall auf den Ist-Zustand bleibt einfach. | Der Pilot fuehrt zu mehr statt weniger manueller Doppelpflege; Manifest- oder Export-Sync wird instabil; Quality-Gate oder Preview werden komplexer; der Pilot greift unerwartet in globale Navigation oder Kernruntime ein. | zuerst pruefen |
| Aktuelles- oder Rueckblick-Cluster | Ein Komponenten- oder Framework-Layer reduziert bei karten- und detailgetriebenen Flows echte Wiederholung und UI-Komplexitaet. | Karten, Detailzustand und Rueckwege werden mit weniger Sonderlogik gebaut; Pflege und QA werden fuer genau diesen Bereich einfacher; keine Regression in Review-Navigation oder History-Logik. | Plattformtest und Runtime-Refactor vermischen sich; Review-Navigation wird fragiler; Nutzen ist nach dem Pilot nicht klar vom bestehenden Static-Stack zu unterscheiden. | nur Fallback |
| Generatorisierter Homepage-Block oder Design-Layer-Minipilot | Ein visuell-systemischer Pilot bringt mehr Konsistenz, ohne zugleich Inhaltsmodell und Plattform zu wechseln. | Token- oder Komponentenregeln reduzieren sichtbare Inkonsistenz; der Pilot bleibt lokal begrenzt; Responsive- und QA-Fit bleiben stabil. | Design-, Inhalts- und Plattformfragen kippen in denselben Pilot; Erfolg ist nicht klar messbar; die Hauptseite wird frueh zum Risikotraeger. | spaeter pruefen |

## Vorgezogene Erfolgskriterien fuer den empfohlenen Share-Pilot

1. Eine echte Pflegeaenderung an einem Share-Inhalt laeuft ueber den Pilotpfad mit weniger manuellen Schritten als heute.
2. [share/share-pages-data.json](../share/share-pages-data.json), die generierten Share-Seiten, [share/share-pages.json](../share/share-pages.json) und [share/instagram-export.html](../share/instagram-export.html) bleiben nachweisbar synchron.
3. Der bestehende Gate-Pfad ueber [tmp/visual-qa/release_qa_smoke.py](../tmp/visual-qa/release_qa_smoke.py) bleibt unveraendert nutzbar oder wird einfacher nachvollziehbar.
4. Der Pilot braucht keinen Eingriff in globale Navigation, Hero, Sprachruntime oder Review-History.

## Vorgezogene Stop-Kriterien fuer den empfohlenen Share-Pilot

1. Zwei aufeinanderfolgende Pilotdurchlaeufe erzeugen mehr manuelle Doppelpflege statt weniger.
2. Preview, Export oder Manifest-Sync werden unzuverlaessiger als im heutigen Generatorpfad.
3. Der Pilot braucht mehr globale Runtime- oder Layout-Eingriffe als urspruenglich fuer einen kleinen isolierten Bereich vertretbar sind.
4. Der Mehrwert bleibt nach einer realen Inhaltsaenderung nur theoretisch und ist weder in Pflegezeit noch in QA- oder Preview-Fit sichtbar.

## Spike-Arbeitspakete fuer 1 bis 2 Wochen

### Arbeitspaket 1 - Ist-Aufnahme

- drei bis fuenf reale Inhaltsaenderungen der letzten Zeit nachzeichnen
- Pflegeaufwand, Preview-Reibung und QA-Aufwand fuer diese Aenderungen kurz protokollieren
- offene Mehrsprachigkeits- oder Strukturengpaesse sichtbar benennen

### Arbeitspaket 2 - Optionen bewerten

- nur zwei bis drei reale Zielpfade vergleichen, nicht alle denkbaren Tools
- Bewertungsachsen aus diesem Dokument fuer jede Option knapp ausfuellen
- pro Option klar benennen, was sie nicht loest

### Arbeitspaket 3 - Pilotbereich festlegen

- genau einen kleinen Pilotbereich waehlen
- Erfolgsmetriken festhalten: Pflegezeit, Preview-Qualitaet, QA-Fit, Rueckfalloption
- Stop-Kriterien aufschreiben, falls der Pilot den Nutzen nicht beweist

## Entscheidungsprotokoll zum Ausfuellen

- Datum:
- Beteiligte:
- abgeschlossener Responsive-Block bestaetigt: ja oder nein
- verglichene Optionen:
- empfohlene Option:
- begruendeter No-Go-Pfad:
- Pilotbereich:
- Erfolgsmetriken:
- Stop-Kriterien:

## Definition of Done fuer den Spike

- genau ein empfohlener Pilotpfad ist benannt
- mindestens ein anderer Grosshebel ist bewusst mit Begruendung verworfen oder vertagt
- der bestehende QA- und Deploy-Pfad bleibt fuer den Pilot gleichwertig oder besser abgesichert
- das Ergebnis laesst sich direkt aus [docs/POST-10-10-PLATFORM-PLAN.md](./POST-10-10-PLATFORM-PLAN.md) weiterfahren