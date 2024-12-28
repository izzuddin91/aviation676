"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { getHouseList } from "../service/firebase.service"; // Import the function to get house list
import "@/app/HouseTiles.css";

interface HouseTileProps {
  imageSrc: string;
  title: string;
  description: string;
  houseId: string;
}

const HouseTile: React.FC<HouseTileProps> = ({ imageSrc, title, description, houseId }) => {
  const router = useRouter();

  // Handle the click to navigate to the details page
  const handleTileClick = () => {
    router.push(`/airbnbHouses/${houseId}`);
  };

  return (
    <div className="house-tile" onClick={handleTileClick}>
      <div className="house-image" style={{ backgroundImage: `url(${imageSrc})` }}></div>
      <div className="house-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const HouseTiles: React.FC = () => {
  const [houses, setHouses] = useState<any[]>([]); // Store the house list
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const bannerImageSrc =
    "https://firebasestorage.googleapis.com/v0/b/housecarmaintenance.appspot.com/o/uploads%2Fbanner_cropped.png?alt=media&token=0c1b247e-6b2e-49ee-9e33-a41d3e88a1c8"; // Replace with your banner URL

  // Fetch the house list on component mount
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const houseList = await getHouseList("", null);
        setHouses(houseList);
      } catch (error) {
        setError("Failed to fetch houses.");
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []); // Fetch houses on initial load

  if (loading) {
    return <div>Loading houses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        {houses.map((house) => (
          <HouseTile
            key={house.id}
            houseId={house.id} // Pass the houseId for navigation
            imageSrc={house.house_image} // Dynamically using 'house_image'
            title={house.houseName} // Dynamically using 'houseName'
            description={house.description} // Dynamically using 'description'
          />
        ))}
      </div>
    </div>
  );
};

export default HouseTiles;
