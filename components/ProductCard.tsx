import React, { useState } from 'react';
import { Product } from '../types';
import StarRating from './StarRating';
import Icon from './Icon';

interface ProductCardProps {
  product: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden max-w-sm w-full font-sans transform-style-preserve-3d transition-transform duration-500">
      <div className="relative transform-style-preserve-3d" style={{ transform: 'translateZ(40px)' }}>
        <img className="w-full h-72 object-cover rounded-t-2xl" src={product.imageUrl} alt={product.name} />
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 transform hover:scale-110"
          aria-label="Add to favorites"
        >
          <Icon
            name="heart"
            className={`w-6 h-6 transition-all duration-300 ${isFavorite ? 'text-red-500 scale-110' : 'text-gray-500'}`} 
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
          />
        </button>
      </div>

      <div className="p-6 transform-style-preserve-3d" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex justify-between items-start" style={{ transform: 'translateZ(30px)' }}>
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-3xl font-extrabold text-amber-900">{product.price}<span className="text-2xl font-bold">{product.currency}</span></p>
        </div>

        <div className="flex items-center mt-2" style={{ transform: 'translateZ(25px)' }}>
          <StarRating rating={product.rating} />
          <span className="text-sm text-gray-500 ml-2">({product.reviewCount} отзывов)</span>
        </div>

        <p className="text-gray-600 mt-4 text-sm leading-relaxed" style={{ transform: 'translateZ(20px)' }}>{product.description}</p>

        <div className="mt-6" style={{ transform: 'translateZ(35px)' }}>
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

        <button className="w-full mt-8 bg-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-pink-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 transform hover:scale-105" style={{ transform: 'translateZ(50px)' }}>
          <Icon name="cart" className="w-6 h-6" fill="none" stroke="currentColor"/>
          <span>Добавить в корзину</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;