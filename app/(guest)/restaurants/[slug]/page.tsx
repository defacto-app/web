"use client";

import { useEffect, useState } from "react";
import { $api } from "@/http/endpoints";

import MenuArea from "@/app/(guest)/restaurants/components/MenuArea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Clock1 } from "lucide-react";
import OrderCart from "@/app/user/checkout/OrderCart";
import OneRestaurantsLoading from "@/app/(guest)/restaurants/components/OneRestaurantsLoading";

function Page({ params }: { params: { slug: string } }) {
	// State for restaurant and menu data
	const [restaurant, setRestaurant] = useState<any>(null);
	const [menu, setMenu] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState<string>("");
	const [activeTab, setActiveTab] = useState<string>("All");

	// Function to fetch restaurant and menu data
	const getData = async () => {
		try {
			const res = await $api.guest.restaurant.one(params.slug);
			const { restaurant, menu } = res.data;

			setRestaurant(restaurant); // Set the restaurant details
			setMenu(menu); // Set the menu items
		} catch (e) {
			setError("Failed to fetch data");
			console.log("error", e);
		} finally {
			setLoading(false); // Stop the loading spinner after request
		}
	};

	useEffect(() => {
		getData();
	}, []);

	// Extract unique menu types
	const uniqueMenuTypes = [
		"All",
		...new Set(menu.map((item) => item.menuType)),
	];

	// Filtered menu based on the active tab and search input
	const filteredMenu = menu.filter((item) => {
		const matchesSearch = item.name
			.toLowerCase()
			.includes(search.toLowerCase());
		const matchesTab = activeTab === "All" || item.menuType === activeTab;
		return matchesSearch && matchesTab;
	});

	// Conditional rendering
	if (loading) {
		return <OneRestaurantsLoading />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			{/* Restaurant Information */}
			<div className="relative">
				{restaurant && (
					<div>
						<div
							className={`absolute top-28 text-white z-10 px-4 lg:px-20 space-y-2`}
						>
							{" "}
							{/* Text is white */}
							<h1 className={`text-2xl lg:text-5xl font-bold`}>
								{restaurant.name}
							</h1>
							<div className={`flex items-center gap-x-2`}>
								<MapPin />

								<p className={`text-lg`}>{restaurant.address}</p>
							</div>
							<div className={`flex items-center gap-x-2`}>
								<Clock1 />
								<p className={`text-lg`}>{restaurant.deliveryTime}</p>
							</div>
							{/* Opening Hours */}
							<div>
								<p>
									<span className={`text-blue-500 text-xl`}>Open</span>:{" "}
									{restaurant.openingHours}
								</p>
							</div>
						</div>
						<div className="relative">
							{/*		<Image
								width={1000}
								height={100}
								className={`h-[300px] w-full object-cover filter brightness-50`} // Darken the image
								src={restaurant.image}
								alt={restaurant.name}
							/>*/}
							<Image
								width={1000}
								height={100}
								className={`h-[300px] w-full object-cover filter brightness-50 transition-opacity duration-300 opacity-0`}
								src={restaurant.image}
								alt={restaurant.name}
								onLoadingComplete={(img) => img.classList.remove("opacity-0")}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Search Input and Menu */}
			<div className={`lg:container mx-auto py-8`}>
				<div className="menu-filters flex space-x-4 mb-4 px-4">
					{uniqueMenuTypes.map((type) => (
						<Button
							key={type}
							variant={activeTab === type ? "primary" : "outline"}
							onClick={() => setActiveTab(type)}
						>
							<span className={`capitalize`}> {type}</span>
						</Button>
					))}
				</div>

				{/* Search Bar */}
				<div className={`px-2 py-2`}>
					<Input
						variant={`rounded`}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search menu..."
						className="w-full"
					/>
				</div>

				{/* Menu Area */}
				<div className="flex items-start">
					<div className={`px-2`}>
						<div className={`lg:hidden `}>
							<OrderCart buttonOnly={true} restaurant_name={restaurant.name}  />
						</div>
						<MenuArea data={filteredMenu.length > 0 ? filteredMenu : menu} />
					</div>

					<div className={`hidden lg:block sticky top-20 right-5`}>
						<OrderCart restaurant_name={restaurant.name} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
