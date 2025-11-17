import React, { useState, useEffect, useRef } from "react";
import { useTasks } from "../context/TasksContext.jsx";
import { productivityFeature, restFeature } from "../ml/productivity.js";

export default function StudyPage() {
  const [elapsed, setElapsed] = useState(0); // ms
  const [running, setRunning] = useState(false);

  const [breakTime, setBreakTime] = useState(0); // ms
  const [onBreak, setOnBreak] = useState(false);

  const [message, setMessage] = useState("");

  const [openTasks, setOpenTasks] = useState(false);
  const { tasks, toggleTask } = useTasks();

  const intervalRef = useRef(null);
  const breakRef = useRef(null);

  // FORMAT TIME
  const format = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const milli = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(
      milli
    ).padStart(2, "0")}`;
  };

  // ----------------------------------------
  // SAVE FUNCTIONS (DAILY + WEEKLY)
  // ----------------------------------------
  function saveProductivity(minutes) {
    if (minutes <= 0) return;

    localStorage.setItem("productivityMinutes", minutes);

    const weekly = Number(localStorage.getItem("weeklyProductivityMinutes")) || 0;
    localStorage.setItem("weeklyProductivityMinutes", weekly + minutes);
  }

  function saveRest(minutes) {
    if (minutes <= 0) return;

    localStorage.setItem("restMinutes", minutes);

    const weekly = Number(localStorage.getItem("weeklyRestMinutes")) || 0;
    localStorage.setItem("weeklyRestMinutes", weekly + minutes);
  }

  // ----------------------------------------
  // WORK TIMER
  // ----------------------------------------
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          const newVal = prev + 10;
          const min = Math.floor(newVal / 60000);
          const line = productivityFeature(min);
          if (line) setMessage(line);
          return newVal;
        });
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // ----------------------------------------
  // BREAK TIMER
  // ----------------------------------------
  useEffect(() => {
    if (onBreak) {
      breakRef.current = setInterval(() => {
        setBreakTime((prev) => {
          const newVal = prev + 10;
          const min = Math.floor(newVal / 60000);
          const line = restFeature(min);
          if (line) setMessage(line);
          return newVal;
        });
      }, 10);
    }
    return () => clearInterval(breakRef.current);
  }, [onBreak]);

  // FORCE BREAK AFTER 120 MIN WORK
  useEffect(() => {
    const mins = elapsed / 60000;
    if (running && mins >= 120) {
      setMessage("I'm putting you on break timeout");
      saveProductivity(Math.floor(elapsed / 60000));

      setRunning(false);
      setOnBreak(true);
      setBreakTime(0);
    }
  }, [elapsed, running]);

  // FORCE STUDY AFTER 60 MIN BREAK
  useEffect(() => {
    const mins = breakTime / 60000;
    if (onBreak && mins >= 60) {
      setMessage("I'm forcing you back to work now");
      saveRest(Math.floor(breakTime / 60000));

      setOnBreak(false);
      setRunning(true);
    }
  }, [breakTime, onBreak]);

  // ----------------------------------------
  // BUTTON RULES
  // ----------------------------------------
  const studiedMinutes = elapsed / 60000;
  const restedMinutes = breakTime / 60000;

  const canTakeBreak = studiedMinutes >= 20;
  const canResume = restedMinutes >= 10;
  const canReset = studiedMinutes >= 10;

  // ----------------------------------------
  // CONTROLS
  // ----------------------------------------
  const startStudying = () => {
    if (onBreak && !canResume) return;

    if (onBreak) {
      saveRest(Math.floor(restedMinutes));
    }

    setOnBreak(false);
    setRunning(true);
  };

  const startBreak = () => {
    if (!canTakeBreak) return;

    saveProductivity(Math.floor(studiedMinutes));

    setRunning(false);
    setOnBreak(true);
    setBreakTime(0);
  };

  const reset = () => {
    if (!canReset) return;

    saveProductivity(Math.floor(studiedMinutes));
    saveRest(Math.floor(restedMinutes));

    setRunning(false);
    setOnBreak(false);
    setElapsed(0);
    setBreakTime(0);
    setMessage("");
  };

  // ----------------------------------------
  // UI
  // ----------------------------------------
  return (
    <div className="relative flex flex-col gap-8">
      <h1 className="text-4xl font-semibold text-white">Study</h1>
      <p className="text-luna-muted max-w-lg">Your stopwatch. Your suffering.</p>

      {message && (
        <div className="bg-luna-accent/80 text-white px-4 py-2 rounded-xl max-w-md mx-auto text-center shadow-lg">
          {message}
        </div>
      )}

      <div className="relative bg-luna-surface/80 backdrop-blur-xl
        rounded-2xl border border-luna-border p-10 w-full max-w-lg mx-auto">
        
        <div className="text-center mb-10">
          <span className="text-7xl font-mono text-white select-none">
            {format(elapsed)}
          </span>

          {onBreak && (
            <div className="mt-4 text-luna-muted text-sm">
              Break: {format(breakTime)}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={startStudying}
            disabled={running || (onBreak && !canResume)}
            className="py-2 rounded-md text-white
              bg-emerald-500 hover:bg-emerald-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Study
          </button>

          <button
            onClick={startBreak}
            disabled={!canTakeBreak}
            className="py-2 rounded-md
              bg-yellow-400 text-black hover:bg-yellow-300 disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed"
          >
            Break
          </button>

          <button
            onClick={reset}
            disabled={!canReset}
            className="py-2 rounded-md text-white
              bg-rose-500 hover:bg-rose-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            End
          </button>
        </div>
      </div>

      <button
        onClick={() => setOpenTasks(true)}
        className="fixed bottom-8 right-8 bg-luna-accent text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
      >
        ✓
      </button>

      {openTasks && (
        <div className="fixed bottom-20 right-8 bg-luna-surface/90 backdrop-blur-xl
          border border-luna-border w-64 p-4 rounded-xl shadow-xl">
          
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-semibold">Tasks</h3>
            <button
              onClick={() => setOpenTasks(false)}
              className="text-luna-muted hover:text-white"
            >
              ✕
            </button>
          </div>

          <ul className="space-y-2 text-white">
            {tasks.length === 0 && (
              <li className="text-luna-muted text-sm">No tasks yet.</li>
            )}

            {tasks.map((t) => (
              <li key={t.id} className="flex items-center gap-2 bg-luna-bg/50 p-2 rounded-md">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t.id)}
                  className="accent-luna-accent"
                />
                <span className={t.completed ? "line-through text-luna-muted" : ""}>
                  {t.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}