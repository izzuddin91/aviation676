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

      <section className={styles.mapSection} aria-label="Map and sample landmark">
        <InteractiveMap />
      </section>

      <section className={styles.locationSection} aria-labelledby="location-title">
        <h2 id="location-title">Country: Malaysia</h2>
        <div className={styles.tableWrap}>
          <table className={styles.locationTable}>
            <thead>
              <tr>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                <th scope="col">Photo link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3.1579</td>
                <td>101.7116</td>
                <td>
                  <a
                    href="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=85"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View landmark photo
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}