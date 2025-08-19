"use client";

import { useEffect, useState } from "react";
import { getArticleDetails } from "../../service/firebase.service";
import { useParams, useRouter } from "next/navigation";

interface Article {
  id?: string;
  title: string;
  para1: string;
  para2: string;
  para3: string;
  mainImageLink: string;
  secondImageLink: string;
  youtubeLink: string;
  photos?: string[]; // gallery images
}

export default function Article() {
  const router = useRouter();

  function goBack() {
    router.back();
  }

  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  const [article, updateArticle] = useState<Article>({
    id: "",
    title: "",
    para1: "",
    para2: "",
    para3: "",
    mainImageLink: "",
    secondImageLink: "",
    youtubeLink: "",
    photos: [],
  });

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    getData();
  }, []);

  async function getData() {
    const val = await getArticleDetails(params["articleId"].toString());

    if (val) {
      const mapped: Article = {
        id: val.id ?? "",
        title: val.title ?? "",
        para1: val.para1 ?? "",
        para2: val.para2 ?? "",
        para3: val.para3 ?? "",
        mainImageLink: val.mainImageLink ?? "",
        secondImageLink: val.secondImageLink ?? "",
        youtubeLink: val.youtubeLink ?? "",
        photos: val.photos ?? [
          // 👇 sample photos
          "https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Faviation676podcast.JPG?alt=media&token=c7655d41-1260-4599-8e42-33024da58ce3",
          "https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Faviation676podcast.JPG?alt=media&token=c7655d41-1260-4599-8e42-33024da58ce3",
          "https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Faviation676podcast.JPG?alt=media&token=c7655d41-1260-4599-8e42-33024da58ce3"
        ],
      };

      updateArticle(mapped);
    }
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

      {/* Paragraph 1 with wrapped image */}
      <div className="text-lg text-gray-700 leading-relaxed font-roboto">
        <p className="text-justify">
          {article.mainImageLink && (
            <img
              src={article.mainImageLink}
              alt="Main Article"
              className="float-left mr-6 mb-4 w-72 h-auto rounded-lg shadow-md"
            />
          )}
          {article.para1}
        </p>
      </div>

      {/* YouTube Video */}
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

      {/* 👇 Photo Gallery */}
      {article.photos && article.photos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold font-poppins">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {article.photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-80 transition"
                onClick={() => setSelectedPhoto(photo)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 👇 Popup Modal for large image */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto}
            alt="Large view"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-xl"
          />
        </div>
      )}
    </div>
  );
}
