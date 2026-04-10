# Responsive UX/UI 10/10 Plan

Stand: 2026-04-09

## Zweck

Dieser Folgeplan schliesst die Luecke zwischen dem aktuellen technischen 10/10-Block und einem spaeteren moeglichen Wechsel zu CMS, Design-Layer oder Framework. Ziel ist nicht ein kompletter Neustart, sondern ein bewusstes Hochziehen von Responsive Design, UX und UI von heute eher 8/10 auf einen glaubwuerdigen 10/10-Stand.

Der Plan startet idealerweise direkt nach dem noch offenen manuellen Screenreader-Pass aus [docs/NVDA-QUICK-PASS.md](../docs/NVDA-QUICK-PASS.md).

## Ausgangspunkt

Der aktuelle dokumentierte Stand aus [docs/SITE-ASSESSMENT.md](../docs/SITE-ASSESSMENT.md):

- Design / Aussenwirkung: 8/10
- UX / Gesamteindruck: eher 8/10
- technische Basis: deutlich stabiler als frueher
- Responsive-, Reflow- und Accessibility-Grundlagen: belastbar, aber noch nicht als feinjustierte Gesamt-UX ueber alle Kernflaechen abgeschlossen

Wichtig ist der Unterschied:

- Der aktuelle Block hat die Seite technisch sauberer, zugaenglicher und wartbarer gemacht.
- Dieser Folgeplan soll die sichtbare Erlebnisqualitaet auf Desktop, Mobile, Touch, Reflow und wiederkehrenden Inhaltsflows gezielt verfeinern.

## Warum dieser Block vor CMS oder Design-Layer sinnvoll ist

Ein CMS oder ein neuer Design-Layer loest keine unscharfen Responsive-Regeln, keine inkonsistenten Rueckwege, keine uebergewichteten Hero-Zonen und keine unruhigen Kartenhierarchien automatisch.

Darum ist die richtige Reihenfolge hier:

1. Bestehende UI- und Responsive-Qualitaet bewusst auf 10/10 heben.
2. Danach sauber bewerten, ob fuer die naechste Stufe wirklich ein neuer Design-Layer oder CMS-Bedarf besteht.

## Nicht im Scope

Dieser Plan ist bewusst nicht:

- Vollstaendige Framework-Migration
- Komplett neuer Design-Layer
- CMS-Einfuehrung
- Big-Bang-Umbau aller Seitenquellen
- kompletter visueller Relaunch ohne bestehende Komponentenbasis

## Zielbild

Ein glaubwuerdiger 10/10-Responsive-/UX-/UI-Stand ist hier erst erreicht, wenn:

1. Hauptseite, Chronik, Datenschutz, Impressum und zentrale Share-/Export-Flows auf Desktop und Mobile sichtbar konsistent wirken.
2. 200-Prozent-Zoom, schmaler Reflow und Touch-Bedienung keine halbsauberen Ausnahmefaelle mehr aufdecken.
3. Navigation, Rueckwege, CTA-Prioritaet und Detaileinstiege fuer Besucher klarer und ruhiger wirken als heute.
4. Typografie, Abstaende, Kartengewichtung und Inhaltsdichte sich wie ein System anfuehlen, nicht wie mehrere gute Einzelloesungen.
5. Die Restfrage "Brauchen wir jetzt wirklich CMS oder Design-Layer?" auf Basis einer bereinigten Ist-UX beantwortet wird statt aus aktueller Unruhe heraus.

## Messbare Erfolgskriterien

Pflichtmatrix fuer diesen Block:

- Desktop breit: ca. 1440 bis 1536 px
- Desktop normal: ca. 1280 px
- Tablet: ca. 768 bis 1024 px
- Mobile: ca. 390 px
- 200-Prozent-Zoom / schmaler Reflow
- Chromium/Edge und Firefox; fuer Freigabe moeglichst auch Apple-Ersatzpfad

Pflichtseiten und Pflichtflows:

- [index.html](../index.html)
- [chronik.html](../chronik.html)
- [datenschutz.html](../datenschutz.html)
- [impressum.html](../impressum.html)
- eine Share-Seite wie [share/querbeet-roundup-2025.html](../share/querbeet-roundup-2025.html)
- [share/instagram-export.html](../share/instagram-export.html)

Qualitaetsziele:

- keine kritischen horizontalen Scroll-Zustaende auf Kernseiten
- keine sichtbaren Layout-Kollisionen bei 200 Prozent Zoom
- keine CTA-, Karten- oder Navigationszustaende mit unklarer visueller Prioritaet
- keine Touch- oder Mobile-Flows, die nur knapp funktionieren
- Rueckwege in Aktuelles-, Review- und Share-nahen Flows sind aus Besuchersicht klar und ruhig

## Schwerpunktbereiche

Dieser Plan fokussiert nicht die gesamte Site gleichmaessig, sondern die Hebel mit der groessten Wirkung:

1. Hero, Navigation und Einstiegszone der Hauptseite
2. Karten- und Grid-Systeme auf Hauptseite, Aktuelles und Rueckblick
3. Chronik-/Timeline-Lesbarkeit bei schmalen oder vergroesserten Viewports
4. Legal-Heroes, Sprungnavigation und Reflow auf Subpages
5. Share-Preview- und Export-Flows auf Mobile und Desktop
6. Rueckwege, CTA-Hierarchie und Scroll-/Detail-Einstiege

## Leitprinzipien

1. Keine neue Gestaltungsschicht, bevor die bestehende Sprache sauber ausbalanciert ist.
2. Responsive Verhalten wird nicht nur gegen Breakpoints, sondern gegen echte Nutzungssituationen optimiert.
3. UX-Verbesserungen muessen Rueckwege, Lesefluss und Prioritaet klaeren, nicht nur Oberflaechen glatter machen.
4. Mobile wird als echter Erstfall fuer Interaktion behandelt, nicht nur als schmalere Desktop-Variante.
5. Jeder groessere Polierschritt endet mit Smoke-QA und einem kurzen manuellen Gegencheck.

## Empfohlener 4-Wochen-Block

### Woche 1

Ziel: sichtbare UX-/Responsive-Schwachstellen systematisch inventarisieren statt punktuell zu raten.

Budget: 12 bis 15 Stunden

Arbeitspaket:

- Screenshot- und Viewport-Matrix fuer Hauptseite, Chronik, Legal-Seiten und Share-/Export-Flow anlegen
- Hauptflows einmal bewusst aus Besuchersicht dokumentieren: Einstieg, Orientierung, Scrollen, CTA, Rueckweg, Detail, Zurueck
- die wichtigsten 10 bis 15 Responsive-/UX-/UI-Funde priorisieren in `high`, `medium`, `low`
- Komponentencluster festhalten: Hero, Navigation, Karten, Timeline, Footer, Detail-Rueckwege, Share-UI
- offene Punkte aus [docs/SOCIAL-FEED-ASSESSMENT.md](../docs/SOCIAL-FEED-ASSESSMENT.md) in die Fundliste integrieren

Definition of Done:

- eine konkrete Fundliste existiert
- die groessten Hebel sind nach Wirkung und Aufwand sortiert
- keine weiteren Arbeiten starten auf Basis von Bauchgefuehl allein

### Woche 2

Ziel: Responsive-Basis und visuelle Systematik fuer die grossen Flaechen nachziehen.

Budget: 12 bis 15 Stunden

Arbeitspaket:

- Containerbreiten, Max-Widths, Innenabstaende und vertikale Rhythmik vereinheitlichen, wo aktuell sichtbare Bruche entstehen
- Typografie ueber Hero, Zwischenueberschriften, Karten und Footer auf konsistentere Skalierung pruefen
- Karten- und Grid-Verhalten auf Mobile, Tablet und Desktop beruhigen
- Bildbeschnitt, Medienproportionen und Caption-/Card-Balance an den problematischen Stellen angleichen
- Touch-Target-Groessen und interaktive Dichte im Mobile-Menue, bei Karten und Share-/Export-Aktionen pruefen

Definition of Done:

- die grossen Einstiegs- und Kartenbereiche wirken auf Desktop und Mobile konsistenter
- keine offensichtlichen Dichte- oder Abstandsbrueche mehr in den Kernmodulen
- Reflow- und Mobile-Lesbarkeit ist messbar ruhiger als vorher

### Woche 3

Ziel: Flow- und Interaktionsqualitaet auf 10/10-Niveau bringen.

Budget: 12 bis 15 Stunden

Arbeitspaket:

- Aktuelles-, Rueckblick- und Deep-Link-Flow aus Besuchersicht feinjustieren
- entscheiden, wie Rueckwege im Detailbereich dauerhaft gewichtet werden sollen
- CTA-Hierarchie und Link-Copy bei kritischen Einstiegen ueberarbeiten, falls sie visuell oder inhaltlich zu gleichgewichtig wirken
- Mobile-Navigation, Sprachwechsel, Hero-Steuerung und Share-Aktionen auf Friktion pruefen
- Bewegungs- und Feedbackverhalten nur dort verfeinern, wo es Orientierung oder Wertigkeit wirklich verbessert

Definition of Done:

- Kernflows fuehlen sich nicht nur technisch korrekt, sondern auch ruhig und eindeutig an
- Rueckwege, CTA-Prioritaet und Detaileinstiege sind als UX-Entscheidung bewusst getroffen
- keine hektischen, doppelt abgesicherten oder erklaerungsbeduerftigen Interaktionsmuster bleiben ungeprueft stehen

### Woche 4

Ziel: finaler Responsive-/UX-/UI-Proof und saubere Entscheidungsgrundlage fuer den naechsten strategischen Block.

Budget: 12 bis 15 Stunden

Arbeitspaket:

- finale Matrix ueber Desktop, Mobile, Zoom, Reflow, Touch und Browser laufen lassen
- nur noch `high`- und `medium`-Funde schliessen
- [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md), [docs/RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md), [docs/FRONTEND-HANDOFF.md](../docs/FRONTEND-HANDOFF.md) und [docs/SITE-ASSESSMENT.md](../docs/SITE-ASSESSMENT.md) auf den neuen UI-/Responsive-Stand bringen
- danach bewusst entscheiden, ob noch echter Bedarf fuer Design-Layer, CMS oder Framework-Pilot besteht

Definition of Done:

- Responsive-, UX- und UI-Qualitaet ist dokumentiert und bewusst gegengeprueft
- die verbleibende Restschuld ist klein und nicht mehr diffus
- die Entscheidung ueber CMS oder Design-Layer erfolgt auf einer wesentlich ruhigeren Ausgangsbasis

## Definition of Done fuer den Gesamtblock

Der Block ist erst abgeschlossen, wenn:

1. Die Pflichtmatrix ohne kritische Responsive- oder Reflow-Funde durchlaeuft.
2. Hauptseite, Chronik, Legal-Seiten und Share-/Export-Flow visuell und interaktiv konsistent dokumentiert sind.
3. Die groessten UX-Unschaerfen im Aktuelles-/Rueckblick-Flow bewusst entschieden oder bereinigt sind.
4. Die Dokumentation den neuen Zustand klar abbildet.
5. Danach sauber entschieden werden kann, ob ein Design-Layer oder CMS noch wirklich der naechste Hebel ist.

## Entscheidungsgate danach

Nach diesem Block gibt es drei saubere Optionen:

1. Kein grosser Plattformwechsel noetig: bestehende Architektur weiter inkrementell pflegen.
2. Design-Layer-Pilot sinnvoll: weil die UX nun sauber ist und die Restschuld vor allem visuell-systemisch geworden ist.
3. CMS- oder Framework-Pilot sinnvoll: weil der Hauptschmerz dann klar bei Pflege, Vorschau oder strukturierten Inhalten liegt, nicht mehr bei der sichtbaren UX.

## Was explizit vermieden werden sollte

1. Responsive-/UX-Fine-Tuning in einen versteckten Komplett-Relaunch kippen lassen.
2. UI-Politur und Architekturwechsel gleichzeitig starten.
3. Ein CMS oder neuen Design-Layer als Abkuerzung fuer ungeloeste Responsive- oder Flow-Probleme missverstehen.
4. Vor Abschluss dieses Blocks schon grossflaechig Tokens, Komponenten oder Content-Pfade umwerfen.