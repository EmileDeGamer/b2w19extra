const rows = 3;
const columns = 3;

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

    for (var i = 0; i < rows; i++){
        var div = document.createElement("div");
        div.style.width = (imgWidth+42)+"px";
        div.style.height = (piecesHeight+14)+"px";
        piecesRows.push(div);
    }

    var puzzlePieces = [];
    let allowed = [true, false, false]
    let count = 0

    for (var i = 0; i < rows*columns; i++){
        var piece = document.createElement("div");
        piece.style.height = piecesHeight+"px";
        piece.style.width = piecesWidth+"px";
        piece.style.backgroundImage = "url('"+img.src+"')";
        piece.style.backgroundRepeat = "no-repeat";
        piece.className = "piece";
        piece.id = 'piece'+i;
        piece.onclick = pieceOnClick;      

        if (allowed[0] === true){
            piece.style.backgroundPositionX = "0px";
            piece.style.backgroundPositionY = (piecesHeight*(count)) + "px";
            allowed[0] = false
            allowed[1] = true
        }
        else if (allowed[1] === true){
            piece.style.backgroundPositionX = (piecesWidth*-1)+"px";
            piece.style.backgroundPositionY = (piecesHeight*(count))+"px";
            allowed[1] = false
            allowed[2] = true
        }
        else if (allowed[2] === true){
            piece.style.backgroundPositionX = (piecesWidth*-2)+"px";
            piece.style.backgroundPositionY = (piecesHeight*(count))+"px";
            allowed[2] = false
            allowed[0] = true
        }
        if (allowed[0] === true && allowed[1] === false && allowed[2] === false){
            count-=1
        }
        
        console.log(count)
        puzzlePieces.push(piece);
    }

    puzzlePieces.sort(function() {
        return .5 - Math.random();
    });

    let multiplier = 1

    for(var i =0; i < puzzlePieces.length; i++){
        if (i <= rows*multiplier){
            piecesRows[multiplier-1].appendChild(puzzlePieces[i])
            //console.log(puzzlePieces)
        }
        else if (i > rows*multiplier){
            multiplier++
            //console.log(multiplier)
        }
        //console.log(rows*multiplier)
        
        
        /*if(i >= 2){
            piecesRows[0].appendChild(puzzlePieces[i]);
        }else if(i < 5){
            piecesRows[2].appendChild(puzzlePieces[i]);
        }else{
            piecesRows[1].appendChild(puzzlePieces[i]);
        }*/
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