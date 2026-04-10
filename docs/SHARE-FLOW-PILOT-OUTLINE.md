# Share Flow Pilot Outline

Stand: 2026-04-10

## Zweck

Dieses Dokument uebersetzt die vorgezogene Share-Flow-Empfehlung aus [docs/ARCHITECTURE-SPIKE-DECISION.md](./ARCHITECTURE-SPIKE-DECISION.md) in einen kleinen, pruefbaren Pilotumriss. Ziel ist nicht ein sofortiger Plattformwechsel, sondern ein kontrollierter Beweis, ob genau dieser Flow von einem staerkeren Struktur-, Preview- oder Komponentenvertrag real profitiert.

Die konkrete Reihenfolge mit Abnahmepunkten steht in [docs/SHARE-FLOW-PILOT-CHECKLIST.md](./SHARE-FLOW-PILOT-CHECKLIST.md).

Die aktuelle Ist-Baseline fuer den Standardtestfall steht in [docs/SHARE-FLOW-PILOT-BASELINE-2026-04-10.md](./SHARE-FLOW-PILOT-BASELINE-2026-04-10.md).

Der aktuelle Phase-2-Pilotpfad ist in [docs/SHARE-FLOW-PILOT-PATH-2026-04-10.md](./SHARE-FLOW-PILOT-PATH-2026-04-10.md) konkretisiert.

## Pilotgrenze

Im Scope des Piloten:

- [share/share-pages-data.json](../share/share-pages-data.json)
- [share/generate-share-pages.py](../share/generate-share-pages.py)
- [share/share-pages.json](../share/share-pages.json)
- die generierten Share-Seiten unter [share](../share)
- [share/instagram-export.html](../share/instagram-export.html)
- [share/instagram-export.js](../share/instagram-export.js)
- [share/instagram-export.css](../share/instagram-export.css)

Ausserhalb des Piloten:

- globale Navigation oder Sprachruntime
- Hero, Review-Flow oder Hauptseiten-Layout
- generelle CMS- oder Framework-Einfuehrung fuer die ganze Site

## Pilot-Hypothese

Ein kleiner Pilot im Share-Flow kann die Pflege eines repräsentativen Share-Inhalts, die Vorschau ueber Share-Seite und Instagram-Export sowie den Sync zu Manifest und Fallback-Liste vereinfachen, ohne den bestehenden Static-, QA- und Deploy-Pfad zu destabilisieren.

## Repräsentativer Testfall

Der Pilot sollte mindestens einen echten Inhalt komplett abdecken, zum Beispiel [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html), inklusive:

- Datenquelle in [share/share-pages-data.json](../share/share-pages-data.json)
- erzeugter Share-Seite
- Eintrag in [share/share-pages.json](../share/share-pages.json)
- Darstellung in [share/instagram-export.html](../share/instagram-export.html)
- Export- und Caption-Verhalten in [share/instagram-export.js](../share/instagram-export.js)

## Arbeitspakete

### Arbeitspaket 1 - Baseline festhalten

- eine echte Aenderung an einem Share-Inhalt einmal im Ist-Zustand durchspielen
- dabei Anzahl der beruehrten Dateien, notwendige Generator-Schritte und QA-Schritte protokollieren
- aktuelle Reibungspunkte benennen: Pflege, Preview, Export, Sync, Rueckfall

Erwartetes Ergebnis:

- eine kleine Baseline mit echten Ist-Kosten liegt vor

### Arbeitspaket 2 - Pilotpfad isolieren

- genau einen Pilotpfad waehlen, der den Share-Flow verbessert, aber den Rest der Site unberuehrt laesst
- Pilotartefakte so ablegen, dass der heutige Generatorpfad parallel weiter funktioniert
- keine Umschaltung des Deploy-Pfads, solange der Pilot nicht gleichwertig oder besser validiert ist

Erwartetes Ergebnis:

- der Pilot ist fachlich und technisch isoliert

### Arbeitspaket 3 - Repräsentativen Inhalt durch den Pilotpfad fuehren

- denselben Testfall wie in Arbeitspaket 1 durch den Pilotpfad pflegen
- pruefen, ob Share-Seite, Manifest und Export weiter korrekt zusammenlaufen
- Quality-Gate und lokaler Preview-Pfad muessen fuer den Pilot gleichwertig bleiben

Erwartetes Ergebnis:

- der Pilot erzeugt einen vollstaendigen End-to-End-Ausgang fuer genau einen realen Inhalt

### Arbeitspaket 4 - Vergleich und Entscheidung

- Ist-Zustand und Pilot gegeneinander halten
- Pflegezeit, Datei- und Schrittanzahl, Preview-Klarheit und QA-Fit vergleichen
- Go oder No-Go fuer einen groesseren Pilot oder einen Abbruch dokumentieren

Erwartetes Ergebnis:

- eine begruendete Entscheidung liegt vor, nicht nur ein technischer Prototyp

## Messpunkte

### Pflege

- Anzahl manuell beruehrter Dateien pro inhaltlicher Aenderung
- Anzahl expliziter Sync-Schritte bis Share-Seite, Manifest und Export konsistent sind
- Zeitbedarf fuer eine repräsentative Inhaltsaenderung

### Preview und Export

- Share-Seite zeigt die Aenderung ohne zusaetzliche Nacharbeit korrekt
- Export-Seite uebernimmt Bild, Titel, Kurztext, Caption-Helfer und Link konsistent
- keine neue Inkonsistenz zwischen Seite, Manifest und Export

### QA und Betriebsfit

- bestehender Lauf ueber [tmp/visual-qa/release_qa_smoke.py](../tmp/visual-qa/release_qa_smoke.py) bleibt fuer den Pilot nutzbar
- lokaler Preview-Server und private Docs-Preview werden nicht komplizierter
- Rueckfall auf den Ist-Zustand bleibt in einem kleinen Schritt moeglich

## Erfolgskriterien

1. Eine echte Share-Aenderung braucht weniger manuelle Schritte als heute.
2. Pilotpfad und bestehender Gate-Pfad koennen ohne Sonderwissen nachvollzogen werden.
3. Share-Seite, Manifest und Export bleiben fuer den Testfall nachweisbar synchron.
4. Der Pilot erzeugt keinen Zwang, globale Runtime oder Navigation mitzuziehen.

## Stop-Kriterien

1. Der Pilot fuehrt zu mehr manueller Doppelpflege statt zu weniger.
2. Export- oder Manifest-Sync wird fragiler als im heutigen Generatorpfad.
3. Der Pilot braucht fuer einen kleinen Inhalt bereits globale Eingriffe in Navigation, Sprache oder Hauptseiten-Struktur.
4. Der Unterschied zum Ist-Zustand ist nach einem echten Testfall nicht messbar genug, um weiteren Umbau zu rechtfertigen.

## Rueckfallpfad

- Der heutige Generatorpfad bleibt bis zum Ende des Piloten die autoritative Produktionsstrecke.
- Pilotartefakte duerfen den aktuellen Share-Output nicht ersetzen, solange nicht alle Erfolgskriterien erreicht sind.
- Wenn ein Stop-Kriterium greift, Pilotpfad verwerfen und beim bestehenden Share-Generator bleiben.
- Bereits gewonnenes Wissen nur als Doku, nicht als halb fertige Mischarchitektur im Deploy-Pfad stehenlassen.

## Definition of Done

- ein repräsentativer Share-Inhalt ist einmal sauber durch den Pilot gelaufen
- Messpunkte sind mit Ist- und Pilotwerten gefuellt
- Erfolg oder Abbruch ist begruendet dokumentiert
- der bestehende Site- und QA-Betrieb blieb waehrend des Piloten stabil