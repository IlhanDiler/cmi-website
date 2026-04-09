# NVDA Quick Pass

## Ziel

Dieser Ablauf ist fuer einen echten 3- bis 5-Minuten-NVDA-Pass auf der Homepage gedacht. Er ersetzt keine vollstaendige Accessibility-QA, deckt aber die zuletzt gehaerteten Landmark-, Heading- und Sprachwechsel-Punkte schnell ab.

## Setup

- Seite ueber HTTP laden, zum Beispiel `python -m http.server 8123` aus dem Projektwurzelverzeichnis.
- [index.html](../index.html) in Chromium oder Edge oeffnen.
- NVDA starten.
- Seite einmal hart neu laden.

## 3- bis 5-Minuten-Pass

1. Seite in Deutsch am Anfang oeffnen.
Erwartung: Dokumenttitel ist sinnvoll; wenn der Cookie-Dialog sichtbar ist, wird er als benannter Dialog angekuendigt.

2. Einmal mit `D` oder ueber die Landmark-Liste durch die Landmarken springen.
Erwartung: `Hauptnavigation`, `main` und benannte Regionen fuer `Musik baut Bruecken`, `Werde Teil unserer Musikfamilie`, `Musikalisches Repertoire`, `Soziales Engagement`, `Kommende Konzerte & Begegnungen`, `Chronik`, `Dr. Astrid Eitschberger`, `Aktuelle Einblicke aus dem CMI`, `Seit 1981` und `Kontakt` sind auffindbar.

3. Einmal mit `H` durch die Ueberschriften springen.
Erwartung: genau eine `h1`; die grossen Homepage-Bloecke folgen als sinnvolle `h2`; `Dr. Astrid Eitschberger` wird als `h2` angekuendigt und nicht mehr als isolierte `h3`.

4. Zum Jubilaeumsfilm-Link navigieren.
Erwartung: der Link wird mit einem beschreibenden Namen inklusive Hinweis `oeffnet in neuem Fenster` angekuendigt.

5. Zum Kontaktbereich springen.
Erwartung: `Kontakt` erscheint als benannte Region; die Karten darunter sind mit sinnvollen `h4`-Titeln strukturiert.

6. Sprache auf Englisch wechseln und Landmark-Liste oder `D` erneut kurz pruefen.
Erwartung: mindestens `Music builds bridges`, `Become part of our music family`, `Upcoming Concerts & Gatherings` und `Contact` erscheinen in der neuen Sprache.

7. Eine News-Karte kurz anlesen.
Erwartung: keine redundante zusaetzliche Bildansage, die den ohnehin vorhandenen Kartentext dupliziert.

## Ergebnisnotiz

- Tester:
- Datum:
- Browser:
- NVDA-Version:
- Status: `pass` / `pass with notes` / `fail`
- Findings:

## Muster fuer erfolgreichen Handoff-Eintrag

Wenn der Kurzpass ohne relevanten Fund durchlaeuft, kann folgender Block in [docs/FRONTEND-HANDOFF.md](../docs/FRONTEND-HANDOFF.md) verwendet werden:

```text
Tester: <Name>
Datum: <YYYY-MM-DD>
Screenreader / Version: NVDA <Version>
Browser: Edge oder Chrome
Ergebnis: pass
Findings: Keine Blocker. Homepage-Landmarken, Heading-Struktur, Jubilaeumsfilm-Link, Kontaktstruktur und Sprachwechsel Deutsch/Englisch wurden sinnvoll angekuendigt; keine redundanten News-Teaser-Bildansagen aufgefallen.
```

Wenn der Lauf inhaltlich sauber ist, aber kleine Beobachtungen offenbleiben, dieselbe Vorlage mit `Ergebnis: pass with notes` verwenden und die Restpunkte direkt hinter `Findings:` notieren.
