# Scripterix GitHub Pages

Strona budowana w Jekyllu na potrzeby dokumentowania wyzwania 10 000 godzin programowania.

## Struktura językowa

- Polski jest językiem domyślnym (`default_lang: pl`).
- Każdy wpis, strona i element portfolio ma parę pl/en i wspólny `translation_id`.
- Przełącznik języka wyszukuje odpowiadający dokument na podstawie `translation_id`.
- Tłumaczenia interfejsu znajdują się w pliku `_data/translations.yml` — bez zewnętrznych wtyczek.

## Kluczowe katalogi

- `_posts` – artykuły w parach `*-pl.md` / `*-en.md`.
- `_logbook` – wpisy logbooka (domyślnie PL, można dodawać EN z własnym `translation_id`).
- `_works` – elementy portfolio w układzie lustrzanym z sufiksami `-pl` / `-en`.
- `about-*.markdown`, `portfolio-*.markdown`, `archive-*.markdown`, `challenge10k-*.markdown` – główne strony statyczne.

## Budowanie lokalne

```bash
bundle install # może wymagać alternatywnej wersji Bundlera przy braku dostępu do rubygems
bundle exec jekyll serve
```

> Uwaga: środowisko GitHub Pages automatycznie obsługuje tylko whitelistingowane wtyczki, dlatego używamy wyłącznie `jekyll-paginate`.

## Planowane ulepszenia

- Dodać angielskie odpowiedniki dla wpisów logbooka i `works`, aby przełącznik języka działał pełniej.
- Rozbudować `challenge10k` o wykres słupkowy miesięcznych godzin (możliwe z wykorzystaniem Chart.js lub lekkiego SVG).
- Przygotować pliki JSON (w `assets/data/`) tak, aby eksportowały również zliczenia godzin i informacje o parach tłumaczeń.
- Uzupełnić metadane SEO (`og:` i `twitter:`) po ustaleniu finalnych tekstów w obu językach.
