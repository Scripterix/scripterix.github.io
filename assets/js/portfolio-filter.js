(function () {
  const selectors = {
    works: '#last-works',
    posts: '#last-posts',
    logbook: '#last-logbook',
    timeline: '#unified-timeline'
  };

  const hasTargets = Object.values(selectors).some((selector) => document.querySelector(selector));
  if (!hasTargets) {
    return;
  }

  const PREVIEW_LIMIT = 4;
  const TIMELINE_LIMIT = 8;
  const lang = (document.documentElement.lang || 'en').split('-')[0];
  const typeLabels = lang === 'pl'
    ? {
      work: { badge: 'Projekt', label: 'Portfolio' },
      post: { badge: 'Artykuł', label: 'Post' },
      log: { badge: 'Sesja', label: 'Logbook' }
    }
    : {
      work: { badge: 'Project', label: 'Work entry' },
      post: { badge: 'Article', label: 'Post' },
      log: { badge: 'Session', label: 'Logbook entry' }
    };

  const endpoints = {
    works: '/assets/data/portfolio.json',
    posts: '/assets/data/posts.json',
    logbook: '/assets/data/logbook.json'
  };

  const emptyMessages = {
    works: lang === 'pl' ? 'Brak projektów do wyświetlenia.' : 'No projects to show yet.',
    posts: lang === 'pl' ? 'Brak artykułów do wyświetlenia.' : 'No posts to show yet.',
    logbook: lang === 'pl' ? 'Brak wpisów logbooka.' : 'No logbook entries yet.',
    timeline: lang === 'pl' ? 'Oś czasu jest jeszcze pusta.' : 'Timeline is empty for now.'
  };

  const dateFormatter = new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const state = {
    works: [],
    posts: [],
    logbook: [],
    timeline: []
  };

  function safeFetchJSON(url) {
    return fetch(url, { cache: 'no-cache' })
      .then((resp) => {
        if (!resp.ok) {
          return [];
        }
        return resp.json();
      })
      .catch((error) => {
        console.warn('Portfolio preview: unable to fetch', url, error);
        return [];
      });
  }

  function escapeHtml(input) {
    if (typeof input !== 'string') {
      return '';
    }
    return input.replace(/[&<>"']/g, (char) => {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char];
    });
  }

  function pickLocalized(value) {
    if (value == null) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return value[lang] || value.en || Object.values(value).find((entry) => !!entry) || '';
    }
    return '';
  }

  function pickTitle(item) {
    return (
      pickLocalized(item.title) ||
      pickLocalized(item.name) ||
      (typeof item.slug === 'string' ? item.slug.replace(/-/g, ' ') : '') ||
      ''
    );
  }

  function pickSummary(item) {
    return (
      pickLocalized(item.summary) ||
      pickLocalized(item.description) ||
      pickLocalized(item.excerpt) ||
      ''
    );
  }

  function determineUrl(item) {
    if (item.url) {
      return item.url;
    }
    if (item.permalink) {
      return item.permalink;
    }
    return null;
  }

  function normalizeDate(dateValue, fallbackYear) {
    if (dateValue) {
      const parsed = new Date(dateValue);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    if (fallbackYear) {
      const parsed = new Date(`${fallbackYear}-01-01T00:00:00Z`);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    return null;
  }

  function truncate(text, length) {
    if (!text) {
      return '';
    }
    if (text.length <= length) {
      return text;
    }
    return `${text.slice(0, length - 1).trim()}…`;
  }

  function normalizeItem(item, type) {
    const copy = { ...item };
    copy.__type = type;
    copy.__url = determineUrl(copy);
    copy.__title = pickTitle(copy);
    copy.__summary = truncate(pickSummary(copy), 140);
    copy.__date = normalizeDate(copy.date, copy.year) || normalizeDate(copy.published_at, copy.year) || normalizeDate(copy.updated_at, copy.year) || normalizeDate(copy.created_at, copy.year);
    copy.__sortValue = copy.__date ? copy.__date.getTime() : 0;
    copy.__isoDate = copy.__date ? copy.__date.toISOString() : '';
    copy.__displayDate = copy.__date ? dateFormatter.format(copy.__date) : '';
    copy.__badge = typeLabels[type]?.badge || '';
    copy.__label = typeLabels[type]?.label || '';
    return copy;
  }

  function sortByDateDesc(a, b) {
    return (b.__sortValue || 0) - (a.__sortValue || 0);
  }

  function renderCollection(selector, items, options = {}) {
    const el = document.querySelector(selector);
    if (!el) {
      return;
    }
    const { limit, emptyMessage } = options;
    if (!items || items.length === 0) {
      el.innerHTML = emptyMessage ? `<p class="text-muted small mb-0">${escapeHtml(emptyMessage)}</p>` : '';
      return;
    }
    const slice = typeof limit === 'number' ? items.slice(0, limit) : items;
    el.innerHTML = slice.map(renderPreviewCard).join('');
  }

  function renderPreviewCard(item) {
    const title = escapeHtml(item.__title || '');
    const summary = escapeHtml(item.__summary || '');
    const date = escapeHtml(item.__displayDate || '');
    const badge = escapeHtml(item.__badge || '');
    const label = escapeHtml(item.__label || '');
    const classes = ['preview-card', `preview-card--${item.__type}`].join(' ');
    const titleContent = item.__url
      ? `<a class="preview-card__title-link" href="${escapeHtml(item.__url)}">${title}</a>`
      : title;

    return `
      <article class="${classes}">
        <div class="preview-card__meta">
          ${badge ? `<span class="badge rounded-pill bg-primary-subtle text-primary">${badge}</span>` : ''}
          ${date ? `<time class="preview-card__date" datetime="${escapeHtml(item.__isoDate)}">${date}</time>` : ''}
        </div>
        <h4 class="preview-card__title">${titleContent}</h4>
        ${summary ? `<p class="preview-card__summary text-muted mb-0">${summary}</p>` : ''}
        ${label ? `<span class="visually-hidden">${label}</span>` : ''}
      </article>
    `;
  }

  function mergeAndSort(arrays) {
    return arrays.flat().sort(sortByDateDesc);
  }

  function renderUnifiedTimeline(selector, items, limit, emptyMessage) {
    const el = document.querySelector(selector);
    if (!el) {
      return;
    }
    if (!items || items.length === 0) {
      el.innerHTML = emptyMessage ? `<p class="text-muted small mb-0">${escapeHtml(emptyMessage)}</p>` : '';
      return;
    }
    const slice = typeof limit === 'number' ? items.slice(0, limit) : items;
    el.innerHTML = slice.map(renderTimelineItem).join('');
  }

  function renderTimelineItem(item) {
    const title = escapeHtml(item.__title || '');
    const summary = escapeHtml(item.__summary || '');
    const badge = escapeHtml(item.__label || item.__type || '');
    const date = escapeHtml(item.__displayDate || '');
    const url = item.__url ? escapeHtml(item.__url) : null;
    const titleMarkup = url
      ? `<a class="timeline-item__title-link" href="${url}">${title}</a>`
      : title;

    return `
      <article class="timeline-item timeline-item--${item.__type}">
        <div class="timeline-item__indicator" aria-hidden="true"></div>
        <div class="timeline-item__body">
          <div class="timeline-item__header">
            ${badge ? `<span class="badge rounded-pill bg-secondary-subtle text-secondary">${badge}</span>` : ''}
            ${date ? `<time class="timeline-item__date" datetime="${escapeHtml(item.__isoDate)}">${date}</time>` : ''}
          </div>
          <h4 class="timeline-item__title">${titleMarkup}</h4>
          ${summary ? `<p class="timeline-item__summary text-muted mb-0">${summary}</p>` : ''}
        </div>
      </article>
    `;
  }

  function setupShowAll(buttonSelector, containerSelector, dataset, emptyMessage) {
    const button = document.querySelector(buttonSelector);
    if (!button) {
      return;
    }
    if (!dataset || dataset.length <= PREVIEW_LIMIT) {
      button.classList.add('d-none');
      return;
    }
    button.addEventListener('click', () => {
      renderCollection(containerSelector, dataset, { emptyMessage });
      button.remove();
    });
  }

  function setupTimelineShowAll(buttonSelector, dataset) {
    const button = document.querySelector(buttonSelector);
    if (!button) {
      return;
    }
    if (!dataset || dataset.length <= TIMELINE_LIMIT) {
      button.classList.add('d-none');
      return;
    }
    button.addEventListener('click', () => {
      renderUnifiedTimeline(selectors.timeline, dataset, undefined, emptyMessages.timeline);
      button.remove();
    });
  }

  function normalizeCollection(items, type) {
    if (!Array.isArray(items)) {
      return [];
    }
    return items.map((item) => normalizeItem(item, type)).sort(sortByDateDesc);
  }

  async function loadData() {
    const [worksRaw, postsRaw, logsRaw] = await Promise.all([
      safeFetchJSON(endpoints.works),
      safeFetchJSON(endpoints.posts),
      safeFetchJSON(endpoints.logbook)
    ]);

    state.works = normalizeCollection(worksRaw, 'work');
    state.posts = normalizeCollection(postsRaw, 'post');
    state.logbook = normalizeCollection(logsRaw, 'log');

    renderCollection(selectors.works, state.works, { limit: PREVIEW_LIMIT, emptyMessage: emptyMessages.works });
    renderCollection(selectors.posts, state.posts, { limit: PREVIEW_LIMIT, emptyMessage: emptyMessages.posts });
    renderCollection(selectors.logbook, state.logbook, { limit: PREVIEW_LIMIT, emptyMessage: emptyMessages.logbook });

    setupShowAll('#show-all-works', selectors.works, state.works, emptyMessages.works);
    setupShowAll('#show-all-posts', selectors.posts, state.posts, emptyMessages.posts);
    setupShowAll('#show-all-logbook', selectors.logbook, state.logbook, emptyMessages.logbook);

    state.timeline = mergeAndSort([state.works, state.posts, state.logbook]);
    renderUnifiedTimeline(selectors.timeline, state.timeline, TIMELINE_LIMIT, emptyMessages.timeline);
    setupTimelineShowAll('#show-all-timeline', state.timeline);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadData);
  } else {
    loadData();
  }
})();
