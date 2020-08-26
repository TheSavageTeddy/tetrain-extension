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


/* unused, i merged the pages
function backPage(){
    //nothing, already the most back page
}

function frontPage(){
    window.location.replace("../html/help2.html");
}

*/

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', goBack);

    /*
    document.getElementById('backpage').addEventListener('click', backPage);
    document.getElementById('frontpage').addEventListener('click', frontPage);
    */

    document.addEventListener('keydown', keydown, false);
});