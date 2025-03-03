document.addEventListener("DOMContentLoaded", () => 
{
    // Grab the button element
    const button = document.getElementById("toggleBtn");

    chrome.storage.sync.get(["enabled"], (result) => 
    {
        button.textContent = result.enabled ? "Disable" : "Enable";
    });

    button.addEventListener("click", () => 
    {
        chrome.storage.sync.get(["enabled"], (result) => 
        {
            const newEnabled = !result.enabled;
            chrome.storage.sync.set({ enabled: newEnabled });
            button.textContent = newEnabled ? "Disable" : "Enable";
        });
    });
});
