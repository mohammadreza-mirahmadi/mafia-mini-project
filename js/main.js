import {
  addPlayerToLocalStorage,
  getPlayers,
  renderEmptyErr,
  removePlayer,
} from "./utils.js";

function formSubmitHandle(event) {
  event.preventDefault();

  //   get the player name
  const playerName = event.target.addPlayers.value;
  //   handle the empty values
  if (!playerName.trim()) {
    renderEmptyErr();
    return;
  }
  if (playerName.trim()) {
    document.querySelector("#emptyErr").textContent = "";
  }

  //   add player name to localStorage
  addPlayerToLocalStorage({ name: playerName, isAlive: true });

  //   playerCard render
  renderPlayers();

  //   reset the form
  event.target.reset();
}

function renderPlayers() {
  const players = getPlayers();
  document.querySelector(
    "#playersCount"
  ).textContent = `Players: ${players.length}`;
  document.querySelector("#listOfPlayers").innerHTML = "";
  players?.forEach((player, index) => {
    const playerCard = document.createElement("div");
    playerCard.classList.add(
      "col-3",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "rounded",
      "border"
    );
    playerCard.innerHTML = `
        <span>${index + 1}</span>
        <span>${player.name}</span>`;
    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-danger fs-6";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removePlayerHandle(player.id);
    });
    playerCard.append(removeBtn);
    document.querySelector("#listOfPlayers").append(playerCard);
  });
}

function removePlayerHandle(id) {
  removePlayer(id);
  renderPlayers();
}

function nextPageHandle() {
  const players = getPlayers();

  if (players.length < 6) {
    alert("you need at least 6 players to start the game!");
    return;
  }

  location.href = "asign-roles.html";
}

function newGameHandle() {
  localStorage.removeItem("players");
  renderPlayers();
}

// render something when the page is loaded
document.addEventListener("DOMContentLoaded", renderPlayers);
document.querySelector("form").addEventListener("submit", formSubmitHandle);
document.querySelector("#nextBtn").addEventListener("click", nextPageHandle);
document.querySelector("#newGameBtn").addEventListener("click", newGameHandle);
