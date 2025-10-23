"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoBackground from "@/app/component/VideoBackground";
import { getLatestThreeArticle } from "../service/firebase.service";
import Image from "next/image";
import Link from "next/link";

export default function Articles() {
  const router = useRouter();
  const [articles, updateArticles] = useState<Array<Record<string, any>>>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    getLatestThreeArticle().then((val) => {
      updateArticles(val);
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
          src="https://www.youtube.com/embed/ZAIVB4vSnZE"
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
            src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/thumbnail_johor_flight.png?alt=media&token=718271ca-c0b8-4118-920a-b90d49a2256d"
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

      {/* ✅ About Me Section */}
      <div className="flex flex-col lg:flex-row items-start gap-6 px-5 md:px-10 mb-12">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/izzuddin_with_cessna172.png?alt=media&token=7e94ff25-7423-45a9-9c2b-c9d4285feef9"
          alt="About Me"
          width={600}
          height={400}
          className="rounded-lg w-full lg:w-[600px] object-cover"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-3">About Me</h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Hi, I am Izzuddin, a passionate aviation enthusiast who loves flying
            small aircraft and exploring the skies of Malaysia. I created this
            site to share my flying stories, tips for aspiring pilots, and cool
            general aviation content. Whether you are a fellow aviator or just
            curious about the world above, you are in the right place.
          </p>

          {/* ✅ Responsive Instagram Embeds */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <iframe
              src="https://www.instagram.com/p/DDMZ7kMP3xP/embed"
              title="Instagram 1"
              className="w-[280px] h-[500px] rounded-lg"
            />
            <iframe
              src="https://www.instagram.com/p/DGZtoAsPUhw/embed"
              title="Instagram 2"
              className="w-[280px] h-[500px] rounded-lg"
            />
            <iframe
              src="https://www.instagram.com/p/C11kbjCvQ7F/embed"
              title="Instagram 3"
              className="w-[280px] h-[500px] rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
