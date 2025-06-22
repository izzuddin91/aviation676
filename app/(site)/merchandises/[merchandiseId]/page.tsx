"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../clientApp";
import "@/app/merchandise.module.css";

interface ProductData {
  title: string;
  price: number;
  features: string[];
  images: string[];
  description: string;
}

const ProductPage: React.FC = () => {
  const { merchandiseId } = useParams();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
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
    const message = `Hello, I would like to order:\n- Product: ${productData?.title || 'Unknown'}\n- Size: ${selectedSize || 'Not selected'}\n- Quantity: ${selectedQuantity}`;
    const whatsappLink = `https://wa.me/+60192884021?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
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
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Image Carousel */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          marginBottom: "30px",
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
              }}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info" style={{ textAlign: "left" }}>
        <h1 style={{ fontSize: "26px", marginBottom: "10px" }}>{productData.title}</h1>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>{productData.description}</p>
        <p style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}>RM {productData.price}</p>

        {/* <div style={{ marginBottom: "20px" }}>
          <h4>Select Size:</h4>
          {["1", "2", "3"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              style={{
                margin: "5px",
                padding: "10px 14px",
                backgroundColor: selectedSize === size ? "#000" : "#eee",
                color: selectedSize === size ? "#fff" : "#000",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {size}
            </button>
          ))}
        </div> */}

        {/* <div style={{ marginBottom: "20px" }}>
          <h4>Quantity:</h4>
          <select
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div> */}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleAddToCart}
            style={{
              marginTop: "20px",
              padding: "14px 30px",
              backgroundColor: "black",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
