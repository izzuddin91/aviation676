import React from 'react';
import '@/app/HouseTiles.css';

interface HouseTileProps {
  imageSrc: string;
  title: string;
  description: string;
}

const HouseTile: React.FC<HouseTileProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="house-tile">
      <div className="house-image" style={{ backgroundImage: `url(${imageSrc})` }}></div>
      <div className="house-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const HouseTiles: React.FC = () => {
  const bannerImageSrc =
    'https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Fbanner_cropped.png?alt=media&token=0c1b247e-6b2e-49ee-9e33-a41d3e88a1c8'; // Replace with your banner URL

  const houses = [
    {
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FTrion_%40%20KLbKViazj3szhlNjl2CiVI_2023-September-18.jpg?alt=media&token=d5720489-6534-4762-9fed-931113c9127c',
      title: 'Trion 1',
      description: 'A beautiful penthouse in the heart of the city.'
    },
    {
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Fskyloft%20trion.png?alt=media&token=eadf10b5-fee6-4de5-9755-9a35ffa3689a',
      title: 'Trion 2',
      description: 'Stylish 2-bedroom apartment close to all amenities.'
    },
    {
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FM_centura_front.jpg?alt=media&token=3c7c7eb5-6fe2-441b-9ebb-58fde85a1800',
      title: 'M centura',
      description: 'Spacious family house with a large garden.'
    },
    {
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Fsuakasih.png?alt=media&token=1ca3323b-13da-4412-8556-27ec2d30db1f',
      title: 'Pangsapuri suakasih',
      description: 'An elegant condo with stunning views.'
    },
    {
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2FWeekend_HouseLlw4rWQllzhqJ2gm7G2L_2023-September-13.jpg?alt=media&token=ffb3d332-151c-4b69-a501-bca571bd74df',
      title: 'Tiara Imperio',
      description: 'Cozy loft perfect for small families or couples.'
    },
    {
      imageSrc: 'https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Fj%20dupion.png?alt=media&token=af0a884b-fcb1-4c39-a662-19740b62fd3a',
      title: 'J dupion',
      description: 'Luxury villa located near the beach.'
    }
  ];

  return (
    <div className="house-tiles-page">
      {/* Banner Image */}
      <div
        className="house-banner"
        style={{ backgroundImage: `url(${bannerImageSrc})` }}
      ></div>
      <h2>Explore our houses</h2>
      {/* Grid Tiles */}
      <div className="house-tiles-container">
        
        {houses.map((house, index) => (
          <HouseTile
            key={index}
            imageSrc={house.imageSrc}
            title={house.title}
            description={house.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HouseTiles;
