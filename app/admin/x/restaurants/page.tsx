"use client";

import React from "react";
import { useQuery } from "react-query";
import { DataTable } from "@/app/admin/x/users/data-table";
import { columns } from "@/app/admin/x/restaurants/columns";
import { $admin_api } from "@/http/admin-endpoint";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const fetchRestaurants = async () => {
    const res = await $admin_api.restaurants.all();
    return res; // React Query will handle the return data
};

function Page() {
    // Use React Query's useQuery hook to fetch data
    const { data, error, isLoading } = useQuery('restaurants', fetchRestaurants);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data...</div>;

    return (
        <div>
            <div className="container mx-auto py-10">
                {/* Search Input */}
                <div className="relative pb-6">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                </div>

                {/* Data Table */}
                <DataTable columns={columns} data={data.data} />
            </div>
        </div>
    );
}

export default Page;
