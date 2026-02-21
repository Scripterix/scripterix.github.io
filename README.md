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

## Szybkie dodawanie treści

Nowe wpisy można generować szablonem:

```bash
npm run new:post -- --title "Tytul wpisu" --lang pl --slug tytul-wpisu
npm run new:log -- --title "Dzien nauki" --lang pl --slug dzien-nauki
npm run new:work -- --title "Nazwa projektu" --lang pl --slug nazwa-projektu
```

Opcjonalne flagi:
- `--date YYYY-MM-DD`
- `--translation-id custom-id`
- `--force` (nadpisanie istniejącego pliku)

## Deployment

- Repo zawiera tylko zrodla Jekyll (bez commitowania `_site`).
- Publikacja odbywa sie przez GitHub Actions (`.github/workflows/pages.yml`).
- W `Settings -> Pages` ustaw `Source: GitHub Actions`.

## Planowane ulepszenia

- Dodać angielskie odpowiedniki dla wpisów logbooka i `works`, aby przełącznik języka działał pełniej.
- Rozbudować `challenge10k` o wykres słupkowy miesięcznych godzin (możliwe z wykorzystaniem Chart.js lub lekkiego SVG).
- Przygotować pliki JSON (w `assets/data/`) tak, aby eksportowały również zliczenia godzin i informacje o parach tłumaczeń.
- Uzupełnić metadane SEO (`og:` i `twitter:`) po ustaleniu finalnych tekstów w obu językach.


## Notatki deweloperskie (BOM, build, cache)

- Wszystkie pliki `.md` i `.markdown` zapisuj jako czysty UTF-8 bez BOM. Najprosciej uzyc malego skryptu w Pythonie:
  ```powershell
  @'
  from pathlib import Path
  path = Path(''sciezka/do/pliku.md'')
  text = path.read_text(encoding='utf-8-sig')
  path.write_text(text, encoding='utf-8', newline='\n')
  '@ | python -
  ```
  `utf-8-sig` usuwa BOM przy odczycie, a zapis nastepuje juz bez dodatkowych bajtow.
- Jesli edycja w terminalu psuje znaki PL, generuj zawartosc przez Pythona z sekwencjami Unicode:
  ```powershell
  @'
  from pathlib import Path
  content = "Wsp\u00f3lna o\u015b czasu"
  Path('sciezka/do/pliku.md').write_text(content, encoding='utf-8', newline='\n')
  '@ | python -
  ```
  Po zapisie uruchom `rg -n '\?' sciezka/do/pliku.md`, aby upewnic sie, ze nie zostaly zadne utracone znaki.
- Build wywoluj w katalogu `scripterix.github.io`, a wynik publikuj np. `bundle exec jekyll build --destination ../scripterix-remote`. W katalogu z buildem nie wprowadzaj recznych zmian.
- `.jekyll-cache/` przyspiesza kolejne buildy, ale w razie problemow mozna go bezpiecznie usunac (`bundle exec jekyll clean` czysci tez `_site`).
