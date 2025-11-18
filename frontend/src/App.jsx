import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext.jsx";
import { TasksProvider } from "./context/TasksContext.jsx";

import DesktopShell from "./components/layout/DesktopShell.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import HomePage from "./pages/HomePage.jsx";
import AccessPage from "./pages/AccessPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import StudyPage from "./pages/StudyPage.jsx";

const router = createBrowserRouter(
  [
    // Public
    { path: "/access", element: <AccessPage /> },

    // Protected dashboard routes
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DesktopShell>
            <HomePage />
          </DesktopShell>
        </ProtectedRoute>
      ),
    },
    {
      path: "/tasks",
      element: (
        <ProtectedRoute>
          <DesktopShell>
            <TasksPage />
          </DesktopShell>
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <DesktopShell>
            <SettingsPage />
          </DesktopShell>
        </ProtectedRoute>
      ),
    },
    {
      path: "/study",
      element: (
        <ProtectedRoute>
          <DesktopShell>
            <StudyPage />
          </DesktopShell>
        </ProtectedRoute>
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
