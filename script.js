const coin = document.getElementById("coin");
const statsEl = document.getElementById("stats");

let stats = {
  total: parseInt(localStorage.getItem("totalFlips")) || 0,
  heads: parseInt(localStorage.getItem("headsCount")) || 0,
  tails: parseInt(localStorage.getItem("tailsCount")) || 0,
};

let isFlipping = false;

function updateStatsDisplay() {
  statsEl.textContent = `Total Flips: ${stats.total} | Heads: ${stats.heads} | Tails: ${stats.tails}`;
}

function saveStats() {
  localStorage.setItem("totalFlips", stats.total);
  localStorage.setItem("headsCount", stats.heads);
  localStorage.setItem("tailsCount", stats.tails);
}

coin.addEventListener("click", () => {
  if (isFlipping) return;

  isFlipping = true;

  const isHeads = Math.random() < 0.5;
  const rotation = isHeads ? 0 : 180;
  const fullRotations = Math.floor(Math.random() * 3 + 6) * 360; // 6–8 full spins
  const totalRotation = fullRotations + rotation;

  coin.style.transition = "transform 2.5s ease-in-out"; // force minimum duration
  coin.style.transform = `rotateY(${totalRotation}deg)`;

  // Wait for the spin to complete (2.5s), then update stats
  setTimeout(() => {
    stats.total++;
    if (isHeads) stats.heads++;
    else stats.tails++;

    saveStats();
    updateStatsDisplay();

    isFlipping = false;
  }, 2500);
});

updateStatsDisplay();
