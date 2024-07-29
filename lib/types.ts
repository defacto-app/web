export interface Choice {
  id: string;
  name: string;
  price: string;
}

export interface Option {
  name: string;
  required: boolean;
  choices: Choice[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  rating: number;
  stars: number;
  isBestSeller: boolean;
  options?: Option[];
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
  categories: Record<string, MenuItem[]>;
}
