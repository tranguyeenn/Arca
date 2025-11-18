import React, { useState, useEffect } from "react";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function AccessPage() {
  const navigate = useNavigate();

  // Grab from .env
  const ACCESS_KEY = "buildordie";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // If already unlocked, skip page
  useEffect(() => {
    const unlocked = localStorage.getItem("luna_access");
    if (unlocked === "true") navigate("/");
  }, [navigate]);

  function handleAccess(e) {
    e.preventDefault();
    setError("");

    if (code === ACCESS_KEY) {
      localStorage.setItem("luna_access", "true");
      navigate("/");
    } else {
      setError("Wrong access code.");
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-luna-bg">
      <form
        onSubmit={handleAccess}
        className="bg-luna-surface p-8 rounded-xl border border-luna-border shadow-soft w-80"
      >
        <h1 className="text-2xl mb-6 font-semibold">Access</h1>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Enter access code"
            value={code}
            onChange={e => setCode(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button className="w-full" type="submit">
            Enter
          </Button>
        </div>
      </form>
    </div>
  );
}
