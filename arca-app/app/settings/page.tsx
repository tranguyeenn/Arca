"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [shortcuts, setShortcuts] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">
          Settings
        </h1>
        <p className="mt-1 text-slate-400">
          App behavior and account controls.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {/* Appearance */}
        <section className="rounded-2xl border border-slate-800/70 bg-[#0b0f14]/80 p-6">
          <h2 className="text-sm font-semibold text-slate-200">
            Appearance
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Visual preferences for Arca.
          </p>

          <div className="mt-4 flex items-center justify-between max-w-sm">
            <span className="text-sm text-slate-300">Theme</span>
            <span className="text-sm text-slate-400">Dark (locked)</span>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="rounded-2xl border border-slate-800/70 bg-[#0b0f14]/80 p-6">
          <h2 className="text-sm font-semibold text-slate-200">
            Keyboard Shortcuts
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Speed up navigation and reviews.
          </p>

          <div className="mt-4 flex items-center justify-between max-w-sm">
            <span className="text-sm text-slate-300">
              Enable shortcuts
            </span>
            <Toggle
              enabled={shortcuts}
              onToggle={() => setShortcuts((v) => !v)}
            />
          </div>
        </section>

        {/* Data */}
        <section className="rounded-2xl border border-slate-800/70 bg-[#0b0f14]/80 p-6">
          <h2 className="text-sm font-semibold text-slate-200">
            Data
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Export your review history.
          </p>

          <div className="mt-4">
            <button className="rounded-xl border border-slate-700/70 px-4 py-2 text-sm text-slate-200 hover:bg-slate-400/10 transition">
              Export data
            </button>
          </div>
        </section>

        {/* Danger zone */}
        <section className="rounded-2xl border border-red-900/40 bg-[#0b0f14]/80 p-6">
          <h2 className="text-sm font-semibold text-red-400">
            Danger Zone
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Irreversible actions.
          </p>

          <div className="mt-4 flex gap-3">
            <button className="rounded-xl border border-slate-700/70 px-4 py-2 text-sm text-slate-200 hover:bg-slate-400/10 transition">
              Sign out
            </button>

            <button
              disabled
              className="rounded-xl border border-red-900/60 px-4 py-2 text-sm text-red-400 opacity-50 cursor-not-allowed"
            >
              Delete account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition ${
        enabled ? "bg-indigo-500" : "bg-slate-700"
      }`}
    >
      <div
        className={`h-5 w-5 bg-white rounded-full shadow transform transition ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
