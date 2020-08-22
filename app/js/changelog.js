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
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', goBack);
    document.addEventListener('keydown', keydown, false);
});