// background.js

const SERVER_URL =
  "https://floxplorer-server-18hu2nk26-prateek-patels-projects-bd4306fd.vercel.app";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Use 'return true' in all async branches to keep the message port open.

  if (request.type === "GET_SID_COOKIE") {
    console.log(
      "📩 [background.js] Request for SID cookie received for URL:",
      request.url
    );
    if (!request.url) {
      console.error("❌ [background.js] URL not provided in request.");
      sendResponse({ error: "URL not provided for SID cookie." });
      return false;
    }
    chrome.cookies.get({ url: request.url, name: "sid" }, (cookie) => {
      if (chrome.runtime.lastError) {
        console.error(
          "❌ [background.js] Error getting cookie:",
          chrome.runtime.lastError.message
        );
        sendResponse({ error: chrome.runtime.lastError.message });
        return;
      }
      if (cookie && cookie.value) {
        console.log("✅ [background.js] SID cookie found.");
        sendResponse({ sid: cookie.value });
      } else {
        console.error(
          "❌ [background.js] SID cookie not found for URL:",
          request.url
        );
        sendResponse({ error: "SID cookie not found" });
      }
    });
    return true; // Keep channel open for async callback
  }

  // NEW: Handler for fetching Salesforce user info
  if (request.type === "FETCH_USER_INFO") {
    (async () => {
      try {
        const userInfoUrl = `${request.baseUrl}/services/oauth2/userinfo`;
        const response = await fetch(userInfoUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${request.sid}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(
            `Salesforce API error: ${response.status} ${await response.text()}`
          );
        }
        const data = await response.json();
        sendResponse({ success: true, data: data });
      } catch (error) {
        console.error("💥 [background.js] Error fetching user info:", error);
        sendResponse({ success: false, error: error.message });
      }
    })();
    return true; // Keep channel open for async fetch
  }

  // NEW: Handler for fetching Salesforce flow metadata
  if (request.type === "FETCH_FLOW_METADATA") {
    (async () => {
      try {
        const apiVersion = "58.0";
        const query = `SELECT Id, Metadata FROM Flow WHERE Id='${request.flowId}'`;
        const url = `${
          request.instanceUrl
        }/services/data/v${apiVersion}/tooling/query/?q=${encodeURIComponent(
          query
        )}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${request.sessionId}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(
            `Salesforce Tooling API error: ${
              response.status
            } ${await response.text()}`
          );
        }
        const data = await response.json();
        const metadata = data.records?.[0]?.Metadata || null;
        sendResponse({ success: true, data: metadata });
      } catch (error) {
        console.error(
          "💥 [background.js] Error fetching flow metadata:",
          error
        );
        sendResponse({ success: false, error: error.message });
      }
    })();
    return true; // Keep channel open for async fetch
  }
});
