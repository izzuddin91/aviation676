"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLatestThreeArticle } from "../service/firebase.service";
import { LoadingIndicator } from "@/app/component/indicator/Loading";

export default function Articles() {
  const router = useRouter();
  const [articles, updateArticles]: any = useState([{}]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    getLatestThreeArticle().then((val) => {
      updateArticles(val);
    });
  }

  function articleDetails(articleId: string) {
    router.push("/articles/" + articleId);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 p-6">
      {articles ? (
        articles.map((article: any, i: any) => {
          // Placeholder YouTube thumbnail URL
          // const youtubeThumbnail = `https://img.youtube.com/vi/${article["youtubeVideoId"]}/0.jpg`;
          const youtubeThumbnail = `https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg`;

          return (
            <div
              key={i}
              className="bg-white border rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                {/* YouTube Thumbnail */}
                <img
                  src={youtubeThumbnail}
                  alt="YouTube Thumbnail"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-2xl font-bold mb-2">
                  {article["title"]}
                </p>
                <p className="text-gray-600 mb-4">
                  {`${article["para1"]}`.substring(0, 200) + "..."}
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => articleDetails(article["id"])}
                    className="bg-violet-600 text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}
