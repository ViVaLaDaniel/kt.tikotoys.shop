import React, { useState, useMemo } from 'react';
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
  FaGift,
  FaBoxesPacking,
} from 'react-icons/fa6';
import { openWhatsApp } from '../utils/whatsapp';

type BoxType = 'small' | 'large' | 'individual';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const [boxType, setBoxType] = useState<BoxType>('small');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calculate slots used (excluding box packages themselves from the slot count)
  const selectedToys = useMemo(() => {
    return items.filter(({ product }) => product.category !== 'boxes');
  }, [items]);

  const totalSlotsUsed = useMemo(() => {
    return selectedToys.reduce((acc, item) => acc + item.quantity, 0);
  }, [selectedToys]);

  // Max slots configuration
  const maxSlots = useMemo(() => {
    if (boxType === 'small') return 8;
    if (boxType === 'large') return 15;
    return 999; // unlimited for individual selection
  }, [boxType]);

  // Subtotal (if they selected a box, we set price to box price. If individual, we sum toys price)
  const calculatedPrice = useMemo(() => {
    if (boxType === 'small') return 500;
    if (boxType === 'large') return 1000;
    return selectedToys.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }, [boxType, selectedToys]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let itemsText = '';
    selectedToys.forEach(({ product, quantity }) => {
      itemsText += `• ${product.name} x${quantity}\n`;
    });

    const boxTitle =
      boxType === 'small'
        ? 'Charming Gift Box (Small - 500€, max 8 toys)'
        : boxType === 'large'
          ? 'Royal Gift Box (Large - 1000€, max 15 toys)'
          : 'Custom Individual Order';

    const message = `🐰 *New Custom Toy Inquiry* 🐰

*Box Type / Order Mode:*
📦 ${boxTitle}

*Customer Details:*
👤 Name: ${name}
📧 Email: ${email}
📱 WhatsApp: ${phone}
📍 Shipping Address: ${address}

*Packed Toys (${totalSlotsUsed}/${boxType !== 'individual' ? maxSlots : 'No limit'} slots used):*
${itemsText}
💰 *Total Estimated Value:* ${calculatedPrice.toFixed(2)}€

${notes ? `📝 *Custom Requests/Notes:* \n${notes}` : ''}

_Sent from Yulia's Toy Chest Showcase (Spain, Marbella)_`;

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      openWhatsApp(message);
      setTimeout(() => {
        clearCart();
      }, 1000);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <main className="flex-grow w-full min-h-screen pt-32 pb-32 px-4 flex items-center justify-center bg-transparent font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white border border-pastel-sand p-8 rounded-3xl shadow-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-500 flex items-center justify-center">
              <FaWhatsapp size={40} />
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-cocoa-dark mb-4">
            Inquiry Sent!
          </h1>
          <p className="text-cocoa-light mb-6">
            Thank you, {name}! Your custom toy selection is prepared. We have
            opened WhatsApp to start aligning on designs and shipping details
            with Yulia.
          </p>
          <p className="text-xs text-cocoa-light/70 mb-8">
            Yulia will review your box slots, customize character color
            palettes, and calculate delivery options from Spain.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-pastel-pink hover:bg-pastel-lavender text-cocoa-dark px-8 py-3 rounded-xl font-bold transition-all duration-300"
          >
            Return to Gallery
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full min-h-screen pt-28 pb-32 px-4 md:px-8 bg-transparent font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/shop"
            className="text-cocoa-light hover:text-cocoa-dark flex items-center gap-1 text-sm font-semibold transition-colors"
          >
            <FaChevronLeft size={12} /> Return to Toy Gallery
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-cocoa-dark mb-4">
          Bespoke{' '}
          <span className="text-pastel-pink italic">Toy Box Builder</span>
        </h1>
        <p className="text-sm text-cocoa-light mb-10 max-w-2xl leading-relaxed">
          Create a fairytale gift. Choose a premium chest size, select handmade
          plush friends to pack inside it, and send a direct chat inquiry to
          finalize.
        </p>

        {/* Step 1: Choose Box Size */}
        <div className="mb-10 bg-white border border-pastel-sand rounded-3xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-cocoa-dark mb-4 flex items-center gap-2">
            <span className="text-pastel-pink flex items-center">
              <FaGift />
            </span>{' '}
            Step 1: Select Box Size
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                id: 'small',
                title: 'Charming Box (Small)',
                price: '500 €',
                desc: 'Fits up to 8 slots of toys. Wood storage chest & letter included.',
              },
              {
                id: 'large',
                title: 'Royal Chest (Large)',
                price: '1000 €',
                desc: 'Fits up to 15 slots of toys. Customized engravings, silk wraps, priority shipping.',
              },
              {
                id: 'individual',
                title: 'Individual Selection',
                price: 'Price per toy',
                desc: 'No gift box. Order individual plushies or accessories custom made.',
              },
            ].map((box) => (
              <button
                key={box.id}
                onClick={() => setBoxType(box.id as BoxType)}
                className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between h-40 cursor-pointer ${
                  boxType === box.id
                    ? 'border-pastel-pink bg-pastel-pink/5 ring-1 ring-pastel-pink shadow-inner'
                    : 'border-pastel-sand hover:border-pastel-pink bg-white shadow-sm'
                }`}
              >
                <div>
                  <h3 className="font-bold text-cocoa-dark font-serif text-base">
                    {box.title}
                  </h3>
                  <p className="text-xs text-cocoa-light/80 mt-1 leading-normal font-normal">
                    {box.desc}
                  </p>
                </div>
                <span className="text-lg font-bold text-pastel-pink">
                  {box.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Step 2: Pack Box List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-cocoa-dark flex items-center gap-2">
                <span className="text-pastel-pink flex items-center">
                  <FaBoxesPacking />
                </span>{' '}
                Step 2: Pack Your Box
              </h2>
              {boxType !== 'individual' && (
                <div className="text-right">
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full border ${
                      totalSlotsUsed > maxSlots
                        ? 'bg-rose-100 text-rose-600 border-rose-200'
                        : 'bg-emerald-100 text-emerald-600 border-emerald-200'
                    }`}
                  >
                    {totalSlotsUsed} / {maxSlots} Slots Packed
                  </span>
                </div>
              )}
            </div>

            {/* Warnings */}
            {totalSlotsUsed > maxSlots && (
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-xs text-rose-600 leading-normal">
                ⚠️ **Box Exceeded!** You have packed {totalSlotsUsed} toys, but
                the {boxType === 'small' ? 'Small Box' : 'Large Box'} fits only{' '}
                {maxSlots} slots. Please reduce quantities or upgrade to a
                larger chest set above.
              </div>
            )}

            {selectedToys.length === 0 ? (
              <div className="bg-white border border-pastel-sand rounded-3xl p-10 text-center shadow-sm">
                <span className="text-4xl block mb-2">🧸</span>
                <p className="text-cocoa-light font-medium text-sm">
                  Your box builder list is empty.
                </p>
                <Link
                  to="/shop"
                  className="mt-4 inline-block bg-pastel-pink hover:bg-pastel-lavender text-cocoa-dark px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Add Toys from Gallery
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {selectedToys.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-2xl p-4 flex gap-4 border border-pastel-sand shadow-sm"
                    >
                      <Link to={`/product/${product.id}`} className="shrink-0">
                        <img
                          src={product.imageUrl[0]}
                          alt={product.name}
                          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl bg-cream-bg border border-pastel-sand"
                        />
                      </Link>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-bold text-cocoa-dark hover:text-pastel-pink transition-colors text-sm md:text-base font-serif leading-tight">
                                {product.name}
                              </h3>
                            </Link>
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="text-cocoa-light/50 hover:text-red-500 transition-colors p-1"
                            >
                              <FaTrashCan size={12} />
                            </button>
                          </div>
                          {boxType === 'individual' && (
                            <span className="text-xs font-bold text-pastel-pink">
                              {product.price}
                              {product.currency} each
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-cream-bg rounded-lg border border-pastel-sand">
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity - 1)
                              }
                              className="px-2.5 py-0.5 text-cocoa-dark hover:bg-pastel-sand/30 rounded-l-lg transition font-bold"
                            >
                              −
                            </button>
                            <span className="px-3 py-0.5 text-cocoa-dark font-medium text-xs">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(product.id, quantity + 1)
                              }
                              className="px-2.5 py-0.5 text-cocoa-dark hover:bg-pastel-sand/30 rounded-r-lg transition font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-cocoa-light">
                            {boxType === 'individual'
                              ? `${(product.price * quantity).toFixed(2)}€`
                              : `${quantity} slot${quantity > 1 ? 's' : ''}`}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={clearCart}
                    className="text-cocoa-light hover:text-red-500 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Clear selection
                  </button>
                  <div className="text-right">
                    <span className="text-cocoa-light text-xs">
                      Estimated Cost:{' '}
                    </span>
                    <span className="text-xl font-bold text-cocoa-dark">
                      {calculatedPrice.toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Inquiry Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 border border-pastel-sand shadow-sm sticky top-24"
            >
              <h2 className="text-lg font-bold text-cocoa-dark mb-1 flex items-center gap-2">
                <span className="text-pastel-pink flex items-center">
                  <FaCompass />
                </span>{' '}
                Step 3: Inquiry Info
              </h2>
              <p className="text-xs text-cocoa-light mb-6">
                Complete details to align on custom patterns and secure global
                postage.
              </p>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block text-xs font-bold text-cocoa-dark mb-1 uppercase tracking-wider"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa-light/60">
                      <FaUser size={13} />
                    </span>
                    <input
                      type="text"
                      id="inquiry-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-bg/30 border border-pastel-sand focus:border-pastel-pink focus:outline-none placeholder-cocoa-light/35 text-cocoa-dark text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs font-bold text-cocoa-dark mb-1 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa-light/60">
                      <FaEnvelope size={13} />
                    </span>
                    <input
                      type="email"
                      id="inquiry-email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-bg/30 border border-pastel-sand focus:border-pastel-pink focus:outline-none placeholder-cocoa-light/35 text-cocoa-dark text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-xs font-bold text-cocoa-dark mb-1 uppercase tracking-wider"
                  >
                    WhatsApp Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500">
                      <FaWhatsapp size={15} />
                    </span>
                    <input
                      type="tel"
                      id="inquiry-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream-bg/30 border border-pastel-sand focus:border-pastel-pink focus:outline-none placeholder-cocoa-light/35 text-cocoa-dark text-xs transition-colors"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="inquiry-address"
                    className="block text-xs font-bold text-cocoa-dark mb-1 uppercase tracking-wider"
                  >
                    Shipping Address & Country
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-cocoa-light/60">
                      <FaMapLocationDot size={13} />
                    </span>
                    <textarea
                      id="inquiry-address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={2}
                      placeholder="Street, City, Postal Code, Country"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-cream-bg/30 border border-pastel-sand focus:border-pastel-pink focus:outline-none placeholder-cocoa-light/35 text-cocoa-dark text-xs transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="inquiry-notes"
                    className="block text-xs font-bold text-cocoa-dark mb-1 uppercase tracking-wider"
                  >
                    Custom requests / notes
                  </label>
                  <textarea
                    id="inquiry-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Specify preferred toy selection or customized details (color theme, custom call availability, gift engravings)..."
                    className="w-full px-4 py-2 rounded-xl bg-cream-bg/30 border border-pastel-sand focus:border-pastel-pink focus:outline-none placeholder-cocoa-light/35 text-cocoa-dark text-xs transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={
                      loading ||
                      selectedToys.length === 0 ||
                      totalSlotsUsed > maxSlots
                    }
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none text-white py-3.5 px-6 rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-md shadow-emerald-500/10 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaWhatsapp size={20} />
                    {loading ? 'Building inquiry...' : 'Send Inquiry to Yulia'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
