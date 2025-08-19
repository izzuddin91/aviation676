"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { getLatestThreeArticle } from "../service/firebase.service";

interface StoryCardProps {
  photos: string[];
  title: string;
  tags: string[];
  description: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ photos, title, tags, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex border border-black-500 rounded-xl overflow-hidden mb-6 shadow-md">
      <div className="w-1/3 bg-gray-200 relative">
        <img
          src={photos[currentIndex]}
          alt="Story Photo"
          className="w-full h-full object-cover"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div className="flex justify-between mb-2">
          <div className="font-semibold text-xl">{title}</div>
          <div className="text-sm border px-2 py-1 rounded">Tags: {tags.join(", ")}</div>
        </div>
        <div className="mb-4 text-sm text-gray-700">
          {description}...
        </div>
        <div className="flex justify-end">
          <button className="border px-4 py-2 rounded hover:bg-gray-200">See More</button>
        </div>
      </div>
    </div>
  );
};

const StoriesPage = () => {
  const [stories, setStories] = useState<StoryCardProps[]>([]);

useEffect(() => {
  const fetchData = async () => {
    // const articles = await getLatestThreeArticle();
    // const mappedStories = articles.map((article: any) => {
    //   const descriptionWords = article.para1?.split(" ").slice(0, 50).join(" ") || "";
    //   const tagsArray = article.tags
    //     ? article.tags.split(",").map((tag: string) => tag.trim())
    //     : [];

    //   return {
    //     photos: [article.mainImageLink, article.secondImageLink].filter(Boolean),
    //     title: article.title || "Untitled Story",
    //     tags: tagsArray,
    //     description: descriptionWords,
    //   };
    // });
    // setStories(mappedStories);
  };

  fetchData();
}, []);


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Stories</h1>
      {stories.length === 0 ? (
        <div className="text-gray-500">Loading stories...</div>
      ) : (
        stories.map((story, index) => <StoryCard key={index} {...story} />)
      )}
    </div>
  );
};

export default StoriesPage;
