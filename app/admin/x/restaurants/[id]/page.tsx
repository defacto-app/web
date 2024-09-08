"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { $admin_api } from "@/http/admin-endpoint";
import {Button} from "@/components/ui/button";

// Define the type for Restaurant data
interface Restaurant {
	_id: string;
	slug: string;
	name: string;
	rating: number;
	deliveryTime: string;
	category: string;
	image: string;
	address: string;
	phone: string;
	email: string;
	openingHours: string;
	createdAt: string;
	updatedAt: string;
	publicId: string;
	menuItems: any[]; // Add more specific typing if you know the structure of menu items
}

function Page({ params }: { params: { id: string } }) {
	// State to hold the fetched restaurant data
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
	const [loading, setLoading] = useState<boolean>(true); // Loading state
	const [error, setError] = useState<string | null>(null); // Error state

	// Fetch restaurant data when the component mounts
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await $admin_api.restaurants.one(params.id);
				console.log(response);
				setRestaurant(response); // Set the restaurant data
				setLoading(false); // Turn off loading after data is fetched
			} catch (error: any) {
				setError(error.message || "An error occurred while fetching the data");
				setLoading(false); // Turn off loading in case of error
			}
		};

		getData();
	}, [params.id]);

	// Loading state
	if (loading) {
		return <div>Loading...</div>;
	}

	// Error state
	if (error) {
		return <div>Error: {error}</div>;
	}

	// Render the fetched restaurant data
	return (
		<div className="container mx-auto py-10">
			<h1>Restaurant Details</h1>
			{restaurant && (
				<div>
					<Button>Click me</Button>
					<Input value={restaurant?.name} placeholder="Add some input here..." />



					<img src={restaurant.image} alt={restaurant.name} className="mb-4" />
					<h2>{restaurant.name}</h2>
					<p><strong>Rating:</strong> {restaurant.rating}</p>
					<p><strong>Delivery Time:</strong> {restaurant.deliveryTime}</p>
					<p><strong>Category:</strong> {restaurant.category}</p>
					<p><strong>Address:</strong> {restaurant.address}</p>
					<p><strong>Phone:</strong> {restaurant.phone}</p>
					<p><strong>Email:</strong> {restaurant.email}</p>
					<p><strong>Opening Hours:</strong> {restaurant.openingHours}</p>
				</div>
			)}

		</div>
	);
}

export default Page;
