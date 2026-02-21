---
lang: pl
title: "Modyfikacje GH Pages i Local Scripterix - logbook"
date: 2026-02-21
translation_id: gh-pages-local-scripterix-mods-2026-02-21
hours_spent: 1
cumulative_hours:
phase: before deployment
focus_area: "GH Pages, Jekyll, Local Development"
mood: "Skupienie i porzadkowanie"
tags:
  - learning
  - jekyll
  - github-pages
  - github-actions
  - workflow
summary: "1h porzadkow: migracja na source-first Jekyll, deploy przez GitHub Actions, poprawa kodowania PL i ustalenie nowego workflow pracy lokalnej."
---

## Co zostalo zrobione

- Potwierdzono migracje repo na model source-first (bez recznego trzymania statycznego builda).
- Wdrozono automatyczny deploy przez GitHub Actions po pushu na `main`.
- Usunieto robocza galaz migracyjna po zakonczonym merge.
- Poprawiono bledne kodowanie polskich znakow na stronie glownej (hero, sekcja feature, CTA).
- Zweryfikowano, ze strona publiczna po deployu pokazuje poprawne polskie znaki.

## Efekt

- Lokalna praca odbywa sie w katalogu `scripterix-clean`.
- Aktualizacja tresci to: edycja/pliki -> commit -> push -> automatyczny build i deploy na Pages.
- Dodawanie nowych wpisow logbook jest zautomatyzowane przez generator skryptu.

## Notatka operacyjna

Nowe wpisy tworz jako pary jezykowe (PL + EN) ze wspolnym `translation_id`, zeby przelacznik jezyka prowadzil do odpowiedniego wpisu.
