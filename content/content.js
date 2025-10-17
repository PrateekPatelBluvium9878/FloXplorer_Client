// content/content.js
import { isFlowBuilderPage } from "./utils.js";
import { init } from "./app.js";

// This is the entry point for the content script.
if (isFlowBuilderPage()) {
  init();
}
