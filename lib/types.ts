// types.ts

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
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
  deliveryTime: string;
  category: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  publicId: string;
  menuItems: any[]; // Add more specific typing if you know the structure of getMenu items
}

export interface MenuItemType {
  available: boolean;
  category: string;
  createdAt: string;
  image: string;
  menuType: string;
  name: string;
  parent: string;
  price: string;
  publicId: string;
  slug: string;
  updatedAt: string;
}
