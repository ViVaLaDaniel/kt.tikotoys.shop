import React from 'react';
import ProductCard from '../components/ProductCard';
import { sampleProduct } from '../data/product';

const ProductsPage: React.FC = () => {
  // Create a dummy array of products for demonstration
  const products = Array(6).fill(sampleProduct).map((p, index) => ({ ...p, id: index }));

  return (
    <main className="flex-grow w-full px-4 md:px-8 pt-20 pb-20 bg-gray-100">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Our Collection</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our exclusive range of handmade chenille knit beanies. Each piece is crafted with love, ensuring warmth, comfort, and style.
          </p>
        </header>



        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
