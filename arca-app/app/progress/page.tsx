"use client";

export default function ProgressPage() {
  // Mock data for now (replace with real stats later)
  const stats = {
    streak: 7,
    totalReviews: 342,
    retention: 86,
    dueToday: 18,
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">
          Progress
        </h1>
        <p className="mt-1 text-slate-400">
          How your memory is holding up over time.
        </p>
      </div>

      {/* Stats grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Current streak"
          value={`${stats.streak} days`}
          sub="Consistency matters more than intensity"
        />
        <StatCard
          label="Total reviews"
          value={stats.totalReviews}
          sub="All-time reviews completed"
        />
        <StatCard
          label="Retention rate"
          value={`${stats.retention}%`}
          sub="Long-term recall accuracy"
        />
        <StatCard
          label="Due today"
          value={stats.dueToday}
          sub="Reviews waiting for you"
          highlight
        />
      </div>

      {/* Status */}
      <div className="mt-10 max-w-2xl rounded-2xl border border-slate-800/70 bg-[#0b0f14]/80 p-6">
        <h2 className="text-sm font-semibold text-slate-200">
          Status
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          You’re showing up consistently. Most forgetting is happening
          where Arca expects it to. Keep reviews short and regular.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: string | number;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        highlight
          ? "border-indigo-500/40 bg-indigo-500/10"
          : "border-slate-800/70 bg-[#0b0f14]/80"
      }`}
    >
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-100">
        {value}
      </div>
      <div className="mt-1 text-xs text-slate-400">{sub}</div>
    </div>
  );
}
