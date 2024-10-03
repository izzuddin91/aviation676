import React from 'react';
import '@/app/HouseTiles.css';

interface TileProps {
  imageSrc: string;
  description: string;
  link: string;
}

const Tile: React.FC<TileProps> = ({ imageSrc, description, link }) => {
  return (
    <div className="tile">
      <img src={imageSrc} alt="House" className="tile-image" />
      <div className="tile-description">
        <p>{description}</p>
      </div>
      <div className="tile-button">
        <a href={link} className="see-more-btn">See More</a>
      </div>
    </div>
  );
};

export default Tile;
