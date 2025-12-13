import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutShippingPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal } = useCart();
  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem('shippingData');
    if (savedData) {
      const data = JSON.parse(savedData);
      return {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        postalCode: data.postalCode || '',
        country: data.country || 'Germany',
      };
    }
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Germany',
    };
  });
  const [shippingMethod, setShippingMethod] = useState(() => {
    const savedData = sessionStorage.getItem('shippingData');
    return savedData ? JSON.parse(savedData).shippingMethod : 'standard';
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('shippingData', JSON.stringify({ ...formData, shippingMethod }));
    navigate('/checkout/payment');
  };

  if (items.length === 0) {
    return (
      <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brown-dark mb-4">Your cart is empty</h1>
          <Link to="/shop" className="text-salmon hover:opacity-80">← Back to Shop</Link>
        </div>
      </main>
    );
  }

  const subtotal = getTotal();
  const shippingCost = shippingMethod === 'express' ? 9.99 : (subtotal > 50 ? 0 : 5.99);
  const total = subtotal + shippingCost;

  return (
    <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sand rounded-full flex items-center justify-center text-white font-bold">1</div>
              <span className="text-brown-dark font-medium hidden sm:block">Shipping</span>
            </div>
            <div className="w-12 h-0.5 bg-sand/50"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-moccasin rounded-full flex items-center justify-center text-brown-light font-bold">2</div>
              <span className="text-brown-light hidden sm:block">Payment</span>
            </div>
            <div className="w-12 h-0.5 bg-sand/50"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-moccasin rounded-full flex items-center justify-center text-brown-light font-bold">3</div>
              <span className="text-brown-light hidden sm:block">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl p-6 border border-sand/50">
              <h2 className="text-xl font-bold text-brown-dark mb-6">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brown-light text-sm mb-2">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" />
                </div>
                <div>
                  <label className="block text-brown-light text-sm mb-2">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" />
                </div>
                <div>
                  <label className="block text-brown-light text-sm mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" />
                </div>
                <div>
                  <label className="block text-brown-light text-sm mb-2">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl p-6 border border-sand/50">
              <h2 className="text-xl font-bold text-brown-dark mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-brown-light text-sm mb-2">Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Street address" className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-brown-light text-sm mb-2">City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-brown-light text-sm mb-2">Postal Code *</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-brown-light text-sm mb-2">Country *</label>
                    <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none">
                      <option>Germany</option> <option>France</option> <option>Spain</option> <option>Italy</option> <option>Netherlands</option> <option>Austria</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl p-6 border border-sand/50">
              <h2 className="text-xl font-bold text-brown-dark mb-6">Shipping Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                  shippingMethod === 'standard' ? 'bg-sand/20 border-2 border-salmon' : 'bg-moccasin/80 border-2 border-sand/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'} onChange={(e) => setShippingMethod(e.target.value)} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      shippingMethod === 'standard' ? 'border-salmon' : 'border-brown-light/50'
                    }`}><div className={`w-3 h-3 rounded-full ${shippingMethod === 'standard' && 'bg-salmon'}`} /></div>
                    <div><p className="text-brown-dark font-medium">Standard Shipping</p><p className="text-brown-light text-sm">5-7 business days</p></div>
                  </div>
                  <span className={subtotal > 50 ? 'text-green-600' : 'text-brown-dark'}>{subtotal > 50 ? 'FREE' : '5.99€'}</span>
                </label>

                <label className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                  shippingMethod === 'express' ? 'bg-sand/20 border-2 border-salmon' : 'bg-moccasin/80 border-2 border-sand/50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={(e) => setShippingMethod(e.target.value)} className="sr-only" />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      shippingMethod === 'express' ? 'border-salmon' : 'border-brown-light/50'
                    }`}><div className={`w-3 h-3 rounded-full ${shippingMethod === 'express' && 'bg-salmon'}`} /></div>
                    <div><p className="text-brown-dark font-medium">Express Shipping</p><p className="text-brown-light text-sm">2-3 business days</p></div>
                  </div>
                  <span className="text-brown-dark">9.99€</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/cart" className="flex-1 bg-moccasin hover:bg-sand/50 text-brown-dark py-4 px-6 rounded-xl font-bold text-center transition-colors">← Back to Cart</Link>
              <button type="submit" className="flex-1 bg-sand hover:bg-salmon text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-sand/40">Continue to Payment</button>
            </div>
          </form>

          <div className="lg:col-span-1">
            <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl p-6 border border-sand/50 sticky top-24">
              <h2 className="text-xl font-bold text-brown-dark mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <img src={product.imageUrl[0]} alt={product.name} className="w-16 h-16 object-cover rounded-lg bg-cream-bg" />
                    <div className="flex-grow"><p className="text-brown-dark text-sm font-medium line-clamp-1">{product.name}</p><p className="text-brown-light text-sm">Qty: {quantity}</p></div>
                    <span className="text-brown-dark text-sm">{(product.price * quantity).toFixed(2)}€</span>
                  </div>
                ))}
              </div>
              <hr className="border-sand/50 my-4" />
              <div className="space-y-3">
                <div className="flex justify-between text-brown-light"><span>Subtotal</span><span className="text-brown-dark">{subtotal.toFixed(2)}€</span></div>
                <div className="flex justify-between text-brown-light">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? 'text-green-600' : 'text-brown-dark'}>{shippingCost === 0 ? 'FREE' : `${shippingCost.toFixed(2)}€`}</span>
                </div>
                <hr className="border-sand/50" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-brown-dark">Total</span>
                  <span className="text-salmon">{total.toFixed(2)}€</span>
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
