# Four-Week Plan

Stand: 2026-04-08

## Rahmen

- Verfuegbare Zeit: 15 Stunden pro Woche
- Planungszeitraum: 4 Wochen
- Gesamtbudget: 60 Stunden
- Ziel: die 5 offenen Punkte aus [SITE-ASSESSMENT.md](../docs/SITE-ASSESSMENT.md) pragmatisch und reviewbar abarbeiten
- Nicht im Scope: kompletter Neuaufbau der Mehrsprachigkeit oder vollstaendige i18n-Architektur

## Zielbild nach 4 Wochen

1. Accessibility ist nicht nur punktuell verbessert, sondern auf den Hauptseiten, Subpages und zentralen Interaktionsmustern systematisch nachgearbeitet.
2. Die wichtigsten historischen Sonderfaelle und inkonsistenten Muster sind entfernt oder deutlich reduziert.
3. Browser-, Rendering- und manuelle Release-QA sind mindestens einmal sauber durchlaufen und die wichtigsten Funde sind zurueck in kleine Fixes geflossen.
4. Die groessten data-lang- und Duplikations-Hotspots sind standardisiert oder reduziert, auch wenn die Struktur noch nicht vollstaendig neu gebaut ist.
5. Die modulare JavaScript-Runtime ist an den groessten Reibungspunkten vereinfacht und durch QA besser abgesichert.

## Scope-Grenzen

Der Plan ist auf einen professionell sauberen, realistisch erreichbaren Stand innerhalb von 60 Stunden ausgelegt.

Das bedeutet konkret:

- Punkt 1 soll inhaltlich abgeschlossen werden.
- Punkt 2 soll weitgehend abgeschlossen werden.
- Punkt 3 soll abgeschlossen werden.
- Punkt 5 soll weitgehend abgeschlossen werden.
- Punkt 4 soll deutlich verkleinert und kontrollierbar werden, aber nicht zwingend architektonisch vollstaendig geloest sein.

## Prioritaet

1. Accessibility plus billige Sonderfaelle zuerst
2. Historische Muster und Runtime-Reibung danach
3. QA nicht ans Ende schieben, sondern bewusst als eigener Fix-Loop
4. Mehrsprachigkeits-Duplikation nur in den groessten Hotspots und mit harter Scope-Grenze

## Woche 1

Ziel: Punkt 1 fast komplett schliessen und dabei die billigen Teile von Punkt 2 mitnehmen.

Budget: 15 Stunden

### Block A - 5h

- Hauptseite, Chronik, Legal-Seiten und Share-/Export-UI gezielt auf Accessibility-Reste pruefen
- Offensichtliche Probleme sofort in kleinen Commits beheben
- Fokus auf Namen, Rollen, Hidden-States, Fokus, neue Fenster, Live-Feedback

### Block B - 5h

- Restliche interaktive Muster pruefen: Lightbox, Cookie-Consent, Hero, Review, Footer, Event-Sharing
- Zentrale Accessibility-Helfer im Navigations-/Sprachblock, heute vor allem in [scripts/site-language.js](../scripts/site-language.js) und angrenzenden Runtime-Dateien, nachziehen, wenn ein Root-Cause-Fix moeglich ist

### Block C - 5h

- [RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md) einmal komplett durchgehen
- Alle dabei gefundenen kleineren Auffaelligkeiten sofort nachziehen
- Am Ende kurzen Restpunktestand notieren

### Definition of Done

- Keine offensichtlichen namenlosen Controls mehr in den Hauptflows
- Keine bekannten Fokus- oder Hidden-State-Ausreisser in den zuletzt angefassten Bereichen
- Release-QA einmal sauber gelaufen

## Woche 2

Ziel: Punkt 2 weitgehend abbauen und Punkt 5 sichtbar voranbringen.

Budget: 15 Stunden

### Block A - 5h

- Historische Sonderfaelle und inkonsistente Muster in der Runtime sammeln und gruppieren
- 2 bis 4 besonders stoerende Cluster wirklich entfernen statt nur lokal flicken

### Block B - 5h

- Runtime glatten, vor allem in [scripts/site-language.js](../scripts/site-language.js), [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js), [scripts/core-runtime.js](../scripts/core-runtime.js), [scripts/hero-gallery.js](../scripts/hero-gallery.js) und [scripts/review-interactions.js](../scripts/review-interactions.js)
- Doppelte Zustandslogik oder aehnliche Hilfsfunktionen zusammenziehen, wenn der Eingriff klein und pruefbar bleibt

### Block C - 5h

- Nach jedem groesseren Runtime-Fix Release-QA fuer die betroffenen Bereiche mitlaufen lassen
- Offene Reststellen dokumentieren: behalten, spaeter angehen oder bewusst aus Scope nehmen

### Definition of Done

- Die groessten gewachsenen Sonderfaelle sind nicht mehr nur bekannt, sondern technisch reduziert
- Die Runtime ist in mindestens einigen Kernbereichen einfacher lesbar oder konsistenter geworden
- Kein Umbau ohne anschliessenden Regression-Check

## Woche 3

Ziel: Punkt 3 abschliessen und QA-Funde direkt in Fixes ueberfuehren.

Budget: 15 Stunden

### Block A - 5h

- Hauptseite und Navigation in mindestens Chrome, Edge und Firefox pruefen
- Desktop und mobiles Layout jeweils einmal bewusst gegenchecken

### Block B - 5h

- Chronik, Datenschutz, Impressum und zentrale Share-Seiten gegenpruefen
- [MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md) gezielt als Vollpruefung nutzen

### Block C - 5h

- Alle relevanten QA-Funde in kleine, isolierte Fixes rueckspielen
- Zum Wochenabschluss nur noch dokumentierte Restpunkte offen lassen

### Definition of Done

- Browser-QA ist nicht nur vorbereitet, sondern tatsaechlich durchlaufen
- Die wichtigsten Layout-, Rendering- oder Verhaltensabweichungen sind behoben
- Verbleibende QA-Risiken sind klein genug, um bewusst vertretbar zu sein

## Woche 4

Ziel: Punkt 4 stark verkleinern und den Restpuffer fuer Punkt 5 oder QA-Nachzuegler nutzen.

Budget: 15 Stunden

### Block A - 5h

- Die groessten Mehrsprachigkeits-Hotspots identifizieren, vor allem in [index.html](../index.html), [chronik.html](../chronik.html), [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html)
- Ziel ist Standardisierung, nicht kompletter Neuaufbau

### Block B - 5h

- Wiederkehrende data-lang-Muster vereinheitlichen
- Pflegeaufwand bei kuenftigen Textaenderungen reduzieren, ohne die Seiten jetzt komplett zu templatisieren

### Block C - 5h

- Offene Restpuffer nutzen: Runtime-Nacharbeiten, letzte QA-Funde, kleine Dokumentationsupdates
- Am Ende neue Lagebewertung gegen [SITE-ASSESSMENT.md](../docs/SITE-ASSESSMENT.md) abgleichen

### Definition of Done

- Die groessten Sprachduplikations-Hotspots sind nachvollziehbar reduziert oder standardisiert
- Der verbleibende Rest ist klein genug, um als separater spaeterer Strukturblock planbar zu sein
- Die Woche wird nicht von einem zu grossen Umbau gesprengt

## Re-Plan-Regeln

1. Wenn eine Woche mehr als 5 Stunden ueberzieht, wird zuerst Scope aus Woche 4 reduziert, nicht Woche 3.
2. QA wird nicht nach hinten geschoben, wenn vorher groessere Runtime-Aenderungen passiert sind.
3. Punkt 4 darf nur dann ausgeweitet werden, wenn Punkt 1 und Punkt 3 bereits faktisch sauber sind.
4. Pro Woche hoechstens ein groesserer Strukturblock, der Rest bleibt in kleinen, gut pruefbaren Schritten.

## Wochen-Check-in

Am Ende jeder Woche kurz festhalten:

- Was wurde abgeschlossen?
- Was ist in die naechste Woche gerutscht?
- Ist der Scope fuer Woche 4 noch realistisch?
- Muss der Plan angepasst werden?

## Fortschrittslog

### Woche 1 - laufender Stand

- [x] Event-Lightbox per Tastatur bedienbar gemacht, inklusive Fokusfuehrung und sichtbarem Fokusstil
- [x] Cookie-Consent-Inhalte wieder an den zentralen Accessibility-Sync angebunden und Dialog-Selektoren bereinigt
- [x] Hero-Galerie um Pause/Weiter-Steuerung ergaenzt und Live-Ansagen auf Nutzeraktionen begrenzt
- [x] Deep Links auf Eintraege im Review-Archiv so nachgezogen, dass aufgeklappte Ziele auch wirklich erreicht und fokussiert werden
- [x] Sichtbare Fokuszustaende in Navigation, Footer, Event-Aktionen sowie Karten- und Inline-Links nachgezogen, inklusive Root-Cause-Fix fuer den globalen Shadow-Reset
- [x] Instagram-Export-UI bei redundanten Vorschaubildern und Caption-Beschriftung fuer Screenreader nachgezogen
- [x] Initial versteckte Sprachvarianten auf Haupt-, Chronik- und Legal-Seiten mit aria-hidden fuer Screenreader sauber vorinitialisiert
- [x] Repertoire-Karten auf der Hauptseite mit echter Heading-Struktur und semantischer Ensemble-Liste fuer Screenreader nachgezogen, inklusive etwas entspannterem Mobile-Padding
- [x] Komplette Release-QA fuer die betroffenen Hauptflows ueber lokalen HTTP-Server und release_qa_smoke.py mit 0 Funden durchlaufen
- [x] Restliche Week-1-Sweep-Punkte im aktuellen Quick-Win-Scope quergprueft; keine weiteren klaren Billigfunde in den bearbeiteten Hauptflows offen

### Woche 2 - laufender Stand

- [x] Sprachvalidierung, Sichtbarkeitspruefung und Fokus-/Hash-Helfer in scripts/core-runtime.js gebuendelt und lokale Duplikate im damaligen Navigations-/Sprachblock, heute verteilt auf [scripts/site-language.js](../scripts/site-language.js) und [scripts/navigation-wayfinding.js](../scripts/navigation-wayfinding.js), sowie in [scripts/event-lightbox.js](../scripts/event-lightbox.js) und [scripts/review-interactions.js](../scripts/review-interactions.js) reduziert
- [x] Release-QA nach dem Runtime-Refactor erneut fuer Hauptseite, Hash-Navigation, Mobile-Menue sowie Chronik/Datenschutz/Impressum mit 0 Funden durchlaufen
- [x] Hero- und Effekt-Runtime um gemeinsamen RAF-Scheduler bereinigt, globale Resize-/Scroll-Listener auf tatsaechlich genutzte Features begrenzt und Parallax-Updates auf Animation-Frames gedrosselt
- [x] Release-QA nach dem Hero-/Site-Effects-Refactor erneut mit 0 Funden durchlaufen
- [x] Review- und Cookie-Consent-Updates auf den gemeinsamen Scheduler umgestellt und lokale requestAnimationFrame-Verwaltung reduziert
- [x] Release-QA nach dem Review-/Cookie-Consent-Refactor erneut mit 0 Funden durchlaufen
- [x] Hero-Responsive-Refresh und Mbonda-Timeline-Resize-Handling auf den gemeinsamen Scheduler bzw. feature-spezifische Initialisierung umgestellt
- [x] Release-QA nach dem Hero-/Navigation-Refactor erneut mit 0 Funden durchlaufen
- [x] Doppelte Post-Paint-Logik aus Review-Hash-Navigation und Hero-Progress in einen gemeinsamen Runtime-Helfer gezogen
- [x] Verbleibende Timer- und Einzel-RAF-Stellen in Core/Hero/Navigation geprueft und als verhaltensgebundene Reststellen bewusst im Scope belassen
- [x] Release-QA nach dem Post-Paint-Refactor erneut mit 0 Funden durchlaufen

- [x] Woche 1 abgeschlossen
- [x] Woche 2 abgeschlossen
- [x] Woche 3 abgeschlossen
- [x] Woche 4 abgeschlossen

### Woche 3 - laufender Stand

- [x] Release-Smoke-Skript fuer einen optionalen Browser-Matrix-Lauf vorbereitet, damit Week-3-QA nicht nur manuell auf Edge/Chrome beschraenkt bleibt
- [x] Firefox-spezifische Mobile-Context- und Screenshot-Grenzen im QA-Runner abgefangen, damit die Browser-Matrix stabil durchlaeuft
- [x] Browser-Matrix fuer Edge, Chrome und Firefox ueber release_qa_smoke.py mit 0 Funden durchlaufen
- [x] Share-Seiten-Smoke fuer share/querbeet-roundup-2025.html in den automatisierten Browser-Check aufgenommen
- [x] Fehlende Favicons in den Share-HTMLs als Root-Cause-Fix nachgezogen, damit Chromium keinen favicon.ico-404 mehr produziert
- [x] Browser-Matrix inklusive Share-Seite danach erneut mit 0 Funden durchlaufen
- [x] Browser-Matrix fuer Edge, Chrome und Firefox am 2026-04-08 erneut gegen den lokalen HTTP-Server ausgefuehrt; weiterhin 0 Funde in index, Chronik, Datenschutz, Impressum und share/querbeet-roundup-2025.html

### Woche 4 - laufender Stand

- [x] `applyLanguageVariantsForParent` zieht nun neben `display` und `aria-hidden` auch den nativen `hidden`-Zustand nach, damit standardisierte Sprachcluster ohne Inline-Display-Startzustand sauber geschaltet werden koennen
- [x] Legal-Hero-Chips in [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) von rein dekorativen `span`-Gruppen auf semantische Listen umgestellt und die nicht aktive Sprachvarianten dort auf `hidden` plus `aria-hidden` vereinheitlicht
- [x] Release-QA nach dem Week-4-Hotspot-Fix erneut ueber Edge, Chrome und Firefox mit 0 Funden durchlaufen
- [x] Verbleibende `data-lang`-Cluster im Legal-Hero von [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) auf `hidden` plus `aria-hidden` standardisiert, statt weiter mit Inline-`display:none` zu starten
- [x] Gemeinsame Skip-Link-Varianten in [index.html](../index.html), [chronik.html](../chronik.html), [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) sowie die Subpage-Topbar-Subtitle- und Link-Cluster auf Chronik-, Datenschutz- und Impressumsseite auf dasselbe `hidden`-Muster umgestellt
- [x] Release-QA nach der erweiterten Week-4-Standardisierung erneut ueber Edge, Chrome und Firefox mit 0 Funden durchlaufen
- [x] Verbleibende Sprachcluster auf [chronik.html](../chronik.html), einschliesslich Hero, History-Overview, Timeline und weiterer initial versteckter Varianten, konsequent von Inline-`display:none` auf `hidden` plus `aria-hidden` umgestellt
- [x] Brand-Tagline, Desktop-Navigation und Mobile-Menue auf [index.html](../index.html) auf dasselbe `hidden`-Muster vereinheitlicht und den deutschen `MITMACHEN`-Link im Mobile-Menue wieder als sichtbare Default-Variante ausgerichtet
- [x] Release-QA nach der Chronik- und Navigations-Standardisierung erneut ueber Edge, Chrome und Firefox mit 0 Funden durchlaufen
- [x] Verbleibende grosse `data-lang`-Cluster auf [index.html](../index.html), einschliesslich Image-Caption, Musikfamilie, Repertoire, Engagement, Review, Archiv und Footer, mechanisch auf `hidden` plus `aria-hidden` vereinheitlicht; einzig die Event-Lightbox behaelt `display:none` als echten UI-Zustand
- [x] Abschlussabgleich mit [SITE-ASSESSMENT.md](../docs/SITE-ASSESSMENT.md) nachgezogen und Week 4 damit im gesetzten Pragmatik-Scope abgeschlossen
- [x] Finale Release-QA nach der vollstaendigen Index-Standardisierung erneut ueber Edge, Chrome und Firefox mit 0 Funden durchlaufen

### Anschluss nach Planabschluss - Stand 2026-04-08

- [x] Technisches Quality-Gate vor Deploy mit [site-quality-gate.yaml](../.github/workflows/site-quality-gate.yaml) und angepasster Deploy-Orchestrierung eingefuehrt
- [x] [MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md) zu einer echten Browser-, Geraete- und Accessibility-Matrix erweitert und [RELEASE-QA-CHECKLIST.md](../docs/RELEASE-QA-CHECKLIST.md) darauf ausgerichtet
- [x] Gezielten QA-Pass fuer Tastatur, Reduced Motion und Legal-Reflow auf [index.html](../index.html), [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) durchgefuehrt
- [x] Die daraus entstandenen Root-Cause-Fixes geschlossen: Hero-Autoplay respektiert Reduced Motion, Legal-Schnellnavigation fokussiert die Zielbereiche sauber und der kleine Horizontal-Overflow der Legal-Heroes ist behoben
- [x] Ersten strukturellen i18n-Piloten eingefuehrt: Der Impressum-Rechtsblock `#imprint-legal` wird aus [scripts/legal-content.json](../scripts/legal-content.json) ueber [scripts/render-legal-content.py](../scripts/render-legal-content.py) in statisches HTML gerendert
- [x] Den Generatoransatz auf [datenschutz.html](../datenschutz.html) erweitert: Der grosse Ueberblicksblock `#privacy-overview` wird jetzt ebenfalls aus [scripts/legal-content.json](../scripts/legal-content.json) gerendert und per Browser-QA gegen Sprachumschaltung, Quick-Navigation und Reflow validiert
- [x] Den Generatoransatz im Datenschutz weitergezogen: Auch `#privacy-hosting` wird jetzt aus [scripts/legal-content/privacy-hosting.json](../scripts/legal-content/privacy-hosting.json) gerendert; validiert wurden der Renderlauf, der IONOS-Link und der Reflow ohne Horizontal-Overflow
- [x] Den Generatoransatz in [datenschutz.html](../datenschutz.html) weitergezogen: Auch `#privacy-basics` wird jetzt aus strukturierter Quelle unter [scripts/legal-content](../scripts/legal-content) gerendert; dabei wurden zwei bislang fehlende Lingala-Abschnitte im Widerspruchsbereich geschlossen und per Browser-QA validiert
- [x] Den Generatoransatz im Datenschutz weitergezogen: Auch `#privacy-data` wird jetzt aus [scripts/legal-content/privacy-data.json](../scripts/legal-content/privacy-data.json) gerendert; validiert wurden der Renderlauf, die Sprachumschaltung direkt im Block sowie der Reflow ohne Horizontal-Overflow auf schmalem Viewport
- [x] Den Generatoransatz im Datenschutz weitergefuehrt: Auch `#privacy-analytics` wird jetzt aus [scripts/legal-content/privacy-analytics.json](../scripts/legal-content/privacy-analytics.json) gerendert; dabei ersetzt der Renderer die alten Inline-Styles durch `legal-detail-list` und laesst den IONOS-Link gezielt als vertrauenswuerdiges Inline-HTML stehen
- [x] Den Generatoransatz im Datenschutz weitergezogen: Auch `#privacy-social` wird jetzt aus [scripts/legal-content/privacy-social.json](../scripts/legal-content/privacy-social.json) gerendert; validiert wurden die Meta/Facebook- und Instagram-Abschnitte gegen Sprachumschaltung, Link-Rendering und saubere Blockgrenzen im statischen HTML
- [x] Den Generatoransatz im Datenschutz vervollstaendigt: Auch `#privacy-tools` wird jetzt aus [scripts/legal-content/privacy-tools.json](../scripts/legal-content/privacy-tools.json) gerendert; dabei bleiben externe Google- und YouTube-Hinweise klickbar, waehrend die Textinhalte entity-sicher aus strukturierter Quelle kommen
- [x] Den Generatoransatz erstmals ausserhalb der Legal-Seiten genutzt: In [chronik.html](../chronik.html) werden Hero-Titel, Uebersichtskarten und Timeline-Summary jetzt aus [scripts/legal-content/chronik-overview.json](../scripts/legal-content/chronik-overview.json) gerendert, ohne die bestehende Wrapper-Semantik der Chronik zu aendern
- [x] Den Chronik-Generatoransatz direkt weitergezogen: Auch alle sieben Timeline-Stationen in [chronik.html](../chronik.html) kommen jetzt aus [scripts/legal-content/chronik-timeline-items.json](../scripts/legal-content/chronik-timeline-items.json); dafuer wurde der Renderer minimal erweitert, damit bestehende `div.timeline-item-text`-Semantik generatorbasiert erhalten bleibt
- [x] Den Generatoransatz erstmals auf die Hauptseite erweitert: Im Musikfamilie-Block von [index.html](../index.html) kommen Titel, Intro, Benefits, Gruppen-Einstiege und Kontaktlabel jetzt aus [scripts/legal-content/homepage-music-family.json](../scripts/legal-content/homepage-music-family.json); dafuer unterstuetzt der Renderer auch vertrauenswuerdiges Inline-HTML in Listenpunkten, damit die vorhandenen Checkmark-/Text-Wrapper intakt bleiben
- [x] Den Hauptseiten-Rollout direkt verbreitert: Der restliche Musikfamilie-Block sowie Repertoire und Engagement auf [index.html](../index.html) kommen jetzt ebenfalls aus [scripts/legal-content/homepage-music-family.json](../scripts/legal-content/homepage-music-family.json) und [scripts/legal-content/homepage-repertoire.json](../scripts/legal-content/homepage-repertoire.json); der Renderer schreibt dafuer mehrzeiliges vertrauenswuerdiges Wrapper-HTML statisch zurueck, ohne bestehende Karten- und Listenklassen zu verlieren
- [x] Den Hauptseiten-Rollout bis an die unteren Homepage-Bereiche weitergezogen: Event-Einfuehrung, beide Event-Karten, der Kontaktbereich und der Footer auf [index.html](../index.html) kommen jetzt aus [scripts/legal-content/homepage-events.json](../scripts/legal-content/homepage-events.json) und [scripts/legal-content/homepage-contact-footer.json](../scripts/legal-content/homepage-contact-footer.json); die neue Smoke-QA prueft dafuer jetzt auch Event-, Kontakt- und Footer-Texte nach Sprachumschaltung
- [x] Den Hauptseiten-Rollout wieder nach oben geschlossen: Der "Musik baut Bruecken"-Introblock inklusive Jubiläumsfilm-Card sowie der Astrid-Abschnitt auf [index.html](../index.html) kommen jetzt aus [scripts/legal-content/homepage-bridge-about.json](../scripts/legal-content/homepage-bridge-about.json); dafuer unterstuetzt der Renderer optional sprachspezifische `lang`-Attribute, damit bestehende Sprachsemantik an den Filmtexten erhalten bleibt
- [x] Release-QA nach dem Intro-/About-Rollout am 2026-04-08 erneut ueber Edge, Chrome und Firefox mit 0 Funden durchlaufen; dabei wurden die neuen oberen Homepage-Texte explizit in der Smoke-QA mitgeprueft
- [x] Den Accessibility-Pass auf [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) erweitert: Die spezielle Legal-Schnellnavigation hat jetzt einen eigenen Landmark-Namen und wird sprachabhaengig ueber [scripts/site-language.js](../scripts/site-language.js) synchronisiert
- [x] Diese Anschlussarbeiten im Folgeplan [FOUR-WEEK-PLAN-10-10.md](../docs/FOUR-WEEK-PLAN-10-10.md) und im Handoff [FRONTEND-HANDOFF.md](../docs/FRONTEND-HANDOFF.md) dokumentiert