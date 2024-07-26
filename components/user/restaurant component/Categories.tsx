// components/Categories.tsx
import React from 'react';

const Categories = () => {
  return (
    <div className="mt-8 flex justify-center space-x-4">
      <button className="px-4 py-2 bg-blue-500 text-white rounded-full">All</button>
      <button className="px-4 py-2 bg-white text-blue-500 rounded-full border">For You</button>
      <button className="px-4 py-2 bg-white text-blue-500 rounded-full border">Deserts</button>
      <button className="px-4 py-2 bg-white text-blue-500 rounded-full border">Drinks</button>
    </div>
  );
};

export default Categories;
