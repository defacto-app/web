"use client";

import type React from "react";
import { useEffect, useState } from "react";
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
	const getData = async () => {
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
	};

	useEffect(() => {
		getData();
	}, [getData, params.menuId]); // Re-fetch if menuId changes

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMenuData((prevRestaurant: any) => ({
			...prevRestaurant,
			[name]: value ?? "", // Fallback to empty string if value is undefined
		}));
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
		setOpen: (open: boolean) => void
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
		<div className={`bg-white rounded-md  p-4 border mt-4`}>
			<h1 className={`py-4 text-lg`}>Update Menu</h1>

			<div className={`flex justify-start`}>
			<div className={`flex items-center`}>
				<Image
					priority={true}
					width={500}
					height={500}
					src={menuData?.image}
					alt={menuData?.name}
					className="rounded-sm h-64  object-cover"
				/>

				<ImageUploader
buttonText={"Update  Image"}
					handleUpload={uploadRestaurantImage}

					id={menuData.publicId}
					onUploadComplete={getData}
				/>
			</div>

			</div>
			<MenuForm
				data={menuData}
				handleInputChange={handleInputChange}
				submitHandler={updateMenu}
				loading={updating}
				action="update"
			/>

		</div>
	);
}

export default Page;
