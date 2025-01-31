import React from "react";
import Link from "next/link";
import Image from "next/image";

type RestaurantGridProps = {
  data: any[];
  searchTerm?: string;
};

function RestaurantGrid({ data, searchTerm }: RestaurantGridProps) {
  if (!data || data.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div>
      <div className="w-full px-4">
        {searchTerm && data.length > 0 && (
          <div className="mb-4 text-sm text-gray-600">
            {data.length} results for "{searchTerm}"
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {data.map((restaurant) => (
            <Link
              href={`/restaurants/${restaurant.slug}`}
              key={restaurant.publicId}
              className="bg-white rounded-lg overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  sizes="(max-width: 128px) 100vw, 128px"
                  className="object-cover" // Added this line to maintain aspect ratio
                />
              </div>
              <div className="p-2">
                <h3 className="font-medium lg:font-semibold text-sm lg:text-lg truncate">
                  {restaurant.name}
                </h3>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <span>{restaurant.rating}</span>
                  <span>•</span>
                  <div className="truncate">
                    {restaurant.deliveryTime ? (
                      <span>
                        {restaurant.deliveryTime.min} - {restaurant.deliveryTime.max} mins
                      </span>
                    ) : (
                      <span>Delivery time unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantGrid;