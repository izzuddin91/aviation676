"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Timestamp } from "firebase/firestore";
import app from "@/app/clientApp";
import { getAllSubmissions } from "../service/competition.service";

export interface Submission {
  id: string;
  title: string;
  description: string;
  country: string;
  planeName: string;
  imageUrl: string;
  likes_count: number;
  userId: string;
  createdAt: Timestamp;
}

export default function CompetitionPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  // 🔍 Log user info
  useEffect(() => {
    console.log("Authenticated user:", user);
  }, [user]);

  // 🛫 Fetch competition submissions
  useEffect(() => {
    if (authLoading) return; // wait for auth to finish

    const fetchSubmissions = async () => {
      try {
        const data = await getAllSubmissions();
        setSubmissions(data as Submission[]);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [authLoading]);

  // ✈️ Handle submit button
  const handleSubmitClick = () => {
    if (!isAuthenticated) {
      router.push("/signin");
    } else {
      router.push("/competition-submit");
    }
  };

  // ⏳ Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f2027] text-white text-lg">
        Loading competition data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2027] via-[#2c5364] to-[#00b09b] text-white px-4 py-10 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ✈️ Aviation676 Planespotting Competition 2025
        </h1>

        {user && (
          <p className="text-gray-300 mb-4">
            Logged in as: <strong>{user.email}</strong>
          </p>
        )}

        <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
          Think you can capture the most stunning aircraft photo? Join our
          first-ever planespotting competition and stand a chance to win{" "}
          <strong>RM200 CASH!</strong>
        </p>

        <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
          This competition is open to{" "}
          <strong>anyone with a passion for aviation</strong> — whether you’re a
          dedicated planespotter, a commercial pilot, a helicopter crew, or
          simply someone who loves taking photos of aircraft. Your photo can be{" "}
          <strong>
            taken from the ground, from inside an aircraft, or of any aircraft
            in flight or on the ground
          </strong>
          . If it captures the beauty of aviation, it qualifies!
        </p>

        <div className="flex justify-center mb-10">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/planespotting.png?alt=media&token=911da7a9-df83-406d-825d-a5040a8761fd"
            alt="Planespotting Banner"
            width={800}
            height={450}
            className="rounded-xl shadow-lg"
          />
        </div>

        <div className="text-left bg-white/10 backdrop-blur-md p-6 rounded-2xl mb-8">
          <h2 className="text-2xl font-semibold mb-2">📸 How It Works</h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2">
            <li>Register or sign in to your Aviation676 account.</li>
            <li>
              Upload your best aircraft photo — taken anywhere in Malaysia or
              abroad.
            </li>
            <li>Share your post to get likes. The most-liked photo wins!</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">🎁 Prizes</h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2">
            <li>🏆 Winner: RM200 cash + Aviation676 feature article</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            📅 Competition Dates
          </h2>
          <p className="text-gray-200">
            Submission open: <strong>24 Oct – 31 Dec 2025</strong>
            <br />
            Winner announcement: <strong>1 Jan 2026</strong>
          </p>
        </div>

        <button
          onClick={handleSubmitClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full transition-transform duration-300 hover:scale-105"
        >
          Submit Your Photo
        </button>

        {!isAuthenticated && (
          <p className="text-gray-300 mt-4">
            🔒 You need to{" "}
            <Link href="/signin" className="underline text-white">
              sign in
            </Link>{" "}
            to submit.
          </p>
        )}

        {/* ⭐ Leaderboard Preview Section */}
        <div className="mt-16 text-left bg-white/10 backdrop-blur-md p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-2">
            ⭐ Leaderboard Preview
          </h2>
          <p className="text-gray-300 mb-4">
            Top 3 liked photos (updated weekly)
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {submissions.slice(0, 3).map((submission) => (
              <div key={submission.id} className="bg-white/10 p-3 rounded-lg">
                <Image
                  src={submission.imageUrl}
                  alt={submission.title}
                  width={300}
                  height={200}
                  className="rounded-lg mb-2 object-cover"
                />
                <p className="text-sm text-gray-300">
                  @{submission.title || "anonymous"} – {submission.likes_count}{" "}
                  likes
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Link
              href="/competition-gallery"
              className="text-yellow-400 hover:underline font-semibold"
            >
              See More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
