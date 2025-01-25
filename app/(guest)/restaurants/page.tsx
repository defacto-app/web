"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import RestaurantGrid from "@/components/restaurant/RestaurantGrid";
import { $api } from "@/http/endpoints";
import RestaurantFilterComponent from "@/components/restaurant/RestaurantFilterComponent";
import { useQuery } from "react-query";
import { useDebounce } from "react-haiku";
import {
	AllRestaurantLoading,
	NoResultsFound,
} from "./components/AllRestaurantLoading";
import SearchBar from "@/components/SearchBar";
import type { RestaurantQueryParams } from "@/lib/types";
import Debug from "@/app/components/Debug";

interface FilterOptions {
	category: string;
	menuCategory: string;
	dietary: string[];
	priceRange: string;
	quickFilter: string;
	sort: string;
}

const fetchRestaurants = async (
	page: number,
	perPage: number,
	searchTerm: string,
	filters: FilterOptions,
): Promise<any> => {
	const params: RestaurantQueryParams = {
		page,
		perPage,
		...(searchTerm && { search: searchTerm }),
		...(filters.category && { category: filters.category }),
	};

	return $api.guest.restaurant.all(params);
};

export default function Page() {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(30);
	const [filters, setFilters] = useState<FilterOptions>({
		category: "",
		menuCategory: "",
		dietary: [],
		priceRange: "",
		quickFilter: "",
		sort: "recommended",
	});

	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const debouncedFilters = useDebounce(filters, 500);
	const inputRef = useRef<HTMLInputElement>(null);

	const { data, error, isLoading, refetch } = useQuery(
		["restaurant", page, perPage, debouncedSearchTerm, debouncedFilters],
		() =>
			fetchRestaurants(page, perPage, debouncedSearchTerm, debouncedFilters),
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setPage(1); // Reset page when search changes
	};

	const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
		setPage(1); // Reset page when filters change
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [debouncedSearchTerm]);

	useEffect(() => {
		refetch();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [debouncedSearchTerm, debouncedFilters, refetch]);

	if (isLoading) {
		return <AllRestaurantLoading />;
	}

	if (error) return <div>Error loading data...</div>;

	const restaurants = data?.data?.data || [];

	return (
		<div>
			<div className="">
				<div className="flex">
					<div className="w-full lg:container lg:mx-auto">
						<div className="sticky top-0 z-10 bg-white w-full p-4">
							<div ref={inputRef}>
								<SearchBar
									isLoading={isLoading}
									value={searchTerm}
									onChange={handleSearchChange}
									placeholder="Search Restaurant and eateries in Asaba ..."
								/>
							</div>
						</div>
						<div className=" pt-4 pb-40">
							<RestaurantFilterComponent
								selectedFilters={filters}
								onFilterChange={handleFilterChange}
							/>

							{restaurants.length === 0 ? (
								<NoResultsFound />
							) : (
								<RestaurantGrid searchTerm={searchTerm} data={restaurants} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
