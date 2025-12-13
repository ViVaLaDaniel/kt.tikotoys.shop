import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-cream-bg/80 backdrop-blur-sm rounded-xl p-6 shadow-lg text-brown-dark max-w-md border border-sand/50">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center text-xl font-bold text-white mr-4">
          {review.author.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-lg text-brown-dark">{review.author}</p>
          <p className="text-sm text-brown-light">{review.location}</p>
        </div>
      </div>
      <div className="mb-4">
        <StarRating rating={review.rating} />
      </div>
      <p className="text-brown-light leading-relaxed">{review.text}</p>
    </div>
  );
};

export default ReviewCard;
