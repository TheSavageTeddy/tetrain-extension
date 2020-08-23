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

function createEnableDisable(select_element, local_name){
    var select_node = document.getElementById(select_element);
    var en = document.createElement("option");
    var dis = document.createElement("option");
    en.text = "Enabled";
    en.value = "enabled";
    dis.text = "Disabled";
    dis.value = "disabled";
    chrome.storage.local.get([local_name], function(local_config) {   
        if (local_config[local_name]) {
            select_node.appendChild(en);
            select_node.appendChild(dis);
        } else {
            select_node.appendChild(dis);
            select_node.appendChild(en); 
        }
    });
}
function createExperimentalEnableDisable(select_element, local_name){
    var select_node = document.getElementById(select_element);
    var en = document.createElement("option");
    var dis = document.createElement("option");
    var exp = document.createElement("option");
    en.text = "Enabled";
    en.value = "enabled";
    dis.text = "Disabled";
    dis.value = "disabled";
    exp.text = "(Experimental)";
    exp.value = "exp";
    exp.disabled = true;
    chrome.storage.local.get([local_name], function(local_config) {   
        if (local_config[local_name]) {
            select_node.appendChild(en);
            select_node.appendChild(dis);
            select_node.appendChild(exp);
        } else {
            select_node.appendChild(dis);
            select_node.appendChild(en); 
            select_node.appendChild(exp);
        }
    });
}

const config_options = {
    2: { // Enable/Disable Options
        'sidebar': 'sidebarEnabled',
        'border': 'hasBorder',
        'next-piece': 'nextEnabled',
        'preview': 'previewEnabled',
        'hold': 'holdEnabled',
        'auto': 'autoplayEnabled'
    },
    3:{ //Multiple Custom options
        'design':{
            'local':'design',
            'options':{
                'Minimal':'clean',
                'Classic':'legends',
                'Bold':'bold',
                'Tetra':'tetra',
                'Wool':'wool',
                'Crafty':'crafty'
            }
        },
        'size':{
            'local':'canvasSize',
            'options':{
                'Big':'big',
                'Medium':'medium',
                'Small':'small'
            }
        }
    } ,
    4:{// Experimental Options
        'trans':'transEnabled',
        'markers':'markersEnabled'
    } 
};

document.addEventListener('DOMContentLoaded', function () {
    //Create Config
    for (const [key, value] of Object.entries(config_options[2])) {
        createEnableDisable(key, value);
    };
    for (const [key, value] of Object.entries(config_options[4])) {
        createExperimentalEnableDisable(key, value);
    };
    //Listeners
    document.getElementById('back').addEventListener('click', goBack);
    document.getElementById('custom-keys').addEventListener('click', customKeys);
    document.addEventListener('keydown', keydown, false);
});