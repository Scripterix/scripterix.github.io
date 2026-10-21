type SearchMode = "topics" | "context";

interface SearchItem {
  page: string;
  title: string;
  href: string;
  slug: string;
  topics: string[];
  description: string;
  content: string;
}

const prefix = window.location.pathname.includes("/pages/") ? "../" : "";
let searchIndexPromise: Promise<SearchItem[]> | undefined;

function resolveHref(href: string): string {
  return href.startsWith("http") || href.startsWith("#") ? href : `${prefix}${href}`;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character] ?? character);
}

function isSearchItem(value: unknown): value is SearchItem {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const item = value as Record<string, unknown>;
  return ["page", "title", "href", "slug", "description", "content"]
    .every((property) => typeof item[property] === "string")
    && Array.isArray(item.topics)
    && item.topics.every((topic) => typeof topic === "string");
}

async function loadSearchIndex(): Promise<SearchItem[]> {
  searchIndexPromise ??= fetch(`${prefix}data/search-index.json`, { cache: "no-store" })
    .then(async (response) => {
      if (!response.ok) throw new Error(`Cannot load search index: ${response.status}`);
      const value: unknown = await response.json();
      if (!Array.isArray(value) || !value.every(isSearchItem)) {
        throw new Error("Cannot load search index: invalid JSON structure");
      }
      return value;
    })
    .catch((error: unknown) => {
      console.warn("Search index unavailable.", error);
      return [];
    });

  return searchIndexPromise;
}

function normalizeSearchText(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filterSearchIndex(index: SearchItem[], query: string, mode: SearchMode): SearchItem[] {
  const normalizedQuery = normalizeSearchText(query.trim());
  if (!normalizedQuery) return index;

  return index.filter((item) => {
    const haystack = mode === "context"
      ? [item.title, item.description, item.content]
      : [item.title, item.slug, item.description, ...item.topics];
    return normalizeSearchText(haystack.join(" ")).includes(normalizedQuery);
  });
}

function createSnippet(item: SearchItem, query: string, mode: SearchMode): string {
  const source = mode === "context" ? item.content : item.description;
  if (!query) return source;

  const matchIndex = normalizeSearchText(source).indexOf(normalizeSearchText(query));
  if (matchIndex < 0) return source;

  const start = Math.max(0, matchIndex - 58);
  const end = Math.min(source.length, matchIndex + query.length + 92);
  return `${start > 0 ? "..." : ""}${source.slice(start, end)}${end < source.length ? "..." : ""}`;
}

function renderResults(results: SearchItem[], query: string, mode: SearchMode): string {
  if (!results.length) {
    return `
      <div class="search-empty" data-agent-card="search-empty">
        <i class="bi bi-search" aria-hidden="true"></i>
        <h2>Brak wyników</h2>
        <p>Spróbuj krótszego hasła albo przełącz tryb między tematami i treścią.</p>
      </div>
    `;
  }

  return results.map((item) => `
    <a class="search-result-card text-decoration-none" href="${resolveHref(item.href)}" data-agent-card="search-result-${escapeHtml(item.page)}">
      <span class="search-result-meta">${escapeHtml(item.slug)} · ${mode === "context" ? "treść" : "tematy"}</span>
      <h2>${escapeHtml(item.title)}</h2>
      <p>${escapeHtml(createSnippet(item, query, mode))}</p>
      <div class="topic-row">${item.topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}</div>
    </a>
  `).join("");
}

function selectedMode(scope: ParentNode, selector: string): SearchMode {
  return scope.querySelector<HTMLInputElement>(`${selector}:checked`)?.value === "context" ? "context" : "topics";
}

function ensureSearchModal(): HTMLElement {
  const existing = document.querySelector<HTMLElement>("[data-global-search-modal]");
  if (existing) return existing;

  document.body.insertAdjacentHTML("beforeend", `
    <div class="global-search-modal" data-global-search-modal aria-hidden="true">
      <button class="global-search-backdrop" type="button" aria-label="Zamknij wyszukiwarkę" data-search-close></button>
      <section class="global-search-dialog" role="dialog" aria-modal="true" aria-labelledby="globalSearchTitle">
        <header class="global-search-header">
          <div><span class="search-result-meta">Wyszukiwanie / tematy + treść</span><h2 id="globalSearchTitle">Wyszukiwarka</h2></div>
          <button class="global-search-close" type="button" aria-label="Zamknij" data-search-close><i class="bi bi-x-lg" aria-hidden="true"></i></button>
        </header>
        <form class="search-form global-search-form" action="${resolveHref("pages/search-result.html")}" data-modal-search-form>
          <label class="visually-hidden" for="globalSearchQuery">Szukaj</label>
          <div class="search-input-row">
            <input id="globalSearchQuery" name="q" type="search" placeholder="Szukaj w Studio..." autocomplete="off" data-modal-search-query>
            <button class="btn btn-dark" type="submit"><span class="drawn-search-icon drawn-search-icon-light" aria-hidden="true"></span>Szukaj</button>
          </div>
          <div class="search-mode-row" aria-label="Tryb wyszukiwania">
            <label><input type="radio" name="mode" value="topics" data-modal-search-mode checked><span>Tematy</span></label>
            <label><input type="radio" name="mode" value="context" data-modal-search-mode><span>Treść</span></label>
            <strong data-modal-search-count>0 wyników</strong>
          </div>
        </form>
        <div class="search-results-list global-search-results" data-modal-search-results></div>
        <a class="global-search-all text-decoration-none" href="${resolveHref("pages/search-result.html")}?mode=topics" data-modal-search-all>Zobacz wszystkie wyniki</a>
      </section>
    </div>
  `);
  return document.querySelector<HTMLElement>("[data-global-search-modal]")!;
}

function bindSearchPage(index: SearchItem[]): void {
  const form = document.querySelector<HTMLFormElement>("[data-search-form]");
  const resultsTarget = document.querySelector<HTMLElement>("[data-search-results]");
  if (!form || !resultsTarget) return;

  const params = new URLSearchParams(window.location.search);
  const query = params.get("q") ?? "";
  const mode: SearchMode = params.get("mode") === "context" ? "context" : "topics";
  const queryInput = form.querySelector<HTMLInputElement>("[data-search-query]");
  const modeInput = form.querySelector<HTMLInputElement>(`[data-search-mode][value="${mode}"]`);
  if (queryInput) queryInput.value = query;
  if (modeInput) modeInput.checked = true;

  const results = filterSearchIndex(index, query, mode);
  const countTarget = form.querySelector<HTMLElement>("[data-search-count]");
  if (countTarget) countTarget.textContent = `${results.length} wyników`;
  resultsTarget.innerHTML = renderResults(results, query, mode);
}

function bindSearchModal(modal: HTMLElement, index: SearchItem[]): void {
  const openButtons = [...document.querySelectorAll<HTMLButtonElement>("[data-search-open]")];
  const form = modal.querySelector<HTMLFormElement>("[data-modal-search-form]");
  const input = modal.querySelector<HTMLInputElement>("[data-modal-search-query]");
  const resultsTarget = modal.querySelector<HTMLElement>("[data-modal-search-results]");
  const countTarget = modal.querySelector<HTMLElement>("[data-modal-search-count]");
  const allResultsLink = modal.querySelector<HTMLAnchorElement>("[data-modal-search-all]");
  if (!openButtons.length || !form || !input || !resultsTarget || !countTarget || !allResultsLink) return;

  let lastOpenButton = openButtons[0];
  const update = () => {
    const query = input.value.trim();
    const mode = selectedMode(modal, "[data-modal-search-mode]");
    const results = filterSearchIndex(index, query, mode);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("mode", mode);
    allResultsLink.href = `${form.action}?${params.toString()}`;
    countTarget.textContent = `${results.length} wyników`;
    resultsTarget.innerHTML = renderResults(results.slice(0, 5), query, mode);
  };
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-modal-open");
    lastOpenButton.focus();
  };

  openButtons.forEach((button) => button.addEventListener("click", () => {
    lastOpenButton = button;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("search-modal-open");
    update();
    window.setTimeout(() => input.focus(), 30);
  }));
  modal.querySelectorAll<HTMLButtonElement>("[data-search-close]").forEach((button) => button.addEventListener("click", close));
  input.addEventListener("input", update);
  modal.querySelectorAll<HTMLInputElement>("[data-modal-search-mode]").forEach((radio) => radio.addEventListener("change", update));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = allResultsLink.href;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) close();
  });
}

export async function initializeSearch(): Promise<void> {
  const modal = ensureSearchModal();
  const index = await loadSearchIndex();
  bindSearchModal(modal, index);
  bindSearchPage(index);
}
