import React from "react"
import Link from "next/link"
import styles from "./landing.module.css"

const page = () => {
  return (
    <div className={styles.landing}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span className={styles.brand}>Arca</span>

          <nav className={styles.topbarNav}>
            <Link href="/login" className={styles.cta}>
              Log In
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.landingMain}>
        <h1 className={styles.landingTitle}>Arca</h1>
        <p className={styles.landingSubtitle}>
          Your personal AI assistant
        </p>

        <Link href="/login" className={styles.primaryBtn}>
          Get Started
        </Link>
      </main>
    </div>
  )
}

export default page

