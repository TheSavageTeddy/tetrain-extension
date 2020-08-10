function hidemenu(){
    m = document.getElementById("menu-items")
    m.style.display = "none"
}
function goBack(){
    hidemenu()
    window.location.replace("../../popup.html");
}
  
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
    design = document.getElementById("design").value;
    console.log(design)
    if (design == "clean") {
        chrome.storage.local.set({ design: "clean" })
    } else {
        chrome.storage.local.set({ design: "ledgends" })
    }
    
    chrome.storage.local.get(['design'], function(config) {
        console.log(config.design);
    })
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', goBack);
    //#region Next Settings
    var node_next = document.getElementById("next-piece")
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    var node_design = document.getElementById("design")
    var design1 = document.createElement("option");
    var design2 = document.createElement("option");
    //#endregion
    chrome.storage.local.get(['nextEnabled', 'design'], function(config) {   
        test = config.nextEnabled;
        option1.text = "Enabled";
        option1.value = "enabled";
        option2.text = "Disabled";
        option2.value = "disabled";
        design1.text = "Clean";
        design1.value = "clean";
        design2.text = "Legends";
        design2.value = "legends";
        if (config.nextEnabled){
            node_next.appendChild(option1);
            node_next.appendChild(option2);
        } else {
            node_next.appendChild(option2);
            node_next.appendChild(option1);
        }
        if (config.design == "clean"){
            node_design.appendChild(design1);
            node_design.appendChild(design2);
        } else {
            node_design.appendChild(design2);
            node_design.appendChild(design1);
        }

    });
     
    document.getElementById('next-piece').addEventListener('change', updateNextConfig);
    document.getElementById('design').addEventListener('change', updateDesignConfig);
});