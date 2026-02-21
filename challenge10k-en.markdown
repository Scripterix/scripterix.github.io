---
layout: page
lang: en
translation_id: challenge10k
title: "10k Hour Challenge"
permalink: /en/challenge10k/
hero_theme: ocean
hero_badge: "Momentum matters"
hero_title: "10,000-Hour Programming Challenge"
hero_lead: "The road to mastery captured through consistent practice and daily logs."
---

{% assign logs = site.logbook | where: 'lang', page.lang | sort: 'date' | reverse %}
{% assign total_hours = 0 %}
{% assign sessions = 0 %}
{% for entry in logs %}
  {% assign total_hours = total_hours | plus: entry.hours_spent %}
  {% assign sessions = sessions | plus: 1 %}
{% endfor %}

<div class="row g-4 mb-4">
  <div class="col-md-4">
    <div class="card shadow-sm border-0">
      <div class="card-body text-center">
        <h3 class="h5 text-muted">Hours logged</h3>
        <p class="display-5 fw-bold text-primary">{{ total_hours }} h</p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card shadow-sm border-0">
      <div class="card-body text-center">
        <h3 class="h5 text-muted">Sessions</h3>
        <p class="display-5 fw-bold text-primary">{{ sessions }}</p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card shadow-sm border-0">
      <div class="card-body text-center">
        <h3 class="h5 text-muted">Target 10,000 h</h3>
        {% assign remaining = 10000 | minus: total_hours %}
        {% if remaining < 0 %}{% assign remaining = 0 %}{% endif %}
        <p class="display-5 fw-bold text-primary">{{ remaining }} h</p>
      </div>
    </div>
  </div>
</div>

## Logbook
{% if logs.size > 0 %}
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Title</th>
      <th scope="col">Hours</th>
      <th scope="col">Focus</th>
    </tr>
  </thead>
  <tbody>
    {% for entry in logs %}
    <tr>
      <td>{% include helpers/date-only.html value=entry.date format=t.post.date_format %}</td>
      <td><a href="{{ entry.url | relative_url }}">{{ entry.title }}</a></td>
      <td>{{ entry.hours_spent }} h</td>
      <td>{{ entry.focus_area | default: '—' }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
{% else %}
<p class="text-muted">No English log entries yet — the first update will land soon.</p>
{% endif %}
