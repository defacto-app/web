"use client"
import React, {useEffect, useState} from "react";

import { userColumns } from "./user.columns";
import { DataTable } from "./data-table";
import {$admin_api} from "@/http/admin-endpoint";
import Page from "@/app/admin/x/restaurants/page";
import {useDebounce} from "react-haiku";
import {useQuery} from "react-query";
import {ChevronRight, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {DataTableSkeleton} from "@/components/table/data-table-skeleton";
import {restaurantColumns} from "@/app/admin/x/restaurants/restaurant.columns";
import {TablePagination} from "@/components/table/table-pagination";


// Updated function to fetch restaurants with a search query parameter
const fetchRestaurants = async (
	page: number,
	perPage: number,
	searchTerm: string,
) => {
	const response = await $admin_api.users.all({
		page,
		perPage,
		searchTerm,
	});
	return response.data.data; // Assuming response.data contains the restaurant list
};
function AllUserPage() {
	const [searchTerm, setSearchTerm] = useState(""); // Track the search term
	const [page, setPage] = useState(1); // Track current page
	const [perPage, setPerPage] = useState(10); // Track items per page
	const [isMounted, setIsMounted] = useState(false); // Ensure the component is mounted
	const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term by 500ms


	// Ensure this only runs on the client side to avoid SSR mismatches
	useEffect(() => {
		setIsMounted(true);
	}, []);


	// Use React Query's useQuery hook to fetch data, and pass debouncedSearchTerm as part of the key
	const { data, error, isLoading, refetch } = useQuery(
		["users", page, perPage, debouncedSearchTerm], // The query key includes page, perPage, and debounced search term
		() => fetchRestaurants(page, perPage, debouncedSearchTerm),
		{
			// keepPreviousData: true, // Keep the previous data while fetching new data
		},
	);

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);

		console.log("handlePageChange", newPage);
	};

	// Trigger refetch when the debounced search term changes
	useEffect(() => {
		refetch(); // Fetch new data when debouncedSearchTerm changes
	}, [debouncedSearchTerm, refetch]);

	// Prevent rendering during SSR to avoid mismatch
	if (!isMounted) return null;

	if (error) return <div>Error loading data...</div>;


	return (
		<div className={`container mx-auto mt-4 pb-20`}>
			<div className="">
				{/* Search Input */}
				<div
					className={`bg-white shadow-sm rounded mb-6 p-6 flex justify-between`}
				>
					<div className="relative">

						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
						<Input
							type="search"
							value={searchTerm} // Bind input value to state
							onChange={handleSearchChange} // Update state on input change
							placeholder="Search Restaurant..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>

				</div>

				{/* Render the DataTableLoading with loading state */}
				<div className={`bg-white shadow-sm rounded`}>
					{isLoading ? (
						<DataTableSkeleton columns={userColumns}/>
					) : (
						<>

							<TablePagination
								page={page}
								totalPages={data?.meta.totalPages || 1}
								onPageChange={handlePageChange}
							/>
							<DataTable columns={userColumns} data={data.data}

									   pageCount={data.meta.totalPages}
									   pageIndex={page}
									   perPage={perPage}
							/>
							<TablePagination
								page={page}
								totalPages={data?.meta.totalPages || 1}
								onPageChange={handlePageChange}

							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default AllUserPage;


