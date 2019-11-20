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

    var div = document.createElement("div");
    div.style.width = (imgWidth+42)+"px";
    div.style.height = (piecesHeight+14)+"px";
    piecesRows.push(div);

    var puzzlePieces = [];
    
    for (var i = 0; i < rows*columns; i++){
        var piece = document.createElement("div");
        piece.style.height = piecesHeight+"px";
        piece.style.width = piecesWidth+"px";
        piece.style.backgroundImage = "url('"+img.src+"')";
        piece.style.backgroundRepeat = "no-repeat";
        piece.className = "piece";
        piece.id = 'piece'+i;
        piece.onclick = pieceOnClick;

        let column = i % columns
        let row = (i-column) / columns
        
        piece.style.backgroundPositionX = (piecesWidth*column*-1)+"px"
        piece.style.backgroundPositionY = (piecesHeight*row*-1)+"px"

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
                var list = document.getElementById("puzzle");
                while (list.hasChildNodes()) {  
                    list.removeChild(list.firstChild);
                } 
                document.getElementById('puzzle').appendChild(img)
                activePiece = false;
                document.getElementById("pieces").innerHTML = "Well done!";
            }
        }
    }
}