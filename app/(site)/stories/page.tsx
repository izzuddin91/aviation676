"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getAllArticles } from "../service/firebase.service";
import { useLanguage } from "@/app/context/LanguageContext";
import englishStories from "@/public/locales/en/stories.json";
import thaiStories from "@/public/locales/th/stories.json";

interface Story {
  id: string;
  photos: string[];
  title: string;
  tags: string[];
  description: string;
}

interface StoryCardProps extends Story {
  copy: typeof englishStories;
}

const StoryCard: React.FC<StoryCardProps> = ({
  id,
  photos,
  title,
  tags,
  description,
  copy,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleSeeMore = () => {
    router.push(`/articles/${id}`);
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
          alt={copy.storyPhotoAlt}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              aria-label={copy.previousPhoto}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextPhoto}
              aria-label={copy.nextPhoto}
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
          <h2 className="font-bold text-lg mb-2 line-clamp-2">
            {title || copy.untitledStory}
          </h2>
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
            onClick={handleSeeMore}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 transition"
          >
            {copy.seeMore}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const STORIES_PER_PAGE = 6;

const StoriesPage = () => {
  const { language } = useLanguage();
  const copy = language === "th" ? thaiStories : englishStories;
  const [stories, setStories] = useState<Story[]>([]);
  const [filteredStories, setFilteredStories] = useState<Story[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<"all" | "podcast">("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const articles = await getAllArticles();
      const mappedStories = articles.map((article: any) => {
        const descriptionWords = article.para1?.split(" ").slice(0, 40).join(" ") || "";
        const tagsArray = article.tags
          ? article.tags.split(",").map((tag: string) => tag.trim().toLowerCase())
          : [];

        return {
          id: article.id,
          photos: [article.mainImageLink, article.secondImageLink].filter(Boolean),
          title: article.title || "",
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
    setCurrentPage(1);
  }, [selectedSegment, stories]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStories.length / STORIES_PER_PAGE);
  const startIndex = (currentPage - 1) * STORIES_PER_PAGE;
  const paginatedStories = filteredStories.slice(startIndex, startIndex + STORIES_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
      {copy.pageTitle}
      </h1>

      {/* Segment Selector */}
      <div className="flex justify-center mb-10 gap-3">
        {[
          { key: "all", label: copy.filters.all },
          { key: "podcast", label: copy.filters.podcast },
        ].map((segment) => (
          <button
            key={segment.key}
            onClick={() =>
              setSelectedSegment(segment.key as "all" | "podcast")
            }
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
              selectedSegment === segment.key
                ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white border-transparent shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {segment.label}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      {paginatedStories.length === 0 ? (
        <div className="text-gray-500 text-center animate-pulse">
          {copy.emptyState}
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedStories.map((story) => (
            <StoryCard key={story.id} {...story} copy={copy} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 rounded-full border text-sm disabled:opacity-40"
          >
            {copy.previousPage}
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full text-sm ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow"
                  : "border hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 rounded-full border text-sm disabled:opacity-40"
          >
            {copy.nextPage}
          </button>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
