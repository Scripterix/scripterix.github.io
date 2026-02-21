# GitHub Pages deployment automation (Jekyll source-only)

Cel: publikacja bez recznego kopiowania `_site`.

## Zalozenia
- Repo na `main` zawiera tylko zrodla Jekyll.
- Build output `_site` nie jest commitowany.
- `docs/` to folder zrodlowy (np. changelog), nie folder publikacji builda.
- Deploy idzie przez GitHub Actions (`.github/workflows/pages.yml`).

## Minimalny porzadek
1) W `.gitignore` trzymaj `_site` (oraz cache i lokalne zaleznosci).
2) Nie dodawaj `.nojekyll`.
3) Trzymaj tresci tylko w zrodlach:
   - `_posts`
   - `_logbook`
   - `_works`
   - strony `*.markdown` / `*.md`
4) Build lokalny:
```bash
bundle exec jekyll build
```

## Ustawienia Pages na GitHub
- `Settings -> Pages -> Build and deployment`
- `Source: GitHub Actions`

## Workflow
Plik: `.github/workflows/pages.yml`

Workflow robi:
1) checkout repo,
2) setup Ruby + bundler cache,
3) `bundle exec jekyll build`,
4) upload artefaktu `_site`,
5) deploy na GitHub Pages.

## Codzienna praca
1) Dodaj wpis do `_posts`, `_logbook` albo `_works`.
2) Sprawdz lokalnie:
```bash
bundle exec jekyll build
```
3) Commit i push:
```bash
git add .
git commit -m "Add content: ..."
git push origin main
```
4) Sprawdz zielony workflow `Build and Deploy Jekyll`.

## Gdy deploy nie dziala
- Sprawdz logi workflow w zakladce `Actions`.
- Sprawdz, czy `Pages` ma source ustawione na `GitHub Actions`.
- Sprawdz, czy nie ma `.nojekyll`.
- Sprawdz, czy `_config.yml` i Liquid nie daja warningow krytycznych.

## Jak teraz pracujemy z Jekyllem 21.02.2026
- Zrodla w  scripterix-clean 


git pull origin main
npm run new:post -- --title "Tytul" --lang pl --slug tytul
npm run new:log -- --title "Dzien nauki" --lang pl --slug dzien-nauki
npm run new:work -- --title "Projekt" --lang pl --slug projekt
bundle exec jekyll serve
git add .
git commit -m "Add content"
git push origin main


Czyli robię ściągnięcie repo na local 
potem robię zmianę lub dodanie aktulaizacje i wypycham na reo i wtedy GitHub Actions robi build i deploy na Pages.