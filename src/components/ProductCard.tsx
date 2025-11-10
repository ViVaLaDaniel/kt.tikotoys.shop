import React, { useState } from 'react';
import { Product } from '../types';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden max-w-sm w-full font-sans transform-style-preserve-3d transition-transform duration-500">
      <div className="relative transform-style-preserve-3d translate-z-40">
        <img className="w-full h-72 object-cover rounded-t-2xl" src={product.imageUrl} alt={product.name} />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 transform hover:scale-110"
          aria-label="Add to favorites"
        >
          <svg 
            className={`w-6 h-6 transition-all duration-300 ${isFavorite ? 'text-red-500 scale-110' : 'text-gray-500'}`} 
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>

      <div className="p-6 transform-style-preserve-3d translate-z-20">
        <div className="flex justify-between items-start translate-z-30">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-3xl font-extrabold text-amber-900">{product.price}<span className="text-2xl font-bold">{product.currency}</span></p>
        </div>

        <div className="flex items-center mt-2 translate-z-25">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-500 ml-2">({product.reviewCount} reviews)</span>
        </div>

        <p className="text-gray-600 mt-4 text-sm leading-relaxed translate-z-20">{product.description}</p>

        <div className="mt-6 translate-z-35">
          <h3 className="text-sm font-semibold text-gray-700">Color: <span className="font-normal">{selectedColor.name}</span></h3>
          <div className="flex items-center space-x-3 mt-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full ${color.class} border-2 transition-transform duration-200 ${selectedColor.name === color.name ? 'ring-2 ring-offset-2 ring-pink-500 scale-110' : 'border-gray-200'}`}
                aria-label={`Select color ${color.name}`}
              />
            ))}
          </div>
        </div>

        <button className="w-full mt-8 bg-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-pink-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 transform hover:scale-105 translate-z-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;