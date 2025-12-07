import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutShippingPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Germany',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Сохраняем данные в sessionStorage для следующего шага
    sessionStorage.setItem('shippingData', JSON.stringify({ ...formData, shippingMethod }));
    navigate('/checkout/payment');
  };

  if (items.length === 0) {
    return (
      <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-32 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-pink-500 hover:text-pink-400">← Back to Shop</Link>
        </div>
      </main>
    );
  }

  const subtotal = getTotal();
  const shippingCost = shippingMethod === 'express' ? 9.99 : (subtotal > 50 ? 0 : 5.99);
  const total = subtotal + shippingCost;

  return (
    <main className="flex-grow w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <span className="text-white font-medium hidden sm:block">Shipping</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 font-bold">2</div>
              <span className="text-gray-400 hidden sm:block">Payment</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 font-bold">3</div>
              <span className="text-gray-400 hidden sm:block">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Форма */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Контактная информация */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Адрес доставки */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Street address"
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-pink-500 focus:outline-none"
                    >
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Spain">Spain</option>
                      <option value="Italy">Italy</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Austria">Austria</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Способ доставки */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6">Shipping Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                  shippingMethod === 'standard' ? 'bg-pink-500/20 border-2 border-pink-500' : 'bg-gray-700 border-2 border-transparent'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      shippingMethod === 'standard' ? 'border-pink-500' : 'border-gray-500'
                    }`}>
                      {shippingMethod === 'standard' && <div className="w-3 h-3 bg-pink-500 rounded-full" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">Standard Shipping</p>
                      <p className="text-gray-400 text-sm">5-7 business days</p>
                    </div>
                  </div>
                  <span className={subtotal > 50 ? 'text-green-400' : 'text-white'}>
                    {subtotal > 50 ? 'FREE' : '5.99€'}
                  </span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                  shippingMethod === 'express' ? 'bg-pink-500/20 border-2 border-pink-500' : 'bg-gray-700 border-2 border-transparent'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      shippingMethod === 'express' ? 'border-pink-500' : 'border-gray-500'
                    }`}>
                      {shippingMethod === 'express' && <div className="w-3 h-3 bg-pink-500 rounded-full" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">Express Shipping</p>
                      <p className="text-gray-400 text-sm">2-3 business days</p>
                    </div>
                  </div>
                  <span className="text-white">9.99€</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to="/cart"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-4 px-6 rounded-xl font-bold text-center transition-colors"
              >
                ← Back to Cart
              </Link>
              <button
                type="submit"
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-pink-500/30"
              >
                Continue to Payment
              </button>
            </div>
          </form>

          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <img
                      src={product.imageUrl[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <p className="text-white text-sm font-medium line-clamp-1">{product.name}</p>
                      <p className="text-gray-400 text-sm">Qty: {quantity}</p>
                    </div>
                    <span className="text-white text-sm">{(product.price * quantity).toFixed(2)}€</span>
                  </div>
                ))}
              </div>

              <hr className="border-gray-700 my-4" />

              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-400' : 'text-white'}>
                    {shippingCost === 0 ? 'FREE' : `${shippingCost.toFixed(2)}€`}
                  </span>
                </div>
                <hr className="border-gray-700" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-amber-400">{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutShippingPage;
