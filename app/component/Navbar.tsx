import React from 'react';

// Import CSSProperties for typing styles
import { CSSProperties } from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

const styles: { navbar: CSSProperties; navList: CSSProperties } = {
  navbar: {
    position: 'fixed', // Correctly typed
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(2, 48, 32, 1.0)',
    color: 'white',
    padding: '10px',
    zIndex: 1000,
  },
  navList: {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
};

export default Navbar;
