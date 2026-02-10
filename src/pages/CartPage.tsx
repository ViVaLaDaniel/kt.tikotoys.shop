import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <>
        <SEO title="Your Cart" noindex />
        <main className="flex-grow w-full min-h-screen pt-32 px-4 flex flex-col items-center justify-center bg-cream-bg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-moccasin/50 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-brown-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h1 className="text-3xl font-bold text-brown-dark mb-4">Your Cart is Empty</h1>
            <p className="text-brown-light mb-8">Looks like you haven&apos;t added anything yet.</p>
            <Link to="/shop" className="inline-block bg-sand hover:bg-salmon text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg">
              Start Shopping
            </Link>
          </motion.div>
        </main>
      </>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <>
      <SEO title="Shopping Cart" noindex />
      <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 md:px-8 bg-cream-bg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-brown-dark mb-8">Shopping <span className="text-salmon">Cart</span></h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode='popLayout'>
                {items.map(({ product, quantity }) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 flex gap-4 border border-sand/30 shadow-sm"
                  >
                    <Link to={`/product/${product.id}`} className="shrink-0">
                      <img src={product.imageUrl[0]} alt={product.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl bg-cream-bg border border-sand/20" />
                    </Link>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-lg font-semibold text-brown-dark hover:text-salmon transition-colors">{product.name}</h3>
                        </Link>
                        {/* Assuming description is short enough or truncated */}
                        <p className="text-brown-light text-sm mt-1 line-clamp-2 hidden md:block opacity-80">{product.description}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-white rounded-lg border border-sand/30 shadow-inner">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-brown-light hover:bg-moccasin/30 rounded-l-lg transition"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-medium text-brown-dark">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-brown-light hover:bg-moccasin/30 rounded-r-lg transition"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-salmon">{(product.price * quantity).toFixed(2)}{product.currency}</span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-brown-light hover:text-red-500 transition-colors p-2 bg-white rounded-lg hover:bg-red-50"
                            aria-label="Remove item"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length > 0 && (
                <div className="flex justify-end">
                   <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 underline decoration-red-200 hover:decoration-red-400 transition-all">
                     Clear all items
                   </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-sand/30 shadow-lg sticky top-24"
              >
                <h2 className="text-xl font-bold text-brown-dark mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-brown-light"><span>Subtotal</span><span className="text-brown-dark font-medium">{subtotal.toFixed(2)}€</span></div>
                  <div className="flex justify-between text-brown-light">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-bold' : 'text-brown-dark font-medium'}>
                      {shipping === 0 ? 'FREE' : `${shipping.toFixed(2)}€`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg border border-green-100 flex items-center gap-2">
                      <span>🚚</span> Free shipping on orders over 50€!
                    </div>
                  )}
                  <hr className="border-sand/20 my-4" />
                  <div className="flex justify-between text-xl font-bold items-end">
                    <span className="text-brown-dark">Total</span>
                    <span className="text-salmon text-2xl">{total.toFixed(2)}€</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-grow bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand/50 focus:border-salmon focus:outline-none placeholder-brown-light/50 transition-colors"
                    />
                    <button className="bg-sand/20 hover:bg-sand/40 text-brown-dark font-medium px-4 py-3 rounded-xl transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout/shipping')}
                  className="w-full bg-gradient-to-r from-salmon to-sand hover:opacity-90 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-salmon/30 hover:shadow-xl hover:-translate-y-1"
                >
                  Proceed to Checkout
                </button>

                <div className="mt-6 text-center">
                   <p className="text-xs text-brown-light mb-2">We accept</p>
                   <div className="flex justify-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                      <span className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold">VISA</span>
                      <span className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold">MC</span>
                      <span className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold">PP</span>
                   </div>
                </div>

                <Link to="/shop" className="block text-center text-brown-light hover:text-salmon mt-6 text-sm transition-colors font-medium">
                  ← Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage;
