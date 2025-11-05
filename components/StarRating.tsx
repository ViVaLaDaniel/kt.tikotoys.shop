import React from 'react';
import Icon from './Icon';

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
        <Icon key={`full-${i}`} name="star" className="w-5 h-5 text-amber-400" fill="currentColor" />
      ))}
      {halfStar && (
        <Icon name="star" className="w-5 h-5 text-amber-400" fill="currentColor" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon key={`empty-${i}`} name="star" className="w-5 h-5 text-gray-300" fill="currentColor" />
      ))}
    </div>
  );
};

export default StarRating;
