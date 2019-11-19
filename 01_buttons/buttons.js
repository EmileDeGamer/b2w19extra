let colors = ["blue", "red", "green", "yellow", "cyan", "magenta"]

makeButtons()

function makeButtons(){
    for (let i = 1; i < colors.length; i++) {
        let button = document.createElement('button')
        button.style.backgroundColor = colors[i]
        if (i == 2 || i == 3 || i== 4){
            button.className = "hoger"
        }
        if (i == 4 || i == 5){
            button.style.color = "black"
        }   
        button.id = "button" + i
        button.onclick = function(){onClickButton(i)}
        button.innerText = "Button " + i
        document.getElementById("container").appendChild(button)
    }
}

function onClickButton(button){
    document.body.style.backgroundColor = colors[button]
    if (button !== 5){
        alert("Je hebt op Button " + button + " geklikt")
    }
    else if (button == 5){
        alert("Je hebt niet op Button 1, Button 2, Button 3 of Button 4 gekilkt")
    }
}