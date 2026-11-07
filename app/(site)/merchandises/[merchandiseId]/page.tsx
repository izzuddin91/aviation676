"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { fetchProduct } from "../../service/firebase.service";
import styles from "./merchandiseDetail.module.css";

interface ProductData {
  title: string;
  price: number;
  features: string[];
  images: string[];
  description: string;
}

const placeholderVariants = ["Option A", "Option B", "Option C"];

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { merchandiseId } = useParams();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [quantities, setQuantities] = useState([1, 1, 1]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    const id = Array.isArray(merchandiseId) ? merchandiseId[0] : merchandiseId;
    if (!id) return;

    const loadProduct = async () => {
      const product = await fetchProduct(id);
      if (product) setProductData(product);
    };

    loadProduct();
  }, [merchandiseId]);

  const handleAddToCart = () => {
    const message = `Hello, I would like to order:\n- Product: ${productData?.title || "Unknown"}`;
    const whatsappLink = `https://wa.me/60132711668?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const handleAddVariantToCart = (index: number) => {
    const quantity = quantities[index] || 1;
    setCartSubtotal((subtotal) => subtotal + Number(productData?.price || 0) * quantity);
  };

  const handleShare = async () => {
    if (!productData) return;

    try {
      if (navigator.share) {
        await navigator.share({ title: productData.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link copied");
      }
    } catch {
      setShareMessage("Unable to share right now");
    }
  };

  const changeImage = (direction: 1 | -1) => {
    const imageCount = productData?.images.length || 0;
    if (imageCount < 2) return;

    setIsTransitioning(true);
    window.setTimeout(() => {
      setCurrentImage((current) => (current + direction + imageCount) % imageCount);
      setIsTransitioning(false);
    }, 220);
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <main className={styles.page}>
      <button className={styles.backButton} onClick={() => router.back()}>
        <span aria-hidden="true">←</span> Back to products
      </button>

      <div className={styles.productGrid}>
        <section className={styles.gallery} aria-label="Product images">
          <div className={styles.imageFrame}>
            {productData.images.length > 0 ? (
              <img
                className={`${styles.productImage} ${isTransitioning ? styles.fading : ""}`}
                src={productData.images[currentImage]}
                alt={`${productData.title}, image ${currentImage + 1}`}
              />
            ) : (
              <div className={styles.imagePlaceholder}>Image unavailable</div>
            )}
            {productData.images.length > 1 && (
              <>
                <button
                  className={`${styles.carouselButton} ${styles.previous}`}
                  onClick={() => changeImage(-1)}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  className={`${styles.carouselButton} ${styles.next}`}
                  onClick={() => changeImage(1)}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>
          {productData.images.length > 1 && (
            <div className={styles.thumbnails} aria-label="Choose product image">
              {productData.images.map((image, index) => (
                <button
                  className={`${styles.thumbnail} ${currentImage === index ? styles.activeThumbnail : ""}`}
                  key={`${image}-${index}`}
                  onClick={() => setCurrentImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={currentImage === index}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className={styles.summary}>
          <p className={styles.eyebrow}>AVIATION676 / PRODUCTS</p>
          <h1 className={styles.title}>{productData.title}</h1>
          <div className={styles.reviewSummary}>
            <span className={styles.starRating} aria-label="No customer ratings yet">☆☆☆☆☆</span>
            <a href="#reviews">0 Reviews</a>
            <a href="#qa">0 Answered Questions</a>
          </div>
          <div className={styles.purchaseRow}>
            <p className={styles.price}>
              RM {Number(productData.price).toLocaleString("en-MY", { minimumFractionDigits: 2 })}
            </p>
            <button className={styles.orderButton} onClick={handleAddToCart}>
              <FaShoppingCart aria-hidden="true" />
              Order via WhatsApp
            </button>
          </div>
          <p className={styles.priceRange}>Option price range: <span>From RM -- to RM --</span></p>
          <div className={styles.shareRow}>
            <strong>SHARE</strong>
            <button type="button" onClick={handleShare}>Share product</button>
            <button type="button" onClick={() => setIsWishlisted((saved) => !saved)}>
              {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>
            <span role="status">{shareMessage}</span>
          </div>
        </section>
      </div>

      <section className={styles.variants} id="options">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>ORDERING</p>
            <h2>Available Options</h2>
          </div>
          <p className={styles.placeholderNote}>Option details are placeholders and can be replaced with product-specific data.</p>
        </div>
        <div className={styles.tableScroller}>
          <table className={styles.variantTable}>
            <thead>
              <tr>
                <th>Model #</th>
                <th>Diameter</th>
                <th>Engine Application</th>
                <th>Horsepower</th>
                <th>Mounting Bolts</th>
                <th>Part Number</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Buy</th>
              </tr>
            </thead>
            <tbody>
              {placeholderVariants.map((variant, index) => (
                <tr key={variant}>
                  <td>{variant}</td>
                  <td>To be added</td>
                  <td>To be added</td>
                  <td>To be added</td>
                  <td>To be added</td>
                  <td>Pending</td>
                  <td>RM {Number(productData.price).toFixed(2)}</td>
                  <td>
                    <input
                      aria-label={`${variant} quantity`}
                      type="number"
                      min="1"
                      value={quantities[index]}
                      onChange={(event) => {
                        const quantity = Math.max(1, Number(event.target.value) || 1);
                        setQuantities((current) => current.map((value, row) => row === index ? quantity : value));
                      }}
                    />
                  </td>
                  <td>
                    <button className={styles.tableAction} type="button" onClick={() => handleAddVariantToCart(index)}>
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={styles.subtotal}>Subtotal <strong>RM {cartSubtotal.toFixed(2)}</strong></p>
      </section>

      <nav className={styles.jumpNav} aria-label="Jump to product information">
        <strong>JUMP TO</strong>
        <a href="#overview">Overview</a>
        <a href="#construction">Construction</a>
        <a href="#specifications">Specifications</a>
        <a href="#documents">Documents</a>
        <a href="#reviews">Reviews</a>
        <a href="#qa">Q&amp;A</a>
        <a href="#catalog">View in Catalog</a>
      </nav>

      <div className={styles.productSections}>
        <section className={styles.contentSection} id="overview">
          <h2>Overview</h2>
          <p>{productData.description || "Product overview placeholder. Add the product description here."}</p>
        </section>

        <section className={styles.contentSection} id="construction">
          <h2>Construction</h2>
          <p>Construction and material information placeholder. Add verified product details here.</p>
        </section>

        <section className={styles.contentSection} id="specifications">
          <h2>Specifications</h2>
          {productData.features.length > 0 ? (
            <ul className={styles.specificationList}>
              {productData.features.map((feature, index) => <li key={`${feature}-${index}`}>{feature}</li>)}
            </ul>
          ) : (
            <dl className={styles.specificationList}>
              <div><dt>Engine type</dt><dd>To be added</dd></div>
              <div><dt>Maximum RPM</dt><dd>To be added</dd></div>
              <div><dt>Number of blades</dt><dd>To be added</dd></div>
              <div><dt>System weight</dt><dd>To be added</dd></div>
              <div><dt>Standard finish</dt><dd>To be added</dd></div>
            </dl>
          )}
        </section>

        <section className={styles.contentSection} id="documents">
          <h2>Documents</h2>
          <ul className={styles.documentList}>
            <li>Spec sheet <span>Coming soon</span></li>
            <li>Owner&apos;s manual <span>Coming soon</span></li>
          </ul>
        </section>

        <section className={styles.contentSection} id="reviews">
          <h2>Reviews</h2>
          <div className={styles.reviewPanel}>
            <div className={styles.reviewStars} aria-label="No reviews yet, zero out of five stars">☆☆☆☆☆</div>
            <p>No reviews yet</p>
            <button type="button" disabled>Submit a Review</button>
          </div>
        </section>

        <section className={styles.contentSection} id="qa">
          <h2>Q&amp;A</h2>
          <p>No questions yet. Product questions will appear here.</p>
          <div className={styles.questionForm}>
            <input aria-label="Ask a product question" placeholder="Have a question?" disabled />
            <button type="button" disabled>Submit</button>
          </div>
        </section>

        <section className={styles.contentSection} id="catalog">
          <h2>View in Catalog</h2>
          <p>Catalog link placeholder.</p>
          <button type="button" disabled>Catalog link coming soon</button>
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
