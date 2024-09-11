"use client";

import React from "react";
import { $admin_api } from "@/http/admin-endpoint";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { menuColumns } from "@/app/admin/x/restaurants/[id]/menu/menu.columns";
import { DataTable } from "@/app/admin/x/users/data-table";
import { useQuery } from "react-query";

function fetchMenu(id: string) {
	return $admin_api.restaurants.getMenu(id); // Assuming this returns a promise with the getMenu data
}

function Page({ params }: { params: { id: string } }) {
	// Use the useQuery hook from React Query
	const { data, error, isLoading } = useQuery({
		queryKey: ["menu", params.id], // Unique key to cache data
		queryFn: () => fetchMenu(params.id), // The fetch function
	});

	if (isLoading) return <div>Loading...</div>;
	if (error instanceof Error) return <div>Error: {error.message}</div>;

	return (
		<div className={`bg-white shadow-sm rounded`}>
			{isLoading ? (
				<DataTableSkeleton columns={menuColumns} />
			) : (
				<div>
					<DataTable columns={menuColumns} data={data.data.data.data} />
				</div>
			)}
		</div>
	);
}

export default Page;
