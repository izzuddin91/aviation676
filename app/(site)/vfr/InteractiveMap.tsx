"use client";

import { useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import { Minus, Plus, X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import styles from "./vfr.module.css";

const landmark = {
  country: "Malaysia",
  name: "Petronas Twin Towers",
  latitude: 3.1579,
  longitude: 101.7116,
  photoUrl:
    "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=85",
  description:
    "A sample VFR landmark pin for Kuala Lumpur, with the Petronas Twin Towers as a visual reference point.",
};

const landmarkIcon = L.divIcon({
  className: "vfr-landmark-pin",
  html: '<span class="vfr-landmark-pin__shape"><span></span></span>',
  iconSize: [36, 44],
  iconAnchor: [18, 44],
});

export default function InteractiveMap() {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isLandmarkOpen, setIsLandmarkOpen] = useState(false);
  const [zoom, setZoom] = useState(4);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${landmark.latitude},${landmark.longitude}`;

  useEffect(() => {
    const container = mapElementRef.current;
    if (!container) return;

    const map = L.map(container, {
      center: [20, 120],
      zoom: 4,
      minZoom: 2,
      maxZoom: 18,
      scrollWheelZoom: true,
      zoomControl: false,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(map);

    const marker = L.marker([landmark.latitude, landmark.longitude], {
      icon: landmarkIcon,
      title: landmark.name,
      alt: landmark.name,
    }).addTo(map);
    const openLandmark = () => setIsLandmarkOpen((isOpen) => !isOpen);
    const updateZoom = () => setZoom(map.getZoom());
    marker.on("click", openLandmark);
    map.on("zoomend", updateZoom);

    return () => {
      marker.off("click", openLandmark);
      map.off("zoomend", updateZoom);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className={styles.mapFrame}>
      <div className={styles.map} ref={mapElementRef} aria-label="Interactive map of Asia" />
      <div className={styles.mapControls} aria-label="Map zoom controls">
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => mapRef.current?.zoomOut()}
          disabled={zoom <= 2}
        >
          <Minus size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => mapRef.current?.zoomIn()}
          disabled={zoom >= 18}
        >
          <Plus size={20} aria-hidden="true" />
        </button>
      </div>

      {isLandmarkOpen && (
        <>
          <button
            className={styles.modalBackdrop}
            type="button"
            aria-label="Close landmark details"
            onClick={() => setIsLandmarkOpen(false)}
          />
          <article
            className={styles.landmark}
            id="landmark-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="landmark-title"
          >
            <button
              className={styles.closeButton}
              type="button"
              aria-label="Close landmark details"
              onClick={() => setIsLandmarkOpen(false)}
            >
              <X size={20} aria-hidden="true" />
            </button>
            <img
              className={styles.landmarkImage}
              src={landmark.photoUrl}
              alt="Sample view of Kuala Lumpur, Malaysia"
            />
            <div className={styles.landmarkDetails}>
              <span className={styles.countryTag}>{landmark.country}</span>
              <h2 id="landmark-title">{landmark.name}</h2>
              <p>{landmark.description}</p>
              <a href={directionsUrl} target="_blank" rel="noreferrer">
                Open pin in Google Maps
              </a>
            </div>
          </article>
        </>
      )}
    </div>
  );
}