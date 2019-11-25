let dices = [document.getElementById('dice1'), document.getElementById('dice2'), document.getElementById('dice3'), document.getElementById('dice4'), document.getElementById('dice5')]
let roll = document.getElementById('roll')
let rolls = 0, maxRolls = 3, locked = [], sameDices = [], xPositions = [0, -100, -200, -300, -400, -500], choices = [], allFilled = [false, false, false, false, false, false, false, false, false, false, false, false, false, false]
let amounts = [document.getElementById('top_1'), document.getElementById('top_2'), document.getElementById('top_3'), document.getElementById('top_4'), document.getElementById('top_5'), document.getElementById('top_6')]
let subTotal = document.getElementById('top_subtotal')
let bonus = document.getElementById('bonus')
let total = document.getElementById('top_total')
let subTotalBottom = document.getElementById('bottom_subtotal')
let grandTotal = document.getElementById('grand_total')
let progress = []
let types = [document.getElementById('2_pair'), document.getElementById('kind_3'), document.getElementById('kind_4'), document.getElementById('fullhouse'), document.getElementById('str_small'), document.getElementById('str_big'), document.getElementById('yathzee'), document.getElementById('chance')]

setup()
roll.innerHTML = "Play! :D"

function setup(){
    roll.innerHTML = "Roll! :D"
    roll.onclick = function(){rollDices()}
    rolls = 0
    locked = []
    sameDices = []
    choices = []
    subTotal.innerHTML = 0
    subTotalBottom.innerHTML = 0
    grandTotal.innerHTML = 0
    progress = []
    for (let i = 0; i < types.length; i++) {
        if (!types[i].className.includes("chosen")){
            types[i].innerHTML = 0
            types[i].className = "points"
        }
    }
    for (let i = 0; i < 8; i++) {
        if (i == 7){
            progress.push(1)
        }
        else{
            progress.push(0)
        }
    }
    for (let i = 0; i < amounts.length; i++) {
        sameDices.push(0)
        amounts[i].onclick = function(){}
        if (!amounts[i].className.includes("chosen")){
            amounts[i].innerHTML = 0
            amounts[i].className = "points"
        }
    }
    for (let i = 0; i < dices.length; i++) {
        locked.push(false)
        dices[i].className = "pickup"
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
        }
    }
}

function checkAllFilled(){
    for (let i = 0; i < amounts.length; i++) {
        if(amounts[i].innerHTML != 0){
            allFilled.splice(i, 1, true)
        }
    }
    for (let i = 0; i < types.length; i++) {
        if (types[i].innerHTML != 0){
            allFilled.splice(i + amounts.length, 1, true)
        }
    }
    if (allFilled.every( (val) => val === true )){
        for (let i = 0; i < amounts.length; i++) {
            if (amounts[i].innerHTML != "-"){
                subTotal.innerHTML = parseInt(subTotal.innerHTML) + parseInt(amounts[i].innerHTML)
                subTotal.className = "points chosen"
            }
        }
        if (subTotal.innerHTML >= 63){
            bonus.innerHTML = 35
            bonus.className = "points chosen"
            total.innerHTML = parseInt(bonus.innerHTML) + parseInt(subTotal.innerHTML)
            total.className = "points chosen"
        }
        else if (subTotal.innerHTML < 63){
            bonus.innerHTML = 0
            bonus.className = "points chosen"
            total.innerHTML = subTotal.innerHTML
            total.className = "points chosen"
        }

        for (let i = 0; i < types.length; i++) {
            if (types[i].innerHTML != "-")
            {
                subTotalBottom.innerHTML = parseInt(subTotalBottom.innerHTML) + parseInt(types[i].innerHTML)
                subTotalBottom.className = "points chosen"
            }
        }
        
        grandTotal.innerHTML = parseInt(total.innerHTML) + parseInt(subTotalBottom.innerHTML)
        grandTotal.className = "points chosen"
        roll.innerHTML = "Play again! :D"
        roll.onclick = function(){location.reload()}
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
}

function calculateAmountsOfSameDices(){
    for (let i = 0; i < dices.length; i++) {
        for (let j = 0; j < amounts.length; j++) {
            if (dices[i].style.backgroundPositionX === xPositions[j]+"px"){
                sameDices[j]++
            }
        }
    }

    for (let i = 0; i < amounts.length; i++) {
        if (sameDices[i] >= 4){
            progress[2]++
        }
        if (sameDices[i] >= 3){
            progress[1]++
        }
        if (sameDices[i] >= 2){
            progress[0]++
        }
        if (progress[0] > 0 && progress[1] > 0){
            progress[3]++
        }
        if (sameDices[0] > 0 && sameDices[1] > 0 && sameDices[2] > 0 && sameDices[3] > 0 && sameDices[4] > 0 || sameDices[1] > 0 && sameDices[2] > 0 && sameDices[3] > 0 && sameDices[4] > 0 && sameDices[5] > 0){
            progress[5]++
        }
        else if (sameDices[0] > 0 && sameDices[1] > 0 && sameDices[2] > 0 && sameDices[3] > 0 || sameDices[1] > 0 && sameDices[2] > 0 && sameDices[3] > 0 && sameDices[4] > 0 || sameDices[2] > 0 && sameDices[3] > 0 && sameDices[4] > 0 && sameDices[5] > 0){
            progress[4]++
        }
        if (sameDices[0] == 5 || sameDices[1] == 5 || sameDices[2] == 5 || sameDices[3] == 5 || sameDices[4] == 5 || sameDices[5] == 5){
            progress[6]++
        }
    }
}

function showPosibilities(){
    for (let i = 0; i < amounts.length; i++) {
        if (sameDices[i] != 0 && !amounts[i].className.includes("chosen")){
            amounts[i].innerHTML = sameDices[i] * (i+1)
            amounts[i].className = "points posibility"
            amounts[i].onclick = function(){choose("amounts", i)}
            choices.push(i)
        }
    }
    
    for (let i = 0; i < types.length; i++) {
        if (!types[i].className.includes("chosen")){
            if (i != 0 && i != 7){
                if (progress[i] >= 1){
                    setElement(types[i])
                    choices.push(i+amounts.length)
                    if (i == 3){
                        types[3].innerHTML = 25
                    }
                    if (i == 4){
                        types[4].innerHTML = 30
                    }
                    if (i == 5){
                        types[5].innerHTML = 40
                    }
                    if (i == 6){
                        types[6].innerHTML = 50
                    }
                }
            }
            if (i == 0){
                if (progress[i] >= 2){
                    setElement(types[i])
                    choices.push(i+amounts.length)
                }
            }
            if (i == 7){
                if (progress[i] > 0){
                    setElement(types[i])
                    choices.push(i+amounts.length)
                }
            }
        }
    }

    if (choices.length == 0){
        for (let i = 0; i < types.length; i++) {
            if (!types[i].className.includes("chosen")){
                types[i].className = "points posibility"
                types[i].innerHTML = "-"
                types[i].onclick = function(){removeTypes(i)}
            }
        }
        for (let i = 0; i < amounts.length; i++) {
            if(!amounts[i].className.includes("chosen")){
                amounts[i].innerHTML = "-"
                amounts[i].className = "points posibility"
                amounts[i].onclick = function(){removeAmounts(i)}
            }
        }
    }
    else if (choices.length == 1){
        if (choices < 6){
            amounts[choices].className = "points chosen"
        }
        if (choices >= 6){
            types[choices-amounts.length].className = "points chosen"
        }
        setup()
        checkAllFilled()
    }
}

function choose(element, amount){
    if (element == element[7]){
        progress[7]--
    }
    if (element == "amounts"){
        amounts[amount].className = "points chosen"
    }
    else if (element != "amounts"){
        element.className = "points chosen"
    }
    setup()
    checkAllFilled()
}

function setElement(element){
    if (!element.className.includes("chosen")){
        for (let j = 0; j < amounts.length; j++) {
            element.innerHTML = parseInt(element.innerHTML) + parseInt(sameDices[j] * (j + 1))
        }
        element.className = "points posibility"
        element.onclick = function(){choose(element)}
    }
}

function removeTypes(i){
    types[i].innerHTML = '-'
    types[i].className = 'points chosen'
    setup()
    checkAllFilled()
}

function removeAmounts(i){
    amounts[i].innerHTML = '-'
    amounts[i].className = 'points chosen'
    setup()
    checkAllFilled()
}