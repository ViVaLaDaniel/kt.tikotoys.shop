import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWhatsapp,
  FaTrashCan,
  FaEnvelope,
  FaUser,
  FaMapLocationDot,
  FaCompass,
  FaChevronLeft,
} from 'react-icons/fa6';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } =
    useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = getTotal();

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Formulate WhatsApp message text
    const whatsappNumber = '34642841240';
    let itemDetailsText = '';

    items.forEach(({ product, quantity }) => {
      itemDetailsText += `• ${product.name} x${quantity} (${product.price * quantity}${product.currency})\n`;
    });

    const message = `🧸 *New Custom Toy Inquiry* 🧸

*Customer Details:*
👤 Name: ${name}
📧 Email: ${email}
📱 WhatsApp/Phone: ${phone}
📍 Shipping Address: ${address}

*Selected Items:*
${itemDetailsText}
💰 *Total Estimated Value:* ${subtotal.toFixed(2)}€

${notes ? `📝 *Custom Requests/Notes:* \n${notes}` : ''}

_Sent from Yulia's Knitted Toys Showcase (Spain, Marbella)_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Simulate sending / saving data
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);

      // Open WhatsApp in new window
      window.open(whatsappUrl, '_blank');

      // Clear selection after a delay
      setTimeout(() => {
        clearCart();
      }, 1000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <main className="flex-grow w-full min-h-screen pt-32 pb-32 px-4 flex items-center justify-center bg-cream-bg font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white border border-moccasin p-8 rounded-3xl shadow-xl"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
            <FaWhatsapp className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-brown-dark mb-4">
            Inquiry Sent!
          </h1>
          <p className="text-brown-light mb-6">
            Thank you, {name}! Your inquiry has been generated and we have
            redirected you to WhatsApp to start the conversation with Yulia.
          </p>
          <p className="text-sm text-brown-light/70 mb-8">
            Yulia will review your requests, custom designs, and shipping rates
            from San Pedro, Spain, to finalize your custom order.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-sand hover:bg-salmon text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-md hover:-translate-y-0.5"
          >
            Back to Collection
          </Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex-grow w-full min-h-screen pt-32 pb-32 px-4 flex items-center justify-center bg-cream-bg font-sans">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-moccasin/50 rounded-full flex items-center justify-center">
            <span className="text-5xl">🧸</span>
          </div>
          <h1 className="text-3xl font-bold text-brown-dark mb-4">
            Your Inquiry List is Empty
          </h1>
          <p className="text-brown-light mb-8">
            Looks like you haven&apos;t selected any toys or boxes yet.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-sand hover:bg-salmon text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-sand/20 hover:-translate-y-0.5"
          >
            Explore Collection
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full min-h-screen pt-28 pb-32 px-4 md:px-8 bg-cream-bg font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-2">
          <Link
            to="/shop"
            className="text-brown-light hover:text-brown-dark flex items-center gap-1 text-sm font-medium transition-colors"
          >
            <FaChevronLeft size={12} /> Back to Collection
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brown-dark mb-8">
          Inquiry <span className="text-salmon italic">Selection</span>
        </h1>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Inquiry List Column */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-bold text-brown-dark mb-2">
              Selected Items ({items.length})
            </h2>

            <AnimatePresence mode="popLayout">
              {items.map(({ product, quantity }) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-4 md:p-5 flex gap-4 border border-moccasin shadow-sm"
                >
                  <Link to={`/product/${product.id}`} className="shrink-0">
                    <img
                      src={product.imageUrl[0]}
                      alt={product.name}
                      className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl bg-cream-bg border border-moccasin"
                    />
                  </Link>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-bold text-brown-dark hover:text-salmon transition-colors text-base md:text-lg leading-snug">
                            {product.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-brown-light/60 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <FaTrashCan size={14} />
                        </button>
                      </div>
                      <p className="text-brown-light text-xs mt-1 line-clamp-2 hidden md:block">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-cream-bg rounded-lg border border-moccasin">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="px-3 py-1 text-brown-dark hover:bg-moccasin/50 rounded-l-lg transition font-bold"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-brown-dark font-medium text-sm">
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="px-3 py-1 text-brown-dark hover:bg-moccasin/50 rounded-r-lg transition font-bold"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-salmon">
                          {(product.price * quantity).toFixed(2)}
                          {product.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={clearCart}
                className="text-brown-light hover:text-red-500 text-sm font-medium transition-colors cursor-pointer"
              >
                Clear all items
              </button>
              <div className="text-right">
                <span className="text-brown-light text-sm">
                  Estimated Subtotal:{' '}
                </span>
                <span className="text-xl font-bold text-brown-dark">
                  {subtotal.toFixed(2)}€
                </span>
              </div>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 border border-moccasin shadow-md sticky top-24"
            >
              <h2 className="text-xl font-bold text-brown-dark mb-1">
                Send Inquiry
              </h2>
              <p className="text-xs text-brown-light mb-6">
                No payment is required now. Fill details to coordinate with
                Yulia.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-bold text-brown-dark mb-1 uppercase tracking-wider"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light/70">
                      <FaUser size={14} />
                    </span>
                    <input
                      type="text"
                      id="inquiry-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream-bg/40 border border-moccasin focus:border-sand focus:outline-none placeholder-brown-light/40 text-brown-dark text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-bold text-brown-dark mb-1 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-light/70">
                      <FaEnvelope size={14} />
                    </span>
                    <input
                      type="email"
                      id="inquiry-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream-bg/40 border border-moccasin focus:border-sand focus:outline-none placeholder-brown-light/40 text-brown-dark text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-xs font-bold text-brown-dark mb-1 uppercase tracking-wider"
                  >
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                      <FaWhatsapp size={16} />
                    </span>
                    <input
                      type="tel"
                      id="inquiry-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream-bg/40 border border-moccasin focus:border-sand focus:outline-none placeholder-brown-light/40 text-brown-dark text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="inquiry-address"
                    className="block text-xs font-bold text-brown-dark mb-1 uppercase tracking-wider"
                  >
                    Shipping Address & Country
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-brown-light/70">
                      <FaMapLocationDot size={14} />
                    </span>
                    <textarea
                      id="inquiry-address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={2}
                      placeholder="Street address, City, Country"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-bg/40 border border-moccasin focus:border-sand focus:outline-none placeholder-brown-light/40 text-brown-dark text-sm transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="inquiry-notes"
                    className="block text-xs font-bold text-brown-dark mb-1 uppercase tracking-wider"
                  >
                    Custom Requests / Notes (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-brown-light/70">
                      <FaCompass size={14} />
                    </span>
                    <textarea
                      id="inquiry-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="E.g., custom colors, personal gift message, specific delivery date requests..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-bg/40 border border-moccasin focus:border-sand focus:outline-none placeholder-brown-light/40 text-brown-dark text-sm transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-400 text-white py-4 px-6 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    {loading ? 'Generating Inquiry...' : 'Inquire via WhatsApp'}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <span className="text-[10px] text-brown-light/60">
                  🌍 We ship worldwide from Marbella / San Pedro, Spain.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
