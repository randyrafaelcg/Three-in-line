const buttonReset = document.getElementById("reset");
const winner = document.querySelector(".winner");
const playerTurn = document.querySelector(".turn-player");
const scoreO = document.querySelector(".scoreO");
const scoreX = document.querySelector(".scoreX");
const buttonClear = document.getElementById("clear");
const buttonStart = document.getElementById("start");
const container = document.getElementById("container");
const matrixSize = document.querySelector("#matrixSize");

const winningComb = [
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
var hasStarted = false;
var tiles;
var tam;

const restartGame = () => {
  clearGame();
  scoreO.innerText = 0;
  scoreX.innerText = 0;
  hasStarted = false;
  tam=0;
  tiles.forEach((tile) => {
    tile.remove();
  });
};

const clearGame = () => {
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

const updatescore = () => {
  let x = parseInt(scoreX.textContent);
  let o = parseInt(scoreO.textContent);
  if (currentPlayer === "X") {
    x++;
    scoreX.innerText = x;
  } else {
    o++;
    scoreO.innerText = o;
  }
};

const isWinner = (size) => {
  let aux=size;
  for (let i = 0; i < (size*size); i=i+size) {
    for (let j = i; j < aux-1; j++) {
      if(tiles[j].innerHTML != tiles[j+1].innerHTML ){
        console.log(j+" Brokes1");
        break;
      }
      else{
        if(tiles[j].innerHTML===""){
          console.log("brokes2");
          break;
        }
      }
      if(j===(aux-2)){
        return true
      }
    }
    aux=aux+size;
  }
  return false;
};

function validateResult() {
  let won = isWinner(tam);
  console.log(won);
  // for (let elem of winningComb) {
  //   let a = board[elem[0]];
  //   let b = board[elem[1]];
  //   let c = board[elem[2]];
  //   if (a === b && b === c) {
  //     if (a === "" || b === "" || c === "") {
  //       won = false;
  //     } else {
  //       won = true;
  //       break;
  //     }
  //   }
  // }
  if (won) {
    winner.classList.add(`player${currentPlayer}`);
    winner.innerHTML = "Player " + currentPlayer + " has won";
    updatescore();
    hasEnded = true;
  } 
}

function setMatrix(size) {
  if (!hasStarted) {
    for (let i = 0; i < size * size; i++) {
      let added = document.createElement("div");
      container.appendChild(added);
      added.classList.add("tile");
    }
    setBoardStyles(size);
    hasStarted = true;
    tiles = Array.from(document.querySelectorAll(".tile"));
    tiles.forEach((tile, index) => {
      tile.addEventListener("click", () => userAction(tile, index));
    });
    tam=size;
  }
}

function setBoardStyles(size) {
  let myboard = document.getElementById("container");
  let separation = 100 / size;
  let espace = " ";
  for (let j = 0; j < size; j++) {
    espace = espace + separation.toString() + "%";
  }
  myboard.style.gridTemplateColumns = espace;
  myboard.style.gridTemplateRows = espace;
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

buttonReset.addEventListener("click", restartGame);

buttonClear.addEventListener("click", clearGame);

buttonStart.addEventListener("click", () =>
  setMatrix(parseInt(matrixSize.value))
);
