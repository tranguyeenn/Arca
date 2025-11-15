// src/components/layout/DesktopShell.jsx
import React from "react";
import Sidebar from "./SideBar.jsx";
import Topbar from "./TopBar.jsx";

export default function DesktopShell({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-luna-bg">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
