# Site Assessment

Stand: 2026-04-08

## Kurzfazit

Die Website wirkt nach außen deutlich professioneller, als ihr technischer Unterbau lange gewesen ist.

Die frühere Kernaussage dazu war sinngemäß:

- visuell und im Nutzungseindruck bereits nah an professionell
- technisch damals eher nur mittel sauber
- deshalb insgesamt stark wirkend, aber intern noch nicht auf demselben Niveau organisiert

## Frühere Einschätzung

Die damalige spontane Bewertung war ungefähr so zu verstehen:

- Design / Außenwirkung: 8/10
- UX / Gesamteindruck: 7/10 bis 8/10
- Technische Sauberkeit: 5/10
- Wartbarkeit: 5/10
- Professionalität insgesamt: nah an professionell, aber technisch noch nicht sauber genug

Der Satz "5 von 10" bezog sich vor allem auf die technische Struktur, nicht auf die sichtbare Qualität der Website insgesamt.

## Warum technisch nur 5/10

Die Begründung dafür war im Kern:

1. Viele historisch gewachsene Overrides statt klarer Zuständigkeiten.
2. CSS und Verhalten waren an mehreren Stellen nicht sauber getrennt.
3. Ein großer Teil der JavaScript-Logik lag gesammelt in einer großen Datei.
4. Mehrsprachigkeit erzeugte viel dupliziertes Markup und damit hohen Pflegeaufwand.
5. Es gab mehrere Stellen, an denen das Ergebnis gut aussah, aber der Weg dorthin strukturell nicht robust war.

Kurz gesagt: Die Seite war nicht unprofessionell, aber sie war technisch deutlich näher an "gewachsen und erfolgreich zurechtgebogen" als an "sauber geplant und konsistent umgesetzt".

## Warum die Seite trotzdem schon nah an professionell wirkte

Trotz der technischen Schwächen gab es klare Stärken:

1. Eigenständige visuelle Richtung statt Standard-Baukastenwirkung.
2. Emotional stimmige Präsentation für Ensemble, Chronik und Benefiz-Themen.
3. Mehrsprachigkeit als echter Mehrwert, nicht nur als Deko.
4. Gute Außenwirkung für Besucherinnen und Besucher, obwohl intern noch viel Reibung vorhanden war.
5. Insgesamt ein Ergebnis, das in der Wahrnehmung klar über seinem technischen Rohzustand lag.

## Aktualisierte Einschätzung nach Refactoring-Schritten

Nach CSS-Modularisierung, Strukturarbeit, Runtime-Aufteilung, breiterer Accessibility-Haertung, technischer Quality-Gate-Einfuehrung und den ersten strukturellen i18n-Folgeschritten liegt die technische Bewertung heute nochmals etwas hoeher.

Aktueller realistischer Stand:

- Design / Außenwirkung: 8/10
- UX / Gesamteindruck: eher 8/10
- Technische Sauberkeit: eher solide 7/10
- Wartbarkeit: eher solide 7/10
- Professionalität insgesamt: sichtbar naeher an professionell und inzwischen auch im Unterbau deutlich belastbarer

## Was bereits verbessert wurde

1. Die CSS-Struktur wurde modularisiert.
2. Der Einstiegspunkt [style.css](../style.css) ist auf Importe reduziert.
3. Verantwortlichkeiten wurden in Komponentenmodule unter [styles/components](../styles/components) getrennt.
4. Navigation und Subpage-Topbar wurden mehrfach konsolidiert.
5. Die Navigation-Accessibility wurde deutlich verbessert, unter anderem mit Landmarken, Skip-Links, saubereren Sprachzuständen und besserem Mobile-Menü-Verhalten.
6. Die JavaScript-Runtime wurde fachlich in mehrere Dateien unter [scripts](../scripts) zerlegt; der verbleibende fruehe Scroll-Bootstrap sitzt jetzt direkt in den HTML-Koepfen.

## Was seit dem ersten Assessment zusätzlich dazugekommen ist

1. Accessibility-Verbesserungen betreffen inzwischen nicht mehr nur die Navigation, sondern auch Homepage, Chronik, Legal-Bereiche, Footer, Hero-Galerie und Event-Sharing.
2. Die Instagram-Exportseite wurde mehrfach gehaertet, unter anderem bei Preview-Semantik, kontextbezogenen Labels, Rueckmeldungen, Status-Regionen und Link-Hinweisen.
3. Dekorative Logos, SVGs, Medienakzente und Sprachflaggen werden konsistenter vor Assistive Technology verborgen und bleiben unfokussierbar.
4. Hidden-State und Accessibility-Zustand laufen an mehreren zentralen Stellen sauberer zusammen, zum Beispiel bei Sprachvarianten und Share-Komponenten.
5. Externe Links sowie Medien- und Share-Links kuendigen neues Fensterverhalten inzwischen konsistenter an.
6. Die groessten `data-lang`-Hotspots auf Hauptseite, Chronik und Legal-Seiten wurden auf ein gemeinsames `hidden`-/`aria-hidden`-Muster vereinheitlicht, statt weiter mit vielen verteilten Inline-`display:none`-Startzustaenden zu arbeiten.
7. Browser-Matrix und Release-Smokes liefen mehrfach mit 0 Funden ueber Edge, Chrome und Firefox, inklusive zentraler Share-Seite.
8. Vor push-basierten Deployments existiert jetzt ein echter technischer Quality-Gate-Workflow, der Root-Dateien, Share-Struktur und Browser-Smokes verbindlich prueft.
9. Die manuelle QA ist nicht mehr nur grober Smoke-Text, sondern als Browser-, Geraete- und Accessibility-Matrix dokumentiert und enger an die Release-QA gekoppelt.
10. Ein gezielter QA-Pass fuer Tastatur, Reduced Motion und Legal-Reflow wurde lokal durchgefuehrt; die daraus entstandenen Funde wurden direkt als Root-Cause-Fixes geschlossen.
11. Die strukturelle Entduplizierung ist nicht mehr nur Zielbild: Fuer den Impressum-Rechtsblock sowie sieben Datenschutz-Bloecke existieren jetzt Generatorpiloten aus strukturierter Quelle nach statischem HTML; groessere Bloecke koennen dabei in separate Quelldateien unter [scripts/legal-content](../scripts/legal-content) ausgelagert werden.

## Was noch fehlt für wirklich professionell-sauber

1. Accessibility ist deutlich besser als beim ersten Assessment, aber noch nicht als vollstaendiger Screenreader- und Geraeteklassen-Check ueber alle Seiten und Zustaende abgesichert.
2. Historische Sonderfälle und inkonsistente Muster sind stark reduziert, aber nicht vollstaendig verschwunden.
3. Die Browser-Matrix ist inzwischen belastbar, kann langfristig aber noch systematischer in manuelle und visuelle Checks eingebettet werden.
4. Die groessten Sprachduplikations-Hotspots sind standardisiert; die eigentliche HTML-Duplikation ist mit einem Impressum-Piloten und vier grossen Datenschutz-Bloecken angebrochen, aber architektonisch noch nicht breit aufgeloest.
5. Die jetzt modulare JavaScript-Runtime kann weiter vereinfacht werden, auch wenn die groessten Reibungspunkte bereits sichtbar reduziert sind.

## Abgleich nach dem 4-Wochen-Plan

1. Punkt 1 ist im pragmatischen Scope faktisch erreicht: Hauptseite, Chronik, Legal-Seiten, Footer, Share- und Interaktionsmuster wurden systematisch auf Accessibility und Hidden-States nachgezogen.
2. Punkt 2 ist weitgehend erreicht: Die groessten historischen Sonderfaelle in Runtime, Navigation und Sprachzustand sind reduziert, auch wenn einzelne gewachsene Muster bleiben.
3. Punkt 3 ist erreicht: Release-QA und Browser-Matrix wurden wiederholt ueber Edge, Chrome und Firefox mit 0 Funden durchlaufen.
4. Punkt 4 ist im gesetzten Scope erreicht: Die groessten `data-lang`-Hotspots sind standardisiert; eine vollstaendige Entduplizierung bleibt bewusst ausserhalb dieses Plans.
5. Punkt 5 ist sichtbar vorangebracht: Die Runtime ist modularer, konsistenter und QA-seitig besser abgesichert, ohne schon maximal vereinfacht zu sein.

Der dazugehoerige 4-Wochen-Arbeitsplan steht in [FOUR-WEEK-PLAN.md](../docs/FOUR-WEEK-PLAN.md).
Der Folgeplan fuer den Weg Richtung 10/10 steht in [FOUR-WEEK-PLAN-10-10.md](../docs/FOUR-WEEK-PLAN-10-10.md).

## Bewertungsmatrix

### 1. Design

Bewertung: 8/10

Die Seite hat eine erkennbare visuelle Haltung, wirkt nicht generisch und transportiert das kulturelle Profil des Projekts gut.

### 2. UX

Bewertung: eher 8/10

Fuer Besucher funktioniert die Seite insgesamt gut und inzwischen auch robuster als noch in frueheren Staenden. Schwächen liegen heute weniger im sichtbaren Flow als in der QA-Tiefe einzelner Muster.

### 3. Codequalität

Früher: 5/10  
Heute: eher 7/10

Die Richtung stimmt inzwischen nicht nur strukturell, sondern auch im Alltagsverhalten der Seite. Offene Punkte liegen heute eher in Rest-Duplikation, QA-Tiefe und einigen gewachsenen HTML-Mustern als noch in grober Unordnung.

### 4. Wartbarkeit

Früher: 5/10  
Heute: eher 7/10

Die modulare CSS-Struktur, die aufgeteilte Runtime und die vereinheitlichten Sprachzustandsmuster haben hier bereits viel verbessert. Der groesste offene Hebel liegt jetzt eher in verbleibender HTML-Duplikation und in noch tieferer QA statt in fehlender Grundstruktur.

### 5. Professionalität insgesamt

Bewertung: inzwischen klar nah an professionell und technisch glaubwuerdig abgestuetzt

Die Seite war nach außen schon länger stärker als ihr interner Aufbau. Durch das Refactoring nähert sich die technische Qualität jetzt dem sichtbaren Eindruck an.

## Ein-Satz-Zusammenfassung

Die Website war schon vorher in Wirkung und Gestaltung nah an professionell, lag technisch aber eher bei 5/10; nach CSS-Modularisierung, Runtime-Aufteilung, breiterer Accessibility-Haertung, wiederholter Browser-QA und standardisierten Sprachzustandsmustern liegt sie heute eher bei einer soliden 7/10 und wirkt insgesamt deutlich konsistenter.