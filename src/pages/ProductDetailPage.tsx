import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import { motion } from 'framer-motion';
import {
  FaWhatsapp,
  FaBasketShopping,
  FaHandHoldingHeart,
  FaCompass,
  FaTruckFast,
  FaArrowRotateLeft,
} from 'react-icons/fa6';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, items } = useCart();
  const { products } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToSelection, setAddedToSelection] = useState(false);

  const product = products.find((p) => p.id === Number(id));
  const isInCart = product
    ? items.some((item) => item.product.id === product.id)
    : false;

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <main className="flex-grow w-full min-h-screen pt-32 pb-32 px-4 flex items-center justify-center bg-cream-bg font-sans">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-cocoa-dark mb-4">
            Toy Not Found
          </h1>
          <Link
            to="/shop"
            className="text-pastel-pink hover:opacity-80 font-medium"
          >
            ← Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToSelection = () => {
    addToCart(product, quantity);
    setAddedToSelection(true);
    setTimeout(() => setAddedToSelection(false), 2000);
  };

  const handleWhatsAppQuickInquiry = () => {
    const whatsappNumber = '34642841240';
    const message = `🧸 *Quick Toy Inquiry* 🧸

Hi Yulia! I am interested in ordering:
• *${product.name}* (Quantity: ${quantity})
💰 Estimated Value: ${product.price * quantity}${product.currency}

Could you please let me know about availability and shipping options? Thank you!

_Sent from Yulia's Toy Chest Showcase (Spain, Marbella)_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <main className="flex-grow w-full min-h-screen pt-28 pb-32 px-4 md:px-8 bg-cream-bg font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2">
          <Link
            to="/"
            className="text-sm text-cocoa-light hover:text-cocoa-dark transition-colors font-medium"
          >
            Home
          </Link>
          <span className="text-cocoa-light/40">/</span>
          <Link
            to="/shop"
            className="text-sm text-cocoa-light hover:text-cocoa-dark transition-colors font-medium"
          >
            Toy Gallery
          </Link>
          <span className="text-cocoa-light/40">/</span>
          <span className="text-sm text-cocoa-dark font-semibold leading-none">
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Gallery Component */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl overflow-hidden aspect-square border border-pastel-sand shadow-sm relative"
            >
              <img
                src={product.imageUrl[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.category === 'boxes' && (
                <span className="absolute top-4 left-4 bg-pastel-pink text-cocoa-dark text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  PREMIUM BOX 🎁
                </span>
              )}
            </motion.div>

            {product.imageUrl.length > 1 && (
              <div className="flex gap-3">
                {product.imageUrl.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      currentImageIndex === index
                        ? 'border-pastel-pink scale-95 shadow-md'
                        : 'border-pastel-sand opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block bg-pastel-pink/30 text-cocoa-dark text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                  {product.category}
                </span>
                {product.size && (
                  <span className="inline-block bg-white border border-pastel-sand text-cocoa-light text-[10px] font-medium px-2 py-0.5 rounded-full uppercase">
                    Size: {product.size}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-cocoa-dark mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-cocoa-light text-sm">
                  ({product.reviewCount} customer reviews aligned)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-cocoa-dark">
                  {product.price}
                  {product.currency}
                </span>
                <span className="text-lg text-cocoa-light/60 line-through">
                  {Math.round(product.price * 1.25)}
                  {product.currency}
                </span>
                <span className="bg-emerald-500/10 text-emerald-600 text-xs font-semibold px-2 py-1 rounded-lg">
                  Estimated Value
                </span>
              </div>
              <p className="text-[10px] text-cocoa-light/60">
                Values are estimates. Final price tailored with Yulia based on
                shipping & customizations.
              </p>
            </div>

            <p className="text-cocoa-light leading-relaxed text-sm md:text-base font-normal">
              {product.description}
            </p>

            {/* Colors display if exist */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cocoa-dark">
                  Available Colors / Themes:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((colorName) => (
                    <span
                      key={colorName}
                      className="inline-flex items-center bg-white border border-pastel-sand px-3 py-1 rounded-full text-xs text-cocoa-light capitalize font-medium"
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full mr-2 inline-block border border-pastel-sand`}
                        style={{
                          backgroundColor:
                            colorName === 'pastel'
                              ? '#FFD1DC'
                              : colorName === 'custom'
                                ? '#D2B48C'
                                : colorName,
                        }}
                      />
                      {colorName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Value Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-pastel-sand rounded-2xl p-4">
                <span className="text-pastel-pink text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <FaHandHoldingHeart /> 100% Handmade
                </span>
                <p className="text-cocoa-light text-[11px] mt-1 leading-normal">
                  Lovingly crafted loop-by-loop with hypoallergenic plush
                  materials.
                </p>
              </div>
              <div className="bg-white border border-pastel-sand rounded-2xl p-4">
                <span className="text-pastel-pink text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <FaCompass /> Worldwide Shipping
                </span>
                <p className="text-cocoa-light text-[11px] mt-1 leading-normal">
                  Shipped securely from Marbella, Spain to any global
                  destination.
                </p>
              </div>
              <div className="bg-white border border-pastel-sand rounded-2xl p-4">
                <span className="text-pastel-pink text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <FaTruckFast /> Safe Delivery
                </span>
                <p className="text-cocoa-light text-[11px] mt-1 leading-normal">
                  Packed meticulously in premium fairytale wrap with tracking
                  link.
                </p>
              </div>
              <div className="bg-white border border-pastel-sand rounded-2xl p-4">
                <span className="text-pastel-pink text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <FaArrowRotateLeft /> Personal Alignment
                </span>
                <p className="text-cocoa-light text-[11px] mt-1 leading-normal">
                  Choose colors, features, or design a custom toy chest with
                  Yulia.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-pastel-sand">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-cocoa-dark">
                  Quantity:
                </span>
                <div className="flex items-center bg-white rounded-xl border border-pastel-sand">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-cocoa-dark hover:bg-pastel-sand/30 rounded-l-xl transition font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-cocoa-dark font-medium text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-cocoa-dark hover:bg-pastel-sand/30 rounded-r-xl transition font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {/* Add to Selection list */}
                <button
                  onClick={handleAddToSelection}
                  className={`flex-1 py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    addedToSelection
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white border border-pastel-pink hover:bg-pastel-sand/20 text-cocoa-dark'
                  }`}
                >
                  {addedToSelection ? (
                    <>Added to Selection! 🐰</>
                  ) : (
                    <>
                      <FaBasketShopping />
                      {isInCart
                        ? 'In Selection (Add More)'
                        : 'Add to Selection'}
                    </>
                  )}
                </button>

                {/* WhatsApp Quick Inquiry */}
                <button
                  onClick={handleWhatsAppQuickInquiry}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <FaWhatsapp size={20} />
                  Order / Inquire Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-serif font-bold text-cocoa-dark mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group bg-white rounded-3xl overflow-hidden hover:shadow-md transition-all duration-300 border border-pastel-sand"
                >
                  <div className="aspect-square overflow-hidden bg-cream-bg">
                    <img
                      src={p.imageUrl[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <h3 className="text-cocoa-dark font-semibold text-sm mb-1 group-hover:text-pastel-pink transition-colors line-clamp-1 font-serif">
                      {p.name}
                    </h3>
                    <span className="text-pastel-pink font-bold text-base">
                      {p.price}
                      {p.currency}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetailPage;
