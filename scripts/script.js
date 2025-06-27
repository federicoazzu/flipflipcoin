const coin = document.getElementById("coin");
const statsEl = document.getElementById("stats");
const themeToggle = document.getElementById("theme-toggle");
const statsToggle = document.getElementById("stats-toggle");

let stats = {
    total: parseInt(localStorage.getItem("totalFlips")) || 0,
    heads: parseInt(localStorage.getItem("headsCount")) || 0,
    tails: parseInt(localStorage.getItem("tailsCount")) || 0,
};

let isFlipping = false;
let currentRotation = 0;

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
    const spins = 1.5;
    const rotationOffset = isHeads ? spins * 360 : spins * 360 + 180;

    currentRotation += rotationOffset;

    const duration = 1; // seconds
    coin.style.transition = `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`;
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

// THEME TOGGLE
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// STATS TOGGLE
let showStats = true;

function updateStatsVisibility() {
    statsEl.style.display = showStats ? "block" : "none";
    statsToggle.textContent = showStats ? "Hide Stats" : "Show Stats";
}

statsToggle.addEventListener("click", () => {
    showStats = !showStats;
    updateStatsVisibility();
});

updateStatsVisibility();