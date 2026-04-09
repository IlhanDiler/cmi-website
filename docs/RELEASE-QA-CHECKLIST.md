# Release QA Checklist

## Zweck

Diese Kurzfassung ist fuer die schnelle Freigabe nach kleineren Frontend-Aenderungen gedacht. Wenn hier etwas auffaellt, sollte anschliessend die vollstaendige Checkliste in [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md) genutzt werden.

Fuer den Week-3-Browser-Matrix-Check kann der Smoke-Run optional mit `QA_BROWSER_TARGETS=msedge,chrome,firefox` gestartet werden. Ohne diese Variable bleibt der bisherige schnelle Auto-Modus aktiv und nimmt den ersten verfuegbaren Chromium-Browser.
Der automatische Mindest-Gate in [/.github/workflows/site-quality-gate.yaml](../.github/workflows/site-quality-gate.yaml) nutzt in CI `QA_BROWSER_TARGETS=chromium,firefox` und faellt bei Funden hart aus.
Wenn Navigation, Sprachumschaltung, Legal-Seiten oder Interaktionszustand betroffen sind, in der Vollcheckliste mindestens die Bloecke `Tastatur und Fokus`, `Zoom und Reflow` und `Screenreader-Kurzcheck` mitnehmen.

## Kurzcheck

Wenn fuer die Freigabe nur ein sehr kurzer Screenreader-Check realistisch ist, den Ablauf in [docs/NVDA-QUICK-PASS.md](./NVDA-QUICK-PASS.md) nutzen.

- [ ] [index.html](../index.html) auf Desktop laden: keine sichtbaren Layout-Brueche im Hero, in der Navigation oder im Footer.
- [ ] [index.html](../index.html) auf Mobile laden: Mobile-Menue oeffnet und schliesst sauber.
- [ ] Sprachwechsel auf der Hauptseite pruefen: Navigation, Tagline und Hero-Caption wechseln sichtbar.
- [ ] Homepage einmal kurz mit Screenreader gegenpruefen: `Hauptnavigation`, `main`, die grossen benannten Regionen und der Jubilaeumsfilm-Link mit Aussenfenster-Hinweis werden sinnvoll angekuendigt.
- [ ] Hero-Gallery pruefen: Prev/Next und Dots funktionieren, Caption passt weiter zur Sprache.
- [ ] Ein Event-Poster oeffnen: Lightbox oeffnet, schliesst per Overlay oder Escape und gibt den Fokus zurueck.
- [ ] Review-Bereich pruefen: Archiv laesst sich oeffnen, mindestens eine Review-Karte klappt sauber auf und zu.
- [ ] [chronik.html](../chronik.html) oeffnen: Topbar, Timeline und Sprachanzeige wirken stabil.
- [ ] [datenschutz.html](../datenschutz.html) und [impressum.html](../impressum.html) kurz oeffnen: keine sichtbaren Layout- oder Sprachfehler.
- [ ] Hauptseite neu laden und einen Hash-Link wie `index.html#review` pruefen: kein offensichtlicher Scroll-Sprungfehler.
- [ ] Browser-Konsole auf der Hauptseite einmal kurz auf neue Fehler pruefen.

## Eskalation

- Wenn einer dieser Punkte fehlschlaegt, nicht nur den Einzelpunkt patchen, sondern die betroffene Runtime-Datei und ihre Abhaengigkeiten gegenpruefen.
- Fuer groessere Releases oder sichtbare UI-Aenderungen anschliessend die Vollpruefung in [docs/MANUAL-QA-CHECKLIST.md](../docs/MANUAL-QA-CHECKLIST.md) durchgehen.