// Firestore Services for KT.TikoToys
// ===================================
// Сервисы для работы с базой данных Firestore

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, Order, User } from '../types';

// ==================
// PRODUCTS
// ==================

const productsCollection = collection(db, 'products');

export const productService = {
  // Получить все товары
  async getAll(): Promise<Product[]> {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  },

  // Получить товар по ID
  async getById(id: string): Promise<Product | null> {
    const docRef = doc(db, 'products', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Product;
    }
    return null;
  },

  // Получить товары по категории
  async getByCategory(category: string): Promise<Product[]> {
    const q = query(productsCollection, where('category', '==', category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  },

  // Добавить товар (admin)
  async add(product: Omit<Product, 'id'>): Promise<string> {
    const docRef = await addDoc(productsCollection, {
      ...product,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Обновить товар (admin)
  async update(id: string, data: Partial<Product>): Promise<void> {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now(),
    });
  },

  // Удалить товар (admin)
  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  },
};

// ==================
// ORDERS
// ==================

const ordersCollection = collection(db, 'orders');

export interface CreateOrderData {
  userId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: 'stripe' | 'paypal';
  subtotal: number;
  shipping: number;
  total: number;
}

export const orderService = {
  // Создать заказ
  async create(orderData: CreateOrderData): Promise<string> {
    const docRef = await addDoc(ordersCollection, {
      ...orderData,
      status: 'pending',
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Получить заказы пользователя
  async getByUserId(userId: string): Promise<Order[]> {
    const q = query(
      ordersCollection,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  },

  // Получить заказ по ID
  async getById(id: string): Promise<Order | null> {
    const docRef = doc(db, 'orders', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as Order;
    }
    return null;
  },

  // Обновить статус заказа (admin)
  async updateStatus(id: string, status: string): Promise<void> {
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now(),
    });
  },

  // Получить все заказы (admin)
  async getAll(): Promise<Order[]> {
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  },
};

// ==================
// USERS
// ==================

const usersCollection = collection(db, 'users');

export const userService = {
  // Создать профиль пользователя
  async createProfile(
    uid: string,
    data: { email: string; name: string }
  ): Promise<void> {
    await addDoc(usersCollection, {
      uid,
      ...data,
      isAdmin: false,
      createdAt: Timestamp.now(),
    });
  },

  // Получить профиль по UID
  async getByUid(uid: string): Promise<User | null> {
    const q = query(usersCollection, where('uid', '==', uid));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as User;
    }
    return null;
  },

  // Обновить профиль
  async update(uid: string, data: Partial<User>): Promise<void> {
    const q = query(usersCollection, where('uid', '==', uid));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
    }
  },
};
