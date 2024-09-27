import type React from "react";
import {useEffect, useState} from "react";
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
import { QueryClient, useQuery } from "react-query";
import { useDebounce } from "react-haiku";
import {$admin_api} from "@/http/admin-endpoint";
const getData = async (
	page: number,
	perPage: number,
	searchTerm: string,
) => {

	const response = await $admin_api.restaurants.categories({
		page,
		perPage,
		searchTerm,
	});
	return response; // Assuming response.data contains the restaurant list
};
function CategorySelect() {
	const [searchTerm, setSearchTerm] = useState(""); // Track the search term
	const [page, setPage] = useState(1); // Track current page
	const [perPage, setPerPage] = useState(30); // Track items per page
	const [isMounted, setIsMounted] = useState(false); // Ensure the component is mounted
	const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term by 500ms
	// Ensure this only runs on the client side to avoid SSR mismatches
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Use React Query's useQuery hook to fetch data, and pass debouncedSearchTerm as part of the key
	const { data, error, isLoading, refetch } = useQuery(
		["restaurant", page, perPage, debouncedSearchTerm], // The query key includes page, perPage, and debounced search term
		() => getData(page, perPage, debouncedSearchTerm),
		{
			// keepPreviousData: true, // Keep the previous data while fetching new data
		},
	);

	// Handle search input change

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	// Trigger refetch when the debounced search term changes
	useEffect(() => {
		refetch(); // Fetch new data when debouncedSearchTerm changes
	}, [debouncedSearchTerm, refetch]);

	// Prevent rendering during SSR to avoid mismatch
	if (!isMounted) return null;

	if (error) return <div>Error loading data...</div>;

	return (
		<div>
			{JSON.stringify(data.data.data)}
			<Select>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<Input
							type="search"
							value={searchTerm} // Bind input value to state
							onChange={handleSearchChange} // Update state on input change
							placeholder="Search Restaurant..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
						<SelectLabel>Fruits</SelectLabel>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
export default CategorySelect;
