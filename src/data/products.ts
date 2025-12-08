import { Product } from '../types';

// Категории товаров
export type ProductCategory = 'toys' | 'beanies' | 'accessories';

// Массив товаров для магазина
export const products: Product[] = [
  {
    id: 1,
    name: 'Stitch Amigurumi',
    price: 65,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=400&h=400&fit=crop&q=80',
    ],
    description: 'Adorable handmade Stitch plush toy, crocheted with love. Perfect gift for Disney fans! Approximately 25cm tall.',
    rating: 4.9,
    reviewCount: 89,
    category: 'toys',
  },
  {
    id: 2,
    name: 'Cloud-Soft Chenille Knit Beanie',
    price: 49.95,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522273514726-c225434cedca?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544376664-80b17f09d399?w=400&h=400&fit=crop&q=80',
    ],
    description:
      "Experience ultimate comfort with our handmade Cloud-Soft Chenille Knit Beanie. Perfect for chilly days, this incredibly soft and plush hat keeps you warm and stylish.",
    rating: 4.8,
    reviewCount: 124,
    category: 'beanies',
  },
  {
    id: 3,
    name: 'Baby Yoda Grogu',
    price: 75,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608889825271-fc9b78e91d29?w=400&h=400&fit=crop&q=80',
    ],
    description: 'The cutest Baby Yoda (Grogu) amigurumi you will ever see! Handmade with premium yarn. A must-have for Star Wars fans.',
    rating: 5.0,
    reviewCount: 156,
    category: 'toys',
  },
  {
    id: 4,
    name: 'Pink Bunny',
    price: 55,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1585990682176-c887a9fc2a99?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565102667-b86b7f2db3c9?w=400&h=400&fit=crop&q=80',
    ],
    description: 'Soft and cuddly pink bunny, perfect for babies and toddlers. Made with hypoallergenic yarn, safe for little ones.',
    rating: 4.7,
    reviewCount: 67,
    category: 'toys',
  },
  {
    id: 5,
    name: 'Winter Scarf Set',
    price: 39,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1457545195570-67f207084966?w=400&h=400&fit=crop&q=80',
    ],
    description: 'Cozy handknit scarf in beautiful winter colors. Pairs perfectly with our chenille beanies!',
    rating: 4.6,
    reviewCount: 45,
    category: 'accessories',
  },
  {
    id: 6,
    name: 'Teddy Bear Classic',
    price: 60,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1560525821-1b5deac8c0c5?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565302332725-c0e5b2f9e664?w=400&h=400&fit=crop&q=80',
    ],
    description: 'Classic teddy bear design, handcrafted with premium cotton yarn. Timeless gift for any occasion.',
    rating: 4.8,
    reviewCount: 98,
    category: 'toys',
  },
  {
    id: 7,
    name: 'Cat Ear Beanie',
    price: 45,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585606393948-aa5f36b9bebe?w=400&h=400&fit=crop&q=80',
    ],
    description: 'Adorable cat ear beanie, perfect for cat lovers! Soft, warm, and incredibly cute.',
    rating: 4.9,
    reviewCount: 112,
    category: 'beanies',
  },
  {
    id: 8,
    name: 'Keychain Set (3 pcs)',
    price: 25,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608276826730-cb4e2db6873c?w=400&h=400&fit=crop&q=80',
    ],
    description: 'Set of 3 adorable mini amigurumi keychains. Perfect for decorating bags, keys, or gifts!',
    rating: 4.5,
    reviewCount: 34,
    category: 'accessories',
  },
];

// Функция для получения товара по ID
export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

// Функция для получения товаров по категории
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter((p) => p.category === category);
};
