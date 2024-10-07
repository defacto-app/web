"use client";

import { useEffect, useState } from "react";
import { $api } from "@/http/endpoints";
import { formatPrice } from "@/utils";
import MenuArea from "@/app/(guest)/restaurants/components/MenuArea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Clock1 } from "lucide-react"; // Assuming you have a button component

function Page({ params }: { params: { slug: string } }) {
	// State for restaurant and menu data
	const [restaurant, setRestaurant] = useState<any>(null);
	const [menu, setMenu] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState<string>("");

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

	// Filtered menu based on search input
	const filteredMenu = menu.filter((item) =>
		item.name.toLowerCase().includes(search.toLowerCase()),
	);

	// Conditional rendering
	if (loading) {
		return <div>Loading...</div>;
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
						<div className={`absolute top-40 text-white z-10 px-20 space-y-2`}>
							{" "}
							{/* Text is white */}
							<h1 className={`text-5xl font-bold`}>{restaurant.name}</h1>
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
							<Image
								width={1000}
								height={100}
								className={`h-[400px] w-full object-cover filter brightness-50`} // Darken the image
								src={restaurant.image}
								alt={restaurant.name}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Search Input and Menu */}
			<div className={`container mx-auto py-8`}>
				<div className="menu-filters">
					<Button variant="outline">All</Button>
					<Button variant="outline">For You</Button>
					<Button variant="outline">Desserts</Button>
					<Button variant="outline">Drinks</Button>
				</div>

				{/* Search Bar */}
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search menu..."
					className="search-input"
				/>

				{/* Menu Area */}
				<div className="menu-items">
					<MenuArea data={filteredMenu.length > 0 ? filteredMenu : menu} />
				</div>
			</div>
		</div>
	);
}

export default Page;
