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
    var node = document.getElementById("next-piece")
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    chrome.storage.local.get(['nextEnabled'], function(config) {
        test = config.nextEnabled;
        option1.text = "Enabled";
        option1.value = "enabled";
        option2.text = "Disabled";
        option2.value = "disabled";
        if (config.nextEnabled){
            node.appendChild(option1);
            node.appendChild(option2);
        } else {
            node.appendChild(option2);
            node.appendChild(option1);
        }
    });
     
    document.getElementById('next-piece').addEventListener('change', updateConfig);
});