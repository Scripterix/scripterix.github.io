import { expect, test } from "@playwright/test";

const navigationLabels = ["Start", "Kompetencje", "Projekty", "LAB", "Współpraca", "Kontakt"];

test("home renders the Scripterix navigation and primary content", async ({ page }) => {
  await page.goto("/index.html");

  await expect(page).toHaveTitle(/Scripterix Studio/);
  await expect(page.locator("[data-nav-target] > .nav-item")).toHaveCount(navigationLabels.length);
  await expect(page.locator("[data-nav-target] .dropdown-item")).toHaveCount(0);
  await expect(page.locator("[data-search-open]")).toHaveCount(0);
  await expect(page.locator("[data-nav-target] .nav-link")).toHaveText(navigationLabels);
  await expect(page.locator(".navbar-brand")).toContainText("Scripterix Studio");
  await expect(page.locator("h1")).toBeVisible();
});

test("home preserves the approved content and visual structure", async ({ page }) => {
  await page.goto("/index.html");

  await expect(page.locator("h1")).toHaveText("Naprawiam kod. Automatyzuję pracę. Buduję aplikacje.");
  await expect(page.locator(".service-card")).toHaveCount(3);
  await expect(page.locator('[data-agent-card="project-agentic-studio"]')).toContainText("Projekt własny");
  await expect(page.locator(".demo-card .project-kind")).toHaveText([
    "Demonstrator / część Agentic Studio", "Demonstrator / część Agentic Studio"
  ]);
  await expect(page.locator('[data-agent-card="lab-001"]')).toContainText("Hipoteza / przed prototypem");
  await expect(page.locator("[data-page-tags]")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Napisz do mnie" })).toHaveAttribute("href", "mailto:Piotr.adamkowski@gmail.com");
});

test("home links do not expose legacy project pages", async ({ page }) => {
  await page.goto("/index.html");

  await expect(page.locator('a[href^="pages/"]')).toHaveCount(0);
  await expect(page.locator('[data-nav-target] a[href^="#"]')).toHaveCount(navigationLabels.length);

  const hashes = await page.locator('a[href^="#"]').evaluateAll((anchors) => anchors.map((anchor) => anchor.hash));
  for (const hash of new Set(hashes)) {
    await expect(page.locator(hash)).toHaveCount(1);
  }
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

test("Home mobile menu closes after selecting a section", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile collapse behavior");
  await page.goto("/index.html");
  const toggle = page.getByRole("button", { name: "Przełącz nawigację" });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Kontakt", exact: true }).click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#kontakt$/);
  await expect(page.locator("#kontakt")).toBeInViewport();
});

test("navigation remains available when runtime JSON cannot load", async ({ page }) => {
  await page.route("**/data/site.json", (route) => route.abort());
  await page.goto("/index.html");
  await expect(page.locator("[data-nav-target] > .nav-item")).toHaveCount(navigationLabels.length);
  await expect(page.locator('[data-nav-target] a[href="#projekty"]')).toHaveCount(1);
  await expect(page.locator("[data-nav-target] .dropdown-item")).toHaveCount(0);
});
