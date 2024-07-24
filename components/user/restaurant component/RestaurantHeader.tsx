// components/RestaurantHeader.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { Restaurant } from '@/lib/types';


interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
 return (
    <div
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
    </div>
  );
};

export default RestaurantHeader;
