// pages/merchandise.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/merchandise.module.css"; // Add custom styles

const Merchandises: React.FC = () => {
  const router = useRouter();
  const handleProductClick = (merchandiseId: string) => {
    console.log(merchandiseId)
    router.push(`/merchandises/${merchandiseId}`);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Merchandise</h1>
      <div className={styles.productCard}>
        {/* T-shirt Image */}
        <div className={styles.productImage}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/cessna172%20shirt.webp?alt=media&token=b76a5ff1-4ba6-486b-b7a0-085dd80961d0" // Make sure to place the image in the public folder
            alt="Aviation 676 T-shirt"
            width={300}
            height={400}
          />
        </div>

        {/* T-shirt Details */}
        <div className={styles.productDetails}>
          <h2 className={styles.productTitle}>Aviation 676 T-Shirt</h2>
          <p className={styles.productDescription}>
            A premium cotton T-shirt with a bold logo, perfect for aviation
            enthusiasts. Lightweight and comfortable, it is the ideal addition
            to your wardrobe.
          </p>
          <p className={styles.productPrice}>$29.99</p>

          {/* Buy Now Button */}
          <button
            onClick={() => handleProductClick("l9irymcJ3nPUj4Myc2Xn")}
            className={styles.buyNowButton}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Merchandises;
