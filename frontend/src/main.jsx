// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID_LOCAL = import.meta.env.VITE_GOOGLE_CLIENT_ID_LOCAL;
const CLIENT_ID_PROD = import.meta.env.VITE_GOOGLE_CLIENT_ID_VERCEL;

const CLIENT_ID =
  window.location.hostname === "localhost"
    ? CLIENT_ID_LOCAL
    : CLIENT_ID_PROD;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
