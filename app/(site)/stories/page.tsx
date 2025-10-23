"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // ✅ Added
import { getAllArticles } from "../service/firebase.service";

interface StoryCardProps {
  id: string; // ✅ Added
  photos: string[];
  title: string;
  tags: string[];
  description: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ id, photos, title, tags, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter(); // ✅ Added

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleSeeMore = () => {
    console.log(id)
    router.push(`/articles/${id}`); // ✅ Redirect to article page
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 flex flex-col"
    >
      {/* Image Section */}
      <div className="relative w-full h-56 bg-gray-100">
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
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Text Section */}
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="font-bold text-lg mb-2 line-clamp-2">{title}</h2>
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
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
            {description}...
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSeeMore} // ✅ Added click handler
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 transition"
          >
            See More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const StoriesPage = () => {
  const [stories, setStories] = useState<StoryCardProps[]>([]);
  const [filteredStories, setFilteredStories] = useState<StoryCardProps[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<"all" | "japan" | "malaysia">("all");

  useEffect(() => {
    const fetchData = async () => {
      const articles = await getAllArticles();
      const mappedStories = articles.map((article: any) => {
        const descriptionWords = article.para1?.split(" ").slice(0, 40).join(" ") || "";
        const tagsArray = article.tags
          ? article.tags.split(",").map((tag: string) => tag.trim().toLowerCase())
          : [];

        return {
          id: article.id, // ✅ Include article ID
          photos: [article.mainImageLink, article.secondImageLink].filter(Boolean),
          title: article.title || "Untitled Story",
          tags: tagsArray,
          description: descriptionWords,
        };
      });
      setStories(mappedStories);
      setFilteredStories(mappedStories);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSegment === "all") {
      setFilteredStories(stories);
    } else {
      const filtered = stories.filter((story) =>
        story.tags.some((tag) => tag.includes(selectedSegment))
      );
      setFilteredStories(filtered);
    }
  }, [selectedSegment, stories]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
        Stories
      </h1>

      {/* Segment Selector */}
      <div className="flex justify-center mb-10 gap-3">
        {["all", "japan", "malaysia"].map((segment) => (
          <button
            key={segment}
            onClick={() => setSelectedSegment(segment as "all" | "japan" | "malaysia")}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
              selectedSegment === segment
                ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-transparent shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-gray-500 text-center animate-pulse">No stories found...</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story, index) => (
            <StoryCard key={index} {...story} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
