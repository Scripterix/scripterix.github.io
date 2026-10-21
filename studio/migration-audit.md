# Scripterix Studio — audyt migracji projektu #55

Data audytu: 2026-10-20; weryfikacja i realizacja cleanupu: 2026-10-21
Zakres: lokalny projekt `024 OGW GH Pages` oraz repozytorium
`Scripterix/scripterix.github.io`.

## Decyzja architektoniczna

Projekt #55 jest bazą techniczną i wizualną, ale nie jest częścią publicznej
architektury informacji Scripterix Studio. Produkcyjny build zawiera Home,
aktualne podstrony Studio oraz wyszukiwarkę. Historyczne tagowanie lokalne,
siatka stron i pozostałe mechanizmy #55 nie są częścią aplikacji.

Łańcuch publicznej aplikacji po migracji:

`index.html` + `pages/` → CSS → komponenty TypeScript → `data/site.json` + `data/search-index.json`
→ Vite → `dist/` → GitHub Pages.

Bootstrap CSS, Bootstrap Icons i Bootstrap JS są nadal pobierane z jsDelivr.
GitHub Actions uruchamia typecheck, build i Playwright przed publikacją `dist/`.

## KEEP — aktywne Scripterix Studio

| Zasób | Zależności | Uzasadnienie |
| --- | --- | --- |
| `index.html` | Bootstrap CDN, `site.css`, `home.css`, `navigation.ts`, dwa obrazy | Zatwierdzony Home; struktura, treści i design pozostają bez przebudowy. Zmieniono tylko cele trzech linków prowadzących wcześniej do wyłączonych stron. |
| `assets/css/home.css` | tokeny z `site.css`, selektory Home | Docelowy layout, typografia, kolory i responsywność Home. |
| `assets/img/studio-code.jpg` | `index.html` | Obraz hero używany publicznie. |
| `assets/img/prntScreen/1/desktop.png` | `index.html` | Zweryfikowany screenshot projektu w sekcji portfolio. |
| `studio/gpt-promts/brand.md` | `audiences.md`, `visual-direction.md` | Nadrzędne zasady tożsamości i komunikacji marki. |
| `studio/gpt-promts/audiences.md` | `brand.md` | Segmenty odbiorców i ograniczenia dotyczące twierdzeń ofertowych. |
| `studio/gpt-promts/visual-direction.md` | `site.css`, `home.css` | Aktualny kierunek wizualny. |
| `studio/think-tank/pierwszy-trop.md` | sekcja LAB w Home | Źródło statusu LAB-001 jako hipotezy, nie gotowego produktu. |
| `scripts/review-home.mjs` | Playwright, działający serwer | Kontrola Home w szerokościach 1440, 1024, 768, 390 i 320 px. |
| `tsconfig.json` | `src/**/*.ts`, `vite.config.ts` | Ścisły typecheck bez emisji. |
| `package.json`, `package-lock.json` | npm, Vite, TypeScript, Playwright | Odtwarzalne zależności i komendy weryfikacyjne. |
| `.github/workflows/pages.yml` | npm, Playwright, `dist/` | Build i publikacja Vite przez GitHub Actions bez Jekylla. |
| `pages/uslugi.html`, `pages/portfolio.html`, `pages/lab.html`, `pages/kontakt.html` | wspólne komponenty TypeScript i CSS | Aktualne podstrony Scripterix Studio. |

## ADAPT — zachowane i dostosowane

| Zasób | Zależności | Zmiana migracyjna |
| --- | --- | --- |
| `data/site.json` | `navigation.ts`; importowany także jako fallback | Usunięto `Warsztat`, dzieci dropdownu i listę dawnych stron. Nawigacja odpowiada sekcjom Home: Start, Kompetencje, Projekty, LAB, Współpraca, Kontakt. |
| `src/components/navigation.ts` | `data/site.json`, Bootstrap collapse, `src/core/types.ts` | Zachowano renderowanie, fallback, aktywną sekcję i obsługę mobile; odłączono przyciski historycznej wyszukiwarki. |
| `assets/css/site.css` | `index.html`, `home.css` | Nadal dostarcza tokeny, bazę strony i nawigację. Zawiera też nieużywane reguły #55; ich fizyczne czyszczenie nie należy do tej iteracji. |
| `src/core/types.ts` | `navigation.ts` | Zachowuje kontrakt danych. `PageItem` pozostaje dla czytelności historycznego formatu, mimo pustej tablicy `pages`. |
| `vite.config.ts` | `index.html`, `data/site.json` | Wejściem buildu jest tylko Home; do `dist/data/` kopiowany jest wyłącznie `site.json`. |
| `playwright.config.js` | `tests/*.spec.js`, serwer Vite | Pozwala uruchomić testy przeciw dev serverowi lub produkcyjnemu preview przez zmienne środowiskowe. |
| `tests/visual.spec.js` | Home, nawigacja, obrazy, Bootstrap | Usunięto założenia dotyczące stron #55; zachowano testy treści, fallbacku, mobile, linków, obrazów, konsoli i requestów. |
| `tests/screenshots.spec.js` | Home, desktop/mobile | Ograniczono screenshoty do aktualnej publicznej strony. |
| `studio/home-roadmap.md` | dokumenty marki, Home | Zaktualizowano mapę nawigacji i status historycznych mechanizmów. |
| `README.md` | komendy npm, audyt, gałąź `old` | Zastępuje dokumentację Jekylla instrukcją aktualnego Studio. |
| `src/components/search.ts` | `data/search-index.json`, `site.css` | Wydzielona, typowana obsługa modalu i strony wyników; bez tagowania i `localStorage`. |
| `pages/search-result.html` | `navigation.ts`, `search.ts` | Widok wyników dostosowany do aktualnego Studio. |
| `data/search-index.json` | `search.ts` | Indeks pięciu aktualnych stron Studio. |

## DISABLE — zachowane, ale odłączone od publicznej aplikacji

| Zasób | Dawne zależności | Sposób odłączenia |
| --- | --- | --- |
| `pages/mikrointerakcje.html` | historyczna prezentacja demonstratora Portfolio | Brak w nawigacji i produkcyjnym buildzie; zachowana bez starego skryptu. |
| `assets/img/prntScreen/1/mobile.png`, `assets/img/prntScreen/2/`–`5/` | historyczne screenshoty #55 | Zachowane w repozytorium; nie trafiają do bundla. |

## ARCHIVE — historia i materiały decyzyjne

| Zasób | Powód |
| --- | --- |
| `docs/agentic-brief.md` | Dawna specyfikacja #55; oznaczona nagłówkiem `ARCHIVE`, aby nie sterowała kolejnymi zmianami Studio. |
| `docs/context.txt`, `docs/opis-55.md`, `docs/codex-55-mozliwosci.md`, `docs/gh-actions.md`, `docs/automatic-loop.md` | Kontekst modelu, workflow i dawne propozycje automatyzacji/deployu projektu #55. |
| `studio/gpt-promts/home-proposal.md`, `home-proposal-2.md`, `finalne-teksty-home.md`, `pomysl-codex-wie-jak.md` | Wcześniejsze propozycje i szkice, zastąpione przez wdrożony Home oraz aktualne dokumenty marki. |
| `studio/think-tank/*.md`, obrazy porównawcze w `studio/think-tank/` | Materiał badawczy i historia decyzji; nie jest częścią strony publicznej. |
| `studio/use-img/*.jpg` | Materiały źródłowe i pochodzenie wybranego obrazu; tylko zoptymalizowany `studio-code.jpg` jest używany publicznie. |
| Gałąź Git `old` | Kompletny ostatni stan źródłowego Jekylla na commicie `ada04648a3459475f408c3e05121f0233f9a5758`. |
| `docs/legacy/site.js` | Oryginalny skrypt #55 (`assets/js/sites.js`) zachowany poza publicznym buildem. |

## REMOVED — cleanup 2026-10-21

- Usunięto strony #55: `alpine-js.html`, `iteracje.html`, `search-fuse.html`, `struktura.html`, `vite.html`, `weryfikacja.html` i `wizualia.html`.
- Usunięto ich osierocone obrazy: `agentic-workspace.png`, `alpine-js.png`, `fuzze-search.png`, `vite.png` i `visual-system.png`.
- Usunięto pusty `assets/js/site.js`; pełny historyczny `assets/js/sites.js` przeniesiono do archiwum.
- Usunięto kod i selektory tagowania stron przez `localStorage`.

## Pozostali kandydaci — decyzja 2026-10-21

| Decyzja | Zasób | Uzasadnienie |
| --- | --- | --- |
| DELETE | `dist/` | Odtwarzalny wynik buildu, ignorowany przez Git; może być czyszczony poza sesją publikacyjną. |
| DELETE | `node_modules/` | Odtwarzalne przez `npm ci`; usuwać tylko przy świadomym cleanupie środowiska. |
| DELETE | `test-results/`, `playwright-report/` | Odtwarzalne wyniki testów, ignorowane przez Git. |
| KEEP | `pages/mikrointerakcje.html` | Zachowany materiał demonstratora opisanego w aktualnym Portfolio. |
| KEEP | `assets/img/prntScreen/` | Materiał dowodowy projektu Agentic Studio i źródło aktywnego obrazu Portfolio. |
| KEEP | `docs/legacy/site.js` | Referencyjna, pełna implementacja #55 poza publicznym buildem. |
| REVIEW | `artifacts/home/` | Wybrane obrazy mogą być dowodem QA; katalog jako całość jest odtwarzalny. |
| REVIEW | `index1.html` | Nie jest wejściem Vite; wymaga potwierdzenia, czy to nadal potrzebna kopia robocza. |
| REVIEW | `docs/architecture.md` | Pusty plik bez aktywnego zastosowania; nie usunięto bez decyzji autora. |
| REVIEW | Nieaktywne selektory #55 w `assets/css/site.css` | Usuwać dopiero po osobnym audycie zależności CSS. |

## Indeksowanie wyszukiwarki — ocena

W #55 nie było automatycznego generatora indeksu. Instrukcja wymagała ręcznego
dopisania strony do `data/search-index.json`; skrypt runtime pobierał JSON i
filtrował go po polach `topics` lub `content`. Vite kopiował gotowy plik, ale go
nie generował. Nie znaleziono generatora również na gałęzi `old`.

Rekomendacja na osobną iterację: jeden jawny manifest metadanych stron i
projektów oraz mały skrypt `scripts/generate-search-index.mjs` z trybem `--check`.
Generator powinien walidować unikalne `page`, istniejące `href` i wymagane pola,
a `prebuild` powinien wykrywać nieaktualny indeks. Nie należy generować indeksu
przez parsowanie zbudowanego HTML, ponieważ część treści powstaje w TypeScript.

## Granice tej iteracji

- Usuwanie ograniczono do uzgodnionych, zweryfikowanych pozostałości #55.
- Bez nowych funkcji i bez rozbudowy automatyzacji poza konieczny pipeline Pages.
- Bez zmian kompozycji, typografii, kolorów i responsywnego układu Home.
- Bez force push, kasowania historii lub usuwania gałęzi `old`.
