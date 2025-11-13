// utils/aiModel.js

export function computeEnergy({ weatherTempF, phoneUsage, hour }) {
  let score = 7;

  if (weatherTempF < 40) score -= 1;
  if (weatherTempF > 85) score -= 1;

  if (hour < 12 && phoneUsage < 20) score += 1;

  if (phoneUsage > 60) score -= 2;

  return Math.max(1, Math.min(10, score));
}

export function computeFocus({ phoneUsage, hour, intention }) {
  if (phoneUsage > 90) return "Low";
  if (phoneUsage > 30) return "Medium";

  if (hour < 12 && intention) return "High";

  return "Medium";
}
