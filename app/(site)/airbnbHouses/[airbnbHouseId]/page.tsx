"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "@/app/AirbnbHouseDetails.css";

interface ProductData {
  title: string;
  description: string;
  images: string[];
}

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Mock data to simulate fetching product details
    const mockProductData: ProductData = {
      title: "Modern City-Center Retreat: A Spacious Home with Easy Access to Everything",
      description: "Discover the perfect blend of comfort and convenience in this beautifully appointed home, ideally located in the heart of the city. Enjoy quick and easy access to all the vibrant attractions, restaurants, shops, and transportation options the city has to offer. Whether you're visiting for work or leisure, this home offers a cozy and accessible retreat that puts you right where the action is. With ample space, modern amenities, and an unbeatable location, it’s the perfect base for your urban getaway.",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FTrion_%40%20KLbKViazj3szhlNjl2CiVI_2023-September-18.jpg?alt=media&token=d5720489-6534-4762-9fed-931113c9127c",
        "https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FTrion_%40%20KLbKViazj3szhlNjl2CiVI_2023-September-18.jpg?alt=media&token=d5720489-6534-4762-9fed-931113c9127c",
        "https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Fmap.png?alt=media&token=4d1cee76-7e0a-4552-994f-269403abc420",
      ],
    };
    setProductData(mockProductData);
  }, [productId]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(
        (prev) => (prev + 1) % (productData?.images?.length || 1)
      );
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage(
        (prev) =>
          (prev - 1 + (productData?.images?.length || 1)) %
          (productData?.images?.length || 1)
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
            src={productData.images?.[currentImage] || "/images/default.jpg"}
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
            {productData.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${
                  currentImage === index ? "active" : ""
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
{/* Product Info */}
<div id="product-info">
  <h1 className="product-title">{productData.title || "House Title"}</h1>
  <p className="product-description">
    {productData.description ||
      "Discover the perfect blend of comfort and convenience in this beautifully appointed home, ideally located in the heart of the city. Enjoy quick and easy access to all the vibrant attractions, restaurants, shops, and transportation options the city has to offer. Whether you're visiting for work or leisure, this home offers a cozy and accessible retreat that puts you right where the action is."}
  </p>

  {/* Highlights Box */}
{/* Highlights Box */}
<div className="highlights-box">
  <h2>Highlights</h2>
  <div className="highlights-icons">
    <div className="highlight-item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="highlight-icon"
      >
        <path d="M12 2a7 7 0 0 1 7 7v3.5h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3V9a7 7 0 0 1 7-7zm-4 9.5v1.5h8v-1.5a4 4 0 0 0-8 0zm-3 5h14v5H5v-5z" />
      </svg>
      <span>Free Shuttle Van</span>
    </div>
    <div className="highlight-item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="highlight-icon"
      >
        <path d="M6 22h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V4a2 2 0 1 0-4 0v2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2zm4-16h4v2h-4V6z" />
      </svg>
      <span>Near Train Station</span>
    </div>
    <div className="highlight-item">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="highlight-icon"
      >
        <path d="M12 2a10 10 0 0 1 10 10v2h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h1v-2A10 10 0 0 1 12 2zm-4 13a4 4 0 0 0 8 0H8z" />
      </svg>
      <span>Secure Parking</span>
    </div>
  </div>

</div>
  {/* Airbnb Link Button */}
  <div className="airbnb-link-container">
    <button
      className="airbnb-button"
      onClick={() =>
        window.open("https://www.airbnb.com", "_blank") // Replace with your Airbnb link
      }
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
