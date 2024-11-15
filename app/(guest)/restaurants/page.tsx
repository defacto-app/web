"use client";

import type React from "react";
import { useEffect, useState } from "react";
import RestaurantGrid from "@/components/restaurant/RestaurantGrid";
import { $api } from "@/http/endpoints";
import { Input } from "@/components/ui/input";
import SideBarRestaurant from "@/components/restaurant/SideBarRestaurant";
import { useQuery } from "react-query";

import { useDebounce } from "react-haiku";
import AllRestaurantLoading from "@/app/(guest)/restaurants/components/AllRestaurantLoading";
const fetchRestaurants = async (
	page: number,
	perPage: number,
	searchTerm: string,
) => {
	const response = $api.guest.restaurant.all({
		page,
		perPage,
		searchTerm,
	});
	return response; // Assuming response.data contains the restaurant list
};

export default function Page() {
	const [searchTerm, setSearchTerm] = useState(""); // Track the search term
	const [page, setPage] = useState(1); // Track current page
	const [perPage, setPerPage] = useState(30); // Track items per page
	const [isMounted, setIsMounted] = useState(false); // Ensure the component is mounted
	const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term by 500ms

	// Ensure this only runs on the client side to avoid SSR mismatches
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Use React Query's useQuery hook to fetch data, and pass debouncedSearchTerm as part of the key
	const { data, error, isLoading, refetch } = useQuery(
		["restaurant", page, perPage, debouncedSearchTerm], // The query key includes page, perPage, and debounced search term
		() => fetchRestaurants(page, perPage, debouncedSearchTerm),
		{
			// keepPreviousData: true, // Keep the previous data while fetching new data
		},
	);

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	// Trigger refetch when the debounced search term changes
	useEffect(() => {
		refetch(); // Fetch new data when debouncedSearchTerm changes
	}, [debouncedSearchTerm, refetch]);

	// Prevent rendering during SSR to avoid mismatch
	if (!isMounted) return null;

	if (isLoading) {
		return <AllRestaurantLoading />;
	}

	if (error) return <div>Error loading data...</div>;

	return (
		<div>
			<div className="">
				<div className="flex  px-2">
					{/* SideBarRestaurant - Hidden on mobile, shown on medium screens and up */}
					<div className="hidden md:block sticky top-0 h-screen w-[400px]">
						<SideBarRestaurant />
					</div>

					{/* RestaurantGrid takes full width on mobile, 3/4 width on medium screens and up */}
					<div className="w-full">
						<div
							className={`sticky top-0 z-10 bg-white w-full p-4  border-b shadow`}
						>
							{/* Search Input */}
							<Input
								variant={`rounded`}
								type="search"
								value={searchTerm} // Bind input value to state
								onChange={handleSearchChange} // Update state on input change
								placeholder="Search Restaurant and eateries in Asaba ..."
								className="py-4 mt-4 h-10 sm:w-[300px] md:w-[600px] "
							/>
						</div>
						<div className={`px-6 pt-4  pb-40`}>
							<RestaurantGrid data={data?.data?.data} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
