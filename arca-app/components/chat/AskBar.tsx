import React from "react";

const AskBar = () => {
  return (
    <div className="mt-auto py-3.5 px-[18px] rounded-full bg-slate-900/85 border border-slate-400/18 flex gap-3 items-center">
      <input 
        className="flex-1 bg-transparent border-none text-gray-200 text-sm placeholder:text-gray-400 focus:outline-none" 
        placeholder="Ask Arca AI..." 
      />
      <button className="w-10 h-10 rounded-full bg-indigo-500 border-none text-white text-xs font-bold cursor-pointer">
        Send
      </button>
    </div>
  );
};

export default AskBar;
