import { expect, test } from "@playwright/test";

const navigationLabels = ["Start", "Usługi", "Portfolio", "LAB", "Kontakt"];

test("home renders the current navigation and primary content", async ({ page }) => {
  await page.goto("/index.html");

  await expect(page).toHaveTitle(/Scripterix Studio/);
  await expect(page.locator("[data-nav-target] .nav-link")).toHaveText(navigationLabels);
  await expect(page.locator("[data-nav-target] .dropdown-item")).toHaveText(["Portfolio", "Projekty"]);

  // Desktop i mobile mają osobne przyciski otwierające ten sam modal.
  const searchButtons = page.locator("[data-search-open]");
  await expect(searchButtons).toHaveCount(2);
  await expect(searchButtons.filter({ visible: true })).toHaveCount(1);

  await expect(page.locator(".navbar-brand")).toContainText("Scripterix Studio");
  await expect(page.locator("h1")).toHaveText("Naprawiam kod. Automatyzuję pracę. Buduję aplikacje.");
  await expect(page.locator(".process-grid > li")).toHaveCount(4);
  await expect(page.getByRole("link", { name: "Porozmawiajmy" })).toHaveAttribute("href", "pages/kontakt.html");
});


test("navigation points only to current Studio pages", async ({ page }, testInfo) => {
  await page.goto("/index.html");

  const navigation = page.locator("[data-nav-target]");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Przełącz nawigację" }).click();
    await expect(page.locator("#mainNav")).toHaveClass(/show/);
  }

  const portfolioToggle = navigation.getByRole("button", { name: "Portfolio", exact: true });
  await expect(portfolioToggle).toHaveAttribute("aria-expanded", "false");
  if (testInfo.project.name === "mobile") {
    await portfolioToggle.click();
    await expect(portfolioToggle).toHaveAttribute("aria-expanded", "true");
    await expect(navigation.locator("[data-nav-submenu]")).toHaveClass(/show/);
  }

  const hrefs = await navigation.locator(".nav-link[href]").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(hrefs).toEqual([
    "#start",
    "pages/uslugi.html",
    "pages/lab.html",
    "pages/kontakt.html"
  ]);
  await expect(navigation.locator(".dropdown-item-parent")).toHaveAttribute("href", "pages/portfolio.html");
  await expect(navigation.locator(".dropdown-item").filter({ hasText: "Projekty" })).toHaveAttribute("href", "pages/portfolio/projekty/index.html");
});

test("home has no console errors, failed local requests or broken images", async ({ page }) => {
  const consoleErrors = [];
  const failedRequests = [];
  const badResponses = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => failedRequests.push(request.url()));
  page.on("response", (response) => {
    if (response.url().startsWith("http://127.0.0.1") && response.status() >= 400) {
      badResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/index.html", { waitUntil: "networkidle" });
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
  }

  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
  expect(badResponses).toEqual([]);
});

test("mobile menu closes after selecting the Home section", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile collapse behavior");
  await page.goto("/index.html");
  const toggle = page.getByRole("button", { name: "Przełącz nawigację" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Start", exact: true }).click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#start$/);
});

for (const currentPage of [
  { path: "/pages/uslugi.html", title: "Usługi | Scripterix Studio", label: "Usługi" },
  { path: "/pages/portfolio.html", title: "Portfolio | Scripterix Studio", label: "Portfolio" },
  { path: "/pages/lab.html", title: "LAB | Scripterix Studio", label: "LAB" },
  { path: "/pages/kontakt.html", title: "Kontakt | Scripterix Studio", label: "Kontakt" }
]) {
  test(`${currentPage.label} uses the current Studio shell`, async ({ page }) => {
    await page.goto(currentPage.path);

    await expect(page).toHaveTitle(currentPage.title);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".navbar-brand")).toContainText("Scripterix Studio");
    await expect(page.locator("[data-nav-target] .nav-link")).toHaveText(navigationLabels);
    await expect(page.locator("[data-nav-target] a", { hasText: currentPage.label })).toHaveAttribute("aria-current", "page");
    await expect(page.locator("[data-page-tags]")).toHaveCount(0);
  });
}

test("search modal filters the current Studio index", async ({ page }, testInfo) => {
  await page.goto("/pages/portfolio.html");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Przełącz nawigację" }).click();
    await expect(page.locator("#mainNav")).toHaveClass(/show/);
  }
  await page.getByRole("button", { name: "Otwórz wyszukiwarkę" }).click();

  const modal = page.locator("[data-global-search-modal]");
  await expect(modal).toHaveAttribute("aria-hidden", "false");
  await modal.locator("[data-modal-search-query]").fill("hipoteza");
  await expect(modal.locator("[data-modal-search-count]")).toHaveText("0 wyników");
  await modal.getByText("Treść", { exact: true }).click();
  await expect(modal.locator("[data-modal-search-count]")).toHaveText("1 wyników");
  await expect(modal.locator('[data-agent-card="search-result-lab"]')).toBeVisible();
  await modal.getByText("Tematy", { exact: true }).click();
  await modal.locator("[data-modal-search-query]").fill("Agentic Studio");
  await expect(modal.locator("[data-modal-search-count]")).toHaveText("1 wyników");
  await expect(modal.locator('[data-agent-card="search-result-portfolio"]')).toBeVisible();
  await expect(modal.locator("[data-modal-search-results] [data-agent-card^='search-result-']")).toHaveCount(1);

  await page.keyboard.press("Escape");
  await expect(modal).toHaveAttribute("aria-hidden", "true");
});

test("search supports empty results, keyboard and result links", async ({ page }, testInfo) => {
  await page.goto("/index.html");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Przełącz nawigację" }).click();
    await expect(page.locator("#mainNav")).toHaveClass(/show/);
  }

  const opener = page.getByRole("button", { name: "Otwórz wyszukiwarkę" });
  await opener.click();
  const modal = page.locator("[data-global-search-modal]");
  const input = modal.locator("[data-modal-search-query]");
  await expect(input).toBeFocused();
  await input.fill("brak-takiej-strony");
  await expect(modal.locator("[data-modal-search-count]")).toHaveText("0 wyników");
  await expect(modal.locator('[data-agent-card="search-empty"]')).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(modal).toHaveAttribute("aria-hidden", "true");
  await expect(opener).toBeFocused();

  await opener.click();
  await input.fill("Agentic Studio");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/pages\/search-result\.html\?q=Agentic\+Studio&mode=topics$/);
  const resultLink = page.locator('[data-agent-card="search-result-portfolio"]');
  await expect(resultLink).toHaveAttribute("href", "../pages/portfolio.html");
  await resultLink.click();
  await expect(page).toHaveURL(/\/pages\/portfolio\.html$/);
});

test("search results page renders a filtered query", async ({ page }) => {
  await page.goto("/pages/search-result.html?q=automatyzacje&mode=topics");

  await expect(page).toHaveTitle("Wyniki wyszukiwania | Scripterix Studio");
  await expect(page.locator("[data-search-query]")).toHaveValue("automatyzacje");
  await expect(page.locator("[data-search-count]")).toHaveText("2 wyników");
  await expect(page.locator("[data-search-results] [data-agent-card^='search-result-']")).toHaveCount(2);
  await expect(page.locator("[data-page-tags]")).toHaveCount(0);
});

test("navigation remains available when runtime JSON cannot load", async ({ page }) => {
  await page.route("**/data/site.json", (route) => route.abort());
  await page.goto("/index.html");

  await expect(page.locator("[data-nav-target] .nav-link")).toHaveText(navigationLabels);
  await expect(page.locator('[data-nav-target] a[href="pages/portfolio.html"]')).toHaveCount(1);

  // Dwa przyciski: desktop i mobile, wspólny mechanizm wyszukiwania.
  const searchButtons = page.locator("[data-search-open]");
  await expect(searchButtons).toHaveCount(2);
  await expect(searchButtons.filter({ visible: true })).toHaveCount(1);
});
