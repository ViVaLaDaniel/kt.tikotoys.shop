import React from 'react';
import Star from './Star';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="text-amber-400" />
      ))}
      {halfStar && <Star className="text-amber-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;
