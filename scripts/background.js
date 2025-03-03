let historyStack = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => 
{
    if (changeInfo.status === "complete" && tab.url.includes("boardgamegeek.com")) 
    {
        if (!historyStack[tabId]) {
            historyStack[tabId] = [];
        }
a
        historyStack[tabId].push(tb.url);
    }
});

chrome.tabs.onRemoved.addListener((tabId) => 
{
    delete historyStack[tabId];
});
