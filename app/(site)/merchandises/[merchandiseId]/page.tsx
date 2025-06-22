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
  console.log(merchandiseId)
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const id = Array.isArray(merchandiseId) ? merchandiseId[0] : merchandiseId;
    if (!id) return;

    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const data = productSnap.data();
        const images = [data.image_1, data.image_2, data.image_3].filter(Boolean);

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

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="page-container">
      
      <h1>{productData.title}</h1>
      <p>{productData.description}</p>
      <p>RM {productData.price}</p>

      <div>
        <h4>Select Size:</h4>
        {["1", "2", "3"].map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor: selectedSize === size ? "#000" : "#eee",
              color: selectedSize === size ? "#fff" : "#000",
            }}
          >
            {size}
          </button>
        ))}
      </div>

      <div>
        <h4>Quantity:</h4>
        <select
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAddToCart} style={{ marginTop: "20px" }}>
        Order via WhatsApp
      </button>
    </div>
  );
};

export default ProductPage;
