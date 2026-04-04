import { test, expect } from "@playwright/test";

test("user can search and see response", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Search for legal documents...").fill("Data Protection & Privacy Act");
  await page.getByRole("button", { name: 'Search' }).click();

  await expect(page.getByText(/relevant legal document/i)).toBeVisible();
});