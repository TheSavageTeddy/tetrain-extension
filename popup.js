

function hidemenu(){ //this function in unnessasary, keep it just in case
  m = document.getElementById("menu-items")
  m.style.display = "none"
}

function classic() {

  window.location.replace("app/html/classic.html");
}
function settings() {

  window.location.replace("app/html/settings.html");
}

function help(){
  window.location.replace("app/html/help.html");
}

function createLocalStorage(){
  chrome.storage.local.set({ sidebarEnabled: false })
  chrome.storage.local.set({ canvasSize:  "big"})
  chrome.storage.local.set({ nextEnabled: true })
  chrome.storage.local.set({ holdEnabled: true })
  chrome.storage.local.set({ markersEnabled: false })
  chrome.storage.local.set({ design: "clean" })
  chrome.storage.local.set({ isPlaying: false });
  chrome.storage.local.set({ hasBorder: false })
  chrome.storage.local.set({ previewEnabled: true })
  chrome.storage.local.set({ isConfigured: true })
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['isConfigured'], function(config) {
    if (config.isConfigured == null){
      console.log("Configuring Local Storage")
      createLocalStorage()
    }
  });
  document.getElementById('classic').addEventListener('click', classic);
  document.getElementById('settings').addEventListener('click', settings);
  document.getElementById('help').addEventListener('click', help);
  chrome.storage.local.get(['isPlaying'], function(config) {
    if (config.isPlaying){
      console.log("Game Detected")
      classic()
    }
  });
});




//https://developer.chrome.com/extensions/contentSecurityPolicy