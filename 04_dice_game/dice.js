var container = document.getElementById("container");
var dice = document.getElementById("dice");
var timer = false;
var score = 0;

var currentFace = 0;
dice.style.backgroundImage = "url(dice_face_1.png)"
dice.onclick = diceClick;

let i = 0
function startDiceRoll () {
    timer = setInterval(function () {
        i++
        dice.style.backgroundImage = "url(dice_face_" + i + ".png)"
        currentFace  = i
        if (i == 6){
            i = 0
        }
    }, 50);
}

function diceClick () {
    if (timer !== false) {
        var p = document.createElement("p");
        p.innerHTML = "You rolled a " + currentFace
        document.getElementById("log").prepend(p);

        score = score + currentFace

        if(score >= 18) {
            alert('You win, score: '+score);
            clearInterval(timer);
            timer  = false;
        }else{
            clearInterval(timer);
            timer  = false;

            setTimeout(function () {
                startDiceRoll();
            },1500);
        }
    }
};

startDiceRoll();