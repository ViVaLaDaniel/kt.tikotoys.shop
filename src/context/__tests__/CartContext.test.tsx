import { jest } from '@jest/globals';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { Product } from '../../types';

const mockProduct: Product = {
  id: 1,
  name: 'Test Toy',
  price: 50,
  currency: '€',
  imageUrl: ['https://example.com/toy.jpg'],
  description: 'A test toy',
  rating: 4.5,
  reviewCount: 10,
};

const mockProduct2: Product = {
  id: 2,
  name: 'Test Toy 2',
  price: 75,
  currency: '€',
  imageUrl: ['https://example.com/toy2.jpg'],
  description: 'Another test toy',
  rating: 4.0,
  reviewCount: 5,
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe('CartContext', () => {
  describe('useCart outside provider', () => {
    it('throws when used outside CartProvider', () => {
      // Suppress console.error for this test
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within a CartProvider');
      spy.mockRestore();
    });
  });

  describe('initial state', () => {
    it('starts with empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      expect(result.current.items).toEqual([]);
      expect(result.current.getTotal()).toBe(0);
      expect(result.current.getItemCount()).toBe(0);
    });
  });

  describe('addToCart', () => {
    it('adds a product with default quantity 1', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product.id).toBe(1);
      expect(result.current.items[0].quantity).toBe(1);
    });

    it('adds a product with custom quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 3);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });

    it('increments quantity when adding the same product again', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });
      act(() => {
        result.current.addToCart(mockProduct, 2);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });

    it('adds multiple different products', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });
      act(() => {
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);
    });
  });

  describe('removeFromCart', () => {
    it('removes a product by id', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct2);
      });
      act(() => {
        result.current.removeFromCart(1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product.id).toBe(2);
    });

    it('does nothing when removing a non-existent product', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });
      act(() => {
        result.current.removeFromCart(9999);
      });

      expect(result.current.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('updates the quantity of an existing item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });
      act(() => {
        result.current.updateQuantity(1, 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('removes the item when quantity is set to 0', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });
      act(() => {
        result.current.updateQuantity(1, 0);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('removes the item when quantity is negative', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
      });
      act(() => {
        result.current.updateQuantity(1, -1);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('removes all items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct2);
      });
      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.getTotal()).toBe(0);
      expect(result.current.getItemCount()).toBe(0);
    });
  });

  describe('getTotal', () => {
    it('calculates total price correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 2); // 50 * 2 = 100
        result.current.addToCart(mockProduct2, 1); // 75 * 1 = 75
      });

      expect(result.current.getTotal()).toBe(175);
    });
  });

  describe('getItemCount', () => {
    it('counts total items across products', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 2);
        result.current.addToCart(mockProduct2, 3);
      });

      expect(result.current.getItemCount()).toBe(5);
    });
  });

  describe('localStorage persistence', () => {
    it('persists cart to localStorage', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct, 2);
      });

      const stored = localStorage.getItem('kt-tikotoys-cart');
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].product.id).toBe(1);
      expect(parsed[0].quantity).toBe(2);
    });

    it('loads cart from localStorage on init', () => {
      const cartData = [{ product: mockProduct, quantity: 3 }];
      localStorage.setItem('kt-tikotoys-cart', JSON.stringify(cartData));

      const { result } = renderHook(() => useCart(), { wrapper });
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(3);
    });

    it('handles corrupted localStorage gracefully', () => {
      localStorage.setItem('kt-tikotoys-cart', 'not-json');

      const { result } = renderHook(() => useCart(), { wrapper });
      expect(result.current.items).toEqual([]);
    });
  });
});
