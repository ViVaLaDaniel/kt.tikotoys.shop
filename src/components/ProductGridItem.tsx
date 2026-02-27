import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { Product } from '../types';

interface ProductGridItemProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductGridItem: React.FC<ProductGridItemProps> = React.memo(({ product, addToCart }) => {
  return (
    <div className="group bg-cream-bg/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-sand/50 hover:border-salmon/50 transition-all duration-300 hover:shadow-xl hover:shadow-sand/20 hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <img src={product.imageUrl[0]} alt={product.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-brown-dark mb-2 group-hover:text-salmon transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-sm text-brown-light">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-salmon">{product.price}<span className="text-lg">{product.currency}</span></span>
          <button onClick={() => addToCart(product)} className="bg-sand hover:bg-salmon text-white p-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-sand/30" aria-label={`Add ${product.name} to cart`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
});

ProductGridItem.displayName = 'ProductGridItem';

export default ProductGridItem;
