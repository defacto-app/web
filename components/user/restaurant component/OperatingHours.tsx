// components/OperatingHours.tsx
import { Restaurant } from '@/lib/types';
import React from 'react';


interface OperatingHoursProps {
  restaurant: Restaurant;
}

const OperatingHours: React.FC<OperatingHoursProps> = ({ restaurant }) => {
  return (
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
  );
};

export default OperatingHours;
