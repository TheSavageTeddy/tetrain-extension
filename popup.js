function getHTML(id){
  return document.getElementById(id)
}

function changeHTML(id, text){
  document.getElementById(id).innerHTML = text
}

function hidemenu(){ //this function in unnessasary, keep it just in case
  m = document.getElementById("menu-items")
  m.style.display = "none"
}

function classic() {

  window.location.replace("app/html/classic.html");
}

function gamemodes(){
  window.location.replace("app/html/gamemodes.html");
}

function settings() {

  window.location.replace("app/html/settings.html");
}

function help(){
  window.location.replace("app/html/help.html");
}

function credits(){
  window.location.replace("app/html/credits.html");
}

function classicover(){
  //changeHTML("classic", "Play")
}

function classicout(){
  //changeHTML("classic", "Play")
}

function createLocalStorage(){
  chrome.storage.local.set({ 
    KEY_SETTINGS: {
      LEFT:"left arrow",
      RIGHT:"right arrow",
      SOFT:"down arrow",
      ROTATE_RIGHT:"up arrow",
      HARD:"spacebar",
      HOLD:"c",
    }
  });
  chrome.storage.local.set({ sidebarEnabled: true })
  chrome.storage.local.set({ autoplayEnabled: true })
  chrome.storage.local.set({ transEnabled: false })
  chrome.storage.local.set({ canvasSize:  "big"})
  chrome.storage.local.set({ nextEnabled: true })
  chrome.storage.local.set({ pausedHandler: false })
  chrome.storage.local.set({ holdEnabled: true })
  chrome.storage.local.set({ markersEnabled: false })
  chrome.storage.local.set({ design: "clean" })
  chrome.storage.local.set({ isPlaying: false });
  chrome.storage.local.set({ isPaused: false });
  chrome.storage.local.set({ hasBorder: true })
  chrome.storage.local.set({ previewEnabled: true })
  chrome.storage.local.set({ isabletoSwap: true});
  chrome.storage.local.set({ hasLost: false});
  chrome.storage.local.set({ currentHold: 0 });
  chrome.storage.local.set({ isConfigured: true })
  chrome.storage.local.set({ isBeta: true })
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['isConfigured', "isBeta"], function(config) {
    if (config.isConfigured == null){
      console.log("Configuring Local Storage")
      createLocalStorage()
    }
    if (!config.isBeta){
      createLocalStorage();
      chrome.tabs.create({url: chrome.extension.getURL('app/html/release.html')});
    }
  });
  //click
  document.getElementById('classic').addEventListener('click', classic);
  document.getElementById('gamemodes').addEventListener('click', gamemodes);
  document.getElementById('settings').addEventListener('click', settings);
  document.getElementById('help').addEventListener('click', help);
  document.getElementById('credits').addEventListener('click', credits);
  //mouseover
  document.getElementById('classic').addEventListener('mouseover', classicover);
  /*
  document.getElementById('gamemodes').addEventListener('mouseover', gamemodesover);
  document.getElementById('settings').addEventListener('mouseover', settingsover);
  document.getElementById('help').addEventListener('mouseover', helpover);
  document.getElementById('credits').addEventListener('mouseover', creditsover);
  */
  //mouseout
  
  document.getElementById('classic').addEventListener('mouseout', classicout);
  /*
  document.getElementById('gamemodes').addEventListener('mouseout', gamemodesout);
  document.getElementById('settings').addEventListener('mouseout', settingsout);
  document.getElementById('help').addEventListener('mouseout', helpout);
  document.getElementById('credits').addEventListener('mouseout', creditsout);
  */



  chrome.storage.local.get(['isPlaying', 'isPaused'], function(config) {
    if (config.isPlaying && !config.isPaused){
      console.log("Game Detected")
      classic()
    }
  });
});




//https://developer.chrome.com/extensions/contentSecurityPolicy