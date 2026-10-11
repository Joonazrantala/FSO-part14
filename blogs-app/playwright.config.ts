import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 10000, // 10 seconds per test

  expect: {
    timeout: 3000, // 3 seconds for assertions
  },
  use: {
    baseURL: "http://localhost:3000",
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
