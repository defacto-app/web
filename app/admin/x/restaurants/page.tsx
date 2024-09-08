"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { DataTable } from "@/app/admin/x/users/data-table";
import { columns } from "@/app/admin/x/restaurants/columns";
import { $admin_api } from "@/http/admin-endpoint";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTableLoading } from "@/components/table/data-table-loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Updated function to fetch restaurants with a search query parameter
const fetchRestaurants = async (
	page: number,
	perPage: number,
	searchTerm: string,
) => {
	const response = await $admin_api.restaurants.all({
		page,
		perPage,
		searchTerm,
	});
	return response.data; // Assuming response.data contains the restaurant list
};

function Page() {
	const [searchTerm, setSearchTerm] = useState(""); // Track the search term
	const [page, setPage] = useState(1); // Track current page
	const [perPage, setPerPage] = useState(20); // Track items per page
	const [isMounted, setIsMounted] = useState(false); // Ensure the component is mounted

	// Ensure this only runs on the client side to avoid SSR mismatches
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Use React Query's useQuery hook to fetch data, and pass searchTerm as part of the key
	const { data, error, isLoading, refetch } = useQuery(
		["restaurants", page, perPage, searchTerm], // The query key includes page, perPage, and search term
		() => fetchRestaurants(page, perPage, searchTerm),
		{
			keepPreviousData: true, // Keep the previous data while fetching new data
		},
	);

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	// Trigger refetch when the search term changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		refetch(); // Fetch new data when searchTerm changes
	}, [searchTerm, refetch]);

	// Prevent rendering during SSR to avoid mismatch
	if (!isMounted) return null;

	if (error) return <div>Error loading data...</div>;

	return (
		<div>
			<div className="container mx-auto py-10">
				<Link href={"/admin/x/restaurants/create"}>
					<Button variant="outline">Create Restaurant</Button>
				</Link>
				{/* Search Input */}
				<div className="relative pb-6">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						value={searchTerm} // Bind input value to state
						onChange={handleSearchChange} // Update state on input change
						placeholder="Search Restaurant..."
						className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
					/>
				</div>

				{/* Render the DataTableLoading with loading state */}
				<DataTableLoading
					loading={isLoading}
					columns={columns}
					data={data ?? []}
				/>
			</div>
		</div>
	);
}

export default Page;
