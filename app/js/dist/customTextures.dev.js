"use strict";

function hidemenu() {
  m = document.getElementById("menu-items");
  m.style.display = "none";
}

function goBack() {
  hidemenu();
  window.location.replace("../html/settings.html");
}

function handleFileSelect(evt) {
  var files = evt.target.files;
  var f = files[0];
  var reader = new FileReader();

  reader.onload = function (theFile) {
    return function (e) {
      console.log(e.target.result);
      chrome.storage.local.set({
        iPiece: e.target.result
      });
      document.getElementById('list').innerHTML = ['<img src="', e.target.result, '" title="', theFile.name, '" width="50" />'].join('');
    };
  }(f);

  reader.readAsDataURL(f);
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['iPiece'], function (config) {
    if (typeof config.iPiece !== 'undefined') {
      document.getElementById('list').innerHTML = ['<img src="', config.iPiece, '" width="50" />'].join('');
    }
  });
  document.getElementById('back').addEventListener('click', goBack);
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
});