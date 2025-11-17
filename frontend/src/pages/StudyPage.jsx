//StudyPage.jsx

import React, { useState, useEffect, useRef } from "react";
import { useTasks } from "../context/TasksContext.jsx";
import { productivityFeature, restFeature } from "../ml/productivity.js";

export default function StudyPage() {
  const [elapsed, setElapsed] = useState(0);         // ms
  const [running, setRunning] = useState(false);

  const [breakTime, setBreakTime] = useState(0);     // ms
  const [onBreak, setOnBreak] = useState(false);

  const [message, setMessage] = useState("");

  const [openTasks, setOpenTasks] = useState(false);
  const { tasks, toggleTask } = useTasks();

  const intervalRef = useRef(null);
  const breakRef = useRef(null);

  // Format: MM:SS.ms
  const format = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    const milli = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(
      milli
    ).padStart(2, "0")}`;
  };

  // WORK TIMER
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 10);

        const min = Math.floor((elapsed + 10) / 60000);
        const line = productivityFeature(min);
        if (line) setMessage(line);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [running, elapsed]);

  // BREAK TIMER
  useEffect(() => {
    if (onBreak) {
      breakRef.current = setInterval(() => {
        setBreakTime((prev) => prev + 10);

        const min = Math.floor((breakTime + 10) / 60000);
        const line = restFeature(min);
        if (line) setMessage(line);
      }, 10);
    }

    return () => clearInterval(breakRef.current);
  }, [onBreak, breakTime]);

  useEffect(() => {
    const mins = elapsed / 60000;
    if (running && mins >= 120) {
      setMessage("I'm putting you on break timeout");
      setRunning(false);
      setOnBreak(true);
      setBreakTime(0);
    }
  }, [elapsed, running]);

  useEffect(() => {
    const mins = breakTime / 60000;
    if (onBreak && mins >= 60) {
      setMessage("I'm forcing you back to work now");
      setOnBreak(false);
      setRunning(true);
    }
  }, [breakTime, onBreak]);

  // BUTTON RULES:
  const studiedMinutes = elapsed / 60000;
  const restedMinutes = breakTime / 60000;

  const canTakeBreak = studiedMinutes >= 20;
  const canResumeStudy = restedMinutes >= 10;
  const canResetSession = studiedMinutes >= 10;

  // CONTROLS
  const startStudying = () => {
    if (onBreak && !canResumeStudy) return;
    setOnBreak(false);
    setRunning(true);
  };

  const startBreak = () => {
    if (!canTakeBreak) return;
    setRunning(false);
    setOnBreak(true);
    setBreakTime(0);
  };

  const reset = () => {
    if (!canResetSession) return;
    setRunning(false);
    setOnBreak(false);
    setElapsed(0);
    setBreakTime(0);
    setMessage("");
  };

  
  return (
    <div className="relative flex flex-col gap-8">

      {/* GLOWS */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full absolute -top-32 left-32" />
        <div className="w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full absolute bottom-10 right-40" />
      </div>

      <h1 className="text-4xl font-semibold text-white">Study</h1>
      <p className="text-luna-muted max-w-lg">Your stopwatch. Your suffering.</p>

      {/* Sass Message */}
      {message && (
        <div className="bg-luna-accent/80 text-white px-4 py-2 rounded-xl max-w-md mx-auto text-center shadow-lg">
          {message}
        </div>
      )}

      {/* MAIN CARD */}
      <div
        className="
      relative bg-luna-surface/80 backdrop-blur-xl
      rounded-2xl border border-luna-border
      p-10 w-full max-w-lg mx-auto
      shadow-[0_0_50px_-12px_rgba(120,80,255,0.35)]
    "
      >
        {/* TIMER DISPLAY */}
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

        {/* CONTROLS */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={startStudying}
            disabled={running || (onBreak && !canResumeStudy)}
            className={`py-2 rounded-md text-white transition 
              ${
                onBreak && !canResumeStudy
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40"
              }`}
          >
            Study
          </button>

          <button
            onClick={startBreak}
            disabled={!canTakeBreak}
            className={`py-2 rounded-md transition 
              ${
                !canTakeBreak
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-300"
              }`}
          >
            Break
          </button>

          <button
            onClick={reset}
            disabled={!canResetSession}
            className={`py-2 rounded-md text-white transition 
              ${
                !canResetSession
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-rose-500 hover:bg-rose-400"
              }`}
          >
            End
          </button>
        </div>
      </div>

      {/* TASKS BUTTON */}
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

      {/* TASKS POPUP */}
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

            {tasks.map((task) => (
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
                    task.completed ? "line-through text-luna-muted" : ""
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
