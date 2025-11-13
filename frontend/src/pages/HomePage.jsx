import React, { useState, useEffect, useMemo } from "react";
import DesktopShell from "../components/layout/DesktopShell.jsx";
import Card from "../components/ui/Card.jsx";

import { getWeather } from "../utils/weather";
import { getDeviceUsage, startUsageTracking } from "../utils/usage";
import { startAppTracking, getAppUsage } from "../utils/appTracker";
import { computeEnergy, computeFocus } from "../utils/aiModel";

export default function HomePage() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [intention, setIntention] = useState(localStorage.getItem("intention") || "");

  const [deviceUsage, setDeviceUsage] = useState({ mac: 0, iphone: 0, ipad: 0 });
  const [appUsage, setAppUsage] = useState([]);

  const [energy, setEnergy] = useState(null);
  const [focus, setFocus] = useState(null);

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Weather
  useEffect(() => {
    const fallback = () =>
      getWeather(33.7490, -84.3880).then(setWeather); // fallback Atlanta

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          getWeather(pos.coords.latitude, pos.coords.longitude).then(setWeather),
        fallback
      );
    } else fallback();
  }, []);

  // Usage + App tracking (live update)
  useEffect(() => {
    startUsageTracking();
    startAppTracking();

    // initial load
    setDeviceUsage(getDeviceUsage());
    setAppUsage(getAppUsage());

    // update every 10 seconds
    const interval = setInterval(() => {
      setDeviceUsage(getDeviceUsage());
      setAppUsage(getAppUsage());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // AI Energy + Focus
  useEffect(() => {
    if (!weather) return;

    const input = {
      weatherTempF: weather.temp,
      phoneUsage: deviceUsage.iphone,
      hour: time.getHours(),
      intention,
    };

    setEnergy(computeEnergy(input));
    setFocus(computeFocus(input));
  }, [weather, deviceUsage, time, intention]);

  // Save intention
  const updateIntention = (e) => {
    const val = e.target.value;
    setIntention(val);
    localStorage.setItem("intention", val);
  };

  // Most used app (computed safely)
  const mostUsed = useMemo(() => {
    if (appUsage.length === 0) return null;
    const sorted = [...appUsage].sort((a, b) => b.minutes - a.minutes);
    return sorted[0];
  }, [appUsage]);

  return (
    <DesktopShell>
      <h1 className="text-2xl font-semibold mb-4">Home</h1>

      <div className="space-y-4">

        {/* Time */}
        <Card className="py-4">
          <p className="text-3xl font-bold">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-luna-muted text-sm">
            {time.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
          </p>
        </Card>

        {/* Weather, Energy, Focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="py-3">
            <p className="font-medium text-sm">Weather</p>
            <p className="text-luna-muted text-xs">
              {weather ? `${weather.temp}°F • ${weather.condition}` : "Loading..."}
            </p>
          </Card>

          <Card className="py-3">
            <p className="font-medium text-sm">Energy</p>
            <p className="text-luna-muted text-xs">
              {energy !== null ? `${energy}/10` : "Loading..."}
            </p>
          </Card>

          <Card className="py-3">
            <p className="font-medium text-sm">Focus</p>
            <p className="text-luna-muted text-xs">{focus || "Loading..."}</p>
          </Card>
        </div>

        {/* Device Usage */}
        <p className="font-medium text-sm">Device Usage</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="py-3">
            <p className="font-medium text-sm">iPhone</p>
            <p className="text-luna-muted text-xs">{deviceUsage.iphone} min today</p>
          </Card>

          <Card className="py-3">
            <p className="font-medium text-sm">iPad</p>
            <p className="text-luna-muted text-xs">{deviceUsage.ipad} min today</p>
          </Card>

          <Card className="py-3">
            <p className="font-medium text-sm">Mac</p>
            <p className="text-luna-muted text-xs">{deviceUsage.mac} min today</p>
          </Card>
        </div>

        {/* Most Used App + Intention */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="py-3">
            <p className="font-medium text-sm">Most Used App</p>
            <p className="text-luna-muted text-xs">
              {mostUsed ? `${mostUsed.app}: ${mostUsed.minutes} min` : "Loading..."}
            </p>
          </Card>

          <Card className="py-3">
            <p className="font-medium text-sm mb-1">Intention</p>
            <input
              value={intention}
              onChange={updateIntention}
              className="w-full bg-transparent border border-luna-border rounded-md px-2 py-1 text-xs focus:outline-none"
              placeholder="Set your intention..."
            />
          </Card>
        </div>

      </div>
    </DesktopShell>
  );
}
