

function goBack(){
    window.location.replace("../../popup.html");
}
function keydown(ev){
    switch (ev.keyCode) {
        case 66:
            goBack();
        case 37:
            goBack();
    }
}

function getHTML(id){
    return document.getElementById(id)
}

function changeHTML(id, text){
    document.getElementById(id).innerHTML = text
}

function practiceOver(){
    changeHTML("infotext", "Keep playing!<br>The blocks don't speed up<br><i>Highscores disabled</i>")
}

function practiceOut(){
    changeHTML("infotext", "<br><br><br>")
}

function classicOver(){
    changeHTML("infotext", "The classic block game, with<br>levels!<br><br>")
}

function classicOut(){
    changeHTML("infotext", "<br><br><br>")
}

function ghostOver(){
    changeHTML("infotext", "Pieces are invisible when dropped!<br>Press 'F' to flash to see pieces until <br>you drop the current piece<br>")
}

function ghostOut(){
    changeHTML("infotext", "<br><br><br>")
}

function lvlOver(){
    changeHTML("infotext", "Change the level the<br>game starts on!<br><br>")
}

function lvlOut(){
    changeHTML("infotext", "<br><br><br>")
}

function classicGame(){
    chrome.storage.local.set({ canhighscore: true});

    var startlevel = getHTML("myRange").value
    chrome.storage.local.set({ startinglevel: startlevel});
    chrome.storage.local.get(["startinglevel"], function(local_config) {   
        console.log(local_config.startinglevel)
    });

    //ghost mode to false
    var ghostmode = false
    chrome.storage.local.set({ ghostmode: ghostmode});
    //

    console.log(startlevel)

    var practiceMode = false
    chrome.storage.local.set({ practicemode: practiceMode})


    window.location.replace("../html/classic.html");
}

function ghostGame(){
    chrome.storage.local.set({ canhighscore: false});
    //get starting level
    var startlevel = getHTML("myRange").value
    chrome.storage.local.set({ startinglevel: startlevel});
    //ghostmode on
    var ghostmode = true
    chrome.storage.local.set({ ghostmode: ghostmode});
    chrome.storage.local.get(["ghostmode"], function(local_config) {   
        console.log(local_config.ghostmode)
    });

    var practiceMode = false
    chrome.storage.local.set({ practicemode: practiceMode})

    window.location.replace("../html/classic.html");
}

function practiceGame(){

    chrome.storage.local.set({ canhighscore: false});
    
    var startlevel = getHTML("myRange").value
    chrome.storage.local.set({ startinglevel: startlevel});
    //ghostmode off
    var ghostmode = false
    chrome.storage.local.set({ ghostmode: ghostmode});
    chrome.storage.local.get(["ghostmode"], function(local_config) {   
        console.log(local_config.ghostmode)
    });

    var practiceMode = true
    chrome.storage.local.set({ practicemode: practiceMode})

    window.location.replace("../html/classic.html");
}

document.addEventListener('DOMContentLoaded', function () {
    getHTML("back").addEventListener('click', goBack);

    getHTML("classic").addEventListener('click', classicGame);

    getHTML("ghost").addEventListener('click', ghostGame);

    getHTML("practice").addEventListener('click', practiceGame);

    document.addEventListener('keydown', keydown, false);

    var practice = getHTML("practice")
    var classic = getHTML("classic")
    var ghost = getHTML("ghost")
    var startlevelelement = getHTML("myRange")

    practice.addEventListener("mouseover", practiceOver);
    practice.addEventListener("mouseout", practiceOut);

    classic.addEventListener("mouseover", classicOver);
    classic.addEventListener("mouseout", classicOut);

    ghost.addEventListener("mouseover", ghostOver);
    ghost.addEventListener("mouseout", ghostOut);

    startlevelelement.addEventListener("mouseover", lvlOver);
    startlevelelement.addEventListener("mouseout", lvlOut);
});

