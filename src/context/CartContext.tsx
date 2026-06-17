import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product, CartItem } from '../types';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../utils/localStorage';

export type { CartItem };

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

// Создание контекста
const CartContext = createContext<CartContextType | undefined>(undefined);

// Ключ для localStorage
const CART_STORAGE_KEY = 'kt-tikotoys-cart';

// Провайдер корзины
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(() =>
    loadFromLocalStorage<CartItem[]>(CART_STORAGE_KEY, []),
  );

  useEffect(() => {
    saveToLocalStorage(CART_STORAGE_KEY, items);
  }, [items]);

  // Добавить товар в корзину
  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevItems, { product, quantity }];
    });
  };

  // Удалить товар из корзины
  const removeFromCart = (productId: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    );
  };

  // Обновить количество товара
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  // Очистить корзину
  const clearCart = () => {
    setItems([]);
  };

  // Получить общую сумму
  const getTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  // Получить количество товаров
  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования корзины
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
