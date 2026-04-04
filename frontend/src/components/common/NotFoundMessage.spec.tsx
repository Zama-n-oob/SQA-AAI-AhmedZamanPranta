import { test, expect } from "@playwright/experimental-ct-react";
import NotFoundMessage from "./NotFoundMessage";

test.describe("NotFoundMessage", () => {
  test("renders query in the message", async ({ mount }) => {
    const component = await mount(<NotFoundMessage query="privacy" />);
    await expect(component).toContainText('No documents found matching "privacy"');
  });

  test("matches visual snapshot", async ({ mount }) => {
    const component = await mount(
      <div style={{ padding: "24px", width: "900px", background: "white" }}>
        <NotFoundMessage query="nonexistent law 12345" />
      </div>
    );

    await expect(component).toHaveScreenshot("not-found-message.png");
  });
});