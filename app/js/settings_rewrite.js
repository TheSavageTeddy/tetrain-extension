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
function customTextures(){
    hidemenu()
    window.location.replace("../html/custom_textures.html");
}

function createEnableDisable(select_element, local_name){
    var select_node = document.getElementById(select_element);
    var en = document.createElement("option");
    var dis = document.createElement("option");
    en.text = "★ Enabled";
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
function createMultiOption(select_element, local_name, options){
    var select_node = document.getElementById(select_element);
    var options_dict = {}
    var options_list = []
    for (const [key, value] of Object.entries(options)) {
        options_dict[key] = document.createElement("option");
        options_dict[key].text = key;
        options_dict[key].value = value;
    };
    chrome.storage.local.get([local_name], function(local_config) {  
        for (const [key, value] of Object.entries(options_dict)) {
            if (value.value == local_config[local_name]){
                select_node.appendChild(options_dict[key])
            } else {
                options_list.push(options_dict[key]);
            }
        } 
        for (const [key, value] of Object.entries(options_list)) {
            select_node.appendChild(options_list[key])
        } 
    });
}
function updateEnableDisableConfig(ev){
    let event_html_id = ev.target.id
    var local_name = config_options[2][event_html_id]
    var element = document.getElementById(event_html_id).value;

    if (element == "enabled") {
        var obj= {};
        obj[local_name] = true
        chrome.storage.local.set(obj)
    } else {
        var obj= {};
        obj[local_name] = false
        chrome.storage.local.set(obj)
    }
}
function updateMultiConfig(ev){
    let event_html_id = ev.target.id
    var local_name = config_options[3][event_html_id]['local']
    var element = document.getElementById(event_html_id).value;
    var obj = {};

    obj[local_name]  = element
    chrome.storage.local.set(obj)
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
                'Crafty':'crafty',
                'Custom':'custom'
            }
        },
        'size':{
            'local':'canvasSize',
            'options':{
                '★ Big':'big',
                'Medium':'medium',
                'Small':'small'
            }
        },
        'piecespeed':{
            'local':'keyspeed',
            'options':{
                'Normal (50)':'normal',
                '★ Faster (40)':'faster',
                'Even Faster (30)':'evenfaster',
                'More faster? (20)':'morenfaster',
                'Speeeeeeed (10)':'speed'
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
    for (const [key, value] of Object.entries(config_options[3])) {
        createMultiOption(key, value['local'], value['options']);
        document.getElementById(key).addEventListener('change', updateMultiConfig, false);
    };
    for (const [key, value] of Object.entries(config_options[2])) {
        createEnableDisable(key, value);
        document.getElementById(key).addEventListener('change', updateEnableDisableConfig, false);
    };
    for (const [key, value] of Object.entries(config_options[4])) {
        createExperimentalEnableDisable(key, value);
        document.getElementById(key).addEventListener('change', updateEnableDisableConfig, false);
    };
    //Listeners
    document.getElementById('back').addEventListener('click', goBack);
    document.getElementById('custom-keys').addEventListener('click', customKeys);
    document.getElementById('custom-textures').addEventListener('click', customTextures);
    document.addEventListener('keydown', keydown, false);
});
