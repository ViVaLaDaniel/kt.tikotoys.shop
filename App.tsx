import React from 'react';
import ProductCard from './components/ProductCard';
import { Product } from './types';

const sampleProduct: Product = {
  id: 1,
  name: "Мишка 'Плюшик'",
  price: 1299,
  currency: '₽',
  imageUrl: 'https://picsum.photos/seed/teddybear/600/600',
  description: 'Невероятно мягкий и уютный плюшевый мишка, который станет лучшим другом для вашего ребенка. Сделан из гипоаллергенных материалов.',
  colors: [
    { name: 'Brown', class: 'bg-yellow-800' },
    { name: 'Beige', class: 'bg-amber-300' },
    { name: 'Pink', class: 'bg-pink-300' },
    { name: 'White', class: 'bg-gray-200' },
  ],
  rating: 4.8,
  reviewCount: 124,
};


const App: React.FC = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      <ProductCard product={sampleProduct} />
    </main>
  );
};

export default App;
