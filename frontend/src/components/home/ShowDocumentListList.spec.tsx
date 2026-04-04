import { test, expect } from "@playwright/experimental-ct-react";
import ShowDocumentListList from "./ShowDocumentListList";

test.describe("ShowDocumentListList", () => {
  test("renders title and content", async ({ mount }) => {
    const component = await mount(
      <ShowDocumentListList
        documents={{
          id: 1,
          title: "Data Protection and Privacy Act",
          content: "Protects personal data and privacy rights.",
        }}
      />
    );

    await expect(component).toContainText("Data Protection and Privacy Act");
    await expect(component).toContainText(
      "Protects personal data and privacy rights."
    );
    await expect(component).toHaveScreenshot("document-list.png");
  });

//   test("matches visual snapshot", async ({ mount }) => {
//     const component = await mount(
//       <div style={{ padding: "24px", width: "900px", background: "white" }}>
//         <ShowDocumentListList
//           documents={{
//             id: 1,
//             title: "Consumer Rights Act",
//             content: "Defines consumer protections and obligations.",
//           }}
//         />
//       </div>
//     );

//     await expect(component).toHaveScreenshot("document-list.png");
//   });
});