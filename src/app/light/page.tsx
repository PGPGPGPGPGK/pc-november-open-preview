import NovemberOpenPreviewPage, { metadata } from "../page";

import "./palette.css";

export const dynamic = "force-static";
export { metadata };

/** Same page and behaviour; the hidden marker scopes only the comparison colours. */
export default function LightColourPreview() {
  return (
    <>
      <span hidden data-preview-palette="light" />
      <NovemberOpenPreviewPage />
    </>
  );
}
