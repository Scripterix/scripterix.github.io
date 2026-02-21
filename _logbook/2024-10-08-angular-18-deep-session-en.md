---
lang: en
title: "Angular 18 + Fundamentals – Deep Session"
date: 2024-10-08
hours_spent: 4
cumulative_hours: 4
phase: acceleration
focus_area: "Angular 18 + modern patterns"
mood: "Productivity"
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
  - title: "Post #4 – Angular Fundamentals + Practice"
    url: "/2024/10/10/angular-basics-en.html"
    lang: en
  - title: "Post #4 – Angular Podstawy + Praktyka"
    url: "/2024/10/10/angular-podstawy-pl.html"
    lang: pl
summary: "Four-hour session on Angular 18: Signals, Standalone Components, and refactoring an older project to modern patterns."
---

Intensive session with Angular 18 — from theory to practice. I focused on three key areas:

## 🧠 Angular Signals (2h)
- Rewrote the DevLogger app state from RxJS to Signals
- Tested reactivity without `OnPush` change detection
- Compared performance with the previous version

**Key finding:** Signals drastically simplify state management for small/medium apps.

## 🧩 Standalone Components (1h)
- Refactored main components — removed NgModule
- Experimented with tree-shaking and bundle size
- New folder structure without `app.module.ts`

## 🔥 Firebase Integration (1h)
- Updated AngularFire to the latest version
- Tested new Firestore composables
- Added offline persistence

## Results
- **DevLogger v2** ready for deployment
- **Post #4** (Angular Fundamentals) — draft + research completed
- Repository on GitHub updated

## Related links
- 📝 [Angular Fundamentals + Practice (EN)](/2024/10/10/angular-basics-en.html)
- 📝 [Angular Podstawy + Praktyka (PL)](/2024/10/10/angular-podstawy-pl.html)
- 🔗 [DevLogger Live Demo](https://scripterix.github.io/)

**Next:** Experiment with Zoneless Change Detection + record a screencast for YouTube.
