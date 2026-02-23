---
layout: page
lang: pl
translation_id: archive
title: "Archiwum"
permalink: /archive/
hero_theme: forest
hero_badge: "Centrum archiwum"
hero_title: "Zobacz cały przebieg pracy"
hero_lead: "Połączony przegląd artykułów, wpisów logbooka i godzin praktyki."
hero_primary_cta:
  label: "Przeglądaj logbook"
  url: /challenge10k/#recent-logs
  icon: bi-lightning-charge
hero_secondary_cta:
  label: "Zobacz portfolio"
  url: /portfolio/#works-table
  icon: bi-kanban
---

{% assign posts = site.posts | where: 'lang', 'pl' %}
{% assign logs = site.logbook | where: 'lang', 'pl' %}
{% assign timeline = posts | concat: logs | sort: 'date' | reverse %}
{% assign archive_base = '/archive/' %}

<div class="archive-page">
<section class="archive-sections">
  <div class="mb-5">
    <h2 id="timeline" class="h3">{{ t.archive.sections.timeline | default: 'Wspólna oś czasu' }}</h2>
    <p class="text-muted">{{ t.archive.sections.timeline_caption | default: 'Posty i wpisy logbooka posortowane według daty.' }}</p>

    {% if timeline.size > 0 %}
      {% assign unique_years = '' | split: '' %}
      {% for item in timeline %}
        {% assign year = item.date | date: '%Y' %}
        {% unless unique_years contains year %}
          {% assign unique_years = unique_years | push: year %}
        {% endunless %}
      {% endfor %}
      {% assign sorted_years = unique_years | sort | reverse %}
      <div class="timeline-badges-wrapper my-4">
        <div class="d-flex flex-wrap justify-content-center gap-3">
          {% for year in sorted_years %}
          {% assign has_year_page = false %}
          {% assign year_url = '' %}
          {% for p in site.pages %}
            {% if p.layout == 'archive-year' and p.lang == page.lang %}
              {% assign p_year = p.archive_year | append: '' %}
              {% if p_year == year %}
                {% assign has_year_page = true %}
                {% assign year_url = p.url %}
                {% break %}
              {% endif %}
            {% endif %}
          {% endfor %}

          {% if has_year_page %}
          <a class="badge bg-primary fw-semibold fs-5 px-4 py-3 d-flex align-items-center justify-content-center text-decoration-none"
            href="{{ year_url | relative_url }}" title="{{ year }}">
            {{ year }}
          </a>
          {% endif %}
          {% endfor %}
        </div>
      </div>
    {% else %}
      <p class="text-muted">{{ t.archive.sections.timeline_empty | default: 'Oś czasu wypełni się, gdy pojawią się artykuły i logbook.' }}</p>
    {% endif %}
  </div>

  <div class="mb-5">
    <h2 id="posts" class="h3">{{ t.archive.sections.posts | default: 'Wszystkie artykuły' }}</h2>
    <p class="text-muted">{{ t.archive.sections.posts_caption | default: 'Teksty dokumentujące kolejne etapy i wnioski.' }}</p>

    {% if posts.size > 0 %}
    <div class="row g-4">
      {% for post in posts %}
      {% assign summary = post.description | default: post.excerpt %}
      <div class="col-md-6 col-xl-4 d-flex">
        <article class="archive-card archive-card--post h-100">
          <div class="archive-card__badge">
            <span class="archive-card__icon">
              <i class="bi bi-journal-text" aria-hidden="true"></i>
            </span>
            <span>{{ t.archive.timeline.post_label | default: 'Artykuł' }}</span>
          </div>

          <h3 class="archive-card__title">
            <a class="stretched-link text-decoration-none text-dark" href="{{ post.url | relative_url }}">
              {{ post.title }}
            </a>
          </h3>

          {% if summary %}
          <p class="archive-card__summary text-muted mb-3">
            {{ summary | strip_html | normalize_whitespace | truncate: 140 }}
          </p>
          {% endif %}

          {% if post.categories and post.categories.size > 0 %}
          <p class="archive-card__meta small text-muted mb-4">{{ post.categories | join: ', ' }}</p>
          {% endif %}

          <div class="archive-card__footer mt-auto d-flex align-items-center justify-content-between gap-3">
            <span class="archive-card__date small text-muted">
              <i class="bi bi-calendar3 me-1" aria-hidden="true"></i>{% include helpers/date-only.html value=post.date format=t.post.date_format %}
            </span>
            <a class="btn btn-outline-primary btn-sm px-3" href="{{ post.url | relative_url }}">
              {{ t.archive.card.open | default: 'Otwórz wpis' }} <i class="bi bi-arrow-up-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </article>
      </div>
      {% endfor %}
    </div>
    {% else %}
    <p class="text-muted">{{ t.home.posts.empty | default: 'Brak opublikowanych wpisów.' }}</p>
    {% endif %}
  </div>

  <div>
    <h2 id="logbook" class="h3">{{ t.archive.sections.logbook | default: 'Sesje logbooka' }}</h2>
    <p class="text-muted">{{ t.archive.sections.logbook_caption | default: 'Aktualizacje z godzinami i obszarami skupienia.' }}</p>

    {% if logs.size > 0 %}
    <div class="row g-4">
      {% for entry in logs %}
      {% assign summary = entry.description | default: entry.excerpt %}
      {% assign hours_template = t.archive.timeline.hours | default: '%{hours} h' %}
      {% assign hours_value = hours_template | replace: '%{hours}', entry.hours_spent | default: 0 %}
      <div class="col-md-6 col-xl-4 d-flex">
        <article class="archive-card archive-card--log h-100">
          <div class="archive-card__badge">
            <span class="archive-card__icon">
              <i class="bi bi-lightning-charge" aria-hidden="true"></i>
            </span>
            <span>{{ t.archive.timeline.log_label | default: 'Logbook' }}</span>
          </div>

          <h3 class="archive-card__title">
            <a class="stretched-link text-decoration-none text-dark" href="{{ entry.url | relative_url }}">
              {{ entry.title }}
            </a>
          </h3>

          {% if summary %}
          <p class="archive-card__summary text-muted mb-3">
            {{ summary | strip_html | normalize_whitespace | truncate: 160 }}
          </p>
          {% endif %}

          <p class="archive-card__meta small text-muted mb-4">
            {{ hours_value }}
            {% if entry.focus_area %}
            <span class="mx-1">&middot;</span>{{ entry.focus_area }}
            {% endif %}
          </p>

          <div class="archive-card__footer mt-auto d-flex align-items-center justify-content-between gap-3">
            <span class="archive-card__date small text-muted">
              <i class="bi bi-calendar3 me-1" aria-hidden="true"></i>{% include helpers/date-only.html value=entry.date format=t.post.date_format %}
            </span>
            <a class="btn btn-outline-primary btn-sm px-3" href="{{ entry.url | relative_url }}">
              {{ t.archive.card.open | default: 'Otwórz wpis' }} <i class="bi bi-arrow-up-right ms-1" aria-hidden="true"></i>
            </a>
          </div>
        </article>
      </div>
      {% endfor %}
    </div>
    {% else %}
    <p class="text-muted">{{ t.archive.sections.timeline_empty | default: 'Oś czasu wypełni się, gdy pojawią się artykuły i logbook.' }}</p>
    {% endif %}
  </div>
</section>
</div>
