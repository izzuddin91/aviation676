"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLatestThreeArticle } from "../service/firebase.service";
import VideoBackground from "@/app/component/VideoBackground";

export default function Articles() {
  const router = useRouter();
  const [articles, updateArticles]: any = useState([{}]);

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
    card: {
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    } as React.CSSProperties, // Cast styles.cardImage to React.CSSProperties
    cardTitle: {
      fontSize: "1.5em",
      margin: "15px 0",
    },
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
    cardHover: {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div>
      <VideoBackground />
      <div className="cardsContainer">
        <div className="card">
          <img
            src="https://i.pinimg.com/originals/36/e6/a2/36e6a2c6682fda658e49483b2dbd7eed.jpg"
            alt="Charter Jet Service"
            style={styles.cardImage}
          />
          <h2 style={styles.cardTitle}>Private Charter Jet Service</h2>
          <p style={styles.cardDescription}>
            Offering luxury private jet charter services for business and
            leisure. Fly anywhere with comfort and personalized service.
          </p>
          <a href="#more" style={styles.cardLink}>
            Read More
          </a>
        </div>

        <div className="card">
          <img
            src="https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1100"
            alt="Airbnb Business"
            style={styles.cardImage}
          />
          <h2 style={styles.cardTitle}>Luxurious Airbnb Stays</h2>
          <p style={styles.cardDescription}>
            Enjoy a top-tier Airbnb experience with beautifully managed homes in
            premium locations. Exceptional service and comfort guaranteed.
          </p>
          <a href="/airbnbHouses" style={styles.cardLink}>
            Read More
          </a>
        </div>

        <div className="card">
          <img
            src="https://www.simons-voss.com/_Resources/Persistent/e/5/b/5/e5b530f3b694693558f73ee296961add7ebc27f5/schluesseluebergabe-wohnung.jpg"
            alt="Airbnb Hosting Services"
            style={styles.cardImage}
          />
          <h2 style={styles.cardTitle}>
            Airbnb Hosting Services for Homeowners
          </h2>
          <p style={styles.cardDescription}>
            Let us manage your property on Airbnb. We take care of everything,
            from listing to guest services, so you earn more effortlessly.
          </p>
          <a href="/articles" style={styles.cardLink}>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
