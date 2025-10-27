"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getAllSubmissions,
  likeSubmission,
} from "../service/competition.service";
import { useAuth } from "@/app/context/AuthContext";

export default function CompetitionGallery() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [selected, setSelected] = useState<any | null>(null); // 👈 modal state

  useEffect(() => {
    getAllSubmissions().then((res) => {
      setSubmissions(res);
      setLoading(false);
    });
  }, []);

  const handleLike = async (submission: any) => {
    if (!user) return alert("Please sign in to like photos.");
    if (submission.userId === user.uid)
      return alert("You cannot like your own photo.");

    try {
      await likeSubmission(submission.id, user.uid);
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submission.id ? { ...s, likes_count: s.likes_count + 1 } : s
        )
      );
    } catch (e: any) {
      alert(e.message || "Already liked this photo.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-400 mt-10">Loading photos...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2027] via-[#2c5364] to-[#00b09b] text-white px-4 py-10 md:px-20">
      <h1 className="text-3xl font-bold text-center mb-8">
        📸 All Submissions
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="bg-white/10 p-4 rounded-xl text-center flex flex-col items-center"
          >
            <div
              className="cursor-pointer"
              onClick={() => setSelected(sub)} // 👈 open modal
            >
              <Image
                src={sub.imageUrl}
                alt={sub.title}
                width={400}
                height={300}
                className="rounded-lg object-cover mb-3 mx-auto"
              />
              <h3 className="text-lg font-semibold">{sub.title}</h3>
              <p className="text-sm text-gray-300 mb-1">{sub.country}</p>
            </div>

            <p className="text-sm text-gray-300 mb-2">
              ❤️ {sub.likes_count} likes
            </p>
            <button
              onClick={() => handleLike(sub)}
              className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-500 transition"
            >
              Like 👍
            </button>
          </div>
        ))}
      </div>

      {/* ✅ MODAL POPUP */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto"
          onClick={() => setSelected(null)} // close when clicking outside
        >
          <div
            className="bg-white text-black rounded-2xl p-6 relative max-w-2xl w-full mx-4 my-10 sm:my-6"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-4 text-gray-600 text-2xl hover:text-black z-10"
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <Image
                src={selected.imageUrl}
                alt={selected.title}
                width={800}
                height={600}
                className="rounded-lg object-cover mb-4 w-full h-auto"
              />

              <h2 className="text-2xl font-bold mb-2 text-center">
                {selected.title}
              </h2>
              <p className="text-center text-gray-600 mb-1">
                ✈️ {selected.plane_name}
              </p>
              <p className="text-center text-gray-600 mb-3">
                🌍 {selected.country}
              </p>
              <p className="text-gray-700 text-sm mb-3 text-center px-2">
                {selected.description}
              </p>
              <p className="text-center text-red-500 font-medium">
                ❤️ {selected.likes_count} likes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
