"use client";

import { useEffect, useState } from "react";
import "firebase/compat/firestore";
import { getArticleDetails } from "../../service/firebase.service";
import { useParams } from "next/navigation";

export default function Article() {
  const params = useParams();
  const [isClient, setIsClient] = useState(false);
  const [article, updateArticle] = useState({
    title: "",
    para1: "",
    para2: "",
    para3: "",
    image1: "",
    image2: "",
    tiktok_url: "",
  });

  useEffect(() => {
    setIsClient(true); // Ensures rendering only happens on the client
    getData();
  }, []);

  async function getData() {
    getArticleDetails(params["articleId"].toString()).then((val: any) => {
      updateArticle(val);
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Article Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6 font-poppins">
          {article.title}
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 mb-6 font-roboto">
          {article.para1}
        </p>
      </div>

      {/* TikTok Embed Section */}
      {isClient && article.tiktok_url && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Watch on TikTok</h2>
          <div className="flex justify-center">
            <blockquote
              className="tiktok-embed"
              cite={article.tiktok_url}
              data-video-id={article.tiktok_url.split("/").pop()}
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                padding: "0",
              }}
            >
              <section></section>
            </blockquote>
            <script
              async
              src="https://www.tiktok.com/embed.js"
            ></script>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg leading-relaxed text-gray-700 mb-6 font-roboto">
          {article.para2}
        </p>
        <img
          src={article.image1}
          alt="Article Image 1"
          className="object-cover rounded-lg shadow-md mb-6"
          style={{ height: "400px", width: "100%" }}
        />
        <p className="text-lg leading-relaxed text-gray-700 mb-6 font-roboto">
          {article.para3}
        </p>
        <img
          src={article.image2}
          alt="Article Image 2"
          className="object-cover rounded-lg shadow-md"
          style={{ height: "400px", width: "100%" }}
        />
      </div>
    </div>
  );
}
