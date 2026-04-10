# Share Flow Pilot Path 2026-04-10

Stand: 2026-04-10

## Zweck

Diese Notiz definiert den eigentlichen Phase-2-Pilotpfad fuer den Share-Flow. Ziel ist kein Ersatz des produktiven Generatorpfads, sondern ein sauber getrenntes Snapshot-Bundle, das aus der kanonischen Quelle einen kleinen repräsentativen Share-/Export-Ausschnitt baut.

## Technischer Pilotpfad

Kommando:

```bash
python share/build_share_pilot_bundle.py
```

Standard-Zielverzeichnis:

- `tmp/share-flow-pilot/`

Gebauter Share-Snapshot:

- `tmp/share-flow-pilot/share/`

## Standard-Scope des Bundles

Das Pilot-Bundle ist absichtlich klein und deckt drei repräsentative Pfade ab:

1. [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html) als Poster-Pfad
2. [share/internationales-galakonzert-ochsenfurt-2026.html](../share/internationales-galakonzert-ochsenfurt-2026.html) als eventartiger Standard-Pfad
3. [share/benefiz-trommelworkshop-2026.html](../share/benefiz-trommelworkshop-2026.html) als reviewartiger Standard-Pfad

Optional koennen andere Dateinamen direkt an das Kommando uebergeben werden.

## Was der Pilotpfad baut

Aus [share/share-pages-data.json](../share/share-pages-data.json) entstehen im getrennten Snapshot nur die benoetigten Pilotartefakte:

- gerenderte Share-Seiten fuer den kleinen Pilot-Scope
- ein eigenes `share-pages.json` im Pilot-Bundle
- ein eigenes `instagram-export.js` mit passender Fallback-Liste nur fuer den Pilot-Scope
- Kopien von [share/instagram-export.html](../share/instagram-export.html), [share/instagram-export.css](../share/instagram-export.css), [share/share-preview.css](../share/share-preview.css) und `cmi-website-qr.png`
- ein kleines `bundle.json` als Build-Zusammenfassung

## Was der Pilotpfad bewusst nicht tut

- er schreibt nicht in [share/share-pages.json](../share/share-pages.json)
- er schreibt nicht in [share/instagram-export.js](../share/instagram-export.js)
- er ersetzt keine produktiven Share-Seiten unter [share](../share)
- er aendert weder Quality-Gate noch globale Runtime

## Trennlinie zum Produktionspfad

Der produktive Pfad bleibt weiter:

```bash
python share/generate-share-pages.py
```

Der Pilotpfad ist nur ein Snapshot-Bundle unter `tmp/` und darf bis zu einem echten Go nie als Produktionsquelle behandelt werden.

## Erwartetes Ergebnis nach einem Pilot-Build

1. Unter `tmp/share-flow-pilot/share/` liegt ein isolierter Mini-Share-Bestand.
2. [tmp/share-flow-pilot/share/instagram-export.html](../tmp/share-flow-pilot/share/instagram-export.html) laeuft mit eigenem lokalen Manifest.
3. Der Pilot kann gegen Preview, Export und QA-Fit getestet werden, ohne den produktiven Share-Bestand umzuschreiben.

## Warum dieser Pfad fuer Phase 2 sinnvoll ist

- Der Pilot bekommt echte Artefakttrennung statt nur theoretischer Doku.
- Preview- und Export-Vertrag bleiben sichtbar testbar.
- Der bestehende produktive Generator bleibt autoritativ und rueckfallfaehig.
- Ein spaeterer Pilotvergleich kann jetzt Ist-Pfad gegen isolierten Snapshot-Pfad messen, ohne Mischarchitektur im Live-Share-Ordner.