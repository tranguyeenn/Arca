"use client";

import { useState } from "react";

export default function PreferencesPage() {
  const [pace, setPace] = useState<"chill" | "standard" | "aggressive">(
    "standard"
  );
  const [dailyLimit, setDailyLimit] = useState(50);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">
          Preferences
        </h1>
        <p className="mt-1 text-slate-400">
          Control how Arca schedules and delivers reviews.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {/* Review Pace */}
        <section className="rounded-2xl border border-slate-800/70 bg-[#0b0f14]/80 p-6">
          <h2 className="text-sm font-semibold text-slate-200">
            Review Pace
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            How aggressively Arca schedules upcoming reviews.
          </p>

          <div className="mt-4 flex gap-3">
            <PaceButton
              label="Chill"
              active={pace === "chill"}
              onClick={() => setPace("chill")}
              desc="Fewer reviews, slower ramp"
            />
            <PaceButton
              label="Standard"
              active={pace === "standard"}
              onClick={() => setPace("standard")}
              desc="Balanced and steady"
            />
            <PaceButton
              label="Aggressive"
              active={pace === "aggressive"}
              onClick={() => setPace("aggressive")}
              desc="Maximize retention fast"
            />
          </div>
        </section>

        {/* Daily Limit */}
        <section className="rounded-2xl border border-slate-800/70 bg-[#0b0f14]/80 p-6">
          <h2 className="text-sm font-semibold text-slate-200">
            Daily Review Limit
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Maximum number of reviews per day.
          </p>

          <div className="mt-4 max-w-sm">
            <input
              type="number"
              min={10}
              max={300}
              value={dailyLimit}
              onChange={(e) => setDailyLimit(Number(e.target.value))}
              className="w-full rounded-xl bg-[#020617] border border-slate-800/70 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
            <div className="mt-1 text-xs text-slate-400">
              Current limit: {dailyLimit} reviews
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-2xl border border-slate-800/70 bg-[#0b0f14]/80 p-6">
          <h2 className="text-sm font-semibold text-slate-200">
            Notifications
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Get reminders when reviews are due.
          </p>

          <div className="mt-4 flex items-center justify-between max-w-sm">
            <span className="text-sm text-slate-300">
              Enable notifications
            </span>
            <button
              onClick={() => setNotifications((v) => !v)}
              className={`w-11 h-6 rounded-full transition ${
                notifications
                  ? "bg-indigo-500"
                  : "bg-slate-700"
              }`}
            >
              <div
                className={`h-5 w-5 bg-white rounded-full shadow transform transition ${
                  notifications ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function PaceButton({
  label,
  desc,
  active,
  onClick,
}: {
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl border px-4 py-3 text-left transition ${
        active
          ? "border-indigo-500 bg-indigo-500/10"
          : "border-slate-800/70 hover:bg-slate-400/10"
      }`}
    >
      <div className="text-sm font-medium text-slate-100">
        {label}
      </div>
      <div className="text-xs text-slate-400">{desc}</div>
    </button>
  );
}
