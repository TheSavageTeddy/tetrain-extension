function hidemenu(){
    m = document.getElementById("menu-items")
    m.style.display = "none"
}
function keydown(ev){
    switch (ev.keyCode) {
        case 37:
            goBack();
    }
}
function goBack(){
    hidemenu()
    window.location.replace("../../popup.html");
}

function customKeys(){
    hidemenu()
    window.location.replace("../html/customkeys.html");
}
  
function updateNextConfig() {
    nextpiece = document.getElementById("next-piece").value;
    //console.log(nextpiece)
    if (nextpiece === "enabled") {
        chrome.storage.local.set({ nextEnabled: true })
    } else {
        chrome.storage.local.set({ nextEnabled: false })
    }
    
    chrome.storage.local.get(['nextEnabled'], function(config) {
        //console.log(config.nextEnabled);
    })
}

function updateDesignConfig() {
    design = document.getElementById("design").value;
    //console.log(design)
    if (design == "clean") {
        chrome.storage.local.set({ design: "clean" })
    } else if  (design == "legends") {
        chrome.storage.local.set({ design: "legends" })
    } else if (design == "bold") {
        chrome.storage.local.set({ design: "bold" })
    } else if (design == "tetra"){
        chrome.storage.local.set({ design: "tetra" })
    } else if (design == "wool"){
        chrome.storage.local.set({ design: "wool" })
    } else if (design == "custom"){
        chrome.storage.local.set({ design: "custom" })
    } else {
        chrome.storage.local.set({ design: "crafty" })
    }
    
    chrome.storage.local.get(['design'], function(config) {
        //console.log(config.design);
    })
}

function updateBorderConfig() {
    border_element = document.getElementById("border").value;
    //console.log(border_element)
    if (border_element === "enabled") {
        chrome.storage.local.set({ hasBorder: true })
    } else {
        chrome.storage.local.set({ hasBorder: false })
    }
    
    chrome.storage.local.get(['hasBorder'], function(config) {
        //console.log(config.hasBorder);
    })
}

function updateHoldConfig() {
    hold_element = document.getElementById("hold").value;
    if (hold_element === "enabled") {
        chrome.storage.local.set({ holdEnabled: true })
    } else {
        chrome.storage.local.set({ holdEnabled: false })
    }
    
    chrome.storage.local.get(['holdEnabled'], function(config) {
        //console.log(config.holdEnabled);
    })
}

function updatePreviewConfig() {
    preview_element = document.getElementById("preview").value;
    if (preview_element === "enabled") {
        chrome.storage.local.set({ previewEnabled: true })
    } else {
        chrome.storage.local.set({ previewEnabled: false })
    }
    
    chrome.storage.local.get(['previewEnabled'], function(config) {
        //console.log(config.previewEnabled);
    })
}

function updateSidebarConfig() {
    sidebar_element = document.getElementById("sidebar").value;
    if (sidebar_element === "enabled") {
        chrome.storage.local.set({ sidebarEnabled: true })
    } else {
        chrome.storage.local.set({ sidebarEnabled: false })
    }
    
    chrome.storage.local.get(['sidebarEnabled'], function(config) {
        //console.log(config.sidebarEnabled);
    })
}

function updateSizeConfig() {
    size_element = document.getElementById("size").value;
    if (size_element === "big") {
        chrome.storage.local.set({ canvasSize:  "big"})
    } else if (size_element === "medium") {
        chrome.storage.local.set({ canvasSize: "medium" })
    } else {
        chrome.storage.local.set({ canvasSize: "small" })
    }
    
    chrome.storage.local.get(['canvasSize'], function(config) {
        //console.log(config.canvasSize);
    })
}

function updateMarkersConfig() {
    markers_element = document.getElementById("markers").value;
    if (markers_element === "enabled") {
        chrome.storage.local.set({ markersEnabled: true })
    } else {
        chrome.storage.local.set({ markersEnabled: false })
    }
    
    chrome.storage.local.get(['markersEnabled'], function(config) {
        //console.log(config.markersEnabled);
    })
}

function updateAutoPlayConfig() {
    autoplay_element = document.getElementById("auto").value;
    if (autoplay_element === "enabled") {
        chrome.storage.local.set({ autoplayEnabled: true })
    } else {
        chrome.storage.local.set({ autoplayEnabled: false })
    }
    
}
function updateTransConfig() {
    trans_element = document.getElementById("trans").value;
    if (trans_element === "enabled") {
        chrome.storage.local.set({ transEnabled: true })
    } else {
        chrome.storage.local.set({ transEnabled: false })
    }
    
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', goBack);
    document.getElementById('custom-keys').addEventListener('click', customKeys);
    //#region Next Settings
    var node_next = document.getElementById("next-piece")
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    var node_design = document.getElementById("design")
    var design1 = document.createElement("option");
    var design2 = document.createElement("option");
    var design3 = document.createElement("option");
    var design4 = document.createElement("option");
    var design5 = document.createElement("option");
    var design6 = document.createElement("option");
    var border_select = document.getElementById("border");
    var preview_select = document.getElementById("preview");
    var border1 = document.createElement("option");
    var border2 = document.createElement("option");
    var hold_select = document.getElementById("hold");
    var hold1 = document.createElement("option");
    var hold2 = document.createElement("option");
    var sidebar_select = document.getElementById("sidebar");
    var auto_select = document.getElementById("auto")
    var sidebar1 = document.createElement("option");
    var sidebar2 = document.createElement("option");
    var size_select = document.getElementById("size");
    var size1 = document.createElement("option");
    var size2 = document.createElement("option");
    var size3 = document.createElement("option");
    var markers_select = document.getElementById("markers");
    var trans_select = document.getElementById("trans");
    var markers1 = document.createElement("option");
    var markers2 = document.createElement("option");
    var preview1 = document.createElement("option");
    var preview2 = document.createElement("option");
    var autoplay1 = document.createElement("option");
    var autoplay2 = document.createElement("option");
    var trans1 = document.createElement("option");
    var trans2 = document.createElement("option");
    var experimental = document.createElement("option");
    var experimental2 = document.createElement("option");
    //#endregion
    chrome.storage.local.get(['nextEnabled', 'design', 'hasBorder', 'holdEnabled', 'sidebarEnabled', 'canvasSize', 'markersEnabled', 'previewEnabled', "autoplayEnabled", "transEnabled"], function(config) {   
        test = config.nextEnabled;
        option1.text = "★ Enabled";
        option1.value = "enabled";
        option2.text = "Disabled";
        option2.value = "disabled";
        design1.text = "Minimal";
        design1.value = "clean";
        design2.text = "Classic";
        design2.value = "legends";
        design3.text = "Bold";
        design3.value = "bold";
        design4.text = "★ Tetra";
        design4.value = "tetra";
        design5.text = "Wool";
        design5.value = "wool";
        design6.text = "Crafty";
        design6.value = "crafty";
        border1.text = "★ Enabled";
        border1.value = "enabled";
        border2.text = "Disabled";
        border2.value = "disabled";
        hold1.text = "★ Enabled";
        hold1.value = "enabled";
        hold2.text = "Disabled";
        hold2.value = "disabled";
        sidebar1.text = "★ Enabled";
        sidebar1.value = "enabled";
        sidebar2.text = "Disabled";
        sidebar2.value = "disabled";
        size1.text = "Big";
        size1.value = "big";
        size2.text = "Medium";
        size2.value = "medium";
        size3.text = "Small";
        size3.value = "small";
        markers1.text = "Enabled";
        markers1.value = "enabled";
        markers2.text = "Disabled";
        markers2.value = "disabled";
        preview1.text = "★ Enabled";
        preview1.value = "enabled";
        preview2.text = "Disabled";
        preview2.value = "disabled";
        autoplay1.text = "★ Enabled";
        autoplay1.value = "enabled";
        autoplay2.text = "Disabled";
        autoplay2.value = "disabled";
        trans1.text = "Enabled";
        trans1.value = "enabled";
        trans2.text = "Disabled";
        trans2.value = "disabled";
        experimental.text = "(Experimental)";
        experimental.value = "exp";
        experimental.disabled = true;
        experimental2.text = "(Experimental)";
        experimental2.value = "exp";
        experimental2.disabled = true;
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
            node_design.appendChild(design4);
            node_design.appendChild(design5);
            node_design.appendChild(design6);
        } else if (config.design == "legends"){
            node_design.appendChild(design2);
            node_design.appendChild(design1);
            node_design.appendChild(design3);
            node_design.appendChild(design4);
            node_design.appendChild(design5);
            node_design.appendChild(design6);
        } else if (config.design == "bold"){
            //console.log("bold")
            node_design.appendChild(design3);
            node_design.appendChild(design2);
            node_design.appendChild(design1);
            node_design.appendChild(design4);
            node_design.appendChild(design5);
            node_design.appendChild(design6);
        } else if (config.design == "tetra"){
            node_design.appendChild(design4);
            node_design.appendChild(design1);
            node_design.appendChild(design2);
            node_design.appendChild(design3);
            node_design.appendChild(design5);
            node_design.appendChild(design6);
        } else if (config.design == "wool"){
            node_design.appendChild(design5);
            node_design.appendChild(design1);
            node_design.appendChild(design2);
            node_design.appendChild(design3);
            node_design.appendChild(design4);
            node_design.appendChild(design6);
        } else {
            node_design.appendChild(design6);
            node_design.appendChild(design1);
            node_design.appendChild(design2);
            node_design.appendChild(design3);
            node_design.appendChild(design4);
            node_design.appendChild(design5);
        }
        if (config.hasBorder){
            border_select.appendChild(border1);
            border_select.appendChild(border2);

        } else {
            border_select.appendChild(border2);
            border_select.appendChild(border1);
        }
        if (config.holdEnabled){
            hold_select.appendChild(hold1);
            hold_select.appendChild(hold2);

        } else {
            hold_select.appendChild(hold2);
            hold_select.appendChild(hold1);

        }
        if (config.sidebarEnabled){
            sidebar_select.appendChild(sidebar1);
            sidebar_select.appendChild(sidebar2);

        } else {
            sidebar_select.appendChild(sidebar2);
            sidebar_select.appendChild(sidebar1);
        }

        if (config.canvasSize == "big"){
            size_select.appendChild(size1);
            size_select.appendChild(size2);
            size_select.appendChild(size3);
        } else if (config.canvasSize == "medium"){
            size_select.appendChild(size2);
            size_select.appendChild(size1);
            size_select.appendChild(size3);
        } else {
            size_select.appendChild(size3);
            size_select.appendChild(size1);
            size_select.appendChild(size2);
        } if (config.markersEnabled) {
            markers_select.appendChild(markers1);
            markers_select.appendChild(markers2);
            markers_select.appendChild(experimental2);
        } else {
            markers_select.appendChild(markers2);
            markers_select.appendChild(markers1);
            markers_select.appendChild(experimental2);
        } if (config.previewEnabled) {
            preview_select.appendChild(preview1);
            preview_select.appendChild(preview2);
        } else {
            preview_select.appendChild(preview2);
            preview_select.appendChild(preview1);
        }

        if (config.autoplayEnabled){
            auto_select.appendChild(autoplay1);
            auto_select.appendChild(autoplay2);
        } else {
            auto_select.appendChild(autoplay2);
            auto_select.appendChild(autoplay1);
        }

        if (config.transEnabled){
            trans_select.appendChild(trans1);
            trans_select.appendChild(trans2);
            trans_select.appendChild(experimental);
        } else {
            trans_select.appendChild(trans2);
            trans_select.appendChild(trans1);
            trans_select.appendChild(experimental);
        }

    });
    
    document.getElementById('next-piece').addEventListener('change', updateNextConfig);
    document.getElementById('design').addEventListener('change', updateDesignConfig);
    document.getElementById('border').addEventListener('change', updateBorderConfig);
    document.getElementById('hold').addEventListener('change', updateHoldConfig);
    document.getElementById('sidebar').addEventListener('change', updateSidebarConfig);
    document.getElementById('size').addEventListener('change', updateSizeConfig);
    document.getElementById('markers').addEventListener('change', updateMarkersConfig);
    document.getElementById('preview').addEventListener('change', updatePreviewConfig);
    document.getElementById('auto').addEventListener('change', updateAutoPlayConfig);
    document.getElementById('trans').addEventListener('change', updateTransConfig);
    document.addEventListener('keydown', keydown, false);
});