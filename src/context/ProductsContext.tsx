import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';
import { fetchSupabase, isSupabaseEnabled } from '../supabaseClient';

interface ProductsContextType {
  products: Product[];
  loadError: string | null;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

const PRODUCTS_STORAGE_KEY = 'kt-tikotoys-products';

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(() => {
    if (isSupabaseEnabled) {
      return [];
    }
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
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      if (!isSupabaseEnabled) {
        return;
      }
      try {
        const data = await fetchSupabase<Product[]>(
          '/products?select=*&order=id.asc',
        );
        setProducts(data ?? []);
        setLoadError(null);
      } catch (error) {
        const message = (error as Error).message;
        console.error('Failed to load products from Supabase:', message);
        setLoadError(message);
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
          if (saved) {
            try {
              setProducts(JSON.parse(saved));
              return;
            } catch {
              setProducts(initialProducts);
              return;
            }
          }
        }
        setProducts(initialProducts);
      }
    };

    void loadProducts();
  }, []);

  useEffect(() => {
    if (!isSupabaseEnabled) {
      try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
      } catch (error) {
        console.error('Failed to save products to localStorage:', error);
      }
    }
  }, [products]);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    if (isSupabaseEnabled) {
      const data = await fetchSupabase<Product[]>('/products?select=*', {
        method: 'POST',
        headers: {
          Prefer: 'return=representation',
        },
        body: JSON.stringify(productData),
      });
      const createdProduct = data?.[0];
      if (createdProduct) {
        setProducts((prev) => [...prev, createdProduct]);
      }
      return;
    }
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const newProduct: Product = { ...productData, id: newId };
    setProducts([...products, newProduct]);
  };

  const updateProduct = async (id: number, productData: Partial<Product>) => {
    if (isSupabaseEnabled) {
      const data = await fetchSupabase<Product[]>(
        `/products?id=eq.${id}&select=*`,
        {
          method: 'PATCH',
          headers: {
            Prefer: 'return=representation',
          },
          body: JSON.stringify(productData),
        },
      );
      const updatedProduct = data?.[0];
      if (updatedProduct) {
        setProducts(
          products.map((p) =>
            p.id === id ? { ...p, ...updatedProduct } : p,
          ),
        );
      }
      return;
    }
    setProducts(
      products.map((p) => (p.id === id ? { ...p, ...productData } : p)),
    );
  };

  const deleteProduct = async (id: number) => {
    if (isSupabaseEnabled) {
      await fetchSupabase(`/products?id=eq.${id}`, {
        method: 'DELETE',
      });
    }
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{ products, loadError, addProduct, updateProduct, deleteProduct }}
    >
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
