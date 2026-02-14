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
      {/* Podcast Section */}
      <div className="flex-1 order-2 lg:order-1 flex flex-col items-center text-center">
        <div className="bg-white rounded-xl p-6">
          {/* Title */}
          <h3 className="text-3xl font-bold mb-2">🎧 Hit Play on Our Podcast</h3>

          {/* Subtitle */}
          <p className="mb-4 text-gray-600 text-lg">
            Available on Apple Podcasts, Spotify, and YouTube.
          </p>

          {/* Icons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
            {/* Apple Podcasts */}
            <a
              href="https://podcasts.apple.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[220px] h-[220px] flex items-center justify-center bg-white"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/listen-on-apple-podcast1600.png?alt=media&token=a11f62ba-affa-4cc1-961f-daa871a9ab7b"
                alt="Apple Podcasts"
                width={220}
                height={220}
                className="object-contain"
              />
            </a>

            {/* Spotify Podcasts */}
            <a
              href="https://open.spotify.com/show/0QyKacVfHqeH3H1JXo98YZ?si=0b417aaa8f0c4265"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[220px] h-[220px] flex items-center justify-center bg-white"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/Screenshot%202026-02-14%20at%205.51.48%20PM.png?alt=media&token=60088721-9894-4e8e-99f5-f07409f27a06"
                alt="Spotify Podcasts"
                width={220}
                height={220}
                className="object-contain"
              />
            </a>

            {/* YouTube Podcasts */}
            <a
              href="https://www.youtube.com/@thesocialenterpreneur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[220px] h-[220px] flex items-center justify-center bg-white"
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/Youtube-Podcast-Button.png?alt=media&token=77677d33-c817-45c8-b8ba-d2aabf2ebb94"
                alt="YouTube Podcasts"
                width={220}
                height={220}
                className="object-contain"
              />
            </a>
          </div>
        </div>
      </div>

      {/* About Me Image (Standalone, responsive & bigger) */}
      <div className="order-1 lg:order-2 w-full lg:flex-1">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/bonanza-main.jpg?alt=media&token=73253ea3-416b-4349-8c47-a42ca1e62e6b"
          alt="About Me"
          width={1200}   // original image width
          height={800}   // original image height
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
    </div>


    </div>
  );
}
