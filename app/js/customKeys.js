const keyCodes = {
    3: 'break',
    8: 'backspace / delete',
    9: 'tab',
    12: 'clear',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    19: 'pause/break',
    20: 'caps lock',
    21: 'hangul',
    25: 'hanja',
    27: 'escape',
    28: 'conversion',
    29: 'non-conversion',
    32: 'spacebar',
    33: 'page up',
    34: 'page down',
    35: 'end',
    36: 'home',
    37: 'left arrow',
    38: 'up arrow',
    39: 'right arrow',
    40: 'down arrow',
    41: 'select',
    42: 'print',
    43: 'execute',
    44: 'Print Screen',
    45: 'insert',
    46: 'delete',
    47: 'help',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    58: ':',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    91: 'Windows Key / Left ⌘ ',
    92: 'right window key',
    93: 'Windows Menu / Right ⌘',
    95: 'sleep',
    96: 'numpad 0',
    97: 'numpad 1',
    98: 'numpad 2',
    99: 'numpad 3',
    100: 'numpad 4',
    101: 'numpad 5',
    102: 'numpad 6',
    103: 'numpad 7',
    104: 'numpad 8',
    105: 'numpad 9',
    106: 'multiply',
    107: 'add',
    108: 'numpad period (firefox)',
    109: 'subtract',
    110: 'decimal point',
    111: 'divide',
    112: 'f1',
    113: 'f2',
    114: 'f3',
    115: 'f4',
    116: 'f5',
    117: 'f6',
    118: 'f7',
    119: 'f8',
    120: 'f9',
    121: 'f10',
    122: 'f11',
    123: 'f12',
    124: 'f13',
    125: 'f14',
    126: 'f15',
    127: 'f16',
    128: 'f17',
    129: 'f18',
    130: 'f19',
    131: 'f20',
    132: 'f21',
    133: 'f22',
    134: 'f23',
    135: 'f24',
    136: 'f25',
    137: 'f26',
    138: 'f27',
    139: 'f28',
    140: 'f29',
    141: 'f30',
    142: 'f31',
    143: 'f32',
    144: 'num lock',
    145: 'scroll lock',
    151: 'airplane mode',
    160: '^',
    161: '!',
    162: '؛ (arabic semicolon)',
    163: '#',
    164: '$',
    165: 'ù',
    166: 'page backward',
    167: 'page forward',
    168: 'refresh',
    169: 'closing paren (AZERTY)',
    170: '*',
    171: '~ + * key',
    172: 'home key',
    173: 'minus (firefox), mute/unmute',
    174: 'decrease volume level',
    175: 'increase volume level',
    176: 'next',
    177: 'previous',
    178: 'stop',
    179: 'play/pause',
    180: 'e-mail',
    181: 'mute/unmute (firefox)',
    182: 'decrease volume level (firefox)',
    183: 'increase volume level (firefox)',
    186: 'semi-colon / ñ',
    187: 'equal sign',
    188: 'comma',
    189: 'dash',
    190: 'period',
    191: 'forward slash / ç',
    192: 'grave accent / ñ / æ / ö',
    193: '?, / or °',
    194: 'numpad period (chrome)',
    219: 'open bracket',
    220: 'back slash',
    221: 'close bracket / å',
    222: 'single quote / ø / ä',
    223: '`',
    224: 'left or right ⌘ key (firefox)',
    225: 'altgr',
    230: 'GNOME Compose Key',
    231: 'ç',
    233: 'XF86Forward',
    234: 'XF86Back',
    235: 'non-conversion',
    240: 'alphanumeric',
    242: 'hiragana/katakana',
    243: 'half-width/full-width',
    244: 'kanji',
    251: 'unlock trackpad (Chrome/Edge)',
    255: 'toggle touchpad',
};

function hidemenu(){
    m = document.getElementById("menu-items")
    m.style.display = "none"
}
function goBack(){
    hidemenu()
    window.location.replace("../html/settings.html");
}

function updateKeysConfigLeft(){
    left_setting = document.getElementById("left").value;
    chrome.storage.local.get(['KEY_SETTINGS'], function(config) {   
        chrome.storage.local.set({ 
            KEY_SETTINGS: {
                LEFT:keyCodes[left_setting],
                RIGHT:config.KEY_SETTINGS["RIGHT"],
                SOFT:config.KEY_SETTINGS["SOFT"],
                ROTATE_RIGHT:config.KEY_SETTINGS["ROTATE_RIGHT"],
                HARD:config.KEY_SETTINGS["HARD"],
                HOLD:config.KEY_SETTINGS["HOLD"],
            }
        });
    });
}
function updateKeysConfigRight(){
    right_setting = document.getElementById("right").value;
    chrome.storage.local.get(['KEY_SETTINGS'], function(config) {   
        chrome.storage.local.set({ 
            KEY_SETTINGS: {
                LEFT:config.KEY_SETTINGS["LEFT"],
                RIGHT:keyCodes[right_setting],
                SOFT:config.KEY_SETTINGS["SOFT"],
                ROTATE_RIGHT:config.KEY_SETTINGS["ROTATE_RIGHT"],
                HARD:config.KEY_SETTINGS["HARD"],
                HOLD:config.KEY_SETTINGS["HOLD"],
            }
        });
    });
}
function updateKeysConfigSoft(){
    right_setting = document.getElementById("soft").value;
    chrome.storage.local.get(['KEY_SETTINGS'], function(config) {   
        chrome.storage.local.set({ 
            KEY_SETTINGS: {
                LEFT:config.KEY_SETTINGS["LEFT"],
                RIGHT:config.KEY_SETTINGS["RIGHT"],
                SOFT:keyCodes[right_setting],
                ROTATE_RIGHT:config.KEY_SETTINGS["ROTATE_RIGHT"],
                HARD:config.KEY_SETTINGS["HARD"],
                HOLD:config.KEY_SETTINGS["HOLD"],
            }
        });
    });
}
function updateKeysConfigHard(){
    right_setting = document.getElementById("hard").value;
    chrome.storage.local.get(['KEY_SETTINGS'], function(config) {   
        chrome.storage.local.set({ 
            KEY_SETTINGS: {
                LEFT:config.KEY_SETTINGS["LEFT"],
                RIGHT:config.KEY_SETTINGS["RIGHT"],
                SOFT:config.KEY_SETTINGS["SOFT"],
                ROTATE_RIGHT:config.KEY_SETTINGS["ROTATE_RIGHT"],
                HARD:keyCodes[right_setting],
                HOLD:config.KEY_SETTINGS["HOLD"],
            }
        });
    });
}
function updateKeysConfigHold(){
    right_setting = document.getElementById("hold").value;
    chrome.storage.local.get(['KEY_SETTINGS'], function(config) {   
        chrome.storage.local.set({ 
            KEY_SETTINGS: {
                LEFT:config.KEY_SETTINGS["LEFT"],
                RIGHT:config.KEY_SETTINGS["RIGHT"],
                SOFT:config.KEY_SETTINGS["SOFT"],
                ROTATE_RIGHT:config.KEY_SETTINGS["ROTATE_RIGHT"],
                HARD:config.KEY_SETTINGS["HARD"],
                HOLD:keyCodes[right_setting],
            }
        });
    });
}
function updateKeysConfigRright(){
    right_setting = document.getElementById("rright").value;
    chrome.storage.local.get(['KEY_SETTINGS'], function(config) {   
        chrome.storage.local.set({ 
            KEY_SETTINGS: {
                LEFT:config.KEY_SETTINGS["LEFT"],
                RIGHT:config.KEY_SETTINGS["RIGHT"],
                SOFT:config.KEY_SETTINGS["SOFT"],
                ROTATE_RIGHT:keyCodes[right_setting],
                HARD:config.KEY_SETTINGS["HARD"],
                HOLD:config.KEY_SETTINGS["HOLD"],
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', goBack);
    left_node = document.getElementById("left");
    right_node = document.getElementById("right");
    rright_node = document.getElementById("rright");
    soft_node = document.getElementById("soft");
    hard_node = document.getElementById("hard");
    hold_node = document.getElementById("hold");
    chrome.storage.local.get(['KEY_SETTINGS'], function(config) {   
        if (!config.KEY_SETTINGS) {
            chrome.storage.local.set({ 
                KEY_SETTINGS: {
                  LEFT:"left arrow",
                  RIGHT:"right arrow",
                  SOFT:"down arrow",
                  ROTATE_RIGHT:"up arrow",
                  HARD:"spacebar",
                  HOLD:"c",
                }
              });
        }
        //Left
        var coption = document.createElement("option");
        coption.text = config.KEY_SETTINGS["LEFT"];
        coption.value = config.KEY_SETTINGS;
        left_node.appendChild(coption);
        for (const [key, value] of Object.entries(keyCodes)) {
            if (config.KEY_SETTINGS["LEFT"] == value || config.KEY_SETTINGS["RIGHT"] == value || config.KEY_SETTINGS["SOFT"] == value || config.KEY_SETTINGS["HARD"] == value || config.KEY_SETTINGS["HOLD"] == value || config.KEY_SETTINGS["ROTATE RIGHT"] == value){
            } else {
                var option = document.createElement("option");
                option.text = value;
                option.value = key;
                left_node.appendChild(option);
            }
        };
        //Right
        var coption = document.createElement("option");
        coption.text = config.KEY_SETTINGS["RIGHT"];
        coption.value = config.KEY_SETTINGS;
        right_node.appendChild(coption);
        for (const [key, value] of Object.entries(keyCodes)) {
            if (config.KEY_SETTINGS["LEFT"] == value || config.KEY_SETTINGS["RIGHT"] == value || config.KEY_SETTINGS["SOFT"] == value || config.KEY_SETTINGS["HARD"] == value || config.KEY_SETTINGS["HOLD"] == value || config.KEY_SETTINGS["ROTATE RIGHT"] == value){
            } else {
                var option = document.createElement("option");
                option.text = value;
                option.value = key;
                right_node.appendChild(option);
            }
        };
        //Soft
        var coption = document.createElement("option");
        coption.text = config.KEY_SETTINGS["SOFT"];
        coption.value = config.KEY_SETTINGS;
        soft_node.appendChild(coption);
        for (const [key, value] of Object.entries(keyCodes)) {
            if (config.KEY_SETTINGS["LEFT"] == value || config.KEY_SETTINGS["RIGHT"] == value || config.KEY_SETTINGS["SOFT"] == value || config.KEY_SETTINGS["HARD"] == value || config.KEY_SETTINGS["HOLD"] == value || config.KEY_SETTINGS["ROTATE RIGHT"] == value){
            } else {
                var option = document.createElement("option");
                option.text = value;
                option.value = key;
                soft_node.appendChild(option);
            }
        };
        //Hard
        var coption = document.createElement("option");
        coption.text = config.KEY_SETTINGS["HARD"];
        coption.value = config.KEY_SETTINGS;
        hard_node.appendChild(coption);
        for (const [key, value] of Object.entries(keyCodes)) {
            if (config.KEY_SETTINGS["LEFT"] == value || config.KEY_SETTINGS["RIGHT"] == value || config.KEY_SETTINGS["SOFT"] == value || config.KEY_SETTINGS["HARD"] == value || config.KEY_SETTINGS["HOLD"] == value || config.KEY_SETTINGS["ROTATE RIGHT"] == value){
            } else {
                var option = document.createElement("option");
                option.text = value;
                option.value = key;
                hard_node.appendChild(option);
            }
        };
        //Hold
        var coption = document.createElement("option");
        coption.text = config.KEY_SETTINGS["HOLD"];
        coption.value = config.KEY_SETTINGS;
        hold_node.appendChild(coption);
        for (const [key, value] of Object.entries(keyCodes)) {
            if (config.KEY_SETTINGS["LEFT"] == value || config.KEY_SETTINGS["RIGHT"] == value || config.KEY_SETTINGS["SOFT"] == value || config.KEY_SETTINGS["HARD"] == value || config.KEY_SETTINGS["HOLD"] == value || config.KEY_SETTINGS["ROTATE RIGHT"] == value){
            } else {
                var option = document.createElement("option");
                option.text = value;
                option.value = key;
                hold_node.appendChild(option);
            }
        };
        // Rotate Right
        var coption = document.createElement("option");
        coption.text = config.KEY_SETTINGS["ROTATE_RIGHT"];
        coption.value = config.KEY_SETTINGS;
        rright_node.appendChild(coption);
        for (const [key, value] of Object.entries(keyCodes)) {
            if (config.KEY_SETTINGS["LEFT"] == value || config.KEY_SETTINGS["RIGHT"] == value || config.KEY_SETTINGS["SOFT"] == value || config.KEY_SETTINGS["HARD"] == value || config.KEY_SETTINGS["HOLD"] == value || config.KEY_SETTINGS["ROTATE RIGHT"] == value){
            } else {
                var option = document.createElement("option");
                option.text = value;
                option.value = key;
                rright_node.appendChild(option);
            }
        };
    });
    document.getElementById('left').addEventListener('change', updateKeysConfigLeft);
    document.getElementById('right').addEventListener('change', updateKeysConfigRight);
    document.getElementById('soft').addEventListener('change', updateKeysConfigSoft);
    document.getElementById('hard').addEventListener('change', updateKeysConfigHard);
    document.getElementById('rright').addEventListener('change', updateKeysConfigRright);
    document.getElementById('hold').addEventListener('change', updateKeysConfigHold);
});