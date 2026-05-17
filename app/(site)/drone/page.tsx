"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DronePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const recentDroneVideoId = "N29iiYHg71s";

  const droneServices = [
    {
      id: "aerial-photography",
      title: "Aerial Photography",
      description: "Professional drone photography for events, real estate, and landscapes",
      price: "RM 500 - RM 2000",
      features: [
        "High-resolution images captured from unique angles",
        "Professional editing of photos",
        "Delivery of all images in high quality",
        "Perfect for real estate, events, and promotions"
      ],
      icon: "📸"
    },
    {
      id: "aerial-videography",
      title: "Aerial Videography",
      description: "Professional drone video services with cinematic quality and professional editing",
      price: "RM 1000 - RM 3000",
      features: [
        "4K video recording capability",
        "Professional cinematic shots",
        "Professional video editing",
        "Music and color grading included"
      ],
      icon: "🎥"
    },
    {
      id: "surveying-mapping",
      title: "Surveying & Mapping",
      description: "Professional land surveying and mapping for construction and agriculture",
      price: "RM 800 - RM 2500",
      features: [
        "Accurate land surveying and measurements",
        "3D mapping and orthomosaic imagery",
        "Construction site monitoring",
        "Detailed reports and analysis"
      ],
      icon: "🗺️"
    },
    {
      id: "inspection-services",
      title: "Inspection Services",
      description: "Drone inspection for buildings, towers, and infrastructure",
      price: "RM 600 - RM 1800",
      features: [
        "Building and roof inspections",
        "Tower and antenna inspections",
        "Infrastructure assessment",
        "Detailed inspection report with footage"
      ],
      icon: "🔍"
    },
  ];

  const handleRequestService = () => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    router.push("/drone-request");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative px-4 py-12 md:px-20 md:py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl md:text-6xl mb-6">🚁</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Drone Services
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Capture stunning aerial perspectives with our professional drone services.
            Perfect for events, real estate, surveying, and inspections.
          </p>
          <button
            onClick={handleRequestService}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300 text-lg"
          >
            Request a Service
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 md:px-20 py-12 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {droneServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-8 hover:shadow-xl transition duration-300 border border-gray-200 shadow-md"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="mb-6">
                <p className="text-green-600 font-semibold text-lg mb-4">
                  Price Range: {service.price}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleRequestService}
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Book This Service
              </button>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-t border-gray-200 my-4 mx-auto w-4/5" />

      {/* Why Choose Us Section */}
      <div className="px-4 md:px-20 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
              <div className="text-4xl mb-4">👨‍✈️</div>
              <h3 className="text-xl font-bold mb-2">Expert Pilots</h3>
              <p className="text-gray-600">
                Certified and experienced drone pilots with years of professional service
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Professional equipment and advanced editing ensure premium results
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">
                Quick delivery of edited files without compromising on quality
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200 my-4 mx-auto w-4/5" />

      {/* Recent Drone Work */}
      <div className="px-4 md:px-20 py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
            Recent Drone Work
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Watch a sample from one of our latest aerial shoots.
          </p>
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${recentDroneVideoId}`}
              title="Recent Drone Project"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200 my-4 mx-auto w-4/5" />

      {/* CTA Section */}
      <div className="px-4 md:px-20 py-12 mb-8">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Flight?</h2>
          <p className="text-blue-100 mb-6">
            Contact us today to discuss your drone service needs and get a custom quote.
          </p>
          <button
            onClick={handleRequestService}
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Book Your Service Now
          </button>
        </div>
      </div>
    </div>
  );
}
