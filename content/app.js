// content/app.js
import * as UI from "./ui.js";
import * as Services from "./services.js";
import { getFlowIdFromUrl } from "./utils.js";

// Application State
const state = {
  selectedAI: "Gemini",
  username: "User",
  flowSummary: "",
  firstTimeOpened: false,
  salesforceSessionId: null,
  salesforceFlowMetadata: null,
};

let uiElements = {};

/**
 * Main application logic for handling the "send" action.
 */
async function handleSend() {
  const msg = uiElements.input.value.trim();
  if (!msg || uiElements.input.disabled) return;

  UI.addUserMessage(msg, state.username);
  uiElements.input.value = "";
  UI.disableInput();

  const loader = UI.showBotLoadingSimple();

  try {
    const data = await Services.fetchChatReply(msg, state.selectedAI);
    UI.addBotMessage(data.reply, loader);
  } catch (err) {
    console.error("[FloXplorer] Chat error:", err);
    UI.addBotMessage("⚠️ Could not connect to the server.", loader);
  }
  UI.enableInput();
}

/**
 * Logic to run the first time the chat box is opened.
 */
async function startInitialFlow() {
  UI.disableInput();
  UI.showInitialBotLoading();

  try {
    if (!state.salesforceSessionId || !getFlowIdFromUrl()) {
      throw new Error("Salesforce data not available from initial page load.");
    }
    const data = await Services.fetchInitialSummary(
      state.salesforceSessionId,
      getFlowIdFromUrl()
    );
    state.flowSummary = data.summary;
  } catch (err) {
    console.error("[FloXplorer] Initial data error:", err);
    state.flowSummary = "Could not connect to the server to get a summary.";
  }

  UI.showBotSummary(state.flowSummary);
  UI.enableInput();
}

/**
 * Sets up all event listeners for the UI.
 */
function setupEventListeners() {
  uiElements.aiModelSelector.addEventListener(
    "change",
    (e) => (state.selectedAI = e.target.value)
  );

  uiElements.toggleBtn.addEventListener("click", () => {
    uiElements.chatBox.classList.toggle("hidden");
    if (
      !state.firstTimeOpened &&
      !uiElements.chatBox.classList.contains("hidden")
    ) {
      state.firstTimeOpened = true;
      startInitialFlow();
    }
  });

  uiElements.sendBtn.addEventListener("click", handleSend);
  uiElements.input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });
}

/**
 * Fetches initial Salesforce data silently on page load.
 */
async function initSalesforceData() {
  console.log("🚀 [FloXplorer] Initialization started...");
  try {
    const baseUrl = window.location.origin.replace(
      ".lightning.force.com",
      ".my.salesforce.com"
    );

    const sidResponse = await new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { type: "GET_SID_COOKIE", url: baseUrl },
        resolve
      );
    });
    if (!sidResponse?.sid) throw new Error("SID not found.");
    state.salesforceSessionId = sidResponse.sid;
    console.log("🔑 [FloXplorer] SID obtained: ", sidResponse.sid);

    const userInfo = await Services.getSalesforceUserInfo(
      baseUrl,
      state.salesforceSessionId
    );
    if (userInfo) {
      state.username = userInfo.name;
      console.log("👤 [FloXplorer] User info obtained:", state.username);
    }

    const flowId = getFlowIdFromUrl();
    if (flowId) {
      console.log("🌀 [FloXplorer] Flow ID detected:", flowId);
      const metadata = await Services.fetchFlowMetadata(
        state.salesforceSessionId,
        flowId
      );
      if (metadata) {
        state.salesforceFlowMetadata = metadata;
        console.log("📦 [FloXplorer] Flow metadata obtained.");
      }
    }
    console.log("✅ [FloXplorer] Salesforce data fetched successfully!");
  } catch (error) {
    console.error("💥 [FloXplorer] Error during initialization:", error);
  }
}

/**
 * The main initialization function for the entire application.
 */
export function init() {
  UI.injectTailwind();
  const elements = UI.createChatInterface();
  if (elements) {
    uiElements = elements;
    initSalesforceData(); // Fetch SF data silently in the background
    setupEventListeners();
  }
}
