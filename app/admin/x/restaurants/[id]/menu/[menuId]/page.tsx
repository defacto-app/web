"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { $admin_api } from "@/http/admin-endpoint";
import {toast} from "react-toastify";
import {MenuForm} from "@/app/admin/x/restaurants/components/menuForm";

function Page({ params }: { params: { menuId: string } }) {
	const [menuData, setMenuData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [updating, setUpdating] = useState<boolean>(false);

	// Fetch menu data
	const getData = async () => {
		try {
			const res = await $admin_api.menu.one(params.menuId);
			setMenuData(res.data.data); // Assuming res.data holds the menu data
			setLoading(false);
		} catch (e: any) {
			setError(e.message || "An error occurred while fetching the menu data");
			setLoading(false);
		}
	};


	useEffect(() => {
		getData();
	}, [params.menuId]); // Re-fetch if menuId changes

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMenuData((prevRestaurant: any) => ({
			...prevRestaurant,
			[name]: value ?? "", // Fallback to empty string if value is undefined
		}));
	};

	const updateRestaurant = async () => {
		setUpdating(true);
		try {
			await $admin_api.menu.update(menuData.publicId, menuData);
			await 	getData();
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

	// Render menu data once fetched
	return (
		<div>
			<h1>Menu Page for Menu ID: {params.menuId}</h1>

			<MenuForm

				data={menuData}
				handleInputChange={handleInputChange}
				submitHandler={updateRestaurant}
				loading={updating}
				action="update"
			/>


		</div>
	);
}

export default Page;

