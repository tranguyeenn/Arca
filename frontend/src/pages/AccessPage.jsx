import React, { useState, useEffect } from "react";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function AccessPage() {
  const navigate = useNavigate();

  // you keep your raw key in .env
  const RAW_ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unlocked = localStorage.getItem("luna_access");
    if (unlocked === "true") navigate("/");
  }, [navigate]);

  // hash helper
  async function hashString(str) {
    const enc = new TextEncoder().encode(str);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return [...new Uint8Array(buf)]
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async function handleAccess(e) {
    e.preventDefault();
    setError("");

    // hash both
    const hashedUser = await hashString(code);
    const hashedKey = await hashString(RAW_ACCESS_KEY);

    if (hashedUser === hashedKey) {
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
            onChange={(e) => setCode(e.target.value)}
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
