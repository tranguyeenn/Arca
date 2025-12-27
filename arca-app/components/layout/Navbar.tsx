import React from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <span className={styles.pageTitle}>Dashboard</span>
      </div>

      <div className={styles.navbarRight}>
        <span className={styles.userPill}>T</span>
      </div>
    </header>
  );
};

export default Navbar;

