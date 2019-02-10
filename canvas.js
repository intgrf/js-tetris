let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let nextBoardCanvas = document.getElementById('nextFigure');
let nextBoardContext = nextBoardCanvas.getContext('2d');
const rows = 20;
const columns = 10;
const nextRows = 4;
const nextColumns = 6;
const xIndentForNextFigure = 1;
const yIndentForNextFigure = 1;
const empty = "white";
let squareSide = canvas.width/columns;



function drawGrid() {
    var x = squareSide, y = 0;
    for (let i = 0; i < 10; i++) {
        while (x < canvas.width) {

            context.moveTo(x, y);
            context.strokeStyle = "#cccccc";
            context.lineWidth = 0.5;
            context.lineTo(x, canvas.height);
            x += squareSide;
        }
        x = 0;
        y = squareSide;

        while (y < canvas.height) {

            context.moveTo(x, y);
            context.strokeStyle = "#cccccc";
            context.lineWidth = 0.5;
            context.lineTo(canvas.width, y);
            y += squareSide;
        }
        context.stroke();
    }
}
//drawGrid();

function matrixArray(rows, columns, elem){
    let arr = [];
    for (let i = 0; i < rows; i++){
        arr[i] = [];
        for (let j = 0; j < columns; j++){
            arr[i][j] = elem;
        }
    }
    return arr;
}

function setPlayer() {
    document.getElementById('player').innerHTML = localStorage["playerName"];
}

function setScore(score) {
    document.getElementById('score').innerHTML = score;
}

function setLevel(level) {
    document.getElementById('level').innerHTML = level;
}

function drawSquare(x, y, color, context) {
    context.fillStyle = color;
    context.fillRect(x * squareSide, y * squareSide, squareSide, squareSide);
    context.strokeStyle = "black";
    context.strokeRect(x * squareSide, y * squareSide, squareSide, squareSide);
}

function drawBoard(board) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            drawSquare(c, r, board[r][c], context);
        }
    }
}

function drawNextBoard(board) {
    for (let r = 0; r < nextRows; r++) {
        for (let c = 0; c < nextColumns; c++){
            drawSquare(c, r, board[r][c], nextBoardContext);
        }
    }
}







