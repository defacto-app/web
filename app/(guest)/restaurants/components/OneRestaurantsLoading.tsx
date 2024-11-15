import React from "react";

const OneRestaurantsLoading = () => {
	return (
		<div className="animate-pulse">
			{/* Hero Section Skeleton */}
			<div className="relative">
				<div className="h-[300px] w-full bg-gray-200" />
				<div className="absolute top-28 px-4 lg:px-20 space-y-2 z-10">
					<div className="h-8 w-64 bg-gray-200 rounded" />{" "}
					{/* Restaurant name */}
					<div className="flex items-center gap-x-2">
						<div className="h-6 w-6 bg-gray-200 rounded" /> {/* Icon */}
						<div className="h-6 w-48 bg-gray-200 rounded" /> {/* Address */}
					</div>
					<div className="flex items-center gap-x-2">
						<div className="h-6 w-6 bg-gray-200 rounded" /> {/* Icon */}
						<div className="h-6 w-32 bg-gray-200 rounded" />{" "}
						{/* Delivery time */}
					</div>
					<div className="h-6 w-56 bg-gray-200 rounded" /> {/* Opening hours */}
				</div>
			</div>

			{/* Menu Section Skeleton */}
			<div className="lg:container mx-auto py-8">
				{/* Tab Skeleton */}
				<div className="flex space-x-4 mb-4 px-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="h-10 w-24 bg-gray-200 rounded" />
					))}
				</div>

				{/* Search Bar Skeleton */}
				<div className="px-2 py-2">
					<div className="h-10 w-full bg-gray-200 rounded" />
				</div>

				{/* Menu Grid Skeleton */}
				<div className="grid lg:grid-cols-5 gap-4 items-start">
					<div className="col-span-4 px-2">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div key={i} className="border rounded-lg p-4 space-y-4">
									<div className="h-48 bg-gray-200 rounded-lg w-full" />
									<div className="h-6 w-3/4 bg-gray-200 rounded" />
									<div className="h-6 w-1/2 bg-gray-200 rounded" />
								</div>
							))}
						</div>
					</div>

					{/* Cart Skeleton */}
					<div className="hidden md:block">
						<div className="border rounded-lg p-4 space-y-4">
							<div className="h-8 w-3/4 bg-gray-200 rounded" />
							<div className="space-y-2">
								{[1, 2].map((i) => (
									<div key={i} className="h-16 bg-gray-200 rounded" />
								))}
							</div>
							<div className="h-10 w-full bg-gray-200 rounded" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OneRestaurantsLoading;
