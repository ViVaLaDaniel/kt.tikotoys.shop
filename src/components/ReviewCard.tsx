import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 shadow-lg text-white max-w-md">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-xl font-bold mr-4">
          {review.author.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-lg">{review.author}</p>
          <p className="text-sm text-gray-400">{review.location}</p>
        </div>
      </div>
      <div className="mb-4">
        <StarRating rating={review.rating} />
      </div>
      <p className="text-gray-300 leading-relaxed">{review.text}</p>
    </div>
  );
};

export default ReviewCard;
