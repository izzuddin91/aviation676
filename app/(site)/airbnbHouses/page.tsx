import React from 'react';
import '@/app/HouseTiles.css';

interface HouseTileProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

interface HouseGroupProps {
  areaTitle: string;
  houses: HouseTileProps[];
}

const HouseTile: React.FC<HouseTileProps> = ({ imageSrc, title, description, link }) => {
  return (
    <div className="house-tile">
      <div className="house-image" style={{ backgroundImage: `url(${imageSrc})` }}></div>
      <div className="house-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="house-button">
        <a href={link} className="see-more-btn">Read More</a>
      </div>
    </div>
  );
};

const HouseGroup: React.FC<HouseGroupProps> = ({ areaTitle, houses }) => {
  return (
    <div className="house-group">
      <h2>{areaTitle}</h2>
      {houses.map((house, index) => (
        <HouseTile
          key={index}
          imageSrc={house.imageSrc}
          title={house.title}
          description={house.description}
          link={house.link}
        />
      ))}
    </div>
  );
};

const HouseTiles: React.FC = () => {
  const houseGroups = [
    {
      areaTitle: 'City Center',
      houses: [
        {
          imageSrc: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg',
          title: 'Luxury Penthouse',
          description: 'A beautiful penthouse in the heart of the city.',
          link: '#'
        },
        {
          imageSrc: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg',
          title: 'Modern Apartment',
          description: 'Stylish 2-bedroom apartment close to all amenities.',
          link: '#'
        }
      ]
    },
    {
      areaTitle: 'Suburbs',
      houses: [
        {
          imageSrc: 'https://cdn.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg',
          title: 'Family House',
          description: 'Spacious family house with a large garden.',
          link: '#'
        }
      ]
    }
  ];

  return (
    <div className="house-tiles-container">
      {houseGroups.map((group, index) => (
        <HouseGroup key={index} areaTitle={group.areaTitle} houses={group.houses} />
      ))}
    </div>
  );
};

export default HouseTiles;




