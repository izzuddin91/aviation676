"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VideoBackground from "@/app/component/VideoBackground";
import { getLatestThreeArticle } from "../service/firebase.service";

// Translation data
const translations = {
  en: {
    sectionTitle: "Welcome to Our Services",
    sectionDescription:
      "Explore our premium services, from luxurious private jet charters to top-tier Airbnb experiences.",
    jetTitle: "Private Charter Jet Service",
    jetDescription:
      "Offering luxury private jet charter services for business and leisure. Fly anywhere with comfort and personalized service.",
    airbnbTitle: "Luxurious Airbnb Stays",
    airbnbDescription:
      "Enjoy a top-tier Airbnb experience with beautifully managed homes in premium locations. Exceptional service and comfort guaranteed.",
    hostingTitle: "Airbnb Hosting Services",
    hostingDescription:
      "Let us manage your property on Airbnb. We take care of everything, from listing to guest services, so you earn more effortlessly.",
    contactButton: "Contact Us",
  },
  th: {
    sectionTitle: "ยินดีต้อนรับสู่บริการของเรา",
    sectionDescription:
      "สำรวจบริการระดับพรีเมียมของเรา ตั้งแต่การเช่าเหมาลำเครื่องบินเจ็ตสุดหรู ไปจนถึงประสบการณ์ Airbnb ระดับสูงสุด",
    jetTitle: "บริการเช่าเหมาลำเครื่องบินเจ็ต",
    jetDescription:
      "ให้บริการเช่าเหมาลำเครื่องบินเจ็ตหรูสำหรับธุรกิจและการพักผ่อน บินได้ทุกที่ด้วยความสะดวกสบายและการบริการส่วนตัว",
    airbnbTitle: "ที่พัก Airbnb ระดับหรู",
    airbnbDescription:
      "เพลิดเพลินกับประสบการณ์ Airbnb ระดับสูงสุด ด้วยบ้านที่จัดการอย่างดีในทำเลพรีเมียม พร้อมการบริการที่ยอดเยี่ยม",
    hostingTitle: "บริการจัดการที่พัก Airbnb",
    hostingDescription:
      "ให้เราจัดการทรัพย์สินของคุณบน Airbnb เราจัดการทุกอย่าง ตั้งแต่การลงประกาศไปจนถึงการบริการแขก เพื่อให้คุณทำรายได้อย่างง่ายดาย",
    contactButton: "ติดต่อเรา",
  },
};

export default function Articles() {
  const router = useRouter();
  const [articles, updateArticles]: any = useState([{}]);
  const [language, setLanguage] = useState<"en" | "th">("en");

  // Translation function
  const t = (key: string) => translations[language][key as keyof typeof translations.en];

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
    sectionTitle: { textAlign: "center" as const, fontSize: "2em", margin: "20px 0 10px", color: "#333" },
    sectionDescription: { textAlign: "center" as const, fontSize: "1.2em", color: "#666", margin: "0 20px 20px" },
    hr: { border: "none", borderTop: "1px solid #ddd", margin: "30px auto", width: "80%" },
    videoContainer: { display: "flex", justifyContent: "center" as const, margin: "20px 0" },
    iframe: { border: "none", borderRadius: "10px", width: "560px", height: "315px" },
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
    cardDescription: { fontSize: "1em", padding: "0 15px", marginBottom: "15px" },
    cardLink: { display: "inline-block", margin: "10px 0", color: "#007BFF", textDecoration: "none", fontWeight: "bold" },
    bottomBar: {
      position: "fixed" as const,
      bottom: 0,
      left: 0,
      width: "100%",
      backgroundColor: "#023020",
      color: "#fff",
      textAlign: "center" as const,
      padding: "10px 0",
      boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
    },
    contactButton: {
      backgroundColor: "#fff",
      color: "#023020",
      border: "none",
      borderRadius: "5px",
      padding: "10px 20px",
      fontSize: "1em",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div>
      {/* Language Switcher */}
      <div style={{ textAlign: "right", padding: "10px" }}>
        <button onClick={() => setLanguage("en")}>EN</button> |{" "}
        <button onClick={() => setLanguage("th")}>TH</button>
      </div>

      <VideoBackground />

      <div style={styles.paddingContainer}>
        <h1 style={styles.sectionTitle}>{t("sectionTitle")}</h1>
        <p style={styles.sectionDescription}>{t("sectionDescription")}</p>
      </div>

      <hr style={styles.hr} />

      <div style={styles.videoContainer}>
        <iframe
          src="https://www.youtube.com/embed/dkFlA_KfDAI"
          title="YouTube Video"
          style={styles.iframe}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <hr style={styles.hr} />

      {/* Cards */}
      <div className="cardsContainer" style={styles.paddingContainer}>
        <div style={styles.card}>
          <img
            src="https://i.pinimg.com/originals/36/e6/a2/36e6a2c6682fda658e49483b2dbd7eed.jpg"
            alt="Charter Jet Service"
            style={styles.cardImage}
          />
          <h2 style={styles.cardTitle}>{t("jetTitle")}</h2>
          <p style={styles.cardDescription}>{t("jetDescription")}</p>
          <a href="#more" style={styles.cardLink}>
            Read More
          </a>
        </div>

        <div style={styles.card}>
          <img
            src="https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1100"
            alt="Airbnb Business"
            style={styles.cardImage}
          />
          <h2 style={styles.cardTitle}>{t("airbnbTitle")}</h2>
          <p style={styles.cardDescription}>{t("airbnbDescription")}</p>
          <a href="/airbnbHouses" style={styles.cardLink}>
            Read More
          </a>
        </div>

        <div style={styles.card}>
          <img
            src="https://www.simons-voss.com/_Resources/Persistent/e/5/b/5/e5b530f3b694693558f73ee296961add7ebc27f5/schluesseluebergabe-wohnung.jpg"
            alt="Airbnb Hosting Services"
            style={styles.cardImage}
          />
          <h2 style={styles.cardTitle}>{t("hostingTitle")}</h2>
          <p style={styles.cardDescription}>{t("hostingDescription")}</p>
          <a href="/articles" style={styles.cardLink}>
            Read More
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={styles.bottomBar}>
        <button
          style={styles.contactButton}
          onClick={() => router.push("/contact")}
        >
          {t("contactButton")}
        </button>
      </div>
    </div>
  );
}
