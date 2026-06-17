import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFilter,
  FaSliders,
  FaArrowDownWideShort,
  FaBasketShopping,
} from 'react-icons/fa6';

type CategoryFilter = 'all' | 'toys' | 'keychains' | 'boxes';
type SizeFilter = 'all' | 'small' | 'medium' | 'large';
type ColorFilter =
  | 'all'
  | 'pink'
  | 'blue'
  | 'beige'
  | 'gray'
  | 'pastel'
  | 'green'
  | 'orange'
  | 'lavender';
type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

const ProductListingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [size, setSize] = useState<SizeFilter>('all');
  const [color, setColor] = useState<ColorFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const { addToCart, items } = useCart();
  const { products } = useProducts();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (
      categoryParam &&
      ['toys', 'keychains', 'boxes'].includes(categoryParam)
    ) {
      setCategory(categoryParam as CategoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = products ? [...products] : [];

    // Category Filter
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Size Filter
    if (size !== 'all') {
      result = result.filter((p) => p.size === size);
    }

    // Color Filter
    if (color !== 'all') {
      result = result.filter((p) => p.colors && p.colors.includes(color));
    }

    // Sorting
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
  }, [products, category, size, color, sortBy]);

  const categories = [
    { value: 'all', label: 'All Fairytale Items' },
    { value: 'toys', label: 'Plush Toys 🧸' },
    { value: 'keychains', label: 'Keychains 🔑' },
    { value: 'boxes', label: 'Toy Boxes 🎁' },
  ];

  const sizes = [
    { value: 'all', label: 'All Sizes' },
    { value: 'small', label: 'Small (~15cm)' },
    { value: 'medium', label: 'Medium (~25cm)' },
    { value: 'large', label: 'Large (~40cm+)' },
  ];

  const colors = [
    { value: 'all', label: 'All Colors' },
    { value: 'pink', label: 'Pink' },
    { value: 'blue', label: 'Blue' },
    { value: 'beige', label: 'Beige' },
    { value: 'gray', label: 'Gray' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'green', label: 'Green' },
    { value: 'orange', label: 'Orange' },
    { value: 'lavender', label: 'Lavender' },
  ];

  // Grid animation configs
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 15 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  return (
    <main className="flex-grow w-full min-h-screen pt-28 pb-32 px-4 md:px-8 bg-transparent font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-cocoa-dark mb-4"
          >
            Toy <span className="text-pastel-pink italic">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cocoa-light text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Browse Yulia&apos;s magical creations. Select individual toys,
            keychains, or curated toy chests to begin your custom fairytale
            selection.
          </motion.p>
        </div>

        {/* Controls Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 bg-white border border-pastel-sand rounded-3xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-cocoa-dark border-b border-pastel-sand pb-3">
              <FaFilter />
              <h2 className="font-bold text-base uppercase tracking-wider">
                Filters
              </h2>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-cocoa-dark uppercase tracking-wider mb-3">
                Category
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value as CategoryFilter)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      category === cat.value
                        ? 'bg-pastel-pink text-cocoa-dark font-bold'
                        : 'text-cocoa-light hover:bg-cream-bg/60 hover:text-cocoa-dark'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-cocoa-dark uppercase tracking-wider mb-3">
                Size
              </h3>
              <div className="space-y-1.5">
                {sizes.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSize(s.value as SizeFilter)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      size === s.value
                        ? 'bg-pastel-pink text-cocoa-dark font-bold'
                        : 'text-cocoa-light hover:bg-cream-bg/60 hover:text-cocoa-dark'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-2">
              <h3 className="text-xs font-bold text-cocoa-dark uppercase tracking-wider mb-3">
                Primary Color
              </h3>
              <div className="space-y-1.5">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value as ColorFilter)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      color === c.value
                        ? 'bg-pastel-pink text-cocoa-dark font-bold'
                        : 'text-cocoa-light hover:bg-cream-bg/60 hover:text-cocoa-dark'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Gallery Area */}
          <div className="flex-grow w-full">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white border border-pastel-sand rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                  className="lg:hidden flex items-center gap-2 bg-cream-bg text-cocoa-dark px-4 py-2 rounded-xl border border-pastel-sand text-sm font-medium hover:bg-pastel-sand/50 transition-colors"
                >
                  <FaSliders size={14} /> Filters
                </button>
                <span className="text-sm text-cocoa-light font-medium">
                  Showing {filteredProducts.length} items
                </span>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-cocoa-light hidden sm:inline">
                  <span className="inline mr-1">
                    <FaArrowDownWideShort size={12} />
                  </span>{' '}
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-cream-bg/60 text-cocoa-dark text-sm px-4 py-2 rounded-xl border border-pastel-sand focus:border-pastel-pink focus:outline-none font-medium cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {showFiltersMobile && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden w-full bg-white border border-pastel-sand rounded-2xl p-6 mb-6 shadow-md overflow-hidden flex flex-col gap-6"
                >
                  {/* Categories Mobile */}
                  <div>
                    <h3 className="text-xs font-bold text-cocoa-dark uppercase tracking-wider mb-2">
                      Category
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() =>
                            setCategory(cat.value as CategoryFilter)
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            category === cat.value
                              ? 'bg-pastel-pink text-cocoa-dark font-bold'
                              : 'bg-cream-bg/50 text-cocoa-light'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes Mobile */}
                  <div>
                    <h3 className="text-xs font-bold text-cocoa-dark uppercase tracking-wider mb-2">
                      Size
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => setSize(s.value as SizeFilter)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            size === s.value
                              ? 'bg-pastel-pink text-cocoa-dark font-bold'
                              : 'bg-cream-bg/50 text-cocoa-light'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors Mobile */}
                  <div>
                    <h3 className="text-xs font-bold text-cocoa-dark uppercase tracking-wider mb-2">
                      Color
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setColor(c.value as ColorFilter)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            color === c.value
                              ? 'bg-pastel-pink text-cocoa-dark font-bold'
                              : 'bg-cream-bg/50 text-cocoa-light'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const isInCart = items.some(
                    (item) => item.product.id === product.id,
                  );

                  return (
                    <motion.div
                      key={product.id}
                      layout
                      variants={itemVariants}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="group bg-white rounded-3xl overflow-hidden border border-pastel-sand shadow-sm hover:border-pastel-pink/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <Link
                        to={`/product/${product.id}`}
                        className="block relative overflow-hidden aspect-square"
                      >
                        <img
                          src={product.imageUrl[0]}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {product.category === 'boxes' && (
                          <span className="absolute top-4 left-4 bg-pastel-pink text-cocoa-dark text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                            PREMIUM BOX 🎁
                          </span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>

                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-bold tracking-widest text-pastel-pink uppercase">
                              {product.category}
                            </span>
                            {product.size && (
                              <span className="text-[10px] font-medium text-cocoa-light bg-cream-bg px-2 py-0.5 rounded-full border border-pastel-sand uppercase">
                                {product.size}
                              </span>
                            )}
                          </div>

                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-lg font-bold text-cocoa-dark mb-1 group-hover:text-pastel-pink transition-colors font-serif leading-tight">
                              {product.name}
                            </h3>
                          </Link>

                          <div className="flex items-center gap-1.5 mb-4">
                            <StarRating rating={product.rating} />
                            <span className="text-xs text-cocoa-light font-medium">
                              ({product.reviewCount})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-cream-bg">
                          <span className="text-2xl font-bold text-cocoa-dark">
                            {product.price}
                            <span className="text-lg font-bold">
                              {product.currency}
                            </span>
                          </span>

                          <button
                            onClick={() => addToCart(product)}
                            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer shadow-sm ${
                              isInCart
                                ? 'bg-emerald-500 text-white shadow-emerald-500/10'
                                : 'bg-pastel-pink hover:bg-pastel-lavender text-cocoa-dark shadow-sand/10 hover:shadow-md'
                            }`}
                            aria-label={`Add ${product.name} to Selection`}
                          >
                            {isInCart ? (
                              <span className="text-xs font-bold px-1">
                                Selected!
                              </span>
                            ) : (
                              <FaBasketShopping size={16} />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white border border-pastel-sand rounded-3xl"
              >
                <span className="text-4xl mb-4 block">🔍</span>
                <p className="text-cocoa-light font-medium text-lg">
                  No toys fit the selected criteria.
                </p>
                <button
                  onClick={() => {
                    setCategory('all');
                    setSize('all');
                    setColor('all');
                  }}
                  className="mt-4 text-pastel-pink hover:underline text-sm font-semibold cursor-pointer"
                >
                  Reset all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductListingPage;
