"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CompetitionPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubmitClick = () => {
    if (!isAuthenticated) {
      router.push("/signin");
    } else {
      router.push("/submit-photo");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2027] via-[#2c5364] to-[#00b09b] text-white px-4 py-10 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ✈️ Aviation676 Planespotting Competition 2025
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
          Think you can capture the most stunning aircraft photo? Join our first-ever
          planespotting competition and stand a chance to win{" "}
          <strong>RM200 CASH!</strong>
        </p>

        <p className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
          This competition is open to <strong>anyone with a passion for aviation</strong> — whether
          you’re a dedicated planespotter, a commercial pilot, a helicopter crew, or
          simply someone who loves taking photos of aircraft. Your photo can be{" "}
          <strong>taken from the ground, from inside an aircraft, or of any aircraft in flight or on the ground</strong>.
          If it captures the beauty of aviation, it qualifies!
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
            <li>Upload your best aircraft photo — taken anywhere in Malaysia or abroad.</li>
            <li>Share your post to get likes. The most-liked photo wins!</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">🎁 Prizes</h2>
          <ul className="list-disc list-inside text-gray-200 space-y-2">
            <li>🏆 Winner: RM200 cash + Aviation676 feature article</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">📅 Competition Dates</h2>
          <p className="text-gray-200">
            Submission open: <strong>1 Nov – 30 Nov 2025</strong>
            <br />
            Winner announcement: <strong>5 Dec 2025</strong>
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
          <h2 className="text-2xl font-semibold mb-2">⭐ Leaderboard Preview</h2>
          <p className="text-gray-300 mb-4">Top 3 liked photos (updated weekly)</p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 1 */}
            <div className="bg-white/10 p-3 rounded-lg">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/sample_planespotting1.jpg?alt=media&token=a111cdef-1234-5678-9101-abcdef123456"
                alt="Private jet takeoff"
                width={300}
                height={200}
                className="rounded-lg mb-2 object-cover"
              />
              <p className="text-sm text-gray-300">@planespotter_jp – 134 likes</p>
            </div>

            {/* 2 */}
            <div className="bg-white/10 p-3 rounded-lg">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/sample_planespotting2.jpg?alt=media&token=b222cdef-1234-5678-9101-abcdef123456"
                alt="Airliner approach shot"
                width={300}
                height={200}
                className="rounded-lg mb-2 object-cover"
              />
              <p className="text-sm text-gray-300">@izzuddin676 – 120 likes</p>
            </div>

            {/* 3 */}
            <div className="bg-white/10 p-3 rounded-lg">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/sample_planespotting3.jpg?alt=media&token=c333cdef-1234-5678-9101-abcdef123456"
                alt="Runway lineup shot"
                width={300}
                height={200}
                className="rounded-lg mb-2 object-cover"
              />
              <p className="text-sm text-gray-300">@avgeek_my – 112 likes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
