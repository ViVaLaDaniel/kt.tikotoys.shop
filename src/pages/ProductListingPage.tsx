import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';

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
            <div key={product.id} className="group bg-cream-bg/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-sand/50 hover:border-salmon/50 transition-all duration-300 hover:shadow-xl hover:shadow-sand/20 hover:-translate-y-1">
              <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                <img src={product.imageUrl[0]} alt={product.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <div className="p-5">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-brown-dark mb-2 group-hover:text-salmon transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={product.rating} />
                  <span className="text-sm text-brown-light">({product.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-salmon">{product.price}<span className="text-lg">{product.currency}</span></span>
                  <button onClick={() => addToCart(product)} className="bg-sand hover:bg-salmon text-white p-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-sand/30" aria-label={`Add ${product.name} to cart`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </button>
                </div>
              </div>
            </div>
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
