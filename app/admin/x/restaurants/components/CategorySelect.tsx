import type React from "react";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useQuery } from "react-query";
import { useDebounce } from "react-haiku";
import { $admin_api } from "@/http/admin-endpoint";

// Fetch data from the API
const getData = async (page: number, perPage: number, searchTerm: string) => {
	const response = await $admin_api.restaurants.categories({
		page,
		perPage,
		searchTerm,
	});
	return response; // Assuming response contains the list of categories
};

function CategorySelect() {
	const [searchTerm, setSearchTerm] = useState(""); // Track the search term
	const [page] = useState(1); // Track current page (fixed for now)
	const [perPage] = useState(30); // Track items per page
	const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term by 500ms

	// Use React Query's useQuery hook to fetch data, and pass debouncedSearchTerm as part of the key
	const { data, error, isLoading } = useQuery(
		["categories", page, perPage, debouncedSearchTerm],
		() => getData(page, perPage, debouncedSearchTerm),
		{
			keepPreviousData: true, // Keep the previous data while fetching new data
			staleTime: 5000, // Data remains fresh for 5 seconds
		}
	);

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value); // Update search term
	};

	// Get the categories from the API response
	const categories = data?.data?.data || [];

	return (
		<div>
			{/* Search input stays outside the dropdown to prevent re-renders */}
			<Input
				type="search"
				value={searchTerm} // Bind input value to state
				onChange={handleSearchChange} // Update state on input change
				placeholder="Search Category..."
				className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
			/>

			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a category" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Categories</SelectLabel>
						{/* Dynamically display the categories */}
						{isLoading ? (
							<SelectItem disabled>Loading...</SelectItem>
						) : categories.length > 0 ? (
							categories.map((category: any) => (
								<SelectItem
									key={category._id}
									value={category.publicId}
								>
									{category.name}
								</SelectItem>
							))
						) : (
							<SelectItem disabled>No categories found</SelectItem>
						)}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}

export default CategorySelect;
