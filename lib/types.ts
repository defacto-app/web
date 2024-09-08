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
  image: string;
  background: string;
  distance: string;
  fee: string;
  hours: string;
  isBestSeller: boolean;
  categories:any;

  products: {
    id: string;
    name: string;
    price: string;
  }[];
}

export interface RestaurantFormType {
  name: string;
  rating: number;
  deliveryTime: string;
  category: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  createdAt: string;
  updatedAt: string;
  publicId: string;
  menuItems: any[]; // Add more specific typing if you know the structure of menu items
}