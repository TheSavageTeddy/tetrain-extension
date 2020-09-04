// Back to menu function
function mainmenu() {
    window.location.replace("../../popup.html");
}
function pause() {
    window.location.replace("../html/pause.html");
}
async function retrieveSettings(){
    return new Promise(function(resolve, reject){
        chrome.storage.local.get(["design", "isPlaying", "grid", "clearedRows", "visualScore", "currentScore", "nextPiece", "timeSinceStart", "currentPiece", "hasLost", "ispieceinHold", "currentHold", "isabletoSwap", "hasBorder", "nextEnabled", "holdEnabled", "sidebarEnabled", "canvasSize", "markersEnabled", "savedHighScore", "previewEnabled", "KEY_SETTINGS", "transEnabled", "autoplayEnabled", "currentLevel", "isPaused", "pausedHandler", "keyspeed"], function(options){
            console.log("====Settings Retrived====")
            resolve(options);
        })
    });

}

// Put all code in config because async bad
async function game() {
    //-------------------------------------------------------------------------
    // config stuff
    //---------------------------------------- ---------------------------------
    var value = await retrieveSettings()

    async function rrs(){
        var p = new Promise(function(resolve, reject){
            chrome.storage.local.get(["design", 
            "isPlaying", 
            "grid", 
            "clearedRows", 
            "visualScore", 
            "currentScore", 
            "nextPiece", 
            "timeSinceStart", 
            "currentPiece", 
            "hasLost", 
            "ispieceinHold", 
            "currentHold", 
            "isabletoSwap", 
            "hasBorder", 
            "nextEnabled", 
            "holdEnabled", 
            "sidebarEnabled", 
            "canvasSize", 
            "markersEnabled", 
            "savedHighScore", 
            "previewEnabled", 
            "KEY_SETTINGS", 
            "transEnabled", 
            "autoplayEnabled", 
            "currentLevel", 
            "isPaused", 
            "pausedHandler", 
            "keyspeed"
        ], function(options){
            
                console.log("====Settings Retrived====")
                resolve(options);
            })
        });
        value = await p
        configured_reset = true
    }
    //hello from the future!

    if (value.keyspeed == "normal"){
        var movementSpeed = 50
        console.log("normal speed")
    }else if (value.keyspeed == "faster"){
        var movementSpeed = 40
        console.log("faster speed")
    }else if (value.keyspeed == "evenfaster"){
        var movementSpeed = 30
        console.log("evenfaster speed")
    }else{
        console.log("error speed what the frick")
        console.log(value.keyspeed)
    }
    
    if (value.design == "clean") {
        var blockStyle = "smooth"
    } else if (value.design == "legends"){
        var blockStyle = "legends"
    } else{
        var blockStyle = "bold"
    }

    function goBack(){
        chrome.storage.local.set({ pausedHandler: true })
        playing=false
        mainmenu()
    }

    function pause(){
        chrome.storage.local.get(["isPaused"], function(pausedvalue) {
            if (!pausedvalue.isPaused){
                saveSettings();
                chrome.storage.local.set({ pausedHandler: true })
                window.location.replace("../html/pause.html");
            } else if (!playing){
                clearHoldCanvas();
                show('start');
                level=1
                html("level", level)
                enterToPlay("hide")
                lost = false;
                chrome.storage.local.set({ pausedHandler: false })
                chrome.storage.local.set({ isPaused: false })
                play();
                handled = true;
                isr = false;
            }
        });
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    document.getElementById('back').addEventListener('click', goBack);
    document.getElementById('pause').addEventListener('click', pause);
    document.getElementById('restart').addEventListener('click', restartbutton);

    html("high-score", value.savedHighScore)

    function restartbutton(){
        
        window.location.replace("../../popup.html");
        window.location.replace("../html/classic.html");

        setVisualScore();
        checkHighScore();
        playing = false;
        chrome.storage.local.set({
            isPlaying: false
        });


        chrome.storage.local.set({ isPaused: false });
        chrome.storage.local.set({ pausedHandler: false });
        enterToPlay("hide")
        clearHoldCanvas();
        show('start');
        level=1
        html("level", level)

        lost = false;

        play();
        handled = true;
        isr = false;
    }

    function saveSettings() {
        if (playing) {
            chrome.storage.local.set({
                isPlaying: true
            });
            drawHold()
            html("level", level)
        } else { // Set if game running or not
            chrome.storage.local.set({
                isPlaying: false
            });
        }
        chrome.storage.local.set({ grid: ldelay });//save delays for the smooth keystroke things
        chrome.storage.local.set({ grid: rdelay });

        chrome.storage.local.set({ grid: blocks }); // Save Grid
        chrome.storage.local.set({ clearedRows: rows }); // Save cleared Rows
        chrome.storage.local.set({ visualScore: vscore }); // Save Visual Score
        chrome.storage.local.set({ currentScore: score }); // Save Current Score
        chrome.storage.local.set({ currentPiece: current}); // Save Current Piece
        chrome.storage.local.set({ nextPiece: next}); // Save Next Piece
        chrome.storage.local.set({ timeSinceStart: dt}); // Save Time since start
        chrome.storage.local.set({ currentLevel: level});// Save current level
        if (pieceinHold){
            chrome.storage.local.set({ currentHold: hold_current}); // Save current hold piece
            chrome.storage.local.set({ ispieceinHold: true});
        } else {
            chrome.storage.local.set({ currentHold: hold_current}); // Save current hold piece
            chrome.storage.local.set({ ispieceinHold: false});
        }
        if (canSwap) {
            chrome.storage.local.set({ isabletoSwap: true});
        } else {
            chrome.storage.local.set({ isabletoSwap: false});
        }
        if (lost) {
            chrome.storage.local.set({ hasLost: true}); // Save lost var
        } else {
            chrome.storage.local.set({ hasLost: false});
        }
    }

    function easterEgg(){
        if (!playing){
            window.location.replace("../html/easteregg.html");
        }
    }

    function clearGameSettings() {
        chrome.storage.local.set({
            isPlaying: false
        });
        chrome.storage.local.set({ grid: {} }); // Save Grid
        chrome.storage.local.set({ clearedRows: 0 }); // Save cleared Rows
        chrome.storage.local.set({ visualScore: 0 }); // Save Visual Score
        chrome.storage.local.set({ currentScore: 0 }); // Save Current Score
        chrome.storage.local.set({ currentPiece: 0}); // Save Current Piece
        chrome.storage.local.set({ nextPiece: 0}); // Save Next Piece
        chrome.storage.local.set({ timeSinceStart: 0}); // Save Time since start
        chrome.storage.local.set({ currentLevel: 1});// Save current level
        chrome.storage.local.set({ currentHold: 0}); // Save current hold piece
        chrome.storage.local.set({ ispieceinHold: false});
        chrome.storage.local.set({ isabletoSwap: true});
    }


    // the game engine is from https://github.com/jakesgordon/javascript-tetris
    // i (TheSavageTeddy) modified it to fit with the extension and changed the style
    // and also some other changes
    // Roxiun did mostly local storage and also other stuff


    //-------------------------------------------------------------------------
    // base helper methods
    //-------------------------------------------------------------------------

    function get(id) {
        return document.getElementById(id);
    }
 
    function hide(id) {
        get(id).style.visibility = 'hidden';
    }

    function show(id) {
        get(id).style.visibility = null;
    }

    function html(id, html) {
        get(id).innerHTML = html;
    }

    function timestamp() {
        return new Date().getTime();
    }

var highscore = 0 //roxiun add local storage here

    function checkHighScore(){
        if (score>highscore){
            highscore = score
            if (value.savedHighScore>highscore) {
                highscore = value.savedHighScore
            } else {
                chrome.storage.local.set({ savedHighScore: highscore })
            }
            html("high-score", highscore)
        }
    }

    function lose(s) {
      setVisualScore();
      checkHighScore();
      playing = false;
      chrome.storage.local.set({
          isPlaying: false
      });
      //clearGameSettings()
      if (s=="lost"){
        enterToPlay("lost")
      }else{
        enterToPlay("show");
      } 
    }

    function random(min, max) {
        return (min + (Math.random() * (max - min)));
    }

    function randomChoice(choices) {
        return choices[Math.round(random(0, choices.length - 1))];
    }

    if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback, element) {
                window.setTimeout(callback, 1000 / 60);//60fps
            }
    }
    function swap(json){
        var ret = {};
        for(var key in json){
            ret[json[key]] = key;
        }
        return ret;
    }

    //-------------------------------------------------------------------------
    // game constants
    //-------------------------------------------------------------------------
    const keyCodes = {
        0: 'That key has no keycode',
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
        59: 'semicolon (firefox), equals',
        60: '<',
        61: 'equals (firefox)',
        63: 'ß',
        64: '@ (firefox)',
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
        91: 'Windows Key / Left ⌘ / Chromebook Search key',
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
        226: '< /git >, left back slash',
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

    const KeysDict = swap(keyCodes)

    var KEY = {
            ESC: 27,
            SPACE: parseInt(KeysDict[value.KEY_SETTINGS["HARD"]]),
            LEFT: parseInt(KeysDict[value.KEY_SETTINGS["LEFT"]]),
            UP: parseInt(KeysDict[value.KEY_SETTINGS["ROTATE_RIGHT"]]),
            RIGHT: parseInt(KeysDict[value.KEY_SETTINGS["RIGHT"]]),
            DOWN: parseInt(KeysDict[value.KEY_SETTINGS["SOFT"]]),
            ENTER: 13,
            Q: 81,
            C: parseInt(KeysDict[value.KEY_SETTINGS["HOLD"]])
        },

        DIR = {
            UP: 0,
            RIGHT: 1,
            DOWN: 2,
            LEFT: 3,
            MIN: 0,
            MAX: 3
        },
        speed = {
            start: 0.8,
            decrement: 0.005,
            min: 0.1,
            increase: 0.05
        }, // how long before piece drops by 1 row (seconds)
        nx = 10, // width of tetris court (in blocks)
        ny = 20, // height of tetris court (in blocks)
        nu = 5; // width/height of upcoming preview (in blocks)
    var elem = document.getElementById('canvas'),
        elemLeft = elem.offsetLeft,
        elemTop = 0,//elem.offsetTop,
        context = elem.getContext('2d'),
        elements = [];    
    var elem2 = document.getElementById('canvas'),
        elemLeft2 = elem2.offsetLeft,
        elemTop2 = 0,//elem.offsetTop,
        context2 = elem.getContext('2d'),
        elements2 = [];  
    if (value.transEnabled) {
        var canvas = get('canvas', { alpha: false }),
            ctx = canvas.getContext('2d'),
            ucanvas = get('upcoming', { alpha: false }),
            uctx = ucanvas.getContext('2d'),
            hcanvas = get('hold-canvas', { alpha: false }),
            hctx = hcanvas.getContext('2d'),
            bcanvas = get('canvas-back', { alpha: false }),
            bctx = bcanvas.getContext('2d');
        
    } else{
        var canvas = get('canvas'),
            ctx = canvas.getContext('2d'),
            ucanvas = get('upcoming'),
            uctx = ucanvas.getContext('2d'),
            hcanvas = get('hold-canvas'),
            hctx = hcanvas.getContext('2d'),
            bcanvas = get('canvas-back'),
            bctx = bcanvas.getContext('2d');   
    }

    //-------------------------------------------------------------------------
    // game variables (initialized during reset)
    //-------------------------------------------------------------------------
    let dpi = window.devicePixelRatio;
    var dx, dy, // pixel size of a single tetris block
        blocks, // 2 dimensional array (nx*ny) representing tetris court - either empty block or occupied by a 'piece'
        blocks_clean,
        actions, // queue of user actions (inputs)
        LRactions,
        playing, // true|false - game is in progress
        dt, // time since starting this game
        current, // the current piece
        next, // the next piece
        score, // the current score
        vscore, // the currently displayed score (it catches up to score in small chunks - like a spinning slot machine)
        rows, // number of completed rows in the current game
        backtoback, // back to back variable
        step, // how long before current piece drops by 1 row
        isr, // reset variable
        hold_current, // Current Hold Piece
        pieceinHold = false,
        paused = false,
        old_next,
        right_handled = false,
        left_handled = false,
        rightrepeat=false,
        leftrepeat=false,
        down_handled,
        old_current_piece,
        canSwap = true,
        keysPressed = [],
        left = false,
        right = false,
        rightthing=false,
        leftthing=false,
        isrotating = false,
        rota = false,
        rdelay = 0,
        ldelay = 0,
        
        level = 1,
        blindmode=false,//blind tetris
        rtimeout=0,
        ltimeout=0,
        handled,
        down;
        

    //-------------------------------------------------------------------------
    // tetris pieces
    //
    // blocks: each element represents a rotation of the piece (0, 90, 180, 270)
    //         each element is a 16 bit integer where the 16 bits represent
    //         a 4x4 set of blocks, e.g. j.blocks[0] = 0x44C0
    //
    //             0100 = 0x4 << 3 = 0x4000
    //             0100 = 0x4 << 2 = 0x0400
    //             1100 = 0xC << 1 = 0x00C0
    //             0000 = 0x0 << 0 = 0x0000
    //                               ------
    //                               0x44C0
    //
    //-------------------------------------------------------------------------
    //
    // COSMETIC STUFF
    //
    //-------------------------------------------------------------------------
    var peConfigured;
    var pe = new Image();
    pe.src = '../img/pe.svg';
    pe.onload = function(){
        peConfigured = true;
    }
    if (!value.sidebarEnabled){
        var reConfigured;
        var re = new Image();
        re.src = '../img/restart.png';
        re.onload = function(){
            reConfigured = true;
            elements.push({
                colour: '#FFFFFF',
                width: dx*2,
                height: dy*2,
                top: canvas.width/20,
                left: 30
            });
        };
        var paConfigured;
        var pa = new Image();
        pa.src = '../img/pause.png';
        pa.onload = function(){
            paConfigured = true;
            elements2.push({
                colour: '#FFFFFF',
                width: dx*2,
                height: dy*2,
                top: canvas.width/1.25,
                left: 30
            });
        }
    }


    if (value.hasBorder) {
        document.getElementById("canvas").style.outline = "white 3px solid";
        document.getElementById("upcoming").style.outline = "white 3px solid";
        document.getElementById("hold-canvas").style.outline = "white 3px solid";
    }
    if (value.sidebarEnabled) {
        document.getElementById('canvas-back').style.display = 'none';
        if (value.canvasSize == "big"){
            document.getElementById('canvas').style.height = '560px';
            document.getElementById('canvas').style.width = '280px';
            
            document.getElementById("classic-container").style.minWidth = "470px";

            //next canvas
            document.getElementById('upcoming').style.height = '135px';
            document.getElementById('upcoming').style.width = '135px';
            //hold canvas
            document.getElementById('hold-canvas').style.height = '135px';
            document.getElementById('hold-canvas').style.width = '135px';
        } else if (value.canvasSize == "medium"){
            document.getElementById('canvas').style.height = '500px';
            document.getElementById('canvas').style.width = '250px';
            document.getElementById("classic-container").style.minWidth = "420px";

            //next canvas
            document.getElementById('upcoming').style.height = '120px';
            document.getElementById('upcoming').style.width = '120px';
            //hold canvas
            document.getElementById('hold-canvas').style.height = '120px';
            document.getElementById('hold-canvas').style.width = '120px';

        } else {
            document.getElementById('canvas').style.height = '400px';
            document.getElementById('canvas').style.width = '200px';
            document.getElementById("classic-container").style.minWidth = "360px";
            //next canvas
            document.getElementById('upcoming').style.height = '90px';
            document.getElementById('upcoming').style.width = '90px';
            //hold canvas
            document.getElementById('hold-canvas').style.height = '90px';
            document.getElementById('hold-canvas').style.width = '90px';
        }
        document.getElementById("canvas").style.float = "left";
        document.getElementById("canvas").style.margin = "10px";
        if (!value.nextEnabled){
            document.getElementById('upcoming').style.display = 'none';
        }
        if (!value.holdEnabled){
            document.getElementById('hold-canvas').style.display = 'none';
        }
    } else {
        if (!value.markersEnabled || value.canvasSize != "big"){
            document.getElementById('canvas-back').style.display = 'none';
        }
        document.getElementById('sidebar').style.display = 'none';
        if (value.canvasSize == "big"){
            document.getElementById('canvas').style.height = '600px';
            document.getElementById('canvas').style.width = '280px';
        } else if (value.canvasSize == "medium"){
            document.getElementById('canvas').style.height = '500px';
            document.getElementById('canvas').style.width = '250px';
        } else {
            document.getElementById('canvas').style.height = '400px';
            document.getElementById('canvas').style.width = '200px';
        }
    }
    
    if (value.markersEnabled && !value.sidebarEnabled && value.canvasSize == "big"){
        document.getElementById('wrapper').style.position = "relative";
        document.getElementById('wrapper').style.height = "560px";
        document.getElementById('wrapper').style.width = "280px";
        document.getElementById('canvas').style.position = "absolute"
        document.getElementById('canvas').style.top = "0px";
        document.getElementById('canvas').style.left = "0px";
        document.getElementById('canvas-back').style.position = "absolute"
        document.getElementById('canvas-back').style.top = "0px";
        document.getElementById('canvas-back').style.left = "0px";   
    }

    if (value.design == "tetra" || value.design == "wool" || value.design == "crafty") {
        var tetra_images,
            tetra_ghost,
            icntr;
        icntr = 0
        tetra_images = {
            'blue':new Image(),
            'cyan':new Image(),
            'lime':new Image(),
            'magenta':new Image(),
            'orange':new Image(),
            'red':new Image(),
            'yellow':new Image()
        };
        tetra_ghost = {
            'blue':new Image(),
            'cyan':new Image(),
            'lime':new Image(),
            'magenta':new Image(),
            'orange':new Image(),
            'red':new Image(),
            'yellow':new Image()
        };
        if (value.design == "tetra") {
            for (const [key, value] of Object.entries(tetra_images)) {
                tetra_images[key].onload = function () {
                    icntr++;
                };
                tetra_images[key].src = `../img/assets/tetra/stack-${key}.svg`;
            };
            for (const [key, value] of Object.entries(tetra_ghost)) {
                tetra_ghost[key].onload = function () {
                    icntr++;
                };
                tetra_ghost[key].src = `../img/assets/tetra/ghost-${key}.svg`;
            };
        } else if (value.design == "crafty") {
            for (const [key, value] of Object.entries(tetra_images)) {
                tetra_images[key].onload = function () {
                    icntr++;
                };
                tetra_images[key].src = `../img/assets/crafty/${key}.jpeg`;
            };
        } else {
            for (const [key, value] of Object.entries(tetra_images)) {
                tetra_images[key].onload = function () {
                    icntr++;
                };
                tetra_images[key].src = `../img/assets/wool/wool_colored_${key}.jpeg`;
            };
        }
    }

    var bimg = new Image();
    bimg.src = '../img/assets/grid-bg-cross.svg'
    bimg.onload = function(){
        for (let yb = 1; yb <= ny; yb++) {         
            for (let xb = 0; xb <= nx; xb++) {
                bctx.drawImage(bimg, xb * dx, yb * dy, dx, dy);
            }
        }
    }
    

    //var blockStyle = "smooth"

    //
    //
    //
    var i = {
        size: 4,
        blocks: [0x0F00, 0x2222, 0x00F0, 0x4444],
        color: 'cyan'
    };
    var j = {
        size: 3,
        blocks: [0x8E00, 0x6440, 0x0E20, 0x44C0],
        color: 'blue'
    };
    var l = {
        size: 3,
        blocks: [0x2E00, 0x4460, 0x0E80, 0xC440],
        color: 'orange'
    };
    var o = {
        size: 2,
        blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00],
        color: 'yellow'
    };
    var s = {
        size: 3,
        blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620],
        color: 'lime'
    };
    var t = {
        size: 3,
        blocks: [0x4E00, 0x4640, 0x0E40, 0x4C40],
        color: 'magenta'
    };
    var z = {
        size: 3,
        blocks: [0x0C60, 0x4C80, 0xC600, 0x2640],
        color: 'red'
    };

    //------------------------------------------------
    // do the bit manipulation and iterate through each
    // occupied block (x,y) for a given piece
    //------------------------------------------------
    function eachblock(type, x, y, dir, fn) {
        var bit, result, row = 0,
            col = 0,
            blocks = type.blocks[dir];
        for (bit = 0x8000; bit > 0; bit = bit >> 1) {
            if (blocks & bit) {
                fn(x + col, y + row);
            }
            if (++col === 4) {
                col = 0;
                ++row;
            }
        }
    }

    //-----------------------------------------------------
    // check if a piece can fit into a position in the grid
    //-----------------------------------------------------
    function occupied(type, x, y, dir) {
        var result = false
        eachblock(type, x, y, dir, function(x, y) {
            if ((x < 0) || (x >= nx) || (y < 0) || (y >= ny) || getBlock(x, y))
                result = true;
        });
        return result;
    }

    function unoccupied(type, x, y, dir) {
        return !occupied(type, x, y, dir);
    }

    //-----------------------------------------
    // start with 4 instances of each piece and
    // pick randomly until the 'bag is empty'
    //-----------------------------------------
    var pieces = [];

    function randomPiece() {
        if (pieces.length == 0)
            pieces = [i, j, l, o, s, t, z];
        var type = pieces.splice(random(0, pieces.length - 1), 1)[0];
        if (type == j || type == l || type == t || type == o) {
            return {
                type: type,
                dir: DIR.UP,
                x: 4,
                y: 1,
                piece_type: 0
            };
        } else if (type == i){
            return {
                type: type,
                dir: DIR.UP,
                x: 3,
                y: 0,
                piece_type: 1
            };
        }else {
            return {
                type: type,
                dir: DIR.UP,
                x: 4,
                y: 0,
                piece_type: 2
            };
        }

    }


    //-------------------------------------------------------------------------
    // GAME LOOP
    //-------------------------------------------------------------------------

    function run() {
        addEvents(); // attach keydown and resize events
        var now = timestamp();
        var last = now = timestamp();
        var alr = true
        html("level", level)

//-------------------------------------------------------------------------
// MAIN LOOP
//-------------------------------------------------------------------------

        function frame() {
            //saveSettings() 
            //removed due to laggy
            now = timestamp();
            if (rota){
                rota = false
                requestAnimationFrame(frame, canvas);
            }else{
                update(Math.min(1, (now - last) / 1000.0)); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
                draw();
                checkHighScore()

                if (!left){
                    ldelay=0
                }
                if (!right){
                    rdelay=0
                }
   
                
                ctx.strokeStyle = "#FF0000";
                ctx.strokeRect(0, canvas.height/20, canvas.width, 1);
                ctx.strokeStyle = "#000000";
                last = now;
                requestAnimationFrame(frame, canvas);
                draw()
            if (!lost){
              if (alr){
                  if (playing){
                      enterToPlay("hide");
                      alr=false
                  }else{
                      enterToPlay("show");
                  }
              }
          } else{
            enterToPlay("lost")
          }
            ctx.strokeStyle = "#FF0000";
            ctx.strokeRect(0, canvas.height/20, canvas.width, 1);
            ctx.strokeStyle = "#000000";
        }
        }

        resize(); // setup all our sizing information
        reset(); // reset the per-game variables
        frame(); // start the first frame

    }

    function restart(event){
        var x = event.pageX - elemLeft,
            y = event.pageY - elemTop;
        elements.forEach(function(element) {
            console.log(elements)
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
                console.log('clicked an element');
                console.log("restart called");
                lose("kys");
                show('start');
                level=1
                html("level", level)
                enterToPlay("hide")
                lost = false
                play();
                handled = true;
                isr = false;
            }
        });
        var x2 = event.pageX - elemLeft2,
            y2 = event.pageY - elemTop2;
        y2 = y2+200
        x2 = x2-200;
        elements2.forEach(function(element2) {
            if (y2 > element2.top && y2 < element2.top + element2.height && x2 > element2.left && x2 < element2.left + element2.width) {
                pause();
            }
        });
    }

    function addEvents() {
        try {
            document.removeEventListener("keydown", keydown);
            document.removeEventListener('keyup', keyup, false);
        } catch (e) {
            console.error(e)
        }
        document.addEventListener('keydown', keydown, false);
        document.addEventListener('keyup', keyup, false);
        if (!value.sidebarEnabled){
            elem.addEventListener('click', restart, false);
        }
        window.addEventListener('resize', resize, false);
    }

    function resize(event) {
        canvas.width = canvas.clientWidth; // set canvas logical size equal to its physical size
        canvas.height = canvas.clientHeight; // (ditto)
        ucanvas.width = ucanvas.clientWidth;
        ucanvas.height = ucanvas.clientHeight;
        hcanvas.width = ucanvas.clientWidth;
        hcanvas.height = ucanvas.clientHeight;
        dx = canvas.width / nx; // pixel size of a single tetris block
        dy = canvas.height / ny; // (ditto)
        invalidate();
        invalidateNext();
    }

    function keydown(ev) {
        var handled = false;
        switch (ev.keyCode) {
            
            case KEY.SPACE:
                if (playing==true){
                    harddrop()
                    handled = true;
                    break;
                }
            case KEY.DOWN:
                if (ev.repeat) {
                    if (down_handled){
                        down=true
                    }else{
                        down=true
                        downBetterKey()
                        down_handled=true
                    }
                }else{
                    down=true
                    downBetterKey()
                }
                handled = true;
                break;
            case KEY.LEFT:
                if (ev.repeat) {
                    leftrepeat=true
                    if (left_handled){
                        left=true
                    }else{
                        left=true
                        leftBetterKey()
                        left_handled=true
                    }
                }else{
                    leftrepeat=false
                    left=true
                    leftBetterKey()
                }
                handled = true;
                break;
            case KEY.RIGHT:
                if (ev.repeat) {
                    rightrepeat=true
                    if (right_handled){
                        
                        right=true
                    }else{
                        right=true
                        rightBetterKey()
                        right_handled=true
                    }
                    
                } else {
                    rightrepeat=false
                    right=true
                    rightBetterKey()
                    handled = true;

                }
                handled = true;
                break;

            case KEY.UP:
                actions.push(DIR.UP);
                handled = true;
                break;

            case KEY.ESC:
                window.close();
                handled = true;
                break;
            
        }
        if (ev.keyCode == KEY.ENTER) {
            /*if (!value.pausedHandler && !value.isPaused && value.autoplayEnabled){
                pieceinHold = false
                chrome.storage.local.set({ ispieceinHold: false});
            }*/
            clearHoldCanvas();
            show('start');
            level=1
            html("level", level)
            enterToPlay("hide")
            lost = false;
            chrome.storage.local.set({ isPaused: false });
            chrome.storage.local.set({ pausedHandler: false });
            play();
            handled = true;
            isr = false;
        }
        if (ev.keyCode == KEY.SPACE) {
            //harddrop()
        }
        if (ev.keyCode == KEY.C) {
            if (value.holdEnabled && value.sidebarEnabled){
                hold()
            }
        }
        if (ev.keyCode == KEY.Q) {
            lose("kys")
            mainmenu()
        }
        if (ev.keyCode == 80) { // P
            pause();
        }
        if (handled)
            ev.preventDefault(); // prevent arrow keys from scrolling the page (supported in IE9+ and all other browsers)
        if (ev.keyCode == 84 || ev.keyCode == 69 || ev.keyCode == 82 || ev.keyCode == 65 || ev.keyCode == 73 || ev.keyCode == 78){
            keysPressed.push(keyCodes[ev.keyCode])
            var combined = keysPressed.join("")
            if (combined.includes("tetrain")){
                easterEgg();
            }
        }
    }

    function keyup(ev) {
        switch (ev.keyCode) {

            case KEY.LEFT:
                ldelay=0
                left = false;
                break;
            case KEY.RIGHT:
                rdelay=0
                right = false;
                break;
            
            case KEY.DOWN:

                down=false;
                
                break;
            
        }
    }

    async function leftBetterKey(){
        
        while (left){
            if (!right && unoccupied(current.type, current.x-1, current.y, current.dir)){        
                if (leftrepeat){
                    LRactions.push(DIR.LEFT);
                    await new Promise(r => setTimeout(r, movementSpeed));
                }else{
                    if (leftthing){
                        await new Promise(r => setTimeout(r, 10));

                    }else{

                        leftthing=true
                        LRactions.push(DIR.LEFT);
                        await new Promise(r => setTimeout(r, 150));
                        leftthing=false
                    }
                }
            }else{
                await new Promise(r => setTimeout(r, 10));
            }
        }
    }
    

    async function rightBetterKey(){
        while (right){
            if (!left && (unoccupied(current.type, current.x+1, current.y, current.dir))){
                if (rightrepeat){
                    LRactions.push(DIR.RIGHT);
                    await new Promise(r => setTimeout(r, movementSpeed));
                }else{
                    if (rightthing){
                        await new Promise(r => setTimeout(r, 10));
                    }else{
                        rightthing=true
                        LRactions.push(DIR.RIGHT);
                        await new Promise(r => setTimeout(r, 150));
                        rightthing=false
                    }            
                }
            }else{
                await new Promise(r => setTimeout(r, 10));
            }
    }
    }


    async function downBetterKey(){
        while (down){
            LRactions.push(DIR.DOWN);
            await new Promise(r => setTimeout(r, movementSpeed+30));
        }
    }


    //-------------------------------------------------------------------------
    // GAME LOGIC
    //-------------------------------------------------------------------------

    function play() {
        hide('start');
        reset();
        playing = true;
        isr = false;
        paused = false;
        chrome.storage.local.set({
            isPlaying: true
        });
        chrome.storage.local.set({ pausedHandler: false });
    }

    function setVisualScore(n) {
        vscore = n || score;
        invalidateScore();
    }

    function setScore(n) {
        score = n;
        setVisualScore(n);
    }

    function addScore(n) {
        score = score + n;
    }

    function clearScore() {
        setScore(0);
    }

//error found here propety 7 0

    function clearRows() {
        //for(i=0; i<10; i++){
            try{
                
                setRows(0);
                //break;
            }catch(e){
                console.log(e)

                //(disabled) sets score to error message, waits 2000ms
                //document.getElementById("score").innerHTML="AN ERROR HAS OCCURED: RESTARTING GAME, YOUR GAME WILL NOT BE SAVED, BUT HIGHSCORE WILL"
                //sleep(2000)

                //basically presses q
                lose("kys")
                mainmenu()
            }
        //}
    }

    function setRows(n) {
        rows = n;

        if (speed.start - (speed.increase*level)<0.001){
            step = Math.max(speed.min, speed.start - (speed.start+0.01));
        }else{
            step = Math.max(speed.min, speed.start - (speed.increase*level));
        }

        invalidateRows();
    }

    function addRows(n) {
        setRows(rows + n);
    }

    function getBlock(x, y) {
        return (blocks && blocks[x] ? blocks[x][y] : null);
    }

    function setBlock(x, y, type) {
        blocks[x] = blocks[x] || [];
        blocks[x][y] = type;
        invalidate();
    }

    function clearBlocks() {
        blocks = [];
        invalidate();
    }

    function clearActions() {
        actions = [];
        LRactions=[]
    }

    function setCurrentPiece(piece) {
        current = piece || randomPiece();
        invalidate();
    }

    function setNextPiece(piece) {
        next = piece || randomPiece();
        invalidateNext();
    }

    function reset() {
        if (isr) {
            dt = 0;
            canSwap = true;
            clearActions();
            clearBlocks();
            clearRows();
            clearScore();
            setCurrentPiece(next);
            setNextPiece();
            clearHoldCanvas();

            rdelay=0
            ldelay=0
            left=false
            right=false
            down=false
            pieceinHold=false
            var configured_reset = false;
            rrs();

        } else if (value.isPlaying || value.pausedHandler) {
            dt = 0;
            clearActions();
            clearBlocks();
            clearRows();
            clearScore();
            setCurrentPiece(next);
            setNextPiece();
            dt = value.timeSinceStart;
            blocks = value.grid;
            current = value.currentPiece;
            score = value.currentScore;
            vscore = value.visualScore;
            rows = value.clearedRows
            next = value.nextPiece;
            lost = value.hasLost;
            level = value.currentLevel
            if (value.ispieceinHold){
                pieceinHold = true;
                hold_current = value.currentHold;
                drawHold();
            } else {
                pieceinHold = false;
                clearHoldCanvas();
            }
            if (value.isabletoSwap) {
                canSwap = true;
            } else {
                canSwap = false;
            }
            setCurrentPiece(current);
            setNextPiece(next);
            





            rdelay=0
            ldelay=0
            left=false
            down=false
            right=false
        } else {
            dt = 0;
            canSwap = true;
            clearActions();
            clearBlocks();
            clearRows();
            clearScore();
            setCurrentPiece(next);
            setNextPiece();
        }
    }
  
    function update(idt) {
        //transform(m11, m12, m21, m22, dx, dy)
        //ctx.transform(1, 1, -1, 1, 0, 0);
        if (playing) {
            setVisualScore(score);
            handle(actions.shift());
            LRhandle(LRactions.shift());
            dt = dt + idt;
            if (dt > step) {
                saveSettings()
                dt = dt - step;
                isrotating=false
                drop();    
            }
        }
    }

    function LRhandle(LRaction) {
        switch (LRaction) {
            case DIR.LEFT:
                if (unoccupied(current.type, current.x-1, current.y, current.dir)){
                    rdelay=0
                    move(DIR.LEFT);    
                }
                saveSettings()
                break;
            case DIR.RIGHT:
                if (unoccupied(current.type, current.x+1, current.y, current.dir)){
                    ldelay=0
                    move(DIR.RIGHT);     
                }
                saveSettings()
                break;
            case DIR.DOWN:
                if (unoccupied(current.type, current.x, current.y+1, current.dir)){
                    move(DIR.DOWN);    
                }
                saveSettings()
                break;
        }
    }


    function handle(action) {
        switch (action) {
            case DIR.UP:
                rotate();
                saveSettings()
                break;
        }
    }

    function move(dir) {
        var x = current.x,
            y = current.y;
        switch (dir) {
            case DIR.RIGHT:
                x = x + 1;
                break;
            case DIR.LEFT:
                x = x - 1;
                break;
            case DIR.DOWN:
                y = y + 1;;
                break;
            case DIR.RIGHTTWICE:
                x = x + 2;
                break;
            case DIR.LEFTTWICE:
                x = x - 2;
                break;
        }
        if (unoccupied(current.type, x, y, current.dir)) {
            current.x = x;
            current.y = y;
            invalidate();
            return true;
        } else {
            return false;
        }
    }


    // (default)
    // COLOURS/COLORS
    // I piece = light blue
    // L piece = orange
    // J piece = blue
    // O piece = yellow
    // S piece = green
    // Z piece = red
    //
    //
    //
    //NOTE ABOUT ROTATE
    //
    //i dont know WHY but you must put current.dir=newdir in front of the move() 
    //thing or else pieces will glitch on the border of the canvas
    //with a 2 block wide gap, L spin possible on the right column
    //
    //but for some reason, ONLY FOR USING THE MOVE FUNCTION TWICE 
    //you need to put the move() before
    //current.dir=newdir otherwise the 'I' piece
    //can rotate into the wall without a specific setup,
    //but with a specific rotation (I piece straight rotation
    //lean left side then put it against the right wall
    //and it will glitch)
    //
    //
    //i have fixed these though

    function rotate() {
        var newdir = (current.dir == DIR.MAX ? DIR.MIN : current.dir + 1);
        var newreversedir = (current.dir == DIR.MAX ? DIR.MIN : current.dir -1);
        if (unoccupied(current.type, current.x, current.y, newdir)) {
            current.dir = newdir;
            //rota=true
            isrotating==true
            invalidate();
    //x+1 is move right
    //x-1 is move left
        } else if (current.type == z) { //cant rotate left side
            if (unoccupied(current.type, current.x + 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.RIGHT)
                
                rota = true
                isrotating==true
                invalidate();
            } else if (unoccupied(current.type, current.x-1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.LEFT)
                
                rota = true
                isrotating==true
                invalidate();
            }
        } else if (current.type == s) { //cant rotate right side
            if (unoccupied(current.type, current.x - 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.LEFT)
                
                rota = true
                isrotating==true
                invalidate();
            } else if (unoccupied(current.type, current.x + 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.RIGHT)

                rota = true
                isrotating==true
                invalidate();
            }
        } else if (current.type == l) { //cant rotate left side
            if (unoccupied(current.type, current.x + 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.RIGHT)

                rota = true
                isrotating==true
                invalidate();
            }else if (unoccupied(current.type, current.x - 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.LEFT)

                rota = true
                invalidate();
            }
        }else if (current.type== j){
            if (unoccupied(current.type, current.x - 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.LEFT)

                rota = true
                isrotating==true
                invalidate();
            }else if (unoccupied(current.type, current.x + 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.RIGHT)

                rota = true
                invalidate();
            }
        } else if (current.type == t){//both sides need check
            if (unoccupied(current.type, current.x - 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.LEFT)
                
                rota = true
                isrotating==true
                invalidate();
                
            }else if (unoccupied(current.type, current.x + 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.RIGHT)
                
                rota = true
                invalidate();
            }
        } else if (current.type== i){
            
            if (unoccupied(current.type, current.x - 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.LEFT)
                isrotating==true
                rota = true
                invalidate();
            }else if (unoccupied(current.type, current.x + 1, current.y, newdir)) {
                current.dir = newdir;
                move(DIR.RIGHT)
                isrotating==true
                rota = true
                invalidate();
            }
        }
    }

    function drawNoSidebarScore(){
        if (!value.sidebarEnabled){
            ctx.font = "60px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.fillText(score, canvas.width/2, 80);
            if (reConfigured){
                ctx.drawImage(re, canvas.width/20, 30 , dx*2, dy*2);
            }
            if (paConfigured){
                ctx.drawImage(pa, canvas.width/1.25, 30 , dx*2, dy*2);
            }
        }
    }

    function drop() {
        if (!move(DIR.DOWN) && !isrotating) {
            dropPiece();
            removeLines();
            setCurrentPiece(next);
            setNextPiece(randomPiece());
            clearActions();
            canSwap = true;
            if (occupied(current.type, current.x, current.y, current.dir)) {
                lose("lost");
            }
        }
    }

    function dropPiece() { //not when dropping from top, its when it touches bottom/other pieces
        eachblock(current.type, current.x, current.y, current.dir, function(x, y) {
            setBlock(x, y, current.type);
        });
    }

    function removeLines() {
        var x, y, complete, n = 0;
        for (y = ny; y > 0; --y) {
            complete = true;
            for (x = 0; x < nx; ++x) {
                if (!getBlock(x, y))
                    complete = false;
            }
            if (complete) {
                removeLine(y);
                y = y + 1; // recheck same line
                n++;
            }
        }
        if (n > 0) {
            addRows(n);
            if (n < 4) {
                addScore((100 + ((n - 1) * 200))*level); // 1: 100, 2: 300, 3: 500, 4: 800
                backtoback=false
            } else {
                if (backtoback) {
                    addScore(1200*level);
                } else {
                    addScore(800*level);
                    backtoback=true
                }
            }
            if (rows==0){
            }else{
                level=Math.floor(rows/10)+1
                html("level", level)
            }
        
        }
    }

    function harddrop() {
        var x = current.x,
            y = current.y;
        var ii = 0

        while (unoccupied(current.type, x, y + ii, current.dir)) {
            ii = ii + 1
        }
        
        addScore((ii-1)*2)
        current.y = y + ii - 1
        drop()
    }

    function hold() {
        if (canSwap) {
            if (pieceinHold) {
                try {
                    if (hold_current.piece_type == 0){
                        hold_current = {
                            type: hold_current.type,
                            dir: DIR.UP,
                            x: 4,
                            y: 1,
                            piece_type: 0
                        }
                    } else if (hold_current.piece_type == 1){
                        hold_current = {
                            type: hold_current.type,
                            dir: DIR.UP,
                            x: 3,
                            y: 0,
                            piece_type: 1
                        }
                    } else {
                        hold_current = {
                            type: hold_current.type,
                            dir: DIR.UP,
                            x: 4,
                            y: 0,
                            piece_type: 2
                        }
                    }
                    pieceinHold = true;
                    canSwap = false;
                    old_current_piece = current;
                    setCurrentPiece(hold_current);
                    hold_current = old_current_piece
                    drawHold();
                } catch(err) {
                    console.log(err)
                }
            } else {
                pieceinHold = true;
                canSwap = false;
                hold_current = current;
                if (hold_current.piece_type == 0){
                    hold_current = {
                        type: hold_current.type,
                        dir: DIR.UP,
                        x: 4,
                        y: 1,
                        piece_type: 0
                    }
                } else if (hold_current.piece_type == 1){
                    hold_current = {
                        type: hold_current.type,
                        dir: DIR.UP,
                        x: 3,
                        y: 0,
                        piece_type: 1
                    }
                } else {
                    hold_current = {
                        type: hold_current.type,
                        dir: DIR.UP,
                        x: 4,
                        y: 0,
                        piece_type: 2
                    }
                }
                old_next = next;
                setCurrentPiece(next);
                setNextPiece();
                drawHold();
            }
        }
    }
    

    function removeLine(n) {
        var x, y;
        for (y = n; y >= 0; --y) {
            for (x = 0; x < nx; ++x)
                setBlock(x, y, (y == 0) ? null : getBlock(x, y - 1));
        }
    }

    //-------------------------------------------------------------------------
    // RENDERING
    //-------------------------------------------------------------------------

    var invalid = {};

    function invalidate() {
        invalid.court = true;
    }

    function invalidateNext() {
        invalid.next = true;
    }

    function invalidateScore() {
        invalid.score = true;
    }

    function invalidateRows() {
        invalid.rows = true;
    }

    function draw() {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FF0000";
        ctx.strokeRect(0, canvas.height/20, canvas.width, 1);
        ctx.strokeStyle = "#000000";

        if (blockStyle == "smooth") {

        } else if (blockStyle == "legends"){
            ctx.lineWidth = 1;
            ctx.translate(0.5, 0.5); // for crisp 1px black lines
        } else{
            ctx.lineWidth = 5;
            ctx.translate(0.5, 0.5);
            ctx.lineWidth = 1;
        }
        drawCourt();
        drawNext();
        drawScore();
        if (!value.sidebarEnabled){
            drawNoSidebarScore();
        }

        drawRows();
        if (value.previewEnabled){
            if(!blindmode){
                drawGhost();
            }
            
        }
        ctx.restore();

    }
    
    function drawGhost(){
        var type = current.type,
        x=current.x,
        y=current.y,
        dir=current.dir;

        var ii=0
        while (unoccupied(current.type, x, y + ii, current.dir)) {
            ii = ii + 1
        }

        y=y+ii-1

        eachblock(type, x, y, dir, function(x, y) {
            drawGhostBlock(ctx, x, y, type.color);
        });
    }
    

    function drawCourt() {
        
        if (invalid.court) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (playing)
                drawPiece(ctx, current.type, current.x, current.y, current.dir);
            var x, y, block;
            for (y = 0; y < ny; y++) {
                for (x = 0; x < nx; x++) {
                    if (block = getBlock(x, y)){
                        if (!blindmode){
                            drawBlock(ctx, x, y, block.color);
                        }
                    }
                }
            }
            ctx.strokeRect(0, 0, nx * dx - 1, ny * dy - 1); // court boundary
            invalid.court = false;
        }
    }

    function drawNext() {
        if (invalid.next) {
            if (next.type.size == 2){
                var padding = ((next.type.size) / 2)+(2/5);

            }else if (next.type.size == 3){
                var padding = 4/5+0.092;
            }else if (next.type.size == 4){
                var padding = 2/5-(0.092);
            }
            uctx.save();
            if (blockStyle == "smooth") { 

            } else if (blockStyle == "legends"){
                uctx.lineWidth = 1;
                uctx.translate(0.5, 0.5); // for crisp 1px black lines
                
            } else{
                uctx.lineWidth = 2;
                uctx.translate(0.5, 0.5);
                uctx.lineWidth = 1;

            }

            uctx.clearRect(0, 0, nu * dx, nu * dy);
            drawPiece(uctx, next.type, padding, padding, next.dir);
            uctx.strokeStyle = 'black';
            uctx.strokeRect(0, 0, nu * dx - 1, nu * dy - 1);
            uctx.restore();
            invalid.next = false;
        }
    }

    function drawHold() {
        if (pieceinHold) {
            try {
                if (hold_current.type.size == 2){
                    var paddingh = ((hold_current.type.size) / 2)+(2/5);
    
                }else if (hold_current.type.size == 3){
                    var paddingh = 4/5
                }else if (hold_current.type.size == 4){
                    var paddingh = 2/5-(0.092);
                }
                
                hctx.save();
                if (blockStyle == "smooth") {

                } else if (blockStyle == "legends"){
                    hctx.lineWidth = 1;
                    hctx.translate(0.5, 0.5); // for crisp 1px black lines
                } else{
                    hctx.lineWidth = 2;
                    hctx.translate(0.5, 0.5);
                    hctx.lineWidth = 1;
                }

                hctx.clearRect(0, 0, nu * dx, nu * dy);
                drawPiece(hctx, hold_current.type, paddingh, paddingh, next.dir);
                hctx.strokeStyle = 'black';
                hctx.strokeRect(0, 0, nu * dx - 1, nu * dy - 1);
                hctx.restore();
            }
            catch(err) {
                console.log(err)
            }
        }
    }

    function clearHoldCanvas(){
        if (!pieceinHold || !value.ispieceinHold){
            hctx.clearRect(0, 0, hcanvas.width, hcanvas.height);
        }
    }

    function drawScore() {
        if (invalid.score) {
            html('score', (vscore));
            invalid.score = false;
        }
    }

    function drawRows() {
        if (invalid.rows) {
            html('rows', rows);
            invalid.rows = false;
        }
    }

    function drawPiece(ctx, type, x, y, dir) {
        eachblock(type, x, y, dir, function(x, y) {
            drawBlock(ctx, x, y, type.color);
        });
    }

    function drawBlock(ctx, x, y, color) {
        if (value.design == "tetra" || value.design == "wool" || value.design == "crafty") {
            ctx.drawImage(tetra_images[color], x * dx, y * dy, dx, dy);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(x * dx, y * dy, dx, dy);
        }
    }

    function drawGhostBlock(ctx, x, y, color) {
        if(!blindmode){//no ghost blocks for blind mode
            if (value.design == "tetra" || value.design == "wool" || value.design == "crafty") {
                ctx.drawImage(tetra_ghost[color], x * dx, y * dy, dx, dy);
            } else {
                ctx.strokeStyle = color;
                ctx.strokeRect(x * dx, y * dy, dx-1, dy-1);
                ctx.strokeStyle = "#000000";
            }
        }

    }

    //draw the press enter to play
    var lost = false //
    function enterToPlay(t) {
        if (t=="show"){
            ctx.font = "40px Monospace";
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.fillText("Enter", canvas.width/2, 200);
            ctx.fillText("to play", canvas.width/2, 240);

            ctx.font = "40px Monospace";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.strokeText("Enter", canvas.width/2-3, 200);
            ctx.strokeText("to play", canvas.width/2-3, 240);
            ldelay=0
            rdelay=0
            
        } else if (t == "lost"){
            lost = true//
            playing = false
            isr = true
            pieceinHold = false
            chrome.storage.local.set({ ispieceinHold: false});
            ctx.font = "40px Monospace";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText("You died!", canvas.width/2, 200);
            ctx.fillText("Enter to", canvas.width/2, 240);
            ctx.fillText("play again", canvas.width/2, 280);

            ctx.font = "Monospace";
            ctx.fillStyle = "#000000";
            ctx.textAlign = "center";
            ctx.strokeText("You died!", canvas.width/2, 200);
            ctx.strokeText("Enter to", canvas.width/2, 240);
            ctx.strokeText("play again", canvas.width/2, 280);

            
          
        }else{
          //ctx.clearRect(0, 100, 300, 300);
          //im fricking dumb
          //we dont even need to clear it aaaaa
        }
    }




    //-------------------------------------------------------------------------
    // FINALLY, lets run the game
    //-------------------------------------------------------------------------

    run();

    if (value.autoplayEnabled && !value.isPaused){
        show('start');
        level=Math.floor(rows/10)+1
        html("level", level)

        enterToPlay("hide")
        lost = false;
        play();
        handled = true;
        isr = false;
    }




}

game();