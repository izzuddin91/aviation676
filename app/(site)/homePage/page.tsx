"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoBackground from "@/app/component/VideoBackground";
import { getAllProducts, getLatestThreeArticle } from "../service/firebase.service";
import Image from "next/image";
import Link from "next/link";

export default function Articles() {
  const router = useRouter();
  const [articles, updateArticles] = useState<Array<Record<string, any>>>([]);
  const [products, setProducts] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    getLatestThreeArticle().then((val) => {
      updateArticles(val);
    });
    getAllProducts().then((val) => {
      setProducts(val.slice(0, 4));
    });
  }

  function articleDetails(articleId: string) {
    router.push("/articles/" + articleId);
  }

  const styles = {
    sectionTitle: {
      textAlign: "center" as const,
      fontSize: "2em",
      margin: "20px 0 10px",
      color: "#333",
    },
    sectionDescription: {
      textAlign: "center" as const,
      fontSize: "1.2em",
      color: "#666",
      margin: "0 20px 20px",
    },
    hr: {
      border: "none",
      borderTop: "1px solid #ddd",
      margin: "30px auto",
      width: "80%",
    },
    paddingContainer: { padding: "0 20px" },
  };

  return (
    <div className="bg-white text-black">
      <VideoBackground />

      <div className="px-5 md:px-10">
        <h1 className="text-2xl md:text-3xl text-center font-semibold mt-6 mb-2">
          Do you love general aviation ?
        </h1>
        <p className="text-center text-gray-600 text-base md:text-lg mb-5">
          For those who fancy being a pilot and likes anything aviation related!
        </p>
      </div>

      <hr className="border-t border-gray-300 my-8 mx-auto w-4/5" />

      {/* ✅ Responsive video section */}
      <div className="flex flex-col md:flex-row justify-center gap-6 px-4">
        <iframe
          src="https://www.youtube.com/embed/pWb7E6IXB4Q"
          title="YouTube Video 1"
          className="w-full md:w-[560px] h-[220px] md:h-[315px] rounded-lg border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/xBKFt3Uja6A"
          title="YouTube Video 2"
          className="w-full md:w-[560px] h-[220px] md:h-[315px] rounded-lg border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <hr className="border-t border-gray-300 my-8 mx-auto w-4/5" />

      {/* ✅ Responsive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-10">
        <div className="bg-white rounded-xl shadow-md overflow-hidden text-center hover:shadow-lg transition">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/johor_flight.webp?alt=media&token=0a73c9c9-d8e0-4e87-9fc4-7e9c1c13a2fe"
            alt="Johor Flight"
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <h2 className="text-lg font-semibold mt-3">Johor Flight</h2>
          <p className="text-sm text-gray-600 px-3 mb-2">
            How I execute touch and go at Senai Airport.
          </p>
          <Link
            href="/articles/CR0BafXyabvNYdO15AKH"
            className="text-blue-600 font-bold mb-3 inline-block"
          >
            Read More
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden text-center hover:shadow-lg transition">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Faviation676podcast.JPG?alt=media&token=c7655d41-1260-4599-8e42-33024da58ce3"
            alt="Podcast"
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <h2 className="text-lg font-semibold mt-3">First Podcast!</h2>
          <p className="text-sm text-gray-600 px-3 mb-2">
            Watch our first ever podcast on general aviation.
          </p>
          <Link
            href="/articles/OHekw7WGGLXsAm3Pqa2P"
            className="text-blue-600 font-bold mb-3 inline-block"
          >
            Read More
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden text-center hover:shadow-lg transition">
          <Image
            src="https://thisisflight.net/wp-content/uploads/2021/03/MG_0441-scaled.jpg"
            alt="Lima Airshow"
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
          <h2 className="text-lg font-semibold mt-3">Lima Airshow</h2>
          <p className="text-sm text-gray-600 px-3 mb-2">
            This time around we will show you the inside of the airshow in
            Langkawi.
          </p>
          <Link
            href="/articles"
            className="text-blue-600 font-bold mb-3 inline-block"
          >
            Read More
          </Link>
        </div>
      </div>

      <hr className="border-t border-gray-300 my-8 mx-auto w-4/5" />

      <hr className="border-t border-gray-300 my-8 mx-auto w-4/5" />

      {/* ✅ About Me Section */}
      <div className="flex flex-col lg:flex-row items-start gap-6 px-5 md:px-10 mb-12">
        {/* New Products Section */}
        <div className="flex-1 order-2 lg:order-1 flex flex-col items-center text-center">
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-3xl font-bold mb-5">New Products</h3>
            <div className="grid grid-cols-4 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/merchandises/${product.id}`}
                  className="text-left rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition"
                >
                  <div className="relative h-40 w-full bg-gray-100">
                    <Image
                      src={product.imageUrl || product.image_1 || product.image1 || "/images/placeholder.png"}
                      alt={product.title || "Product"}
                      fill
                      sizes="(max-width: 768px) 25vw, 220px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-semibold truncate">{product.title || "Untitled"}</h4>
                    <p className="text-sm text-gray-600">RM{product.price || 0}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
