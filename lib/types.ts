// types.ts

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  time: string;
  categories: {
    [key: string]: MenuItem[];
  };
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
