// utils/appTracker.js

let currentApp = null;
let startTime = null;
let interval = null;

export function startAppTracking() {
  currentApp = detectApp();
  startTime = Date.now();

  // Record time every 10 seconds so usage updates live
  interval = setInterval(() => {
    saveTimeChunk();
  }, 10000);

  // Pause/resume tracking when tab visibility changes
  window.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      saveTimeChunk();
    } else {
      currentApp = detectApp();
      startTime = Date.now();
    }
  });

  // Save final time before closing
  window.addEventListener("beforeunload", () => {
    saveTimeChunk();
    clearInterval(interval);
  });
}

function saveTimeChunk() {
  if (!currentApp || !startTime) return;

  const now = Date.now();
  const minutes = Math.floor((now - startTime) / 1000 / 60);

  if (minutes > 0) {
    const key = `app_usage_${currentApp}`;
    const prev = Number(localStorage.getItem(key) || 0);
    localStorage.setItem(key, prev + minutes);

    startTime = now; // reset baseline
  }
}

// Identify which app you're on
function detectApp() {
  const url = window.location.hostname;

  if (url.includes("vercel") || url.includes("localhost")) return "Luna";
  if (url.includes("canvas")) return "Canvas";
  if (url.includes("paws")) return "PAWS";
  if (url.includes("instagram")) return "Instagram";
  if (url.includes("youtube")) return "YouTube";
  if (url.includes("spotify")) return "Spotify";

  return "Other";
}

// Return usage for all known apps
export function getAppUsage() {
  const apps = ["Luna", "Canvas", "PAWS", "Instagram", "Spotify", "YouTube", "Other"];

  return apps.map((app) => ({
    app,
    minutes: Number(localStorage.getItem(`app_usage_${app}`) || 0),
  }));
}
