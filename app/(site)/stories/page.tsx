"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { getLatestThreeArticle } from "../service/firebase.service";

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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="flex border border-gray-200 rounded-2xl overflow-hidden mb-8 shadow-lg hover:shadow-2xl bg-white"
    >
      {/* Image Section */}
      <div className="w-1/3 bg-gray-100 relative">
        <img
          src={photos[currentIndex]}
          alt="Story Photo"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Text Section */}
      <div className="w-2/3 p-5 flex flex-col justify-between">
        <div>
          <div className="font-bold text-xl mb-2">{title}</div>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full shadow"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-4 text-sm text-gray-700 leading-relaxed">
            {description}...
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-full shadow-md hover:opacity-90 transition">
            See More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const StoriesPage = () => {
  const [stories, setStories] = useState<StoryCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const articles = await getLatestThreeArticle();
      const mappedStories = articles.map((article: any) => {
        const descriptionWords = article.para1?.split(" ").slice(0, 50).join(" ") || "";
        const tagsArray = article.tags
          ? article.tags.split(",").map((tag: string) => tag.trim())
          : [];

        return {
          photos: [article.mainImageLink, article.secondImageLink].filter(Boolean),
          title: article.title || "Untitled Story",
          tags: tagsArray,
          description: descriptionWords,
        };
      });
      setStories(mappedStories);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
        Stories
      </h1>
      {stories.length === 0 ? (
        <div className="text-gray-500 text-center animate-pulse">Loading stories...</div>
      ) : (
        stories.map((story, index) => <StoryCard key={index} {...story} />)
      )}
    </div>
  );
};

export default StoriesPage;
