// components/Restaurants.tsx

import { Star } from 'lucide-react';
import Image from 'next/image';

const restaurants = [
  {
    name: 'Chef Burgers London',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/dummy-image.jpg', // Replace with your dummy image path
  },
  {
    name: 'Chef Burgers London',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/dummy-image.jpg', // Replace with your dummy image path
  },
  {
    name: 'Chef Burgers London',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/dummy-image.jpg', // Replace with your dummy image path
  },
  {
    name: 'Chef Burgers London',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/dummy-image.jpg', // Replace with your dummy image path
  },
  {
    name: 'Chef Burgers London',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/dummy-image.jpg', // Replace with your dummy image path
  },
  {
    name: 'Chef Burgers London',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/dummy-image.jpg', // Replace with your dummy image path
  },
];

const RestaurantArea = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Restaurants you might like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <span className="inline-block bg-blue-500 text-white text-xs px-2 rounded-full mb-2">
                {restaurant.category}
              </span>
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <div className="flex items-center mt-2">
                <Star className="text-yellow-500 mr-1" />
                <span className="text-gray-600">{restaurant.rating}</span>
                <span className="text-gray-600 mx-2">•</span>
                <span className="text-gray-600">{restaurant.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Show more</button>
      </div>
    </div>
  );
};

export default RestaurantArea;
