import React, { useEffect } from "react";
import { $api } from "@/http/endpoints";
import axios from "axios";
import {$axios} from "@/http/http.fn";
import Image from "next/image";

async function getRestaurant() {
	const res = await $axios.get(
		"/restaurant/all?page=1&perPage=10",
	);

	return res.data;


}

async function RestaurantGrid() {
	const restaurants = await getRestaurant();

	// console.log(restaurants.data);

	return (


	<div className="container mx-auto px-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
{restaurants.data.data.map((restaurant:any, index:any) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="border rounded-lg overflow-hidden">
						<Image
							src={restaurant.image}
							alt={restaurant.name}
							className="w-full h-48 object-cover"
							width={400}
							height={400}
						/>
						<div className="p-4">
							<span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2">
								{restaurant.category}
							</span>
							<h2 className="text-lg font-bold">{restaurant.name}</h2>
							<div className="flex items-center mt-2">
								<span className="text-yellow-500">★ {restaurant.rating}</span>
								<span className="text-gray-500 ml-2">{restaurant.time}</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default RestaurantGrid;
