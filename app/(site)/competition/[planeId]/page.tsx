"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPlaneDetails } from "../../service/firebase.service";

export interface Plane {
  id: string;
  title: string;
  images: string[];
  description: string;
  // add other fields as needed
}

export default function PlaneDetailsPage() {
  const params = useParams();
  const planeId = params.planeId as string;
  const [plane, setPlane] = useState<Plane | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlane = async () => {
      try {
        const data = await getPlaneDetails(planeId);
        console.log("Plane details data:", data);
        setPlane(data as Plane);
        console.log("Plane state set:", data);
      } catch (error) {
        console.error("Error fetching plane details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (planeId) {
      fetchPlane();
    }
  }, [planeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f2027] text-white text-lg">
        Loading plane details...
      </div>
    );
  }

  if (!plane) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f2027] text-white text-lg">
        Plane not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f2027] via-[#2c5364] to-[#00b09b] text-white px-4 py-10 md:px-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/competition" className="text-yellow-400 hover:underline mb-6 inline-block">
          ← Back to Planes
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          ✈️ {plane.title}
        </h1>

        <div className="mb-8">
          <p className="text-lg text-gray-200 leading-relaxed">
            {plane.description}
          </p>
        </div>

        {/* Images Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plane.images && plane.images.length > 0 ? (
            plane.images.map((imageUrl, index) => (
              <div key={index} className="aspect-video relative">
                <Image
                  src={imageUrl}
                  alt={`${plane.title} - Image ${index + 1}`}
                  fill
                  className="rounded-lg object-cover shadow-lg"
                />
              </div>
            ))
          ) : (
            <div className="aspect-video relative">
              <Image
                src="https://flyteam.jp/photo/4272113"
                alt={`${plane.title} - No image available`}
                fill
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}