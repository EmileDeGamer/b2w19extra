const amountOfButtons = 3;
var colors = ["magenta","cyan","greenyellow"];
var win = false;

let checkArray = []
let winArray = []

createButtons()

function checkWin() {
    for (let i = 0; i < buttonsLooping.length; i++) {
        if(buttonsLooping[i] === false){
            checkArray.splice(i, 1, false)
        }
        else if (buttonsLooping[i] !== false){
            checkArray.splice(i, 1, true)
        }
        if (i === buttonsLooping.length){
            i = 0
        }
        check()
    }
}

function check(){
    if (!checkArray.includes(true)){
        for (let i = 0; i < amountOfButtons; i++) {
            if(buttonColors[0] === buttonColors[i]){
                winArray.splice(i, 1, true)
            }
            else if (buttonColors[0] !== buttonColors[i]){
                winArray.splice(i, 1, false)
            }
        }
        
        if (!winArray.includes(false)){
            for (let i = 0; i < amountOfButtons; i++) {
                let middle = amountOfButtons/2
                if (Number.isInteger(middle)){
                    if (i == middle-2){
                        document.getElementById("colorPicker"+(i+1)).innerHTML = 'W';
                    }
                    if (i == middle-1){
                        document.getElementById("colorPicker"+(i+1)).innerHTML = 'I';
                    }
                    if (i == middle){
                        document.getElementById("colorPicker"+(i+1)).innerHTML = 'N';
                    }
                    if (i == middle+1){
                        document.getElementById("colorPicker"+(i+1)).innerHTML = '!';
                    }
                }
                else{
                    middle = parseInt(middle)
                    if (i == middle-1){
                        document.getElementById("colorPicker"+(i+1)).innerHTML = 'W';
                    }
                    if (i == middle){
                        document.getElementById("colorPicker"+(i+1)).innerHTML = 'I';
                    }
                    if (i == middle+1){
                        document.getElementById("colorPicker"+(i+1)).innerHTML = 'N';
                    }
                }
            }
            win = true;
        }
    }
}

function createButtons(){
    for (let i = 0; i < amountOfButtons; i++) {
        let button = document.createElement('button')
        document.getElementById('container').appendChild(button)
        button.id = "colorPicker" + (i + 1)
        winArray.push("")
        checkArray.push("")
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