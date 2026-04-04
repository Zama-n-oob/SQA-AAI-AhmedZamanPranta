import { test, expect } from "@playwright/experimental-ct-react";
import HomePage from "./HomePage";
import TestProviders from "@/test/TestProviders";

const successResponse = {
  success: true,
  status: 200,
  message: "Search completed successfully",
  data: {
    summary:
      "Found 2 relevant legal document(s): Data Protection and Privacy Act, Consumer Rights Act.",
    matched_docs: [
      {
        id: 1,
        title: "Data Protection and Privacy Act",
        content: "Protects personal data and privacy rights.",
      },
      {
        id: 2,
        title: "Consumer Rights Act",
        content: "Defines consumer protections and obligations.",
      },
    ],
  },
};

test.describe("HomePage integration", () => {
  test("renders search UI", async ({ mount }) => {
    const component = await mount(
      <TestProviders>
        <HomePage />
      </TestProviders>
    );

    await expect(
      component.getByPlaceholder("Search for legal documents...")
    ).toBeVisible();

    await expect(
      component.getByRole("button", { name: "Search" })
    ).toBeVisible();
  });

  test("submits query and renders backend response", async ({ mount, page }) => {
    await page.route("**/generate", async (route) => {
      const body = route.request().postDataJSON() as { query?: string };
      expect(body.query).toBe("privacy");

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(successResponse),
      });
    });

    const component = await mount(
      <TestProviders>
        <HomePage />
      </TestProviders>
    );

    await component
      .getByPlaceholder("Search for legal documents...")
      .fill("privacy");

    await component.getByRole("button", { name: "Search" }).click();

    await expect(component).toContainText(
      "Found 2 relevant legal document"
    );
    await expect(component).toContainText(
      "Data Protection and Privacy Act"
    );
    await expect(component).toContainText("Consumer Rights Act");
  });

  test("shows not found message when backend returns no matches", async ({
    mount,
    page,
  }) => {
    await page.route("**/generate", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          status: 200,
          message: "Search completed successfully",
          data: {
            summary: "No relevant legal documents found.",
            matched_docs: [],
          },
        }),
      });
    });

    const component = await mount(
      <TestProviders>
        <HomePage />
      </TestProviders>
    );

    await component
      .getByPlaceholder("Search for legal documents...")
      .fill("zzzz");

    await component.getByRole("button", { name: "Search" }).click();

    await expect(component).toContainText(
      'No documents found matching "zzzz"'
    );
  });

  test("shows loading indicator while request is in flight", async ({
    mount,
    page,
  }) => {
    await page.route("**/generate", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 600));

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(successResponse),
      });
    });

    const component = await mount(
      <TestProviders>
        <HomePage />
      </TestProviders>
    );

    await component
      .getByPlaceholder("Search for legal documents...")
      .fill("privacy");

    await component.getByRole("button", { name: "Search" }).click();

    await expect(component).toContainText("Searching legal documents...");
    await expect(component).toContainText(
      "Data Protection and Privacy Act"
    );
  });

  test("shows error message on failed API response", async ({ mount, page }) => {
    await page.route("**/generate", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ detail: "Internal server error" }),
      });
    });

    const component = await mount(
      <TestProviders>
        <HomePage />
      </TestProviders>
    );

    await component
      .getByPlaceholder("Search for legal documents...")
      .fill("privacy");

    await component.getByRole("button", { name: "Search" }).click();

    await expect(component).toContainText("Error");
  });

  test("matches visual snapshot after successful search", async ({
    mount,
    page,
  }) => {
    await page.route("**/generate", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(successResponse),
      });
    });

    const component = await mount(
      <div style={{ width: "1200px", padding: "24px", background: "white" }}>
        <TestProviders>
          <HomePage />
        </TestProviders>
      </div>
    );

    await component
      .getByPlaceholder("Search for legal documents...")
      .fill("privacy");

    await component.getByRole("button", { name: "Search" }).click();

    await expect(component).toContainText("Consumer Rights Act");
    await expect(component).toHaveScreenshot("home-page-results.png");
  });
});