// components/Restaurants.tsx
"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { $api } from "@/http/endpoints";
import {useEffect, useState} from "react";

type RestaurantType = {
	name: string; // The name of the restaurant
	address: string; // The address of the restaurant
	category: string; // The category of food (e.g., "Pasta")
	deliveryTime: string; // Estimated delivery time (e.g., "11-22 mins")
	email: string; // Email address of the restaurant
	phone: string; // Phone number of the restaurant
	image: string; // URL of the restaurant's image
	openingHours: string; // The restaurant's opening hours
	publicId: string; // Public ID for the restaurant (possibly for image or other resources)
	rating: number; // The restaurant's rating (e.g., 4.4)
	slug: string; // URL-friendly identifier for the restaurant
	createdAt: string; // ISO 8601 date string representing when the restaurant was created
	updatedAt: string; // ISO 8601 date string representing when the restaurant was last updated
};


const restaurants = [
	{
		id: "1",
		name: "Cold Stone creamery",
		rating: 4.5,
		time: "5-20 mins",
		category: "Salad",
		image: "/rest/cold.jpg", // Replace with your dummy image path
	},
	{
		id: "2",
		name: "Mr.Biggs",
		rating: 4.5,
		time: "5-20 mins",
		category: "Salad",
		image: "/rest/biggs.jpg", // Replace with your dummy image path
	},
	{
		id: "3",
		name: "Chicken Republic",
		rating: 4.5,
		time: "5-20 mins",
		category: "Salad",
		image: "/rest/chickenrep.jpg", // Replace with your dummy image path
	},
	{
		id: "4",
		name: "KFC",
		rating: 4.5,
		time: "5-20 mins",
		category: "Salad",
		image: "/rest/kfc1.jpg", // Replace with your dummy image path
	},
	{
		id: "5",

		name: "Dominos Pizza",
		rating: 4.5,
		time: "5-20 mins",
		category: "Salad",
		image: "/rest/domino.jpg", // Replace with your dummy image path
	},
	{
		id: "6",

		name: "Chef Burgers London",
		rating: 4.5,
		time: "5-20 mins",
		category: "Salad",
		image: "/rest/kfc1.jpg", // Replace with your dummy image path
	},
];

const RestaurantArea = () => {
	const [data, setData] = useState<RestaurantType[]>([]);
	const getData = async () => {
		try {
			const res = await $api.guest.restaurant.all();

			setData(res.data.data);
		} catch (e) {
			console.log("error", e);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			<h2 className="text-2xl font-bold text-center mb-8">
				Restaurants you might like
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{data.map((restaurant:RestaurantType, index:any) => (
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
			<div className="text-center mt-8">
				<Button className="bg-blue-500 text-white px-4 py-2 rounded-full">
					Show more
				</Button>
			</div>
		</div>
	);
};

export default RestaurantArea;
