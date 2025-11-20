import { Product } from "../types";
import WinterHead3 from '../assets/WinterHead3.svg';
import WinterHead4 from '../assets/WinterHead4.svg';
import WinterHead5 from '../assets/WinterHead5.svg';
import WinterHead6 from '../assets/WinterHead6.svg';

export const sampleProduct: Product = {
  id: 1,
  name: "Cloud-Soft Chenille Knit Beanie",
  price: 49.95,
  currency: "€",
  imageUrl: [
    WinterHead3,
    WinterHead4,
    WinterHead5,
    WinterHead6,
  ],
  description: "Experience ultimate comfort with our handmade Cloud-Soft Chenille Knit Beanie. Perfect for chilly days, this incredibly soft and plush hat keeps you warm and stylish. Made from hypoallergenic, chunky chenille yarn, it's the coziest accessory for your winter wardrobe.",
  rating: 4.8,
  reviewCount: 124,
};