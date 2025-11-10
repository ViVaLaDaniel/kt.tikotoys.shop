import { Product } from "../types";
import HeadImage from '../assets/Head.jpg';

export const sampleProduct: Product = {
  id: 1,
  name: "Cloud-Soft Chenille Knit Beanie",
  price: 49.95,
  currency: "$",
  imageUrl: HeadImage,
  description: "Experience ultimate comfort with our handmade Cloud-Soft Chenille Knit Beanie. Perfect for chilly days, this incredibly soft and plush hat keeps you warm and stylish. Made from hypoallergenic, chunky chenille yarn, it's the coziest accessory for your winter wardrobe.",
  colors: [
    { name: "Brown", class: "bg-yellow-800" },
    { name: "Beige", class: "bg-amber-300" },
    { name: "Pink", class: "bg-pink-300" },
    { name: "White", class: "bg-gray-200" },
  ],
  rating: 4.8,
  reviewCount: 124,
};