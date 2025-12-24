"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../clientApp";
import { FaShoppingCart } from "react-icons/fa";
import "@/app/merchandise.module.css";
import { useRouter } from "next/navigation"; // add this import at top

interface ProductData {
  title: string;
  price: number;
  features: string[];
  images: string[];
  description: string;
}

const ProductPage: React.FC = () => {
  const router = useRouter(); // initialize router
  const { merchandiseId } = useParams();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    
    const id = Array.isArray(merchandiseId) ? merchandiseId[0] : merchandiseId;
    if (!id) return;

    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const data = productSnap.data();
        const images = [data.image_1, data.image_2, data.image_3, data.image_4].filter(Boolean);

        setProductData({
          title: data.title,
          price: data.price,
          features: data.features || [],
          images,
          description: data.description || "",
        });
      } else {
        console.error("Product not found.");
      }
    };

    fetchProduct();
  }, [merchandiseId]);

  const handleAddToCart = () => {
    const message = `Hello, I would like to order:\n- Product: ${productData?.title || "Unknown"}`;
    const whatsappLink = `https://wa.me/+60192884021?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % (productData?.images?.length || 1));
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) =>
        (prev - 1 + (productData?.images?.length || 1)) % (productData?.images?.length || 1)
      );
      setIsTransitioning(false);
    }, 500);
  };

  if (!productData) return <div>Loading...</div>;

  return (
    
    <div
      className="page-container"
      style={{
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
            {/* Back Button */}
      <button
        onClick={() => router.back()}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          fontSize: "16px",
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>
            <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          flexWrap: "wrap", // allows wrapping on mobile
        }}
      >
        {/* Left: Image Carousel */}
        {/* ... rest of your carousel code */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          flexWrap: "wrap", // allows wrapping on mobile
        }}
      >
        {/* Left: Image Carousel */}
        <div
          style={{
            flex: "1 1 400px",
            minWidth: "300px",
            position: "relative",
            textAlign: "center",
          }}
        >
          <img
            src={productData.images[currentImage]}
            alt="Product"
            style={{
              maxWidth: "100%",
              maxHeight: "520px",
              objectFit: "contain",
              margin: "0 auto",
              display: "block",
              opacity: isTransitioning ? 0.5 : 1,
              transition: "opacity 0.5s ease-in-out",
              borderRadius: "8px",
            }}
          />
          <button
            onClick={handlePrevious}
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              fontSize: "24px",
              background: "rgba(255,255,255,0.7)",
              border: "none",
              borderRadius: "50%",
              padding: "8px",
              cursor: "pointer",
            }}
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              fontSize: "24px",
              background: "rgba(255,255,255,0.7)",
              border: "none",
              borderRadius: "50%",
              padding: "8px",
              cursor: "pointer",
            }}
          >
            ▶
          </button>

          {/* Thumbnails */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {productData.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => setCurrentImage(idx)}
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  margin: "5px",
                  border: currentImage === idx ? "2px solid black" : "1px solid #ccc",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
<div
  style={{
    flex: "1 1 400px",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  }}
>
  <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>{productData.title}</h1>
  <p style={{ fontSize: "16px", marginBottom: "12px" }}>{productData.description}</p>

  {/* Price + Add to Cart Inline */}
{/* Price + Add to Cart Inline */}
<div
  style={{
    display: "flex",
    alignItems: "stretch", // stretch both items to same height
    gap: "16px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
  {/* Price with black outline */}
  <span
    style={{
      fontSize: "22px",
      fontWeight: "bold",
      padding: "0 12px",
      border: "1px solid black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "48px", // ensures uniform height
    }}
  >
    RM {productData.price}
  </span>

  {/* Add to Cart button */}
  <button
    onClick={handleAddToCart}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 20px",
      backgroundColor: "#007BFF",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "0px", // square corners
      cursor: "pointer",
      minHeight: "48px", // same height as price
    }}
  >
    <FaShoppingCart style={{ marginRight: "8px" }} /> Add to Cart
  </button>
</div>


  {productData.features.length > 0 && (
    <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
      {productData.features.map((feature, idx) => (
        <li key={idx} style={{ marginBottom: "6px" }}>
          {feature}
        </li>
      ))}
    </ul>
  )}
</div>

      </div>
    </div>
  );
};

export default ProductPage;
