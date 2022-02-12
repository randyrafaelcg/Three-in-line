const tiles = Array.from(document.querySelectorAll(".tile"));
const button= document.getElementById("reset");

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

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile,index));
});

button.addEventListener("click",()=>restartGame());

function userAction(tile,index) {
  let won=false;
  if (tile.innerText != "X" && tile.innerText != "O") {
    tile.innerText = currentPlayer;
    board[index]=currentPlayer;
    changePlayer();
  }
  winningConditions.forEach((elem)=>{
    let a=board[elem[0]];
    let b=board[elem[1]];
    let c=board[elem[2]];
    if(a===''||b===''||c===''){
      
    }
    else if(a===b&&b===c){
      won=true;
    }
  });
  if(won){
    if (currentPlayer == "X") currentPlayer = "O";
    else currentPlayer = "X";
    alert("Player "+currentPlayer+" has Won");
  }
}
