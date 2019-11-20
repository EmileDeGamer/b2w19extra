let dices = [document.getElementById('dice1'), document.getElementById('dice2'), document.getElementById('dice3'), document.getElementById('dice4'), document.getElementById('dice5')]
let roll = document.getElementById('roll')
let rolls = 0, maxRolls = 3, locked = [], sameDices = [], xPositions = [0, -100, -200, -300, -400, -500], choices = [], allFilled = [false, false, false, false, false, false]
let amounts = [document.getElementById('top_1'), document.getElementById('top_2'), document.getElementById('top_3'), document.getElementById('top_4'), document.getElementById('top_5'), document.getElementById('top_6')]
let subTotal = document.getElementById('top_subtotal')
let bonus = document.getElementById('bonus')
let total = document.getElementById('top_total')

setup()

function setup(){
    roll.innerHTML = "Play! :D"
    roll.onclick = function(){rollDices()}
    rolls = 0
    locked = []
    sameDices = []
    choices = []
    subTotal.innerHTML = 0
    for (let i = 0; i < amounts.length; i++) {
        sameDices.push(0)
        amounts[i].onclick = function(){}
        if (!amounts[i].className.includes("chosen")){
            amounts[i].innerHTML = 0
        }
    }
    for (let i = 0; i < dices.length; i++) {
        locked.push(false)
        dices[i].className = "dice"
    }
}

function rollDices(){
    if (!locked.every( (val) => val === true )){
        if (rolls < maxRolls){
            for (let i = 0; i < dices.length; i++) {
                if (dices[i].className != "locked"){
                    dices[i].className = "dice roll"
                    let dice = Math.round(Math.random() * dices.length)
                    dices[i].style.backgroundPositionX = 100*-dice+"px"
                    roll.innerHTML = "Rolling! :D"
                    roll.disabled = true
                    setTimeout(function () {
                        dices[i].className = "dice"
                        if (rolls < maxRolls){
                            roll.innerHTML = "Roll! :D"
                        }
                        else{
                            if(dices[i].className != "locked"){
                                dices[i].className = "locked"
                                locked.splice(i, 1, true)
                            }
                            roll.innerHTML = "Choose! :D"
                            checkAllLocked()
                        }
                        roll.disabled = false
                    }, 2000)
                    dices[i].onclick = function(){lockDices(i)}
                }
            }
            rolls++
            //console.log('rolling')
        }
    }
    else{
        
    }
}

function checkWin(){
    for (let i = 0; i < amounts.length; i++) {
        if(amounts[i].innerHTML != 0){
            allFilled.splice(i, 1, true)
        }
    }
    if (allFilled.every( (val) => val === true )){
        for (let i = 0; i < amounts.length; i++) {
            subTotal.innerHTML = parseInt(subTotal.innerHTML) + parseInt(amounts[i].innerHTML)
            subTotal.className = "points chosen"
        }
        if (subTotal.innerHTML >= 63){
            bonus.innerHTML = 35
            bonus.className = "points chosen"
            total.innerHTML = parseInt(bonus.innerHTML) += parseInt(subTotal.innerHTML)
            total.className = "points chosen"
        }
        else if (subTotal.innerHTML < 63){
            bonus.innerHTML = 0
            bonus.className = "points chosen"
            total.innerHTML = subTotal.innerHTML
            total.className = "points chosen"
        }
    }
}

function lockDices(i){
    if (dices[i].className == "locked"){
        dices[i].className = "dice"
        locked.splice(i, 1, false)
    }
    else if (dices[i].className == "dice"){
        dices[i].className = "locked"
        locked.splice(i, 1, true)
        checkAllLocked()
    }
}

function checkAllLocked(){
    if (locked.every( (val) => val === true )){
        calculate()
        for (let i = 0; i < dices.length; i++) {
            dices[i].onclick = function(){}
        }
    }
}

function calculate(){
    roll.innerHTML = "Choose! :D"
    calculateAmountsOfSameDices()
    showPosibilities()
    //writeAmounts()
}

function calculateAmountsOfSameDices(){
    for (let i = 0; i < dices.length; i++) {
        for (let j = 0; j < amounts.length; j++) {
            if (dices[i].style.backgroundPositionX === xPositions[j]+"px"){
                sameDices[j]++
            }
        }
    }
}

function showPosibilities(){
    for (let i = 0; i < amounts.length; i++) {
        if (sameDices[i] != 0 && !amounts[i].className.includes("chosen")){
            amounts[i].innerHTML = sameDices[i] * (i+1)
            amounts[i].className = "points posibility"
            amounts[i].onclick = function(){choose(i)}
            choices.push(i)
            //console.log(choices) 
        }
        else if (!amounts[i].className.includes("chosen")){
            amounts[i].innerHTML = sameDices[i] * (i+1)
        }
    }
    if (choices.length == 0){
        setup()
        checkWin()
    }
    else if (choices.length == 1){
        amounts[choices].className = "points chosen"
        setup()
        checkWin()
    }
}

function choose(chosen){
    for (let i = 0; i < amounts.length; i++) {
        if (i != chosen && !amounts[i].className.includes("chosen")){
            amounts[i].className = "points"
        }
        else if (chosen == i){
            amounts[i].className = "points chosen"
            setup()
            checkWin()
        }
    }
}

/*function writeAmounts(){
    for (let i = 0; i < amounts.length; i++) {
        amounts[i].innerHTML = sameDices[i] * (i+1)
    }
}*/