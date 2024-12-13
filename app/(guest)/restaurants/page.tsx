"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import RestaurantGrid from "@/components/restaurant/RestaurantGrid";
import { $api } from "@/http/endpoints";
import { Input } from "@/components/ui/input";
import SideBarRestaurant from "@/components/restaurant/SideBarRestaurant";
import { useQuery } from "react-query";
import { useDebounce } from "react-haiku";
import { AllRestaurantLoading } from "./components/AllRestaurantLoading";
import SearchBar from "@/components/SearchBar";

const fetchRestaurants = async (
	page: number,
	perPage: number,
	searchTerm: string,
) => {
	const response = $api.guest.restaurant.all({
		page,
		perPage,
		searchTerm,
	});
	return response;
};

export default function Page() {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(30);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const inputRef = useRef<HTMLInputElement>(null);

	const { data, error, isLoading, refetch } = useQuery(
		["restaurant", page, perPage, debouncedSearchTerm],
		() => fetchRestaurants(page, perPage, debouncedSearchTerm),
	);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [debouncedSearchTerm]);

	useEffect(() => {
		refetch();
		// Scroll to top of the window instead of a specific element
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [debouncedSearchTerm, refetch]);

	if (isLoading) {
		return <AllRestaurantLoading />;
	}

	if (error) return <div>Error loading data...</div>;

	return (
		<div>
			<div className="">
				<div className="flex px-2">
					<div className="hidden md:block sticky top-0 h-screen w-[300px]">
						<SideBarRestaurant />
					</div>

					<div className="w-full">
						<div className="sticky top-0 z-10 bg-white w-full p-4">
							<div ref={inputRef}>
								<SearchBar
									isLoading={isLoading}
									value={searchTerm}
									onChange={handleSearchChange}
									placeholder="Search Restaurant and eateries in Asaba ..."
								/>
							</div>
							{/* 				<Input
								variant="rounded"
								type="search"
								value={searchTerm}
								onChange={handleSearchChange}
								placeholder="Search Restaurant and eateries in Asaba ..."
								className="py-4 mt-4 h-10 sm:w-[300px] md:w-[600px]"
								ref={inputRef}
							/> */}
						</div>
						<div className="px-6 pt-4 pb-40">
							<RestaurantGrid data={data?.data?.data} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
