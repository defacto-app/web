"use client";

import React, { useState, useCallback } from "react";
import { $admin_api } from "@/http/admin-endpoint";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { menuColumns } from "@/app/admin/x/restaurants/[id]/menu/menu.columns";
import { DataTable } from "@/app/admin/x/users/data-table";
import { useQuery } from "react-query";
import { TablePagination } from "@/components/table/table-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import debounce from "lodash/debounce";
import { Search, Filter } from "lucide-react";

async function fetchMenu(id: string, params: any) {
	const response = await $admin_api.restaurants.getMenu(id, params);
	return response.data.data;
}

function Page({ params }: { params: { id: string } }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");
	const [category, setCategory] = useState("");
	const [availability, setAvailability] = useState("");

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ["menu", params.id, page, searchTerm, category, availability],
		queryFn: () =>
			fetchMenu(params.id, {
				page,
				perPage,
				search: searchTerm,
				category,
				isAvailable:
					availability === "available"
						? true
						: availability === "unavailable"
							? false
							: undefined,
			}),
	});

	const debouncedSearch = useCallback(
		debounce((value: string) => {
			setSearchTerm(value);
			setPage(1);
			updateQueryParams({ search: value, page: "1" });
		}, 500),
		[],
	);

	const updateQueryParams = (updates: Record<string, string>) => {
		const params = new URLSearchParams(Array.from(searchParams.entries()));
		for (const [key, value] of Object.entries(updates)) {
			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}
		}
		router.push(`?${params.toString()}`);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		updateQueryParams({ page: newPage.toString() });
	};

	return (
		<div className="space-y-4">
			<Card className="p-4">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex-1">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								variant={"rounded"}
								placeholder="Search menu items..."
								className="pl-8"
								onChange={(e) => debouncedSearch(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<Select
							value={category}
							onValueChange={(value) => {
								setCategory(value);
								setPage(1);
								updateQueryParams({
									category: value === "all" ? "" : value,
									page: "1",
								});
							}}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filter by category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Categories</SelectItem>
								<SelectItem value="food">Food</SelectItem>
								<SelectItem value="drinks">Drinks</SelectItem>
								<SelectItem value="desserts">Desserts</SelectItem>
							</SelectContent>
						</Select>

						<Select
							value={availability}
							onValueChange={(value) => {
								setAvailability(value);
								setPage(1);
								updateQueryParams({
									availability: value === "all" ? "" : value,
									page: "1",
								});
							}}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filter by availability" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Items</SelectItem>
								<SelectItem value="available">Available</SelectItem>
								<SelectItem value="unavailable">Unavailable</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</Card>

			<div className="bg-white shadow-sm rounded">
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
							pageCount={data?.meta.totalPages}
							pageIndex={page}
							perPage={perPage}
							columns={menuColumns}
							data={data?.data || []}
						/>
						<TablePagination
							page={page}
							totalPages={data?.meta.totalPages || 1}
							onPageChange={handlePageChange}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Page;
