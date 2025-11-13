// utils/weather.js

export async function getWeather(lat, lon) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const data = await res.json();
    const w = data.current_weather;

    // Open-Meteo gives Celsius
    const celsius = w.temperature;
    const fahrenheit = Math.round((celsius * 9) / 5 + 32);

    const map = {
      0: "Clear",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Cloudy",
      45: "Fog",
      48: "Fog",
      51: "Light Drizzle",
      61: "Rain",
      63: "Heavy Rain",
      71: "Snow",
      80: "Showers",
      95: "Thunderstorm",
    };

    return {
      temp: fahrenheit,             // now Fahrenheit ONLY
      condition: map[w.weathercode] || "Unknown",
    };
  } catch (err) {
    console.error("Weather error:", err);
    return { temp: "--", condition: "Unavailable" };
  }
}
