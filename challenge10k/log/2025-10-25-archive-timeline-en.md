---
lang: en
title: "Archive timeline redesign"
date: 2025-10-25
translation_id: archive-timeline-refresh
hours_spent: 2
cumulative_hours: 8
phase: acceleration
focus_area: "Archive timeline + documentation"
mood: "In the zone"
tags:
  - jekyll
  - bootstrap
  - archive
resources:
  - name: "Bootstrap Documentation"
    url: "https://getbootstrap.com/docs/5.3/components/buttons/"
  - name: "Jekyll Collections"
    url: "https://jekyllrb.com/docs/collections/"
summary: "Two focused hours to rebuild the archive timeline, wire the year layouts, and surface the changelog in the footer."
---

## ✅ Completed

- Structured _data/timeline_years.yml and added date metadata to portfolio entries so posts, logbook sessions, and works sort together.
- Replaced the archive list with a responsive timeline showing yearly badges, entry previews, and quick stats.
- Created the `archive-year` layout plus PL/EN yearly pages that reuse the new filtering logic.
- Added a documentation column in the footer with a changelog link and refreshed i18n strings.

## 🧠 Notes & learnings

- Liquid handles date comparisons well as long as everything is normalized to timestamps.
- Keeping yearly pages on a dedicated layout will make future filtering (tags, types) much easier.

## 🔭 Next steps

1. Add tag/type filters on each yearly archive page.
2. Hook up visual regression tests for the new timeline track.
3. Consider auto-generating yearly pages from data instead of static files.

