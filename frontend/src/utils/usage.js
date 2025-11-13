// utils/usage.js
import { getDeviceType } from "./device";

let start = Date.now();
const device = getDeviceType();
const key = `usage_${device}`;

export function startUsageTracking() {
  window.addEventListener("beforeunload", () => {
    const used = Math.floor((Date.now() - start) / 1000 / 60);
    const prev = Number(localStorage.getItem(key) || 0);
    localStorage.setItem(key, prev + used);
  });
}

export function getDeviceUsage() {
  return {
    mac: Number(localStorage.getItem("usage_mac") || 0),
    iphone: Number(localStorage.getItem("usage_iphone") || 0),
    ipad: Number(localStorage.getItem("usage_ipad") || 0),
  };
}
