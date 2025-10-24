"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllSubmissions, likeSubmission } from "../service/competition.service";
import { useAuth } from "@/app/context/AuthContext";

export default function CompetitionGallery() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getAllSubmissions().then((res) => {
      setSubmissions(res);
      setLoading(false);
    });
  }, []);

  const handleLike = async (submission: any) => {
    if (!user) return alert("Please sign in to like photos.");
    if (submission.userId === user.uid) return alert("You cannot like your own photo.");

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

  if (loading) return <p className="text-center text-gray-400 mt-10">Loading photos...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2027] via-[#2c5364] to-[#00b09b] text-white px-4 py-10 md:px-20">
      <h1 className="text-3xl font-bold text-center mb-8">📸 All Submissions</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {submissions.map((sub) => (
          <div key={sub.id} className="bg-white/10 p-4 rounded-xl">
            <Image
              src={sub.imageUrl}
              alt={sub.title}
              width={400}
              height={300}
              className="rounded-lg object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{sub.title}</h3>
            <p className="text-sm text-gray-300 mb-1">{sub.plane_name} – {sub.country}</p>
            <p className="text-gray-400 text-sm mb-3">{sub.description}</p>
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
    </div>
  );
}
