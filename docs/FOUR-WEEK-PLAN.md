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
- Zentrale Accessibility-Helfer in [scripts/navigation-language.js](../scripts/navigation-language.js) und angrenzenden Runtime-Dateien nachziehen, wenn ein Root-Cause-Fix moeglich ist

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

- Runtime glatten, vor allem in [scripts/navigation-language.js](../scripts/navigation-language.js), [scripts/core-runtime.js](../scripts/core-runtime.js), [scripts/hero-gallery.js](../scripts/hero-gallery.js) und [scripts/review-interactions.js](../scripts/review-interactions.js)
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
- [ ] Komplette Release-QA fuer die betroffenen Hauptflows noch offen
- [ ] Restliche Week-1-Sweep-Punkte ausserhalb der bereits bearbeiteten Hauptinteraktionen noch offen

- [ ] Woche 1 abgeschlossen
- [ ] Woche 2 abgeschlossen
- [ ] Woche 3 abgeschlossen
- [ ] Woche 4 abgeschlossen