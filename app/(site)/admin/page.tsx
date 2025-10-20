"use client";

import React, { useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    mainImageLink: "",
    para1: "",
    para2: "",
    para3: "",
    secondImageLink: "",
    tags: "",
    title: "",
    youtubeLink: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("✅ Saved data:", formData);
    alert("Data saved! (currently logs to console only)");
    // Later: integrate Firebase or API here
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Edit Video Post</h1>

      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={styles.field}>
            <label htmlFor={key} style={styles.label}>
              {key}
            </label>
            {key.toLowerCase().includes("para") ? (
              <textarea
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                rows={3}
                style={styles.textarea}
              />
            ) : (
              <input
                id={key}
                name={key}
                type="text"
                value={value}
                onChange={handleChange}
                style={styles.input}
              />
            )}
          </div>
        ))}

        <button onClick={handleSave} style={styles.button}>
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "20px",
    background: "#f9fafb",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center" as const,
    fontSize: "28px",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "18px",
  },
  field: {
    display: "flex",
    flexDirection: "column" as const,
  },
  label: {
    fontWeight: 600,
    marginBottom: "6px",
    color: "#333",
    textTransform: "capitalize" as const,
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    resize: "vertical" as const,
  },
  button: {
    backgroundColor: "#0369a1",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "16px",
  },
};
