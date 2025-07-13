"use client";

import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import "firebase/compat/firestore";
import { getArticleDetails } from "../../service/firebase.service";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Article() {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  // Sample content for demonstration
  const [article, updateArticle] = useState({
    title: "",
    para1: "",
    para2: "",
    para3: "",
    mainImageLink: "",
    secondImageLink: "",
    youtubeLink: "",
  });

  useEffect(() => {
    setIsClient(true);
    getData();
  }, []);

  async function getData() {
    getArticleDetails(params["articleId"].toString()).then((val: any) => {
      updateArticle(val);
    });
  }

  function getYouTubeVideoId(url: string): string {
    const regExp =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-10">
      <button
        onClick={goBack}
        className="text-blue-600 underline font-medium hover:text-blue-800"
      >
        ← Back
      </button>
      {/* Title */}
      <h1 className="text-4xl font-bold text-center font-poppins">
        {article.title}
      </h1>

      {/* Paragraph 1 with wrapped image (like a book layout) */}
      <div className="text-lg text-gray-700 leading-relaxed font-roboto">
        <p className="text-justify">
          <img
            src={article.mainImageLink}
            alt="Main Article"
            className="float-left mr-6 mb-4 w-72 h-auto rounded-lg shadow-md"
          />
          {article.para1}
        </p>
      </div>

      {/* YouTube Thumbnail */}
      {isClient && article.youtubeLink && (
        <div className="w-full max-w-3xl mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                article.youtubeLink
              )}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      )}

      {/* Paragraphs 2 and 3 */}
      <div className="text-lg text-gray-700 space-y-6 font-roboto">
        <p>{article.para2}</p>

        {article.secondImageLink && (
          <img
            src={article.secondImageLink}
            alt="Supporting Image"
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        )}

        <p>{article.para3}</p>
      </div>
    </div>
  );
}
