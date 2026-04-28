# Social Feed Assessment

## Empfehlung in Kurzform

Fuer diese Website ist ein echter eingebetteter Social Feed derzeit nicht die sinnvollste Loesung.

Sinnvoller ist ein kuratierter eigener Feed auf Basis der bereits vorhandenen Review-, Event- und Share-Architektur.

Begruendung:

- Die Website ist bewusst statisch, schnell und technisch kontrolliert aufgebaut.
- Der bestehende Share-Flow ist bereits getrennt von der Hauptseitenlogik und auf Vorschau-, Export- und Teilbarkeit ausgelegt.
- Ein externer Social Feed wuerde Performance, Datenschutz, Accessibility und gestalterische Konsistenz verschlechtern.
- Die Seite ist mehrsprachig, waehrend externe Social-Inhalte in der Regel nicht sauber in die Sprachlogik integrierbar sind.

---

## 1. Entscheidungsraster

## Option A: Live-Feed von Instagram oder Facebook einbetten

### Vorteile

- Neue Inhalte erscheinen ohne separate redaktionelle Pflege auf der Website.
- Social-Aktivitaet ist fuer Besucher sofort sichtbar.
- Fuer sehr aktive Kanaele kann das kurzfristig lebendig wirken.

### Nachteile

- Zusaetzliche Fremdskripte, Tracking- und Consent-Themen.
- Hoeherer DSGVO- und Datenschutzhinweis-Aufwand.
- Schlechtere Ladezeit und mehr technische Fragilitaet.
- Schwache Kontrolle ueber Layout, Reihenfolge, Inhaltstiefe und Sprache.
- Abhaengigkeit von API-, Embed- oder Plattform-Aenderungen.
- Haeufig schlechtere Accessibility als bei eigener HTML-Struktur.

### Bewertung fuer diese Website

Eher nicht sinnvoll.

Die Seite profitiert stark von statischem HTML, kontrollierter Mehrsprachigkeit und sauberem QA-Setup. Ein Live-Feed waere dazu technisch und redaktionell ein Rueckschritt.

---

## Option B: Kuratierter eigener Feed auf Basis bestehender Inhalte

### Vorteile

- Volle Kontrolle ueber Inhalt, Sprache, Reihenfolge und Gestaltung.
- Kein externer Tracking- oder Embed-Zwang.
- Passt zur vorhandenen Share-Architektur.
- Kann dieselben Inhalte fuer Website, Share-Seiten und Instagram-Export mehrfach nutzbar machen.
- Gute Accessibility und Performance bleiben erreichbar.

### Nachteile

- Redaktionelle Pflege bleibt notwendig.
- Inhalte erscheinen nicht automatisch aus Social-Plattformen.
- Fuer echten "Live-Charakter" braucht es disziplinierte Aktualisierung.

### Bewertung fuer diese Website

Das ist die sinnvollste Loesung.

Sie passt zum bestehenden Aufbau mit Review-Bereich, Share-Seiten und Instagram-Export deutlich besser als ein externer Feed.

---

## Option C: Gar kein Feed

### Vorteile

- Maximale Einfachheit.
- Kein zusaetzlicher Pflege- oder Technikaufwand.
- Fokus bleibt auf Events, Chronik, Review und Kontakt.

### Nachteile

- Weniger sichtbare Aktualitaet auf der Startseite.
- Rueckblicke und Social-geeignete Inhalte bleiben staerker verteilt.
- Potenzial fuer wiederverwendbare Content-Oberflaechen bleibt ungenutzt.

### Bewertung fuer diese Website

Vertretbar, aber nicht optimal.

Da bereits viele gute Inhalte und eine ausgereifte Share-Struktur vorhanden sind, waere ein kleiner kuratierter Feed ein sinnvoller Mehrwert.

---

## Entscheidung

Empfohlen wird:

**Kein echter Social Embed, sondern ein eigener kuratierter Feed.**

Pragmatische Prioritaet:

1. Kein Live-Instagram-/Facebook-Embed.
2. Stattdessen ein eigener Bereich mit 3 bis 6 redaktionell ausgewaehlten Eintraegen.
3. Verlinkung auf bestehende Share-Seiten, Rueckblicke oder Event-Ziele.

---

## 2. Skizze fuer einen sauberen kuratierten Feed

## Zielbild

Ein kompakter Bereich auf der Startseite, der aktuelle oder wichtige Inhalte sichtbar macht, ohne externe Plattformen einzubetten.

Der Bereich sollte eher wie ein redaktioneller "Aktuelles"- oder "Neuigkeiten"-Block funktionieren als wie ein Social-Mirror.

---

## Inhaltlicher Zuschnitt

Empfohlen sind 3 Inhaltstypen:

- Kommende Konzerte oder Termine
- Neue Rueckblicke oder besondere Highlights
- Benefiz-, Reise- oder Projektbeitraege mit guter Bildwirkung

Jeder Eintrag sollte nur enthalten:

- Bild
- kurzer Titel
- sehr kurze Einordnung
- Datum oder Kategorie
- klarer Link zum vollen Ziel

Nicht noetig sind:

- Like-Zaehler
- Kommentarzahlen
- Social-Handle-Kopien
- Plattform-Chrome wie eingebettete Buttons oder Frames

---

## Technische Quelle

Der Feed sollte nicht direkt aus Instagram oder Facebook kommen, sondern aus euren bestehenden eigenen Inhalten.

Bevorzugte Quellenreihenfolge:

1. Bestehende Share-Seiten unter `share/`
2. Bestehende Review-Abschnitte auf der Hauptseite
3. Event-Karten auf der Hauptseite

Am saubersten waere mittelfristig eine strukturierte Quelle, zum Beispiel eine kleine JSON-Datei wie:

```json
[
  {
    "id": "masterclass-florian-meierott",
    "type": "review",
    "title": "Masterclass mit Florian Meierott",
    "date": "2025-10-12",
    "image": "bilder/masterclass-florian-meierott.jpg",
    "target": "share/masterclass-florian-meierott.html",
    "featured": true
  }
]
```

Damit liesse sich derselbe Inhalt spaeter fuer mehrere Stellen nutzen:

- Feed auf der Startseite
- Share-Seiten
- Instagram-Export
- moegliche Archiv- oder Highlight-Ansichten

---

## Layout-Empfehlung

Empfohlen ist kein endloses Raster, sondern ein knapper Highlight-Block.

Sinnvolle Form:

- ein auffaelliger Haupteintrag
- daneben 2 bis 5 kleinere Karten
- klare CTA wie "Zum Rueckblick", "Mehr entdecken" oder "Alle Highlights"

Das passt besser zur bestehenden Seite als ein klassischer Social-Stream mit vielen gleichartigen Cards.

---

## UX- und Accessibility-Anforderungen

Ein kuratierter Feed sollte dieselben Standards einhalten wie der Rest der Seite:

- echte HTML-Inhalte statt externer iframes
- saubere Tastaturbedienbarkeit
- sinnvolle Linktexte
- gute Bild-Alternativtexte
- Sprachumschaltung ueber bestehende `data-lang`-Mechanik
- kein automatisches Nachladen oder hektisches Reflow-Verhalten

Wenn der Bereich mehrsprachig wird, sollten nicht Social-Captions kopiert werden, sondern bewusst kurze, gepflegte Website-Texte verwendet werden.

---

## Was vermieden werden sollte

- Instagram-Embed-Widgets
- Facebook-Page-Plugins
- API-abhaengige Live-Feeds mit Tokens oder Rate-Limits
- doppelte Pflege zwischen Website-Texten und unstrukturierten Social-Posts
- rein dekorative "Social Wall" ohne klaren Nutzen fuer Besucher

---

## Empfohlene Einfuehrung in zwei Stufen

## Stufe 1: Minimal und sinnvoll

- Neuer Bereich "Aktuelles" oder "Neuigkeiten" auf der Startseite
- 3 kuratierte Eintraege
- manuell oder halbstrukturiert gepflegt
- Links auf bestehende Share- oder Review-Ziele

## Stufe 2: Architektonisch sauber

- kleine strukturierte Inhaltsquelle fuer Feed-Eintraege
- optional Generator-Anbindung analog zum aktuellen i18n-/Content-Ansatz
- Wiederverwendung fuer Website, Share und Export

---

## Konkreter Rollout 2026-04-08

Fuer die Startseite ist die sinnvollste Position **direkt vor dem bestehenden Rueckblicksbereich**.

Genauer:

- nach dem Astrid-/About-Block
- vor dem bestehenden Review-Overview mit "Seit 1981"

Warum dort:

- Der Bereich wirkt als Bruecke zwischen persoenlichem Profil, aktuellen Inhalten und dem tieferen Rueckblick.
- Er konkurriert nicht mit der Hero-Zone.
- Er dupliziert nicht einfach die Event-Sektion, sondern kuratiert ueber mehrere Inhaltstypen hinweg.

Die konkrete erste Ausbaustufe nutzt vier Karten:

- internationales Jubilaeumskonzert in Ochsenfurt
- Workshop mit Florian Meierott
- Benefiz-Trommelworkshop mit Gaesten aus dem Kongo
- Weihnachtskonzert zum Mitsingen

Die Karten verlinken bewusst auf bestehende Inhalte der Website statt auf externe Plattformen.

---

## Follow-up 2026-04-09

Der Aktuelles-Block springt jetzt direkt in passende Rueckblicke und der Rueckweg ist aktuell doppelt abgesichert:

- ueber einen dezenten Zurueck-Link im jeweiligen Rueckblick
- ueber einen eigenen Aktuelles-Link in der Hauptnavigation

Das ist funktional absichtlich schon sauber geloest, aber noch nicht als final feinjustierte UX-Entscheidung zu betrachten.

Spaeteres Fine-Tuning bewusst offen halten:

1. Pruefen, ob der Rueck-Link im Detailbereich dauerhaft noetig ist oder ob die Hauptnavigation als Rueckweg allein ausreicht.
2. Copy, Abstand, visuelle Gewichtung und Einordnung des Rueckwegs im Rueckblicksdetail noch einmal ruhig aus Nutzersicht feinjustieren.
3. Den Flow noch einmal manuell auf Desktop und Mobile durchgehen: Einstieg ueber Aktuelles, Browser-Back, direkter Deep-Link in einen Rueckblick und Rueckkehr in die passende Ausgangsstelle.

Dieser Punkt ist kein aktueller Blocker, sondern ein bewusst dokumentierter spaeterer UX-Feinschliff.

---

## Endfazit

Wenn das Ziel ist, die Website lebendiger und aktueller wirken zu lassen, dann ja: Ein Feed kann sinnvoll sein.

Wenn das Ziel ein externer Social-Live-Feed ist, dann nein: Das passt technisch und redaktionell eher nicht zu dieser Website.

Die beste Loesung fuer dieses Projekt ist ein **kuratierter, eigener Feed aus bestehenden Inhalten**.