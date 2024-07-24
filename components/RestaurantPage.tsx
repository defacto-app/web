// components/RestaurantPage.tsx
import React from 'react';
import { notFound } from 'next/navigation';

const getRestaurantData = async (id: string) => {
  return {
    id,
    name: `Restaurant ${id}`,
    description: `Description for restaurant ${id}`,
  };
};

const RestaurantPage = async ({ params }: { params: { restaurantId: string } }) => {
  const restaurantData = await getRestaurantData(params.restaurantId);

  if (!restaurantData) {
    return notFound();
  }

  return (
    <div>
      <h1>{restaurantData.name}</h1>
      <p>{restaurantData.description}</p>
    </div>
  );
};

export default RestaurantPage;
