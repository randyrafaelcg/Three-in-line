const tiles = Array.from(document.querySelectorAll(".tile"));
const buttonReset = document.getElementById("reset");
const winner = document.querySelector(".winner");
const playerTurn = document.querySelector(".turn-player");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

var currentPlayer = "X";
var hasEnded = false;
var board = ["", "", "", "", "", "", "", "", "", ""];

const restartGame = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  if (currentPlayer === "O") changePlayer();
  winner.innerHTML = "";
  hasEnded = false;
  tiles.forEach((tile) => {
    tile.innerText = "";
    tile.classList.remove(`playerX`);
    tile.classList.remove(`playerO`);
  });
  winner.classList.remove(`playerO`);
  winner.classList.remove(`playerX`);
};

const changePlayer = () => {
  playerTurn.classList.remove(`player${currentPlayer}`);
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerTurn.classList.add(`player${currentPlayer}`);
  playerTurn.innerText = currentPlayer;
};

const isEmpty = (tile) => {
  if (tile.innerText === "X" || tile.innerText === "O") return false;
  else return true;
};

function validateResult() {
  let won = false;
  for (let elem of winningConditions) {
    let a = board[elem[0]];
    let b = board[elem[1]];
    let c = board[elem[2]];
    if (a === b && b === c) {
      if (a === "" || b === "" || c === "") {
        won = false;
      } else {
        won = true;
        break;
      }
    }
  }
  if (won) {
    winner.classList.add(`player${currentPlayer}`);
    winner.innerHTML = "Player " + currentPlayer + " has won";
    hasEnded = true;
  }
  if (!board.includes("")) {
    winner.classList.remove(`player${currentPlayer}`);
    winner.innerHTML = "Tie";
  }
}

function userAction(tile, index) {
  if (isEmpty(tile) && !hasEnded) {
    tile.classList.remove(`player${currentPlayer}`);
    tile.classList.add(`player${currentPlayer}`);
    tile.innerText = currentPlayer;
    board[index] = currentPlayer;
    validateResult();
    changePlayer();
  }
}

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile, index));
});

buttonReset.addEventListener("click", restartGame);
