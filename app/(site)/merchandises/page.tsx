// pages/merchandise.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "../service/firebase.service";

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

const Merchandises: React.FC = () => {
  // Fetch products from Firestore (falls back to empty list while loading)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      try {
        setLoading(true);
        const items = await getAllProducts();
        if (!mounted) return;

        // Map Firestore product shape into the Product interface used by this page
        const mapped: Product[] = items.map((p: any) => ({
          id: p.id,
          title: p.title || "Untitled",
          price: `RM${p.price || 0}`,
          image: p.imageUrl || p.image_1 || p.image1 || "",
          description: p.description || "",
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

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
