let images = document.getElementsByTagName("img");
let cards = document.getElementsByClassName("card");
let noMoves = document.querySelector(".moves");
let popupWindow = document.getElementById("popup");
let matches = document.getElementsByClassName("match");

    var step;
    var p1, p2;

window.onload = resetGame();

function resetGame() { 
    noMoves.innerHTML = 0;
    step = 1;
    removeMatches();
    enable();
}
var array = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12].map(p => [p, Math.random()])
            .sort((a,b) => a[1] - b[1]).map(p => p[0]);

for(var i=0; i<images.length;  i++){
    images[i].src2 = 'images/pic' + array[i] + '.jpg';
}

function congrats(){
    popupWindow.classList.add('show');
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function enable(){
    for(var i=0; i<cards.length; i++){
        cards[i].classList.remove("disabled");
    }
}

function disable(){
    for(var i=0; i<cards.length; i++){
        cards[i].classList.add("disabled");
    }
}
function removeMatches(){
    for(var i=0; i<cards.length; i++){
        cards[i].classList.remove("match");
    }
}

function check(){
    if(p1.src2 == p2.src2){
        p1.parentElement.classList.add("disabled", "match");
        p2.parentElement.classList.add("disabled", "match");
        if(matches.length == 24){
            congrats();
        }
         step = 1;
     }else{
     p2.src = p1.src = 'images/qsn.jpeg';
     }
     enable();
     step = 1;
}
function startNewGame(e){
    var len = e.target.parentNode;
    console.log("hi" + len.classList);
    if(!len.classList.contains("match")){
         switch(step){
             case 1 : 
             if(e.target.tagName == 'IMG'){ 
                 e.target.src = e.target.src2;
                 p1 = e.target;
                 noMoves.innerHTML = Number(noMoves.innerHTML) + 1;
                 step = 2;
             }
             break;
             case 2: 
             if(e.target.tagName == 'IMG'){
                 e.target.src = e.target.src2;
                 p2 = e.target;
                 noMoves.innerHTML = Number(noMoves.innerHTML) + 1;
                 disable();
                 sleep(800).then(() => {
                     check();
                 })
             } 
             break;
         }
     }
 }

function playAgain() {
    popupWindow.classList.remove("show");
    resetGame();
}
for(var i=0; i<cards.length; i++){
    cards[i].addEventListener("click", startNewGame);
}