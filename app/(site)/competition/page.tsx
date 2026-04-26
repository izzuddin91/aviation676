"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { getAllPlanes } from "../service/firebase.service";

export interface Plane {
  id: string;
  title: string;
  images: string[];
  description: string;
  registrationNo?: string;
}

export default function PlanesPage() {
  const [planes, setPlanes] = useState<Plane[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    console.log("Authenticated user:", user);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;

    const fetchPlanes = async () => {
      try {
        const data = await getAllPlanes();
        setPlanes(data as Plane[]);
      } catch (error) {
        console.error("Error fetching planes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, [authLoading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] text-gray-700 text-lg">
        Loading aircraft listings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-4 py-10 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          Aircraft Listings
        </h1>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
          Browse premium aircraft available for sale. Designed with a clean
          broker-style layout similar to professional aviation listing websites.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {planes.map((plane) => {
            const imageSrc =
              plane.images && plane.images.length > 0
                ? plane.images[0]
                : "/placeholder-plane.jpg";

            return (
              <Link key={plane.id} href={`/competition/${plane.id}`}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 h-full flex flex-col">
                  {/* Plane Image */}
                  <div className="relative h-[260px] w-full bg-gray-100">
                    <Image
                      src={imageSrc}
                      alt={plane.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3 gap-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                          {plane.title || "N421JL"}
                        </h2>
                        <p className="text-lg font-medium text-gray-700 mt-1">
                          {plane.registrationNo || "Registration unavailable"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold tracking-wide text-sky-500 uppercase">
                          Available
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                          ASK FOR PRICE
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6 flex-1">
                      Exceptional aircraft featuring upgraded avionics, reliable
                      engines, and excellent cross-country performance. Ideal
                      for owners seeking capability, comfort, and dependable
                      craftsmanship.
                    </p>

                    <div className="flex items-center justify-between">
                      <button className="border border-gray-800 rounded-full px-6 py-3 font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
                        CLICK FOR DETAILS
                      </button>

                      <span className="text-sm font-semibold text-gray-500">
                        Listed April 2026
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
