import React, { useState, useEffect } from "react";
import { Product } from "../types";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768; // Simple check for mobile-like screen sizes
      setIsMobile(mobile);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsExpanded(false);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  // Stop propagation on inner clicks to prevent the card from closing on mobile
  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden max-w-sm w-full font-sans transform-style-preserve-3d transition-all duration-500 shadow-lg cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative transform-style-preserve-3d translate-z-40">
        <img className="w-full h-72 object-cover" src={product.imageUrl} alt={product.name} />

        {/* Call to Action Indicator */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent flex justify-center items-center transition-opacity duration-300">
            <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        )}

        <button
          onClick={(e) => {
            handleInnerClick(e);
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 transform hover:scale-110"
          aria-label="Add to favorites"
        >
          <svg
            className={`w-6 h-6 transition-all duration-300 ${isFavorite ? "text-red-500 scale-110" : "text-gray-500"}`}
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </button>
      </div>

      {/* Collapsible Content */}
      <div
        className={`transform-style-preserve-3d transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        onClick={handleInnerClick}
      >
        <div className="p-6 transform-style-preserve-3d translate-z-20">
          <div className="flex justify-between items-start translate-z-30">
            <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-3xl font-extrabold text-amber-900">
              {product.price}
              <span className="text-2xl font-bold">{product.currency}</span>
            </p>
          </div>

          <div className="flex items-center mt-2 translate-z-25">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-500 ml-2">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-gray-600 mt-4 text-sm leading-relaxed translate-z-20">{product.description}</p>

          <button className="w-full mt-8 bg-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-pink-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 transform hover:scale-105 translate-z-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <a href="https://kttikotoys.etsy.com">
              <span>Buy Now</span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
