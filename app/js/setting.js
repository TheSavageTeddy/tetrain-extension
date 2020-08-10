function updateConfig() {
    nextpiece = document.getElementById("next-piece").value;
    console.log(nextpiece)
    if (nextpiece === "enabled") {
        chrome.storage.local.set({ nextEnabled: true })
    } else {
        chrome.storage.local.set({ nextEnabled: false })
    }
    
    chrome.storage.local.get(['nextEnabled'], function(config) {
        console.log(config.nextEnabled);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('next-piece').addEventListener('change', updateConfig);
});