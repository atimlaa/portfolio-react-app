// @ts-check
const { defineConfig, devices } = require("@playwright/test");

// Run with: yarn build && yarn test:e2e
module.exports = defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173/portfolio-react-app/",
    trace: "on-first-retry",
    // Optional: point at an installed Chrome instead of Playwright's bundled browser
    launchOptions: process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {},
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "node scripts/serve-build.js",
    url: "http://localhost:4173/portfolio-react-app/",
    reuseExistingServer: !process.env.CI,
  },
});
