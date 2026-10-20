import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

// Run against the local Vite preview to inspect the actual responsive layout.
const browser = await chromium.launch();
const page = await browser.newPage();
const baseURL = process.argv[2] ?? "http://127.0.0.1:4173/";
const errors = [];
const consoleErrors = [];
const failedRequests = [];
const badResponses = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("requestfailed", (request) => failedRequests.push(request.url()));
page.on("response", (response) => {
  if (response.url().startsWith(baseURL) && response.status() >= 400) {
    badResponses.push(`${response.status()} ${response.url()}`);
  }
});
await mkdir("artifacts/home", { recursive: true });
try {
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await page.evaluate(() => document.querySelectorAll("img").forEach((img) => { img.loading = "eager"; }));
    await page.waitForFunction(() => [...document.images].every((img) => img.complete));
    await page.screenshot({ path: `artifacts/home/hero-${width}.png` });
    if (width === 1440 || width === 390) {
      await page.screenshot({ path: `artifacts/home/home-${width}.png`, fullPage: true });
      // Hide fixed UI only in section crops to avoid screenshot scroll artifacts.
      const cropStyle = ".navbar, .skip-link { visibility: hidden !important; }";
      await page.locator("#projekty").screenshot({ path: `artifacts/home/projects-${width}.png`, style: cropStyle });
      await page.locator("#lab").screenshot({ path: `artifacts/home/lab-${width}.png`, style: cropStyle });
    }
    const layout = await page.evaluate(() => {
      const brand = document.querySelector(".navbar-brand").getBoundingClientRect();
      const toggle = document.querySelector(".navbar-toggler").getBoundingClientRect();
      return {
      width: innerWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      headerWrapped: toggle.width > 0 && Math.abs(toggle.top - brand.top) > 16,
      headingLines: [...document.querySelectorAll("h1 > span")].map((span) => {
        const range = document.createRange();
        range.selectNodeContents(span);
        return range.getClientRects().length;
      }),
      brokenImages: [...document.images].filter((img) => !img.naturalWidth).map((img) => img.src)
      };
    });
    console.log(JSON.stringify(layout));
    if (layout.overflow || layout.headerWrapped || layout.brokenImages.length || layout.headingLines.some((lines) => lines !== 1)) process.exitCode = 1;
  }
  console.log(JSON.stringify({ errors, consoleErrors, failedRequests, badResponses }));
  if (errors.length || consoleErrors.length || failedRequests.length || badResponses.length) process.exitCode = 1;
} finally {
  await browser.close();
}
