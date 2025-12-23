// Stripe Payment Service
// ======================
// Интеграция с Stripe для приёма платежей
// 
// Настройка:
// 1. Создайте аккаунт на https://stripe.com/
// 2. Dashboard → Developers → API keys
// 3. Скопируйте Publishable key в .env.local
// 
// Для production понадобится backend (Firebase Functions) для создания PaymentIntent

import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

// Инициализация Stripe
export const getStripe = () => {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!key || key === 'pk_test_your_key_here') {
      console.warn('⚠️ Stripe: API key not configured. Using demo mode.');
      return null;
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

// Типы для Checkout
export interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CheckoutSession {
  items: CheckoutItem[];
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}

// Создание Checkout Session (клиентская часть)
// NOTE: В production это должно вызывать Firebase Function
export const createCheckoutSession = async (session: CheckoutSession) => {
  const stripe = await getStripe();
  
  if (!stripe) {
    // Demo mode - имитация успешного платежа
    console.log('💳 Stripe Demo Mode: Simulating payment...');
    return {
      success: true,
      message: 'Demo payment processed',
      orderId: 'demo_' + Date.now(),
    };
  }

  // В production: вызов Firebase Function для создания PaymentIntent
  // const response = await fetch('/api/create-checkout-session', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(session),
  // });
  // const { sessionId } = await response.json();
  // return stripe.redirectToCheckout({ sessionId });

  console.log('Stripe session would be created:', session);
  return { success: true, message: 'Checkout initialized' };
};

// Форматирование цены для Stripe (в центах)
export const formatPriceForStripe = (price: number): number => {
  return Math.round(price * 100);
};

// Форматирование цены для отображения
export const formatDisplayPrice = (priceInCents: number): string => {
  return (priceInCents / 100).toFixed(2) + '€';
};
