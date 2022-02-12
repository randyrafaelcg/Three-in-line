const tiles = Array.from(document.querySelectorAll(".tile"));

tiles.forEach((tile) => {
  tile.addEventListener("click", () => userAction(tile));
});

function userAction(tile) {
  tile.innerText = "X";
}
