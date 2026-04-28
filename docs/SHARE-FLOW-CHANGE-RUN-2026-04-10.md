# Share Flow Change Run 2026-04-10

Stand: 2026-04-10

## Zweck

Diese Notiz dokumentiert den ersten echten Change-Run fuer den Share-Pilot. Der Lauf wurde bewusst zuerst in einer isolierten Sandbox gefahren, um Dateifussabdruck, Laufzeit und unerwartete Sync-Effekte zu messen, ohne den Produktionsstand im Repo unkontrolliert zu veraendern.

## Change-Run A - isolierter Sandbox-Test

Sandbox: `tmp/share-flow-sandbox-2026-04-10`

Repräsentativer Testfall: [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html)

Geaenderter Inhalt in der Sandbox:

- `page_title` im zugehoerigen Eintrag in [share/share-pages-data.json](../share/share-pages-data.json)

Generator-Laufzeit in der Sandbox:

- `0.369` Sekunden fuer `python share/generate-share-pages.py`

Direkter Audit danach:

- [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html) blieb intern konsistent
- keine Audit-Warnungen

## Unerwarteter Befund

Der erste Sandbox-Lauf veraenderte nicht nur Quelle und den erwarteten Querbeet-Output, sondern zusaetzlich auch:

- [share/share-pages.json](../share/share-pages.json)
- [share/instagram-export.js](../share/instagram-export.js)

Die Ursache war kein Querbeet-Fehler, sondern ein versteckter Source-Drift im bestehenden Share-Bestand.

## Root-Cause

Die Datei [share/benefiz-trommelworkshop-2026.html](../share/benefiz-trommelworkshop-2026.html) war bereits im Repo vorhanden und wurde auch ueber Homepage und Exportpfad verwendet, aber der zugehoerige kanonische Eintrag fehlte komplett in [share/share-pages-data.json](../share/share-pages-data.json).

Konkrete Wirkung dieses Drifts:

1. Der Generator konnte die Benefiz-Seite nicht aus der Quelle rekonstruieren.
2. Ein beliebiger Generator-Lauf normalisierte deshalb Manifest und Fallback-Liste weg von diesem Eintrag.
3. Ein harmloser Test-Change an Querbeet legte dadurch einen fachlich unverbundenen Seiteneffekt offen.

## Validierter Fix

Der fehlende Eintrag fuer `benefiz-trommelworkshop-2026.html` wurde zuerst in der Sandbox sauber nachgetragen und danach im echten Repo in [share/share-pages-data.json](../share/share-pages-data.json) uebernommen.

Nach dem Fix:

- Sandbox-Generator-Laufzeit fuer den eigentlichen Root-Cause-Fix: `0.114` Sekunden
- Produktiver Generator-Lauf: `{"pageCount": 22, "changedOutputs": ["benefiz-trommelworkshop-2026.html"]}`
- Produktiver Audit fuer [share/benefiz-trommelworkshop-2026.html](../share/benefiz-trommelworkshop-2026.html): keine Warnungen
- Erneuter Release-Smoke gegen `http://127.0.0.1:8123` nach dem Fix: `issueCount: 0` in [tmp/visual-qa/release-qa-results.json](../tmp/visual-qa/release-qa-results.json)

## Tatsaechlicher Produktions-Fussabdruck des Fixes

Gegen den Live-Stand vor dem Fix waren nach validiertem Root-Cause-Abgleich genau diese Dateien betroffen:

- [share/share-pages-data.json](../share/share-pages-data.json)
- [share/benefiz-trommelworkshop-2026.html](../share/benefiz-trommelworkshop-2026.html)

Unveraendert blieben nach dem finalen Abgleich:

- [share/share-pages.json](../share/share-pages.json)
- [share/instagram-export.js](../share/instagram-export.js)
- [share/instagram-export.html](../share/instagram-export.html)

## Bedeutung fuer den Pilot

Der erste echte Change-Run hat zwei wichtige Dinge belegt:

1. Der eigentliche generatorbasierte Share-Pfad bleibt klein und kontrollierbar, wenn Quelle und abgeleitete Artefakte wirklich auf demselben Stand sind.
2. Vor jedem Pilotvergleich muss zuerst geprueft werden, ob es verwaiste Share-Seiten oder Manifest-Eintraege ausserhalb der kanonischen Quelle gibt.

Pragmatische Folgerung fuer weitere Pilotlaeufe:

- Unerwartete Diffs in Manifest oder Fallback-Liste zuerst als moeglichen Source-Drift behandeln, nicht vorschnell als Pilot-Nachteil interpretieren.