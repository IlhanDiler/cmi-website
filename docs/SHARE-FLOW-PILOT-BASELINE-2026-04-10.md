# Share Flow Pilot Baseline 2026-04-10

Stand: 2026-04-10

## Zweck

Diese Notiz dokumentiert die aktuelle Ist-Baseline fuer den empfohlenen Share-Pilot, bevor irgendein technischer Pilotpfad gebaut wird. Sie bezieht sich auf den repräsentativen Testfall [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html).

## Reproduzierbarer Audit

Fuer denselben Testfall kann der aktuelle Baseline-Zustand jederzeit mit folgendem Kommando geprueft werden:

```bash
python share/share_flow_baseline.py querbeet-roundup-2025.html
```

Das Script liegt unter [share/share_flow_baseline.py](../share/share_flow_baseline.py) und prueft Datenquelle, generierte Share-Seite, Manifest und Fallback-Liste zusammen.

Der erste echte Change-Run inklusive Drift-Fund und Root-Cause-Fix ist separat in [docs/SHARE-FLOW-CHANGE-RUN-2026-04-10.md](./SHARE-FLOW-CHANGE-RUN-2026-04-10.md) dokumentiert.

## Audit-Ergebnis 2026-04-10

Am 2026-04-10 wurden zwei repräsentative Pfade geprueft und beide lieferten aktuell keine Warnungen.

| Testfall | Variante | Sprache | Ergebnis |
| --- | --- | --- | --- |
| [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html) | `poster` | `tr` / `tr_TR` | alle Sync-Checks `ja` |
| [share/internationales-galakonzert-ochsenfurt-2026.html](../share/internationales-galakonzert-ochsenfurt-2026.html) | `standard` | `tr` / `tr_TR` | alle Sync-Checks `ja` |

Gemeinsam bestaetigt ist damit aktuell:

- Quelle vorhanden: ja
- generierte Share-Seite vorhanden: ja
- Manifest-Eintrag vorhanden: ja
- Fallback-Eintrag in [share/instagram-export.js](../share/instagram-export.js) vorhanden: ja
- `title`, `canonical_url`, `og_url`, `lang` und `variant` stimmen zwischen Quelle und generierter Seite ueberein: ja

## Repräsentativer Testfall

- Dateiname: [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html)
- Variante: `poster`
- Sprache: `tr`
- Locale: `tr_TR`
- Datenquelle: Eintrag in [share/share-pages-data.json](../share/share-pages-data.json)

Als zweiter Kontrollfall fuer den Standard-Pfad wurde [share/internationales-galakonzert-ochsenfurt-2026.html](../share/internationales-galakonzert-ochsenfurt-2026.html) geprueft.

## Aktuelle Artefaktkette

1. Die einzige manuell gepflegte Quelle fuer den Testfall ist [share/share-pages-data.json](../share/share-pages-data.json).
2. Der Generator [share/generate-share-pages.py](../share/generate-share-pages.py) rendert daraus die Share-Seite [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html).
3. Derselbe Generator synchronisiert [share/share-pages.json](../share/share-pages.json).
4. Derselbe Generator synchronisiert die Fallback-Liste in [share/instagram-export.js](../share/instagram-export.js).
5. Die laufende Export-Oberflaeche in [share/instagram-export.html](../share/instagram-export.html) konsumiert Manifest und Exportlogik als nachgelagerte Runtime-Flaeche.

## Ist-Baseline fuer eine repräsentative Inhaltsaenderung

- Manuell gepflegte Quelldateien: `1`
- Generator-Kommando: `python share/generate-share-pages.py`
- Durch den Generator synchron gehaltene Artefakte: `3`
  - [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html)
  - [share/share-pages.json](../share/share-pages.json)
  - [share/instagram-export.js](../share/instagram-export.js)
- Direkte Verifikationsflaechen nach der Aenderung: `2`
  - [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html)
  - [share/instagram-export.html](../share/instagram-export.html)
- Optionaler technischer Gate-Nachlauf: `1`
  - [tmp/visual-qa/release_qa_smoke.py](../tmp/visual-qa/release_qa_smoke.py)

## Aktuell bereits belegte Sync-Punkte

Fuer Poster- und Standard-Pfad ist der heutige Ist-Zustand konsistent, wenn der Audit wie erwartet ausfaellt:

- Eintrag in [share/share-pages-data.json](../share/share-pages-data.json) vorhanden
- generierte Share-Seite vorhanden
- Eintrag in [share/share-pages.json](../share/share-pages.json) vorhanden
- Eintrag in `FALLBACK_SHARE_PAGES` in [share/instagram-export.js](../share/instagram-export.js) vorhanden
- `title`, `canonical_url`, `og_url`, `lang` und `variant` stimmen zwischen Datenquelle und generierter Share-Seite ueberein

## Relevante heutige Reibungspunkte

- Die eigentliche Quelle ist sauber zentralisiert, aber der Pilot muss beweisen, dass Preview- und Export-Vertrag trotzdem nachvollziehbarer werden als heute.
- Manifest- und Fallback-Sync sind aktuell generatorgestuetzt; jeder neue Pilot darf diese Sicherheit nicht verlieren.
- Die Export-Seite haengt an lokalisierter Copy, Asset-Normalisierung und Canvas-Exportregeln; gerade dieser Bereich ist fuer den Pilot wertvoll, aber auch sensibel.

## Vergleichsziel fuer den Pilot

Ein erfolgreicher Pilot sollte gegen diese Baseline mindestens einen klaren Vorteil belegen:

1. weniger manuelle oder gedankliche Sync-Schritte pro Aenderung
2. mindestens gleich guter Manifest- und Export-Sync
3. gleichwertiger oder besserer Preview- und QA-Fit
4. kein Eingriff in globale Site-Module ausserhalb des Share-Flows