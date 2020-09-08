

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

function lvlOver(){
    changeHTML("infotext", "Change the level the<br>game starts on!<br><br>")
}

function lvlOut(){
    changeHTML("infotext", "<br><br><br>")
}

function classicGame(){
    var startlevel = getHTML("myRange").value

    console.log(startlevel)

    chrome.storage.local.set({ startinglevel: startlevel});
    chrome.storage.local.get(["startinglevel"], function(local_config) {   
        console.log(local_config.startinglevel)
    });

    window.location.replace("../html/classic.html");
}

document.addEventListener('DOMContentLoaded', function () {
    getHTML("back").addEventListener('click', goBack);

    getHTML("classic").addEventListener('click', classicGame);

    document.addEventListener('keydown', keydown, false);

    var practice = getHTML("practice")
    var classic = getHTML("classic")
    var startlevelelement = getHTML("myRange")

    practice.addEventListener("mouseover", practiceOver);
    practice.addEventListener("mouseout", practiceOut);

    classic.addEventListener("mouseover", classicOver);
    classic.addEventListener("mouseout", classicOut);

    startlevelelement.addEventListener("mouseover", lvlOver);
    startlevelelement.addEventListener("mouseout", lvlOut);
});