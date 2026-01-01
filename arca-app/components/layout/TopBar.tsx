"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        open &&
        !menuRef.current?.contains(target) &&
        !avatarRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="relative h-16 px-8 flex items-center justify-end z-50">
      {/* Avatar */}
      <button
        ref={avatarRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group rounded-full focus:outline-none"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-xs font-semibold text-white transition group-hover:ring-2 group-hover:ring-indigo-400/40 active:scale-95">
          U
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute top-16 right-8 w-72 rounded-2xl border border-slate-800/70 bg-[#0b0f14]/95 backdrop-blur-xl shadow-2xl shadow-black/50"
        >
          {/* User header */}
          <div className="flex gap-3 p-4 border-b border-slate-800/70">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-xs font-semibold text-white">
              U
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-100 truncate">
                User
              </div>
              <div className="text-xs text-slate-400 truncate">
                you@example.com
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="px-4 py-2 text-xs text-slate-300/80">
            Retention over cramming.
          </div>

          {/* Nav */}
          <div className="p-2">
            <MenuLink
              href="/profile"
              title="Profile"
              subtitle="Name, avatar, time zone"
              onClick={() => setOpen(false)}
            />
            <MenuLink
              href="/preferences"
              title="Preferences"
              subtitle="Pace, caps, notifications"
              onClick={() => setOpen(false)}
            />
            <MenuLink
              href="/progress"
              title="Progress"
              subtitle="Streak, retention, totals"
              onClick={() => setOpen(false)}
            />
            <MenuLink
              href="/settings"
              title="Settings"
              subtitle="Theme, shortcuts, export"
              onClick={() => setOpen(false)}
            />

            <div className="my-2 h-px bg-slate-800/70" />

            <button
              onClick={() => {
                setOpen(false);
                // TODO: supabase.auth.signOut()
              }}
              className="w-full rounded-xl px-3 py-2 text-left hover:bg-slate-400/10 transition"
            >
              <div className="text-sm font-medium text-slate-100">
                Sign out
              </div>
              <div className="text-xs text-slate-400">
                Log out of Arca
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuLink({
  href,
  title,
  subtitle,
  onClick,
}: {
  href: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-xl px-3 py-2 hover:bg-slate-400/10 transition"
    >
      <div className="text-sm font-medium text-slate-100">{title}</div>
      <div className="text-xs text-slate-400">{subtitle}</div>
    </Link>
  );
}
