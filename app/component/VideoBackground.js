import React from 'react';
import '@/app/VideoBackground.css';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

const VideoBackground = () => {
  return (
    <div>
      <div className="videoContainer" style={styles.videoContainer}>
        <Navbar />
        <video autoPlay muted loop style={styles.video}>
          <source src="/videos/sample.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={styles.content}>
        <h1 style={{ color: 'white', fontSize: '40px' }}>Welcome to I.Z Properties</h1>
        </div>
      </div>

      {/* Cards Section */}
      <div className='cardsContainer'>
        <div className='card'>
          <img src="https://i.pinimg.com/originals/36/e6/a2/36e6a2c6682fda658e49483b2dbd7eed.jpg" alt="Charter Jet Service" style={styles.cardImage} />
          <h2 style={styles.cardTitle}>Private Charter Jet Service</h2>
          <p style={styles.cardDescription}>
            Offering luxury private jet charter services for business and leisure. Fly anywhere with comfort and personalized service.
          </p>
          <a href="#more" style={styles.cardLink}>Read More</a>
        </div>

        <div className='card'>
          <img src="https://postandporch.com/cdn/shop/articles/AdobeStock_209124760.jpg?v=1662575433&width=1100" alt="Airbnb Business" style={styles.cardImage} />
          <h2 style={styles.cardTitle}>Luxurious Airbnb Stays</h2>
          <p style={styles.cardDescription}>
            Enjoy a top-tier Airbnb experience with beautifully managed homes in premium locations. Exceptional service and comfort guaranteed.
          </p>
          <a href="/airbnbHouses" style={styles.cardLink}>Read More</a>
        </div>

        <div className='card'>
          <img src="https://www.simons-voss.com/_Resources/Persistent/e/5/b/5/e5b530f3b694693558f73ee296961add7ebc27f5/schluesseluebergabe-wohnung.jpg" alt="Airbnb Hosting Services" style={styles.cardImage} />
          <h2 style={styles.cardTitle}>Airbnb Hosting Services for Homeowners</h2>
          <p style={styles.cardDescription}>
            Let us manage your property on Airbnb. We take care of everything, from listing to guest services, so you earn more effortlessly.
          </p>
          <a href="#more" style={styles.cardLink}>Read More</a>
        </div>
      </div>

            {/* Floating WhatsApp logo */}
      <a href="https://wa.me/+60132711668" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" // Example WhatsApp icon link
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
    </div>
  );
};

const styles = {
    navbar: {
      position: 'fixed',
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
    videoContainer: {
      height: '100vh',
      position: 'relative',
      zIndex: 1,
    },
    video: {
      width: '100%',
      height: '100vh',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      textAlign: 'center',
    },

    card: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    cardTitle: {
      fontSize: '1.5em',
      margin: '15px 0',
    },
    cardDescription: {
      fontSize: '1em',
      padding: '0 15px',
      marginBottom: '15px',
    },
    cardLink: {
      display: 'inline-block',
      margin: '10px 0',
      color: '#007BFF',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  };
  
  

// CSS-in-JS hover effect
styles.card[':hover'] = styles.cardHover;

export default VideoBackground;
