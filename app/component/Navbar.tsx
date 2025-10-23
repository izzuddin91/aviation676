"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/app/Navbar.module.css";
import { useAuth } from "@/app/context/AuthContext";
import { logoutAction } from "@/app/actions/session";
import { Menu, X } from "lucide-react"; // <-- for hamburger icons

const Navbar = () => {
  const { isAuthenticated, user, logoutLocal } = useAuth();
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
            src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/A676Logo.png?alt=media&token=4567ccf1-dd00-42c5-871e-8a08c8c80854"
            alt="Aviation 676"
            className={styles.logoImage}
            style={{ width: "110px" }}
          />
        </Link>

        {/* ✅ Hamburger icon for mobile */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
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
              Home
            </Link>
          </li>
          <li>
            <Link href="/stories" style={{ padding: "10px" }}>
              Stories
            </Link>
          </li>
          <li>
            <Link href="#about" style={{ padding: "10px" }}>
              Planespotting Competition
            </Link>
          </li>
          <li>
            <Link href="/merchandises" style={{ padding: "10px" }}>
              To Sell
            </Link>
          </li>

          {isAuthenticated ? (
            <li>
              <button
                style={{ padding: "10px" }}
                onClick={handleLogout}
                className={styles.navButton}
              >
                Sign Out {user?.name ? `(${user.name})` : ""}
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/signin"
                style={{ padding: "10px" }}
                className={styles.navButton}
              >
                Sign In / Sign Up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
