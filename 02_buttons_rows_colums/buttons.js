var container = document.getElementById("container");

var array1 = ['rij1', 'rij2', 'rij3', 'rij4'];
var array2 = ['button1', 'button2', 'button3', 'button4', 'button5'];

function start() {
    for (var i = 0; i < array1.length; i++){
        var rij = document.createElement("div");
        rij.id = array1[i];
        rij.className = 'rij';
        for(var j = array2.length - 1; j > -1; j--){
            var button = document.createElement("button");
            button.innerHTML = array2[j];
            button.setAttribute("onclick", "alert('Ik zit in rij "+ i +" op positie "+j+"')");
            button.id = array1[i]+array2[j];
            button.className = "button";
            rij.prepend(button);
        }
        container.appendChild(rij);
    }
}

start();