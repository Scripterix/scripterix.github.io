---
layout: page
lang: pl
translation_key: archive-works
title_key: archive_works.meta_title
description_key: archive_works.description
permalink: /pl/archive/works/
---

# {{ "archive_works.hero.title" | t }}

{{ "archive_works.hero.eyebrow" | t }}

{{ "archive_works.hero.subtitle" | t }}

[{{ "archive.hero.cta_challenge" | t }}]({{ '/pl/challenge10k/' | relative_url }})

## {{ "archive_works.list.heading" | t }}

{% assign locale = page.lang | default: site.default_lang %}

| {{ "archive_works.list.year" | t }} | {{ "archive_works.list.heading" | t }} | {{ "archive_works.list.status" | t }} | {{ "archive_works.list.cta" | t }} |
| --- | --- | --- | --- |
{% for work in site.data.archive_works %}
| {{ work.year }} | **{{ work.title[locale] }}** — {{ work.summary[locale] }} | {{ work.status[locale] }} | [{{ "archive_works.list.cta" | t }}]({{ work.link }}) |
{% endfor %}

{{ "archive_works.list.placeholder" | t }}
