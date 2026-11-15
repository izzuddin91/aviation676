"use client";

import dynamic from "next/dynamic";
import styles from "./vfr.module.css";

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading} aria-label="Loading map" />,
});

export default function VfrPage() {
  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Visual flight reference</p>
        <h1>VFR Landmark Map</h1>
      </header>

      <section className={styles.mapSection} aria-label="VFR landmark map">
        <InteractiveMap />
      </section>
    </main>
  );
}