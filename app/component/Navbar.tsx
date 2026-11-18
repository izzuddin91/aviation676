"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/app/Navbar.module.css";
import { useAuth } from "@/app/context/AuthContext";
import { logoutAction } from "@/app/actions/session";
import { Menu, X } from "lucide-react"; // <-- for hamburger icons
import { useLanguage } from "@/app/context/LanguageContext";
import englishNavbar from "@/public/locales/en/navbar.json";
import thaiNavbar from "@/public/locales/th/navbar.json";

const Navbar = () => {
  const { isAuthenticated, user, logoutLocal } = useAuth();
  const { language, setLanguage } = useLanguage();
  const copy = language === "th" ? thaiNavbar : englishNavbar;
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false); // ✅ mobile menu toggle

  const handleLogout = async () => {
    await logoutAction();
    logoutLocal();
    router.push("/signin");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.navLogo}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/aviation676-939b4.firebasestorage.app/o/A676Logo.png?alt=media&token=39e2e4ec-0e60-4bf7-810b-94a33df65077"
            alt="Aviation 676"
            className={styles.logoImage}
            style={{ width: "110px" }}
          />
        </Link>

        {/* ✅ Hamburger icon for mobile */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={copy.toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* ✅ Menu list */}
        <ul
          className={`${styles.navList} ${menuOpen ? styles.mobileOpen : ""}`}
          onClick={() => setMenuOpen(false)} // close menu on click
        >
          <li>
            <Link href="/" style={{ padding: "10px" }}>
              {copy.home}
            </Link>
          </li>
          <li>
            <Link href="/stories" style={{ padding: "10px" }}>
              {copy.stories}
            </Link>
          </li>
          <li>
            <Link href="/merchandises" style={{ padding: "10px" }}>
              {copy.products}
            </Link>
          </li>
          <li>
            <Link href="/vfr" style={{ padding: "10px" }}>
              {copy.vfr}
            </Link>
          </li>

          {isAuthenticated ? (
            <li>
              <Link
                href="/signin"
                onClick={async (e) => {
                  e.preventDefault(); // prevent immediate navigation
                  await handleLogout(); // clear session
                  router.push("/signin"); // redirect manually
                }}
                className={styles.navButton}
                style={{ padding: "10px", cursor: "pointer" }}
              >
                {copy.signOut}{" "}
                {user?.displayName ? `(${user.displayName})` : ""}
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="/signin"
                className={styles.navButton}
                style={{ padding: "10px" }}
              >
                {copy.signInUp}
              </Link>
            </li>
          )}
          <li className={styles.languageToggleItem}>
            <div
              className={styles.languageToggle}
              role="group"
              aria-label={copy.languageSelector}
            >
              <button
                type="button"
                className={`${styles.languageOption} ${language === "en" ? styles.languageActive : ""}`}
                onClick={() => setLanguage("en")}
                aria-label={copy.englishLanguage}
                aria-pressed={language === "en"}
                title={copy.englishLanguage}
              >
                <svg
                  className={styles.flagIcon}
                  viewBox="0 0 60 30"
                  aria-hidden="true"
                >
                  <rect width="60" height="30" fill="#012169" />
                  <path
                    d="M0 0L60 30M60 0L0 30"
                    stroke="#fff"
                    strokeWidth="6"
                  />
                  <path
                    d="M0 0L60 30M60 0L0 30"
                    stroke="#c8102e"
                    strokeWidth="2"
                  />
                  <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
                  <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
                </svg>
              </button>
              <button
                type="button"
                className={`${styles.languageOption} ${language === "th" ? styles.languageActive : ""}`}
                onClick={() => setLanguage("th")}
                aria-label={copy.thaiLanguage}
                aria-pressed={language === "th"}
                title={copy.thaiLanguage}
              >
                <svg
                  className={styles.flagIcon}
                  viewBox="0 0 60 36"
                  aria-hidden="true"
                >
                  <rect width="60" height="36" fill="#a51931" />
                  <path
                    d="M0 6h60v6H0zM0 24h60v6H0z"
                    fill="#f4f5f8"
                  />
                  <path d="M0 12h60v12H0z" fill="#2d2a4a" />
                </svg>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
