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
var matrix;

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
  for (let i = 0; i < tam; i++) {
    for (let j = 0; j < tam; j++) {
      matrix[i][j]="";
    }
  }
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

const handleHorizontalsResult = ()=>{
  let i;
  let j;
  for (i = 0; i < tam; i++) {
    for (j = 0; j < tam-1; j++) {
      if(matrix[i][j]!=matrix[i][j+1]){
        break;
      }
      else if(matrix[i][j]===""){
        j--;
        break;
      }
    }
    if(j===tam-1){
      return true;
    }
  }
  return false;
}

const handleVerticalsResult = ()=>{
  let i;
  let j;
  for (i = 0; i < tam; i++) {
    for (j = 0; j < tam-1; j++) {
      if(matrix[j][i]!=matrix[j+1][i]){
        break;
      }
      else if(matrix[j][i]===""){
        j--;
        break;
      }
    }
    if(j===tam-1){
      return true;
    }
  }
  return false;
}

const handleDiagonalResults=()=>{
  let i=0;
  let j=tam-1;
  for (let k = 0; k < tam; k++) {
    if(matrix[i][i]!=""){
      if(matrix[i][i]===matrix[i+1][i+1]){
        if(i+1 === tam-1){
          return true
        }
      }
    }
    else{
      break;
    }
    i++;
  }
  i=0;
  for (let k = 0; k < tam; k++) {
    if(matrix[i][j]!=""){
      if(matrix[i][j]===matrix[i+1][j-1]){
        if(i+1 === tam-1){
          return true
        }
      }
    }
    else{
      break;
    }
    i++;
    j--;
  }
  return false;
}

const isWinner = (size) => {
  if(handleHorizontalsResult()){
    return true;
  }
  else if(handleVerticalsResult()){
    return true
  }
  else if(handleDiagonalResults()){
    return true;
  }
  return false;
};

function validateResult() {
  let won = isWinner(tam);
  console.log(won);
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
    assignMatrix(size);
  }
}

function assignMatrix(size) {
  let aux = new Array(size);
  for (let i = 0; i < aux.length; i++) {
    aux[i] = [];

  }
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      aux[i][j] = "";
    }
  }
  matrix = aux;
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
  let count=0;
  let j;
  if (isEmpty(tile) && !hasEnded) {
    tile.classList.remove(`player${currentPlayer}`);
    tile.classList.add(`player${currentPlayer}`);
    tile.innerText = currentPlayer;
    for (let i = 0; i < tam; i++) {
      for (j = 0; j < tam; j++) {
        if(count===index){
          matrix[i][j]=currentPlayer;
          break;
        }
        else{
          count++;
        }
      }
      if(count===index && j!=tam){
        break;
      }
    }
    validateResult();
    changePlayer();
  }
}

buttonReset.addEventListener("click", restartGame);

buttonClear.addEventListener("click", clearGame);

buttonStart.addEventListener("click", () =>
  setMatrix(parseInt(matrixSize.value))
);
