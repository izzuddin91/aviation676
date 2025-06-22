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
      <h1 className={styles.pageTitle}>Item to sell</h1>
      <div className={styles.productCard}>
        {/* T-shirt Image */}
        <div className={styles.productImage}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FdcHeadset_1.jpeg?alt=media&token=705fdde9-3291-4591-b6ba-64a02f9e1a0e" // Make sure to place the image in the public folder
            alt="David Clark Headset"
            width={300}
            height={400}
          />
        </div>

        {/* T-shirt Details */}
        <div className={styles.productDetails}>
          <h2 className={styles.productTitle}>David Clark Headset</h2>
          <p className={styles.productDescription}>
            Recently used by a fellow student pilot who have already graduated. Model H10-13.4
          </p>
          <p className={styles.productPrice}>RM1000</p>

          {/* Buy Now Button */}
          <button
            onClick={() => handleProductClick("l9irymcJ3nPUj4Myc2Xn")}
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
