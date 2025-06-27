const coin = document.getElementById("coin");
const statsEl = document.getElementById("stats");
// Theme Toggle
const toggleButton = document.getElementById("themeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

toggleButton.addEventListener("click", toggleTheme);

// On load, apply saved theme or default to light
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

let stats = {
  total: parseInt(localStorage.getItem("totalFlips")) || 0,
  heads: parseInt(localStorage.getItem("headsCount")) || 0,
  tails: parseInt(localStorage.getItem("tailsCount")) || 0,
};

let isFlipping = false;

function updateStatsDisplay() {
  statsEl.textContent = `Flips: ${stats.total} • Heads: ${stats.heads} • Tails: ${stats.tails}`;
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
  const fixedRotation = 10 * 360; // Consistent number of spins (10 full spins)
  const totalRotation = fixedRotation + rotation;

  const duration = Math.random() * 3 + 2; // Random duration between 2–5 seconds

  coin.style.transition = `transform ${duration.toFixed(2)}s ease-in-out`;
  coin.style.transform = `rotateY(${totalRotation}deg)`;

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
