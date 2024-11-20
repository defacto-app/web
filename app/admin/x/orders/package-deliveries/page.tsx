"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { packageColumns } from "./package.columns";
import { DataTable } from "./data-table";
import { $admin_api } from "@/http/admin-endpoint";
import { useDebounce } from "react-haiku";
import { useQuery } from "react-query";
import {  Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { TablePagination } from "@/components/table/table-pagination";
import { useRouter, useSearchParams } from "next/navigation";

// Updated function to fetch restaurants with a search query parameter
const fetchOrders = async (
    page: number,
    perPage: number,
    searchTerm: string,
) => {
    const response = await $admin_api.orders.all({
        page,
        perPage,
        searchTerm,
        type: "package"
    });
    return response.data.data; // Assuming response.data contains the restaurant list
};
function AllPackageDeliveryPage() {
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
        () => fetchOrders(page, perPage, debouncedSearchTerm),
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
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            variant={`rounded`}
                            type="search"
                            value={searchTerm} // Bind input value to state
                            onChange={handleSearchChange} // Update state on input change
                            placeholder="Search delivery orders..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </div>

                {/* Render the DataTableLoading with loading state */}
                <div className={`bg-white shadow-sm rounded`}>
                    {isLoading ? (
                        <DataTableSkeleton columns={packageColumns} />
                    ) : (
                        <>
                            <TablePagination
                                page={page}
                                totalPages={data?.meta.totalPages || 1}
                                onPageChange={handlePageChange}
                            />
                            <DataTable

                                columns={packageColumns}
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

export default AllPackageDeliveryPage;
