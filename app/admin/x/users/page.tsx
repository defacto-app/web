"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { userColumns } from "./user.columns";
import { DataTable } from "./data-table";
import { $admin_api } from "@/http/admin-endpoint";
import { useDebounce } from "react-haiku";
import { useQuery } from "react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { TablePagination } from "@/components/table/table-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useRefetchContext } from "@/app/store/tableAtom";
import { SearchBar } from "@/components/SearchBar";

import CreateUserDialog from "@/app/admin/x/users/CreateUserDialog";

// Updated function to fetch restaurants with a search query parameter
const fetchUsers = async (
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
	const { shouldRefetch, triggerRefetch } = useRefetchContext(); // Use the custom hook
	const [searchTerm, setSearchTerm] = useState(""); // Track the search term
	const [page, setPage] = useState(1); // Track current page
	const [perPage, setPerPage] = useState(10); // Track items per page
	const [isMounted, setIsMounted] = useState(false); // Ensure the component is mounted
	const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term by 500ms
	const router = useRouter();
	const searchParams = useSearchParams();

	// Ensure this only runs on the client side to avoid SSR mismatches
	useEffect(() => {
		setIsMounted(true);
	}, []);
	useEffect(() => {
		const pageParam = searchParams.get("page");
		setPage(pageParam ? Number(pageParam) : 1);

		const perPageParam = searchParams.get("perPage");
		setPerPage(perPageParam ? Number(perPageParam) : 10);
	}, [searchParams]);

	// Use React Query's useQuery hook to fetch data, and pass debouncedSearchTerm as part of the key
	const { data, error, isLoading, refetch } = useQuery(
		["users", page, perPage, debouncedSearchTerm], // The query key includes page, perPage, and debounced search term
		() => fetchUsers(page, perPage, debouncedSearchTerm),
		{
			// keepPreviousData: true,
		},
	);

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setPage(1); // Reset to first page when search term changes
		router.push(`?search=${e.target.value}&page=1`); // Update the URL without reloading the page
	};
	const handlePageChange = (newPage: number) => {
		setPage(newPage);

		// Update the URL without reloading the page
		const params = new URLSearchParams(Array.from(searchParams.entries()));
		params.set("page", newPage.toString());
		router.push(`?${params.toString()}`);
	};

	const handlePerPageChange = (newPerPage: number) => {
		setPerPage(newPerPage);
		setPage(1); // Reset to first page when perPage changes

		// Update the URL without reloading the page
		const params = new URLSearchParams(Array.from(searchParams.entries()));
		params.set("perPage", newPerPage.toString());
		params.set("page", "1");
		router.push(`?${params.toString()}`);
	};

	const handleClearSearch = () => {
		const params = new URLSearchParams(Array.from(searchParams.entries()));

		params.delete("search");

		// Ensure the "page" is reset to 1
		params.set("page", "1");

		router.push(`?${params.toString()}`);

		setSearchTerm("");

		console.log("Search input cleared");
	};

	useEffect(() => {
		if (shouldRefetch) {
			refetch();
			triggerRefetch(); // Reset the refetch state
		}
	}, [shouldRefetch, refetch, triggerRefetch]);

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
					<SearchBar
						onClear={handleClearSearch}
						placeholder="Search Users..."
						value={searchTerm}
						onChange={handleSearchChange}
						isLoading={isLoading}
					/>


					<CreateUserDialog />
				</div>

				{/* Render the DataTableLoading with loading state */}
				<div className={`bg-white shadow-sm rounded`}>
					{isLoading ? (
						<DataTableSkeleton columns={userColumns} />
					) : (
						<>
							<TablePagination
								page={page}
								totalPages={data?.meta.totalPages || 1}
								onPageChange={handlePageChange}
							/>
							<DataTable
								columns={userColumns}
								data={data.data}
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
