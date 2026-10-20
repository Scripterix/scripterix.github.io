import type { NavItem, PageItem, SiteMap } from "../core/types";

import fallbackSiteMap from "../../data/site.json";

const currentPage = document.body.dataset.page ?? "home";
const prefix = window.location.pathname.includes("/pages/") ? "../" : "";

declare global {
  interface Window {
    navigationReady: Promise<SiteMap>;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasStringProperties(value: Record<string, unknown>, properties: readonly string[]): boolean {
  return properties.every((property) => typeof value[property] === "string");
}

function isNavItem(value: unknown): value is NavItem {
  if (!isRecord(value) || !hasStringProperties(value, ["label", "href", "page", "icon"])) {
    return false;
  }

  return value.children === undefined || (Array.isArray(value.children) && value.children.every(isNavItem));
}

function isPageItem(value: unknown): value is PageItem {
  return isRecord(value)
    && hasStringProperties(value, ["title", "href", "page", "icon", "tone", "description"]);
}

function isSiteMap(value: unknown): value is SiteMap {
  return isRecord(value)
    && Array.isArray(value.nav)
    && value.nav.every(isNavItem)
    && Array.isArray(value.pages)
    && value.pages.every(isPageItem);
}

export function resolveNavigationHref(href: string): string {
  if (currentPage === "home" && href.startsWith("index.html#")) {
    return href.slice("index.html".length);
  }

  if (href.startsWith("http") || href.startsWith("#")) {
    return href;
  }

  return `${prefix}${href}`;
}

export async function loadSiteMap(): Promise<SiteMap> {
  try {
    const response = await fetch(`${prefix}data/site.json`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Cannot load site map: ${response.status}`);
    }

    const siteMap: unknown = await response.json();
    if (!isSiteMap(siteMap)) {
      throw new Error("Cannot load site map: invalid JSON structure");
    }

    return siteMap;
  } catch (error: unknown) {
    console.warn("Using fallback site map.", error);
    return fallbackSiteMap;
  }
}

export function renderNavigation(siteMap: SiteMap): void {
  const target = document.querySelector<HTMLElement>("[data-nav-target]");
  if (!target) {
    return;
  }

  const navItems = siteMap.nav.map((item) => {
    const children = item.children ?? [];
    const isActive = item.page === currentPage || children.some((child) => child.page === currentPage);
    const activeClass = `${isActive ? " active" : ""}${item.page === "contact" ? " nav-contact" : ""}`;
    const ariaCurrent = isActive ? 'aria-current="page"' : "";

    if (children.length > 0) {
      const dropdownItems = children.map((child) => {
        const isChildActive = child.page === currentPage;
        const childActiveClass = isChildActive ? " active" : "";
        const childAriaCurrent = isChildActive ? 'aria-current="page"' : "";

        return `
          <li>
            <a class="dropdown-item${childActiveClass}" href="${resolveNavigationHref(child.href)}" ${childAriaCurrent}>
              <i class="bi ${child.icon} me-2" aria-hidden="true"></i>${child.label}
            </a>
          </li>
        `;
      }).join("");

      return `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle${activeClass}" href="${resolveNavigationHref(item.href)}" role="button" data-bs-toggle="dropdown" aria-expanded="false" ${ariaCurrent}>
            <i class="bi ${item.icon} me-1" aria-hidden="true"></i>${item.label}
          </a>
          <ul class="dropdown-menu">
            ${dropdownItems}
          </ul>
        </li>
      `;
    }

    return `
      <li class="nav-item">
        <a class="nav-link${activeClass}" href="${resolveNavigationHref(item.href)}" ${ariaCurrent}>
          <i class="bi ${item.icon} me-1" aria-hidden="true"></i>${item.label}
        </a>
      </li>
    `;
  }).join("");

  target.innerHTML = navItems;
}

function bindHomeSectionNavigation(): void {
  if (currentPage !== "home") return;

  const sectionLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-target] a[href^="#"]')];
  const sections = sectionLinks.flatMap((link) => {
    const section = document.querySelector<HTMLElement>(link.hash);
    return section ? [{ link, section }] : [];
  });
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const current = [...sections].reverse().find(({ section }) => section.getBoundingClientRect().top <= 150) ?? sections[0];
    for (const { link } of sections) {
      const active = link === current?.link;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  };
  window.addEventListener("scroll", () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

export async function initializeNavigation(): Promise<SiteMap> {
  const siteMap = await loadSiteMap();
  renderNavigation(siteMap);
  bindHomeSectionNavigation();
  // Close the mobile collapse before following an in-page section link.
  document.querySelector("[data-nav-target]")?.addEventListener("click", (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>("a");
    const menu = document.querySelector<HTMLElement>("#mainNav");
    const toggle = document.querySelector<HTMLButtonElement>(".navbar-toggler");
    if (!link?.hash || link.pathname !== window.location.pathname
      || !menu?.matches(".show, .collapsing") || !toggle) return;

    event.preventDefault();
    menu.addEventListener("hidden.bs.collapse", () => {
      window.location.hash = link.hash;
      document.querySelector(link.hash)?.scrollIntoView({ block: "start" });
    }, { once: true });
    // Bootstrap ignores toggles during its opening animation. Close once shown.
    if (menu.classList.contains("collapsing")) {
      if (toggle.getAttribute("aria-expanded") === "true") {
        menu.addEventListener("shown.bs.collapse", () => toggle.click(), { once: true });
      }
    } else {
      toggle.click();
    }
  });
  return siteMap;
}

window.navigationReady = initializeNavigation();
