import { test, expect } from "@playwright/experimental-ct-react";
import LoadingIndicator from "./LoadingIndicator";

test.describe("LoadingIndicator", () => {
  test("renders loading text", async ({ mount }) => {
    const component = await mount(<LoadingIndicator />);
    await expect(component).toContainText("Searching legal documents...");
  });

  test("matches visual snapshot", async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: "24px", width: "420px", background: "white" }}>
        <LoadingIndicator />
      </div>
    );

    await expect(component).toHaveScreenshot("loading-indicator.png");
  });
});