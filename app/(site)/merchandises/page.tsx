// pages/merchandise.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/merchandise.module.css";

const Merchandises: React.FC = () => {
  const router = useRouter();

  const handleProductClick = (merchandiseId: string) => {
    console.log(merchandiseId);
    router.push(`/merchandises/${merchandiseId}`);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Item to sell</h1>

      {/* Listing 1 */}
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FdcHeadset_1.jpeg?alt=media&token=705fdde9-3291-4591-b6ba-64a02f9e1a0e"
            alt="David Clark H10-13.4 Aviation Headset"
            width={300}
            height={400}
          />
        </div>

        <div className={styles.productDetails}>
          <h2 className={styles.productTitle}>
            David Clark H10-13.4 Aviation Headset
          </h2>
          <p className={styles.productDescription}>
            A trusted classic among student and private pilots. Well-maintained
            and previously used by a fellow pilot who has completed training.
            Known for its reliable passive noise reduction and long-lasting
            cockpit comfort.
          </p>
          <p className={styles.productPrice}>RM1000</p>

          <button
            onClick={() => handleProductClick("l9irymcJ3nPUj4Myc2Xn")}
            className={styles.buyNowButton}
          >
            Details
          </button>
        </div>
      </div>

      {/* Listing 2 */}
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/shirt1.png?alt=media&token=8992b5b1-dee4-402a-b612-50b8e8dc32fb"
            alt="Aviation 676 Tee Jet Logo Edition"
            width={300}
            height={400}
          />
        </div>

        <div className={styles.productDetails}>
          <h2 className={styles.productTitle}>
            Aviation 676 Tee — Jet Logo Edition
          </h2>
          <p className={styles.productDescription}>
            A clean and minimalist aviation-inspired T-shirt featuring the
            Aviation 676 jet logo. Designed for pilots, flight sim enthusiasts,
            and anyone who lives for the skies.
          </p>
          <p className={styles.productPrice}>RM50</p>

          <button
            onClick={() => handleProductClick("shirt-676-1")}
            className={styles.buyNowButton}
          >
            Details
          </button>
        </div>
      </div>

      {/* Listing 3 */}
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/shirt2.png?alt=media&token=8a3815b8-2194-48e9-bf03-aa6966d6b70b"
            alt="Aviation 676 Tee Aircraft Blueprint Edition"
            width={300}
            height={400}
          />
        </div>

        <div className={styles.productDetails}>
          <h2 className={styles.productTitle}>
            Aviation 676 Tee — Aircraft Blueprint Edition
          </h2>
          <p className={styles.productDescription}>
            A technical blueprint-style aircraft illustration made for true
            aviation enthusiasts. Inspired by classic general aviation design
            and crafted to be worn both on and off the airfield.
          </p>
          <p className={styles.productPrice}>RM50</p>

          <button
            onClick={() => handleProductClick("shirt-676-2")}
            className={styles.buyNowButton}
          >
            Details
          </button>
        </div>
      </div>

            {/* Listing 3 */}
      <div className={styles.productCard}>
        <div className={styles.productImage}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/throttle_mixture.png?alt=media&token=788c558c-704a-4958-9796-8544826ae58a"
            alt="Aviation 676 Sim Throttle"
            width={300}
            height={400}
          />
        </div>

        <div className={styles.productDetails}>
          <h2 className={styles.productTitle}>
            Aviation 676 Sim Throttle
          </h2>
          <p className={styles.productDescription}>
          A (kind of) realistic Cessna 172 throttle and mixture for flight simulators. Perfect for student who want a sense of realism when practicing touch and go on the simulator.
          </p>
          <p className={styles.productPrice}>RM350</p>

          <button
            onClick={() => handleProductClick("F7PoBhY2X95zI27lYgqH")}
            className={styles.buyNowButton}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Merchandises;
