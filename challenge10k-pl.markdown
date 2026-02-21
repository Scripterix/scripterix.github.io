---
layout: page
lang: pl
translation_id: challenge10k
title: "Wyzwanie 10k godzin"
permalink: /challenge10k/
hero_theme: ocean
hero_badge: "Siła konsekwencji"
hero_title: "Wyzwanie 10 000 godzin programowania"
hero_lead: "Droga do mistrzostwa poprzez regularną praktykę i codzienny logbook."
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
        <h3 class="h5 text-muted">Zalogowane godziny</h3>
        <p class="display-5 fw-bold text-primary">{{ total_hours }} h</p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card shadow-sm border-0">
      <div class="card-body text-center">
        <h3 class="h5 text-muted">Sesje</h3>
        <p class="display-5 fw-bold text-primary">{{ sessions }}</p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card shadow-sm border-0">
      <div class="card-body text-center">
        <h3 class="h5 text-muted">Docelowe 10 000 h</h3>
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
      <th scope="col">Data</th>
      <th scope="col">Tytuł</th>
      <th scope="col">Godziny</th>
      <th scope="col">Obszar</th>
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
<p class="text-muted">Brak wpisów logbooka — pierwsza sesja pojawi się wkrótce.</p>
{% endif %}
