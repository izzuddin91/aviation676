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
      background: "linear-gradient(90deg, #0f2027, #2c5364, #00b09b)",
      color: "#fff",
      textAlign: "center" as const,
      padding: "10px 0",
      boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
    },
    contactButton: {
      backgroundColor: "#fff",
      color: "#0f2027",
      border: "none",
      borderRadius: "25px",
      padding: "10px 25px",
      fontSize: "1em",
      fontWeight: "bold" as const,
      cursor: "pointer",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={styles.bottomBar}>
      <button
        style={styles.contactButton}
        onClick={onClick}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "#f0f0f0")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "#fff")
        }
      >
        Make an appointment
      </button>
    </div>
  );
}
