let images = document.getElementsByTagName("img");
let cards = document.getElementsByClassName("card");
let noMoves = document.querySelector(".moves");
let popupWindow = document.getElementById("popup");

    var step;
    var p1, p2;
    var matched ;

window.onload = startGame();

function startGame() { 
    noMoves.innerHTML = 0;
    step = 1;
    matched = 0;
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

function check(){
    if(p1.src2 == p2.src2){
         step = 1;
         matched++;
         if(matched == 12){
             congrats();
         }
     }else{
     p2.src = p1.src = 'images/qsn.jpeg';
     }
     enable();
     step = 1;
}
document.addEventListener('click', function(e){ 
    switch(step){
        case 1 : 
        if(e.target.tagName == 'IMG'){ 
            noMoves.innerHTML = Number(noMoves.innerHTML) + 1;
            e.target.src = e.target.src2;
            p1 = e.target;
            step = 2;
        }
        break;
        case 2: 
        if(e.target.tagName == 'IMG'){
            noMoves.innerHTML = Number(noMoves.innerHTML) + 1;
            e.target.src = e.target.src2;
            p2 = e.target;
            disable();
            sleep(800).then(() => {
                check();
            })
        } 
        break;
    }
});

function playAgain() {
    popupWindow.classList.remove("show");
    startGame();
}