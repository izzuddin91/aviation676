// import React from 'react';
// import '@/app/HouseTiles.css';

// interface HouseTileProps {
//   imageSrc: string;
//   title: string;
//   description: string;
//   link: string;
// }

// interface HouseGroupProps {
//   areaTitle: string;
//   houses: HouseTileProps[];
// }

// const HouseTile: React.FC<HouseTileProps> = ({ imageSrc, title, description, link }) => {
//   return (
//     <div className="house-tile">
//       <div className="house-image" style={{ backgroundImage: `url(${imageSrc})` }}></div>
//       <div className="house-content">
//         <h3>{title}</h3>
//         <p>{description}</p>
//       </div>
//       <div className="house-button">
//         <a href={link} className="see-more-btn">Read More</a>
//       </div>
//     </div>
//   );
// };

// const HouseGroup: React.FC<HouseGroupProps> = ({ areaTitle, houses }) => {
//   return (
//     <div className="house-group">
//       <h2>{areaTitle}</h2>
//       {houses.map((house, index) => (
//         <HouseTile
//           key={index}
//           imageSrc={house.imageSrc}
//           title={house.title}
//           description={house.description}
//           link={house.link}
//         />
//       ))}
//     </div>
//   );
// };

// const HouseTiles: React.FC = () => {
//   const houseGroups = [
//     {
//       areaTitle: 'City Center',
//       houses: [
//         {
//           imageSrc: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg',
//           title: 'Luxury Penthouse',
//           description: 'A beautiful penthouse in the heart of the city.',
//           link: '#'
//         },
//         {
//           imageSrc: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg',
//           title: 'Modern Apartment',
//           description: 'Stylish 2-bedroom apartment close to all amenities.',
//           link: '#'
//         }
//       ]
//     },
//     {
//       areaTitle: 'Suburbs',
//       houses: [
//         {
//           imageSrc: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg',
//           title: 'Family House',
//           description: 'Spacious family house with a large garden.',
//           link: '#'
//         }
//       ]
//     }
//   ];

//   return (
//     <div className="house-tiles-container">
//       {houseGroups.map((group, index) => (
//         <HouseGroup key={index} areaTitle={group.areaTitle} houses={group.houses} />
//       ))}
//     </div>
//   );
// };

// export default HouseTiles;
"use client";
import React, { useState } from 'react';
import '@/app/HouseTiles.css';

const productImages = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const quantities = [1, 2, 3, 4, 5];
const colors = [
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Black', hex: '#000000' },
];

const InfoSection: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <div className="info-section">
      <h4 className="section-title">{title}</h4>
      <hr />
      <p className="section-content">{content}</p>
    </div>
  );
};

const ProductPage: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % productImages.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handleAddToCart = () => {
    const message = `Hello, I would like to order:
- Color: ${selectedColor || 'Not selected'}
- Size: ${selectedSize || 'Not selected'}
- Quantity: ${selectedQuantity}`;

    const whatsappLink = `https://wa.me/+60132711668?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="page-container">
      {/* Image Slider */}
      <div className="image-slider">
        <img
          src={productImages[currentImage]}
          alt="Product"
          className={`product-image ${isTransitioning ? 'fade' : ''}`}
        />
        <button onClick={handlePrevious} className="arrow-button left-arrow">
          &lt;
        </button>
        <button onClick={handleNext} className="arrow-button right-arrow">
          &gt;
        </button>
      </div>

      {/* Product Info */}
      <div style={{ marginLeft: '20px', width: '40%' }}>
        <h1 className="product-title">Flannel Shirt | Long Sleeve | Checked</h1>
        <p className="product-price">RM 99.90</p>
        <p className="bold">Limited Offer from 04 Oct 2024 - 10 Oct 2024</p>
        
        <InfoSection title="Details" content="This is a high-quality flannel shirt made from 100% cotton, perfect for cooler weather and stylish layering." />
        <InfoSection title="Material" content="Material: 100% Cotton. Soft and durable fabric ensures a comfortable fit." />
        <InfoSection title="Return Policy" content="Returns accepted within 30 days of purchase. Items must be unworn and in original packaging." />
        
        {/* Color Selection */}
        <div>
          <h4>Colour: {selectedColor || 'Not selected'}</h4>
          <div style={{ display: 'flex' }}>
            {colors.map((color) => (
              <div
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                style={{
                  backgroundColor: color.hex,
                  width: '30px',
                  height: '30px',
                  marginRight: '10px',
                  cursor: 'pointer',
                  border: selectedColor === color.name ? '2px solid black' : 'none',
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="size-container">
          <h4>Size:</h4>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div>
          <h4>Quantity:</h4>
          <select
            className="quantity-dropdown"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
          >
            {quantities.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;




