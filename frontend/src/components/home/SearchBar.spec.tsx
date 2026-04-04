import { test, expect } from "@playwright/experimental-ct-react";
import SearchBar from "./SearchBar";

test.describe("SearchBar", () => {
  test("renders input and search button", async ({ mount }) => {
    const component = await mount(
      <SearchBar isLoading={false} onSearch={() => {}} />
    );

    await expect(
      component.getByPlaceholder("Search for legal documents...")
    ).toBeVisible();

    await expect(
      component.getByRole("button", { name: "Search" })
    ).toBeVisible();
  });

  test("submits typed text on button click", async ({ mount }) => {
    let submitted = "";

    const component = await mount(
      <SearchBar
        isLoading={false}
        onSearch={(value) => {
          submitted = value;
        }}
      />
    );

    await component
      .getByPlaceholder("Search for legal documents...")
      .fill("privacy");

    await component.getByRole("button", { name: "Search" }).click();

    expect(submitted).toBe("privacy");
  });

  test("submits typed text on Enter", async ({ mount }) => {
    let submitted = "";

    const component = await mount(
      <SearchBar
        isLoading={false}
        onSearch={(value) => {
          submitted = value;
        }}
      />
    );

    const input = component.getByPlaceholder("Search for legal documents...");
    await input.fill("contract law");
    await input.press("Enter");

    expect(submitted).toBe("contract law");
  });

  test("matches visual snapshot", async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: "24px", width: "760px", background: "white" }}>
        <SearchBar isLoading={false} onSearch={() => {}} />
      </div>
    );

    await expect(component).toHaveScreenshot("search-bar.png");
  });
});