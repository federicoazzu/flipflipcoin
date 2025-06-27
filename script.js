const coin = document.getElementById("coin");
const statsEl = document.getElementById("stats");

let stats = {
  total: parseInt(localStorage.getItem("totalFlips")) || 0,
  heads: parseInt(localStorage.getItem("headsCount")) || 0,
  tails: parseInt(localStorage.getItem("tailsCount")) || 0,
};

function updateStatsDisplay() {
  statsEl.textContent = `Flips: ${stats.total} • Heads: ${stats.heads} • Tails: ${stats.tails}`;
}

function saveStats() {
  localStorage.setItem("totalFlips", stats.total);
  localStorage.setItem("headsCount", stats.heads);
  localStorage.setItem("tailsCount", stats.tails);
}

coin.addEventListener("click", () => {
  const isHeads = Math.random() < 0.5;
  const rotation = isHeads ? 0 : 180;
  const spins = Math.floor(Math.random() * 4 + 5) * 360;

  coin.style.transform = `rotateY(${spins + rotation}deg)`;

  stats.total++;
  if (isHeads) stats.heads++;
  else stats.tails++;

  saveStats();
  updateStatsDisplay();
});

updateStatsDisplay();
