"use client";

import { useState, useMemo } from "react";
import { $api } from "@/http/endpoints";
import OrderCart from "@/app/user/cart/components/OrderCart";
import MenuArea from "@/app/(guest)/restaurants/components/MenuArea";
import debounce from "lodash/debounce";
import {
	BreadcrumbNav,
	ErrorState,
	LoadingState,
	MenuSections,
	RestaurantHero,
	OpeningHourComponent,
} from "@/app/(guest)/restaurants/components/SingleRestaurantComponents";
import { SearchBar } from "@/components/SearchBar";
import { useQuery } from "react-query";
import type { AxiosError } from "axios";

function RestaurantPage({ params }: { params: { slug: string } }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeCategory, setActiveCategory] = useState("All");
	const [debouncedTerm, setDebouncedTerm] = useState("");

	// Create memoized debounced function for API calls
	const debouncedSetTerm = useMemo(
		() =>
			debounce((term: string) => {
				setDebouncedTerm(term);
			}, 500),
		[],
	);

	// Fetch Restaurant Data
	const {
		data: restaurantData,
		isLoading,
		isError,
		error,
	} = useQuery<any, AxiosError>(
		["restaurant", params.slug],
		async () => {
			const res = await $api.guest.restaurant.one(params.slug);
			return res.data;
		},
		{
			staleTime: 5 * 60 * 1000,
		},
	);

	// Fetch Menu Items
	const { data: menuData } = useQuery(
		["menu", params.slug, debouncedTerm],
		async () => {
			const res = await $api.guest.restaurant.one(
				debouncedTerm ? `${params.slug}?search=${debouncedTerm}` : params.slug,
			);
			return res.data.menu;
		},
		{
			enabled: !!restaurantData, // Only fetch menu data if restaurant data is available
		},
	);

	// Handle search input changes
	const handleSearch = (value: string) => {
		setSearchTerm(value);
		debouncedSetTerm(value);
	};

	if (restaurantData) {
		sessionStorage.setItem("restaurant_id", restaurantData.restaurant.publicId);
	}

	const restaurant = restaurantData?.restaurant || null;
	const menu = menuData || [];
	const categories = restaurantData?.categories || [];

	// Check if Restaurant is Open
	const checkIfOpen = (hours: any) => {
		const now = new Date();
		const days = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];
		const day = days[now.getDay()];
		const currentTime = now.getHours() * 60 + now.getMinutes();

		if (!hours || !hours[day]) {
			return false;
		}

		const { open, close, isClosed } = hours[day];
		const [openHour, openMin] = open.split(":").map(Number);
		const [closeHour, closeMin] = close.split(":").map(Number);

		const openTime = openHour * 60 + openMin;
		const closeTime = closeHour * 60 + closeMin;

		return currentTime >= openTime && currentTime <= closeTime && !isClosed;
	};

	const isOpen = restaurant?.openingHours
		? checkIfOpen(restaurant.openingHours)
		: false;

	// Handle Loading and Error States
	if (isLoading) return <LoadingState />;
	if (isError) return <ErrorState error={error?.message || "Failed to load"} />;
	if (!restaurant) return null;

	const allCategories = [
		{ _id: "All", name: "All Categories", slug: "all" },
		...categories,
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<BreadcrumbNav restaurantName={restaurant.name} />
			<div className="relative">
				<RestaurantHero
					isOpen={isOpen}
					image={restaurant.image}
					name={restaurant.name}
					deliveryTime={restaurant.deliveryTime}
					address={restaurant.address}
					rating={restaurant.rating}
				/>
			</div>

			<div className="container mx-auto px-4 lg:px-6 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					<div className="lg:col-span-2">
						<div className="sticky top-4 space-y-4">
							<div className="hidden lg:block">
								<MenuSections
									categories={allCategories}
									activeCategory={activeCategory}
									setActiveCategory={setActiveCategory}
								/>
							</div>
							<OpeningHourComponent openingHours={restaurant.openingHours} />
						</div>
					</div>

					<div className="lg:col-span-7">
						<div className="sticky top-0 bg-gray-50 z-10 py-4">
							<SearchBar
								isLoading={isLoading}
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
								placeholder={`Search in ${restaurant.name}`}
							/>
							<div className="lg:hidden">
								<MenuSections
									categories={allCategories}
									activeCategory={activeCategory}
									setActiveCategory={setActiveCategory}
								/>
							</div>
						</div>
						<div className="mt-4">
							<MenuArea data={menu} categories={categories} />
						</div>
					</div>

					<div className="hidden lg:block lg:col-span-3">
						<div className="sticky top-4">
							<OrderCart />
						</div>
					</div>
				</div>
			</div>

			<div className="lg:hidden fixed bottom-4 right-4 z-50">
				<OrderCart buttonOnly />
			</div>
		</div>
	);
}

export default RestaurantPage;
