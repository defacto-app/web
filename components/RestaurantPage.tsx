// components/RestaurantPage.tsx
import React from 'react';
import { PhoneIcon, Star } from 'lucide-react';
import Image from 'next/image';
import { EnvelopeOpenIcon } from '@radix-ui/react-icons';
import RestaurantHeader from './user/restaurant component/RestaurantHeader';
import OperatingHours from './user/restaurant component/OperatingHours';
import Categories from './user/restaurant component/Categories';
import Products from './user/restaurant component/Products';
import { restaurants } from '@/lib/data';
import { MenuTab } from './user/restaurant component/MenuTab';

const RestaurantPage = ({ params }: { params: { restaurantId: string } }) => {
  const restaurant = restaurants.find(r => r.id === params.restaurantId);

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
     <div className="container mx-auto px-4 py-8">
      <RestaurantHeader restaurant={restaurant} />
      {/* <Categories /> */}
      {/* <Products products={restaurant.products} /> */}
<MenuTab restaurant={restaurant}/>

    </div>
    </div>
  );
};

export default RestaurantPage;
