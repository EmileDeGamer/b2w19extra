var stopped = false;
var exploded = false;
let counter = 5

function start() {
    document.getElementById("timer").innerHTML = "00:05";
    document.getElementById("wire_good").onclick = stopTimer;
    document.getElementById("wire_bad").onclick = explode;

    let amount = 4
    for (var i = 6; i > 0; i--) {
        (function (i) {
            setTimeout(function () {
                if (!stopped){   
                    if (!exploded){   
                        document.getElementById("timer").innerHTML = "00:0" + amount
                        amount--
                        if(i == 6){
                            document.getElementById("timer").innerHTML = "";
                            document.getElementById("container").style.backgroundImage = "url('explosion.png')";
                            document.getElementById("container").style.height = "600px";
                        }
                    }   
                }
            }, 1000*i)
        })(i)
    }
}

function stopTimer() {
    stopped = true;
    if(exploded === false) {
        document.getElementById("wire_good").style.backgroundColor = "white";
        document.getElementById("timer").className = "blinking";
    }
}

function explode() {
    exploded = true;
    if(stopped === false) {
        document.getElementById("timer").innerHTML = "";
        document.getElementById("container").style.backgroundImage = "url('explosion.png')";
        document.getElementById("container").style.height = "600px";
    }else{
        document.getElementById("timer").innerHTML = "";
        document.getElementById("wire_bad").style.backgroundColor = "#DFDFDF";
        alert('Bomb defused!');
    }
}

start();