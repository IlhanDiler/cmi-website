# Accessibility Sweep Plan

Stand: 2026-04-10

## Zweck

Dieses Runbook bereitet den naechsten breiten manuellen Accessibility-Sweep nach dem dokumentierten Homepage-NVDA-Kurzpass vor. Es ist enger auf die reale Operator-Arbeit zugeschnitten als [docs/MANUAL-QA-CHECKLIST.md](./MANUAL-QA-CHECKLIST.md) und soll Chronik, Legal-Seiten, Share-Flow und Instagram-Export mit derselben Mindesttiefe pruefbar machen.

## Scope

Pflichtumfang fuer den Sweep:

- [index.html](../index.html) als kurze Regression gegen den bereits dokumentierten Homepage-Pass
- [chronik.html](../chronik.html)
- [datenschutz.html](../datenschutz.html)
- [impressum.html](../impressum.html)
- eine Share-Seite, standardmaessig [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html)
- [share/instagram-export.html](../share/instagram-export.html)

Nicht Ziel dieses Laufs:

- vollstaendige Inhaltsabnahme aller Share-Seiten einzeln
- erneuter Big-Picture-UX-Pass ueber alle Layoutdetails
- Architekturentscheidungen waehrend des Sweeps

## Vorbedingungen

- HTTP-Basis lokal oder deployed festlegen, bevorzugt `http://127.0.0.1:8123`
- den automatischen Mindest-Gate aus [tmp/visual-qa/release_qa_smoke.py](../tmp/visual-qa/release_qa_smoke.py) referenzieren; letzter dokumentierter lokaler Pass: 2026-04-10 mit 0 Funden in Chromium und Firefox
- wenn moeglich Desktop mit NVDA und mindestens ein Mobile-Geraet oder ein 390-px-Touch-Ersatz bereitstellen
- fuer finale Freigaben zusaetzlich einen Apple-Pfad mit Safari oder VoiceOver einplanen

## Empfohlene Reihenfolge

1. Zuerst den automatischen Gate-Stand und die HTTP-Basis protokollieren, damit der Sweep nicht gegen einen unklaren Build laeuft.
2. Dann einen kurzen visuellen und keyboard-basierten Pass ueber Homepage, Chronik, Datenschutz, Impressum, Share-Seite und Instagram-Export fahren.
3. Danach den 200-Prozent-Zoom-, Reflow- und Reduced-Motion-Pass ueber Chronik, Legal-Seiten und Export nachziehen.
4. Erst dann den eigentlichen Screenreader-Sweep in NVDA fahren, damit Layout- oder Fokusfehler nicht mit Screenreader-Funden vermischt werden.
5. Zum Schluss optional Safari oder VoiceOver als Gegenprobe auf die schwersten oder unklarsten Punkte legen.

## Pflichtmatrix

| Paket | Browser oder Geraet | Modus | Pflicht |
| --- | --- | --- | --- |
| Homepage-Regression | Edge oder Chrome Desktop | Tastatur plus NVDA | ja |
| Chronik | Edge oder Chrome Desktop | Tastatur plus NVDA | ja |
| Datenschutz | Edge oder Chrome Desktop | Tastatur plus NVDA | ja |
| Impressum | Edge oder Chrome Desktop | Tastatur plus NVDA | ja |
| Share-Seite | Edge oder Chrome Desktop | Tastatur plus NVDA | ja |
| Instagram-Export | Edge oder Chrome Desktop | Tastatur, optional NVDA-Stichprobe | ja |
| Browser-Gegencheck | Firefox Desktop | Tastatur plus Reflow | ja |
| Mobile-Gegencheck | reales Geraet oder ca. 390 px | Touch plus Reflow | ja |
| Apple-Pfad | Safari oder VoiceOver | Tastatur plus Screenreader | vor finaler Freigabe |

## Ergebnisblock zum Ausfuellen

Fuer den direkt vorbereiteten naechsten Lauf liegt ein vorbefuellter Arbeitszettel unter [docs/ACCESSIBILITY-SWEEP-RUN-2026-04-10.md](./ACCESSIBILITY-SWEEP-RUN-2026-04-10.md).

### Sitzungsblock

- Tester:
- Datum:
- Branch oder Commit:
- HTTP-Basis:
- Automatischer Gate-Status:
- NVDA-Version:
- Desktop-Browser:
- Mobile-Geraet oder Viewport:
- Apple-Pfad:
- Gesamtstatus: `pass` / `pass with notes` / `fail`

### Findings-Format

Jeden Fund moeglichst in diesem Format festhalten:

- `high` / `medium` / `low`
- Seite oder Flow
- Repro-Schritt
- Erwartung
- Ist-Zustand
- wahrscheinliche Root-Cause oder betroffenes Modul

## Sweep-Pakete

### Paket A - Homepage als Regression

Dieser Teil ersetzt keinen neuen Vollpass, sondern bestaetigt, dass der bereits dokumentierte Homepage-Stand nicht regressiert ist.

- [ ] Den kompakten Ablauf aus [docs/NVDA-QUICK-PASS.md](./NVDA-QUICK-PASS.md) einmal gegen [index.html](../index.html) gegenfahren.
- [ ] Cookie-Dialog, Landmarken, Heading-Struktur und Sprachwechsel Deutsch oder Englisch kurz bestaetigen.
- [ ] News-Teaser, Event- und Kontaktbereich nur gegen grobe Accessibility-Regressions pruefen, nicht erneut vollstaendig redaktionell lesen.

### Paket B - Chronik

- [ ] Skip-Link und Hauptsprung auf [chronik.html](../chronik.html) pruefen; Fokus landet sauber im Hauptinhalt.
- [ ] Sticky-Topbar, Sprachumschalter und In-Page-Navigation bleiben mit Tastatur erreichbar und verlieren keinen Fokus.
- [ ] `The CMI Timeline` oder die aktive Sprachvariante wird als einzige `h1` angekuendigt; inaktive `data-lang`-Varianten werden nicht mitgelesen.
- [ ] Die `history-overview`-Karten werden in sinnvoller Reihenfolge vorgelesen; Ueberschriften wie `Verwurzelung`, `Austausch` und `Wirkung` bleiben als echte Abschnittspunkte erkennbar.
- [ ] Timeline-Header, Summary-Karten und Timeline-Stationen werden als verstaendliche Sequenz angekuendigt; keine doppelten oder versteckten Sprachvarianten tauchen im Lesefluss auf.
- [ ] Ein Hash-Einstieg auf Chronik oder Timeline fuehrt nicht zu Scroll-Loop, Fokusverlust oder semantisch unklarer Leseposition.

### Paket C - Datenschutz und Impressum

- [ ] Skip-Link, Topbar und Sprachumschalter auf [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) einmal rein ueber Tastatur pruefen.
- [ ] Die Legal-Schnellnavigation wird als eigener benannter Navigationsbereich oder Landmark angekuendigt.
- [ ] Die Hero-Chips und Ueberblickselemente werden als Liste oder klar gruppierte Navigation angekuendigt, nicht als lose Textsuppe.
- [ ] Heading-Hierarchie bleibt nach Sprachwechsel stabil; inaktive Sprachvarianten werden nicht vorgelesen.
- [ ] Die generatorisierten Rechts- und Datenschutzbloecke werden ohne doppelte Ueberschriften, leere Gruppen oder unbenannte Links vorgelesen.
- [ ] Externe Links und Sprungziele bleiben nach Sprachwechsel und bei 200 Prozent Zoom fokussierbar und sichtbar.

### Paket D - Share-Seite

- [ ] Eine reale Share-Seite, standardmaessig [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html), einmal mit Tastatur und NVDA pruefen.
- [ ] Dokumenttitel, `lang`-Attribut und `h1` passen zur aktiven Sprachvariante der Seite.
- [ ] QR-Code, Hero-Bild und Collage-Bilder haben sinnvolle Alternativtexte; die Seite bleibt auch ohne visuelle Orientierung verstaendlich.
- [ ] Poster-, Panel- und Caption-Struktur werden nicht als chaotische Bildsammlung, sondern als lesbarer Inhalt angekuendigt.
- [ ] Bei 200 Prozent Zoom bleibt die Share-Seite ohne kritischen horizontalen Scroll-Zustand lesbar.

### Paket E - Instagram-Export

- [ ] Auf [share/instagram-export.html](../share/instagram-export.html) sind `h1`, Workflow-Hinweise und Suchfeld sauber benannt.
- [ ] Das Statusfeld `Share-Seiten werden geladen...` oder sein Nachfolgestatus wird als Live-Region sinnvoll angekuendigt.
- [ ] Erste Export-Karte mit Tastatur bedienen: Caption-Feld, `Caption kopieren`, `PNG exportieren`, `Story PNG`, `Link kopieren`, `Bild oeffnen` und `Share-Seite` sind in logischer Reihenfolge erreichbar.
- [ ] Vorschaugruppen fuer `Instagram 4:5` und `Story 9:16` sind als Gruppen erkennbar; dekorative Vorschaubilder werden nicht doppelt oder sinnlos angesagt.
- [ ] Filtereingaben ueber das Suchfeld veraendern Kartenliste und Status nachvollziehbar; der Fokus springt dabei nicht unerwartet weg.
- [ ] Locale-abhaengige Hilfstexte, CTA-Copy und Caption bleiben konsistent zur geladenen Share-Seite.

## Exit-Kriterien

- kein `high`-Fund bleibt offen
- keine `medium`-Funde blockieren die Bedienbarkeit von Chronik, Legal-Seiten, Share-Seite oder Instagram-Export
- der Sweep ist mit Sitzungsblock und Findings-Liste dokumentiert
- unklare Funde sind als nachgelagerte Root-Cause-Tickets oder Doku-Notizen formuliert, nicht nur als lose Beobachtungen

## Naechster Schritt nach dem Sweep

Wenn der Sweep ohne Blocker laeuft, den Ergebnisblock in [docs/FRONTEND-HANDOFF.md](./FRONTEND-HANDOFF.md) oder in einer separaten Freigabenotiz referenzieren. Wenn echte Accessibility-Funde auftauchen, zuerst Root-Cause-Fixes priorisieren und erst danach ueber CMS-, Design-Layer- oder Framework-Hebel entscheiden.