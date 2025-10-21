import React from 'react';
import '@/app/Products.css';
import Link from "next/link";

interface Product {
  title: string;
  price: number;
  imageUrl: string;
  isSoldOut: boolean;
}

interface ProductTileProps {
  product: Product;
}

const testRedirect = () => {
    console.log("test")
}

const ProductTile: React.FC<ProductTileProps> = ({ product }) => {



  
  return (
    <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {product.isSoldOut && (
        <div className="absolute top-4 -left-4 bg-gray-300 text-gray-700 px-2 py-1 text-xs font-medium rotate-90">
          Sold Out
        </div>
      )}
      <img src={product.imageUrl} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800" style={{textDecoration: "underline"}}> <Link href="/airbnbHouses">{product.title}</Link> </h3>
        <p className="mt-2 text-lg font-bold text-black">RM {product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductTile;
