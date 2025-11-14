import React from "react";

export default function UpdatePage() {
  const updates = [
    {
      title: "Home Page fixed",
      date: "Nov 14, 2025",
      notes: [
        "Real-time location added",
        "Weather feature",
        "Device usage tracking",
        "Intention of the day"
      ]
    },
    {
      title: "Study timer added",
      date: "Nov 12, 2025",
      notes: [
        "Added basic study timer",
        "Clean UI, integrates with DesktopShell",
        "No XP, no pets, no mood system",
      ],
    },
    {
      title: "Dashboard layout improvements",
      date: "Nov 10, 2025",
      notes: [
        "Sidebar spacing fixed",
        "Topbar shadow improved",
        "General UI polish",
      ],
    },
    {
      title: "Initial Luna setup",
      date: "Nov 1, 2025",
      notes: [
        "Project created",
        "Router initialized",
        "Base pages added",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Updates</h1>
      <p className="text-luna-muted">
        Recent changes and improvements to Luna.
      </p>

      <div className="flex flex-col gap-4">
        {updates.map((item, index) => (
          <div
            key={index}
            className="bg-luna-surface border border-luna-border rounded-xl p-5"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <span className="text-xs text-luna-muted">{item.date}</span>
            </div>

            <ul className="list-disc pl-5 text-sm text-luna-muted">
              {item.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
