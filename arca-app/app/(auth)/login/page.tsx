"use client";

import { useRouter } from "next/navigation";
import React from "react";
import styles from "./login.module.css";

const LoginPage = () => {
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push("/review");
  }

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginCard} onSubmit={handleLogin}>
        <h2>Log In</h2>

        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default LoginPage;
