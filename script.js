const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== null || !isGameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    boardState[cellIndex] = currentPlayer;

    if (checkWin(currentPlayer)) {
        statusText.textContent = ` Congratulation Player ${currentPlayer} wins!`;
        isGameActive = false;
    } else if (boardState.every(cell => cell !== null)) {
        statusText.textContent = `It's a draw!`;
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === player;
        });
    });
}

function restartGame() {
    currentPlayer = 'X';
    boardState = Array(9).fill(null);
    isGameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
}
