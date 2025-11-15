// src/pages/StudyPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTasks } from "../context/TasksContext.jsx";

export default function StudyPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  const [openTasks, setOpenTasks] = useState(false);

  const { tasks, toggleTask } = useTasks();

  const intervalRef = useRef(null);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => prev - 1);
      }, 1000);
    }

    if (remaining === 0) {
      clearInterval(intervalRef.current);
      setRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [running, remaining]);

  const applyTime = () => {
    const total = minutes * 60 + seconds;
    if (total > 0) setRemaining(total);
  };

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRemaining(minutes * 60 + seconds);
  };

  const totalTime = minutes * 60 + seconds;
  const progress = totalTime > 0 ? (1 - remaining / totalTime) * 100 : 0;

  return (
    <div className="relative flex flex-col gap-8">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full absolute -top-32 left-32" />
        <div className="w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full absolute bottom-10 right-40" />
      </div>

      <h1 className="text-4xl font-semibold text-white">Study</h1>
      <p className="text-luna-muted max-w-lg">
        Focus mode. Your timer and tasks in one place.
      </p>

      {/* MAIN CARD */}
      <div
        className="
        relative bg-luna-surface/80 backdrop-blur-xl
        rounded-2xl border border-luna-border
        p-10 w-full max-w-lg mx-auto
        shadow-[0_0_50px_-12px_rgba(120,80,255,0.35)]
      "
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-luna-border/30 overflow-hidden rounded-t-2xl">
          <div
            className="h-full bg-luna-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time Inputs */}
        <div className="flex items-end gap-6 mb-10">
          <div className="flex flex-col flex-1">
            <label className="text-sm text-luna-muted mb-1">Minutes</label>
            <input
              type="number"
              min="0"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
              className="bg-luna-bg/70 border border-luna-border focus:border-luna-accent text-white rounded-md px-3 py-2 text-center transition"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-sm text-luna-muted mb-1">Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
              className="bg-luna-bg/70 border border-luna-border focus:border-luna-accent text-white rounded-md px-3 py-2 text-center transition"
            />
          </div>

          <button
            onClick={applyTime}
            className="px-5 py-2 bg-luna-accent text-white rounded-lg font-medium hover:opacity-90 active:scale-95 transition"
          >
            Set
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-10">
          <span className="text-7xl font-mono text-white select-none">
            {formatTime(remaining)}
          </span>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={start}
            disabled={running}
            className="bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-400 disabled:opacity-40 transition"
          >
            Start
          </button>

          <button
            onClick={pause}
            disabled={!running}
            className="bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-300 disabled:opacity-40 transition"
          >
            Pause
          </button>

          <button
            onClick={reset}
            className="bg-rose-500 text-white py-2 rounded-md hover:bg-rose-400 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Floating Task Button */}
      <button
        onClick={() => setOpenTasks(true)}
        className="
          fixed bottom-8 right-8
          bg-luna-accent text-white
          p-4 rounded-full shadow-lg
          hover:scale-110 transition
        "
      >
        ✓
      </button>

      {/* Popup */}
      {openTasks && (
        <div
          className="
          fixed bottom-20 right-8
          bg-luna-surface/90 backdrop-blur-xl
          border border-luna-border
          w-64 p-4 rounded-xl shadow-xl
        "
        >
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

            {tasks.map(task => (
              <li
                key={task.id}
                className="flex items-center gap-2 bg-luna-bg/50 p-2 rounded-md"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="accent-luna-accent"
                />

                <span
                  className={
                    task.completed
                      ? "line-through text-luna-muted"
                      : ""
                  }
                >
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
