// pages/merchandise.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List, Star } from "lucide-react";
import { getAllProducts } from "../service/firebase.service";
import styles from "./merchandiseCatalog.module.css";
import { useLanguage } from "@/app/context/LanguageContext";
import englishMerchandises from "@/public/locales/en/merchandises.json";
import thaiMerchandises from "@/public/locales/th/merchandises.json";

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
  const { language } = useLanguage();
  const copy = language === "th" ? thaiMerchandises : englishMerchandises;
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
          title: p.title || "",
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
        <p className="text-lg text-gray-600">{copy.loading}</p>
      </div>
    );
  }

  return (
    <main className={styles.catalogPage}>
      <div className={styles.catalogInner}>
        <header className={styles.catalogHeader}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.pageTitle}</h1>
          <p>{copy.description}</p>
        </header>

        <div className={styles.catalogToolbar}>
          <p className={styles.resultCount}>
            {copy.resultCount.replace("{{count}}", String(sortedProducts.length))}
          </p>
          <div className={styles.catalogControls}>
            <label htmlFor="product-sort">{copy.sortBy}</label>
            <select
              id="product-sort"
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value as SortOption)}
            >
              <option value="featured">{copy.sortOptions.featured}</option>
              <option value="price-asc">{copy.sortOptions.priceLowToHigh}</option>
              <option value="price-desc">{copy.sortOptions.priceHighToLow}</option>
              <option value="title-asc">{copy.sortOptions.titleAToZ}</option>
              <option value="title-desc">{copy.sortOptions.titleZToA}</option>
            </select>
            <div
              className={styles.viewToggle}
              role="group"
              aria-label={copy.productLayout}
            >
              <button
                type="button"
                aria-label={copy.gridView}
                title={copy.gridView}
                aria-pressed={viewMode === "grid"}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={copy.listView}
                title={copy.listView}
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
                    <div className={styles.imagePlaceholder}>
                      {copy.imageUnavailable}
                    </div>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <h2>{product.title || copy.untitledProduct}</h2>
                  <div
                    className={styles.rating}
                    aria-label={
                      rating
                        ? copy.ratingOutOfFive.replace(
                            "{{rating}}",
                            rating.toFixed(1)
                          )
                        : copy.noReviewsYet
                    }
                  >
                    <span className={styles.stars} aria-hidden="true">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} size={15} fill={index < filledStars ? "currentColor" : "none"} />
                      ))}
                    </span>
                    <span>
                      {product.reviewCount > 0
                        ? `${rating.toFixed(1)} (${product.reviewCount})`
                        : copy.noReviews}
                    </span>
                  </div>
                  <p className={styles.price}>
                    {copy.currencyCode}{" "}
                    {product.price.toLocaleString(
                      language === "th" ? "th-TH" : "en-MY",
                      { minimumFractionDigits: 2 }
                    )}
                  </p>
                  {product.description && <p className={styles.description}>{product.description}</p>}
                  <span className={styles.detailsLink}>
                    {copy.detailsLink} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
          {sortedProducts.length === 0 && (
            <p className={styles.emptyState}>{copy.emptyState}</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
