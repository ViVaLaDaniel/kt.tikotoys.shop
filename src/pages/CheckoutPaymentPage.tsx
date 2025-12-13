import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';

interface ShippingData { firstName: string; lastName: string; email: string; phone: string; address: string; city: string; postalCode: string; country: string; shippingMethod: string; }

const CheckoutPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('shippingData');
    if (saved) {
      setShippingData(JSON.parse(saved));
    } else if (!orderPlaced) { // Не перенаправлять, если заказ уже размещен
      navigate('/checkout/shipping');
    }
  }, [navigate, orderPlaced]);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name === 'number') value = (value.replace(/\D/g, '').match(/.{1,4}/g) || []).join(' ').slice(0, 19);
    if (name === 'expiry') value = (value.replace(/\D/g, '').match(/.{1,2}/g) || []).join('/').slice(0, 5);
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 3);
    setCardData({ ...cardData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      if (user && shippingData) {
        const subtotal = getTotal();
        const shippingCost = shippingData.shippingMethod === 'express' ? 9.99 : (subtotal > 50 ? 0 : 5.99);
        addOrder({ userId: user.id, items, total: subtotal + shippingCost, shippingAddress: { ...shippingData }, status: 'pending' });
      }
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
      sessionStorage.removeItem('shippingData');
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 flex items-center justify-center">
        <div className="text-center"><h1 className="text-2xl font-bold text-brown-dark mb-4">Your cart is empty</h1><Link to="/shop" className="text-salmon hover:opacity-80">← Back to Shop</Link></div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"><svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
          <h1 className="text-3xl font-bold text-brown-dark mb-4">Order Placed Successfully!</h1>
          <p className="text-brown-light mb-2">Thank you for your purchase, {shippingData?.firstName}!</p>
          <p className="text-brown-light mb-8">We've sent a confirmation email to <span className="text-salmon">{shippingData?.email}</span></p>
          <Link to="/shop" className="inline-block bg-sand hover:bg-salmon text-white px-8 py-3 rounded-xl font-bold transition-all duration-300">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  const subtotal = getTotal();
  const shippingCost = shippingData?.shippingMethod === 'express' ? 9.99 : (subtotal > 50 ? 0 : 5.99);
  const total = subtotal + shippingCost;

  return (
    <main className="flex-grow w-full min-h-screen pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
              <span className="text-green-500 font-medium hidden sm:block">Shipping</span>
            </div>
            <div className="w-12 h-0.5 bg-sand"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sand rounded-full flex items-center justify-center text-white font-bold">2</div>
              <span className="text-brown-dark font-medium hidden sm:block">Payment</span>
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
              <h2 className="text-xl font-bold text-brown-dark mb-6">Payment Method</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'bg-sand/20 border-2 border-salmon' : 'bg-moccasin/80 border-2 border-sand/50'
                }`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="sr-only" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-salmon' : 'border-brown-light/50'}`}><div className={`w-3 h-3 rounded-full ${paymentMethod === 'card' && 'bg-salmon'}`} /></div>
                  <span className="text-brown-dark">Credit Card</span>
                </label>
                <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === 'paypal' ? 'bg-sand/20 border-2 border-salmon' : 'bg-moccasin/80 border-2 border-sand/50'
                }`}>
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} className="sr-only" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-salmon' : 'border-brown-light/50'}`}><div className={`w-3 h-3 rounded-full ${paymentMethod === 'paypal' && 'bg-salmon'}`} /></div>
                  <span className="text-brown-dark">PayPal</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div><label className="block text-brown-light text-sm mb-2">Card Number *</label><input type="text" name="number" value={cardData.number} onChange={handleCardChange} required placeholder="1234 5678 9012 3456" className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" /></div>
                  <div><label className="block text-brown-light text-sm mb-2">Name on Card *</label><input type="text" name="name" value={cardData.name} onChange={handleCardChange} required placeholder="John Doe" className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-brown-light text-sm mb-2">Expiry Date *</label><input type="text" name="expiry" value={cardData.expiry} onChange={handleCardChange} required placeholder="MM/YY" className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" /></div>
                    <div><label className="block text-brown-light text-sm mb-2">CVV *</label><input type="text" name="cvv" value={cardData.cvv} onChange={handleCardChange} required placeholder="123" className="w-full bg-cream-bg text-brown-dark px-4 py-3 rounded-xl border border-sand focus:border-salmon focus:outline-none" /></div>
                  </div>
                </div>
              )}
              {paymentMethod === 'paypal' && <div className="text-center py-8 text-brown-light"><p>You will be redirected to PayPal to complete your payment.</p></div>}
            </div>

            <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl p-6 border border-sand/50">
              <div className="flex justify-between items-center mb-4"><h2 className="text-xl font-bold text-brown-dark">Shipping Address</h2><Link to="/checkout/shipping" className="text-salmon hover:opacity-80 text-sm">Edit</Link></div>
              {shippingData && <div className="text-brown-light"><p className="text-brown-dark font-medium">{shippingData.firstName} {shippingData.lastName}</p><p>{shippingData.address}</p><p>{shippingData.postalCode} {shippingData.city}</p><p>{shippingData.country}</p><p className="mt-2">{shippingData.email}</p><p>{shippingData.phone}</p></div>}
            </div>

            <div className="flex gap-4">
              <Link to="/checkout/shipping" className="flex-1 bg-moccasin hover:bg-sand/50 text-brown-dark py-4 px-6 rounded-xl font-bold text-center transition-colors">← Back</Link>
              <button type="submit" disabled={isProcessing} className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                isProcessing ? 'bg-sand/50 text-white cursor-not-allowed' : 'bg-sand hover:bg-salmon text-white shadow-lg shadow-sand/40'
              }`}>
                {isProcessing ? (<><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Processing...</>) : `Place Order • ${total.toFixed(2)}€`}
              </button>
            </div>
          </form>

          <div className="lg:col-span-1">
            <div className="bg-moccasin/50 backdrop-blur-sm rounded-2xl p-6 border border-sand/50 sticky top-24">
              <h2 className="text-xl font-bold text-brown-dark mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map(({ product, quantity }) => (<div key={product.id} className="flex gap-3"><img src={product.imageUrl[0]} alt={product.name} className="w-16 h-16 object-cover rounded-lg bg-cream-bg" /><div className="flex-grow"><p className="text-brown-dark text-sm font-medium line-clamp-1">{product.name}</p><p className="text-brown-light text-sm">Qty: {quantity}</p></div><span className="text-brown-dark text-sm">{(product.price * quantity).toFixed(2)}€</span></div>))}
              </div>
              <hr className="border-sand/50 my-4" />
              <div className="space-y-3">
                <div className="flex justify-between text-brown-light"><span>Subtotal</span><span className="text-brown-dark">{subtotal.toFixed(2)}€</span></div>
                <div className="flex justify-between text-brown-light"><span>Shipping ({shippingData?.shippingMethod === 'express' ? 'Express' : 'Standard'})</span><span className={shippingCost === 0 ? 'text-green-600' : 'text-brown-dark'}>{shippingCost === 0 ? 'FREE' : `${shippingCost.toFixed(2)}€`}</span></div>
                <hr className="border-sand/50" />
                <div className="flex justify-between text-lg font-bold"><span className="text-brown-dark">Total</span><span className="text-salmon">{total.toFixed(2)}€</span></div>
              </div>
              <div className="mt-6 p-4 bg-sand/20 rounded-xl flex items-center gap-3 border border-sand/50">
                <svg className="w-6 h-6 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <p className="text-brown-light text-sm">Your payment information is secure and encrypted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPaymentPage;
