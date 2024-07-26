// components/RestaurantPage.tsx
import React from 'react';
import { PhoneIcon, Star } from 'lucide-react';
import Image from 'next/image';
import { EnvelopeOpenIcon } from '@radix-ui/react-icons';
import RestaurantHeader from './user/restaurant component/RestaurantHeader';
import OperatingHours from './user/restaurant component/OperatingHours';
import Categories from './user/restaurant component/Categories';
import Products from './user/restaurant component/Products';
import { Restaurant } from '@/lib/types';
import { MenuTab } from './user/MenuTab';

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Cold Stone Creamery',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/cold.jpg',
    background: '/rest/cold.jpg',
    distance: '2.8KM',
    fee: '$2.00',
    hours: '8am-9pm, Monday to Saturday',
    products: [
      { id: '1', name: 'Mixed Vegetable Salad', price: '₦5,000' },
      { id: '2', name: 'Fruit & Spice Salad', price: '₦5,000' },
    ],
  },
  {
    id: '2',
    name: 'Mr.Biggs',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/biggs.jpg',
    background: '/rest/biggs.jpg',
    distance: '2.8KM',
    fee: '$2.00',
    hours: '8am-9pm, Monday to Saturday',
    products: [
      { id: '1', name: 'Mixed Vegetable Salad', price: '₦5,000' },
      { id: '2', name: 'Fruit & Spice Salad', price: '₦5,000' },
    ],
  },
  {
    id: '3',
    name: 'Chicken Republic',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/chickenrep.jpg',
    background: '/rest/chickenrep.jpg',
    distance: '2.8KM',
    fee: '$2.00',
    hours: '8am-9pm, Monday to Saturday',
    products: [
      { id: '1', name: 'Mixed Vegetable Salad', price: '₦5,000' },
      { id: '2', name: 'Fruit & Spice Salad', price: '₦5,000' },
    ],
  },
  {
    id: '4',
    name: 'KFC',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/kfc1.jpg',
    background: '/rest/kfc1.jpg',
    distance: '2.8KM',
    fee: '$2.00',
    hours: '8am-9pm, Monday to Saturday',
    products: [
      { id: '1', name: 'Mixed Vegetable Salad', price: '₦5,000' },
      { id: '2', name: 'Fruit & Spice Salad', price: '₦5,000' },
    ],
  },
  {
    id: '5',
    name: 'Dominos Pizza',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/domino.jpg',
    background: '/rest/domino.jpg',
    distance: '2.8KM',
    fee: '$2.00',
    hours: '8am-9pm, Monday to Saturday',
    products: [
      { id: '1', name: 'Mixed Vegetable Salad', price: '₦5,000' },
      { id: '2', name: 'Fruit & Spice Salad', price: '₦5,000' },
    ],
  },
  {
    id: '6',
    name: 'Chef Burgers London',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/kfc1.jpg',
    background: '/rest/kfc1.jpg',
    distance: '2.8KM',
    fee: '$2.00',
    hours: '8am-9pm, Monday to Saturday',
    products: [
      { id: '1', name: 'Mixed Vegetable Salad', price: '₦5,000' },
      { id: '2', name: 'Fruit & Spice Salad', price: '₦5,000' },
    ],
  },
];

const RestaurantPage = ({ params }: { params: { restaurantId: string } }) => {
  const restaurant = restaurants.find(r => r.id === params.restaurantId);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
     <div className="container mx-auto px-4 py-8">
      <RestaurantHeader restaurant={restaurant} />
      <OperatingHours restaurant={restaurant} />
      <Categories />
      <Products products={restaurant.products} />
      <MenuTab/>


    </div>
<MenuTab/>
    </div>
  );
};

export default RestaurantPage;
