# Post-10/10 Platform Plan

Stand: 2026-04-10

## Zweck

Dieser Plan startet erst nach dem Abschluss des aktuellen 10/10-Blocks in [docs/FOUR-WEEK-PLAN-10-10.md](../docs/FOUR-WEEK-PLAN-10-10.md). Er behandelt die vier bewusst ausgeklammerten Grosshebel:

- Vollstaendige Framework-Migration
- Komplett neuer Design-Layer
- CMS-Einfuehrung
- Mehrmonatiger Neuaufbau aller Seitenquellen auf einmal

Diese Punkte sind keine vergessenen Restarbeiten des laufenden Blocks, sondern eine eigene strategische Folgephase.

Vor einem moeglichen Wechsel in einen Design-Layer-, CMS- oder Framework-Pfad sollte jedoch zuerst der vorgeschaltete UI-/Responsive-Block aus [docs/RESPONSIVE-UX-UI-10-10-PLAN.md](../docs/RESPONSIVE-UX-UI-10-10-PLAN.md) durchlaufen werden.

## Entscheidungsampel

- Abgeschlossen: Der manuelle Homepage-Screenreader-Pass ist dokumentiert; der aktuelle 10/10-Block ist damit formal beendet.
- Danach: den Folgeblock aus [docs/RESPONSIVE-UX-UI-10-10-PLAN.md](../docs/RESPONSIVE-UX-UI-10-10-PLAN.md) fahren und Responsive-, Reflow-, Mobile- und Kernflow-UX sichtbar auf 10/10 ziehen.
- Erst dann: den Architekturspike starten und auf der bereinigten UX-Basis entscheiden, ob ein Design-Layer-, CMS- oder Framework-Pilot wirklich noetig ist.
- Erst nach einem positiven Spike: genau einen kleinen Pilotbereich waehlen, statt mehrere Grosshebel parallel zu starten.

## Klare Einordnung der vier Punkte

### 1. Vollstaendige Framework-Migration

Eine komplette Migration ist aus dem aktuellen Repo-Zustand kein Pflichtschritt. Sie wird erst sinnvoll, wenn statische Generierung, komponentisierte Wiederverwendung, Vorschau-Workflows und strukturierte Mehrsprachigkeit den Mehraufwand klar rechtfertigen.

Empfehlung:

- nur statisch orientiertes Zielbild pruefen, nicht clientlastigen Komplettumbau
- zuerst Architekturspike, dann kleiner Pilot
- keine Vollmigration vor einem belastbaren Pilotbereich

### 2. Komplett neuer Design-Layer

Ein neuer Design-Layer ist moeglich, aber nicht als sofortiger Reset. Erst muessen Content-Struktur, Komponenten-Inventar und Design-Tokens sauber stehen; erst danach lohnt ein sichtbarer Redesign-Schritt.

Empfehlung:

- zuerst Token-, Typografie- und Spacing-System definieren
- sichtbaren Relaunch nur auf Basis echter Komponenten fahren
- nicht parallel mit Framework- und CMS-Pilot koppeln

### 3. CMS-Einfuehrung

Ein CMS ist nur dann sinnvoll, wenn der redaktionelle Bedarf real ist: mehrere Bearbeiter, haeufige Inhaltsaenderungen, Preview-Bedarf oder klarer Pflegeengpass in den bestehenden JSON-/Generatorquellen.

Empfehlung:

- Build-Time- oder Headless-CMS bevorzugen, nicht clientseitige Editierlogik
- zuerst nur generatorisierte Bereiche anbinden
- redaktionellen Pilotfluss belegen, bevor breite Rollouts starten

### 4. Mehrmonatiger Neuaufbau aller Seitenquellen auf einmal

Als Big-Bang-Vorhaben ist das nicht empfehlenswert. Der richtige Weg ist ein Wellenmodell mit klaren Go-/No-Go-Gates nach jeder Welle.

Empfehlung:

- Pilot statt Komplettumbau
- jede Welle mit QA, Handoff und Rueckfalloption abschliessen
- alte Pfade erst abschalten, wenn die neue Welle stabil belegt ist

## Entscheidungsregeln

1. Maximal einer dieser Grosshebel startet gleichzeitig.
2. Keine Framework- oder CMS-Entscheidung ohne vorheriges Pflege- und Inhaltsmodell.
3. Kein visueller Komplettumbau, solange Komponenten- und Quellarchitektur nicht stabil sind.
4. Der bestehende Static-/QA-/Deploy-Pfad bleibt erhalten, bis ein Pilot ihn gleichwertig oder besser ersetzt.
5. Der richtige Beschluss kann auch sein, einen dieser Punkte bewusst noch nicht zu starten.

## Empfohlene Reihenfolge

### Phase 0 - Aktuellen Block schliessen (abgeschlossen am 2026-04-10)

Ziel: den laufenden 10/10-Block wirklich abschliessen.

Budget: 0,5 bis 1 Tag

- Abgeschlossen: Der Homepage-NVDA-Kurzpass aus [docs/NVDA-QUICK-PASS.md](../docs/NVDA-QUICK-PASS.md) lief am 2026-04-10 mit `pass` ohne dokumentierte Blocker.
- Abgeschlossen: Das Ergebnis ist im Freigabestatus von [docs/FRONTEND-HANDOFF.md](../docs/FRONTEND-HANDOFF.md) eingetragen.
- Abgeschlossen: Woche 4 in [docs/FOUR-WEEK-PLAN-10-10.md](../docs/FOUR-WEEK-PLAN-10-10.md) ist damit formal geschlossen.

### Phase 0.5 - Responsive UX/UI auf 10/10 ziehen

Ziel: die bestehende Seite in Responsive Design, UX und UI sichtbar beruhigen und systematisieren, bevor ueber CMS, Design-Layer oder Framework-Pilot entschieden wird.

Budget: 4 Wochen

- den Folgeblock aus [docs/RESPONSIVE-UX-UI-10-10-PLAN.md](../docs/RESPONSIVE-UX-UI-10-10-PLAN.md) durchlaufen
- Responsive-, Reflow-, Karten-, Hero- und Rueckweg-Qualitaet bewusst auf 10/10-Niveau pruefen
- erst danach ueber einen tieferen Plattformhebel entscheiden

### Phase 1 - Entscheidungs- und Architekturspike

Ziel: entscheiden, ob Framework, CMS oder neuer Design-Layer jetzt ueberhaupt gebraucht werden.

Budget: 1 bis 2 Wochen

Arbeitsartefakt fuer diese Phase: [docs/ARCHITECTURE-SPIKE-DECISION.md](./ARCHITECTURE-SPIKE-DECISION.md)

- Pflege- und Redaktionsbedarf aufnehmen
- aktuelle Wartungs- und Mehrsprachigkeitsschmerzen konkret benennen
- 2 bis 3 Zielarchitekturen vergleichen
- klares Go-/No-Go fuer Framework, CMS und Design-Reset dokumentieren

Definition of Done:

- eine kurze Entscheidungsdoku liegt vor
- ein Pilotbereich ist benannt
- klare Nicht-Ziele sind festgehalten

### Phase 2 - Struktur- und Inhaltsmodell

Ziel: eine gemeinsame Basis fuer Komponenten, Tokens und strukturierte Inhalte definieren.

Budget: 1 bis 2 Wochen

- Komponenten-Inventar und Design-Tokens definieren
- gemeinsames Inhaltsschema fuer mehrsprachige Bloecke festlegen
- Build-, Preview- und Freigabevertrag fuer kuenftige Quellen festschreiben

Definition of Done:

- Token- und Komponentenbasis ist dokumentiert
- ein gemeinsames Inhaltsschema fuer den Pilotbereich steht
- der aktuelle QA-Gate bleibt unveraendert nutzbar

### Phase 3 - Kleiner Pilot

Ziel: genau einen der Grosshebel an einem risikoarmen Bereich beweisen.

Budget: 2 bis 4 Wochen

- vorbefuellte Empfehlung aus dem heutigen Spike-Stand: zuerst der Share-Flow rund um [share/share-pages-data.json](../share/share-pages-data.json), die generierten Share-Seiten unter [share](../share), [share/share-pages.json](../share/share-pages.json) und [share/instagram-export.html](../share/instagram-export.html)
- konkreter Pilotumriss fuer diese Empfehlung: [docs/SHARE-FLOW-PILOT-OUTLINE.md](./SHARE-FLOW-PILOT-OUTLINE.md)
- direkte Umsetzungsstrecke fuer denselben Pilot: [docs/SHARE-FLOW-PILOT-CHECKLIST.md](./SHARE-FLOW-PILOT-CHECKLIST.md)
- aktuell isolierter Phase-2-Snapshot-Pfad fuer denselben Pilot: [docs/SHARE-FLOW-PILOT-PATH-2026-04-10.md](./SHARE-FLOW-PILOT-PATH-2026-04-10.md)
- Aktuelles-Bereich oder ein weiterer generatorisierter Homepage-Block bleiben nur Fallback-Kandidaten, falls der Responsive-Block oder der eigentliche Spike spaeter eine andere Hauptthese belegt
- bei Framework-Pilot nur statischen Output fuer den Pilotbereich bauen
- bei CMS-Pilot nur die Pilotquellen redaktionell anbinden
- bei Design-Pilot nur einen kleinen Satz echter Komponenten sichtbar erneuern

Definition of Done:

- der Pilot ist lokal und fachlich pruefbar
- Smoke-QA und manueller Kurzcheck laufen fuer den Pilotbereich sauber
- Pflege- und Entwicklungsaufwand gegen den Ist-Zustand sind nachvollziehbar bewertet

### Phase 4 - Wellenrollout statt Big Bang

Ziel: die erfolgreiche Pilotentscheidung kontrolliert ueber die Seite ausrollen.

Budget: mehrmonatiger Rollout in Wellen

- Wave 1: Share plus redaktionell aktive Homepage-Bereiche
- Wave 2: Legal-Seiten plus Chronik
- Wave 3: restliche grosse Homepage-Cluster und verbleibende Quellpfade

Definition of Done:

- jede Welle endet mit Release-Smoke, manueller QA und aktualisierter Doku
- alte Quellpfade werden erst nach stabiler Zielwelle stillgelegt
- kein Rollout ohne Rueckfalloption

## Was explizit nicht passieren sollte

1. Framework-Migration, Redesign und CMS-Einfuehrung in einem einzigen Schritt koppeln.
2. Die komplette Site visuell und technisch gleichzeitig neu aufbauen.
3. Den bestehenden Static-/QA-/Deploy-Pfad vor einem stabilen Pilot abbrechen.
4. Alle Seitenquellen in einem einzigen langen Umbau ohne Zwischen-Gates verschieben.

## Empfohlene Prioritaet nach dem 10/10-Block

1. Architekturspike und Entscheidungsdoku erstellen.
2. Genau einen kleinen Pilotbereich waehlen.
3. Erst danach ueber Framework, CMS oder Design-Layer im groesseren Umfang entscheiden.