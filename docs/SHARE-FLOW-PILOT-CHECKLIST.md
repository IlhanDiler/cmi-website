# Share Flow Pilot Checklist

Stand: 2026-04-10

## Ziel

Diese Checkliste zieht den empfohlenen Share-Pilot aus [docs/SHARE-FLOW-PILOT-OUTLINE.md](./SHARE-FLOW-PILOT-OUTLINE.md) in eine konkrete Umsetzungsreihenfolge mit klaren Abnahmepunkten. Sie ist als kleine Arbeitsstrecke fuer genau einen isolierten Pilot gedacht, nicht als allgemeiner Umbauplan fuer die ganze Site.

## Guardrails vor dem Start

- [ ] Der bestehende Generatorpfad ueber [share/share-pages-data.json](../share/share-pages-data.json) und [share/generate-share-pages.py](../share/generate-share-pages.py) bleibt bis zum Pilotende autoritativ.
- [ ] Der Pilot greift nicht in globale Navigation, Sprachruntime, Hero oder Review-Logik ein.
- [ ] Rueckfall auf den Ist-Zustand ist in einem kleinen Schritt moeglich.
- [ ] Der repräsentative Testfall ist festgelegt, standardmaessig [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html).

## Phase 1 - Baseline aufnehmen

- [ ] Baseline-Audits fuer mindestens einen Poster- und einen Standard-Fall fahren.
- [ ] Poster-Fall mit `python share/share_flow_baseline.py querbeet-roundup-2025.html` fahren.
- [ ] Standard-Fall mit `python share/share_flow_baseline.py internationales-galakonzert-ochsenfurt-2026.html` fahren.
- [ ] Die aktuelle Ist-Notiz in [docs/SHARE-FLOW-PILOT-BASELINE-2026-04-10.md](./SHARE-FLOW-PILOT-BASELINE-2026-04-10.md) als Referenz offen halten.
- [ ] Den ersten echten Referenzlauf aus [docs/SHARE-FLOW-CHANGE-RUN-2026-04-10.md](./SHARE-FLOW-CHANGE-RUN-2026-04-10.md) mitlesen.
- [ ] Eine reale Aenderung am Testfall im heutigen Ist-Zustand durchspielen.
- [ ] Beruehrte Dateien notieren.
- [ ] Anzahl manueller Sync-Schritte bis Share-Seite, Manifest und Export konsistent sind, notieren.
- [ ] Zeitbedarf fuer diese Aenderung notieren.
- [ ] Reibungspunkte kurz benennen: Pflege, Preview, Export, Sync, Rueckfall.
- [ ] Wenn dabei unerwartete Manifest- oder Fallback-Diffs auftauchen, zuerst auf Share-Dateien pruefen, die nicht in [share/share-pages-data.json](../share/share-pages-data.json) modelliert sind.

Abnahme fuer Phase 1:

- [ ] Eine kurze Ist-Baseline liegt vor und ist spaeter mit dem Pilot vergleichbar.

## Phase 2 - Pilotpfad zuschneiden

- [ ] Den separaten Snapshot-Pfad in [docs/SHARE-FLOW-PILOT-PATH-2026-04-10.md](./SHARE-FLOW-PILOT-PATH-2026-04-10.md) als Ausgangspunkt verwenden.
- [ ] Genau einen technischen Pilotpfad definieren, der nur den Share-Flow verbessert.
- [ ] Pilotartefakte klar vom Produktionspfad trennen.
- [ ] Generator, Manifest und Export nur dort anfassen, wo der Pilot es wirklich braucht.
- [ ] Keine Aenderung am bestehenden Quality-Gate ohne zwingenden Bedarf.

Abnahme fuer Phase 2:

- [ ] Der Pilot ist fachlich isoliert und beruehrt keine globalen Site-Module.

## Phase 3 - Testfall durch den Pilotpfad fuehren

- [ ] Denselben Testfall wie in Phase 1 ueber den Pilotpfad aendern.
- [ ] Share-Seite korrekt erzeugen oder darstellen.
- [ ] [share/share-pages.json](../share/share-pages.json) bleibt konsistent.
- [ ] [share/instagram-export.html](../share/instagram-export.html) und die zugehoerige Exportlogik bleiben konsistent.
- [ ] Fallback- oder Manifest-Sync bricht nicht.

Abnahme fuer Phase 3:

- [ ] Ein vollstaendiger End-to-End-Durchlauf fuer genau einen realen Inhalt funktioniert.

## Phase 4 - QA und Preview gegenpruefen

- [ ] Lokalen Preview-Server gegen den Pilot pruefen.
- [ ] Relevanten Teil des Share- und Export-Flows visuell gegenpruefen.
- [ ] Den bestehenden Smoke- oder Gate-Pfad mindestens einmal gegen den Pilot laufen lassen.
- [ ] Sicherstellen, dass private Docs-Preview und uebrige Doku-Pfade nicht komplizierter werden.

Abnahme fuer Phase 4:

- [ ] Der Pilot ist gleichwertig oder besser gegen den bestehenden QA- und Preview-Vertrag abgesichert.

## Phase 5 - Vergleich und Entscheidung

- [ ] Ist-Baseline und Pilotlauf direkt vergleichen.
- [ ] Datei- und Schrittanzahl vergleichen.
- [ ] Pflegezeit vergleichen.
- [ ] Preview- und Export-Klarheit vergleichen.
- [ ] Go oder No-Go kurz begruenden.

Abnahme fuer Phase 5:

- [ ] Es liegt eine klare Entscheidung vor, ob der Pilot weiterverfolgt oder verworfen wird.

## Erfolgsschwelle

- [ ] Weniger manuelle Schritte als im Ist-Zustand.
- [ ] Kein Verlust bei Manifest-, Export- oder Preview-Sync.
- [ ] Kein Eingriff in globale Runtime- oder Layoutmodule.
- [ ] Rueckfall auf den Ist-Zustand bleibt einfach.

## Sofort abbrechen wenn

- [ ] mehr manuelle Doppelpflege entsteht statt weniger.
- [ ] Manifest- oder Export-Sync fragiler wird.
- [ ] globale Navigation, Sprache oder Hauptseitenstruktur in den Pilot hineingezogen werden.
- [ ] nach einem echten Testfall kein messbarer Vorteil uebrig bleibt.

## Abschlussnotiz

- [ ] Ergebnis in [docs/ARCHITECTURE-SPIKE-DECISION.md](./ARCHITECTURE-SPIKE-DECISION.md) oder einer separaten Entscheidungsnotiz nachziehen.
- [ ] Nur bei echtem Go weitere Pilot- oder Rollout-Schritte planen.