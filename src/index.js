const tiles = Array.from(document.querySelectorAll(".tile"));

var currentPlayer = "X";
tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile));
});

function userAction(tile) {
  if(tile.innerText!="X" && tile.innerText!="O"){
  tile.innerText = currentPlayer;
  if (currentPlayer == "X") currentPlayer = "O";
  else currentPlayer = "X";
  }
}
