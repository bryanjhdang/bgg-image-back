console.log("listen for popstate");

// Listen for popstate event
window.addEventListener("popstate", async () => {
    console.log("popstate content.js");

    // Send a message to background to get the current active tab
    chrome.runtime.sendMessage({ action: "getActiveTab" }, (response) => {
        const tab = response.tab;

        if (!tab || !tab.url.includes("boardgamegeek.com/image/")) {
            console.log("does not include /image returning")
            return;
        }

        console.log("requesting history search")

        // Request history search from background
        chrome.runtime.sendMessage({ action: "searchHistory" }, (historyResults) => {
            console.log(historyResults)
            const boardGamePage = historyResults.find(r => r.url.includes("/boardgame/"));
            if (boardGamePage) {
                window.location.href = boardGamePage.url;
            }
        });
    });
});
