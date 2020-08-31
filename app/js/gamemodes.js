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
    isPracticeHover = true
    changeHTML("infotext", "Keep playing!<br>The blocks don't speed up!<br>")
    
}

function practiceOut(){
    isPracticeHover = false
    changeHTML("infotext", "<br><br>")
}

var isPracticeHover = false;


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', goBack);

    document.addEventListener('keydown', keydown, false);


    var practice = getHTML("practice")
    console.log(practice)

    practice.addEventListener("mouseover", practiceOver);
    practice.addEventListener("mouseout", practiceOut);
});