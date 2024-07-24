// components/Products.tsx
import { RestaurantProduct } from '@/lib/types';
import React from 'react';


interface ProductsProps {
  products: RestaurantProduct[];
}
const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
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
        {products.map((product) => (
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
  );
};

export default Products;
