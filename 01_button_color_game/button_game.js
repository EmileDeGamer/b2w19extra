const amountOfButtons = 3;
var colors = ["magenta","cyan","greenyellow"];
var win = false;

function checkWin() {
    if(buttonsLooping[0] === false && buttonsLooping[1] === false && buttonsLooping[2] === false){
        if(buttonColors[0] === buttonColors[1]){
            if(buttonColors[0] === buttonColors[2]){
                if(buttonColors[1] === buttonColors[2]){
                    document.getElementById("colorPicker1").innerHTML = 'W';
                    document.getElementById("colorPicker2").innerHTML = 'I';
                    document.getElementById("colorPicker3").innerHTML = 'N';
                    win = true;
                }
            }
        }
    }
}

function getNextColor(color) {
    var position = colors.indexOf(color);
    position++;

    if(position === colors.length){
        position = 0;
    }

    var nextColor = colors[position];
    return nextColor;
}

var buttonColors = [];
var buttonsLooping = [];
var buttons = [];

for (var i = 0; i < amountOfButtons; i++){
    buttons.push(document.getElementById("colorPicker"+(i+1)));
    buttonColors.push("");
    buttonsLooping.push(true);

    var colorIndex = Math.floor(Math.random() * colors.length);
    var color = colors[colorIndex];

    buttonColors[i] = color;

    buttons[i].style.backgroundColor = color;
    buttons[i].onclick = function () {
        if(win === false) {
            var position = buttons.indexOf(this);

            if (buttonsLooping[position] === false) {
                buttonsLooping[position] = true;
            } else {
                buttonsLooping[position] = false;
                checkWin();
            }
        }
    };
}

setInterval(function () {
    for (var i = 0; i < buttons.length; i++){
        if(buttonsLooping[i] !== false) {
            var color = buttonColors[i];
            var newColor = getNextColor(color);

            buttons[i].style.backgroundColor = newColor;
            buttonColors[i] = newColor;
        }
    }
}, 500);