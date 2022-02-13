const tiles = Array.from(document.querySelectorAll(".tile"));
const buttonReset= document.getElementById("reset");

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
var hasEnded=false;
var board = ["", "", "", "", "", "", "", "", ""];

const restartGame = ()=>{
  board = ["", "", "", "", "", "", "", "", ""];
  if(currentPlayer==="O")
  changePlayer();

  tiles.forEach(tile=>{
    tile.innerText='';
  })
}

const changePlayer=()=>{
  if(currentPlayer==="X")
  currentPlayer="O";
  else
  currentPlayer="X"
}

const isEmpty=(tile)=>{
  if(tile.innerText === "X" && tile.innerText === "O")
  return false;
  else
  return true;
}

function validateResult(){
  let won=false;
  for(let elem of winningConditions){
    let a=board[elem[0]];
    let b=board[elem[1]];
    let c=board[elem[2]];
    if(a===b && b===c && a!=''){
      won=true;
      break;
    }
  }

  if(won){
    alert("Player "+currentPlayer+" has Won");
    hasEnded=true;
  }
}

function userAction(tile,index) {
  
  if (isEmpty(tile) && !hasEnded) {
    tile.innerText = currentPlayer;
    board[index]=currentPlayer;
    validateResult();
    changePlayer();
  }
  
}

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile,index));
});

buttonReset.addEventListener("click",restartGame);


