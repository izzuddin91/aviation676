"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoBackground from "@/app/component/VideoBackground";
import { getLatestThreeArticle } from "../service/firebase.service";
import Image from "next/image";

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
    videoContainer: {
      display: "flex",
      justifyContent: "center" as const,
      gap: "20px", // Add space between the videos
      margin: "20px 0",
    },
    iframe: {
      border: "none",
      borderRadius: "10px",
      width: "560px",
      height: "315px",
    },
    paddingContainer: { padding: "0 20px" },
    card: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      textAlign: "center" as const,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardImage: { width: "100%", height: "200px", objectFit: "cover" as const },
    cardTitle: { fontSize: "1.5em", margin: "15px 0" },
    cardDescription: {
      fontSize: "1em",
      padding: "0 15px",
      marginBottom: "15px",
    },
    cardLink: {
      display: "inline-block",
      margin: "10px 0",
      color: "#007BFF",
      textDecoration: "none",
      fontWeight: "bold",
    },
    aboutMeContainer: {
      display: "flex",
      flexWrap: "wrap" as const,
      alignItems: "flex-start" as const, // Align text to top of image
      gap: "30px",
      marginTop: "40px",
      padding: "0 20px", // Add padding to the left and right side
    },
    aboutMeImage: {
      width: "600px",
      height: "auto",
      borderRadius: "10px",
      objectFit: "cover" as const,
    },
    aboutMeText: {
      flex: 1,
    },
    instagramThumbnails: {
      display: "flex",
      gap: "10px",
      marginTop: "20px",
      flexWrap: "wrap" as const,
    },
    instagramIframe: {
      
      width: "300px", // Adjusted width to fit properly
      height: "700px", // Adjusted height for a better display
      objectFit: "cover" as const,
      borderRadius: "8px",
    },
  };

  return (
    <div>
      <VideoBackground />

      <div style={styles.paddingContainer}>
        <h1 style={styles.sectionTitle}>Do you love general aviation ?</h1>
        <p style={styles.sectionDescription}>
          For those who fancy being a pilot and likes anything aviation related
          !
        </p>
      </div>

      <hr style={styles.hr} />

      <div style={styles.videoContainer}>
        <iframe
          src="https://www.youtube.com/embed/ZAIVB4vSnZE"
          title="YouTube Video 1"
          style={styles.iframe}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/8vyQwK_4e6A" // Replace with your second video ID
          title="YouTube Video 2"
          style={styles.iframe}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <hr style={styles.hr} />

      {/* Cards */}
      <div className="cardsContainer" style={styles.paddingContainer}>
        <div style={styles.card}>
          <Image
            src="https://i.pinimg.com/originals/36/e6/a2/36e6a2c6682fda658e49483b2dbd7eed.jpg"
            alt="Charter Jet Service"
            width={400}
            height={250} // Adjust to fit your layout
            style={styles.cardImage}
          />
          <h2 style={styles.cardTitle}>Johor Flight</h2>
          <p style={styles.cardDescription}>
            How I execute touch and go at Senai Airport.
          </p>
          <a href="#more" style={styles.cardLink}>
            Read More
          </a>
        </div>

        <div style={styles.card}>
          <Image
            src="https://www.twincitiesflight.com/wp-content/uploads/2024/07/N65453.jpg"
            alt="Airbnb Business"
            width={400}
            height={250} // Adjust to fit your layout
            style={styles.cardImage}
          />
          <h2 style={styles.cardTitle}>City Flight</h2>
          <p style={styles.cardDescription}>
            Follow me as I guide you through the flight around city center.
          </p>
          <a href="/articles/1" style={styles.cardLink}>
            Read More
          </a>
        </div>

        <div style={styles.card}>
          <Image
            src="https://thisisflight.net/wp-content/uploads/2021/03/MG_0441-scaled.jpg"
            alt="Airbnb Hosting Services"
            width={400}
            height={250} // Adjust to fit your layout
            style={styles.cardImage}
          />
          <h2 style={styles.cardTitle}>Lima Airshow</h2>
          <p style={styles.cardDescription}>
            This time around we will show you the inside of the airshow in
            Langkawi
          </p>
          <a href="/articles" style={styles.cardLink}>
            Read More
          </a>
        </div>
      </div>

      <hr style={styles.hr} />

      {/* About Me Section */}
      <div style={styles.aboutMeContainer}>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/izzuddin_with_cessna172.png?alt=media&token=7e94ff25-7423-45a9-9c2b-c9d4285feef9"
          alt="About Me"
          width={400}
          height={250} // Adjust to fit your layout
          style={styles.aboutMeImage}
        />
        <div style={styles.aboutMeText}>
          <h2 style={{ ...styles.sectionTitle, textAlign: "left" }}>
            About Me
          </h2>
          <p style={{ fontSize: "1.1em", color: "#444", lineHeight: "1.6" }}>
            Hi, I am Izzuddin, a passionate aviation enthusiast who loves flying
            small aircraft and exploring the skies of Malaysia. I created this
            site to share my flying stories, tips for aspiring pilots, and cool
            general aviation content. Whether you are a fellow aviator or just
            curious about the world above, you are in the right place.
          </p>

          {/* Instagram Thumbnails */}
          <div style={styles.instagramThumbnails}>
            {/* Instagram iframe thumbnails */}
            <iframe
              src="https://www.instagram.com/p/DDMZ7kMP3xP/embed"
              title="Instagram Post 1"
              style={styles.instagramIframe}
              frameBorder="0"
            />
            <iframe
              src="https://www.instagram.com/p/DGZtoAsPUhw/embed"
              title="Instagram Post 2"
              style={styles.instagramIframe}
              frameBorder="0"
            />
            <iframe
              src="https://www.instagram.com/p/C11kbjCvQ7F/embed"
              title="Instagram Post 3"
              style={styles.instagramIframe}
              frameBorder="0"
            />
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
    </div>
  );
}
