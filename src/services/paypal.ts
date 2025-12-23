// PayPal Payment Service
// ======================
// Интеграция с PayPal для приёма платежей
// 
// Настройка:
// 1. Создайте аккаунт на https://developer.paypal.com/
// 2. Dashboard → My Apps & Credentials
// 3. Create App → скопируйте Client ID в .env.local
// 
// Документация: https://developer.paypal.com/sdk/js/

export interface PayPalConfig {
  clientId: string;
  currency: string;
  intent: 'capture' | 'authorize';
}

// Получить конфиг PayPal
export const getPayPalConfig = (): PayPalConfig => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  
  return {
    clientId: clientId || 'test', // 'test' для sandbox mode
    currency: 'EUR',
    intent: 'capture',
  };
};

// Проверка настройки PayPal
export const isPayPalConfigured = (): boolean => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  return !!clientId && clientId !== 'your_paypal_client_id';
};

// Типы для PayPal заказа
export interface PayPalOrderItem {
  name: string;
  quantity: number;
  unit_amount: {
    currency_code: string;
    value: string;
  };
}

export interface PayPalOrder {
  items: PayPalOrderItem[];
  total: string;
  shipping: string;
  customerEmail: string;
}

// Создание PayPal заказа (для использования с PayPal Buttons)
export const createPayPalOrder = (order: PayPalOrder) => {
  return {
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: order.total,
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: (
                parseFloat(order.total) - parseFloat(order.shipping)
              ).toFixed(2),
            },
            shipping: {
              currency_code: 'EUR',
              value: order.shipping,
            },
          },
        },
        items: order.items,
      },
    ],
    application_context: {
      shipping_preference: 'GET_FROM_FILE',
      user_action: 'PAY_NOW',
    },
  };
};

// Обработка успешного платежа
export const onPayPalApprove = async (data: { orderID: string }) => {
  console.log('✅ PayPal payment approved:', data.orderID);
  
  // В production: верификация платежа на backend
  // const response = await fetch('/api/capture-paypal-order', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ orderId: data.orderID }),
  // });
  
  return {
    success: true,
    orderId: data.orderID,
  };
};

// Обработка ошибки
export const onPayPalError = (error: Error) => {
  console.error('❌ PayPal error:', error);
  return {
    success: false,
    error: error.message,
  };
};
