"use client";
import type React from "react";
import { useState } from "react";
import { MenuForm } from "@/app/admin/x/restaurants/components/menuForm";
import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
function Page({ params }: { params: { id: string } }) {
	const router = useRouter();

	const [menuData, setMenuData] = useState<any>({
		name: "",
		menuType: "",
		category: "",
		price: 0,
		available: false,

	});
	const [creating, setCreating] = useState<boolean>(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setMenuData((prevRestaurant: any) => ({
			...prevRestaurant,
			[name]: value ?? "", // Fallback to empty string if value is undefined
		}));
	};

	const handleAvailabilityChange = (checked: boolean) => {
		setMenuData((prev: any) => prev && {
			...prev,
			available: checked
		});
	};

	const createMenu = async () => {
		setCreating(true);
		try {
			const res = await $admin_api.menu.create(params.id, menuData); // Assuming create method exists in your API
			setCreating(false);
			toast.success("Restaurant created successfully");
			console.log("res", res.data.data);
			console.log("params", params);
			router.push(
				`/admin/x/restaurants/${res.data.data.parent}/menu/${res.data.data.publicId}`,
			);

			setMenuData(
				// Reset the form after successful creation
				{
					name: "",
					menuType: "",
					category: "",
					price: 0,
					available: false,
				},
			);
		} catch (e) {
			setCreating(false);
			toast.error("An error occurred while creating the restaurant");
		}
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="bg-white rounded-lg shadow-sm border p-6">
				<div className="space-y-6">
					<div className="border-b pb-4">
						<h1 className="text-xl font-semibold">New Menu item</h1>
						<p className="text-sm text-muted-foreground mt-1">
							Add a new item to your restaurant menu
						</p>
					</div>

					<MenuForm
						action="create"
						handleInputChange={handleInputChange}
						handleAvailabilityChange={handleAvailabilityChange}
						data={menuData}
						submitHandler={createMenu}
						loading={creating}
					/>
				</div>
			</div>
		</div>
	);
}

export default Page;
