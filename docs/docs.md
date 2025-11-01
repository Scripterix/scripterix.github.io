# Dokumentacja Projektu Scripterix
Witamy w dokumentacji projektu Scripterix! Ten dokument dostarcza szczegółowych informacji o funkcjach, konfiguracji i najlepszych praktykach dla witryny.

## Spis treści
1. [Wprowadzenie](#wprowadzenie)
2. [Funkcje](#funkcje)
3. [Konfiguracja](#konfiguracja)
4. [Najlepsze praktyki](#najlepsze-praktyki)
5. [Aktualizacje bieżące](#aktualizacje-bieżące)

## Wprowadzenie
Projekt Scripterix ma na celu stworzenie kompleksowego narzędzia do zarządzania i automatyzacji procesów programistycznych. W ramach projektu rozwijane są moduły takie jak Logbook do śledzenia postępów, Changelog do dokumentowania zmian, Docs jako źródło wiedzy, Posts do dzielenia się doświadczeniami oraz Gist do przechowywania i udostępniania fragmentów kodu.

## Funkcje
- **Śledzenie godzin w logbooku**: Każdy wpis kolekcji `_logbook` agreguje się na stronie Challenge10k poprzez pole `hours_spent`. Jekyll sumuje te wartości i odejmuje je od celu `10000 h`, dzięki czemu sekcja statystyk pokazuje bieżący postęp.
- **Pole `cumulative_hours`**: Wartość utrzymywana ręcznie. Służy do prezentacji w nagłówku danego logbooka – aktualizuj ją po doliczeniu nowych godzin do prywatnego licznika.
- **Metadane `writing_hours` w postach**: Wpisy blogowe mogą mieć pole `writing_hours`, jednak obecnie nie wpływa ono na licznik wyzwania. Informacja trafia do `search.json` i może zostać wykorzystana w kolejnych iteracjach (np. automatyczne batchowanie publikacji).
- **Tłumaczenia stron**: Pola `translation_id` łączą lustrzane wersje stron i wpisów w różnych językach. Dzięki temu przełącznik języka w nawigacji prowadzi bezpośrednio do odpowiednika treści.

## Konfiguracja
- Podstawowe ustawienia znajdują się w `_config.yml`. Domyślny język (`default_lang`) to `pl`, a dostępne lokalizacje są definiowane w tablicy `languages`.
- Kolekcja `logbook` korzysta z permalinks `/challenge10k/log/:slug/` i sortuje wpisy malejąco po dacie.
- Zależności front-end (Bootstrap oraz Bootstrap Icons) są ładowane z CDN, co upraszcza wdrożenia na GitHub Pages.

## Najlepsze praktyki
- Używaj wyłącznie funkcji Liquid wspieranych przez GitHub Pages – repozytorium utrzymuje zasadę „zero pluginów”.
- Utrzymuj spójność danych: dodając wpis logbooka lub posta, ustaw `translation_id`, datę, kategorie i tagi.
- Przy modyfikacjach archiwum aktualizuj `_data/timeline_years.yml`, aby odznaki lat zachowały spójne nazwy w obu językach.

## Aktualizacje bieżące
- **2025-11-01**: Uzupełniono `translation_id` dla wszystkich stron rocznikowych (PL/EN) i uporządkowano dane `_data/timeline_years.yml`, co zapewnia poprawne działanie przełącznika języka. Naprawiono również kodowanie polskich znaków w changelogu i dokumentacji.
- **2025-10-25**: Dodano opis działania pól `hours_spent`, `cumulative_hours` i `writing_hours` w kontekście wyzwania 10 000 godzin.