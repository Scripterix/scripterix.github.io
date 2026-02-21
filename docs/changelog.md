---
layout: page
lang: pl
translation_id: changelog
title: "Changelog"
permalink: /docs/changelog/
hero_theme: slate
hero_badge: "Dokumentacja"
hero_title: "Historia zmian"
hero_lead: "Najważniejsze iteracje i poprawki w projekcie Scripterix."
---

> Aktualizacja changelogu przy każdej większej zmianie na stronie.

### 2025-11-01  Tłumaczenia archiwum i porządkowanie dokumentacji
- Naprawiono kodowanie polskich znaków w changelogu i dokumentacji (`docs/docs.md`).
- Nadano unikalne `translation_id` wszystkim rocznikom archiwum (PL/EN), by przełącznik języka prowadził do odpowiedniego roku.
- Ujednolicono dane w `_data/timeline_years.yml`, aby opisy odznak osi czasu były spójne w obu językach.
- Zmieniono format dat na ISO (`YYYY-MM-DD`) we wszystkich plikach dokumentacji i metadanych.

### 2025-10-25  Archive timeline redesign & footer docs link
- Przebudowano stronę archiwum: odznaki lat prowadzą bezpośrednio do stron rocznikowych zamiast listy wpisów.
- Dodano `_data/timeline_years.yml`, layout `archive-year` oraz strony rocznikowe (PL/EN) dla lat 2009, 2018, 2020, 2022 i 2024.
- Uzupełniono wpisy portfolio o pole `date`, aby można je było sortować w osi czasu wspólnie z postami i logbookiem.
- Rozszerzono stopkę o sekcję dokumentacji z linkiem do changelogu.
- Zaktualizowano style (`assets/css/main.css`) i include, aby wspierały nowe odznaki i widok rocznikowy.
- Dodano dzisiejsze wpisy logbooka (PL/EN) dokumentujące prace nad przebudową archiwum.

### 2025-10-25 – Challenge10k hours clarification & new translations
- Dodano polski odpowiednik wpisu "Next-Gen Creativity" (`_posts/2024-10-12-next-gen-creativity.md`).
- Dodano angielski wariant "Mój Gist" (`_posts/2024-10-12-moj-gist-en.md`) oraz lustrzaną wersję EN wpisu "Calculator Math Func OOP" (`_posts/2024-10-14-function-oop-calculator-en.md`).
- Uzupełniono `docs/docs.md` o opis pól `hours_spent`, `cumulative_hours` i `writing_hours` w kontekście wyzwania 10 000 godzin.
- Zweryfikowano konfigurację Challenge10k: licznik celu korzysta tylko z `hours_spent` w logbooku, `writing_hours` pozostają metadanymi pomocniczymi.

### 2025-10-23 – Navigation & Hero polish
- Potwierdzono zakres prac zgodnie z zasadą "zero pluginów" — tylko Liquid, HTML i Bootstrap.
- Usprawniono dropdown językowy (stan aktywny + micro-copy) i tooltipy w nawigacji (`title`/`aria-label`).
- Ujednolicono przyciski CTA w sekcjach hero na stronach: index, challenge10k, portfolio, archive, about.
- RSS link pozostaje w backlogu.

### 2025-10-23 – About page rewrite
- Zaktualizowano biogram (PL/EN) bez HTML — treści przeniesione do `_data/translations.yml`.
- Usunięto odniesienia do OpenGateWeb, podkreślono bieżące projekty Scripterix i klientów.

### 2024-10-30 – Changelog inicjalny
- Dodano plik `docs/changelog.md` z podstawową strukturą i udostępniono link w stopce.
- Opisano cel changelogu: aktualizacja przy każdej większej zmianie lub dodaniu treści.
- Dodano nowe wpisy POST: *Next-Gen Creativity* (EN/PL), *Mój Gist* (PL/EN), *Calculator Function vs OOP* (PL/EN).
- Poprawiono drobne błędy w istniejących postach i naprawiono polskie litery w przycisku kart "Otwórz".
