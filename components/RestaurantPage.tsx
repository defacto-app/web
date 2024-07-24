// components/RestaurantPage.tsx
import React from 'react';
import { PhoneIcon, Star } from 'lucide-react';
import Image from 'next/image';
import { EnvelopeOpenIcon } from '@radix-ui/react-icons';

const restaurants = [
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
      {/* Header Section */}
      {/* <div
        className="relative bg-cover bg-center p-6 rounded-lg flex flex-col items-center text-center"
        style={{ backgroundImage: `url(${restaurant.background})` }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white">{restaurant.name}</h1>
          <div className="flex items-center mt-2">
            <Star className="text-yellow-500 mr-1" />
            <span className="text-white">{restaurant.rating}</span>
          </div>
          <div className="flex items-center mt-2 space-x-4">
            <span className="text-white">{restaurant.distance} Away</span>
            <span className="text-white">{restaurant.fee}</span>
          </div>
          <div className="mt-2">
            <span className="text-green-500">Open Now</span>
            <span className="text-white"> {restaurant.hours}</span>
          </div>
        </div>
      </div> */}
<div>
      <div>
        <img alt="" src={restaurant.background} className="h-60 w-full object-cover lg:h-48" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img alt="" src={restaurant.image} className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-primary-500">{restaurant.name}</h1>
            </div>
            {/* <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <EnvelopeOpenIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                <span>Message</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <PhoneIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                <span>Call</span>
              </button>
            </div> */}
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{restaurant.name}</h1>
        </div>
      </div>
    </div>

      {/* Operating Hours Section */}
      <div className="mt-8 grid grid-cols-2 gap-4 text-center">
        <div>
          {/* Riders */}
          <div className="text-blue-500">{restaurant.hours}</div>
          <div className="text-gray-600">Saturday-Sunday: 9am-6pm</div>
        </div>
        <div>
          {/* Pickup */}
          <div className="text-blue-500">Monday-Friday: 9am-9pm</div>
          <div className="text-gray-600">Saturday-Sunday: 9am-6pm</div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-8 flex justify-center space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">All</button>
        <button className="px-4 py-2 bg-white text-blue-500 rounded-full border">For You</button>
        <button className="px-4 py-2 bg-white text-blue-500 rounded-full border">Deserts</button>
        <button className="px-4 py-2 bg-white text-blue-500 rounded-full border">Drinks</button>
      </div>

      {/* Products Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-full w-1/2"
          />
          <button className="px-4 py-2 border rounded-full">Filter</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="relative h-48 bg-gray-200 mb-4"></div>
              <span className="inline-block bg-blue-500 text-white text-xs px-2 rounded-full mb-2">
                Best Seller
              </span>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <div className="text-gray-600">{product.price}</div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full">+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
