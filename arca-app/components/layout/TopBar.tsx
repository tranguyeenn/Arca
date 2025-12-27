import React from "react";

const TopBar = () => {
  return (
    <header className="h-16 px-8 flex items-center justify-end">
      <div className="flex items-center gap-3.5">
        <button
          className="w-9 h-9 rounded-full bg-slate-400/10 border-none cursor-pointer text-base text-gray-200"
          aria-label="Settings"
        >
          ⚙️
        </button>
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-400 to-indigo-500" />
      </div>
    </header>
  );
};

export default TopBar;
