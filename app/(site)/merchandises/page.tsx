// pages/merchandise.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

const Merchandises: React.FC = () => {
  // Hardcoded merchandise data (keeping the same data source)
  const products: Product[] = [
    {
      id: "l9irymcJ3nPUj4Myc2Xn",
      title: "David Clark H10-13.4 Aviation Headset",
      price: "RM1000",
      image:
        "https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FdcHeadset_1.jpeg?alt=media&token=705fdde9-3291-4591-b6ba-64a02f9e1a0e",
      description:
        "A trusted classic among student and private pilots. Well-maintained and previously used by a fellow pilot who has completed training. Known for its reliable passive noise reduction and long-lasting cockpit comfort.",
    },
    {
      id: "shirt-676-1",
      title: "Aviation 676 Tee — Jet Logo Edition",
      price: "RM50",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/shirt1.png?alt=media&token=8992b5b1-dee4-402a-b612-50b8e8dc32fb",
      description:
        "A clean and minimalist aviation-inspired T-shirt featuring the Aviation 676 jet logo. Designed for pilots, flight sim enthusiasts, and anyone who lives for the skies.",
    },
    {
      id: "shirt-676-2",
      title: "Aviation 676 Tee — Aircraft Blueprint Edition",
      price: "RM50",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/shirt2.png?alt=media&token=8a3815b8-2194-48e9-bf03-aa6966d6b70b",
      description:
        "A technical blueprint-style aircraft illustration made for true aviation enthusiasts. Inspired by classic general aviation design and crafted to be worn both on and off the airfield.",
    },
    {
      id: "F7PoBhY2X95zI27lYgqH",
      title: "Aviation 676 Sim Throttle",
      price: "RM300",
      image:
        "https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/throttle.jpg?alt=media&token=82cec786-1577-452e-b468-891b11eced66",
      description:
        "A realistic Cessna 172 throttle and mixture for flight simulators. Perfect for student who want a sense of realism when practicing touch and go on the simulator.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-4 py-10 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
          Aviation Merchandise
        </h1>

        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
          Browse our collection of aviation-themed merchandise. From pilot gear
          to apparel, find the perfect items for aviation enthusiasts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/merchandises/${product.id}`}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 h-full flex flex-col">
                {/* Product Image */}
                <div className="relative h-[260px] w-full bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {product.title}
                      </h2>
                      <p className="text-lg font-medium text-gray-700 mt-1">
                        {product.price}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold tracking-wide text-green-500 uppercase">
                        In Stock
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {product.price.includes("50") ? "Standard" : "Premium"}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-6 flex-1">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <button className="border border-gray-800 rounded-full px-6 py-3 font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
                      VIEW DETAILS
                    </button>

                    <span className="text-sm font-semibold text-gray-500">
                      Aviation676
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Merchandises;
