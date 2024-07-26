// components/Restaurants.tsx

import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const restaurants = [
  {
    id:'1',
    name: 'Cold Stone creamery',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/cold.jpg', // Replace with your dummy image path
  },
  {
    id:'2',
    name: 'Mr.Biggs',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/biggs.jpg', // Replace with your dummy image path
  },
  {
    id:'3',
    name: 'Chicken Republic',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/chickenrep.jpg', // Replace with your dummy image path
  },
  {
    id:'4',
    name: 'KFC',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/kfc1.jpg', // Replace with your dummy image path
  },
  {
    id:'5',

    name: 'Dominos Pizza',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/domino.jpg', // Replace with your dummy image path
  },
  {
    id:'6',

    name: 'Chef Burgers London',
    rating: 4.5,
    time: '5-20 mins',
    category: 'Salad',
    image: '/rest/kfc1.jpg', // Replace with your dummy image path
  },
];

const RestaurantArea = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Restaurants you might like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
           <Link href={`user/restaurants/${restaurant.id}`} key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Show more</button>
      </div>
    </div>
  );
};

export default RestaurantArea;
