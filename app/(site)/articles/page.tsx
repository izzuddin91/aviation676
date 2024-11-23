"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLatestThreeArticle } from "../service/firebase.service";
import { LoadingIndicator } from "@/app/component/indicator/Loading";

type Article = {
  id: string;
  title: string;
  para1: string;
  youtubeVideoId?: string;
};

export default function Articles() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      const articlesData = await getLatestThreeArticle();
      setArticles(articlesData || []); // Default to an empty array if no data is returned
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleArticleClick(articleId: string) {
    router.push(`/articles/${articleId}`);
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-xl text-gray-500">No articles available.</p>
      </div>
    );
  }

  return (
    <div style={{borderTopWidth: '30px'}} className="grid lg:grid-cols-3 gap-6 p-6">
      {articles.map((article) => {
        // Construct YouTube thumbnail URL or use placeholder
        const youtubeThumbnail = article.youtubeVideoId
          ? `https://img.youtube.com/vi/${article.youtubeVideoId}/0.jpg`
          : `https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg`;

        return (
          <div
            key={article.id}
            className="bg-white border rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          >
            <div className="relative overflow-hidden rounded-t-xl">
              {/* YouTube Thumbnail */}
              <img
                src={youtubeThumbnail}
                alt={article.title || "YouTube Thumbnail"}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-2xl font-bold mb-2">{article.title || "Untitled Article"}</p>
              <p className="text-gray-600 mb-4">
                {article.para1 ? `${article.para1.substring(0, 200)}...` : "No content available."}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => handleArticleClick(article.id)}
                  className="bg-violet-600 text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-300"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
