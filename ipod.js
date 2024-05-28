var button = document.getElementById("dot").addEventListener("mousedown", menu);
var hexgf = document.getElementById("hexgirlfriends");
var sugar = document.getElementById("sugarglass");

function menu(){
sugar.style.display = "none";
hexgf.style.display="none";
}

var sugarlink = document.getElementById("sugarlink");
sugarlink.addEventListener("mousedown", function() {
    play(sugar);
});

var hexlink = document.getElementById("hexgflink");
hexlink.addEventListener("mousedown", function() {
    play(hexgf);
});
function play(playlist){
    playlist.style.display = "block";
    console.log("play button pressed");
}

const links = document.querySelectorAll(".menu-items");

links.forEach(link =>{
    link.addEventListener("mouseover", function hover(){
        let collection = link.children;
        collection[1].style.display = "none";
        collection[2].style.display ="inline";
  
    })
    link.addEventListener("mouseout", function comeback(){
        let collection = link.children;
        collection[2].style.display = "none";
        collection[1].style.display ="inline";
 
    })
});


