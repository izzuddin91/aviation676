"use client"
import ProductTile from '@/app/component/productTiles/productTiles';
import React, { useState } from 'react';


interface Product {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    isSoldOut: boolean;
  }
  
  const productsData: Product[] = [
    { id: 1, title: 'PEAK.KL x PROJEK59 "KLSCM24" Jersey', price: 129, imageUrl: 'https://cdn.store-assets.com/s/652084/i/78115965.png', isSoldOut: true },
    { id: 2, title: 'PEAK.KL x PROJEK59 "KLSCM24" Sleeveless', price: 119, imageUrl: 'https://cdn.store-assets.com/s/652084/i/78115949.png', isSoldOut: true },
    { id: 3, title: 'PEAK.KL x PROJEK59 "KLSCM24" Singlet', price: 99, imageUrl: 'https://cdn.store-assets.com/s/652084/i/75417538.jpeg', isSoldOut: true },
    { id: 4, title: 'PEAK.KL OLYMPEAK Tee', price: 159, imageUrl: 'https://cdn.store-assets.com/s/652084/i/77789858.png', isSoldOut: false },


    { id: 1, title: 'PEAK.KL x PROJEK59 "KLSCM24" Jersey', price: 129, imageUrl: 'https://cdn.store-assets.com/s/652084/i/77789899.png', isSoldOut: true },
    { id: 2, title: 'PEAK.KL x PROJEK59 "KLSCM24" Sleeveless', price: 119, imageUrl: 'https://cdn.store-assets.com/s/652084/i/73426388.jpeg', isSoldOut: true },
    { id: 3, title: 'PEAK.KL x PROJEK59 "KLSCM24" Singlet', price: 99, imageUrl: 'https://cdn.store-assets.com/s/652084/i/70720292.jpeg', isSoldOut: true },
    { id: 4, title: 'PEAK.KL OLYMPEAK Tee', price: 159, imageUrl: 'https://cdn.store-assets.com/s/652084/i/70720405.jpeg', isSoldOut: false },
    
  ];
  
  const ProductList: React.FC = () => {
    const [sortOption, setSortOption] = useState('featured');
    const [products, setProducts] = useState(productsData);
  
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const option = e.target.value;
      setSortOption(option);
  
      // Sort products based on selected option
      const sortedProducts = [...productsData].sort((a, b) => {
        if (option === 'priceLowToHigh') return a.price - b.price;
        if (option === 'priceHighToLow') return b.price - a.price;
        if (option === 'alphabetical') return a.title.localeCompare(b.title);
        return 0;
      });
      
      setProducts(sortedProducts);
    };
  
    return (
      <div className="container mx-auto py-8 px-4">
        {/* Title and Sort Dropdown */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">New Collection</h2>
          <div>
            <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="px-4 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:border-gray-400"
            >
              <option value="featured">Featured</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
  
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductList;
