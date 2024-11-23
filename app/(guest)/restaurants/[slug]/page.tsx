"use client";
import { useEffect, useState } from "react";
import { $api } from "@/http/endpoints";
import OrderCart from "@/app/user/checkout/OrderCart";
import MenuArea from "@/app/(guest)/restaurants/components/MenuArea";
import debounce from "lodash/debounce";
import {
	BreadcrumbNav,
	ErrorState,
	LoadingState,
	MenuSections,
	RestaurantHero,
	RestaurantStatus,
	SearchBar,
	OpeningHourComponent,
} from "@/app/(guest)/restaurants/components/SingleRestaurantComponents";
import type {
	Category,
	MenuItemDisplay,
	Restaurant,

} from "@/lib/types";


function RestaurantPage({ params }: { params: { slug: string } }) {
	const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
	const [menu, setMenu] = useState<MenuItemDisplay[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState("All");
	const [isOpen, setIsOpen] = useState(false);

	type OpeningHoursType = {
		[day: string]: {
			open: string;
			close: string;
			isClosed: boolean;
		};
	};

	const checkIfOpen = (hours: OpeningHoursType) => {
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

		// Check if the hours object and the day-specific opening hours are defined
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

	useEffect(() => {
		if (!restaurant?.openingHours) return;

		const interval = setInterval(() => {
			setIsOpen(checkIfOpen(restaurant.openingHours));
		}, 60000);

		return () => clearInterval(interval);
	}, [restaurant?.openingHours]);

	const debouncedSearch = debounce(async (searchTerm: string) => {
		try {
			const res = await $api.guest.restaurant.one(
				`${params.slug}?search=${searchTerm}`,
			);
			setMenu(res.data.menu);
		} catch (e) {
			setError("Failed to search menu items");
		}
	}, 300);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await $api.guest.restaurant.one(params.slug);
				setRestaurant(res.data.restaurant);
				setMenu(res.data.menu);
				setCategories(res.data.categories);
				setIsOpen(checkIfOpen(res.data.restaurant.openingHours));
			} catch (e) {
				setError("Failed to load restaurant data");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [params.slug]);

	useEffect(() => {
		if (search) {
			debouncedSearch(search);
		} else {
			$api.guest.restaurant.one(params.slug).then((res) => {
				setMenu(res.data.menu);
			});
		}
	}, [search]);

	if (loading) return <LoadingState />;
	if (error) return <ErrorState error={error} />;
	if (!restaurant) return null;

	const allCategories = [
		{ _id: "All", name: "All Categories", slug: "all" },
		...categories,
	];




	const filteredMenu = menu.filter((item) => {
		return item.name.toLowerCase().includes(search.toLowerCase());
	});
	return (
		<div className="min-h-screen bg-gray-50">
			<BreadcrumbNav restaurantName={restaurant.name} />
			<div className="relative">
				<RestaurantHero
					image={restaurant.image}
					name={restaurant.name}
					deliveryTime={restaurant.deliveryTime}
					address={restaurant.address}
				/>
				<div className="absolute top-4 right-4">
					<RestaurantStatus isOpen={isOpen} />
				</div>
			</div>

			<div className="container mx-auto px-4 lg:px-6 py-6">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
					<div className="lg:col-span-2">
						<div className="sticky top-4 space-y-4">
							<MenuSections
								categories={allCategories}
								activeCategory={activeCategory}
								setActiveCategory={setActiveCategory}
							/>
							<OpeningHourComponent openingHours={restaurant.openingHours}/>


						</div>
						</div>

						<div className="lg:col-span-7">
							<SearchBar
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder={`Search in ${restaurant.name}`}
							/>
							<div className="mt-4">
								<MenuArea data={filteredMenu} categories={categories}/>
							</div>
						</div>

						<div className="hidden lg:block lg:col-span-3">
							<div className="sticky top-4">
								<OrderCart restaurant_name={restaurant.name}/>
							</div>
						</div>
					</div>
				</div>

				<div className="lg:hidden fixed bottom-4 right-4 z-50">
				<OrderCart buttonOnly restaurant_name={restaurant.name} />
			</div>
		</div>
	);
}

export default RestaurantPage;
