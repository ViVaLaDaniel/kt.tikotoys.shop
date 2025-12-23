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
      'https://picsum.photos/seed/stitch1/400/400',
      'https://picsum.photos/seed/stitch2/400/400',
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
      'https://picsum.photos/seed/beanie1/400/400',
      'https://picsum.photos/seed/beanie2/400/400',
      'https://picsum.photos/seed/beanie3/400/400',
      'https://picsum.photos/seed/beanie4/400/400',
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
      'https://picsum.photos/seed/grogu1/400/400',
      'https://picsum.photos/seed/grogu2/400/400',
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
      'https://picsum.photos/seed/bunny1/400/400',
      'https://picsum.photos/seed/bunny2/400/400',
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
      'https://picsum.photos/seed/scarf1/400/400',
      'https://picsum.photos/seed/scarf2/400/400',
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
      'https://picsum.photos/seed/teddy1/400/400',
      'https://picsum.photos/seed/teddy2/400/400',
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
      'https://picsum.photos/seed/catbeanie1/400/400',
      'https://picsum.photos/seed/catbeanie2/400/400',
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
      'https://picsum.photos/seed/keychain1/400/400',
      'https://picsum.photos/seed/keychain2/400/400',
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
