# Scripterix Studio — audyt migracji projektu #55

Data audytu: 2026-10-20
Zakres: lokalny projekt `024 OGW GH Pages` oraz repozytorium
`Scripterix/scripterix.github.io`.

## Decyzja architektoniczna

Projekt #55 jest bazą techniczną i wizualną, ale nie jest częścią publicznej
architektury informacji Scripterix Studio. Produkcyjny build zawiera wyłącznie
aktualny Home. Historyczne podstrony, wyszukiwarka i lokalne tagi pozostają w
repozytorium jako kod referencyjny, bez routingu produkcyjnego.

Łańcuch publicznej aplikacji po migracji:

`index.html` → `site.css` + `home.css` → `navigation.ts` → `data/site.json`
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

## DISABLE — zachowane, ale odłączone od publicznej aplikacji

| Zasób | Dawne zależności | Sposób odłączenia |
| --- | --- | --- |
| `pages/iteracje.html` | nav, `site.js`, `site.css` | Brak w `data/site.json` i wejściach Vite. |
| `pages/alpine-js.html` | nav, tagi, search, `alpine-js.png` | Brak w nawigacji i produkcyjnym buildzie. |
| `pages/vite.html` | nav, tagi, `vite.png` | Brak w nawigacji i produkcyjnym buildzie. |
| `pages/search-fuse.html` | search, `fuzze-search.png` | Brak w nawigacji i produkcyjnym buildzie. |
| `pages/search-result.html` | `site.js`, `search-index.json` | Brak w nawigacji i produkcyjnym buildzie. |
| `pages/wizualia.html` | `visual-system.png`, nav | Brak w nawigacji i produkcyjnym buildzie. |
| `pages/mikrointerakcje.html` | filtry z `site.js`, nav | Brak w nawigacji i produkcyjnym buildzie. |
| `pages/weryfikacja.html` | nav, historyczne testy | Brak w nawigacji i produkcyjnym buildzie. |
| `pages/struktura.html` | `data/site.json`, nav | Brak w nawigacji i produkcyjnym buildzie. |
| `assets/js/site.js` | search, tagi, filtry, siatka dawnych stron | Usunięty z `index.html`; plik pozostaje jako kod referencyjny. |
| `data/search-index.json` | `site.js`, strona wyników | Nie jest pobierany przez Home ani kopiowany do `dist/`. |
| `assets/img/alpine-js.png`, `assets/img/fuzze-search.png`, `assets/img/vite.png`, `assets/img/visual-system.png`, `assets/img/agentic-workspace.png` | historyczne strony | Nie są osiągalne z produkcyjnego buildu. |
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

## DELETE CANDIDATE — bez usuwania w tej iteracji

| Zasób | Uzasadnienie do późniejszej decyzji |
| --- | --- |
| `dist/` | Odtwarzalny wynik `npm run build`; publikowany jako artefakt Actions, nie jako źródło. |
| `node_modules/` | Odtwarzalne przez `npm ci`. |
| `test-results/`, `playwright-report/` | Odtwarzalne wyniki Playwright. |
| `artifacts/home/` | Odtwarzalne screenshoty przeglądu Home; można zachować wybrane obrazy jako dowód QA. |
| Wyłączone `pages/*.html`, `assets/js/site.js`, `data/search-index.json` i ich nieużywane obrazy | Kandydaci dopiero po wspólnej decyzji, czy demonstratory będą jeszcze potrzebne jako źródło portfolio. Obecnie pozostają zachowane. |
| Nieaktywne selektory #55 w `assets/css/site.css` | Możliwe do wydzielenia lub usunięcia po osobnym audycie CSS; teraz plik jest współdzielony z Home. |

## Granice tej iteracji

- Bez usuwania kandydatów.
- Bez nowych funkcji i bez rozbudowy automatyzacji poza konieczny pipeline Pages.
- Bez zmian kompozycji, typografii, kolorów i responsywnego układu Home.
- Bez force push, kasowania historii lub usuwania gałęzi `old`.
