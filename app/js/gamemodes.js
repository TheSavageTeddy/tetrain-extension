

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

function piecesOver(){
    changeHTML("infotext", "Change pieces used!<br><i>Highscores will not be saved if<br>changed, press reset to reset</i><br>")
}

function piecesOut(){
    changeHTML("infotext", "<br><br><br>")
}


function piecesReset(){
    getHTML("text-input").value = "I O L J Z S T"
}



function classicGame(){

    var piecebag = getHTML("text-input").value
    chrome.storage.local.set({ pieceBag: piecebag});
    chrome.storage.local.get(["pieceBag"], function(local_config) {   
        console.log(local_config.pieceBag)
    });

    if (piecebag == "I O L J Z S T"){
        chrome.storage.local.set({ canhighscore: true});
    }else{
        chrome.storage.local.set({ canhighscore: false});
    }

    chrome.storage.local.get(["canhighscore"], function(local_config) {   
        console.log(local_config.canhighscore)
    });
    

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

//highscore is false anyways
    var piecebag = getHTML("text-input").value
    chrome.storage.local.set({ pieceBag: piecebag});
    chrome.storage.local.get(["pieceBag"], function(local_config) {   
        console.log(local_config.pieceBag)
    });


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

    //highscore is false anyways
    var piecebag = getHTML("text-input").value
    chrome.storage.local.set({ pieceBag: piecebag});
    chrome.storage.local.get(["pieceBag"], function(local_config) {   
        console.log(local_config.pieceBag)
    });

    
    
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

    getHTML("pieces-reset-button").addEventListener('click', piecesReset)

    document.addEventListener('keydown', keydown, false);

    var practice = getHTML("practice")
    var classic = getHTML("classic")
    var ghost = getHTML("ghost")
    var startlevelelement = getHTML("myRange")
    var startlevelelement = getHTML("text-input")

    //yes i can just use one function for the out function but like just in case
    //ok im not bad plz..
    practice.addEventListener("mouseover", practiceOver);
    practice.addEventListener("mouseout", practiceOut);

    classic.addEventListener("mouseover", classicOver);
    classic.addEventListener("mouseout", classicOut);

    ghost.addEventListener("mouseover", ghostOver);
    ghost.addEventListener("mouseout", ghostOut);

    startlevelelement.addEventListener("mouseover", lvlOver);
    startlevelelement.addEventListener("mouseout", lvlOut);

    startlevelelement.addEventListener("mouseover", piecesOver);
    startlevelelement.addEventListener("mouseout", piecesOut);
});

