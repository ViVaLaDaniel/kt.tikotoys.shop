import React from "react";
import ProductCard from "./components/ProductCard";
import ParallaxCard from "./components/ParallaxCard";
import { sampleProduct } from "./data/product";
import ReviewCard from "./components/ReviewCard";
import { sampleReviews } from "./data/reviews";

const App: React.FC = () => {
  // Split reviews for a multi-column layout
  const leftReviews = sampleReviews.slice(0, 2);
  const rightReviews = sampleReviews.slice(2);

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex justify-center items-start gap-8">
        
        {/* Left Reviews Column */}
        <div className="hidden lg:flex flex-col gap-8 w-1/4 pt-16">
          {leftReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Center Product Card */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <ParallaxCard>
            <ProductCard product={sampleProduct} />
          </ParallaxCard>
        </div>

        {/* Right Reviews Column */}
        <div className="hidden lg:flex flex-col gap-8 w-1/4 pt-16">
          {rightReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

      </div>
    </main>
  );
};

export default App;