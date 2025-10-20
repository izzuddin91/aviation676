"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getArticleDetails, updateArticle } from "@/app/(site)/service/firebase.service";

export default function AdminArticleEditPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params?.articleId as string;

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Load article data from Firestore
  useEffect(() => {
// eslint-disable-next-line react-hooks/rules-of-hooks
console.log("Params:", params);
    if (!articleId) return;
    const fetchArticle = async () => {
      try {
        console.log(articleId)
        const article = await getArticleDetails(articleId);
        if (article) {
          setFormData({
            mainImageLink: article.mainImageLink || "",
            para1: article.para1 || "",
            para2: article.para2 || "",
            para3: article.para3 || "",
            secondImageLink: article.secondImageLink || "",
            tags: article.tags || "",
            title: article.title || "",
            youtubeLink: article.youtubeLink || "",
          });
        }
      } catch (error) {
        console.error("Error loading article:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!articleId) return;
    try {
      setSaving(true);
      await updateArticle(articleId, formData);
      alert("✅ Article updated successfully!");
      router.push("/admin/articles"); // redirect back to list
    } catch (error) {
      console.error("Error updating article:", error);
      alert("❌ Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Loading article...</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Edit Article</h1>

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

        <button
          onClick={handleSave}
          style={{
            ...styles.button,
            opacity: saving ? 0.7 : 1,
            cursor: saving ? "not-allowed" : "pointer",
          }}
          disabled={saving}
        >
          {saving ? "💾 Saving..." : "💾 Save Changes"}
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
