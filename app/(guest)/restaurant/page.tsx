import React from "react";
import RestaurantGrid from "@/app/(guest)/restaurant/components/restaurant-grid";


const Page = () => {
	return (
		<div className="p-8">
			<RestaurantGrid />
			<h1 className="text-2xl font-bold mb-6">Restaurants you might like</h1>
		</div>
	);
};

export default Page;
