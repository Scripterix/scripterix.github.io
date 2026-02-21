---
lang: pl
title: "Jekyll Scripterix website – rozbudowa"
date: 2025-10-03
hours_spent: 15
cumulative_hours: 15
phase: before deployment
focus_area: "Jekyll + i18n + design + checklist"
mood: "Deep focus"
tags:
  - jekyll
  - i18n
  - liquid
  - automation
  - archive
  - portfolio
resources:
  - name: "Jekyll Documentation"
    url: "https://jekyllrb.com/docs/"
  - name: "Bootstrap 5.3"
    url: "https://getbootstrap.com/"
  - name: "Liquid Template Language"
    url: "https://shopify.github.io/liquid/"
  - name: "Fuse.js Fuzzy Search"
    url: "https://fusejs.io/"
  - name: "GitHub Pages Deploy Action"
    url: "https://github.com/peaceiris/actions-gh-pages"

summary: "15h iteracji: redesign portfolio, eksperymenty z archiwum, tłumaczenia treści, logbook i dokumentacja deploymentu."
---

## Najdłuższa sesja tego miesiąca – kontynuacja budowy architektury Jekyll Scripterix

### 🧭 Refinement portalu portfolio (2h)

- zmiana nagłówków hero: "Portfolio" (EN) oraz "Niektóre projekty z portfolio" (PL)
- reorganizacja sekcji – karty projektów ponad case studies, accordion z logbookiem i timeline
- uproszczenie statystyk (`_data/stats.json`) i synchronizacja etykiet między językami
- usunięcie duplikatów stylów, przygotowanie layoutu pod przyszły filtr

### 🕹️ Eksperymenty UX w archiwum (3h)

- wdrożenie horyzontalnego slidera timeline (przyciski, scroll snapping, keyboard support)
- test modala informacyjnego z sesyjnym zapisem `sessionStorage`
- decyzja o wycofaniu slidera → powrót do prostego grida + refaktoryzacja CSS/JS
- nauka: zachować minimalizm do czasu pełnego projektu UX

### 🌐 Parzystość treści i tłumaczenia (1h)

- dodanie angielskiej wersji wpisu `post-6-start-wyzwanie` (zachowany `translation_id`)
- przegląd wszystkich postów – startowe nagłówki obniżone do `##`, brak konfliktu z layoutem
- aktualizacja stylu headingów w logbookach (`**…**` → `### …`)

### 📓 Logbook + dokumentacja (0.5h)

- niniejszy wpis logbooka + rewizja wcześniejszych sekcji
- aktualizacja `_drafts/README-einstein.md` (formatowanie markdown)
- uporządkowanie zasobów w `_data` i `_works`

### 🚀 QA & build pipeline (0.5h)

- wielokrotne `bundle exec jekyll build` po każdej iteracji
- weryfikacja błędów Liquid / Markdown – czyste raporty
- notatki do przyszłego CI (GitHub Actions + screenshot generator)

## Rezultaty

- portfolio gotowe do rozbudowy filtrów + spójne copy
- archiwum oczyszczone z tymczasowych eksperymentów, zachowane wnioski
- komplet par tłumaczeń dla ostatnich postów + poprawna typografia
- logbook i dokumentacja odświeżone (Einstein guide)

## Architektura aktualizacji

```text
Jekyll Site (2025-10-07)
├── _includes/portfolio-page.html   # układ kart, accordion case studies
├── _posts/2024-10-12-*.md          # post EN/PL z translation_id
├── _logbook/2025-10-07-*.md        # bieżąca sesja challenge10k
├── _data/stats.json                # dane hero portfolio
├── assets/js/portfolio-filter.js   # logika fetch + rendering kart
└── archive/index.markdown          # timeline, wyszukiwarka, UX eksperymenty
```

## Linki powiązane

- 🔗 [Challenge10k Dashboard](/challenge10k/)
- 🗂️ [Portfolio](/works/)
- 📚 [README Einstein (draft)](/_drafts/README-einstein.md)
- 🧪 [Archiwum z wyszukiwarką](/archive/)

## Wnioski

1. UX eksperymenty trzeba etapować – slider/toast najlepiej w osobnej gałęzi.
2. Spójne `translation_id` przyspiesza tworzenie par EN/PL i statystyk.
3. Markdown lint pomaga utrzymać dokumenty w ryzach (nagłówki, listy, code fence).
4. Proste `bundle exec jekyll build` w roli smoke testu wyłapuje regresje natychmiast.
5. Dokumentacja (README) musi rosnąć wraz z architekturą – inaczej tracimy kontekst.

## Metryki

- czas builda: **0,8 s** (średnia po refaktorach)
- wielkość `_site`: **~86 KB** assets po czyszczeniu stylów
- logbook entries: **5** (PL) / **5** (EN) z aktualnymi `translation_id`
- portfolio works: **5** aktywnych kart (EN/PL wspólne)

**Next:** Automatyzacja GitHub Actions (build + deploy) oraz generator miniatur dla projektów.


