import { defineConfig, devices } from "@playwright/experimental-ct-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  testDir: "./src",
  testMatch: ["**/*.spec.tsx"],
  fullyParallel: true,
  retries: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    trace: "on-first-retry",
    ctPort: 3100,
    viewport: { width: 1280, height: 720 },
    ctViteConfig: {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});