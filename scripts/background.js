let historyStack = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => 
{
    console.log("chrome tab updated background.js")

    if (changeInfo.status === "complete" && tab.url.includes("boardgamegeek.com")) 
    {
        if (!historyStack[tabId]) {
            historyStack[tabId] = [];
        }
        historyStack[tabId].push(tab.url);
    }
});

chrome.tabs.onRemoved.addListener((tabId) => 
{
    delete historyStack[tabId];
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getActiveTab") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            sendResponse({ tab: tabs[0] });
        });
        return true; // Indicate that sendResponse will be called asynchronously
    }

    if (message.action === "searchHistory") {
        chrome.history.search({ text: "boardgamegeek.com/boardgame/", maxResults: 10 }, (results) => {
            sendResponse(results);
        });
        return true; // Indicate that sendResponse will be called asynchronously
    }
});
