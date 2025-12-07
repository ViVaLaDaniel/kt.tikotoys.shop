export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  avatar?: string;
  createdAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string[];
  description: string;
  rating: number;
  reviewCount: number;
  category?: 'toys' | 'beanies' | 'accessories';
}

export interface Review {
  id: number;
  author: string;
  location: string;
  rating: number;
  text: string;
}
