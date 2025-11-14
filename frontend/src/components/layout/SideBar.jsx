import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", to: "/" },
  { name: "Study", to: "/study" },
  { name: "Tasks", to: "/tasks" },
  { name: "Calendar", to: "/calendar" },
  { name: "Journal", to: "/journal" },
  { name: "Settings", to: "/settings" },
  { name: "Updates", to: "/updates" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-luna-surface border-r border-luna-border flex flex-col p-4">
      <h1 className="text-xl font-mono tracking-wide mb-8 text-luna-accent">LUNA</h1>

      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm ${
                isActive ? "bg-luna-border text-white" : "text-luna-muted hover:bg-luna-border"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
