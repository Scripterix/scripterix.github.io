---
lang: pl
title: "Timeline archiwum – redesign"
date: 2025-10-25
translation_id: archive-timeline-refresh
hours_spent: 2
cumulative_hours: 8
phase: acceleration
focus_area: "Archiwum + timeline + dokumentacja"
mood: "Flow"
tags:
  - jekyll
  - bootstrap
  - archive
resources:
  - name: "Bootstrap Documentation"
    url: "https://getbootstrap.com/docs/5.3/components/buttons/"
  - name: "Jekyll Collections"
    url: "https://jekyllrb.com/docs/collections/"
summary: "Dwie godziny pracy nad nową osią czasu – od struktury danych, przez layout roczników, po link w stopce."
---

## ✅ Co zostało zrobione

- Ułożyłem dane `_data/timeline_years.yml` i dodałem daty do wpisów portfolio, żeby móc sortować posty, logbook i projekty razem.
- Zastąpiłem listę na stronie archiwum responsywną osią czasu z badge'ami lat i podglądem wpisów.
- Przygotowałem layout `archive-year` oraz strony rocznikowe (PL/EN) z filtrami wpisów.
- Dodałem nową kolumnę w stopce z linkiem do changelogu i poprawiłem tłumaczenia.

## 🧠 Najważniejsze obserwacje

- Liquid dobrze radzi sobie z agregacją danych, ale wymaga ostrożnego liczenia timestampów – warto trzymać daty w jednolitej postaci.
- Osobny layout dla roczników pozwoli później dodać wyszukiwarkę lub statystyki bez łatania głównej strony.

## 🔭 Następne kroki

1. Dodać filtry tagów/typów na stronach rocznikowych.
2. Podłączyć testy wizualne dla nowych layoutów.
3. Rozważyć generowanie stron rocznikowych z danych zamiast ręcznych plików.

