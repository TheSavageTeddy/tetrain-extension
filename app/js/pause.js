function goBack(){
    window.location.replace("../html/classic.html");
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.set({ isPaused: true })
    goBack();
});