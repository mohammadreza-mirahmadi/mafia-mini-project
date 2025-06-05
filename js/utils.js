// utilities functions
export function getPlayers() {
  const players = localStorage.getItem("players");
  return players ? JSON.parse(players) : [];
}

export function addPlayerToLocalStorage(player) {
  const players = getPlayers();
  players.push({
    ...player,
    id: players[players.length - 1]?.id + 1 || 1,
  });
  localStorage.setItem("players", JSON.stringify(players));
}

export function renderEmptyErr() {
  localStorage.setItem("emptyErr", "Please Enter a Player Name.");
  document.querySelector("#emptyErr").textContent =
    localStorage.getItem("emptyErr");
}

export function removePlayer(id) {
  const players = getPlayers();
  const filteredPlayers = players.filter((player) => {
    return player.id !== id;
  });
  localStorage.setItem("players", JSON.stringify(filteredPlayers));
}
