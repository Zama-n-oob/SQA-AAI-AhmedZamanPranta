import { test, expect } from "@playwright/experimental-ct-react";
import ResultsSummary from "./ResultSummary";

test.describe("ResultSummary", () => {
  test("renders summary text", async ({ mount }) => {
    const component = await mount(
      <ResultsSummary summary="Found 1 relevant legal document(s): Data Protection and Privacy Act." />
    );

    await expect(component).toContainText(
      "Found 1 relevant legal document"
    );
  });

  test("matches visual snapshot", async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: "24px", width: "900px", background: "white" }}>
        <ResultsSummary summary="No relevant legal documents found." />
      </div>
    );

    await expect(component).toHaveScreenshot("result-summary.png");
  });
});