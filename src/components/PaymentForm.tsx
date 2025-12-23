// PaymentForm Component
// =====================
// Компонент формы оплаты с поддержкой Stripe и PayPal

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { getPayPalConfig, isPayPalConfigured, createPayPalOrder, onPayPalApprove } from '../services/paypal';
import { createCheckoutSession, CheckoutItem } from '../services/stripe';

interface PaymentFormProps {
  items: CheckoutItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customerEmail: string;
  onSuccess: (orderId: string, method: 'stripe' | 'paypal') => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  items,
  subtotal,
  shipping,
  total,
  customerEmail,
  onSuccess,
  onError,
}) => {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const paypalConfig = getPayPalConfig();

  // Обработка Stripe платежа
  const handleStripePayment = async () => {
    setIsProcessing(true);
    try {
      const result = await createCheckoutSession({
        items,
        customerEmail,
        successUrl: window.location.origin + '/order-success',
        cancelUrl: window.location.origin + '/cart',
      });
      
      if (result.success && result.orderId) {
        onSuccess(result.orderId, 'stripe');
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  // Создание PayPal заказа
  const createOrder = (_data: unknown, actions: { order: { create: (data: unknown) => Promise<string> } }) => {
    const orderData = createPayPalOrder({
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unit_amount: {
          currency_code: 'EUR',
          value: item.price.toFixed(2),
        },
      })),
      total: total.toFixed(2),
      shipping: shipping.toFixed(2),
      customerEmail,
    });
    return actions.order.create(orderData);
  };

  // Подтверждение PayPal платежа
  const handlePayPalApprove = async (data: { orderID: string }, actions: { order: { capture: () => Promise<unknown> } }) => {
    setIsProcessing(true);
    try {
      await actions.order.capture();
      const result = await onPayPalApprove({ orderID: data.orderID });
      if (result.success) {
        onSuccess(result.orderId, 'paypal');
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'PayPal payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6">
        {t('checkout.payment')}
      </h3>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          type="button"
          onClick={() => setSelectedMethod('stripe')}
          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
            selectedMethod === 'stripe'
              ? 'border-pink-500 bg-pink-500/10'
              : 'border-gray-600 hover:border-gray-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">💳</span>
            <span className="font-medium text-white">Stripe</span>
          </div>
          <span className="text-xs text-gray-400">
            Visa, Mastercard, Apple Pay
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSelectedMethod('paypal')}
          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
            selectedMethod === 'paypal'
              ? 'border-pink-500 bg-pink-500/10'
              : 'border-gray-600 hover:border-gray-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🅿️</span>
            <span className="font-medium text-white">PayPal</span>
          </div>
          <span className="text-xs text-gray-400">
            PayPal Balance, Cards
          </span>
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-900/50 rounded-xl p-4 mb-6">
        <div className="flex justify-between text-gray-400 mb-2">
          <span>{t('cart.subtotal')}</span>
          <span>{subtotal.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between text-gray-400 mb-2">
          <span>{t('cart.shipping')}</span>
          <span>{shipping === 0 ? t('cart.shippingFree') : `${shipping.toFixed(2)}€`}</span>
        </div>
        <div className="h-px bg-gray-700 my-3" />
        <div className="flex justify-between text-white font-bold text-lg">
          <span>{t('cart.total')}</span>
          <span className="text-pink-400">{total.toFixed(2)}€</span>
        </div>
      </div>

      {/* Payment Buttons */}
      {selectedMethod === 'stripe' ? (
        <button
          onClick={handleStripePayment}
          disabled={isProcessing}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {t('common.loading')}
            </>
          ) : (
            <>
              💳 {t('checkout.placeOrder')} - {total.toFixed(2)}€
            </>
          )}
        </button>
      ) : (
        <PayPalScriptProvider options={{ 
          clientId: paypalConfig.clientId,
          currency: 'EUR',
          intent: 'capture',
        }}>
          <PayPalButtons
            style={{ 
              layout: 'vertical',
              color: 'gold',
              shape: 'rect',
              label: 'pay',
              height: 50,
            }}
            createOrder={createOrder}
            onApprove={handlePayPalApprove}
            onError={(err) => onError(err.toString())}
            disabled={isProcessing}
          />
        </PayPalScriptProvider>
      )}

      {/* Demo Mode Warning */}
      {(!isPayPalConfigured() || !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-amber-400 text-sm text-center">
            ⚠️ Demo Mode - Payments are simulated
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
