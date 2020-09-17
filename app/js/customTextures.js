function hidemenu(){
    m = document.getElementById("menu-items")
    m.style.display = "none"
}
function goBack(){
    hidemenu()
    window.location.replace("../html/settings.html");
}

function getHTML(id){
    return document.getElementById(id)
}

function handleiFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();
     
    reader.onload = (function(theFile) {
        return function(e) {
            console.log(e.target.result);
            chrome.storage.local.set({ iPiece: e.target.result })
            document.getElementById('ilist').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="50" />'].join('');
        };
    })(f);
    
    reader.readAsDataURL(f);
}


document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['iPiece'], function(config) {
        if (typeof config.iPiece !== 'undefined'){
            getHTML('ilist').innerHTML = ['<img src="', config.iPiece,'" width="50" />'].join('');
        }
    });
    getHTML('back').addEventListener('click', goBack);
    getHTML('ifiles').addEventListener('change', handleiFileSelect, false);
});