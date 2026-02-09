import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.imageUrl.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.imageUrl.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.imageUrl.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.imageUrl.length) % product.imageUrl.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-sand/20 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-cream-bg">
        <motion.img
          src={product.imageUrl[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />

        {/* Image Controls (only if multiple images) */}
        {product.imageUrl.length > 1 && isHovered && (
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
             <button
               onClick={handlePrevImage}
               className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-salmon hover:text-white text-brown-dark transition-all duration-200"
               aria-label="Previous image"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button
               onClick={handleNextImage}
               className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-salmon hover:text-white text-brown-dark transition-all duration-200"
               aria-label="Next image"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </button>
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 z-10">
          <button
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-salmon hover:text-white text-brown-light transition-all duration-300"
            aria-label="Add to favorites"
            onClick={(e) => e.preventDefault()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
          </button>
        </div>

        {/* Dots indicator for multiple images */}
        {product.imageUrl.length > 1 && isHovered && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.imageUrl.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${idx === currentImageIndex ? 'bg-salmon' : 'bg-white/70'}`}
              />
            ))}
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block mb-1">
           <h3 className="font-bold text-lg text-brown-dark group-hover:text-salmon transition-colors line-clamp-1">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-brown-light">({product.reviewCount})</span>
        </div>

        {product.category && (
           <span className="text-xs text-sand uppercase tracking-wider font-medium mb-auto">{product.category}</span>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-sand/10">
          <div className="flex flex-col">
             <span className="text-xl font-bold text-salmon">{product.price} <span className="text-sm font-normal">{product.currency}</span></span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex items-center justify-center bg-sand hover:bg-salmon text-white w-10 h-10 rounded-xl shadow-md shadow-sand/30 hover:shadow-lg hover:shadow-salmon/30 transition-all duration-300"
            aria-label="Add to cart"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
