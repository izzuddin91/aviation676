"use client";

import React, { useEffect, useState } from "react";
// import { clearAuth, getUserAuth } from "../util/auth.util";
// import { getAdminById } from "../(site)/service/firebase.service";
import styles from "@/app/Navbar.module.css"; // Import CSS module
import Link from "next/link";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    // const checkUserAuth = async () => {
    //   try {
    //     const uid = await getUserAuth();
    //     if (uid) {
    //       const admin = await getAdminById(uid);
    //       setAdminName(admin.name);
    //       setIsAuthenticated(true);
    //     } else {
    //       setIsAuthenticated(false);
    //     }
    //   } catch (error) {
    //     console.error("Error checking user authentication:", error);
    //   }
    // };

    // checkUserAuth();
  }, []);

  const handleLogout = () => {
    try {
      // clearAuth();
      setIsAuthenticated(false);
      setAdminName(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo Image */}
        <Link href="/" className={styles.navLogo}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/dfma-etiqa.appspot.com/o/A676Logo.png?alt=media&token=4567ccf1-dd00-42c5-871e-8a08c8c80854" // Make sure to place the logo.png in the public folder
            alt="Aviation 676"
            className={styles.logoImage}
            style={{ width: "110px" }}
          />
        </Link>

        {/* Hamburger Icon */}
        <div
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </div>

        {/* Navigation Links */}
        <ul
          className={`${styles.navList} ${
            isMobileMenuOpen ? styles.mobileOpen : ""
          }`}
        >
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/stories" className={styles.navLink}>
              Stories
            </Link>
          </li>
          <li>
            <Link href="#about" className={styles.navLink}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/merchandises" className={styles.navLink}>
              To Sell
              {adminName ? `, ${adminName}` : ""}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
