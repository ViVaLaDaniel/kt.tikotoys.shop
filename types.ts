export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  imageUrl: string;
  description: string;
  colors: { name: string; class: string }[];
  rating: number;
  reviewCount: number;
}
