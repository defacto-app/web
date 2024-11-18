"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useAtomRestaurantContext } from "@/app/admin/x/restaurants/[id]/resturant.atom";
import Image from "next/image";
import ImageUploader from "@/app/admin/components/ImageUploader";

import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify";
import { RestaurantFormComponent } from "@/app/admin/x/restaurants/components/RestaurantForm";
import type { OpeningHours } from "@/lib/types";
import { cleanOpeningHours } from "@/lib/utils";

interface Restaurant {
	name: string | undefined;
	image: string | undefined;
	address: string | undefined;
	phone: string | undefined;
	email: string | undefined;
	openingHours: OpeningHours;
	deliveryTime: string | undefined;
	category: string | undefined;
	description: string | undefined;
}

const RestaurantPage = () => {
	const { restaurant, getRestaurant } = useAtomRestaurantContext();
	const [updating, setUpdating] = useState<boolean>(false);

	const refreshData = async () => {
    await getRestaurant(restaurant.publicId);
    // Update local state with refreshed data
    setRestaurantData({
      name: restaurant.name,
      image: restaurant.image,
      address: restaurant.address,
      phone: restaurant.phone,
      email: restaurant.email,
      openingHours: restaurant.openingHours || {
        monday: { open: "10:00", close: "19:00", isClosed: false },
        tuesday: { open: "10:00", close: "19:00", isClosed: false },
        wednesday: { open: "10:00", close: "19:00", isClosed: false },
        thursday: { open: "10:00", close: "19:00", isClosed: false },
        friday: { open: "10:00", close: "19:00", isClosed: false },
        saturday: { open: "10:00", close: "19:00", isClosed: false },
        sunday: { open: "10:00", close: "19:00", isClosed: false },
      },
      deliveryTime: restaurant.deliveryTime,
      category: restaurant.category,
      description: restaurant.description,
    });
  };

  // Add useEffect to update local state when restaurant data changes
  useEffect(() => {
    setRestaurantData({
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
  }, [restaurant]);

	const [restaurantData, setRestaurantData] = useState<Restaurant>({
		name: restaurant.name,
		image: restaurant.image,
		address: restaurant.address,
		phone: restaurant.phone,
		email: restaurant.email,
		openingHours: {
			monday: { open: "10:00", close: "19:00", isClosed: false },
			tuesday: { open: "10:00", close: "19:00", isClosed: false },
			wednesday: { open: "10:00", close: "19:00", isClosed: false },
			thursday: { open: "10:00", close: "19:00", isClosed: false },
			friday: { open: "10:00", close: "19:00", isClosed: false },
			saturday: { open: "10:00", close: "19:00", isClosed: false },
			sunday: { open: "10:00", close: "19:00", isClosed: false },
		},
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
			const formattedData = {
				...restaurantData,
				openingHours: cleanOpeningHours(restaurantData.openingHours),
			};

			await $admin_api.restaurants.update(restaurant.publicId, formattedData);
			await refreshData();
			setUpdating(false);
			toast.success("Restaurant updated successfully");
		} catch (e) {
			setUpdating(false);
			toast.error("An error occurred while updating");
			console.error(e);
		}
	};
	const uploadRestaurantImage = async (
		file: File | null,
		id: string,
		setPreviewUrl: (url: string | null) => void,
		setOpen: (open: boolean) => void,
	) => {
		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response = await $admin_api.restaurants.image(id, formData);
			if (response) {
				toast.success("Restaurant image uploaded successfully");
				setOpen(false);
				setPreviewUrl(null);
				await refreshData(); // Refresh restaurant data
			}
		} catch (error) {
			toast.error("Error uploading restaurant image");
			console.error(error);
		}
	};

	return (
		<div>
			<div className={`relative`}>
				<div className={`absolute right-0 bottom-0`}>
					<ImageUploader
						buttonText="Update Restaurant Image"
						id={restaurant.publicId}
						onUploadComplete={refreshData}
						handleUpload={uploadRestaurantImage}
					/>
				</div>

				<Image
					priority={true}
					width={500}
					height={500}
					src={restaurant?.image}
					alt={restaurant?.name}
					className="w-full rounded-sm h-64 object-cover"
				/>
			</div>

			<RestaurantFormComponent
				restaurant={restaurantData}
				handleInputChange={handleInputChange}
				submitHandler={updateRestaurant}
				loading={updating}
				action="update"
				setRestaurantData={setRestaurantData}
			/>
		</div>
	);
};

export default RestaurantPage;
