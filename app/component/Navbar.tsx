"use client";

import React, { useEffect, useState } from "react";
import { CSSProperties } from "react";
import { clearAuth, getUserAuth } from "../util/auth.util";
import { getAdminById } from "../(site)/service/firebase.service";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const uid = await getUserAuth();
        if (uid) {
          const admin = await getAdminById(uid);
          setAdminName(admin.name);
          console.log(`User is authenticated with uid: ${uid}`);
          setIsAuthenticated(true);
        } else {
          console.log("No user is authenticated.");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking user authentication:", error);
      }
    };

    checkUserAuth();
  }, []);

  const handleLogout = async () => {
    try {
      clearAuth();
      setIsAuthenticated(false);
      setAdminName(null);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <a href="/" style={styles.navLink}>
            Home
          </a>
        </li>
        <li style={styles.navItem}>
        </li>
        <li
          style={styles.navItem}
          onMouseEnter={() => setIsDropdownVisible(true)} // Show dropdown on hover
          onMouseLeave={() => setIsDropdownVisible(false)} // Hide dropdown on mouse leave
        >
          {isAuthenticated ? (
            <a onClick={handleLogout} style={styles.navLink}>
              Logout
            </a>
          ) : (
            <div style={styles.dropdown}>
              <span style={styles.navLink}>Login</span>
              {isDropdownVisible && ( // Conditionally render dropdown
                <ul style={styles.dropdownMenu}>
                  <li>
                    <a
                      href="/login?role=homeOwner"
                      style={styles.dropdownLink}
                    >
                      Home Owner
                    </a>
                  </li>
                  <li>
                    <a href="/login?role=admin" style={styles.dropdownLink}>
                      Admin
                    </a>
                  </li>
                  <li>
                    <a href="/login?role=partner" style={styles.dropdownLink}>
                      Partner
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

const styles: {
  navbar: CSSProperties;
  navList: CSSProperties;
  navItem: CSSProperties;
  navLink: CSSProperties;
  dropdown: CSSProperties;
  dropdownMenu: CSSProperties;
  dropdownLink: CSSProperties;
} = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(2, 48, 32, 1.0)",
    color: "white",
    padding: "10px 20px",
    zIndex: 1000,
  },
  navList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    position: "relative",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    padding: "10px 20px",
    display: "inline-block",
    cursor: "pointer",
    border: "none",
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "rgba(2, 48, 32, 1.0)",
    borderRadius: "4px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    listStyle: "none",
    margin: 0,
    padding: "10px 0",
    zIndex: 1001,
  },
  dropdownLink: {
    color: "white",
    textDecoration: "none",
    padding: "10px 20px",
    display: "block",
  },
};

export default Navbar;
