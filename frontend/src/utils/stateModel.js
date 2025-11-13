export function getMood() {
  return Number(localStorage.getItem("energy")) || 6;
}

export function getFocus() {
  return localStorage.getItem("focus") || "Low";
}
