import { jest } from '@jest/globals';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { OrdersProvider, useOrders } from '../OrdersContext';
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

const mockOrderData = {
  userId: 'user-123',
  items: [{ product: mockProduct, quantity: 2 }],
  total: 100,
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'Marbella',
    postalCode: '29670',
    country: 'Spain',
  },
  status: 'pending' as const,
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <OrdersProvider>{children}</OrdersProvider>
);

beforeEach(() => {
  localStorage.clear();
});

describe('OrdersContext', () => {
  describe('useOrders outside provider', () => {
    it('throws when used outside OrdersProvider', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => {
        renderHook(() => useOrders());
      }).toThrow('useOrders must be used within an OrdersProvider');
      spy.mockRestore();
    });
  });

  describe('initial state', () => {
    it('starts with empty orders', () => {
      const { result } = renderHook(() => useOrders(), { wrapper });
      expect(result.current.orders).toEqual([]);
    });
  });

  describe('addOrder', () => {
    it('adds an order with auto-generated id and createdAt', () => {
      const { result } = renderHook(() => useOrders(), { wrapper });

      act(() => {
        result.current.addOrder(mockOrderData);
      });

      expect(result.current.orders).toHaveLength(1);
      const order = result.current.orders[0];
      expect(order.id).toBe(1);
      expect(order.userId).toBe('user-123');
      expect(order.total).toBe(100);
      expect(order.createdAt).toBeInstanceOf(Date);
    });

    it('assigns incrementing ids', () => {
      const { result } = renderHook(() => useOrders(), { wrapper });

      act(() => {
        result.current.addOrder(mockOrderData);
      });
      act(() => {
        result.current.addOrder({ ...mockOrderData, userId: 'user-456' });
      });

      expect(result.current.orders).toHaveLength(2);
      // newest order first
      expect(result.current.orders[0].id).toBe(2);
      expect(result.current.orders[1].id).toBe(1);
    });

    it('prepends new orders (newest first)', () => {
      const { result } = renderHook(() => useOrders(), { wrapper });

      act(() => {
        result.current.addOrder(mockOrderData);
      });
      act(() => {
        result.current.addOrder({ ...mockOrderData, userId: 'user-456' });
      });

      expect(result.current.orders[0].userId).toBe('user-456');
      expect(result.current.orders[1].userId).toBe('user-123');
    });
  });

  describe('getOrdersByUserId', () => {
    it('returns orders for a specific user', () => {
      const { result } = renderHook(() => useOrders(), { wrapper });

      act(() => {
        result.current.addOrder(mockOrderData);
      });
      act(() => {
        result.current.addOrder({ ...mockOrderData, userId: 'user-456' });
      });
      act(() => {
        result.current.addOrder({
          ...mockOrderData,
          userId: 'user-123',
          total: 200,
        });
      });

      const userOrders = result.current.getOrdersByUserId('user-123');
      expect(userOrders).toHaveLength(2);
      for (const order of userOrders) {
        expect(order.userId).toBe('user-123');
      }
    });

    it('returns empty array for a user with no orders', () => {
      const { result } = renderHook(() => useOrders(), { wrapper });

      act(() => {
        result.current.addOrder(mockOrderData);
      });

      const userOrders = result.current.getOrdersByUserId('nonexistent');
      expect(userOrders).toEqual([]);
    });
  });

  describe('localStorage persistence', () => {
    it('persists orders to localStorage', () => {
      const { result } = renderHook(() => useOrders(), { wrapper });

      act(() => {
        result.current.addOrder(mockOrderData);
      });

      const stored = localStorage.getItem('kt-tikotoys-orders');
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].userId).toBe('user-123');
    });

    it('loads orders from localStorage on init', () => {
      const storedOrders = [
        { ...mockOrderData, id: 1, createdAt: new Date().toISOString() },
      ];
      localStorage.setItem(
        'kt-tikotoys-orders',
        JSON.stringify(storedOrders),
      );

      const { result } = renderHook(() => useOrders(), { wrapper });
      expect(result.current.orders).toHaveLength(1);
      expect(result.current.orders[0].createdAt).toBeInstanceOf(Date);
    });

    it('handles corrupted localStorage gracefully', () => {
      localStorage.setItem('kt-tikotoys-orders', 'invalid-json');

      const { result } = renderHook(() => useOrders(), { wrapper });
      expect(result.current.orders).toEqual([]);
    });
  });
});
