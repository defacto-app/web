"use client";

import React, { useState } from "react";
import { $admin_api } from "@/http/admin-endpoint";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { menuColumns } from "@/app/admin/x/restaurants/[id]/menu/menu.columns";
import { DataTable } from "@/app/admin/x/users/data-table";
import { useQuery } from "react-query";
import { TablePagination } from "@/components/table/table-pagination";
import { useRouter, useSearchParams } from "next/navigation";

function fetchMenu(id: string) {
	return $admin_api.restaurants.getMenu(id); // Assuming this returns a promise with the getMenu data
}

function Page({ params }: { params: { id: string } }) {
	// Use the useQuery hook from React Query
	const [page, setPage] = useState(1); // Track current page
	const router = useRouter();
	const [perPage, setPerPage] = useState(10); // Track items per page

	const searchParams = useSearchParams();

	const { data, error, isLoading } = useQuery({
		queryKey: ["menu", params.id], // Unique key to cache data
		queryFn: () => fetchMenu(params.id), // The fetch function
	});

	const handlePageChange = (newPage: number) => {
		setPage(newPage);

		// Update the URL without reloading the page
		const params = new URLSearchParams(Array.from(searchParams.entries()));
		params.set("page", newPage.toString());
		router.push(`?${params.toString()}`);
	};

	if (isLoading) return <div>Loading...</div>;
	if (error instanceof Error) return <div>Error: {error.message}</div>;

	return (
		<div className={`bg-white shadow-sm rounded`}>
			{isLoading ? (
				<DataTableSkeleton columns={menuColumns} />
			) : (
				<div>
					<TablePagination
						page={page}
						totalPages={data?.meta.totalPages || 1}
						onPageChange={handlePageChange}
					/>
					<DataTable
						pageCount={data.meta.totalPages}
						pageIndex={page}
						perPage={perPage}
						columns={menuColumns}
						data={data.data.data.data}
					/>
					<TablePagination
						page={page}
						totalPages={data?.meta.totalPages || 1}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
}

export default Page;
