import RestaurantPage from '@/components/RestaurantPage';
import React from 'react'

export default function Page({ params }: { params: { restaurantId: string } }) {
  return <RestaurantPage params={params} />;
}