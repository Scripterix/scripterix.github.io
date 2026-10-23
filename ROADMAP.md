# Scripterix Studio — ROADMAP
Aktualizacja: 2026-10-22
**Status:** plan roboczy; implementacja lokalna może wyprzedzać publikację na GitHub Pages.

## Cel
Rozwijać profesjonalną witrynę niezależnego developera jako lekką aplikację Vite MPA + TypeScript. Home przedstawia ofertę i kieruje do osobnych stron z treściami szczegółowymi. Pracujemy manual-first, etapami, bez zbędnego wykorzystania Codexa i Playwright MCP.

## Kamienie milowe
Etap	Stan	Zakres / kryterium ukończenia

M0 — Migracja #55 → Studio	Zakończony dla opublikowanego Home	main zawiera Studio, Jekyll zachowany na old, historyczne strony #55 odłączone od buildu; poprzednie testy i build przechodziły.

M1 — Dokumentacja i zasady	Zakończony lokalnie	AGENTS.md, README.md, ROADMAP.md i CHANGELOG.md znajdują się w projekcie. Dokumentacja jest aktualizowana tylko przy istotnych zmianach.

M2 — Kontakt jako podstrona MPA	Zakończony lokalnie; nieopublikowany	pages/kontakt.html jest osobnym wejściem Vite MPA; Home nie zawiera sekcji #kontakt, a przejścia Start/Kontakt działają w obu kierunkach. Po publikacji ponownie sprawdzić publiczne linki.

M3 — Wspólny layout	W toku	Wspólne komponenty TypeScript: Hero, stopka i tymczasowe CTA. Home zachowuje własną sekcję Współpraca, a LAB własny Hero w HTML. Wspólny nagłówek pozostaje kolejnym możliwym krokiem.

M4 — Portfolio / case studies	W toku	pages/portfolio.html działa lokalnie, zawiera Agentic Studio oraz demonstratory i ma filtrowanie Wszystkie / UI / UX w TypeScript. Następny zakres: dodać większe, rzeczywiście zrealizowane projekty i opisać je jako potwierdzone case studies.

M5 — Usługi i LAB	Zakończony pierwszy zakres lokalny	pages/uslugi.html i pages/lab.html są osobnymi wejściami MPA. LAB zachowuje indywidualny Hero, trzy kierunki badawcze i jasne rozróżnienie koncepcji od gotowych produktów.

M6 — Wyszukiwarka i porządki #55	Rozwinięty lokalnie; nieopublikowany	Wyszukiwarka działa jako moduł TypeScript w modalu i na stronie wyników. Indeks pięciu publicznych stron jest generowany automatycznie, odświeżany przez Vite w dev i sprawdzany przez --check. Pełne QA mobilnego przycisku search pozostaje otwarte.


Najbliższe kroki
0. Search Result mają starą nav. Wprowadzić sekcję O mnie jako część Home ( krótkie kilka słów ) 
1. Ustabilizować mobilny trigger wyszukiwarki i ponowić pełny Playwright przeciw produkcyjnemu preview.
2. Rozwinąć Portfolio o większe, faktycznie zrealizowane projekty i sprawdzalne opisy zakresu prac.
3. Wraz z nowymi projektami rozszerzać kategorie filtra Portfolio oraz allowlistę generatora indeksu.
4. Dokończyć kontrolowane czyszczenie pozostałości #55 po decyzjach REVIEW.
5. Przed publikacją wykonać pełny build i adekwatny Playwright przeciw produkcyjnemu preview.
6. Dodanie tworzenia sitemap.xml za pomocą CLI Git-GitBash

## Zasady i ograniczenia
- Domyślnie jedna mała zmiana, jeden rezultat.
- Brak samodzielnych zmian w repo przez agenta; nie uruchamiać MCP Playwright, pełnych audytów, Git push ani deploy bez polecenia.
- Nie zmieniać kierunku wizualnego Home bez wyraźnej decyzji.
- Nie usuwać wyszukiwarki tylko dlatego, że obecnie nie jest publicznie używana.
- Historia Jekylla w old jest oddzielna od klonu projektu #55 zachowanego lokalnie przez autora.
Kwestie otwarte
- Czy Kontakt ma zawierać formularz, czy na razie wyłącznie mailto:?
- Czy dane większych realizacji przenieść do projects.json przed dodaniem kolejnych case studies?
