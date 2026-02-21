---
lang: en
title: "Jekyll Scripterix website – expansion"
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

summary: "15h of iterations: portfolio redesign, archive experiments, content translations, logbook and deployment documentation."
---

## Longest session this month — continued work on the Jekyll Scripterix architecture

### 🧭 Portfolio portal refinement (2h)

- Updated hero headings: "Portfolio" (EN) and "Some portfolio projects" (PL)
- Reorganized sections – project cards over case studies, accordion with logbook and timeline
- Simplified stats (`_data/stats.json`) and synchronized labels between languages
- Removed duplicate styles; prepared layout for future filters

### 🕹️ Archive UX experiments (3h)

- Implemented a horizontal timeline slider (controls, scroll snapping, keyboard support)
- Tested an informational modal with session `sessionStorage`
- Decided to remove the slider → reverted to a simple grid + CSS/JS refactor
- Lesson: keep experiments minimal until UX is finalized

### 🌐 Content parity and translations (1h)

- Added English version of the `post-6-start-wyzwanie` entry (translation_id preserved)
- Reviewed posts – normalized headings to `##` to avoid layout conflicts
- Updated heading styles in logbooks (`**…**` → `### …`)

### 📓 Logbook & documentation (0.5h)

- Created this logbook entry + reviewed earlier sections
- Updated `_drafts/README-einstein.md` (markdown formatting)
- Cleaned resources in `_data` and `_works`

### 🚀 QA & build pipeline (0.5h)

- Repeated `bundle exec jekyll build` after each iteration
- Verified no Liquid / Markdown errors – clean reports
- Notes for future CI (GitHub Actions + screenshot generator)

## Results

- Portfolio ready for filter expansion + consistent copy
- Archive cleaned of temporary experiments; findings preserved
- Complete pairs of translations for recent posts + typography fixes
- Logbook and documentation refreshed (Einstein guide)

## Architecture update

```
Jekyll Site (2025-10-07)
├── _includes/portfolio-page.html   # cards layout, accordion case studies
├── _posts/2024-10-12-*.md          # post EN/PL with translation_id
├── _logbook/2025-10-07-*.md        # current Challenge10k session
├── _data/stats.json                # hero data
├── assets/js/portfolio-filter.js   # fetch + rendering logic for cards
└── archive/index.markdown          # timeline, search, UX experiments
```

## Conclusions

1. UX experiments should be phased — slider/toast belong in a separate branch.
2. Consistent `translation_id` speeds up creating EN/PL pairs and stats.
3. Markdown lint keeps documents tidy (headings, lists, code fences).
4. Simple `bundle exec jekyll build` as a smoke test catches regressions fast.
5. Documentation (README) should grow with architecture to avoid losing context.

## Metrics

- build time: **0.8 s** (average after refactors)
- `_site` size: **~86 KB** assets after style cleanup
- logbook entries: **5** (PL) / **5** (EN) with current `translation_id`
- portfolio works: **5** active cards (shared EN/PL)

**Next:** GitHub Actions automation (build + deploy) and thumbnail generator for projects.
