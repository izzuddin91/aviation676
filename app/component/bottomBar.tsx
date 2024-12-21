import React from "react";

type BottomBarProps = {
  onClick: () => void;
};

export default function BottomBar({ onClick }: BottomBarProps) {
  const styles = {
    bottomBar: {
      position: "fixed" as const,
      bottom: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#023020",
      color: "#fff",
      textAlign: "center" as const,
      padding: "10px 0",
      boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
    },
    contactButton: {
      backgroundColor: "#fff",
      color: "#023020",
      border: "none",
      borderRadius: "5px",
      padding: "10px 20px",
      fontSize: "1em",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.bottomBar}>
      <button style={styles.contactButton} onClick={onClick}>
        Contact Us
      </button>
    </div>
  );
}
