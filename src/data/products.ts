import { Product } from '../types';

// Категории товаров
export type ProductCategory = 'toys' | 'beanies' | 'accessories' | 'boxes';

// Массив товаров для магазина
export const products: Product[] = [
  {
    id: 1,
    name: 'Stitch Amigurumi (Handmade)',
    price: 65,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=600&h=600&fit=crop&q=80',
    ],
    description:
      'Adorable handmade Stitch plush toy, crocheted with love. Perfect gift for Disney fans! Approximately 25cm tall. Crafted with hypoallergenic plush yarn.',
    rating: 4.9,
    reviewCount: 89,
    category: 'toys',
    size: 'medium',
    colors: ['blue', 'purple'],
  },
  {
    id: 2,
    name: 'Cloud-Soft Chenille Knit Beanie',
    price: 49.95,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522273514726-c225434cedca?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=600&h=600&fit=crop&q=80',
    ],
    description:
      'Experience ultimate comfort with our handmade Cloud-Soft Chenille Knit Beanie. Perfect for chilly days, this incredibly soft and plush hat keeps you warm and stylish. Made from hypoallergenic, chunky chenille yarn.',
    rating: 4.8,
    reviewCount: 124,
    category: 'beanies',
    size: 'small',
    colors: ['white', 'pink', 'gray'],
  },
  {
    id: 3,
    name: 'Baby Yoda Grogu Amigurumi',
    price: 75,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608889825271-fc9b78e91d29?w=600&h=600&fit=crop&q=80',
    ],
    description:
      'The cutest Baby Yoda (Grogu) amigurumi you will ever see! Handmade with premium hypoallergenic cotton yarn. A must-have for Star Wars fans. Approximately 22cm tall.',
    rating: 5.0,
    reviewCount: 156,
    category: 'toys',
    size: 'medium',
    colors: ['green', 'beige'],
  },
  {
    id: 4,
    name: 'Pink Fluffy Bunny',
    price: 55,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1585990682176-c887a9fc2a99?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565102667-b86b7f2db3c9?w=600&h=600&fit=crop&q=80',
    ],
    description:
      'Soft and cuddly pink bunny, perfect for babies and toddlers. Made with 100% hypoallergenic plush yarn and secure safety eyes, completely safe for little ones.',
    rating: 4.7,
    reviewCount: 67,
    category: 'toys',
    size: 'medium',
    colors: ['pink', 'white'],
  },
  {
    id: 5,
    name: 'Winter Chunky Scarf Set',
    price: 39,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1457545195570-67f207084966?w=600&h=600&fit=crop&q=80',
    ],
    description:
      'Cozy handknit scarf in beautiful winter colors. Made with premium wool-acrylic blend, it pairs perfectly with our chenille beanies for maximum warmth.',
    rating: 4.6,
    reviewCount: 45,
    category: 'accessories',
    size: 'medium',
    colors: ['gray', 'beige'],
  },
  {
    id: 6,
    name: 'Teddy Bear Classic (Plush)',
    price: 60,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1560525821-1b5deac8c0c5?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565302332725-c0e5b2f9e664?w=600&h=600&fit=crop&q=80',
    ],
    description:
      'Classic teddy bear design, handcrafted with premium cotton and plush yarn. Timeless gift for any occasion, stuffed with eco-friendly hypoallergenic fiberfill.',
    rating: 4.8,
    reviewCount: 98,
    category: 'toys',
    size: 'medium',
    colors: ['brown', 'beige'],
  },
  {
    id: 7,
    name: 'Cat Ear Beanie Hat',
    price: 45,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585606393948-aa5f36b9bebe?w=600&h=600&fit=crop&q=80',
    ],
    description:
      'Adorable cat ear beanie, perfect for cat lovers! Soft, warm, and incredibly cute. Hand-knitted with high-quality stretch wool.',
    rating: 4.9,
    reviewCount: 112,
    category: 'beanies',
    size: 'small',
    colors: ['black', 'pink', 'gray'],
  },
  {
    id: 8,
    name: 'Mini Amigurumi Keychain Set',
    price: 25,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608276826730-cb4e2db6873c?w=600&h=600&fit=crop&q=80',
    ],
    description:
      'Set of 3 adorable mini amigurumi keychains (Bear, Bunny, Cat). Perfect for decorating backpacks, handbags, keys, or as sweet little gifts!',
    rating: 4.5,
    reviewCount: 34,
    category: 'accessories',
    size: 'small',
    colors: ['pink', 'blue', 'green'],
  },
  {
    id: 9,
    name: 'Charming Toy Gift Box (Small)',
    price: 500,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&h=600&fit=crop&q=80',
    ],
    description:
      "A beautiful collection of Yulia's finest creations. Includes: 6-8 customized handmade knitted toys of your choice, a customized handwritten calligraphy card, and a premium wooden storage box. Ideal for baby showers, birthdays, or high-end gifts. Worldwide express shipping from Marbella / San Pedro included.",
    rating: 5.0,
    reviewCount: 18,
    category: 'boxes',
    size: 'large',
    colors: ['pastel', 'custom'],
  },
  {
    id: 10,
    name: 'Royal Toy Gift Box (Large)',
    price: 1000,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1481973965276-80279be85249?w=600&h=600&fit=crop&q=80',
    ],
    description:
      'Our ultimate luxury offering. Includes: 12-15 customized large & premium knitted toys, personal alignment call with Yulia to choose characters and styles, customized wooden toy chest with personal engravings, deluxe silk wrapping, and priority worldwide express shipping. Truly a keepsake to cherish for generations.',
    rating: 5.0,
    reviewCount: 12,
    category: 'boxes',
    size: 'large',
    colors: ['pastel', 'custom'],
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
