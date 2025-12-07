import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'kt-tikotoys-products';

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Загрузка из localStorage или использование начальных данных
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialProducts;
        }
      }
    }
    return initialProducts;
  });

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct: Product = { ...productData, id: newId };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...productData } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
