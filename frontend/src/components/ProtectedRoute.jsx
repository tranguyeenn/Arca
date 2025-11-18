import { Navigate } from "react-router-dom";
import React from "react";

export default function ProtectedRoute({ children }) {
  const unlocked = localStorage.getItem("luna_access") === "true";

  if (!unlocked) {
    return <Navigate to="/access" replace />;
  }

  return children;
}
