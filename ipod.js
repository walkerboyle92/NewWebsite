var button = document.getElementById("dot").addEventListener("mousedown", menu);
var hexgf = document.getElementById("hexgirlfriends");
var sugar = document.getElementById("sugarglass");
var video = document.getElementById('maniculum-video');
var podcast = document.getElementById('maniculum');
var sub_menu = document.getElementById('sub-menu');
var main_menu = document.getElementById('main-menu');

function menu(){
sugar.style.display = "none";
hexgf.style.display="none";
// video.style.display ="none";
podcast.style.display = "none";
main_menu.style.display = "block";
sub_menu.style.display = "none";
}

var sugarlink = document.getElementById("sugarlink");
sugarlink.addEventListener("mousedown", function() {
    play(sugar);
});

var hexlink = document.getElementById("hexgflink");
hexlink.addEventListener("mousedown", function() {
    play(hexgf);
});

var other = document.getElementById("otherlink");
otherlink.addEventListener("mousedown", function() {
    play(sub_menu);
main_menu.style.display = "none";

});

function play(playlist){
    playlist.style.display = "block";
    
}


//carrot hover effect
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


