import React, {useEffect} from "react";


async function getRestaurant() {
	const res = await fetch('https://api.defactoapp.com.ng/api/v1/restaurant/all?page=1&perPage=10')
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

async function RestaurantGrid() {

	const data = await getRestaurant()

	console.log(data)
	const _restaurants = [
		{
			name: "Chef Burgers London",
			rating: 4.5,
			time: "5-20 mins",
			type: "Salad",
			image: "https://placehold.co/600x400.png",
		},
		{
			name: "Chef Burgers London",
			rating: 4.5,
			time: "5-20 mins",
			type: "Salad",
			image: "https://placehold.co/600x400.png",
		},
		{
			name: "Chef Burgers London",
			rating: 4.5,
			time: "5-20 mins",
			type: "Salad",
			image: "https://placehold.co/600x400.png",
		},
		{
			name: "Chef Burgers London",
			rating: 4.5,
			time: "5-20 mins",
			type: "Salad",
			image: "https://placehold.co/600x400.png",
		},
		{
			name: "Chef Burgers London",
			rating: 4.5,
			time: "5-20 mins",
			type: "Salad",
			image: "https://placehold.co/600x400.png",
		},
		{
			name: "Chef Burgers London",
			rating: 4.5,
			time: "5-20 mins",
			type: "Salad",
			image: "https://placehold.co/600x400.png",
		},
	];


	return <div>
		{JSON.stringify(data)}
		{/*	<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{restaurants.map((restaurant, index) => (
				<div key={index} className="border rounded-lg overflow-hidden">
					<img
						src={restaurant.image}
						alt={restaurant.name}
						className="w-full h-48 object-cover"
					/>
					<div className="p-4">
							<span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2">
								{restaurant.type}
							</span>
						<h2 className="text-lg font-bold">{restaurant.name}</h2>
						<div className="flex items-center mt-2">
							<span className="text-yellow-500">★ {restaurant.rating}</span>
							<span className="text-gray-500 ml-2">{restaurant.time}</span>
						</div>
					</div>
				</div>
			))}
		</div>*/}

	</div>;
}

export default RestaurantGrid;
