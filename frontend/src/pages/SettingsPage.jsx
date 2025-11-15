import React, { useState, useEffect } from "react";

export default function SettingsPage() {
  const [calmMode, setCalmMode] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4);

  // Load saved settings on mount
  useEffect(() => {
    const savedCalm = localStorage.getItem("calmMode");
    const savedWork = localStorage.getItem("workDuration");
    const savedBreak = localStorage.getItem("breakDuration");
    const savedLongBreak = localStorage.getItem("longBreakDuration");
    const savedSessions = localStorage.getItem("sessionsBeforeLongBreak");

    if (savedCalm !== null) {
      const parsed = JSON.parse(savedCalm);
      setCalmMode(parsed);
      parsed
        ? document.documentElement.classList.add("calm")
        : document.documentElement.classList.remove("calm");
    }

    if (savedWork) setWorkDuration(Number(savedWork));
    if (savedBreak) setBreakDuration(Number(savedBreak));
    if (savedLongBreak) setLongBreakDuration(Number(savedLongBreak));
    if (savedSessions) setSessionsBeforeLongBreak(Number(savedSessions));
  }, []);

  function toggleCalmMode() {
    const next = !calmMode;
    setCalmMode(next);
    localStorage.setItem("calmMode", JSON.stringify(next));
    next
      ? document.documentElement.classList.add("calm")
      : document.documentElement.classList.remove("calm");
  }

  function handleNumberChange(setter, key, minValue) {
    return (e) => {
      let value = Number(e.target.value);

      if (Number.isNaN(value)) return;
      if (value < minValue) value = minValue;
      if (value > 600) value = 600;

      setter(value);
      localStorage.setItem(key, String(value));
    };
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Tune Luna so it matches your brain.
        </p>
      </div>

      {/* Calm Mode */}
      <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Calm Mode</h2>
            <p className="text-neutral-400 text-sm">
              Soft UI, fewer animations, less chaos.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <span className="text-sm text-neutral-300">
              {calmMode ? "On" : "Off"}
            </span>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                className="sr-only"
                checked={calmMode}
                onChange={toggleCalmMode}
              />
              <div className="w-10 h-5 rounded-full bg-neutral-700 transition-colors peer-checked:bg-purple-500">
                <div
                  className={`h-4 w-4 bg-white rounded-full shadow transform transition-transform mt-0.5 ${
                    calmMode ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </div>
            </div>
          </label>
        </div>
      </section>

      {/* Pomodoro Preferences */}
      <section className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold">Pomodoro Preferences</h2>
        <p className="text-neutral-400 text-sm">
          These control the timers on your Study page.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Work Duration */}
          <div className="space-y-1">
            <label className="text-sm text-neutral-300">
              Work session (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="600"
              value={workDuration}
              onChange={handleNumberChange(setWorkDuration, "workDuration", 1)}
              className="bg-neutral-800 border border-neutral-700 rounded-md p-2 w-full text-sm"
            />
          </div>

          {/* Short Break */}
          <div className="space-y-1">
            <label className="text-sm text-neutral-300">
              Short break (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="600"
              value={breakDuration}
              onChange={handleNumberChange(setBreakDuration, "breakDuration", 1)}
              className="bg-neutral-800 border border-neutral-700 rounded-md p-2 w-full text-sm"
            />
          </div>

          {/* Long Break */}
          <div className="space-y-1">
            <label className="text-sm text-neutral-300">
              Long break (minutes)
            </label>
            <input
              type="number"
              min="5"
              max="600"
              value={longBreakDuration}
              onChange={handleNumberChange(
                setLongBreakDuration,
                "longBreakDuration",
                5
              )}
              className="bg-neutral-800 border border-neutral-700 rounded-md p-2 w-full text-sm"
            />
          </div>

          {/* Sessions before long break */}
          <div className="space-y-1">
            <label className="text-sm text-neutral-300">
              Sessions before long break
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={sessionsBeforeLongBreak}
              onChange={handleNumberChange(
                setSessionsBeforeLongBreak,
                "sessionsBeforeLongBreak",
                1
              )}
              className="bg-neutral-800 border border-neutral-700 rounded-md p-2 w-full text-sm"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
