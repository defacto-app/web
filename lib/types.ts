// types.ts
export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  time: string;
  category: string;
  image: string;
  background: string;
  distance: string;
  fee: string;
  hours: string;
  products: {
    id: string;
    name: string;
    price: string;
  }[];
}
export interface RestaurantProduct {
  id: string;
  name: string;
  price: string;
}
