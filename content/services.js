// content/services.js

const SERVER_URL = "https://floxplorer-server.vercel.app";

/**
 * Fetches user information from Salesforce via the background script.
 * @param {string} baseUrl The Salesforce base URL.
 * @param {string} sid The session ID.
 * @returns {Promise<object|null>} The user info object or null on failure.
 */
export async function getSalesforceUserInfo(baseUrl, sid) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "FETCH_USER_INFO", baseUrl, sid },
      (response) => {
        if (response?.success) {
          resolve(response.data);
        } else {
          console.error(
            "❌ [FloXplorer] Failed to get user info:",
            response?.error
          );
          resolve(null);
        }
      }
    );
  });
}

/**
 * Fetches Flow metadata from Salesforce via the background script.
 * @param {string} sessionId The session ID.
 * @param {string} flowId The Flow ID.
 * @returns {Promise<object|null>} The flow metadata or null on failure.
 */
export async function fetchFlowMetadata(sessionId, flowId) {
  const instanceUrl = window.location.origin.replace(
    ".lightning.force.com",
    ".my.salesforce.com"
  );
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { type: "FETCH_FLOW_METADATA", sessionId, flowId, instanceUrl },
      (response) => {
        if (response?.success) {
          console.log("JSON salesfoce Data :", response.data);
          resolve(response.data);
        } else {
          console.error(
            "❌ [FloXplorer] Failed to get flow metadata:",
            response?.error
          );
          resolve(null);
        }
      }
    );
  });
}

/**
 * Fetches the initial flow summary from your backend server.
 * @param {string} sessionId The Salesforce session ID.
 * @param {string} flowId The Flow ID.
 * @returns {Promise<object>} The server response data.
 */
export async function fetchInitialSummary(sessionId, flowId) {
  const res = await fetch(`${SERVER_URL}/api/get-initial-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: sessionId,
      salesforceHost: window.location.hostname,
      flowId: flowId,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch initial data");
  return data;
}

/**
 * Sends a chat message to your backend server.
 * @param {string} question The user's question.
 * @param {string} aiModel The selected AI model.
 * @returns {Promise<object>} The server response data.
 */
export async function fetchChatReply(question, aiModel) {
  const res = await fetch(`${SERVER_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question: question,
      aiModel: aiModel,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch chat response");
  return data;
}
