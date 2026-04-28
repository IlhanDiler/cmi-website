# Accessibility Sweep Results 2026-04-10

Stand: vorbereitet am 2026-04-10

Status: `not run yet`

Letzter gesicherter Bedienstand: Am 2026-04-10 wurde per Rueckmeldung bestaetigt, dass der breite manuelle Sweep fuer Chronik, Legal-Seiten, Share-Seite und Instagram-Export bis jetzt noch nicht gefahren wurde.

## Zweck

Diese Datei sammelt den echten Ergebnisstand fuer den breiteren Accessibility-Sweep ueber Homepage, Chronik, Legal-Seiten, Share-Seite und Instagram-Export. Sie dokumentiert bewusst nur gesicherte Fakten und markiert die noch fehlenden manuellen Angaben offen, statt einen nicht gefahrenen Sweep nachtraeglich glattzuziehen.

## Bereits gesicherte Vorbedingungen

- Automatischer Gate-Status: bestanden am 2026-04-10 mit `QA_BROWSER_TARGETS=chromium,firefox` und `QA_FAIL_ON_ISSUES=1`, 0 Funde in [tmp/visual-qa/release-qa-results.json](../tmp/visual-qa/release-qa-results.json)
- Lokale HTTP-Basis fuer den vorgesehenen Lauf: `http://127.0.0.1:8123`
- Bereits separat dokumentierter Homepage-NVDA-Kurzpass: `pass` am 2026-04-10 laut [docs/FRONTEND-HANDOFF.md](./FRONTEND-HANDOFF.md)
- Geplanter Laufzettel fuer denselben Sweep: [docs/ACCESSIBILITY-SWEEP-RUN-2026-04-10.md](./ACCESSIBILITY-SWEEP-RUN-2026-04-10.md)

## Noch offen vor Abschluss

- tatsaechliche Durchfuehrung des breiten Sweeps
- finale Tester-Angabe
- NVDA-Version des echten Laufs
- reale Findings fuer Chronik, Datenschutz, Impressum, Share-Seite und Instagram-Export
- Bestaetigung von Firefox-Gegencheck, Mobile-Pass und optionalem Apple-Pfad

## Ergebnisblock

- Tester: noch offen; laut Rueckmeldung liegt noch kein ausgefuehrter Sweep vor
- Datum: fuer den vorbereiteten Lauf 2026-04-10 vorgesehen, aber nicht ausgefuehrt
- Branch oder Commit: offen
- HTTP-Basis: `http://127.0.0.1:8123`
- Desktop-Hauptlauf: Edge, ca. 1440 px, Tastatur plus NVDA, vorgesehen
- Firefox-Gegencheck: vorgesehen, noch nicht bestaetigt
- Mobile-Gegencheck: vorgesehen, noch nicht bestaetigt
- Apple-Pfad: offen
- Gesamtstatus: nicht ausgefuehrt

## Scope-Status

- Homepage-Regression: separat dokumentierter Kurzpass liegt vor; kein neuer breiter Sweep-Eintrag
- [chronik.html](../chronik.html): noch nicht geprueft im breiten Sweep
- [datenschutz.html](../datenschutz.html): noch nicht geprueft im breiten Sweep
- [impressum.html](../impressum.html): noch nicht geprueft im breiten Sweep
- [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html): noch nicht geprueft im breiten Sweep
- [share/instagram-export.html](../share/instagram-export.html): noch nicht geprueft im breiten Sweep

## Findings

### `high`

- keine bestaetigten Funde eingetragen

### `medium`

- keine bestaetigten Funde eingetragen

### `low`

- keine bestaetigten Funde eingetragen

## Abschlusskriterien fuer diese Datei

Die Datei ist erst dann als echter Sweep-Bericht geschlossen, wenn:

1. Tester, NVDA-Version und Gesamtstatus eingetragen sind.
2. Die Pakete aus [docs/ACCESSIBILITY-SWEEP-RUN-2026-04-10.md](./ACCESSIBILITY-SWEEP-RUN-2026-04-10.md) mit Ergebnis oder begruendeter Auslassung markiert sind.
3. Findings entweder konkret dokumentiert oder explizit als keine relevanten Funde bestaetigt sind.
4. Das Ergebnis in [docs/FRONTEND-HANDOFF.md](./FRONTEND-HANDOFF.md) uebernommen oder von dort referenziert ist.