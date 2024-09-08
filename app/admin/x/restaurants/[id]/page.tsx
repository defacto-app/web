"use client";

import { useEffect, useState } from "react";

import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify";
import type { RestaurantFormType } from "@/lib/types";
import {RestaurantFormComponent} from "@/app/admin/x/restaurants/RestaurantForm";

function Page({ params }: { params: { id: string } }) {
	const [restaurant, setRestaurant] = useState<RestaurantFormType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [updating, setUpdating] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRestaurant((prevRestaurant:any) => ({
			...prevRestaurant,
			[name]: value ?? "", // Fallback to empty string if value is undefined
		}));
	};


	// Fetch restaurant data
	useEffect(() => {
		const getData = async () => {
			try {
				const response = await $admin_api.restaurants.one(params.id);
				setRestaurant(response); // Set the restaurant data
				setLoading(false); // Turn off loading
			} catch (error: any) {
				setError(error.message || "An error occurred while fetching the data");
				setLoading(false);
			}
		};
		getData();
	}, [params.id]);

	// Update restaurant
	const updateRestaurant = async () => {
		setUpdating(true);
		try {
			await $admin_api.restaurants.update(params.id, restaurant);
			setUpdating(false);
			toast.success("Restaurant updated successfully");
		} catch (e) {
			setUpdating(false);
			toast.error("An error occurred while updating");
		}
	};

	// Loading state
	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="container mx-auto py-10">
			<h1>Update Restaurant</h1>
			<RestaurantFormComponent
				restaurant={restaurant}
				handleInputChange={handleInputChange}
				submitHandler={updateRestaurant}
				loading={updating}
			/>
		</div>
	);
}

export default Page;
