import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import ProductGridItem from '../components/ProductGridItem';

type CategoryFilter = 'all' | 'toys' | 'beanies' | 'accessories';
type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

const ProductListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const { addToCart } = useCart();
  const { products } = useProducts();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && ['toys', 'beanies', 'accessories'].includes(categoryParam)) {
      setCategory(categoryParam as CategoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = products ? [...products] : [];

    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [products, category, sortBy]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'toys', label: 'Toys' },
    { value: 'beanies', label: 'Beanies' },
    { value: 'accessories', label: 'Accessories' },
  ];

  return (
    <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brown-dark mb-4">
            Our <span className="text-salmon">Collection</span>
          </h1>
          <p className="text-brown-light text-lg max-w-2xl mx-auto">
            Discover our handcrafted treasures, made with love and the finest materials.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-moccasin/50 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value as CategoryFilter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat.value
                    ? 'bg-sand text-white shadow-lg shadow-sand/30'
                    : 'bg-cream-bg/50 text-brown-light hover:bg-cream-bg/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-cream-bg text-brown-dark px-4 py-2 rounded-lg border border-sand focus:border-salmon focus:outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductGridItem
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brown-light text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductListingPage;
