export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string[];
  description: string;
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: number;
  author: string;
  location: string;
  rating: number;
  text: string;
}