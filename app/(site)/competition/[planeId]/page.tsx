"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPlaneDetails } from "../../service/firebase.service";

export interface Plane {
  id: string;
  title: string;
  registration?: string;
  heroImage?: string;
  images: string[];
  description: string;
  airframeTime?: string;
  engineTime?: string;
  brokerName?: string;
  brokerEmail?: string;
  brokerPhone?: string;
  brokerImage?: string;
}

const samplePlane: Plane = {
  id: "1",
  title: "1977 Cessna 421C",
  registration: "N421JL",
  heroImage:
    "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/planes%2Fpiper_saratoga_1.jpg?alt=media&token=3f860582-5f93-4c78-93ec-f73279bd71dd",
  description:
    "Cessna pressurized twin-engine aircraft featuring executive seating, strong performance, and exceptional cross-country comfort. Ideal for private owners, charter operators, and aviation investors seeking a reliable classic cabin aircraft.",
  airframeTime: "7,448 TT",
  engineTime: "716 SMOH / 745 SFRM",
  brokerName: "Anna Crawley",
  brokerEmail: "anna@aviationbroker.com",
  brokerPhone: "+60 19-888 7777",
  brokerImage:
    "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/planes%2Fpiper_saratoga_1.jpg?alt=media&token=3f860582-5f93-4c78-93ec-f73279bd71dd",
  images: [
    "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/planes%2Fpiper_saratoga_1.jpg?alt=media&token=3f860582-5f93-4c78-93ec-f73279bd71dd",
    "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/planes%2Fpiper_saratoga_1.jpg?alt=media&token=3f860582-5f93-4c78-93ec-f73279bd71dd",
    "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/planes%2Fpiper_saratoga_1.jpg?alt=media&token=3f860582-5f93-4c78-93ec-f73279bd71dd",
    "https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/planes%2Fpiper_saratoga_1.jpg?alt=media&token=3f860582-5f93-4c78-93ec-f73279bd71dd",
  ],
};

export default function PlaneDetailsPage() {
  const params = useParams();
  const planeId = params.planeId as string;

  const [plane, setPlane] = useState<Plane | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlane = async () => {
      try {
        const data = await getPlaneDetails(planeId);

        if (data) {
          setPlane(data as Plane);
        } else {
          setPlane(samplePlane);
        }
      } catch (error) {
        console.error("Error fetching plane details:", error);
        setPlane(samplePlane);
      } finally {
        setLoading(false);
      }
    };

    if (planeId) {
      fetchPlane();
    } else {
      setPlane(samplePlane);
      setLoading(false);
    }
  }, [planeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700 text-lg">
        Loading plane details...
      </div>
    );
  }

  if (!plane) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700 text-lg">
        Plane not found.
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f7] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[420px] md:h-[520px] w-full overflow-hidden">
        <Image
          src={plane.heroImage || plane.images?.[0] || samplePlane.heroImage!}
          alt={plane.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center px-6 md:px-20">
          <div className="text-white max-w-xl">
            <p className="text-sm uppercase tracking-[3px] mb-2 opacity-90">
              Aircraft Listing
            </p>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {plane.title}
            </h1>

            <p className="text-lg md:text-2xl font-medium mb-6 opacity-95">
              {plane.registration || "N421JL"}
            </p>

            <Link
              href="/competition"
              className="inline-block border border-white rounded-full px-6 py-2 text-sm hover:bg-white hover:text-black transition"
            >
              ALL INVENTORY
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT SIDE - CARDS */}
          <div className="space-y-6">
            {/* DESCRIPTION CARD */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {plane.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900">
                    Airframe Total Time
                  </p>
                  <p className="text-gray-600">
                    {plane.airframeTime || "7,448 TT"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">Engine Times</p>
                  <p className="text-gray-600">
                    {plane.engineTime || "716 / 745"}
                  </p>
                </div>
              </div>
            </div>

            {/* BROKER CARD */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={plane.brokerImage || samplePlane.brokerImage!}
                    alt="Broker"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {plane.brokerName || "Anna Crawley"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {plane.brokerEmail || "anna@aviationbroker.com"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {plane.brokerPhone || "+60 19-888 7777"}
                  </p>
                </div>
              </div>

              <button className="mt-6 w-full border border-blue-500 text-blue-500 rounded-full py-2 text-sm font-medium hover:bg-blue-500 hover:text-white transition">
                CONTACT DEALER
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - GALLERY */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plane.images?.map((image, index) => (
                <div
                  key={index}
                  className="relative h-[250px] rounded-xl overflow-hidden shadow-md"
                >
                  <Image
                    src={image}
                    alt={`${plane.title} ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
