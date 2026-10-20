# Agentic Brief

> **Status: ARCHIVE.** Ten dokument opisuje historyczny projekt #55 i nie jest
> aktualną specyfikacją Scripterix Studio. Bieżące decyzje migracyjne są w
> `studio/migration-audit.md`, a zasady marki w `studio/gpt-promts/`.

## Cel
Rozwijać statyczny showcase Codex v5.5 jako mały, iteracyjny system prezentacyjny: UI, dane, wyszukiwarka, lokalne tagi, testy Playwright, dokumentacja i późniejszy deploy.

Projekt ma pokazywać praktycznie, że Codex potrafi pracować agentowo: rozumieć kontekst, edytować wiele plików, utrzymywać styl, testować wynik i poprawiać błędy bez rozbijania istniejącej struktury.

## Zrobione

### Struktura strony
- `index.html` działa jako hub prezentacji.
- Podstrony tematyczne są w `pages/`.
- Nawigacja i karty startowe są sterowane przez `data/site.json`.
- Wspólny skrypt `assets/js/site.js` renderuje nav, karty, filtry, search i lokalne tagi.
- Wspólne style są w `assets/css/site.css`.
- Projekt działa przez Vite na `http://127.0.0.1:4173`.

### Nawigacja i podstrony
- Menu jest renderowane z JSON.
- `Iteracje` ma dropdown:
  - `Proces iteracji`
  - `Alpine.js`
  - `Vite`
  - `Search Fuse`
  - `Wyniki search`
- Dodano osobną podstronę `pages/alpine-js.html`.
- Dodano osobną podstronę `pages/vite.html`, podpiętą jako mniejszy techniczny krok w dropdownie `Iteracje`.
- Aktywny stan działa także dla dzieci dropdownu.
- Globalny przycisk search jest w nav.
- Na mobile search ma osobny przycisk obok hamburgera.

### Alpine.js / lokalne tagi
- Dodano funkcję lokalnego tagowania stron bez logowania i bez backendu.
- Panel `Moje tagi strony` jest wstrzykiwany do hero każdej strony.
- Tagi zapisują się w `localStorage` pod kluczem `codex:v55:page-tags`.
- Każdy użytkownik po `git clone` zaczyna z pustą lokalną bazą tagów i tworzy własne oznaczenia w swojej przeglądarce.
- Tagi można:
  - dodać ręcznie,
  - dodać z szybkich propozycji,
  - usunąć z poziomu chipu.
- Search rozszerza indeks runtime o lokalne tagi użytkownika.
- Wyniki search pokazują lokalne tagi jako osobne zielone chipy z ikoną taga.

### Wyszukiwarka
- Jest dokumentacyjna podstrona `pages/search-fuse.html`.
- Jest dynamiczny widok wyników `pages/search-result.html`.
- Jest indeks `data/search-index.json` mapujący strony na `topics`, `description`, `content`, `slug` i `href`.
- Jest globalny modal search uruchamiany z nav.
- Modal obsługuje:
  - input `name search...`
  - tryb `Topics`
  - tryb `Context`
  - licznik wyników
  - pierwsze 5 wyników
  - link do pełnej strony wyników
  - zamknięcie przez `X`, backdrop i `Escape`
- Wyszukiwanie działa dziś bez Fuse.js, przez lokalne filtrowanie indeksu i tagów użytkownika.
- Fuse.js można dodać później, gdy będzie realna potrzeba fuzzy scoringu.

### Wizualia i UI
- Są lokalne bitmapy w `assets/img/`.
- Strona główna i `Wizualia` używają lokalnych assetów.
- Dodano nowe grafiki kierunków:
  - `assets/img/alpine-js.png`
  - `assets/img/vite.png`
  - `assets/img/fuzze-search.png`
- `fuzze-search.png` jest podpięty do istniejącej strony `Search Fuse`.
- UI utrzymuje stały język: 8 px radius, spokojne panele, grid background, ciemny brand mark, Bootstrap Icons.

### Testy
- `tests/visual.spec.js` sprawdza:
  - render nav i treści na wszystkich stronach,
  - dropdown Iteracje,
  - karty z JSON na stronie głównej,
  - search result topics,
  - search result context,
  - globalny modal search,
  - lokalne tagi i wyszukiwanie po prywatnym tagu,
  - ładowanie assetów,
  - filtr mikrointerakcji.
- Testy działają dla desktop i mobile przez `playwright.config.js`.
- Ostatni stan weryfikacji: `npm.cmd run test:visual` -> `34 passed`.

### Dokumenty kontekstowe
- `docs/context.txt` opisuje oficjalny kontekst GPT-5.5 i agentowego wykonywania pracy.
- `docs/codex-55-mozliwosci.md` zbiera praktyczne capability Codex/GPT-5.5.
- `docs/opis-55.md` opisuje zmianę workflow dev: plan, change, test, report.
- `docs/gh-actions.md` proponuje CI/CD i GitHub Pages.
- `docs/automatic-loop.md` proponuje automatyczny agent loop, ale to jest jeszcze materiał do decyzji, nie kierunek wdrożony.

## Stabilne Punkty Edycji
- `data-agent-root="codex-v55-showcase"`
- `data-agent-section="navigation"`
- `data-agent-section="hero"`
- `data-agent-section="page-hero"`
- `data-agent-section="capabilities"`
- `data-agent-section="agentic-mode"`
- `data-agent-section="search-results"`
- `data-agent-section="footer"`
- `data-nav-target`
- `data-page-grid`
- `data-filter-card`
- `data-search-open`
- `data-global-search-modal`
- `data-search-results`
- `data-page-tags`
- `data-page-tags-list`
- `data-page-tags-form`
- `data-agent-card="page-tags"`
- `data-agent-card="hero-visual-asset"`
- `data-agent-card="visual-system-asset"`
- `data-agent-card="alpine-asset"`
- `data-agent-card="vite-asset"`
- `data-agent-card="fuse-search-asset"`

## Zasady Kolejnych Iteracji
- Najpierw określ, która sekcja albo warstwa jest zmieniana: treść, dane, nav, search, tagi, CSS, testy, deploy.
- Nie przebudowuj globalnych tokenów CSS bez mocnego powodu.
- Nowe pozycje menu dodawaj w `data/site.json`.
- Nowe wpisy wyszukiwania dodawaj w `data/search-index.json`.
- Dla nowych elementów dodawaj `data-agent-card` albo `data-agent-slot`.
- Po większej zmianie sprawdź desktop i mobile.
- Assety bitmapowe trzymaj w `assets/img/`.
- Dane użytkownika bez backendu trzymaj lokalnie w `localStorage`.
- Testy powinny rosnąć razem z ryzykiem zmiany.

## Do Zrobienia

### Najbliższe, wysokie ROI
- Przeprojektować układ hero + panel `Moje tagi strony`. Obecny panel działa funkcjonalnie, ale wizualnie nie jest jeszcze dobrze osadzony.
- Rozważyć lepszy layout tagów:
  - kompaktowy pasek pod leadem,
  - boczny panel tylko na desktopie,
  - przycisk `Tagi` otwierający mały popover,
  - zintegrowanie tagów z akcjami hero zamiast dużej karty pod tekstem.
- Uporządkować treści stron wokół realnych możliwości GPT-5.5 zamiast placeholderów.
- Przerobić dokumenty z `docs/` na publiczne sekcje strony albo osobną podstronę dokumentacyjną.
- Dodać lepsze `content` i `topics` do `data/search-index.json`, bo jakość search będzie zależeć głównie od jakości indeksu.
- Dodać przycisk clear `X` w input modalu.
- Rozbudować snippety o podświetlanie dopasowanego fragmentu.

### Alpine / tagi
- Poprawić estetykę i pozycję panelu tagów.
- Dodać widok `Moje tagi` w search, np. szybki filtr tylko po stronach oznaczonych lokalnymi tagami.
- Dodać eksport/import lokalnych tagów jako JSON, jeśli tagi zaczną być istotnym elementem pracy.
- Rozważyć migrację logiki tagów do osobnego modułu, jeśli `site.js` urośnie za bardzo.

### Search
- Dodać debounce do modalu search, jeśli indeks urośnie.
- Dodać test pustego wyniku.
- Dodać test kliknięcia wyniku z modalu i przejścia na podstronę.
- Rozważyć Fuse.js, gdy będzie więcej wpisów i potrzebne będzie fuzzy matching lub scoring.

### Testy i jakość
- Dodać screenshot tests dla 390 px i 1440 px.
- Dodać test layoutu panelu tagów po przeprojektowaniu hero.
- Sprawdzać, czy nowe panele nie nachodzą na tekst i nie rozpychają hero na mobile.

### Oczy z PrintScreens
Cel: domknąć brakującą warstwę percepcji wizualnej. Obecny workflow mówi głównie “działa”, ale jeszcze nie mówi wystarczająco dobrze “dobrze wygląda”.

Plan następnej warstwy:
- dodać osobny test `tests/screenshots.spec.js`,
- dodać skrypt w `package.json`, np. `test:screens`,
- robić screenshoty kluczowych stron w desktop `1440x1000` i mobile `390x844`,
- zapisywać zrzuty do przewidywalnego folderu, np. `test-results/screenshots/`,
- otwierać screenshoty po zmianach UI i oceniać layout przed finalnym raportem.

Pierwszy zestaw screenshotów:
- `/index.html`,
- `/pages/alpine-js.html`,
- `/pages/search-fuse.html`,
- `/pages/vite.html`,
- `/pages/search-result.html?q=tag&mode=topics`.

Co oceniać na screenshotach:
- hero height,
- spacing,
- czytelność CTA,
- pozycję panelu tagów,
- kartę tagów na home,
- mobile overflow,
- overlap elementów,
- stabilność siatki,
- spójność visual language.

Docelowy loop:
1. `PLAN` - człowiek wybiera kierunek, np. “przebuduj hero i tag panel”.
2. `CHANGE` - Codex edytuje HTML, CSS, JS, JSON.
3. `TEST` - Playwright sprawdza funkcje.
4. `SEE` - Playwright robi screenshoty.
5. `REFLECT` - człowiek albo agent ocenia UX, spacing, estetykę i czytelność.
6. `ITERATE` - kolejna poprawka.

To jest naturalny krok w stronę małego AI frontend labu: agent nie tylko zmienia kod i odpala testy, ale dostaje też realny materiał wizualny do oceny skutków pracy.

### GitHub i deploy
- Przygotować GitHub Actions dopiero po ustabilizowaniu treści i struktury.
- Minimalny dobry krok: CI z `npm ci`, `npx playwright install --with-deps`, `npm run test:visual`.
- Deploy na GitHub Pages jest sensowny, ale nie jest pilny przed uporządkowaniem finalnej narracji.

### Dokumentacja dla innych
- Stworzyć `README.md` jako instrukcję użycia tego repo jako startera.
- Opisać wzorzec:
  - `data/site.json` jako menu i karty,
  - `data/search-index.json` jako indeks,
  - `localStorage` jako prywatna baza tagów użytkownika,
  - `data-agent-*` jako kontrakt dla Codex,
  - Playwright jako weryfikacja iteracji.

## Decyzje Otwarte

### Layout tagów
Funkcja jest trafna, ale obecne rozmieszczenie w hero wymaga poprawy. Najbardziej prawdopodobny kierunek to kompaktowy tag bar albo popover uruchamiany przyciskiem z ikoną `bi-tag`, zamiast dużej karty stale zajmującej miejsce pod tekstem hero.

### Fuse.js
Na razie nie jest konieczny. Obecny indeks jest mały i działa lokalne filtrowanie. Fuse.js ma sens, gdy:
- wpisów będzie dużo więcej,
- potrzebne będzie fuzzy matching,
- będziemy ważyć `topics`, `userTags` i `content` różnie,
- wyniki będą sortowane według jakości dopasowania.

### Automatic Loop
Nie wdrażać jeszcze jako pełnej automatyzacji.

Dokument `automatic-loop.md` jest ciekawy koncepcyjnie, ale w obecnym stanie projektu lepszy jest półautomatyczny rytm:
1. człowiek wybiera kierunek,
2. Codex implementuje,
3. Playwright sprawdza,
4. człowiek ocenia smak, sens i priorytet.

Pełny loop `PLAN -> CHANGE -> TEST -> FIX -> REPORT -> NEXT` warto rozważyć dopiero, gdy będą:
- stabilny backlog,
- stabilne testy,
- repo na GitHub,
- jasne zasady commitów,
- mniejsza potrzeba ręcznego dopieszczania UI.

### Podpięcie GPT/API
Nie ma teraz mocnej potrzeby podpinać osobnego GPT przez API. W tej fazie Codex w sesji jest wystarczający, bo:
- ma dostęp do plików,
- może uruchamiać testy,
- może iterować po błędach,
- zachowuje kontekst estetyczny projektu.

API/GPT ma sens później dla:
- generowania `search-index.json` z dokumentów,
- generowania raportów iteracji,
- masowej klasyfikacji topics,
- automatycznego backlogu.

## Kierunek Po Tej Sesji
Najlepszy następny ruch to połączenie poprawy doświadczenia lokalnych tagów z uruchomieniem “oczu” przez screenshot pipeline:
- dodać `tests/screenshots.spec.js`,
- dodać `npm run test:screens`,
- generować printscreeny desktop/mobile dla kluczowych stron,
- przeprojektować hero i rozmieszczenie panelu `Moje tagi strony`,
- zachować funkcję localStorage,
- dopiąć test layoutu desktop/mobile i obejrzeć screenshoty,
- dopiero potem rozbudowywać search o kolejne tryby i Fuse.js.

Projekt ma teraz dobry szkielet i działające prywatne tagi użytkownika. Największa wartość kolejnej iteracji będzie z jakości UI, treści, czytelności flow i realnego feedbacku wizualnego, nie z dodawania kolejnych dużych mechanizmów.
