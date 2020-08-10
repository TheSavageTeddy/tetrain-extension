function updateNextConfig() {
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

function updateDesignConfig() {
    nextpiece = document.getElementById("design").value;
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
    //#region Next Settings
    var node_next = document.getElementById("next-piece")
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    //#endregion
    chrome.storage.local.get(['nextEnabled', 'design'], function(config) {   
        test = config.nextEnabled;
        option1.text = "Enabled";
        option1.value = "enabled";
        option2.text = "Disabled";
        option2.value = "disabled";
        if (config.nextEnabled){
            node_next.appendChild(option1);
            node_next.appendChild(option2);
        } else {
            node_next.appendChild(option2);
            node_next.appendChild(option1);
        }

        
    });
     
    document.getElementById('next-piece').addEventListener('change', updateNextConfig);
    document.getElementById('design').addEventListener('change', updateDesignConfig);
});