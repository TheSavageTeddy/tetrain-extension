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
    } else if  (design == "legends") {
        chrome.storage.local.set({ design: "legends" })
    } else {
        chrome.storage.local.set({ design: "bold" })
    }
    
    chrome.storage.local.get(['design'], function(config) {
        console.log(config.design);
    })
}

function updateBorderConfig() {
    border_element = document.getElementById("border").value;
    console.log(border_element)
    if (border_element === "enabled") {
        chrome.storage.local.set({ hasBorder: true })
    } else {
        chrome.storage.local.set({ hasBorder: false })
    }
    
    chrome.storage.local.get(['hasBorder'], function(config) {
        console.log(config.hasBorder);
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
    var design3 = document.createElement("option");
    var border_select = document.getElementById("border");
    var border1 = document.createElement("option");
    var border2 = document.createElement("option");
    //#endregion
    chrome.storage.local.get(['nextEnabled', 'design', 'hasBorder'], function(config) {   
        test = config.nextEnabled;
        option1.text = "Enabled";
        option1.value = "enabled";
        option2.text = "Disabled";
        option2.value = "disabled";
        design1.text = "Minimal";
        design1.value = "clean";
        design2.text = "Classic";
        design2.value = "legends";
        design3.text = "Bold";
        design3.value = "bold";
        border1.text = "Enabled";
        border1.value = "enabled";
        border2.text = "Disabled";
        border2.value = "disabled";
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
            node_design.appendChild(design3);
        } else if (config.design == "legends"){
            node_design.appendChild(design2);
            node_design.appendChild(design1);
            node_design.appendChild(design3);
        } else{
            console.log("bold")
            node_design.appendChild(design3);
            node_design.appendChild(design2);
            node_design.appendChild(design1);
        }
        if (config.hasBorder){
            border_select.appendChild(border1);
            border_select.appendChild(border2);

        } else {
            border_select.appendChild(border2);
            border_select.appendChild(border1);

        }

    });
     
    document.getElementById('next-piece').addEventListener('change', updateNextConfig);
    document.getElementById('design').addEventListener('change', updateDesignConfig);
    document.getElementById('border').addEventListener('change', updateBorderConfig);
});