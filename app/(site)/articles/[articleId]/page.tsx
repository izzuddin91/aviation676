"use client";

import { useEffect, useState } from "react";
import { getArticleDetails } from "../../service/firebase.service";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Article {
  id?: string;
  title: string;
  para1: string;
  para2: string;
  para3: string;
  mainImageLink: string;
  secondImageLink: string;
  youtubeLink: string;
  photos?: string[];
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
    const articleId = params?.["articleId"];
    if (!articleId) return;

    const val = await getArticleDetails(articleId.toString());
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
        photos: val.photos ?? [],
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
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-10 space-y-10">
        {/* 🔙 Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-4 py-2 text-white font-semibold bg-gradient-to-r from-violet-600 to-blue-600 rounded-full shadow hover:shadow-lg hover:from-violet-700 hover:to-blue-700 transition-all duration-300 ease-in-out"
        >
          <ArrowLeft size={18} />
          Back to Articles
        </button>

        {/* Title */}
        {article.title && (
          <h1 className="text-4xl font-bold text-center font-poppins">
            {article.title}
          </h1>
        )}

        {/* Paragraph 1 */}
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
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  article.youtubeLink
                )}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        )}

        {/* Paragraphs 2 & 3 */}
        <div className="text-lg text-gray-700 space-y-6 font-roboto">
          {article.para2 && <p>{article.para2}</p>}

          {article.secondImageLink && (
            <img
              src={article.secondImageLink}
              alt="Supporting Image"
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"
            />
          )}

          {article.para3 && <p>{article.para3}</p>}
        </div>

        {/* Photo Gallery */}
        {article.photos && article.photos.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold font-poppins">Photo Gallery</h2>
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
      </div>

      {/* Image Modal */}
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
