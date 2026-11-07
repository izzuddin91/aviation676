// pages/merchandise.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List, Star } from "lucide-react";
import { getAllProducts } from "../service/firebase.service";
import styles from "./merchandiseCatalog.module.css";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "title-asc" | "title-desc";
type ViewMode = "grid" | "list";

const parsePrice = (value: unknown): number => {
  const priceMatch = String(value ?? "").match(/-?\d[\d,]*(?:\.\d+)?/);
  const parsed = typeof value === "number"
    ? value
    : Number(priceMatch?.[0].replace(/,/g, "") || 0);

  return Number.isFinite(parsed) ? parsed : 0;
};

const ProductsPage: React.FC = () => {
  // Fetch products from Firestore (falls back to empty list while loading)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      try {
        setLoading(true);
        const items = await getAllProducts();
        if (!mounted) return;

        // Map Firestore product shape into the Product interface used by this page
        const mapped: Product[] = items.map((p: any) => ({
          id: p.id,
          title: p.title || "Untitled",
          price: parsePrice(p.price),
          image: p.imageUrl || p.image_1 || p.image1 || "",
          description: p.description || "",
          rating: Number(p.averageRating ?? p.rating ?? 0),
          reviewCount: Number(p.reviewCount ?? p.reviewsCount ?? 0),
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const sortedProducts = [...products].sort((first, second) => {
    if (sortOption === "price-asc") return first.price - second.price;
    if (sortOption === "price-desc") return second.price - first.price;
    if (sortOption === "title-asc") return first.title.localeCompare(second.title);
    if (sortOption === "title-desc") return second.title.localeCompare(first.title);
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <main className={styles.catalogPage}>
      <div className={styles.catalogInner}>
        <header className={styles.catalogHeader}>
          <p className={styles.eyebrow}>AVIATION676 CATALOG</p>
          <h1>Products</h1>
          <p>Aircraft equipment, accessories, and essentials.</p>
        </header>

        <div className={styles.catalogToolbar}>
          <p className={styles.resultCount}>{sortedProducts.length} products</p>
          <div className={styles.catalogControls}>
            <label htmlFor="product-sort">Sort by</label>
            <select
              id="product-sort"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as SortOption)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Title: A-Z</option>
              <option value="title-desc">Title: Z-A</option>
            </select>
            <div className={styles.viewToggle} role="group" aria-label="Product layout">
              <button
                type="button"
                aria-label="Grid view"
                title="Grid view"
                aria-pressed={viewMode === "grid"}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="List view"
                title="List view"
                aria-pressed={viewMode === "list"}
                onClick={() => setViewMode("list")}
              >
                <List size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className={`${styles.productGrid} ${viewMode === "list" ? styles.listView : ""}`}>
          {sortedProducts.map((product, index) => {
            const rating = Number.isFinite(product.rating) ? Math.min(5, Math.max(0, product.rating)) : 0;
            const filledStars = Math.round(rating);

            return (
              <Link key={product.id} href={`/merchandises/${product.id}`} className={styles.productCard}>
                <div className={styles.imageFrame}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 25vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      className={styles.productImage}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>Image unavailable</div>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <h2>{product.title}</h2>
                  <div className={styles.rating} aria-label={rating ? `${rating.toFixed(1)} out of 5 stars` : "No reviews yet"}>
                    <span className={styles.stars} aria-hidden="true">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} size={15} fill={index < filledStars ? "currentColor" : "none"} />
                      ))}
                    </span>
                    <span>{product.reviewCount > 0 ? `${rating.toFixed(1)} (${product.reviewCount})` : "No reviews"}</span>
                  </div>
                  <p className={styles.price}>RM {product.price.toLocaleString("en-MY", { minimumFractionDigits: 2 })}</p>
                  {product.description && <p className={styles.description}>{product.description}</p>}
                  <span className={styles.detailsLink}>View product details <span aria-hidden="true">→</span></span>
                </div>
              </Link>
            );
          })}
          {sortedProducts.length === 0 && (
            <p className={styles.emptyState}>No products are available right now.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
