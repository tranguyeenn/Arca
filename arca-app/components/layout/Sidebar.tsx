import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-[260px] min-h-screen py-7 px-6 flex flex-col bg-[#020617] border-r border-slate-400/15">
      <div>
        <h2 className="text-[26px] font-bold -tracking-[0.5px] text-gray-50">Arca</h2>
        <p className="text-sm text-gray-400 mt-1">Hello, User!</p>
      </div>

      <button className="mt-5 px-3.5 py-2 rounded-full bg-indigo-500/12 border border-indigo-500/35 text-indigo-200 text-[13px] font-medium w-fit">
        Topic: Miscellaneous
      </button>

      <div className="mt-auto">
        <p className="text-xs text-gray-400 mb-2">Beta plan</p>
        <button className="w-full py-3 rounded-full bg-indigo-500 text-white font-semibold border-none cursor-pointer shadow-[0_8px_20px_rgba(99,102,241,0.35)] hover:brightness-105">
          Upload
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
