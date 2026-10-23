# Scripterix Studio

Witryna i portfolio niezależnego developera: aplikacje webowe, automatyzacja
procesów i eksperymenty z narzędziami AI. Projekt korzysta z technicznego
dorobku #55 / Agentic Studio, ale ma własną architekturę informacji, treści i
zasady marki.

- Witryna: https://scripterix.github.io/
- Repozytorium: https://github.com/Scripterix/scripterix.github.io

## Architektura

Projekt jest lekką aplikacją Vite MPA z TypeScript, HTML, CSS i Bootstrapem.
Produkcyjny build obejmuje Home oraz strony Usługi, Portfolio, LAB, Kontakt i
Wyniki wyszukiwania. Nawigacja korzysta z `data/site.json`, a wyszukiwarka z
`data/search-index.json`.

```text
index.html                         # Home
pages/                             # Aktualne podstrony MPA
src/components/                    # Nawigacja, search, Hero, CTA i stopka
data/site.json                     # Nawigacja
data/search-index.json             # Generowany indeks wyszukiwarki
scripts/generate-search-index.mjs  # Generator, kontrola aktualności i Watch
assets/css/                        # Style współdzielone i stron
docs/legacy/site.js                # Archiwalny skrypt #55
studio/migration-audit.md          # Klasyfikacja migracji i cleanupu
tests/                             # Testy Playwright
vite.config.ts                     # Wejścia MPA i kopiowanie danych runtime
```

## Praca lokalna

```powershell
npm.cmd ci
npm.cmd run dev
```

Podgląd developerski działa pod `http://127.0.0.1:4173/`. Nie edytuj `dist/` —
jest odtwarzalnym wynikiem produkcyjnego buildu. `npm run dev` generuje indeks
przy starcie i odświeża go po zmianie indeksowanych stron lub konfiguracji Hero.

Indeks można też obsługiwać niezależnie:

```powershell
npm.cmd run search:index
npm.cmd run search:index:check
npm.cmd run search:index:watch
```

## Weryfikacja

```powershell
npm.cmd run typecheck
npm.cmd run build
$env:PLAYWRIGHT_SERVER_COMMAND='npm run preview'
npm.cmd run test:visual
Remove-Item Env:PLAYWRIGHT_SERVER_COMMAND
```

Playwright sprawdza nawigację, podstawowe strony, wyszukiwarkę w modalu i na
stronie wyników, zachowanie mobilne, obsługę klawiatury, puste wyniki oraz linki
do znalezionych stron.

Stan QA z 2026-10-21: typecheck i build przechodzą, ale publikacja jest
wstrzymana przez niestabilny mobilny scenariusz otwarcia search z menu.

## Dodawanie strony lub projektu

1. Dodaj stronę w `pages/` i zarejestruj ją w `vite.config.ts`.
2. Jeśli ma występować w menu, dodaj wpis w `data/site.json`.
3. Jeśli strona ma być wyszukiwana, dodaj ją do jawnej allowlisty w `scripts/generate-search-index.mjs`; nie edytuj ręcznie `data/search-index.json`.
4. Sprawdź ścieżki względne, aktywną nawigację i link powrotny.
5. Uruchom typecheck, build i adekwatne testy Playwright.

Generator indeksuje wyłącznie Home, Usługi, Portfolio, LAB i Kontakt. Pobiera
tytuł, meta description, tekst z `<main>` oraz treść właściwej konfiguracji
Hero. Strona wyników, `dist/`, dokumentacja i historyczne strony #55 są
wyłączone. Zmiana allowlisty wymaga również sprawdzenia wejść MPA w Vite.

## Publikacja i archiwum

Gałąź `main` jest źródłem aktywnego Studio. GitHub Actions wykonuje typecheck,
build i testy Playwright, a następnie publikuje `dist/` w GitHub Pages. Gałąź
`old` zachowuje wcześniejszą witrynę Jekyll. Kod referencyjny #55 znajduje się
w `docs/legacy/` i nie trafia do publicznego buildu.

Zasady pracy: [`AGENTS.md`](AGENTS.md). Plan: [`ROADMAP.md`](ROADMAP.md).
Historia zmian: [`CHANGELOG.md`](CHANGELOG.md).
