# Accessibility Sweep Run 2026-04-10

Stand: vorbereitet am 2026-04-10

Dieser Laufzettel ist bewusst fuer den naheliegenden naechsten Operator-Pfad vorbefuellt. Er dokumentiert noch keinen ausgefuehrten Sweep, sondern eine konkrete Startkonfiguration fuer den ersten breiteren Lauf.

Das ergaenzte Ergebnisprotokoll fuer genau diesen Lauf liegt unter [docs/ACCESSIBILITY-SWEEP-RESULTS-2026-04-10.md](./ACCESSIBILITY-SWEEP-RESULTS-2026-04-10.md). Dort sind die bereits gesicherten Vorbedingungen eingetragen und die noch fehlenden manuellen Angaben klar als offen markiert.

## Sitzungsblock

- Tester: Ilhan Diler, vorgesehen
- Datum: 2026-04-10
- Branch oder Commit: noch eintragen
- HTTP-Basis: `http://127.0.0.1:8123`
- Automatischer Gate-Status: bestanden am 2026-04-10 mit `QA_BROWSER_TARGETS=chromium,firefox` und `QA_FAIL_ON_ISSUES=1`, 0 Funde in [tmp/visual-qa/release-qa-results.json](../tmp/visual-qa/release-qa-results.json)
- NVDA-Version: beim Lauf in NVDA ueber `Hilfe` -> `Ueber NVDA` eintragen
- Desktop-Browser: Edge, ca. 1440 px, Tastatur plus NVDA, vorgesehen
- Firefox-Gegencheck: Firefox Desktop, ca. 1440 px, Tastatur plus Reflow, vorgesehen
- Mobile-Geraet oder Viewport: reales Touch-Geraet oder ca. 390 px, vorgesehen
- Apple-Pfad: nur fuer finale Freigabe; aktuell bewusst offen
- Gesamtstatus: offen, Lauf noch nicht ausgefuehrt

## Vorgesehene Startkonfiguration

- Hauptlauf: Windows, Edge, NVDA, ca. 1440 px
- Gegencheck: Firefox Desktop fuer Reflow, Tastatur und Fokus
- Mobile: echter Touch-Pass, falls verfuegbar; sonst 390-px-Reflow mit Touch-Emulation als Mindestersatz
- Apple-Pfad: nur dann sofort anhaengen, wenn der Lauf als finale Freigabe dienen soll
- Dokumentationsziel: Nach jedem Paket nur echte Bedien- oder Semantikfunde notieren, keine allgemeinen UX-Wuensche ohne Repro

## Testreihenfolge

1. Homepage-Regression mit [docs/NVDA-QUICK-PASS.md](./NVDA-QUICK-PASS.md)
2. Chronik
3. Datenschutz
4. Impressum
5. Share-Seite
6. Instagram-Export
7. Firefox-Reflow-Gegencheck
8. Mobile-Gegencheck
9. Apple-Pfad, falls fuer Freigabe verfuegbar

## Paket A - Homepage-Regression

- [ ] Cookie-Dialog, Landmarken, Heading-Struktur und Sprachwechsel kurz bestaetigt.
- [ ] Event-, News- und Kontaktbereich ohne grobe Accessibility-Regression gegengeprueft.
- Notizen:

## Paket B - Chronik

- [ ] Skip-Link und Hauptsprung funktionieren.
- [ ] Sticky-Topbar, Sprachumschalter und In-Page-Navigation bleiben tastaturbedienbar.
- [ ] Genau eine aktive `h1`; inaktive Sprachvarianten werden nicht vorgelesen.
- [ ] `history-overview`-Karten und Timeline werden in sinnvoller Reihenfolge angekuendigt.
- [ ] Hash-Einstieg fuehrt nicht zu Scroll-Loop oder Fokusverlust.
- Notizen:

## Paket C - Datenschutz

- [ ] Skip-Link, Topbar und Sprachumschalter funktionieren.
- [ ] Legal-Schnellnavigation wird als benannter Bereich angekuendigt.
- [ ] Hero-Chips und Ueberblickselemente bleiben semantisch klar.
- [ ] Generatorisierte Inhaltsbloecke haben keine doppelten Ueberschriften oder unbenannten Links.
- [ ] Reflow und 200-Prozent-Zoom bleiben lesbar.
- Notizen:

## Paket D - Impressum

- [ ] Skip-Link, Topbar und Sprachumschalter funktionieren.
- [ ] Heading-Hierarchie bleibt nach Sprachwechsel stabil.
- [ ] Rechts- und Kontaktblock werden ohne semantische Bruche vorgelesen.
- [ ] Externe Links und Sprungziele bleiben fokussierbar und sichtbar.
- Notizen:

## Paket E - Share-Seite

- [ ] Standardseite: [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html)
- [ ] Dokumenttitel, `lang`-Attribut und `h1` passen zusammen.
- [ ] QR-Code, Hero-Bild und Collage-Bilder haben sinnvolle Alternativtexte.
- [ ] Poster- und Caption-Struktur bleibt auch mit Screenreader verstaendlich.
- [ ] 200-Prozent-Zoom bleibt ohne kritischen Horizontal-Scroll lesbar.
- Notizen:

## Paket F - Instagram-Export

- [ ] `h1`, Workflow-Hinweise, Suchfeld und Statusfeld sind sinnvoll benannt.
- [ ] Erste Export-Karte ist komplett mit Tastatur bedienbar.
- [ ] Preview-Gruppen `Instagram 4:5` und `Story 9:16` bleiben semantisch klar.
- [ ] Filter veraendern Kartenliste und Status ohne Fokusverlust.
- [ ] Locale-abhaengige CTA- und Caption-Helfer bleiben konsistent.
- Notizen:

## Firefox- und Mobile-Gegencheck

- [ ] Firefox-Desktop-Reflow ohne neue Fokus- oder Layoutprobleme.
- [ ] Mobile oder 390-px-Touch-Pass ohne kritische Reibung.
- [ ] Optionaler Apple-Pfad geprueft.
- Notizen:

## Findings

- `high`:
- `medium`:
- `low`:

## Erwartetes Mindestziel fuer diesen konkreten Lauf

- kein neuer `high`-Fund auf Chronik, Datenschutz, Impressum, Share-Seite oder Instagram-Export
- hoechstens kleinere `low`- oder nicht blockierende `medium`-Notizen
- saubere Aussage, ob ein breiterer Apple- oder VoiceOver-Pfad vor finaler Freigabe noch zwingend noetig ist

## Abschluss

- [ ] Ergebnis in [docs/FRONTEND-HANDOFF.md](./FRONTEND-HANDOFF.md) referenziert oder dort eingetragen.
- [ ] Root-Cause-Hinweise fuer offene Funde notiert.
- [ ] Bei `high`- oder blockierenden `medium`-Funden keine Freigabe erteilt.