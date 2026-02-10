import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

type CategoryFilter = 'all' | 'toys' | 'beanies' | 'accessories';
type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

const ProductListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
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
    <>
      <SEO
        title="Shop Handmade Toys & Accessories"
        description="Browse our collection of unique, handmade knitted toys, beanies, and accessories. Perfect gifts for loved ones."
        url={typeof window !== 'undefined' ? window.location.href : undefined}
      />
      <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-brown-dark mb-4"
            >
              Our <span className="text-salmon">Collection</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brown-light text-lg max-w-2xl mx-auto"
            >
              Discover our handcrafted treasures, made with love and the finest materials.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-moccasin/50 backdrop-blur-sm rounded-2xl p-4 sticky top-20 z-20 shadow-sm">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value as CategoryFilter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                    category === cat.value
                      ? 'text-white'
                      : 'text-brown-light hover:bg-cream-bg/80'
                  }`}
                >
                  {category === cat.value && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-sand rounded-full shadow-lg shadow-sand/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-cream-bg text-brown-dark px-4 py-2 rounded-lg border border-sand focus:border-salmon focus:outline-none cursor-pointer hover:border-salmon/50 transition-colors"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-brown-light text-lg">No products found in this category.</p>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductListingPage;
