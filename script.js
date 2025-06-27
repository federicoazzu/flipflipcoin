const coin = document.getElementById("coin");
const statsEl = document.getElementById("stats");

let stats = {
  total: parseInt(localStorage.getItem("totalFlips")) || 0,
  heads: parseInt(localStorage.getItem("headsCount")) || 0,
  tails: parseInt(localStorage.getItem("tailsCount")) || 0,
};

let isFlipping = false;
let currentRotation = 0; // Keeps track of accumulated rotation

function updateStatsDisplay() {
  statsEl.textContent = `Flips: ${stats.total} • Heads: ${stats.heads} • Tails: ${stats.tails}`;
}

function saveStats() {
  localStorage.setItem("totalFlips", stats.total);
  localStorage.setItem("headsCount", stats.heads);
  localStorage.setItem("tailsCount", stats.tails);
}

function setInitialFace() {
  const isHeads = Math.random() < 0.5;
  const baseRotation = isHeads ? 0 : 180;
  coin.style.transform = `rotateY(${baseRotation}deg)`;
  currentRotation = baseRotation;
}

coin.addEventListener("click", () => {
  if (isFlipping) return;
  isFlipping = true;

  const isHeads = Math.random() < 0.5;
  const rotationOffset = isHeads ? 3600 : 3780; // 10 or 10.5 full spins
  currentRotation += rotationOffset;

  const duration = Math.random() * 3 + 2; // Random duration between 2–5s
  coin.style.transition = `transform ${duration.toFixed(2)}s ease-in-out`;
  coin.style.transform = `rotateY(${currentRotation}deg)`;

  setTimeout(() => {
    stats.total++;
    if (isHeads) stats.heads++;
    else stats.tails++;

    saveStats();
    updateStatsDisplay();
    isFlipping = false;
  }, duration * 1000);
});

updateStatsDisplay();
setInitialFace();
