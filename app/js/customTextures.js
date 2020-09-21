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

function handleoFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();
     
    reader.onload = (function(theFile) {
        return function(e) {
            console.log(e.target.result);
            chrome.storage.local.set({ oPiece: e.target.result })
            document.getElementById('olist').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="50" />'].join('');
        };
    })(f);
    
    reader.readAsDataURL(f);
}

function handlelFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();
     
    reader.onload = (function(theFile) {
        return function(e) {
            console.log(e.target.result);
            chrome.storage.local.set({ lPiece: e.target.result })
            document.getElementById('llist').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="50" />'].join('');
        };
    })(f);
    
    reader.readAsDataURL(f);
}

function handlejFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();
     
    reader.onload = (function(theFile) {
        return function(e) {
            console.log(e.target.result);
            chrome.storage.local.set({ jPiece: e.target.result })
            document.getElementById('jlist').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="50" />'].join('');
        };
    })(f);
    
    reader.readAsDataURL(f);
}

function handletFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();
     
    reader.onload = (function(theFile) {
        return function(e) {
            console.log(e.target.result);
            chrome.storage.local.set({ tPiece: e.target.result })
            document.getElementById('tlist').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="50" />'].join('');
        };
    })(f);
    
    reader.readAsDataURL(f);
}

function handlesFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();
     
    reader.onload = (function(theFile) {
        return function(e) {
            console.log(e.target.result);
            chrome.storage.local.set({ sPiece: e.target.result })
            document.getElementById('slist').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="50" />'].join('');
        };
    })(f);
    
    reader.readAsDataURL(f);
}

function handlezFileSelect(evt) {
    var files = evt.target.files;
    var f = files[0];
    var reader = new FileReader();
     
    reader.onload = (function(theFile) {
        return function(e) {
            console.log(e.target.result);
            chrome.storage.local.set({ zPiece: e.target.result })
            document.getElementById('zlist').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="50" />'].join('');
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

    chrome.storage.local.get(['oPiece'], function(config) {
        if (typeof config.oPiece !== 'undefined'){
            getHTML('olist').innerHTML = ['<img src="', config.oPiece,'" width="50" />'].join('');
        }
    });

    chrome.storage.local.get(['lPiece'], function(config) {
        if (typeof config.lPiece !== 'undefined'){
            getHTML('llist').innerHTML = ['<img src="', config.lPiece,'" width="50" />'].join('');
        }
    });

    chrome.storage.local.get(['jPiece'], function(config) {
        if (typeof config.jPiece !== 'undefined'){
            getHTML('jlist').innerHTML = ['<img src="', config.jPiece,'" width="50" />'].join('');
        }
    });

    chrome.storage.local.get(['tPiece'], function(config) {
        if (typeof config.tPiece !== 'undefined'){
            getHTML('tlist').innerHTML = ['<img src="', config.tPiece,'" width="50" />'].join('');
        }
    });

    chrome.storage.local.get(['sPiece'], function(config) {
        if (typeof config.sPiece !== 'undefined'){
            getHTML('slist').innerHTML = ['<img src="', config.sPiece,'" width="50" />'].join('');
        }
    });

    chrome.storage.local.get(['zPiece'], function(config) {
        if (typeof config.zPiece !== 'undefined'){
            getHTML('zlist').innerHTML = ['<img src="', config.zPiece,'" width="50" />'].join('');
        }
    });


    getHTML('back').addEventListener('click', goBack);

    getHTML('ifiles').addEventListener('change', handleiFileSelect, false);
    getHTML('ofiles').addEventListener('change', handleoFileSelect, false);
    getHTML('lfiles').addEventListener('change', handlelFileSelect, false);
    getHTML('jfiles').addEventListener('change', handlejFileSelect, false);
    getHTML('tfiles').addEventListener('change', handletFileSelect, false);
    getHTML('sfiles').addEventListener('change', handlesFileSelect, false);
    getHTML('zfiles').addEventListener('change', handlezFileSelect, false);

});