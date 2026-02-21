---
layout: page
lang: en
translation_id: portfolio
title: "Portfolio"
permalink: /en/portfolio/
hero_theme: orchid
hero_badge: "Portfolio"
hero_title: "Scripterix Portfolio"
hero_lead: "A living archive of shipped products, experiments, and automation projects crafted over the past years."
hero_primary_cta:
  label: "Browse projects"
  url: "#portfolio-grid"
  icon: bi-kanban
hero_secondary_cta:
  label: "Challenge10k logbook"
  url: /en/challenge10k/
  icon: bi-lightning-charge
---

{% assign locale = page.lang | default: site.default_lang | default: 'en' %}
{% assign works = site.works | where: 'lang', locale | sort: 'date' | reverse %}
{% assign stats = site.data.stats | default: empty %}
{% assign formatted_stats = stats.formatted | default: empty %}
{% assign total_projects = formatted_stats.total_projects | default: stats.total_projects %}
{% if total_projects == nil %}
  {% assign total_projects = works | size %}
{% endif %}
{% assign total_hours = formatted_stats.total_hours | default: stats.total_hours | default: 0 %}
{% assign total_posts = formatted_stats.total_posts | default: stats.total_posts %}
{% if total_posts == nil %}
  {% assign total_posts = site.posts | where: 'lang', locale | size %}
{% endif %}
{% assign hours_display = total_hours %}
{% if hours_display %}
  {% unless hours_display contains 'h' or hours_display contains 'H' %}
    {% assign hours_display = hours_display | append: 'h' %}
  {% endunless %}
{% else %}
  {% assign hours_display = '0h' %}
{% endif %}
{% assign updated_at = stats.last_updated | default: site.time %}
{% capture formatted_update %}
  {% include helpers/date-only.html value=updated_at format=t.post.date_format %}
{% endcapture %}
{% assign formatted_update = formatted_update | strip %}

<section class="portfolio-stats-section py-4">
  <div class="container">
    <div class="portfolio-stats card border-0 shadow-sm">
      <div class="card-body">
        <div class="row row-cols-1 row-cols-md-3 g-3 text-center">
          <div class="col">
            <div class="portfolio-stat">
              <span class="portfolio-stat__value">{{ total_projects }}</span>
              <span class="portfolio-stat__label">{{ t.portfolio.hero.stats.projects }}</span>
            </div>
          </div>
          <div class="col">
            <div class="portfolio-stat">
              <span class="portfolio-stat__value">{{ hours_display }}</span>
              <span class="portfolio-stat__label">{{ t.portfolio.hero.stats.hours }}</span>
            </div>
          </div>
          <div class="col">
            <div class="portfolio-stat">
              <span class="portfolio-stat__value">{{ total_posts }}</span>
              <span class="portfolio-stat__label">{{ t.portfolio.hero.stats.posts }}</span>
            </div>
          </div>
        </div>
        <p class="portfolio-stat__updated text-muted small text-center mb-0 mt-3">
          {{ t.portfolio.hero.stats.updated | default: 'Updated' }} &middot; {{ formatted_update }}
        </p>
      </div>
    </div>
  </div>
</section>

<section id="portfolio-grid" class="portfolio-grid-section py-5">
  <div class="container">
    {% if works.size > 0 %}
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {% for work in works %}
      {% assign title = work.title %}
      {% assign summary = work.summary | default: work.excerpt | default: work.content %}
      {% assign status = work.status | default: t.portfolio.labels.default_status %}
      {% assign year = work.year %}
      {% if year == nil or year == '' %}
        {% if work.date %}
          {% assign year = work.date | date: '%Y' %}
        {% else %}
          {% assign year = '-' %}
        {% endif %}
      {% endif %}
      {% assign image = work.featured_image | default: work.cover | default: work.image | default: '/assets/images/portfolio/coding01.jpg' %}
      {% assign link = work.url %}
      {% assign tags = work.tags | default: work.tech %}
      {% assign image_path = image %}
      {% if image_path contains '://' %}
        {% assign portfolio_image = image_path %}
      {% else %}
        {% assign portfolio_image = image_path | relative_url %}
      {% endif %}
      <div class="col">
        <article class="portfolio-card h-100">
          <div class="ratio ratio-16x9 portfolio-card__image rounded-4 mb-3">
            <img src="{{ portfolio_image }}" alt="{{ title }}" loading="lazy" />
          </div>
          <div class="portfolio-card__body">
            <div class="portfolio-card__meta d-flex justify-content-between align-items-center mb-2">
              <span class="badge text-uppercase portfolio-card__status">{{ status }}</span>
              <span class="text-muted fw-semibold small">{{ year }}</span>
            </div>
            <h3 class="h5 fw-semibold mb-2">{{ title }}</h3>
            <p class="text-muted mb-3">{{ summary }}</p>
            {% if tags %}
            <div class="portfolio-card__tags mb-3">
              {% for tag in tags %}
              <span class="badge bg-light text-secondary border me-1 mb-1">{{ tag }}</span>
              {% endfor %}
            </div>
            {% endif %}
          </div>
          <div class="portfolio-card__actions d-flex flex-wrap gap-2">
            {% if link %}
            <a class="btn btn-outline-primary btn-sm" href="{{ link | relative_url }}">
              <i class="bi bi-journal-text me-1"></i>{{ t.portfolio.labels.details | default: 'Details' }}
            </a>
            {% endif %}
            {% if work.github_repo %}
            <a class="btn btn-outline-secondary btn-sm" href="{{ work.github_repo }}" target="_blank" rel="noopener">
              <i class="bi bi-github me-1"></i>{{ t.portfolio.labels.github | default: 'GitHub' }}
            </a>
            {% endif %}
          </div>
        </article>
      </div>
      {% endfor %}
    </div>
    {% else %}
    <p class="text-muted">{{ t.portfolio.labels.fallback }}</p>
    {% endif %}
  </div>
</section>

{% assign recent_posts = site.posts | where: 'lang', locale | sort: 'date' | reverse | slice: 0, 3 %}
{% assign recent_logs = site.logbook | where: 'lang', locale | sort: 'date' | reverse | slice: 0, 3 %}

<section class="portfolio-previews py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-6">
        <h2 class="h4 fw-semibold mb-3">{{ t.portfolio.filters.latest_posts }}</h2>
        {% if recent_posts.size > 0 %}
        <div class="preview-list">
          {% for post in recent_posts %}
          {% assign post_summary = post.description | default: post.excerpt | default: post.content %}
          <article class="preview-card">
            <div class="preview-card__meta">
              <span class="small text-muted"><i class="bi bi-calendar3 me-1"></i>{% include helpers/date-only.html value=post.date format=t.post.date_format %}</span>
              {% if post.categories %}
              <span class="small text-muted text-uppercase">{{ post.categories | join: ', ' }}</span>
              {% endif %}
            </div>
            <h3 class="preview-card__title">
              <a class="preview-card__title-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
            </h3>
            <p class="preview-card__summary text-muted mb-0">{{ post_summary | strip_html | strip_newlines | truncate: 160 }}</p>
          </article>
          {% endfor %}
        </div>
        {% else %}
        <p class="text-muted">{{ t.home.posts.empty }}</p>
        {% endif %}
      </div>
      <div class="col-lg-6">
        <h2 class="h4 fw-semibold mb-3">{{ t.portfolio.filters.latest_logs }}</h2>
        {% if recent_logs.size > 0 %}
        <div class="preview-list">
          {% for entry in recent_logs %}
          {% assign log_summary = entry.description | default: entry.excerpt | default: entry.content %}
          <article class="preview-card">
            <div class="preview-card__meta">
              <span class="small text-muted"><i class="bi bi-clock-history me-1"></i>{{ entry.hours_spent }} h</span>
              {% if entry.focus_area %}
              <span class="small text-muted">{{ entry.focus_area }}</span>
              {% endif %}
            </div>
            <h3 class="preview-card__title">
              <a class="preview-card__title-link" href="{{ entry.url | relative_url }}">{{ entry.title }}</a>
            </h3>
            <p class="preview-card__summary text-muted mb-0">{{ log_summary | strip_html | strip_newlines | truncate: 160 }}</p>
          </article>
          {% endfor %}
        </div>
        {% else %}
        <p class="text-muted">{{ t.archive.sections.timeline_empty }}</p>
        {% endif %}
      </div>
    </div>
  </div>
</section>
