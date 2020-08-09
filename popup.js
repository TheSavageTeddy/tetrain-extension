var el = document.getElementById('options');
if(el){
  el.addEventListener('click', swapper);
}

var Opiece= 
[
  [
    "0","1","1","0",
    "0","1","1","0",
    "0","0","0","0",
  ],
    "0","1","1","0",
    "0","1","1","0",
    "0","0","0","0",
  [
    "0","1","1","0",
    "0","1","1","0",
    "0","0","0","0",
  ],
    "0","1","1","0",
    "0","1","1","0",
    "0","0","0","0",
  ];
  
var Lpiece= 
[
[
  ".",".","x",
  "x","x","x",
  ".",".",".",
],
[
  ".","x",".",
  ".","x",".",
  ".","x","x",
],
[
  ".",".",".",
  "x","x","x",
  "x",".",".",
],
[
  "x","x",".",
  ".","x",".",
  ".","x",".",
]
];


function main() {
  // Initialization work goes here.
  //document.getElementById("title").innerHTML= "teddy"
}


function hidemenu(){
  m = document.getElementById("menu-items")
  m.style.display = "none"
}

function classic() {
  
  hidemenu()
  window.location.replace("classic.html");
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('classic').addEventListener('click', classic);

});


/*
function sevenbag(bag){
  r=Math.floor(Math.random() * (bag.length))
  return r;

}

bag = ["i","j","o","s"]
re = next(bag)
console.log("next piece: " + re)
bag.splice(re,1)

function getNext(bag){
  return ["i"];
}

*/

//https://developer.chrome.com/extensions/contentSecurityPolicy