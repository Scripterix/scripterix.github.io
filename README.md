# Scripterix Studio

Jednostronicowa witryna niezależnego studia programistycznego. Projekt działa
na Vite i TypeScript, a produkcyjny build jest publikowany przez GitHub Actions.

## Lokalnie

```powershell
npm.cmd ci
npm.cmd run typecheck
npm.cmd run build
$env:PLAYWRIGHT_SERVER_COMMAND='npm run preview'
npm.cmd run test:visual
Remove-Item Env:PLAYWRIGHT_SERVER_COMMAND
```

Podgląd developerski: `npm.cmd run dev` i `http://127.0.0.1:4173/`.

## Zakres publiczny

Publiczny build zawiera tylko aktualny Home Scripterix Studio oraz dane jego
nawigacji. Historyczne podstrony projektu #55 są zachowane w repozytorium, ale
nie są wejściami Vite i nie trafiają do `dist/`.

Klasyfikacja migracji znajduje się w `studio/migration-audit.md`. Kompletna
poprzednia witryna Jekyll jest zabezpieczona na gałęzi `old`.
