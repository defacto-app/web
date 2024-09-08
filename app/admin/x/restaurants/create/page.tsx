"use client";

import { useState } from "react";
import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify";
import type { RestaurantFormType } from "@/lib/types";
import { RestaurantFormComponent } from "@/app/admin/x/restaurants/RestaurantForm";

function Page() {
	// Initialize the state with empty fields
	const [restaurant, setRestaurant] = useState<RestaurantFormType>({
		createdAt: "",
		deliveryTime: "",
		image: "",
		menuItems: [],
		publicId: "",
		updatedAt: "",
		name: "",
		category: "",
		address: "",
		phone: "",
		email: "",
		openingHours: "",
	});
	const [creating, setCreating] = useState<boolean>(false);

	// Handle input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRestaurant((prevRestaurant) => ({
			...prevRestaurant,
			[name]: value ?? "", // Fallback to empty string if value is undefined
		}));
	};

	// Create new restaurant
	const createRestaurant = async () => {
		setCreating(true);
		try {
			await $admin_api.restaurants.create(restaurant); // Assuming create method exists in your API
			setCreating(false);
			toast.success("Restaurant created successfully");
			setRestaurant(
				// Reset the form after successful creation
				{
					createdAt: "",
					deliveryTime: "",
					image: "",
					menuItems: [],
					publicId: "",
					updatedAt: "",
					name: "",

					category: "",
					address: "",
					phone: "",
					email: "",
					openingHours: "",
				},
			); // Reset the form after successful creation



		} catch (e) {
			setCreating(false);
			toast.error("An error occurred while creating the restaurant");
		}
	};

	return (
		<div className="container mx-auto py-10">
			<h1>Create New Restaurant</h1>
			<RestaurantFormComponent
				restaurant={restaurant}
				handleInputChange={handleInputChange}
				submitHandler={createRestaurant}
				loading={creating}
			/>
		</div>
	);
}

export default Page;
