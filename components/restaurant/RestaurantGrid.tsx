import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { RestaurantType } from "@/lib/types";
import { NoResultsFound } from "@/app/(guest)/restaurants/components/AllRestaurantLoading";

// Define the props type
type RestaurantGridProps = {
	data: any[];
	searchTerm?: string;
};

function RestaurantGrid({ data, searchTerm }: RestaurantGridProps) {
	if (!data || data.length === 0) {
		return <NoResultsFound />;
	}

	return (
		<div>
			{/* Conditionally show results count if there's a search term and results */}
			{searchTerm && data.length > 0 && (
				<div className="mb-4 text-sm text-gray-600">
					{data.length} results for "{searchTerm}"
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data.map((restaurant: RestaurantType) => (
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
								priority={true}
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								style={{ objectFit: "cover" }}
							/>
						</div>
						<div className="p-4">
							<h3 className="text-lg font-semibold">{restaurant.name}</h3>
							<div className="flex items-center ">
								<span className="text-gray-600">{restaurant.rating}</span>
								<span className="text-gray-600 ">•</span>
								<div className="flex items-center ">
									{restaurant.deliveryTime ? (
										<span className="text-gray-600">
											{restaurant.deliveryTime.min} -{" "}
											{restaurant.deliveryTime.max} mins
										</span>
									) : (
										<span className="text-gray-600">
											Delivery time unavailable
										</span>
									)}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default RestaurantGrid;
