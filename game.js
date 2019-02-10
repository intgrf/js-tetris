let gameOver = false;
let score = 0;
let level = 1;
let gameBoard = matrixArray(rows, columns, empty);
let scoresArray = [];
drawBoard(gameBoard);
let nextBoard = matrixArray(nextRows, nextColumns, empty);
drawNextBoard(nextBoard);
const I = [ [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]] ,
            [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]] ,
            [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]] ,
            [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]] ];

const J = [ [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
            [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 1], [0, 0, 1]] ];

const L = [ [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
            [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
            [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
            [[0, 0, 1], [1, 1, 1], [0, 0, 0]] ];

const O = [ [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]] ];

const S = [ [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
            [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
            [[1, 0, 0], [1, 1, 0], [0, 1, 0]] ];

const T = [ [[1, 1, 1], [0, 1, 0], [0, 0, 0]],
            [[0, 0, 1], [0, 1, 1], [0, 0, 1]],
            [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
            [[1, 0, 0], [1, 1, 0], [1, 0, 0]] ];

const Z = [ [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
            [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
            [[0, 1, 0], [1, 1, 0], [1, 0, 0]] ];

const tetrominoes = [I, J, L, O, S, T, Z];
const colors = ["lightsalmon", "lightskyblue", "lightcoral", "gold", "palevioletred", "lightseagreen", "slateblue"];


class Figure {
    constructor(type, color) {
        this.tetromino = type;
        this.currentState = 0;
        this.currentTetromino = this.tetromino[this.currentState];
        this.color = color;
        this.x = 3;
        this.y = -4;
    }

   draw() {
        for (let r = 0; r < this.currentTetromino.length; r++) {
            for (let c = 0; c < this.currentTetromino.length; c++) {
                if (this.currentTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, this.color, context);
                }
            }
        }
   }

   clear() {
       for (let r = 0; r < this.currentTetromino.length; r++) {
           for (let c = 0; c < this.currentTetromino.length; c++) {
               if (this.currentTetromino[r][c]) {
                   drawSquare(this.x + c, this.y + r, empty, context);
               }
           }
       }
   }

   moveLeft() {
       if (!this.isError(-1, 0, this.currentTetromino)) {
           this.clear();
           this.x--;
           this.draw();
       }
   }

   moveRight() {
       if (!this.isError(1, 0, this.currentTetromino)) {
           this.clear();
           this.x++;
           this.draw();
       }
   }

   moveDown() {
       if (!this.isError(0, 1, this.currentTetromino)) {
           this.clear();
           this.y++;
           this.draw();
       }
       else {
           this.fixate();
           setScore(score);
           removeFullRow();
           drawBoard(gameBoard);
           currentFigure = nextFigure;
           nextFigure = randomNextFigure();
           updateNextFigure();
       }
   }

   rotate() {
       let nextTetromino = this.tetromino[(this.currentState + 1) % this.tetromino.length];
       let delta = 0; //рекошет от стены
       if (currentFigure.isError(0, 0, nextTetromino)) { //если без рекошета не повернуть
           if (this.x < columns/2) {
               delta = 1; //в левой части поля => рекошет вправо
           }
           else {
               delta = -1; //в правой части поля => рекошет влево
           }
       }
       if (!currentFigure.isError(delta, 0, nextTetromino)) {
           this.clear();
           this.x += delta;
           this.currentState = (this.currentState + 1) % this.tetromino.length;
           this.currentTetromino = this.tetromino[this.currentState];
           this.draw();
       }
   }

   fixate() {
        for (let r = 0; r < this.currentTetromino.length; r++) {
            for (let c = 0; c < this.currentTetromino.length; c++) {
                if (this.currentTetromino[r][c]) {
                    if (this.y + r < 0) {
                        gameOver = true;
                        alert("Game over! :^(");
                        break;

                    }
                    gameBoard[this.y + r][this.x + c] = this.color;
                }
            }
        }
   }

   isError(deltaX, deltaY, tetromino) {
        for (let r = 0; r < tetromino.length; r++) {
            for (let c = 0; c < tetromino.length; c++) {
                if (tetromino[r][c]) {
                    let newX = this.x + c + deltaX;
                    let newY = this.y + r + deltaY;

                    if (newX >= columns || newX < 0 || newY >= rows) {
                        return true;
                    }
                    if (newY <= 0) {
                        continue;
                    }
                    if (gameBoard[newY][newX] !== empty) {
                        return true;
                    }
                }
            }
        }
        return false;
   }
}

function randomNextFigure() {
   let nextTetrominoType = Math.floor(Math.random() * tetrominoes.length);
   return new Figure(tetrominoes[nextTetrominoType], colors[nextTetrominoType]);
}

function updateNextFigure() {
    nextBoardContext.clearRect(0, 0, nextBoardCanvas.width, nextBoardCanvas.height);
    for (let r = 0; r < nextFigure.currentTetromino.length; r++) {
        for (let c = 0; c < nextFigure.currentTetromino.length; c++) {
            if (nextFigure.currentTetromino[r][c]) {
                drawSquare(c + xIndentForNextFigure, r + yIndentForNextFigure, nextFigure.color, nextBoardContext);
            }
        }
    }
}


function fullRowSound() {
    let sound = new Audio();
    sound.src = 'fullRow.mp3';
    sound.autoplay = true;
}


function removeFullRow() {
    for (let r = 0; r < rows; r++) {
        let isFullRow = true;
        for (let c = 0; c < columns; c++) {
            isFullRow = isFullRow && (gameBoard[r][c] !== empty);
        }
        if (isFullRow) {
            for (let y = r; y > 1; y--) {
                for (let x = 0; x < columns; x++) {
                    gameBoard[y][x] = gameBoard[y-1][x];
                }
            }
            for (let c = 0; c < columns; c++) {
                gameBoard[0][c] = empty;
            }
            score += 100;
            fullRowSound();
            setScore(score);
        }
    }
    //drawBoard();
}

setLevel(level);
setScore(score);
var currentFigure = randomNextFigure();
var nextFigure = randomNextFigure();
updateNextFigure(nextFigure);

function increaseSpeed() {
    if (score >= 50 && score < 100) {
        clearInterval(intervalID);
        intervalID = setInterval(updateState, 600);
        level = 2;
    }
    else if (score >= 100 && score < 200) {
        clearInterval(intervalID);
        intervalID = setInterval(updateState, 400);
        level = 3;
    }
    else if (score >= 200) {
        clearInterval(intervalID);
        intervalID = setInterval(updateState, 200);
        level = 4;
    }
}

function updateState() {
    currentFigure.moveDown();
    increaseSpeed();
    setLevel(level);
    if (gameOver) {
        clearInterval(intervalID);
        addToTheScoreTable();
        window.location = "scoretable.html";
    }
}

function addToTheScoreTable() {
    if (!localStorage.getItem("table")) {
        localStorage.setItem("table", JSON.stringify(scoresArray));
    }
    let user = {
        name: localStorage["playerName"],
        points: score
    };
    scoresArray = JSON.parse(localStorage["table"]);
    scoresArray.push(user);
    scoresArray.sort(comparator);
    localStorage["table"] = JSON.stringify(scoresArray);
}

function comparator(a, b) {
    return a.points <= b.points;
}

let intervalID = setInterval(updateState, 900);
