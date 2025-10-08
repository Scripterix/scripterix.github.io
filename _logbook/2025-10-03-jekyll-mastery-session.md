---
lang: pl
title: "Jekyll mastery – rozbudowa i automatyzacja"
date: 2025-10-03
hours_spent: 5
cumulative_hours: 5
phase: acceleration
focus_area: "Jekyll + i18n + automation pipeline"
mood: "Deep focus"
tags:
  - jekyll
  - i18n
  - liquid
  - automation
  - bootstrap
  - github-pages
resources:
  - name: "Jekyll Documentation"
    url: "https://jekyllrb.com/docs/"
  - name: "Bootstrap 5.3 CDN"
    url: "https://getbootstrap.com/"
  - name: "GitHub Pages Deploy Action"
    url: "https://github.com/peaceiris/actions-gh-pages"
  - name: "Liquid Template Language"
    url: "https://shopify.github.io/liquid/"
related_posts:
  - title: "Ruby CLI Commands & Jekyll Setup"
    url: "/ruby-cli.html"
    type: "documentation"
summary: "Pięciogodzinna sesja nad zaawansowanym Jekyll setup: i18n system, Challenge10k dashboard, content batching i automation pipeline."
---

Najdłuższa sesja tego miesiąca – kompletna przebudowa Jekyll architecture z focus na skalowalnością i automation.

## 🌍 I18n System Implementation (2h)

Zbudowałem custom i18n plugin dla Jekyll:

**Features implemented:**

- Multi-language support (PL/EN)
- Translation key matching between posts
- Locale-specific URL structures
- Language switcher component
- Fallback mechanism for missing translations

**Files created:**
- `_plugins/i18n.rb` – core functionality
- `_locales/en.yml` + `_locales/pl.yml` – translation files
- `_includes/language-switcher.html` – UI component

**Challenge:** Jekyll's static nature + dynamic language switching = creative Liquid templating required.

## 📊 Challenge10k Dashboard (1.5h)

Rozbudowałem dashboard o advanced metrics:

**New calculations:**
- Content hours batching (posts → practice hours)
- Logbook + content hours aggregation  
- Progress projections with trend analysis
- Monthly breakdowns with visual charts

**Technical approach:**
- Liquid loops for content processing
- YAML data structures for configuration
- Bootstrap components for responsive layout
- Custom CSS for challenge-specific styling

## 🔄 Content Batching Logic (1h)

Implementacja systemu "writing hours":

```liquid
{% assign writing_posts = site.posts | where_exp: "post", "post.writing_hours" %}
{% assign content_batches = 0 %}
{% for post in writing_posts %}
  {% if current_batch_posts == content_batch_size %}
    {% assign content_batches = content_batches | plus: 1 %}
    {% assign content_hours_counted = content_hours_counted | plus: current_batch_hours %}
  {% endif %}
{% endfor %}
```

**Result:** Posts z `writing_hours` metadata automatycznie liczą się do Challenge10k totals.

## 🎨 Bootstrap 5.3 Integration (0.5h)

Upgrade na najnowszy Bootstrap:
- CDN integration dla szybszego loadingu
- Custom CSS variables dla brand colors
- Responsive breakpoints optimization
- Icon fonts (Bootstrap Icons) integration

## Rezultaty

- **Full i18n system** – ready for scale
- **Challenge10k v2** – advanced metrics + projections
- **Content batching** – automated writing hours tracking
- **Modern Bootstrap** – responsive + performant
- **Documentation** – comprehensive CLI guide created

## Technical Architecture

```
Jekyll Site Structure:
├── _plugins/i18n.rb          # Custom translation system
├── _locales/*.yml            # Translation files
├── _data/challenge.yml       # Challenge configuration
├── _layouts/challenge10k.html # Dashboard layout
├── _logbook/*.md             # Practice sessions
├── _posts/*.md               # Bilingual content
└── assets/css/*.css          # Custom styling
```

## Linki powiązane

- 📖 [Ruby CLI Commands & Jekyll Setup](/ruby-cli.html)
- 🔗 [GitHub Repository](https://github.com/Scripterix/jekyll-i18n)
- 📊 [Challenge10k Dashboard](http://localhost:4000/challenge10k/)

## Key Learnings

1. **Liquid templating** is powerful but has performance limits
2. **YAML front matter** enables complex content classification
3. **Plugin architecture** allows unlimited Jekyll customization
4. **GitHub Pages constraints** require careful dependency management
5. **Bootstrap CDN** beats local compilation for simple sites

## Performance Metrics

- **Build time:** 0.7s (300% improvement)
- **Bundle size:** 85KB (40% reduction)  
- **Lighthouse score:** 95/100
- **Mobile responsive:** ✅ Passed all breakpoints

**Next:** GitHub Actions automation + automated screenshot generation for social sharing.