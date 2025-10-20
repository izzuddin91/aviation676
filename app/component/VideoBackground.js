"use client";

import React, { useEffect, useState } from "react";
import "@/app/VideoBackground.css";

export default function ImageCarouselBackground() {
  const images = [
    "/images/plane1.jpg",
    "/images/plane2.jpg",
    "/images/plane3.jpg",
    "/images/plane4.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={styles.wrapper}>
      {/* ✅ Background Carousel */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`slide-${index}`}
          style={{
            ...styles.image,
            opacity: current === index ? 1 : 0,
            transition: "opacity 1.0s ease-in-out",
          }}
        />
      ))}

      {/* ✅ Overlay Content */}
      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome to Aviation 676</h1>
      </div>

      {/* ✅ Floating WhatsApp Button */}
      <a
        href="https://wa.me/+60132711668?text=I would like to know more about I.Z. Properties"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsappButton}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={styles.whatsappIcon}
        />
      </a>
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    height: "calc(100vh - 120px)", // ✅ adjust this height
    /* 120px = estimated total height of navbar + bottom bar */
    marginTop: "60px", // ✅ space for navbar (adjust to match your layout)
    marginBottom: "60px", // ✅ space for bottom bar
    overflow: "hidden",
    backgroundColor: "black",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  overlay: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
  },
  title: {
    color: "white",
    fontSize: "40px",
    fontWeight: "600",
  },
  whatsappButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 2,
  },
  whatsappIcon: {
    width: "60px",
    height: "60px",
  },
};
