"use client";

import { useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import { Minus, Play, Plus, X } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { getAllVfrLocations, type VfrLocation } from "../service/firebase.service";
import styles from "./vfr.module.css";

const landmarkIcon = L.divIcon({
  className: "vfr-landmark-pin",
  html: '<span class="vfr-landmark-pin__shape"><span></span></span>',
  iconSize: [36, 44],
  iconAnchor: [18, 44],
});

export default function InteractiveMap() {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapFrameRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<VfrLocation | null>(null);
  const [playingLocation, setPlayingLocation] = useState<VfrLocation | null>(null);
  const [locations, setLocations] = useState<VfrLocation[]>([]);
  const [zoom, setZoom] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const selectedVideoId = selectedLocation
    ? getYouTubeVideoId(selectedLocation.youtubeLink)
    : null;
  const selectedThumbnail = selectedVideoId
    ? `https://img.youtube.com/vi/${selectedVideoId}/hqdefault.jpg`
    : null;

  const showLocationOnMap = (location: VfrLocation) => {
    setSelectedLocation(location);
    mapFrameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const playLocationFromTable = (location: VfrLocation) => {
    showLocationOnMap(location);
    setPlayingLocation(location);
    const map = mapRef.current;
    if (map) {
      map.flyTo(
        [location.latitude, location.longitude],
        Math.max(map.getZoom(), 12),
        { duration: 1.2 }
      );
    }
  };

  useEffect(() => {
    if (!playingLocation) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPlayingLocation(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [playingLocation]);

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
    let isActive = true;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(map);

    const updateZoom = () => setZoom(map.getZoom());
    map.on("zoomend", updateZoom);
    map.fitBounds([[-2, 99], [47, 150]], {
      padding: [36, 36],
      maxZoom: 4,
    });

    const loadLocations = async () => {
      try {
        const vfrLocations = await getAllVfrLocations();
        if (!isActive) return;

        setLocations(vfrLocations);
        vfrLocations.forEach((location) => {
          L.marker([location.latitude, location.longitude], {
            icon: landmarkIcon,
            title: location.title,
            alt: location.title,
          })
            .addTo(map)
            .on("click", () => setSelectedLocation(location));
        });
      } catch (error) {
        console.error("Error fetching VFR locations:", error);
        if (isActive) setLoadError("Unable to load VFR locations. Please try again later.");
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    void loadLocations();

    return () => {
      isActive = false;
      map.off("zoomend", updateZoom);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <div className={styles.mapFrame} ref={mapFrameRef}>
        <div className={styles.map} ref={mapElementRef} aria-label="Interactive map of VFR locations" />
        {!isLoading && !loadError && locations.length === 0 && (
          <p className={styles.mapStatus} role="status">No VFR locations found.</p>
        )}
        {isLoading && <p className={styles.mapStatus} role="status">Loading VFR locations...</p>}
        {loadError && <p className={styles.mapStatus} role="alert">{loadError}</p>}
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

        {selectedLocation && (
          <>
            <button
              className={styles.modalBackdrop}
              type="button"
              aria-label="Close location details"
              onClick={() => setSelectedLocation(null)}
            />
            <article
              className={`${styles.landmark} ${!selectedThumbnail ? styles.landmarkWithoutImage : ""}`}
              id="landmark-dialog"
              role="dialog"
              aria-modal={!playingLocation}
              aria-labelledby="landmark-title"
            >
              <button
                className={styles.closeButton}
                type="button"
                aria-label="Close location details"
                onClick={() => setSelectedLocation(null)}
              >
                <X size={20} aria-hidden="true" />
              </button>
              {selectedThumbnail && (
                <button
                  className={styles.videoThumbnail}
                  type="button"
                  aria-label={`Play video for ${selectedLocation.title}`}
                  onClick={() => setPlayingLocation(selectedLocation)}
                >
                  <img
                    className={styles.landmarkImage}
                    src={selectedThumbnail}
                    alt=""
                  />
                  <span className={styles.playButton} aria-hidden="true">
                    <Play size={22} fill="currentColor" />
                  </span>
                </button>
              )}
              <div className={styles.landmarkDetails}>
                <h2 id="landmark-title">{selectedLocation.title}</h2>
                <p>{selectedLocation.description}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open pin in Google Maps
                </a>
              </div>
            </article>
          </>
        )}

        {playingLocation && (
          <>
            <button
              className={styles.videoBackdrop}
              type="button"
              aria-label="Close video"
              onClick={() => setPlayingLocation(null)}
            />
            <div
              className={styles.videoDialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-dialog-title"
            >
              <h2 className={styles.visuallyHidden} id="video-dialog-title">
                {playingLocation.title} video
              </h2>
              <button
                className={styles.videoCloseButton}
                type="button"
                aria-label="Close video"
                onClick={() => setPlayingLocation(null)}
              >
                <X size={20} aria-hidden="true" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(playingLocation.youtubeLink)}?autoplay=1&playsinline=1`}
                title={playingLocation.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </>
        )}
      </div>

      <section className={styles.locationSection} aria-labelledby="vfr-locations-title">
        <h2 id="vfr-locations-title">VFR Locations</h2>
        <div className={styles.locationTableWrap}>
          <table className={styles.locationTable}>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">YouTube</th>
                <th scope="col">Google Maps</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td>{location.title}</td>
                  <td>{location.description}</td>
                  <td>
                    <button
                      className={styles.tableAction}
                      type="button"
                      onClick={() => playLocationFromTable(location)}
                    >
                      Watch video
                    </button>
                  </td>
                  <td>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View location
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function getYouTubeVideoId(youtubeLink: string): string | null {
  try {
    const url = new URL(youtubeLink);
    const host = url.hostname.replace(/^www\./, "");
    let videoId: string | null = null;

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      videoId =
        url.searchParams.get("v") ??
        url.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1] ??
        null;
    }

    return videoId && /^[\w-]{11}$/.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
}