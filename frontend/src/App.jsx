import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { TasksProvider } from "./context/TasksContext.jsx";

import DesktopShell from "./components/layout/DesktopShell.jsx";

// Pages
import HomePage from "./pages/HomePage.jsx";
import AccessPage from "./pages/AccessPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import StudyPage from "./pages/StudyPage.jsx";

const router = createBrowserRouter(
  [
    // Public
    { path: "/", element: <HomePage /> },
    { path: "/access", element: <AccessPage /> },
    {
      path: "/tasks",
      element: (
        <DesktopShell>
          <TasksPage />
        </DesktopShell>
      ),
    },
    {
      path: "/settings",
      element: (
        <DesktopShell>
          <SettingsPage />
        </DesktopShell>
      ),
    },
    {
      path: "/study",
      element: (
        <DesktopShell>
          <StudyPage />
        </DesktopShell>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default function App() {
  return (
    <ThemeProvider>
      <TasksProvider>
        <RouterProvider router={router} />
      </TasksProvider>
    </ThemeProvider>
  );
}
