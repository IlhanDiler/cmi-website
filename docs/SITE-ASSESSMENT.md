# Site Assessment

Stand: 2026-04-07

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

Nach CSS-Modularisierung, Strukturarbeit und Navigation-A11y liegt die technische Bewertung heute höher.

Aktueller realistischer Stand:

- Design / Außenwirkung: 8/10
- UX / Gesamteindruck: 7/10 bis 8/10
- Technische Sauberkeit: 6/10 bis 7/10
- Wartbarkeit: 6/10 bis 7/10
- Professionalität insgesamt: klar näher an professionell als zuvor

## Was bereits verbessert wurde

1. Die CSS-Struktur wurde modularisiert.
2. Der Einstiegspunkt [style.css](../style.css) ist auf Importe reduziert.
3. Verantwortlichkeiten wurden in Komponentenmodule unter [styles/components](../styles/components) getrennt.
4. Navigation und Subpage-Topbar wurden mehrfach konsolidiert.
5. Die Navigation-Accessibility wurde deutlich verbessert, unter anderem mit Landmarken, Skip-Links, saubereren Sprachzuständen und besserem Mobile-Menü-Verhalten.
6. Die JavaScript-Runtime wurde fachlich in mehrere Dateien unter [scripts](../scripts) zerlegt; der verbleibende fruehe Scroll-Bootstrap sitzt jetzt direkt in den HTML-Koepfen.

## Was noch fehlt für wirklich professionell-sauber

1. Restliche Accessibility außerhalb der Navigation systematisch prüfen.
2. Historische Sonderfälle und inkonsistente Muster weiter abbauen.
3. Rendering- und Browser-QA noch systematischer absichern.
4. Langfristig weniger Duplikation im mehrsprachigen HTML erzeugen.
5. Die jetzt modulare JavaScript-Runtime kuerzerfristig noch mit gezielter Browser-QA absichern.

## Bewertungsmatrix

### 1. Design

Bewertung: 8/10

Die Seite hat eine erkennbare visuelle Haltung, wirkt nicht generisch und transportiert das kulturelle Profil des Projekts gut.

### 2. UX

Bewertung: 7/10 bis 8/10

Für Besucher funktioniert die Seite insgesamt gut. Schwächen lagen weniger im sichtbaren Flow als in der technischen Robustheit einzelner Muster.

### 3. Codequalität

Früher: 5/10  
Heute: 6/10 bis 7/10

Die Richtung stimmt inzwischen, aber die JavaScript-Struktur und einige gewachsene HTML-Muster sind noch nicht auf wirklich hohem Niveau.

### 4. Wartbarkeit

Früher: 5/10  
Heute: 6/10 bis 7/10

Die modulare CSS-Struktur hat hier bereits viel verbessert. Der größte offene Hebel liegt jetzt eher im JavaScript und in wiederkehrenden Sprach-/Markup-Mustern.

### 5. Professionalität insgesamt

Bewertung: nahe professionell, inzwischen deutlich näher als früher

Die Seite war nach außen schon länger stärker als ihr interner Aufbau. Durch das Refactoring nähert sich die technische Qualität jetzt dem sichtbaren Eindruck an.

## Ein-Satz-Zusammenfassung

Die Website war schon vorher in Wirkung und Gestaltung nah an professionell, lag technisch aber eher bei 5/10; nach den bisherigen Refactoring-Schritten ist sie strukturell klar besser und bewegt sich technisch eher im Bereich 6/10 bis 7/10.