function d(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function h(){return window.location.href.includes(".salesforce.com")||window.location.href.includes(".force.com")}function c(){try{return new URL(window.location.href).searchParams.get("flowId")}catch(e){return console.error("❌ [getFlowIdFromUrl] Failed:",e),null}}const x=`
  <div id="chat-header" class="bg-blue-600 text-white p-2 flex justify-between items-center">
      <span class="font-semibold">FloXplorer Chat</span>
      <select id="ai-model-selector" class="bg-blue-700 text-white text-xs rounded p-1 border-none focus:ring-0 cursor-pointer">
          <option>Gemini</option><option>Grok</option><option>Perplexity</option>
      </select>
  </div>
  <div id="chat-messages" class="flex-1 overflow-y-auto p-3 space-y-4 bg-gray-50"></div>
  <div id="chat-footer" class="p-2 bg-white border-t border-gray-200">
      <div class="flex items-center space-x-2">
          <input id="user-input" type="text" placeholder="Type your message..." class="flex-1 w-full px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button id="send-btn" class="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">➤</button>
      </div>
  </div>`;let s={};function w(){if(document.querySelector("link[data-tailwind]"))return;const e=document.createElement("link");e.setAttribute("data-tailwind","true"),e.href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",e.rel="stylesheet",document.head.appendChild(e)}function v(){if(document.getElementById("chat-toggle-btn"))return null;const e=document.createElement("button");e.id="chat-toggle-btn",e.className="fixed bottom-5 right-5 z-[9999] bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition",e.innerHTML="💬",document.body.appendChild(e);const t=document.createElement("div");return t.id="chat-box",t.className="fixed bottom-20 right-5 z-[99999] w-80 bg-white shadow-2xl rounded-2xl border flex flex-col overflow-hidden hidden",t.style.height="550px",t.innerHTML=x,document.body.appendChild(t),s={toggleBtn:e,chatBox:t,aiModelSelector:t.querySelector("#ai-model-selector"),chatMessages:t.querySelector("#chat-messages"),sendBtn:t.querySelector("#send-btn"),input:t.querySelector("#user-input")},s}function m(){s.input.disabled=!0,s.sendBtn.disabled=!0,s.sendBtn.classList.add("opacity-50","cursor-not-allowed")}function g(){s.input.disabled=!1,s.sendBtn.disabled=!1,s.sendBtn.classList.remove("opacity-50","cursor-not-allowed"),s.input.focus()}function i(e){s.chatMessages.appendChild(e),s.chatMessages.scrollTop=s.chatMessages.scrollHeight}function y(){const e="bot-loading-initial";document.getElementById(e)?.remove();const t=document.createElement("div");t.id=e,t.innerHTML=`
    <div class="flex items-start">
        <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-3 bg-gray-200 rounded-e-xl rounded-es-xl animate-pulse">
        <div class="h-2.5 bg-gray-300 rounded-full w-full mb-2"></div>
        <div class="h-2 bg-gray-300 rounded-full w-3/4"></div>
        <div class="h-2.5 bg-gray-300 rounded-full w-full mb-2"></div>
    </div>
    </div>`,i(t)}function b(e){document.getElementById("bot-loading-initial")?.remove();const t=document.createElement("div"),n=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});t.className="flex items-start",t.innerHTML=`
    <div class="flex items-start gap-2.5">
        <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-3 bg-gray-200 rounded-tr-xl rounded-bl-xl rounded-br-xl">
            <div class="flex items-center space-x-2">
                <span class="text-sm font-semibold text-gray-900">FloXplorer</span>
                <span class="text-sm font-normal text-gray-500">${n}</span>
            </div>
            <p class="text-sm font-bold pt-2.5 pb-1 text-gray-900">Short Summary: </p>
            <p class="text-sm pt-2.5 pb-1 text-gray-900">${d(e)}</p>

            <div class="flex items-start my-2.5 bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
            <div class="me-2">
               <span class="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                  <svg fill="none" aria-hidden="true" class="w-5 h-5 shrink-0" viewBox="0 0 20 21">
                     <g clip-path="url(#clip0_3173_1381)">
                        <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"/>
                        <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"/>
                        <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z"/>
                        <path fill="#F15642" d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"/>
                        <path fill="#fff" d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"/>
                        <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"/>
                     </g>
                     <defs>
                        <clipPath id="clip0_3173_1381">
                           <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)"/>
                        </clipPath>
                     </defs>
                  </svg>
                  Flowbite Terms & Conditions
               </span>
               <span class="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                  12 Pages 
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                     <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                  </svg>
                  18 MB 
                  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                     <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                  </svg>
                  PDF
               </span>
            </div>
            <div class="inline-flex self-center items-center">
               <button class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600" type="button">
                  <svg class="w-4 h-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                     <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                  </svg>
               </button>
            </div>
         </div>
         <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
      </div>
            </div>
    </div>`,i(t)}function S(e,t){const n=document.createElement("div"),a=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});n.className="flex justify-end",n.innerHTML=`
    <div class="flex items-start gap-2.5">
        <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-2 bg-blue-600 rounded-tl-xl rounded-bl-xl rounded-br-xl">
            <div class="flex space-x-2 rtl:space-x-reverse justify-end">
                <span class="text-sm font-semibold text-white">${d(t)}</span>
                <span class="text-sm font-normal text-blue-200">${a}</span>
            </div>
            <p class="text-sm font-normal text-white">${d(e)}</p>
        </div>
        </div>`,i(n)}function u(e,t){t?.remove();const n=document.createElement("div"),a=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});n.className="flex items-start",n.innerHTML=`
    <div class="flex items-start gap-2.5">
        <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-3 bg-gray-200 rounded-tr-xl rounded-bl-xl rounded-br-xl">
            <div class="flex space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold text-gray-900">FloXplorer</span>
                <span class="text-sm font-normal text-gray-500">${a}</span>
            </div>
            <p class="text-sm font-normal text-gray-900 whitespace-pre-wrap">${d(e)}</p>
        </div>
    </div>`,i(n)}function F(){const e="bot-loading-simple-"+Date.now(),t=document.createElement("div");return t.id=e,t.className="flex items-start",t.innerHTML=`
    <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-3 bg-gray-200 rounded-e-xl rounded-es-xl animate-pulse">
        <div class="h-2.5 bg-gray-300 rounded-full w-full mb-2"></div>
        <div class="h-2 bg-gray-300 rounded-full w-3/4"></div>
    </div>`,i(t),t}const p="https://floxplorer-server.vercel.app";async function M(e,t){return new Promise(n=>{chrome.runtime.sendMessage({type:"FETCH_USER_INFO",baseUrl:e,sid:t},a=>{a?.success?n(a.data):(console.error("❌ [FloXplorer] Failed to get user info:",a?.error),n(null))})})}async function E(e,t){const n=window.location.origin.replace(".lightning.force.com",".my.salesforce.com");return new Promise(a=>{chrome.runtime.sendMessage({type:"FETCH_FLOW_METADATA",sessionId:e,flowId:t,instanceUrl:n},r=>{r?.success?(console.log("JSON salesfoce Data :",r.data),a(r.data)):(console.error("❌ [FloXplorer] Failed to get flow metadata:",r?.error),a(null))})})}async function I(e,t){const n=await fetch(`${p}/api/get-initial-data`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sessionId:e,salesforceHost:window.location.hostname,flowId:t})}),a=await n.json();if(!n.ok)throw new Error(a.error||"Failed to fetch initial data");return a}async function T(e,t){const n=await fetch(`${p}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:e,aiModel:t})}),a=await n.json();if(!n.ok)throw new Error(a.error||"Failed to fetch chat response");return a}const l={selectedAI:"Gemini",username:"User",flowSummary:"",firstTimeOpened:!1,salesforceSessionId:null,salesforceFlowMetadata:null};let o={};async function f(){const e=o.input.value.trim();if(!e||o.input.disabled)return;S(e,l.username),o.input.value="",m();const t=F();try{const n=await T(e,l.selectedAI);u(n.reply,t)}catch(n){console.error("[FloXplorer] Chat error:",n),u("⚠️ Could not connect to the server.",t)}g()}async function B(){m(),y();try{if(!l.salesforceSessionId||!c())throw new Error("Salesforce data not available from initial page load.");const e=await I(l.salesforceSessionId,c());l.flowSummary=e.summary}catch(e){console.error("[FloXplorer] Initial data error:",e),l.flowSummary="Could not connect to the server to get a summary."}b(l.flowSummary),g()}function L(){o.aiModelSelector.addEventListener("change",e=>l.selectedAI=e.target.value),o.toggleBtn.addEventListener("click",()=>{o.chatBox.classList.toggle("hidden"),!l.firstTimeOpened&&!o.chatBox.classList.contains("hidden")&&(l.firstTimeOpened=!0,B())}),o.sendBtn.addEventListener("click",f),o.input.addEventListener("keypress",e=>{e.key==="Enter"&&f()})}async function k(){console.log("🚀 [FloXplorer] Initialization started...");try{const e=window.location.origin.replace(".lightning.force.com",".my.salesforce.com"),t=await new Promise(r=>{chrome.runtime.sendMessage({type:"GET_SID_COOKIE",url:e},r)});if(!t?.sid)throw new Error("SID not found.");l.salesforceSessionId=t.sid,console.log("🔑 [FloXplorer] SID obtained: ",t.sid);const n=await M(e,l.salesforceSessionId);n&&(l.username=n.name,console.log("👤 [FloXplorer] User info obtained:",l.username));const a=c();if(a){console.log("🌀 [FloXplorer] Flow ID detected:",a);const r=await E(l.salesforceSessionId,a);r&&(l.salesforceFlowMetadata=r,console.log("📦 [FloXplorer] Flow metadata obtained."))}console.log("✅ [FloXplorer] Salesforce data fetched successfully!")}catch(e){console.error("💥 [FloXplorer] Error during initialization:",e)}}function C(){w();const e=v();e&&(o=e,k(),L())}h()&&C();
