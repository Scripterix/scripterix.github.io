# Scripterix Studio — Home i następne strony

## Kierunek wdrożony w Home

Niezależny developer: naprawiam kod, buduję aplikacje, automatyzuję procesy i rozwijam własne narzędzia. Pierwsza osoba liczby pojedynczej. AI jest elementem warsztatu, połączonym z kontrolą kodu i testami.

Hero: „Naprawiam kod. Automatyzuję pracę. Buduję aplikacje.”

Trzy obszary: Development, Automation, AI Engineering. Jasne papierowe tło, siatka, mocna typografia, akcenty mint / coral / amber i ciemna sekcja LAB nawiązują do Agentic Studio.

## Zweryfikowane materiały

| Materiał | Status na Home | Dowód lokalny |
| --- | --- | --- |
| Agentic Studio | Projekt własny | Działające Vite MPA, kod TypeScript, `data/`, `pages/`, testy i screenshot `assets/img/prntScreen/1/desktop.png` |
| Wyszukiwarka z kontekstem | Demonstrator, część Agentic Studio | `assets/js/site.js`, `data/search-index.json`, `pages/search-result.html` |
| Mikrointerakcje | Demonstrator, część Agentic Studio | `pages/mikrointerakcje.html`, filtry i wspólne style |
| LAB-001: walidator danych dostawców | Hipoteza, przed prototypem | Notatki `studio/think-tank/pierwszy-trop.md`; w tym projekcie brak implementacji |
| Book Tracker, ShelfStack, Product Inventory | Bez kart na Home | W tym projekcie znaleziono opisy w propozycjach treści, bez kodu i działających wersji tych aplikacji |

Zdjęcie kodu pochodzi z dostarczonego `studio/use-img/pexels-captrodcocker-33607952.jpg`. Zmniejszona kopia do WWW: `assets/img/studio-code.jpg` (1200 × 800). Pozostałe zdjęcia są inspiracjami, nie zdjęciami autora ani jego realizacji.

Kontakt podany przez autora: `Piotr.adamkowski@gmail.com`. Link do kodu prowadzi do zweryfikowanego publicznego profilu `https://github.com/Scripterix`.

## Nawigacja

Start → Kompetencje → Projekty → LAB → Współpraca → Kontakt.

Wszystkie pozycje prowadzą do istniejących sekcji Home. Dziewięć wcześniejszych podstron projektu #55 pozostaje w źródłach, ale nie jest częścią publicznej nawigacji ani produkcyjnego buildu. Wspólna nawigacja korzysta z `data/site.json`; ten sam JSON jest importowany jako fallback w TypeScript.

Wyszukiwarka i tagowanie lokalne pozostają zachowane wyłącznie jako historyczny kod projektu #55. Home skupia się na ofercie, projektach i kontakcie.

## Propozycje kolejnych stron — do osobnej realizacji

1. **Projekty / case studies** — problem, mój zakres, rozwiązanie, screenshoty, repozytorium lub demo, rezultat. Najpierw pełne case study Agentic Studio; kolejne karty po weryfikacji materiałów.
2. **Development i automatyzacje** — przykłady zastosowań, wymagane dane wejściowe, sposób ustalania zakresu i kryteria odbioru. Bez deklarowania niepotwierdzonych specjalizacji platformowych.
3. **Scripterix LAB** — rejestr problemów, hipotez i eksperymentów, z widocznym statusem: pomysł / demonstrator / narzędzie dostępne. Pierwszy kandydat: LAB-001.
4. **Warsztat** — docelowy indeks materiałów o procesie, testach i architekturze. Ułatwi późniejsze uporządkowanie historycznych podstron.

Te strony nie zostały utworzone; menu nie zawiera odnośników do nieistniejących adresów.

## Lokalne sprawdzanie

- `npm run dev` — podgląd na `http://127.0.0.1:4173/`.
- `npm run typecheck` i `npm run build` — TypeScript i produkcyjne MPA.
- `npm run test:visual` — funkcje i screenshoty desktop / mobile, w tym wcześniejsze podstrony.
- `npm run review:home` — dodatkowa kontrola 1440, 1024, 768, 390 i 320 px, błędów JavaScript, obrazów oraz trzywierszowego hero. Zapis do `artifacts/home/`.
- `npm run review:home -- http://127.0.0.1:4174/` — ten sam przegląd na innym lokalnym serwerze, np. podglądzie buildu.

Przy zmianach strategii pierwszeństwo mają bieżące ustalenia autora. `AGENTS.md` można później przygotować jako krótki drogowskaz do materiałów `studio/` i technicznych reguł projektu.
