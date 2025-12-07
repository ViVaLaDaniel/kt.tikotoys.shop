import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order } from '../types';

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  getOrdersByUserId: (userId: number) => Order[];
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'kt-tikotoys-orders';

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved).map((order: any) => ({
            ...order,
            createdAt: new Date(order.createdAt),
          }));
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.max(...orders.map(o => o.id), 0) + 1,
      createdAt: new Date(),
    };
    setOrders([newOrder, ...orders]);
  };

  const getOrdersByUserId = (userId: number): Order[] => {
    return orders.filter(order => order.userId === userId);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, getOrdersByUserId }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = (): OrdersContextType => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
