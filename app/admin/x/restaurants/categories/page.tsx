"use client";

import React, { useState, useCallback } from "react";
import { $admin_api } from "@/http/admin-endpoint";
import { DataTable } from "@/app/admin/x/users/data-table";
import { TablePagination } from "@/components/table/table-pagination";
import { Input } from "@/components/ui/input";
import debounce from "lodash/debounce";
import { Search } from "lucide-react";
import { useQuery } from "react-query";

import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { categoryColumns } from "@/app/admin/x/restaurants/restaurant.columns";

const fetchMenus = async ({ queryKey }: any) => {
	const [_key, page, perPage, searchTerm] = queryKey; // Extract query parameters
	const response = await $admin_api.restaurants.categories({
		page,
		perPage,
		searchTerm,
	});
	return response.data.data; // Assuming response.data.data contains the menu data
};

function AllCategoriesPage() {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState(""); // Search term

	// Debounced search
	const debouncedSearch = useCallback(
		debounce((value) => {
			setSearchTerm(value);
			setPage(1); // Reset to first page for new search
		}, 500),
		[],
	);

	// Use react-query to fetch menus
	const { data, error, isLoading } = useQuery(
		["menus", page, perPage, searchTerm],
		fetchMenus,
		{
			keepPreviousData: true, // Keep old data while fetching new data
			staleTime: 5000, // Prevent refetching for 5 seconds
		},
	);

	// Handle page change
	const handlePageChange = (newPage: any) => {
		setPage(newPage);
	};

	if (error) return <div>Failed to fetch menus</div>;

	return (
		<div className="space-y-4">
			<h1 className="text-2xl font-bold mb-4">All Categories</h1>
			<div className="relative">
				<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					variant={"rounded"}
					placeholder="Search Categories..."
					className="pl-8"
					onChange={(e) => debouncedSearch(e.target.value)}
				/>
			</div>

			<div className="bg-white shadow-sm rounded">
				{isLoading ? (
					<DataTableSkeleton columns={categoryColumns} />
				) : (
					<>
						<TablePagination
							page={page}
							totalPages={data.meta.totalPages}
							onPageChange={handlePageChange}
						/>
						<DataTable
							pageCount={data.meta.totalPages}
							pageIndex={page}
							perPage={perPage}
							columns={categoryColumns}
							data={data.data || []}
						/>

						<TablePagination
							page={page}
							totalPages={data.meta.totalPages}
							onPageChange={handlePageChange}
						/>
					</>
				)}
			</div>
		</div>
	);
}

export default AllCategoriesPage;
