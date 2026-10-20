import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173";
const serverCommand = process.env.PLAYWRIGHT_SERVER_COMMAND ?? "npm run start";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    baseURL,
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } }
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } }
    }
  ],
  webServer: {
    command: serverCommand,
    url: `${baseURL}/index.html`,
    reuseExistingServer: true,
    stdout: "ignore",
    stderr: "pipe"
  }
});
