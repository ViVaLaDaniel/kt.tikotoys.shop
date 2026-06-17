import { Product } from '../types';

// Категории товаров
export type ProductCategory = 'toys' | 'keychains' | 'boxes';

// Массив товаров для магазина
export const products: Product[] = [
  {
    id: 1,
    name: 'Candy Unicorn Amigurumi',
    price: 55,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=500&h=500&fit=crop&q=70&auto=format',
    ],
    description:
      'Adorable handmade Candy Unicorn plush toy, crocheted with love. Made with extra-soft pastel yarn, complete with a sparkling golden horn and soft safety eyes. Perfect for fairytale nursery decoration.',
    rating: 4.9,
    reviewCount: 94,
    category: 'toys',
    size: 'medium',
    colors: ['pink', 'white', 'pastel'],
  },
  {
    id: 2,
    name: 'Cozy Forest Fox Plush',
    price: 50,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1522273514726-c225434cedca?w=500&h=500&fit=crop&q=70&auto=format',
    ],
    description:
      'Charmingly soft handmade forest fox amigurumi. Crocheted with premium plush chenille yarn in warm orange and cream tones. Features safety eyes and embroidered nose.',
    rating: 4.8,
    reviewCount: 112,
    category: 'toys',
    size: 'medium',
    colors: ['orange', 'white', 'beige'],
  },
  {
    id: 3,
    name: 'Baby Yoda Grogu Amigurumi',
    price: 75,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1608889825271-fc9b78e91d29?w=500&h=500&fit=crop&q=70&auto=format',
    ],
    description:
      'The cutest Baby Yoda (Grogu) amigurumi you will ever see! Handmade with premium hypoallergenic cotton yarn and stuffed with eco-friendly fiberfill. A must-have for Star Wars fans. Approximately 22cm tall.',
    rating: 5.0,
    reviewCount: 156,
    category: 'toys',
    size: 'medium',
    colors: ['green', 'beige'],
  },
  {
    id: 4,
    name: 'Candy Dino Crochet Plush',
    price: 60,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1585990682176-c887a9fc2a99?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1565102667-b86b7f2db3c9?w=500&h=500&fit=crop&q=70&auto=format',
    ],
    description:
      'Cute, chubby little dinosaur crocheted with high-quality soft plush yarn. Perfect for kids to hug. Stuffed with hypoallergenic hollowfiber.',
    rating: 4.7,
    reviewCount: 67,
    category: 'toys',
    size: 'medium',
    colors: ['blue', 'pink', 'green'],
  },
  {
    id: 5,
    name: 'Pastel Dreamy Unicorn',
    price: 65,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1457545195570-67f207084966?w=500&h=500&fit=crop&q=70&auto=format',
    ],
    description:
      'Elegant pastel unicorn with long curly mane and silver hooves. Crocheted with organic wool blend yarn. Custom color accents available upon request.',
    rating: 4.9,
    reviewCount: 45,
    category: 'toys',
    size: 'medium',
    colors: ['white', 'lavender', 'pink'],
  },
  {
    id: 6,
    name: 'Teddy Bear Classic (Plush)',
    price: 60,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1560525821-1b5deac8c0c5?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1565302332725-c0e5b2f9e664?w=500&h=500&fit=crop&q=70&auto=format',
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
    name: 'Dragon Amigurumi (Handmade)',
    price: 65,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1585606393948-aa5f36b9bebe?w=500&h=500&fit=crop&q=70&auto=format',
    ],
    description:
      'Adorable custom crocheted dragon with tiny felt wings and horns. Made with soft plush yarn. Approximately 25cm tall.',
    rating: 4.9,
    reviewCount: 112,
    category: 'toys',
    size: 'medium',
    colors: ['green', 'red', 'pastel'],
  },
  {
    id: 8,
    name: 'Mini Octopus Keychain Set',
    price: 25,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1608276826730-cb4e2db6873c?w=500&h=500&fit=crop&q=70&auto=format',
    ],
    description:
      'Set of 3 adorable mini amigurumi keychains (Octopus, Bear, Bunny). Perfect for decorating backpacks, handbags, keys, or as sweet little gifts!',
    rating: 4.5,
    reviewCount: 34,
    category: 'keychains',
    size: 'small',
    colors: ['pink', 'blue', 'green'],
  },
  {
    id: 9,
    name: 'Charming Toy Gift Box (Small)',
    price: 500,
    currency: '€',
    imageUrl: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500&h=500&fit=crop&q=70&auto=format',
    ],
    description:
      "A beautiful collection of Yulia's finest creations. Includes: 6-8 customized handmade knitted toys of your choice, a customized handwritten calligraphy card, and a premium wooden storage box. Ideal for baby showers, birthdays, or high-end gifts. Worldwide express shipping from Marbella / San Pedro included. Fits 8 slots in the Box Builder.",
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
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&h=500&fit=crop&q=70&auto=format',
      'https://images.unsplash.com/photo-1481973965276-80279be85249?w=500&h=500&fit=crop&q=70&auto=format',
    ],
    description:
      'Our ultimate luxury offering. Includes: 12-15 customized large & premium knitted toys, personal alignment call with Yulia to choose characters and styles, customized wooden toy chest with personal engravings, deluxe silk wrapping, and priority worldwide express shipping. Truly a keepsake to cherish for generations. Fits 15 slots in the Box Builder.',
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
