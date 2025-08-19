"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { getLatestThreeArticle } from "../service/firebase.service";
import { LoadingIndicator } from "@/app/component/indicator/Loading";

type Article = {
  id: string;
  title: string;
  para1: string;
  tiktok_url?: string; // TikTok URL
  thumbnail?: string; // Thumbnail URL (resolved dynamically)
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
      // const articlesData = await getLatestThreeArticle();

      // // Resolve TikTok thumbnails for each article
      // const articlesWithThumbnails = await Promise.all(
      //   (articlesData || []).map(async (article: Article) => {
      //     if (article.tiktok_url) {
      //       const thumbnail = await fetchTikTokThumbnail(article.tiktok_url);
      //       return { ...article, thumbnail };
      //     }
      //     return article;
      //   })
      // );

      // setArticles(articlesWithThumbnails);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTikTokThumbnail(url: string): Promise<string | undefined> {
    try {
      const response = await fetch(`https://www.tiktok.com/oembed?url=${url}`);
      const data = await response.json();
      return data.thumbnail_url; // TikTok thumbnail URL
    } catch (error) {
      console.error("Error fetching TikTok thumbnail:", error);
      return undefined;
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
<div
  className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,_150px)] gap-2 justify-center p-4"
>
  {articles.map((article) => (
    <div
      key={article.id}
      className="bg-white border rounded-lg shadow-md transform hover:scale-105 transition duration-300 flex flex-col items-center"
      style={{ width: "100%" }} // Allow full width for mobile view
    >
      <div className="relative overflow-hidden rounded-t-lg">
        {/* TikTok Thumbnail */}
        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            alt={article.title || "TikTok Thumbnail"}
            className="w-full sm:w-[150px] object-cover rounded-lg"
            style={{ aspectRatio: "9 / 16" }}
          />
        ) : (
          <div
            className="w-full sm:w-[150px] bg-gray-300 flex items-center justify-center text-gray-600"
            style={{ aspectRatio: "9 / 16" }}
          >
            No Thumbnail Available
          </div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col text-center">
        <p className="text-base font-bold mb-2">{article.title || "Untitled Article"}</p>
        <p className="text-sm text-gray-600 mb-4 flex-1">
          {article.para1 ? `${article.para1.substring(0, 100)}...` : "No content available."}
        </p>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => handleArticleClick(article.id)}
            className="bg-violet-600 text-white text-sm font-semibold py-1 px-2 rounded-lg hover:bg-violet-700 transition duration-300"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}
