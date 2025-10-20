"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllArticles } from "../../service/firebase.service";

interface Article {
  id: string;
  title: string;
  mainImageLink: string;
  tags: string;
}

export default function AdminArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load articles from Firebase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleView = (id: string) => {
    console.log(id)
    router.push(`/admin/articles/${id}`);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>📰 Manage Articles</h1>
        <p style={styles.noData}>Loading articles...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📰 Manage Articles</h1>

      {articles.length === 0 ? (
        <p style={styles.noData}>No articles found.</p>
      ) : (
        <div style={styles.grid}>
          {articles.map((article) => (
            <div
              key={article.id}
              style={styles.card}
              onClick={() => handleView(article.id)}
            >
              <img
                src={article.mainImageLink || "https://via.placeholder.com/600x300.png?text=No+Image"}
                alt={article.title}
                style={styles.image}
              />
              <div style={styles.info}>
                <h2 style={styles.title}>{article.title || "Untitled"}</h2>
                <p style={styles.tags}>{article.tags || "No tags"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "20px",
  },
  heading: {
    textAlign: "center" as const,
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover" as const,
  },
  info: {
    padding: "12px 16px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  tags: {
    fontSize: "14px",
    color: "#666",
  },
  noData: {
    textAlign: "center" as const,
    fontSize: "18px",
    color: "#555",
  },
};
