import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { RestaurantType } from "@/lib/types";

// Define the props type
type RestaurantGridProps = {
	data: any[];
};

function RestaurantGrid({ data }: RestaurantGridProps) {
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data.map((restaurant: RestaurantType, index: any) => (
					<Link
						href={`/restaurants/${restaurant.slug}`}
						key={restaurant.publicId}
						className="bg-white rounded-lg shadow-md overflow-hidden"
					>
						<div className="relative h-48">
							<Image
								src={restaurant.image}
								alt={restaurant.name}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								style={{ objectFit: "cover" }}
							/>
						</div>
						<div className="p-4">
							<span className="inline-block bg-blue-500 text-white text-xs px-2 rounded-full mb-2">
								{restaurant.category}
							</span>
							<h3 className="text-lg font-semibold">{restaurant.name}</h3>
							<div className="flex items-center mt-2">
								<span className="text-gray-600">{restaurant.rating}</span>
								<span className="text-gray-600 mx-2">•</span>
								<span className="text-gray-600">{restaurant.deliveryTime}</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default RestaurantGrid;
