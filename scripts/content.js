window.addEventListener("popstate", async () => 
{
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url.includes("boardgamegeek.com/image/")) 
    {
        return;    
    }

    chrome.history.search({ text: "boardgamegeek.com/boardgame/", maxResults: 10 }, (results) => 
    {
        const boardGamePage = results.find(r => r.url.includes("/boardgame/"));
        if (boardGamePage) 
        {
            window.location.href = boardGamePage.url;
        }
    });
});
