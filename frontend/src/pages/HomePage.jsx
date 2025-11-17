import React, { useState, useEffect } from "react";
import DesktopShell from "../components/layout/DesktopShell.jsx";
import Card from "../components/ui/Card.jsx";

import { getWeather } from "../utils/weather";
import { getCityFromCoords } from "../utils/location";
import { getDeviceUsage, startUsageTracking } from "../utils/usage";

import { computeEnergy, computeFocus } from "../utils/aiModel";
import { sleepData } from "../ml/sleep.js";
import { productivityEnergy, restEnergy, sleepEnergy } from "../ml/energy.js";
import summaryReport from "../ml/summary.js";

export default function HomePage() {
  // -------------------------------------------------------------------
  // STATES
  // -------------------------------------------------------------------
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [locationLabel, setLocationLabel] = useState("Loading location...");
  const [intention, setIntention] = useState(localStorage.getItem("intention") || "");
  const [deviceUsage, setDeviceUsage] = useState({ mac: 0, iphone: 0, ipad: 0 });

  const [energy, setEnergy] = useState(null);
  const [focus, setFocus] = useState(null);

  const [sleepHours, setSleepHours] = useState(localStorage.getItem("sleepHours") || "");
  const [todaySleep, setTodaySleep] = useState(sleepHours);

  const [showSleepPopup, setShowSleepPopup] = useState(false);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState("");

  // -------------------------------------------------------------------
  // DAILY RESET
  // -------------------------------------------------------------------
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const last = localStorage.getItem("lastActiveDate");

    if (last !== today) {
      localStorage.setItem("intention", "");
      localStorage.setItem("deviceUsage", JSON.stringify({ mac: 0, iphone: 0, ipad: 0 }));
      setIntention("");
      setDeviceUsage({ mac: 0, iphone: 0, ipad: 0 });

      localStorage.setItem("lastActiveDate", today);
      setShowSleepPopup(true);
    }
  }, []);

  // -------------------------------------------------------------------
  // DAILY SLEEP POPUP ON FIRST OPEN
  // -------------------------------------------------------------------
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const lastSleep = localStorage.getItem("sleepDate");

    if (today !== lastSleep) {
      setShowSleepPopup(true);
    }
  }, []);

  // SLEEP SUBMIT
  function submitSleep() {
    if (!todaySleep) return;

    const today = new Date().toLocaleDateString();
    localStorage.setItem("sleepHours", todaySleep);
    localStorage.setItem("sleepDate", today);
    setSleepHours(todaySleep);
    setShowSleepPopup(false);

    // Update weekly sleep total
    const wk = Number(localStorage.getItem("weeklySleepHours") || 0);
    localStorage.setItem("weeklySleepHours", wk + Number(todaySleep));
  }

  // -------------------------------------------------------------------
  // WEEKLY SUMMARY (MONDAY)
  // -------------------------------------------------------------------
  useEffect(() => {
    const today = new Date();
    const weekday = today.getDay(); // 1 = Monday
    const todayDate = today.toLocaleDateString();
    const last = localStorage.getItem("lastSummaryDate");

    if (weekday === 1 && last !== todayDate) {
      const totalProductivity = Number(localStorage.getItem("weeklyProductivityMinutes")) || 0;
      const totalSleep = Number(localStorage.getItem("weeklySleepHours")) || 0;
      const totalRest = Number(localStorage.getItem("weeklyRestMinutes")) || 0;
      const totalEnergy = Number(localStorage.getItem("weeklyEnergyLevel")) || 0;

      const report = summaryReport(
        totalProductivity,
        totalSleep,
        totalRest,
        totalEnergy
      );

      setWeeklySummary(report);
      setShowSummaryPopup(true);

      // mark seen
      localStorage.setItem("lastSummaryDate", todayDate);

      // reset weekly totals
      localStorage.setItem("weeklyProductivityMinutes", 0);
      localStorage.setItem("weeklySleepHours", 0);
      localStorage.setItem("weeklyRestMinutes", 0);
      localStorage.setItem("weeklyEnergyLevel", 0);
    }
  }, []);

  // -------------------------------------------------------------------
  // LIVE CLOCK
  // -------------------------------------------------------------------
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // -------------------------------------------------------------------
  // GEO + WEATHER
  // -------------------------------------------------------------------
  useEffect(() => {
    const fallback = async () => {
      const w = await getWeather(33.7490, -84.3880);
      setWeather(w);
      setLocationLabel("Atlanta, GA");
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          const loc = await getCityFromCoords(latitude, longitude);
          setLocationLabel(`${loc.city}, ${loc.state}`);

          const w = await getWeather(latitude, longitude);
          setWeather(w);
        },
        fallback
      );
    } else fallback();
  }, []);

  // -------------------------------------------------------------------
  // DEVICE USAGE POLLING
  // -------------------------------------------------------------------
  useEffect(() => {
    startUsageTracking();
    setDeviceUsage(getDeviceUsage());

    const interval = setInterval(() => {
      setDeviceUsage(getDeviceUsage());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // -------------------------------------------------------------------
  // ENERGY + FOCUS CALCULATED (ONLY WHEN REAL INPUTS CHANGE)
  // -------------------------------------------------------------------
  useEffect(() => {
    if (!weather) return;

    const baseInput = {
      weatherTempF: weather.temp,
      phoneUsage: deviceUsage.iphone,
      hour: time.getHours(),
      intention,
      sleep: Number(sleepHours) || 0,
    };

    let e = computeEnergy(baseInput);

    // apply modifiers
    e = sleepEnergy(baseInput.sleep);

    const prod = Number(localStorage.getItem("productivityMinutes")) || 0;
    if (prod) e = productivityEnergy(prod);

    const rest = Number(localStorage.getItem("restMinutes")) || 0;
    if (rest) e = restEnergy(rest);

    setEnergy(e);
    setFocus(computeFocus(baseInput));

    // Update weekly energy total
    const wk = Number(localStorage.getItem("weeklyEnergyLevel")) || 0;
    localStorage.setItem("weeklyEnergyLevel", wk + e);

  }, [weather, deviceUsage, intention, sleepHours]);

  // -------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------
  function formatMinutes(mins) {
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${hrs} hr ${m} min` : `${hrs} hr`;
  }

  const updateIntention = (e) => {
    const val = e.target.value;
    setIntention(val);
    localStorage.setItem("intention", val);
  };

  // -------------------------------------------------------------------
  // UI
  // -------------------------------------------------------------------
  return (
    <>
      {/* WEEKLY SUMMARY POPUP */}
      {showSummaryPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] border border-luna-border rounded-xl p-5 w-[22rem] shadow-lg whitespace-pre-wrap">
            <h2 className="text-lg font-semibold mb-3 text-center">Weekly Summary</h2>
            <p className="text-sm text-luna-muted mb-4">{weeklySummary}</p>

            <button
              onClick={() => setShowSummaryPopup(false)}
              className="w-full bg-white/10 hover:bg-white/20 text-sm py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* SLEEP POPUP */}
      {showSleepPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] border border-luna-border rounded-xl p-5 w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-2 text-center">Sleep Check</h2>
            <p className="text-sm text-luna-muted mb-3 text-center">How many hours did you sleep?</p>

            <input
              type="number"
              value={todaySleep}
              onChange={(e) => setTodaySleep(e.target.value)}
              className="w-full bg-transparent border border-luna-border rounded-md px-2 py-1 text-sm focus:outline-none mb-4"
              placeholder="Hours"
            />

            <button
              onClick={submitSleep}
              className="w-full bg-white/10 hover:bg-white/20 text-sm py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* MAIN PAGE */}
      <DesktopShell>
        <h1 className="text-2xl font-semibold mb-4">Home</h1>

        <div className="space-y-4">

          {/* TIME */}
          <Card className="py-4">
            <p className="text-3xl font-bold">
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-luna-muted text-sm">
              {time.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" })}
            </p>
          </Card>

          {/* WEATHER + ENERGY + FOCUS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="py-3">
              <p className="font-medium text-sm">Weather</p>
              <p className="text-luna-muted text-xs">{locationLabel}</p>
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

          {/* DEVICE USAGE */}
          <p className="font-medium text-sm">Device Usage</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="py-3">
              <p className="font-medium text-sm">iPhone</p>
              <p className="text-luna-muted text-xs">{formatMinutes(deviceUsage.iphone)}</p>
            </Card>

            <Card className="py-3">
              <p className="font-medium text-sm">iPad</p>
              <p className="text-luna-muted text-xs">{formatMinutes(deviceUsage.ipad)}</p>
            </Card>

            <Card className="py-3">
              <p className="font-medium text-sm">Mac</p>
              <p className="text-luna-muted text-xs">{formatMinutes(deviceUsage.mac)}</p>
            </Card>
          </div>

          {/* SLEEP CARD */}
          <Card className="py-3">
            <p className="font-medium text-sm mb-1">Sleep</p>
            <p className="text-luna-muted text-xs mb-1">
              {sleepHours ? `${sleepHours} hrs` : "No data yet"}
            </p>
            <p className="text-luna-muted text-xs mt-1">
              {sleepHours ? sleepData(Number(sleepHours)) : ""}
            </p>
          </Card>

          {/* INTENTION */}
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
      </DesktopShell>
    </>
  );
}