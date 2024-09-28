"use client";

import type React from "react";
import { useEffect, useState } from "react";
import RestaurantGrid from "@/components/restaurant/RestaurantGrid";
import { $api } from "@/http/endpoints";
import { Input } from "@/components/ui/input";
import SideBarRestaurant from "@/components/restaurant/SideBarRestaurant";
import { QueryClient, useQuery } from "react-query";

import { $admin_api } from "@/http/admin-endpoint";
import { useDebounce } from "react-haiku";
import RestaurantGridLoading from "@/components/restaurant/RestaurantGridLoading";
// Create a QueryClient instance
const queryClient = new QueryClient();
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

	if (error) return <div>Error loading data...</div>;

	return (
		<div>
			<div className={`bg-blue-200 sticky top-0 z-10`}>
				{/* Search Input */}
				<Input
					type="search"
					value={searchTerm} // Bind input value to state
					onChange={handleSearchChange} // Update state on input change
					placeholder="Search Restaurant..."
					className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
				/>
				<p>
					These eateries are located in Asaba; look for eateries that deliver to
					you by searching for restaurants.
				</p>
			</div>
			<div className="pt-4 pb-20">
				<div className="grid grid-cols-1 md:grid-cols-4">
					{/* SideBarRestaurant - Hidden on mobile, shown on medium screens and up */}
					<div className="hidden md:block sticky top-0 h-screen">
						<SideBarRestaurant/>
					</div>

					{/* RestaurantGrid takes full width on mobile, 3/4 width on medium screens and up */}
					<div className="col-span-1 md:col-span-3">
						{isLoading ? (
							<RestaurantGridLoading/>
						) : (
							<RestaurantGrid data={data?.data?.data}/>
						)}
					</div>
				</div>
			</div>
		</div>

	);
}
