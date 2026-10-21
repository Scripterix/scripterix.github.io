# Changelog — Scripterix Studio
Zapisujemy istotne zmiany produktu, nie każdą rozmowę ani pojedynczą korektę tekstu. Rozróżniamy stan opublikowany i lokalny. Daty i wyniki poniżej pochodzą z raportów opisanych w naszej rozmowie; nie były ponownie weryfikowane w repozytorium podczas tworzenia tego pliku.
[Unreleased] — prace lokalne (2026-10-21)
Added
- `src/components/search.ts` oraz aktualny widok wyników wyszukiwania dla stron Studio.
- pages/kontakt.html — pierwsza samodzielna podstrona Vite MPA.
- pages/uslugi.html — przeniesiona sekcja Kompetencje jako osobna podstrona usług.
- pages/portfolio.html — Portfolio z Agentic Studio i zachowanymi demonstratorami.
- pages/lab.html — indywidualny Hero LAB, trzy kierunki badawcze i deklaracja rozwoju AI.
- src/components/footer.ts — wspólna implementacja stopki dla aktualnych stron.
- src/components/hero.ts — wspólny Hero z indywidualną treścią i opcjonalną ilustracją.
- src/components/cta.ts — wspólne CTA prowadzące do Kontaktu na podstronach.
- assets/css/lab.css — wydzielone style unikalnej strony LAB.
- Dokumentacja M1: AGENTS.md, README.md, ROADMAP.md i CHANGELOG.md.
Changed
- Wyszukiwarka korzysta z TypeScript i indeksu pięciu aktualnych stron; działa w modalu oraz na `pages/search-result.html`.
- Historyczny skrypt przeniesiono do `docs/legacy/site.js`; usunięto tagowanie przez `localStorage`.
- Home został ograniczony do wspólnego Hero i pełnej czteroetapowej sekcji Współpraca.
- Sekcje Kompetencje, Projekty i LAB zostały przeniesione z Home do osobnych wejść Vite MPA.
- Nawigacja prowadzi do Start, Usług, Portfolio, LAB i Kontaktu; Współpraca nie jest osobną pozycją menu.
- Pasek „Development / Automation / AI Engineering” został przeniesiony spod Hero Home na stronę Usługi.
- Usługi, Portfolio i LAB korzystają ze wspólnego CTA; Kontakt pozostaje stroną docelową.
- Potwierdzona przez Codexa lokalna nazwa starszego skryptu: assets/js/sites.js (wcześniejsze dokumenty używały site.js; przed edycją sprawdzić rzeczywisty plik).
Fixed
- Ujednolicono wygląd nawigacji Home i Kontaktu, usuwając starsze ikony widoczne tylko na podstronie.
Removed
- Siedem nieużywanych stron demonstracyjnych #55 i pięć przypisanych im, osieroconych obrazów.
- Pusty `assets/js/site.js` oraz nieużywane selektory CSS lokalnego tagowania.
Verification
- `npm run typecheck` i produkcyjny `npm run build` zakończyły się poprawnie.
- `dist/` zawiera wyłącznie Home, Kontakt, Usługi, Portfolio, LAB i Wyniki wyszukiwania; brak stron i skryptów #55.
- Playwright przeciw produkcyjnemu preview: 24 testy zaliczone, 1 celowo pominięty, 1 mobilny test klawiaturowy wyszukiwarki nie przeszedł.
- Publikację wstrzymano do usunięcia blokera mobilnego search.
Not deployed
- Zmiany opisane w sekcji Unreleased nie zostały wypchnięte do GitHub ani opublikowane.
[M0 — migracja Home] — 2026-10-20 (raportowana jako opublikowana)
Added
- Home Scripterix Studio: kompetencje, projekty, LAB, współpraca i kontakt (w tamtej wersji jako sekcja One Page).
- Pipeline GitHub Actions budujący i publikujący Vite, bez Jekylla.
- studio/migration-audit.md — klasyfikacja KEEP / ADAPT / DISABLE / ARCHIVE / DELETE CANDIDATE.
Changed
- main zastąpił poprzednią stronę Jekyll witryną Scripterix Studio.
- Nawigacja i produkcyjny build ograniczone do aktualnego Home; dawne podstrony #55 pozostawione w źródłach bez publikowania.
Archived
- Źródłowy Jekyll zabezpieczony w gałęzi old (według raportu: commit ada04648a3459475f408c3e05121f0233f9a5758).
Verification (raport z migracji)
- Typecheck i build poprawne; Playwright 13 zaliczonych, 1 pominięty.
- Przegląd pięciu szerokości ekranu bez zgłoszonych regresji.
Polityka wpisów
- Added — nowe możliwości lub strony.
- Changed — widoczne zmiany funkcjonalne i architektura.
- Fixed — naprawione problemy.
- Removed — fizycznie usunięte elementy (nie mylić z DISABLE).
- Security — zmiany bezpieczeństwa, jeśli wystąpią.
- Not deployed — lokalne prace oczekujące na publikację.
