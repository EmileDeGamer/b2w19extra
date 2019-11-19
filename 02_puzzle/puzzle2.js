const rows = 4;
const columns = 4;

var img = new Image();
img.src = 'puzzle.jpg';
img.onload = function () {
    var imgHeight = this.naturalHeight;
    var imgWidth = this.naturalWidth;

    createPuzzle(imgWidth, imgHeight);
}

function createPuzzle(imgWidth, imgHeight) {
    var piecesHeight = imgHeight / rows;
    var piecesWidth = imgWidth / columns;

    for (var i = 0; i < rows; i++){
        var div = document.createElement("div");
        div.style.width = (imgWidth+20)+"px";
        div.style.height = (piecesHeight)+"px";

        for (var j = 0; j < columns; j++){
            var placeholder = document.createElement("div");
            placeholder.style.height = piecesHeight+"px";
            placeholder.style.width = piecesWidth+"px";
            placeholder.className = "placeholder";
            placeholder.onclick = placeholderClick;
            div.appendChild(placeholder);
        }

        document.getElementById("puzzle").appendChild(div);
    }

    var piecesRows = [];

    //1 keer van gemaakt
    var div = document.createElement("div");
    div.style.width = (imgWidth+42)+"px";
    div.style.height = (piecesHeight+14)+"px";
    piecesRows.push(div);

    var puzzlePieces = [];

    let amount = rows*columns
    let amountArrays = amount/rows
    let countersAutomatic = []
    let counters = []
    let counter = 0
    let allowed = []

    /*if (rows == columns || rows > columns){
        amountArrays = amount / rows
    }
    else if (columns > columns){
        amountArrays = amount / columns
    }*/

    //Maakt voor elke row een array aan
    for (let i = 0; i < amountArrays; i++) {
        let counter = new Array()
        countersAutomatic.push(counter)
        allowed.push(false)
        counters.push(0)
    } 

    //Zet alle verschillende getallen die erbij horen bij elkaar
    for (let i = 0; i < amountArrays; i++) {
        for (let j = 0; j < amountArrays; j++) {
            /*if (rows == columns || rows > columns){
                countersAutomatic[i].push(j * rows + counter)
            }
            else if (columns > rows){
                countersAutomatic[i].push(j * columns + counter)
            }*/
            countersAutomatic[i].push(j * rows + counter)    
        }
        counter+=1
    }
    
    for (var i = 0; i < rows*columns; i++){
        var piece = document.createElement("div");
        piece.style.height = piecesHeight+"px";
        piece.style.width = piecesWidth+"px";
        piece.style.backgroundImage = "url('"+img.src+"')";
        piece.style.backgroundRepeat = "no-repeat";
        piece.className = "piece";
        piece.id = 'piece'+i;
        piece.onclick = pieceOnClick;

        //Maakt puzzelstukjes aan
        for (let j = 0; j < countersAutomatic.length; j++) {
            for (let k = 0; k < countersAutomatic.length; k++) {
                if (countersAutomatic[j][k] === i){
                    piece.style.backgroundPositionX = (piecesWidth*-j)+"px";
                    piece.style.backgroundPositionY = (piecesHeight*counters[j])+"px";
                    allowed[j] = true
                }
            }
            if (allowed[j] === true){
                counters[j]-=1
                allowed[j] = false
            }
        }
        console.log(counters)
        puzzlePieces.push(piece);
    }

    puzzlePieces.sort(function() {
        return .5 - Math.random();
    });

    for(var i =0; i < puzzlePieces.length; i++){
        piecesRows[0].appendChild(puzzlePieces[i]);
    }

    for (var i = 0; i < piecesRows.length; i++) {
        document.getElementById("pieces").appendChild(piecesRows[i]);
    }
}

var activePiece = false;

function pieceOnClick() {
    if(activePiece !== false){
        activePiece.className = "piece";
    }

    activePiece = this;
    this.className = "piece_active";
}

function placeholderClick() {
    if(activePiece !== false) {
        this.style.backgroundPositionX = activePiece.style.backgroundPositionX;
        this.style.backgroundPositionY = activePiece.style.backgroundPositionY;
        this.style.backgroundImage = activePiece.style.backgroundImage;
        this.className = "placeholder_filled";
        this.setAttribute("rel", activePiece.id);

        var placeholders = document.getElementsByClassName("placeholder_filled");

        if (placeholders.length === (rows * columns)) {
            var finish = true;

            for(var i = 0; i < placeholders.length; i++){
                if(placeholders[i].getAttribute("rel") !== "piece"+i){
                   finish = false;
                }
            }

            if (finish === true) {
                activePiece = false;
                document.getElementById("pieces").innerHTML = "Well done!";
            }
        }
    }
}