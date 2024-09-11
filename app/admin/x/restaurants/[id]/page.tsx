"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useAtomRestaurantContext } from "@/app/admin/x/restaurants/[id]/resturant.atom";
import Image from "next/image";
import ImageUploader from "@/app/admin/components/ImageUploader";
import { useParams } from "next/navigation";
import type { RestaurantFormType } from "@/lib/types";
import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify";
import { RestaurantFormComponent } from "@/app/admin/x/restaurants/components/RestaurantForm";

const RestaurantPage = () => {
	const { restaurant, getRestaurant, loading } = useAtomRestaurantContext();
	const [updating, setUpdating] = useState<boolean>(false);

	const refreshData = async () => {
		getRestaurant(restaurant.publicId);
	};
	const [restaurantData, setRestaurantData] =
		useState<any>({
			createdAt: "",
			menuItems: [],
			publicId: "",
			updatedAt: "",
			name: restaurant.name,
			image: restaurant.image,
			address: restaurant.address,
			phone: restaurant.phone,
			email: restaurant.email,
			openingHours: restaurant.openingHours,
			deliveryTime: restaurant.deliveryTime,
			category: restaurant.category,
			description: restaurant.description,
		});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setRestaurantData((prevRestaurant: any) => ({
			...prevRestaurant,
			[name]: value ?? "", // Fallback to empty string if value is undefined
		}));
	};

	const updateRestaurant = async () => {
		setUpdating(true);
		try {
			await $admin_api.restaurants.update(restaurant.publicId, restaurantData);
			await refreshData();
			setUpdating(false);
			toast.success("Restaurant updated successfully");
		} catch (e) {
			setUpdating(false);
			toast.error("An error occurred while updating");
		}
	};

	return (
		<div>
			<ImageUploader id={restaurant.publicId} onUploadComplete={refreshData} />

			<Image
				priority={true}
				width={500}
				height={500}

				src={restaurant?.image}
				alt={restaurant?.name}
				className="w-full h-64 object-cover"
			/>

			<RestaurantFormComponent
				restaurant={restaurantData}
				handleInputChange={handleInputChange}
				submitHandler={updateRestaurant}
				loading={updating}
				action="update"
			/>
		</div>
	);
};

export default RestaurantPage;
