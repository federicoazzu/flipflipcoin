const coin = document.getElementById("coin");
const statsEl = document.getElementById("stats");
const timeStatsEl = document.getElementById("timeStats");
const themeToggle = document.getElementById("theme-toggle");
const statsToggle = document.getElementById("stats-toggle");
const resetBtn = document.getElementById("reset-button");

// Load stats
let stats = {
    total: parseInt(localStorage.getItem("totalFlips")) || 0,
    heads: parseInt(localStorage.getItem("headsCount")) || 0,
    tails: parseInt(localStorage.getItem("tailsCount")) || 0,
};

// Load time
let totalTimeSpent = parseFloat(localStorage.getItem("totalTimeSpent")) || 0;
let sessionStartTime = Date.now();
let isFlipping = false;
let currentRotation = 0;
let resetFlag = false; // ⬅️ Added flag to detect reset

function updateStatsDisplay() {
    statsEl.textContent = `Flips: ${stats.total} • Heads: ${stats.heads} • Tails: ${stats.tails}`;
}

function formatTime(seconds) {
    if (seconds < 60) {
        return `${seconds.toFixed(1)} seconds`;
    } else if (seconds < 3600) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} min ${secs.toFixed(0)} sec`;
    } else if (seconds < 86400) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hrs} hr ${mins} min`;
    } else {
        const days = Math.floor(seconds / 86400);
        const hrs = Math.floor((seconds % 86400) / 3600);
        return `${days} d ${hrs} hr`;
    }
}

function updateTimeStatsDisplay() {
    const sessionElapsed = (Date.now() - sessionStartTime) / 1000;
    const combinedTime = totalTimeSpent + sessionElapsed;
    timeStatsEl.textContent = `You flipped for: ${formatTime(combinedTime)}`;
}

function saveStats() {
    localStorage.setItem("totalFlips", stats.total);
    localStorage.setItem("headsCount", stats.heads);
    localStorage.setItem("tailsCount", stats.tails);
    localStorage.setItem("totalTimeSpent", totalTimeSpent);
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

    const duration = 1;
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

setInterval(updateTimeStatsDisplay, 100);

// Save total time on unload
window.addEventListener("beforeunload", () => {
    // Don't add session time if reset just happened
    if (!resetFlag) {
        const sessionElapsed = (Date.now() - sessionStartTime) / 1000;
        localStorage.setItem("totalTimeSpent", totalTimeSpent + sessionElapsed);
    } else {
        localStorage.setItem("totalTimeSpent", 0);
    }
});

// THEME TOGGLE
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light ☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "Light ☀️" : "Dark 🌙";
});

// STATS TOGGLE
let showStats = localStorage.getItem("showStats") !== "false";

function updateStatsVisibility() {
    statsEl.style.display = showStats ? "block" : "none";
    timeStatsEl.style.display = showStats ? "block" : "none";
    statsToggle.textContent = showStats ? "Hide Stats" : "Show Stats";
}

statsToggle.addEventListener("click", () => {
    showStats = !showStats;
    localStorage.setItem("showStats", showStats);
    updateStatsVisibility();
});

updateStatsVisibility();

// RESET BUTTON
resetBtn.addEventListener("click", () => {
    stats = { total: 0, heads: 0, tails: 0 };
    totalTimeSpent = 0;
    sessionStartTime = Date.now();
    resetFlag = true; // ⬅️ Mark that a reset occurred

    // Immediately save zeros
    localStorage.setItem("totalFlips", 0);
    localStorage.setItem("headsCount", 0);
    localStorage.setItem("tailsCount", 0);
    localStorage.setItem("totalTimeSpent", 0);

    updateStatsDisplay();
    updateTimeStatsDisplay();
});