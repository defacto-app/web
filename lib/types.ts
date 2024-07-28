// types.ts

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  stars: number;
  imageUrl: string;
  isBestSeller: boolean;
}

export interface RestaurantProduct {
  id: string;
  name: string;
  price: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  time: string;
  category: any;
  image: string;
  background: string;
  distance: string;
  fee: string;
  hours: string;
  isBestSeller: boolean;
  products: {
    id: string;
    name: string;
    price: string;
  }[];
}
