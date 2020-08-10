function hidemenu(){
  m = document.getElementById("menu-items")
  m.style.display = "none"
}

function classic() {
  hidemenu()
  window.location.replace("app/html/classic.html");
}
function settings() {
  hidemenu()
  window.location.replace("app/html/settings.html");
}

function createLocalStorage(){
  chrome.storage.local.set({ nextEnabled: true })
  chrome.storage.local.set({ design: "clean" })
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
});




//https://developer.chrome.com/extensions/contentSecurityPolicy