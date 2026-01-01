"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState("User");
  const email = "you@example.com";

  const initial = displayName.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">Profile</h1>
        <p className="mt-1 text-slate-400">
          Manage your account and review scheduling.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {/* Account */}
        <section className="rounded-2xl border border-slate-800/70 bg-[#0b0f14]/80 p-6">
          <h2 className="text-sm font-semibold text-slate-200">Account</h2>

          <div className="mt-4 flex items-center gap-4">
            {/* Avatar */}
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-lg font-semibold text-white">
              {initial}
            </div>

            <div>
              <div className="text-slate-100 font-medium">{displayName}</div>
              <div className="text-sm text-slate-400">{email}</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Display name */}
            <Field
              label="Display name"
              value={displayName}
              onChange={setDisplayName}
            />

            {/* Email */}
            <Field label="Email" value={email} disabled />
          </div>
        </section>

        {/* Time Zone */}
        <section className="rounded-2xl border border-slate-800/70 bg-[#0b0f14]/80 p-6">
          <h2 className="text-sm font-semibold text-slate-200">Time Zone</h2>
          <p className="mt-1 text-sm text-slate-400">
            Used to schedule reviews at the right time of day.
          </p>

          <div className="mt-4 max-w-sm">
            <select
              className="w-full rounded-xl bg-[#020617] border border-slate-800/70 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              defaultValue="America/New_York"
            >
              <option>America/New_York</option>
              <option>America/Chicago</option>
              <option>America/Denver</option>
              <option>America/Los_Angeles</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1">{label}</label>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full rounded-xl px-3 py-2 text-sm border ${
          disabled
            ? "bg-[#020617] border-slate-800/50 text-slate-500"
            : "bg-[#020617] border-slate-800/70 text-slate-100"
        } focus:outline-none focus:ring-2 focus:ring-indigo-500/40`}
      />
    </div>
  );
}
