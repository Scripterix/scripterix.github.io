---
lang: pl
title: "Angular 18 + fundamentals – głęboka sesja"
date: 2024-10-08
hours_spent: 4
cumulative_hours: 4
phase: acceleration
focus_area: "Angular 18 + nowoczesne wzorce"
mood: "Produktywność"
tags:
  - angular
  - signals
  - standalone-components
  - typescript
resources:
  - name: "Angular 18 Official Docs"
    url: "https://angular.dev/"
  - name: "Traversy Media - Angular Front To Back"
    url: "https://www.traversymedia.com/"
  - name: "DevLogger Demo"
    url: "https://scripterix.github.io/"
related_posts:
  - title: "Post #4 – Angular Podstawy + Praktyka"
    url: "/2024/10/10/angular-podstawy-pl.html"
    lang: pl
  - title: "Post #4 – Angular Fundamentals + Practice"
    url: "/2024/10/10/angular-basics-en.html"
    lang: en
summary: "Czterogodzinna sesja na Angular 18: Signals, Standalone Components i refaktor starszego projektu na nowoczesne wzorce."
---

Intensywna sesja z Angular 18 – od teorii do praktyki. Skupiłem się na trzech kluczowych obszarach:

## 🧠 Angular Signals (2h)
- Przepisałem stan aplikacji DevLogger z RxJS na Signals
- Testowałem reaktywność bez `OnPush` change detection
- Porównałem wydajność z poprzednią wersją

**Kluczowe odkrycie:** Signals drastycznie upraszczają zarządzanie stanem w małych/średnich aplikacjach.

## 🧩 Standalone Components (1h)
- Refaktor głównych komponentów – usunięcie NgModule
- Eksperymenty z tree-shaking i bundle size
- Nowa struktura folderów bez `app.module.ts`

## 🔥 Firebase Integration (1h)
- Aktualizacja AngularFire do najnowszej wersji
- Testowanie nowych Firestore kompozables
- Dodanie offline persistence

## Rezultaty
- **DevLogger v2** gotowy do wdrożenia
- **Post #4** (Angular Fundamentals) – szkic + research ukończony
- Repozytorium na GitHub zaktualizowane

## Linki powiązane
- 📝 [Angular Podstawy + Praktyka (PL)](/2024/10/10/angular-podstawy-pl.html)
- 📝 [Angular Fundamentals + Practice (EN)](/2024/10/10/angular-basics-en.html)
- 🔗 [DevLogger Live Demo](https://scripterix.github.io/)

**Next:** Eksperyment z Zoneless Change Detection + screencast dla YouTube.