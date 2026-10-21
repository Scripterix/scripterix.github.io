const currentPage = document.body.dataset.page || "home";
const isNested = window.location.pathname.includes("/pages/");
const prefix = isNested ? "../" : "";
const pageTagsStorageKey = "codex:v55:page-tags";
const suggestedPageTags = ["ważne", "do rozwoju", "UI", "search", "tech", "asset"];

function resolveHref(href) {
  if (href.startsWith("http") || href.startsWith("#")) {
    return href;
  }

  return `${prefix}${href}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function readPageTags() {
  try {
    const parsed = JSON.parse(localStorage.getItem(pageTagsStorageKey) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    console.warn("Page tags storage unavailable.", error);
    return {};
  }
}

function writePageTags(tagsByPage) {
  localStorage.setItem(pageTagsStorageKey, JSON.stringify(tagsByPage));
}

function normalizeTag(value) {
  return value.trim().replace(/\s+/g, " ").slice(0, 28);
}

function getPageTitle(siteMap, pageId) {
  if (pageId === "home") {
    return "Start";
  }

  const flatNav = siteMap.nav.flatMap((item) => [item, ...(item.children || [])]);
  const pageItem = [...siteMap.pages, ...flatNav].find((item) => item.page === pageId);
  return pageItem ? pageItem.label || pageItem.title : pageId;
}

function getTagsForPage(tagsByPage, pageId) {
  return Array.isArray(tagsByPage[pageId]) ? tagsByPage[pageId] : [];
}

function createPageTagPanel(siteMap) {
  if (currentPage === "home") {
    return;
  }

  if (document.querySelector("[data-page-tags]")) {
    return;
  }

  const heroContainer = document.querySelector(".page-hero .container, .hero .container");
  if (!heroContainer) {
    return;
  }

  const pageTitle = getPageTitle(siteMap, currentPage);
  heroContainer.insertAdjacentHTML("beforeend", `
    <aside class="page-tags-panel" data-page-tags data-agent-card="page-tags">
      <div class="page-tags-head">
        <div>
          <span class="search-result-meta">Local tags / ${escapeHtml(pageTitle)}</span>
          <h2>Moje tagi strony</h2>
        </div>
        <span class="page-tags-storage">localStorage</span>
      </div>
      <div class="page-tags-list" data-page-tags-list aria-live="polite"></div>
      <form class="page-tags-form" data-page-tags-form>
        <label class="visually-hidden" for="pageTagInput">Dodaj tag</label>
        <input id="pageTagInput" type="text" maxlength="28" placeholder="Dodaj tag..." autocomplete="off" data-page-tags-input>
        <button class="btn btn-dark" type="submit">
          <i class="bi bi-plus-lg me-1" aria-hidden="true"></i>Dodaj
        </button>
      </form>
      <div class="page-tags-suggestions" data-page-tags-suggestions></div>
    </aside>
  `);
}

function bindPageTags(siteMap) {
  createPageTagPanel(siteMap);

  const panel = document.querySelector("[data-page-tags]");
  const list = document.querySelector("[data-page-tags-list]");
  const form = document.querySelector("[data-page-tags-form]");
  const input = document.querySelector("[data-page-tags-input]");
  const suggestions = document.querySelector("[data-page-tags-suggestions]");

  if (!panel || !list || !form || !input || !suggestions) {
    return;
  }

  const render = () => {
    const tagsByPage = readPageTags();
    const tags = getTagsForPage(tagsByPage, currentPage);

    list.innerHTML = tags.length
      ? tags.map((tag) => `
        <span class="page-tag-chip">
          ${escapeHtml(tag)}
          <button type="button" aria-label="Usuń tag ${escapeHtml(tag)}" data-page-tag-remove="${escapeHtml(tag)}">
            <i class="bi bi-x" aria-hidden="true"></i>
          </button>
        </span>
      `).join("")
      : `<span class="page-tags-empty">Brak lokalnych tagów dla tej strony.</span>`;

    suggestions.innerHTML = suggestedPageTags
      .filter((tag) => !tags.includes(tag))
      .map((tag) => `<button type="button" data-page-tag-add="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
      .join("");
  };

  const saveTag = (rawTag) => {
    const tag = normalizeTag(rawTag);
    if (!tag) {
      return;
    }

    const tagsByPage = readPageTags();
    const tags = getTagsForPage(tagsByPage, currentPage);
    const exists = tags.some((item) => normalizeSearchText(item) === normalizeSearchText(tag));

    if (!exists) {
      tagsByPage[currentPage] = [...tags, tag];
      writePageTags(tagsByPage);
      window.dispatchEvent(new CustomEvent("page-tags-updated"));
    }

    input.value = "";
    render();
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveTag(input.value);
  });

  panel.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-page-tag-add]");
    const removeButton = event.target.closest("[data-page-tag-remove]");

    if (addButton) {
      saveTag(addButton.dataset.pageTagAdd || "");
      return;
    }

    if (removeButton) {
      const tag = removeButton.dataset.pageTagRemove;
      const tagsByPage = readPageTags();
      tagsByPage[currentPage] = getTagsForPage(tagsByPage, currentPage).filter((item) => item !== tag);
      if (!tagsByPage[currentPage].length) {
        delete tagsByPage[currentPage];
      }
      writePageTags(tagsByPage);
      window.dispatchEvent(new CustomEvent("page-tags-updated"));
      render();
    }
  });

  render();
}

function enrichSearchIndexWithPageTags(index) {
  const tagsByPage = readPageTags();

  return index.map((item) => {
    const userTags = getTagsForPage(tagsByPage, item.page);
    return {
      ...item,
      userTags,
      topics: [...(item.topics || [])]
    };
  });
}

function renderPageGrid(siteMap) {
  const grid = document.querySelector("[data-page-grid]");
  if (!grid) {
    return;
  }

  grid.innerHTML = siteMap.pages.map((item) => `
    <div class="col-md-6 col-xl-4 fade-in">
      <a class="page-card d-block text-decoration-none" href="${resolveHref(item.href)}" data-agent-card="page-${item.page}">
        <span class="icon-tile ${item.tone}"><i class="bi ${item.icon}" aria-hidden="true"></i></span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </a>
    </div>
  `).join("");
}

function bindFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-filter-card]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.filter;
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      cards.forEach((card) => {
        const visible = value === "all" || card.dataset.filterCard === value;
        card.classList.toggle("d-none", !visible);
      });
    });
  });
}

function normalizeSearchText(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getSearchHaystack(item, mode) {
  const userTags = item.userTags || [];

  if (mode === "context") {
    return [item.title, item.description, item.content, ...userTags].join(" ");
  }

  return [item.title, item.slug, item.description, ...(item.topics || []), ...userTags].join(" ");
}

function createSnippet(item, query, mode) {
  const source = mode === "context" ? item.content : item.description;
  if (!query) {
    return source;
  }

  const normalizedSource = normalizeSearchText(source);
  const normalizedQuery = normalizeSearchText(query);
  const index = normalizedSource.indexOf(normalizedQuery);

  if (index < 0) {
    return source;
  }

  const start = Math.max(0, index - 58);
  const end = Math.min(source.length, index + normalizedQuery.length + 92);
  const prefixText = start > 0 ? "..." : "";
  const suffixText = end < source.length ? "..." : "";

  return `${prefixText}${source.slice(start, end)}${suffixText}`;
}

function filterSearchIndex(index, query, mode) {
  const normalizedQuery = normalizeSearchText(query.trim());

  if (!normalizedQuery) {
    return index;
  }

  return index.filter((item) => normalizeSearchText(getSearchHaystack(item, mode)).includes(normalizedQuery));
}

function renderResultCards(results, query, mode) {
  return results.map((item) => `
    <a class="search-result-card text-decoration-none" href="${resolveHref(item.href)}" data-agent-card="search-result-${item.page}">
      <span class="search-result-meta">${escapeHtml(item.slug)} - ${escapeHtml(mode)}</span>
      <h2>${escapeHtml(item.title)}</h2>
      <p>${escapeHtml(createSnippet(item, query, mode))}</p>
      <div class="topic-row">
        ${(item.topics || []).map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}
        ${(item.userTags || []).map((tag) => `<span class="user-topic"><i class="bi bi-tag me-1" aria-hidden="true"></i>${escapeHtml(tag)}</span>`).join("")}
      </div>
    </a>
  `).join("");
}

function renderSearchEmpty() {
  return `
    <div class="search-empty" data-agent-card="search-empty">
      <i class="bi bi-search" aria-hidden="true"></i>
      <h2>Brak wyników</h2>
      <p>Spróbuj krótszego hasła albo przełącz tryb między topics i context.</p>
    </div>
  `;
}

function renderSearchResults(index) {
  const resultsTarget = document.querySelector("[data-search-results]");
  if (!resultsTarget) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") || "";
  const mode = params.get("mode") === "context" ? "context" : "topics";
  const queryInput = document.querySelector("[data-search-query]");
  const countTarget = document.querySelector("[data-search-count]");
  const modeInput = document.querySelector(`[data-search-mode][value="${mode}"]`);

  if (queryInput) {
    queryInput.value = query;
  }

  if (modeInput) {
    modeInput.checked = true;
  }

  const searchableIndex = enrichSearchIndexWithPageTags(index);
  const results = filterSearchIndex(searchableIndex, query, mode);

  if (countTarget) {
    countTarget.textContent = `${results.length} wyników`;
  }

  if (!results.length) {
    resultsTarget.innerHTML = renderSearchEmpty();
    return;
  }

  resultsTarget.innerHTML = renderResultCards(results, query, mode);
}

function bindSearchForm() {
  const form = document.querySelector("[data-search-form]");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const query = (formData.get("q") || "").toString().trim();
    const mode = (formData.get("mode") || "topics").toString();
    const nextParams = new URLSearchParams();

    if (query) {
      nextParams.set("q", query);
    }

    nextParams.set("mode", mode);
    window.location.href = `${form.getAttribute("action")}?${nextParams.toString()}`;
  });
}

function ensureSearchModal() {
  if (document.querySelector("[data-global-search-modal]")) {
    return;
  }

  document.body.insertAdjacentHTML("beforeend", `
    <div class="global-search-modal" data-global-search-modal aria-hidden="true">
      <button class="global-search-backdrop" type="button" aria-label="Zamknij wyszukiwarkę" data-search-close></button>
      <section class="global-search-dialog" role="dialog" aria-modal="true" aria-labelledby="globalSearchTitle" data-agent-card="global-search-modal">
        <header class="global-search-header">
          <div>
            <span class="search-result-meta">Search / topics + context</span>
            <h2 id="globalSearchTitle">Wyszukiwarka</h2>
          </div>
          <button class="global-search-close" type="button" aria-label="Zamknij" data-search-close>
            <i class="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </header>
        <form class="search-form global-search-form" action="${resolveHref("pages/search-result.html")}" data-modal-search-form>
          <label class="visually-hidden" for="globalSearchQuery">Szukaj</label>
          <div class="search-input-row">
            <input id="globalSearchQuery" name="q" type="search" placeholder="name search..." autocomplete="off" data-modal-search-query>
            <button class="btn btn-dark" type="submit">
              <span class="drawn-search-icon drawn-search-icon-light" aria-hidden="true"></span>Szukaj
            </button>
          </div>
          <div class="search-mode-row" aria-label="Tryb wyszukiwania">
            <label>
              <input type="radio" name="mode" value="topics" data-modal-search-mode checked>
              <span>Topics</span>
            </label>
            <label>
              <input type="radio" name="mode" value="context" data-modal-search-mode>
              <span>Context</span>
            </label>
            <strong data-modal-search-count>0 wyników</strong>
          </div>
        </form>
        <div class="search-results-list global-search-results" data-modal-search-results></div>
        <a class="global-search-all text-decoration-none" href="${resolveHref("pages/search-result.html")}?mode=topics" data-modal-search-all>
          Zobacz wszystkie wyniki
        </a>
      </section>
    </div>
  `);
}

function bindGlobalSearch(index) {
  const modal = document.querySelector("[data-global-search-modal]");
  const openButtons = document.querySelectorAll("[data-search-open]");
  const form = document.querySelector("[data-modal-search-form]");
  const input = document.querySelector("[data-modal-search-query]");
  const resultsTarget = document.querySelector("[data-modal-search-results]");
  const countTarget = document.querySelector("[data-modal-search-count]");
  const allResultsLink = document.querySelector("[data-modal-search-all]");
  const closeButtons = document.querySelectorAll("[data-search-close]");

  if (!modal || !openButtons.length || !form || !input || !resultsTarget || !countTarget || !allResultsLink) {
    return;
  }

  let lastOpenButton = openButtons[0];

  const getMode = () => {
    const checked = document.querySelector("[data-modal-search-mode]:checked");
    return checked ? checked.value : "topics";
  };

  const updateModalResults = () => {
    const query = input.value.trim();
    const mode = getMode();
    const searchableIndex = enrichSearchIndexWithPageTags(index);
    const results = filterSearchIndex(searchableIndex, query, mode);
    const params = new URLSearchParams();

    if (query) {
      params.set("q", query);
    }

    params.set("mode", mode);
    allResultsLink.href = `${form.getAttribute("action")}?${params.toString()}`;
    countTarget.textContent = `${results.length} wyników`;
    resultsTarget.innerHTML = results.length
      ? renderResultCards(results.slice(0, 5), query, mode)
      : renderSearchEmpty();
  };

  const openModal = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("search-modal-open");
    updateModalResults();
    window.setTimeout(() => input.focus(), 30);
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-modal-open");
    lastOpenButton.focus();
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      lastOpenButton = button;
      openModal();
    });
  });
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  input.addEventListener("input", updateModalResults);
  window.addEventListener("page-tags-updated", updateModalResults);
  document.querySelectorAll("[data-modal-search-mode]").forEach((radio) => {
    radio.addEventListener("change", updateModalResults);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = allResultsLink.href;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

async function loadSearchIndex() {
  try {
    const response = await fetch(`${prefix}data/search-index.json`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Cannot load search index: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn("Search index unavailable.", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const siteMap = await window.navigationReady;
  renderPageGrid(siteMap);
  ensureSearchModal();
  bindFilters();
  bindPageTags(siteMap);
  bindSearchForm();

  if (document.querySelector("[data-search-results]") || document.querySelector("[data-global-search-modal]")) {
    const searchIndex = await loadSearchIndex();
    renderSearchResults(searchIndex);
    bindGlobalSearch(searchIndex);
    window.addEventListener("page-tags-updated", () => renderSearchResults(searchIndex));
  }
});
