---
layout: page
lang: en
translation_key: archive
title_key: archive.meta_title
description_key: archive.description
permalink: /archive/
hero_theme: forest
hero_badge_key: archive.hero.eyebrow
hero_title_key: archive.hero.title
hero_lead_key: archive.hero.subtitle
hero_primary_cta:
  label_key: archive.hero.cta_challenge
  url: /challenge10k/
  icon: bi-lightning-fill
hero_secondary_cta:
  label_key: archive.hero.cta_logbook
  url: /challenge10k/#logbook
  icon: bi-journal-text
hero_extra_include: hero/archive-metrics.html
---

<!-- markdownlint-disable MD033 MD010 -->

{% assign current_lang = page.lang | default: site.default_lang %}
{% assign posts = site.posts | where: 'lang', current_lang %}
{% assign log_entries = site.logbook %}
{% assign timeline = posts | concat: log_entries %}
{% assign timeline = timeline | sort: 'date' | reverse %}
{% assign date_format = "home.posts.date_format" | t %}
{% assign posts_grouped = site.posts | group_by_exp: "post", "post.translation_key | default: post.id" %}
{% assign total_posts = posts_grouped.size %}
{% assign total_logs = site.logbook | size %}
{% assign total_hours = 0 %}
{% for log_entry in site.logbook %}
	{% if log_entry.hours_spent %}
		{% assign entry_hours = log_entry.hours_spent | plus: 0 %}
		{% assign total_hours = total_hours | plus: entry_hours %}
	{% endif %}
{% endfor %}
{% assign all_tags = "" | split: "" %}
{% for entry in timeline %}
  {% if entry.tags %}
    {% assign all_tags = all_tags | concat: entry.tags %}
  {% endif %}
  {% if entry.categories %}
    {% assign all_tags = all_tags | concat: entry.categories %}
  {% endif %}
{% endfor %}
{% assign unique_tags = all_tags | uniq | size %}

<div class="archive-controls">
  <input id="archive-search" type="search" placeholder="{{ "archive.search.placeholder" | t }}" aria-label="{{ "archive.search.placeholder" | t }}" />
  <div id="search-hint" class="search-hint" hidden>{{ "archive.search.hint" | t }}</div>
</div>

## {{ "archive.sections.timeline" | t }}

{{ "archive.sections.timeline_caption" | t }}

{% if timeline.size > 0 %}
<div class="archive-grid" id="archive-grid">
{% for entry in timeline %}
  {% assign entry_type = entry.collection | default: 'posts' %}
  {% if entry_type == 'logbook' %}
    {% assign label = "archive.timeline.log_label" | t %}
    {% assign summary = entry.summary | default: entry.focus_area | default: '' | strip_newlines | strip_html | truncate: 160 %}
  {% else %}
    {% assign label = "archive.timeline.post_label" | t %}
    {% assign summary = entry.excerpt | default: entry.summary | default: '' | strip_html | strip_newlines | truncate: 160 %}
  {% endif %}
  {% assign entry_tags = entry.tags | default: entry.categories %}
  {% assign search_blob = entry.title | append: ' ' | append: summary %}
  {% if entry_tags %}
    {% assign search_blob = search_blob | append: ' ' | append: entry_tags | join: ' ' %}
  {% endif %}
  {% if entry.focus_area %}
    {% assign search_blob = search_blob | append: ' ' | append: entry.focus_area %}
  {% endif %}
  <article class="archive-card archive-card--{{ entry_type }}" data-type="{{ entry_type }}" data-search="{{ search_blob | downcase | escape_once }}">
    <header class="archive-card__header">
      <span class="archive-card__badge">{{ label }}</span>
      <time datetime="{{ entry.date | date: '%Y-%m-%d' }}">{{ entry.date | date: date_format }}</time>
    </header>
    <div class="archive-card__body">
      <h3 class="archive-card__title"><a href="{{ entry.url | relative_url }}">{{ entry.title }}</a></h3>
      {% if summary != '' %}
      <p class="archive-card__summary">{{ summary }}</p>
      {% endif %}
	{% if entry_tags %}
	  {% assign unique_entry_tags = entry_tags | uniq %}
	  <p class="archive-card__tags">
		{% for tag in unique_entry_tags %}
		<span class="tag-badge" data-tag="{{ tag | slugify }}">{{ tag }}</span>
		{% endfor %}
	  </p>
	{% endif %}
    </div>
    <footer class="archive-card__footer">
      <div class="archive-card__meta">
        {% if entry_type == 'logbook' and entry.hours_spent %}
        <span class="card-hours" aria-label="Hours spent">⏱️ {{ entry.hours_spent }}h</span>
        {% endif %}
        {% if entry_type == 'posts' and entry.writing_hours %}
        <span class="card-writing" aria-label="Writing hours">✍️ {{ entry.writing_hours }}h</span>
        {% endif %}
        {% if entry.focus_area and entry_type == 'logbook' %}
        <span class="card-focus">{{ entry.focus_area }}</span>
        {% endif %}
      </div>
	<a class="archive-card__link" href="{{ entry.url | relative_url }}">{{ "archive.card.open" | t }}</a>
    </footer>
		</article>
{% endfor %}
	</div>
{% else %}
> {{ "archive.sections.timeline_empty" | t }}
{% endif %}

## {{ "archive.sections.posts" | t }}

{{ "archive.sections.posts_caption" | t }}

{% if posts.size > 0 %}
<div class="archive-grid archive-grid--compact">
	{% for post in posts %}
	{% assign summary = post.excerpt | default: post.summary | default: '' | strip_html | strip_newlines | truncate: 140 %}
		{% assign post_tags = post.tags | default: post.categories %}
		{% assign post_search = post.title | append: ' ' | append: summary %}
		{% if post_tags %}
		{% assign post_search = post_search | append: ' ' | append: post_tags | join: ' ' %}
		{% endif %}
		<article class="archive-card archive-card--posts" data-type="posts" data-search="{{ post_search | downcase | escape_once }}">
		<header class="archive-card__header">
			<span class="archive-card__badge">{{ "archive.timeline.post_label" | t }}</span>
			<time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: date_format }}</time>
		</header>
		<div class="archive-card__body">
			<h3 class="archive-card__title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
			{% if summary != '' %}
			<p class="archive-card__summary">{{ summary }}</p>
			{% endif %}
			{% if post_tags %}
			{% assign unique_post_tags = post_tags | uniq %}
			<p class="archive-card__tags">
				{% for tag in unique_post_tags %}
				<span class="tag-badge" data-tag="{{ tag | slugify }}">{{ tag }}</span>
				{% endfor %}
			</p>
			{% endif %}
		</div>
		<footer class="archive-card__footer">
			<div class="archive-card__meta">
				{% if post.writing_hours %}
				<span class="card-writing">✍️ {{ post.writing_hours }}h</span>
				{% endif %}
			</div>
			<a class="archive-card__link" href="{{ post.url | relative_url }}">{{ "archive.card.open" | t }}</a>
		</footer>
	</article>
	{% endfor %}
</div>
{% else %}
> {{ "home.posts.empty" | t }}
{% endif %}

## {{ "archive.sections.logbook" | t }}

{{ "archive.sections.logbook_caption" | t }}

{% if log_entries.size > 0 %}
<div class="archive-grid archive-grid--compact">
	{% assign recent_log = log_entries | sort: 'date' | reverse %}
	{% for entry in recent_log %}
	{% assign summary = entry.summary | default: entry.focus_area | default: '' | strip_newlines | strip_html | truncate: 140 %}
		{% assign log_search = entry.title | append: ' ' | append: summary %}
		{% if entry.tags %}
			{% assign log_search = log_search | append: ' ' | append: entry.tags | join: ' ' %}
		{% endif %}
		{% if entry.focus_area %}
			{% assign log_search = log_search | append: ' ' | append: entry.focus_area %}
		{% endif %}
		<article class="archive-card archive-card--logbook" data-type="logbook" data-search="{{ log_search | downcase | escape_once }}">
		<header class="archive-card__header">
			<span class="archive-card__badge">{{ "archive.timeline.log_label" | t }}</span>
			<time datetime="{{ entry.date | date: '%Y-%m-%d' }}">{{ entry.date | date: date_format }}</time>
		</header>
		<div class="archive-card__body">
			<h3 class="archive-card__title"><a href="{{ entry.url | relative_url }}">{{ entry.title }}</a></h3>
			{% if summary != '' %}
			<p class="archive-card__summary">{{ summary }}</p>
			{% endif %}
			{% if entry.tags %}
			{% assign unique_log_tags = entry.tags | uniq %}
			<p class="archive-card__tags">
				{% for tag in unique_log_tags %}
				<span class="tag-badge" data-tag="{{ tag | slugify }}">{{ tag }}</span>
				{% endfor %}
			</p>
			{% endif %}
		</div>
		<footer class="archive-card__footer">
			<div class="archive-card__meta">
				{% if entry.hours_spent %}
				<span class="card-hours">⏱️ {{ entry.hours_spent }}h</span>
				{% endif %}
				{% if entry.focus_area %}
				<span class="card-focus">{{ entry.focus_area }}</span>
				{% endif %}
			</div>
			<a class="archive-card__link" href="{{ entry.url | relative_url }}">{{ "archive.card.open" | t }}</a>
		</footer>
	</article>
	{% endfor %}
</div>
{% else %}
> {{ "challenge.sections.logbook" | t }} — {{ "home.posts.empty" | t }}
{% endif %}

<div id="archive-search-results" class="archive-search-results" aria-live="polite"></div>

<script>
(function() {
	const searchInput = document.getElementById('archive-search');
	const grid = document.getElementById('archive-grid');
	const cards = grid ? Array.from(grid.querySelectorAll('.archive-card')) : [];
	const resultsContainer = document.getElementById('archive-search-results');
	const hint = document.getElementById('search-hint');
	const searchEndpoint = '{{ '/search.json' | relative_url }}';
	const currentLang = '{{ current_lang }}';
	let index = [];

	async function loadIndex() {
		try {
			const res = await fetch(searchEndpoint);
			if (!res.ok) return;
			const payload = await res.json();
			index = Array.isArray(payload) ? payload.filter(item => item.lang === currentLang) : [];
		} catch (err) {
			console.warn('Archive search index unavailable', err);
		}
	}

	if (searchInput) {
		loadIndex();
		searchInput.addEventListener('input', function(e) {
			const query = e.target.value.trim().toLowerCase();
			const hasQuery = query.length > 0;

			if (hint) {
				hint.hidden = !hasQuery;
			}

			if (!hasQuery) {
				cards.forEach(card => card.classList.remove('is-hidden'));
				if (resultsContainer) {
					resultsContainer.innerHTML = '';
				}
				return;
			}

			const localMatches = [];
			cards.forEach(card => {
				const haystack = card.getAttribute('data-search') || '';
				const match = haystack.includes(query);
				card.classList.toggle('is-hidden', !match);
				if (match) {
					localMatches.push({
						title: card.querySelector('.archive-card__title').innerText,
						url: card.querySelector('.archive-card__title a').getAttribute('href'),
						meta: card.querySelector('.archive-card__summary') ? card.querySelector('.archive-card__summary').innerText : ''
					});
				}
			});

			if (resultsContainer) {
				if (localMatches.length === 0 && index.length) {
					const remote = index.filter(item => {
						const blob = (item.title + ' ' + item.excerpt + ' ' + (item.tags || []).join(' ')).toLowerCase();
						return blob.includes(query);
					}).slice(0, 20);
					if (remote.length) {
						resultsContainer.innerHTML = remote.map(renderResult).join('');
						return;
					}
				}
				resultsContainer.innerHTML = localMatches.map(renderResult).join('');
			}
		});
	}

	function renderResult(item) {
		return `<div class="search-hit"><a href="${item.url}">${item.title}</a>${item.meta ? `<p>${item.meta}</p>` : ''}</div>`;
	}
})();
</script>

<style>
.archive-stats {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	margin: 1.5rem 0;
}
.archive-stats .stat {
	background: #ffffff;
	border: 1px solid #e6e9ee;
	padding: 0.75rem 1rem;
	border-radius: 12px;
	min-width: 120px;
	text-align: center;
	box-shadow: 0 8px 16px rgba(15, 23, 42, 0.04);
}
.archive-stats .stat-num {
	font-weight: 700;
	font-size: 1.25rem;
}
.archive-stats .stat-label {
	color: #64748b;
	font-size: 0.8rem;
	margin-top: 0.2rem;
}
.archive-controls {
	margin-bottom: 1.5rem;
}
#archive-search {
	width: 100%;
	padding: 0.75rem 1rem;
	border-radius: 12px;
	border: 1px solid #d9dfe8;
	font-size: 0.95rem;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
#archive-search:focus {
	border-color: #2563eb;
	box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
	outline: none;
}
.search-hint {
	font-size: 0.8rem;
	color: #94a3b8;
	margin-top: 0.35rem;
}
.archive-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 1.5rem;
}
.archive-grid--compact {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	gap: 1.25rem;
}
.archive-card {
	background: #ffffff;
	border: 1px solid #e2e8f0;
	display: flex;
	flex-direction: column;
	box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
	transition: transform 0.18s ease, box-shadow 0.18s ease;
	min-height: 100%;
}
.archive-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 18px 32px rgba(15, 23, 42, 0.08);
}
.archive-card.is-hidden {
	display: none !important;
}
.archive-card__header {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	padding: 1.2rem 1.4rem 0.6rem;
}
.archive-card__badge {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(37, 99, 235, 0.28));
	color: #1d4ed8;
	padding: 0.25rem 0.65rem;
	border-radius: 999px;
	font-size: 0.75rem;
	font-weight: 600;
	text-transform: uppercase;
}
.archive-card--logbook .archive-card__badge {
	background: linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(34, 197, 94, 0.28));
	color: #15803d;
}
.archive-card__header time {
	font-size: 0.85rem;
	color: #94a3b8;
}
.archive-card__body {
	padding: 0 1.4rem 1.2rem;
	flex: 1 1 auto;
}
.archive-card__title {
	font-size: 1.15rem;
	margin: 0 0 0.7rem;
}
.archive-card__title a {
	text-decoration: none;
	color: inherit;
}
.archive-card__title a:hover {
	color: #2563eb;
}
.archive-card__summary {
	font-size: 0.92rem;
	color: #475569;
	line-height: 1.5;
}
.archive-card__tags {
	margin: 0.75rem 0 0;
}
.tag-badge {
	display: inline-block;
	margin: 0 0.35rem 0.35rem 0;
	padding: 0.22rem 0.6rem;
	border-radius: 999px;
	font-size: 0.75rem;
	background: #f3f4f6;
	color: #0b74de;
	border: 1px solid rgba(37, 99, 235, 0.18);
}
.archive-card__footer {
	padding: 0.9rem 1.4rem 1.2rem;
	border-top: 1px solid #eef2f5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.75rem;
}
.archive-card__meta {
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem;
	align-items: center;
}
.card-hours {
	background: #ecfdf5;
	color: #047857;
	padding: 0.2rem 0.5rem;
	border-radius: 8px;
	font-weight: 600;
	font-size: 0.85rem;
}
.card-writing {
	background: #fff7ed;
	color: #b45309;
	padding: 0.2rem 0.5rem;
	border-radius: 8px;
	font-weight: 600;
	font-size: 0.85rem;
}
.card-focus {
	font-size: 0.8rem;
	color: #475569;
}
.archive-card__link {
	font-weight: 600;
	color: #2563eb;
}
.archive-grid--compact .archive-card {
	box-shadow: none;
	border-radius: 14px;
}
.archive-search-results {
	margin-top: 2rem;
}
.archive-search-results .search-hit {
	padding: 0.75rem 0;
	border-top: 1px solid #e5e7eb;
}
.archive-search-results .search-hit:first-child {
	border-top: none;
}
.archive-search-results .search-hit a {
	font-weight: 600;
	color: #2563eb;
}
@media (max-width: 640px) {
	.archive-stats {
		gap: 0.75rem;
	}
	.archive-stats .stat {
		flex: 1 1 calc(50% - 0.75rem);
	}
	.archive-card__footer {
		flex-direction: column;
		align-items: flex-start;
	}
}
</style>
