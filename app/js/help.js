function goBack(){
    window.location.replace("../../popup.html");
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('back').addEventListener('click', goBack);
});