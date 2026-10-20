import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const screenshotRoot = path.join(process.cwd(), "test-results", "screenshots", "home");

test("captures the current Scripterix Home", async ({ page }, testInfo) => {
  await page.goto("/index.html");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("h1")).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await mkdir(screenshotRoot, { recursive: true });
  await page.screenshot({
    path: path.join(screenshotRoot, `${testInfo.project.name}.png`),
    fullPage: true
  });
});
