// content/utils.js

/**
 * Escapes HTML characters in a string to prevent XSS.
 * @param {string} unsafe The potentially unsafe string.
 * @returns {string} The sanitized string.
 */
export function escapeHtml(unsafe = "") {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Checks if the current page is a Salesforce Flow Builder page.
 * @returns {boolean} True if it's a Flow Builder page.
 */
export function isFlowBuilderPage() {
  return (
    window.location.href.includes(".salesforce.com") ||
    window.location.href.includes(".force.com")
  );
}

/**
 * Extracts the Flow ID from the current URL's query parameters.
 * @returns {string|null} The Flow ID or null if not found.
 */
export function getFlowIdFromUrl() {
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get("flowId");
  } catch (e) {
    console.error("❌ [getFlowIdFromUrl] Failed:", e);
    return null;
  }
}
