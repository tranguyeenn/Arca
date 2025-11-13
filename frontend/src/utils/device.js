// utils/device.js
export function getDeviceType() {
  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("iphone") || ua.includes("ios")) return "iphone";
  if (ua.includes("ipad")) return "ipad";
  if (ua.includes("mac")) return "mac";

  return "other";
}
