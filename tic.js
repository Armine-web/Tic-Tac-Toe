const board = document.getElementById('board');
const startButton = document.getElementById('startGame');
const boardSizeInput = document.getElementById('boardSize');
const players = ['X', 'O'];
let currentPlayer;
let endMessage = document.createElement('h2');
document.body.append(endMessage);
let boardSize;
let squares = [];
let winning_combinations = [];

startButton.addEventListener('click', startGame);

function startGame() {
    boardSize = Number(boardSizeInput.value);
    if (boardSize < 3 || boardSize > 18) {
        alert("Please choose a size between 3 and 18.");
        return;
    }
    currentPlayer = players[0];
    board.innerHTML = '';
    endMessage.textContent = '';
    endMessage.style.backgroundColor = '';
    squares = [];
    winning_combinations = [];
    createBoard();
}

function createBoard() {
    board.innerHTML = '';

    for (let i = 0; i < boardSize; i++) {
        let row = document.createElement('div');
        row.style.display = 'flex';

        for (let j = 0; j < boardSize; j++) {
            let elem = document.createElement('div');
            elem.classList ='square';
            elem.dataset.item = `${i} ${j}`;
            elem.addEventListener('click', () => {
                handleSquareClick(elem);
            });

            row.append(elem);
            squares.push(elem);
        }

        board.append(row);
    }
    generateWinningCombinations();
}

function handleSquareClick(square) {
    if (square.textContent !== '') return; 
        square.textContent = currentPlayer; 
    

    if (checkWin(currentPlayer)) {
        endMessage.textContent = `Player ${currentPlayer} wins!`;
        endMessage.style.backgroundColor = '#007bff';
        endMessage.style.color = '#ffffff';
        endMessage.style.padding = '10px';
        endMessage.style.borderRadius= '10px';
        board.innerHTML = ''; 
        return;
    }
    
    if (checkTry()) {
        endMessage.textContent = `Try again!`;
        return;
    }
    
    currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
}

function generateWinningCombinations() {
    // win rows
    for (let i = 0; i < boardSize; i++) {
        let horizontal = [];
        for (let j = 0; j < boardSize; j++) {
            horizontal.push(i * boardSize + j);
        }
        winning_combinations.push(horizontal);
    }

    // win columns
    for (let i = 0; i < boardSize; i++) {
        let vertical = [];
        for (let j = 0; j < boardSize; j++) {
            vertical.push(j * boardSize + i);
        }
        winning_combinations.push(vertical);
    }

    // diagonal 1
    let diagonal1 = [];
    for (let i = 0; i < boardSize; i++) {
        diagonal1.push(i * (boardSize + 1));
    }
    winning_combinations.push(diagonal1);

    // diagonal 2
    let diagonal2 = [];
    for (let i = 0; i < boardSize; i++) {
        diagonal2.push((i + 1) * (boardSize - 1));
    }
    winning_combinations.push(diagonal2);
}

function checkWin(player) {
    for (let combination of winning_combinations) {
        if (combination.every(index => squares[index].textContent === player)) {
            return true; 
        }
    }
    return false;
}

function checkTry() {
    for (let square of squares) {
        if (square.textContent === '') {
            return false;
        }
    }
    return true;
}
