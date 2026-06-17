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
      } catch (error) {
        console.error(
          'Ошибка загрузки товаров из Supabase:',
          (error as Error).message,
        );
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

  // Сохранение в localStorage при изменении
  useEffect(() => {
    if (!isSupabaseEnabled) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    if (isSupabaseEnabled) {
      try {
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
      } catch (error) {
        console.error(
          'Ошибка добавления товара в Supabase:',
          (error as Error).message,
        );
      }
      return;
    }
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    const newProduct: Product = { ...productData, id: newId };
    setProducts([...products, newProduct]);
  };

  const updateProduct = async (id: number, productData: Partial<Product>) => {
    if (isSupabaseEnabled) {
      try {
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
      } catch (error) {
        console.error(
          'Ошибка обновления товара в Supabase:',
          (error as Error).message,
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
      try {
        await fetchSupabase(`/products?id=eq.${id}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error(
          'Ошибка удаления товара в Supabase:',
          (error as Error).message,
        );
        return;
      }
    }
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
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
