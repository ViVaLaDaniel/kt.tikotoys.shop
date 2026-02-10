import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'care' | 'shipping'>('description');
  const [isZoomed, setIsZoomed] = useState(false);

  const product = products.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
    setQuantity(1);
    setActiveTab('description');
  }, [id]);

  if (!product) {
    return (
      <>
        <SEO title="Product Not Found" />
        <main className="flex-grow w-full min-h-screen pt-32 px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold text-brown-dark mb-4">Product Not Found</h1>
          <p className="text-brown-light mb-8">The item you are looking for seems to have wandered off.</p>
          <Link to="/shop" className="px-6 py-3 bg-sand text-white rounded-xl font-medium hover:bg-salmon transition-colors">
            Return to Shop
          </Link>
        </main>
      </>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.imageUrl,
    "description": product.description,
    "sku": `KT-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "KT.TikoToys"
    },
    "offers": {
      "@type": "Offer",
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "priceCurrency": "EUR",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviewCount
    }
  };

  const tabs = [
    { id: 'description', label: 'Details' },
    { id: 'care', label: 'Care Guide' },
    { id: 'shipping', label: 'Shipping' }
  ] as const;

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        image={product.imageUrl[0]}
        type="product"
        schema={productSchema}
      />

      <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 md:px-8 bg-cream-bg">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm font-medium text-brown-light flex items-center gap-2">
            <Link to="/" className="hover:text-salmon transition-colors">Home</Link>
            <span className="text-sand">/</span>
            <Link to="/shop" className="hover:text-salmon transition-colors">Shop</Link>
            <span className="text-sand">/</span>
            <span className="text-brown-dark truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Gallery Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div
                className="relative bg-white rounded-3xl overflow-hidden aspect-square border border-sand/20 shadow-lg cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                 <AnimatePresence mode='wait'>
                    <motion.img
                        key={currentImageIndex}
                        src={product.imageUrl[currentImageIndex]}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                 </AnimatePresence>
                 {product.rating > 4.5 && (
                    <div className="absolute top-4 left-4 bg-salmon text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        Bestseller
                    </div>
                 )}
              </div>

              {product.imageUrl.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {product.imageUrl.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'border-salmon ring-2 ring-salmon/30 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100 hover:border-sand'
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col h-full"
            >
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                    <span className="inline-block bg-moccasin/40 text-brown-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {product.category || 'Handmade'}
                    </span>
                    <div className="flex items-center gap-2">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-brown-light font-medium underline cursor-pointer hover:text-salmon">
                            {product.reviewCount} reviews
                        </span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brown-dark mb-4 leading-tight">
                    {product.name}
                </h1>

                <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-4xl font-bold text-salmon">{product.price}<span className="text-2xl">{product.currency}</span></span>
                    {/* Fake original price logic for demo */}
                    <span className="text-xl text-brown-light/50 line-through Decoration-2">
                        {(product.price * 1.2).toFixed(0)}{product.currency}
                    </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white/50 rounded-2xl p-6 border border-sand/30 shadow-sm mb-8">
                  <div className="flex items-center justify-between mb-4">
                      <span className="text-brown-dark font-medium">Quantity</span>
                      <div className="flex items-center bg-white rounded-xl border border-sand/30 shadow-inner">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center text-brown-light hover:bg-moccasin/30 rounded-l-xl transition"
                        >
                            −
                        </button>
                        <span className="w-10 text-center font-bold text-brown-dark">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-brown-light hover:bg-moccasin/30 rounded-r-xl transition"
                        >
                            +
                        </button>
                      </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addToCart(product, quantity)}
                        className="flex-1 py-4 px-6 rounded-xl font-bold text-lg bg-white border-2 border-sand text-brown-dark hover:border-salmon hover:text-salmon transition-all flex items-center justify-center gap-2"
                    >
                        Add to Cart
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            addToCart(product, quantity);
                            navigate('/cart');
                        }}
                        className="flex-1 py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-salmon to-sand text-white shadow-lg shadow-salmon/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        Buy Now
                    </motion.button>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-brown-light">
                    <span className="flex items-center gap-1">🔒 Secure payment</span>
                    <span className="flex items-center gap-1">✨ Handmade quality</span>
                    <span className="flex items-center gap-1">🚚 Fast shipping</span>
                  </div>
              </div>

              {/* Tabs / Accordion */}
              <div className="mt-auto">
                <div className="flex border-b border-sand/20 mb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-2 px-4 text-sm font-medium transition-all relative ${
                                activeTab === tab.id
                                    ? 'text-salmon'
                                    : 'text-brown-light hover:text-brown-dark'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-salmon"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="min-h-[150px]">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'description' && (
                                <p className="leading-relaxed text-brown-dark/80">{product.description}</p>
                            )}
                            {activeTab === 'care' && (
                                <ul className="space-y-2 text-brown-dark/80 list-none">
                                    <li className="flex items-center gap-2">🌊 Hand wash gently in cool water (30°C)</li>
                                    <li className="flex items-center gap-2">🧼 Use mild detergent suitable for wool</li>
                                    <li className="flex items-center gap-2">⛔ Do not bleach or tumble dry</li>
                                    <li className="flex items-center gap-2">🧶 Dry flat on a towel to maintain shape</li>
                                </ul>
                            )}
                            {activeTab === 'shipping' && (
                                <div className="text-brown-dark/80 space-y-2">
                                    <p><strong>Ready to ship:</strong> 1-3 business days</p>
                                    <p><strong>Estimated delivery:</strong></p>
                                    <ul className="list-disc list-inside ml-2 text-sm">
                                        <li>Europe: 5-10 business days</li>
                                        <li>North America: 10-15 business days</li>
                                        <li>Rest of World: 14-20 business days</li>
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Emotional / Story Block */}
          <section className="mt-20 py-12 border-t border-sand/20">
             <div className="bg-white/60 rounded-3xl p-8 md:p-12 text-center border border-moccasin shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-salmon via-sand to-moccasin" />
                <span className="text-4xl mb-4 block">🧶</span>
                <h2 className="text-2xl md:text-3xl font-bold text-brown-dark mb-4">Made with Heart & Soul</h2>
                <p className="max-w-2xl mx-auto text-brown-light text-lg leading-relaxed">
                    Each toy is created by me, Yulia, in my small home studio. I choose only the softest, hypoallergenic yarns because I know these toys will be hugged by the most precious little hands. When you buy from TikoToys, you&apos;re not just buying a toy — you&apos;re bringing home a piece of warmth and care.
                </p>
             </div>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl md:text-3xl font-bold text-brown-dark mb-8 flex items-center gap-3">
                You May Also Like <span className="text-salmon text-sm font-normal uppercase tracking-wider border border-salmon rounded-full px-3 py-1">Recommended</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                    <div key={p.id} className="h-full">
                        <ProductCard product={p} />
                    </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductDetailPage;
