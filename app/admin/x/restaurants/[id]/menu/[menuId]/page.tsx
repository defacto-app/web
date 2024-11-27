"use client";

import type React from "react";
import { useEffect, useState, useCallback } from "react";
import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify";
import { MenuForm } from "@/app/admin/x/restaurants/components/menuForm";
import Image from "next/image";
import ImageUploader from "@/app/admin/components/ImageUploader";

function Page({ params }: { params: { menuId: string } }) {
	const [menuData, setMenuData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [updating, setUpdating] = useState<boolean>(false);

	// Fetch getMenu data
	const getData = useCallback(async () => {
		try {
			const res = await $admin_api.menu.one(params.menuId);
			setMenuData(res.data.data); // Assuming res.data holds the getMenu data
			setLoading(false);
		} catch (e: any) {
			setError(
				e.message || "An error occurred while fetching the getMenu data",
			);
			setLoading(false);
		}
	}, [params.menuId]); // Memoize getData with useCallback and add params.menuId as a dependency

	useEffect(() => {
		getData();
	}, [getData]); // Remove getData from the dependency array

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMenuData((prevRestaurant: any) => ({
			...prevRestaurant,
			[name]: value ?? "", // Fallback to empty string if value is undefined
		}));
	};

	const handleAvailabilityChange = (checked: boolean) => {
		setMenuData(
			(prev: any) =>
				prev && {
					...prev,
					available: checked,
				},
		);
	};

	const updateMenu = async () => {
		setUpdating(true);
		try {
			await $admin_api.menu.update(menuData.publicId, menuData);
			await getData();
			setUpdating(false);
			toast.success("Menu updated successfully");
		} catch (e) {
			setUpdating(false);
			toast.error("An error occurred while updating");
		}
	};

	// Render loading state
	if (loading) return <div>Loading...</div>;

	// Render error state
	if (error) return <div>Error: {error}</div>;

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
			const response = await $admin_api.menu.image(id, formData);
			if (response) {
				toast.success("Menu image uploaded successfully");
				setOpen(false);
				setPreviewUrl(null);
				await getData(); // Refresh restaurant data
			}
		} catch (error) {
			toast.error("Error uploading restaurant image");
			console.error(error);
		}
	};

	// Render getMenu data once fetched
	return (
		<div className="max-w-4xl mx-auto">
			<div className="bg-white rounded-lg shadow-sm border p-6 space-y-8">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold">Update Menu</h1>
				</div>

				{/* Image Section */}
				<div className="space-y-4">
					<div className="max-w-md mx-auto">
						<div className="aspect-video relative overflow-hidden rounded-lg border bg-gray-50">
							<Image
								priority
								src={menuData?.image || "https://placehold.co/600x400"}
								alt={menuData?.name || "Menu item"}
								width={600}
								height={400}
								className="object-cover"
							/>
						</div>
						<div className="mt-4">
							<ImageUploader
								buttonText="Update Image"
								handleUpload={uploadRestaurantImage}
								id={menuData.publicId}
								onUploadComplete={getData}
							/>
						</div>
					</div>
				</div>

				{/* Form Section */}
				<div className="mt-8">
					<MenuForm
						data={menuData}
						handleInputChange={handleInputChange}
						handleAvailabilityChange={handleAvailabilityChange}
						submitHandler={updateMenu}
						loading={updating}
						action="update"
					/>
				</div>
			</div>
		</div>
	);
}

export default Page;
