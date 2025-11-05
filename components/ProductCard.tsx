import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

// Helper component defined outside the main component to prevent re-creation
const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
      {halfStar && (
        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
         <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
      ))}
    </div>
  );
};


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm w-full font-sans">
      <div className="relative">
        <img className="w-full h-72 object-cover" src={product.imageUrl} alt={product.name} />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-300"
          aria-label="Add to favorites"
        >
          <svg 
            className={`w-6 h-6 transition-all ${isFavorite ? 'text-red-500' : 'text-gray-500'}`} 
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-3xl font-extrabold text-amber-900">{product.price}<span className="text-2xl font-bold">{product.currency}</span></p>
        </div>

        <div className="flex items-center mt-2">
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-500 ml-2">({product.reviewCount} отзывов)</span>
        </div>

        <p className="text-gray-600 mt-4 text-sm leading-relaxed">{product.description}</p>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700">Цвет: <span className="font-normal">{selectedColor.name}</span></h3>
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

        <button className="w-full mt-8 bg-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-pink-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span>Добавить в корзину</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
