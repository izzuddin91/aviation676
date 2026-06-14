"use client";
import ProductTile from "@/app/component/productTiles/productTiles";
import React, { useState, useEffect } from "react";
import { trackPageView } from "@/app/(site)/service/analytics.service";
import { getAllProducts } from "@/app/(site)/service/firebase.service";

interface ProductItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  isSoldOut: boolean;
}

const ProductList: React.FC = () => {
  const [sortOption, setSortOption] = useState("featured");
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track page view when products page loads
    trackPageView("Products", "/products");
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const prods = await getAllProducts();
        const mapped: ProductItem[] = prods.map((p: any) => ({
          id: p.id,
          title: p.title || "Untitled",
          price: Number(p.price || 0),
          imageUrl: p.imageUrl || p.image_1 || "/images/placeholder.png",
          isSoldOut: !!p.isSoldOut,
        }));
        setProducts(mapped);
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSortOption(option);

    const sortedProducts = [...products].sort((a: ProductItem, b: ProductItem) => {
      if (option === "priceLowToHigh") return a.price - b.price;
      if (option === "priceHighToLow") return b.price - a.price;
      if (option === "alphabetical") return a.title.localeCompare(b.title);
      return 0;
    });

    setProducts(sortedProducts);
  };

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Loading products...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Title and Sort Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">New Collection</h2>
        <div>
          <label htmlFor="sort" className="mr-2 text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:border-gray-400"
          >
            <option value="featured">Featured</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductTile key={product.id} product={product as any} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
