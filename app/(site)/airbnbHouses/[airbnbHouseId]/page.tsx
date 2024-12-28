"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // For accessing URL params
// Import the function to get house details
import "@/app/AirbnbHouseDetails.css";
import { getHouse } from "../../service/firebase.service";

interface ProductData {
  title: string;
  description: string;
  house_image: string;
  images: string[];
}

const ProductPage: React.FC = () => {

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const params = useParams();
  useEffect(() => {

    const fetchProductData = async () => {
      if (params) {

        try {
          const houseData = await getHouse(params["airbnbHouseId"].toString()

          );
          setProductData({
            title: houseData.houseName,
            description: houseData.description,
            house_image: houseData.house_image,
            images: [houseData.house_image, houseData.house_image, houseData.house_image], // Repeat the image 3 times
          });
        } catch (error) {
          console.error("Error fetching house data", error);
        }
      }
    };

    fetchProductData();
  }, []); // Fetch house data when productId changes

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % (productData?.images.length || 1));
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(
        (prev) => (prev - 1 + (productData?.images.length || 1)) % (productData?.images.length || 1)
      );
      setIsTransitioning(false);
    }, 500);
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="page-container">
      {/* Image and Product Info Side by Side */}
      <div className="image-and-info">
        {/* Image Slider */}
        <div className="image-slider">
          <img
            src={productData.images[currentImage] || "/images/default.jpg"}
            alt="House"
            className="product-image"
          />
          <button onClick={handlePrevious} className="arrow-button left-arrow">
            &lt;
          </button>
          <button onClick={handleNext} className="arrow-button right-arrow">
            &gt;
          </button>
          {/* Thumbnails */}
          <div className="thumbnail-container">
            {productData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${currentImage === index ? "active" : ""}`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div id="product-info">
          <h1 className="product-title">{productData.title}</h1>
          <p className="product-description">{productData.description}</p>

          {/* Highlights Box */}
          <div className="highlights-box">
            <h2>Highlights</h2>
            <div className="highlights-icons">
              <div className="highlight-item">
                <span>Free Shuttle Van</span>
              </div>
              <div className="highlight-item">
                <span>Near Train Station</span>
              </div>
              <div className="highlight-item">
                <span>Secure Parking</span>
              </div>
            </div>
          </div>

          {/* Airbnb Link Button */}
          <div className="airbnb-link-container">
            <button
              className="airbnb-button"
              onClick={() => window.open("https://www.airbnb.com", "_blank")}
            >
              Airbnb Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
