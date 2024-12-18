"use client";

import React, { useEffect, useState } from "react";
import { clearAuth, getUserAuth } from "../util/auth.util";
import { getAdminById } from "../(site)/service/firebase.service";
import styles from "@/app/Navbar.module.css"; // Import CSS module

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const uid = await getUserAuth();
        if (uid) {
          const admin = await getAdminById(uid);
          setAdminName(admin.name);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
      }
    };

    checkUserAuth();
  }, []);

  const handleLogout = () => {
    try {
      clearAuth();
      setIsAuthenticated(false);
      setAdminName(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <a href="/" className={styles.navLogo}>
          I.Z. Properties
        </a>

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
            <a href="/" className={styles.navLink}>
              Home
            </a>
          </li>
          <li>
          <a href="/" className={styles.navLink}>
              Statistic Report
            </a>
          </li>
          <li>
            <a href="#about" className={styles.navLink}>
              Welcome{adminName ? `, ${adminName}` : ""}
            </a>
          </li>

          {/* Dropdown Logic */}
          <li
            className={styles.navItem}
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            {isAuthenticated ? (
              <a onClick={handleLogout} className={styles.navLink}>
                Logout
              </a>
            ) : (
              <div className={styles.dropdown}>
                <span className={styles.navLink}>Login</span>
                {isDropdownVisible && (
                  <ul className={styles.dropdownMenu}>
                    <li>
                      <a
                        href="/login?role=homeOwner"
                        className={styles.dropdownLink}
                      >
                        Home Owner
                      </a>
                    </li>
                    <li>
                      <a
                        href="/login?role=admin"
                        className={styles.dropdownLink}
                      >
                        Admin
                      </a>
                    </li>
                    <li>
                      <a
                        href="/login?role=partner"
                        className={styles.dropdownLink}
                      >
                        Partner
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
