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

function backPage(){
    window.location.replace("../html/help.html");
}

function frontPage(){
    //window.location.replace("../../help2.html");
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', goBack);

    document.getElementById('backpage').addEventListener('click', backPage);
    document.getElementById('frontpage').addEventListener('click', frontPage);

    document.addEventListener('keydown', keydown, false);
});