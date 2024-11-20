import {useEffect, useState} from "react";
import { useQuery } from "react-query";
import { useDebounce } from "react-haiku";
import { $admin_api } from "@/http/admin-endpoint";
import { SearchSelector } from "@/components/ui/SearchSelector";
import type {RestaurantFormType} from "@/lib/types";

// Fetch data from the API
const getData = async (page: number, perPage: number, searchTerm: string) => {
	return await $admin_api.restaurants.categories({
		page,
		perPage,
		searchTerm,
	}); // Assuming response contains the list of categories
};

function CategorySelect({
							setRestaurantData,
							selectedCategory,
						}: {
	selectedCategory?: string; // Optional preselected category slug
	setRestaurantData: React.Dispatch<React.SetStateAction<RestaurantFormType>>;
}) {
	const [searchTerm, setSearchTerm] = useState(""); // Track the search term
	const [page] = useState(1); // Track current page (fixed for now)
	const [perPage] = useState(30); // Track items per page
	const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce search term by 500ms
	const [selected, setSelected] = useState<string | undefined>(selectedCategory);

	// Use React Query's useQuery hook to fetch data, and pass debouncedSearchTerm as part of the key
	const { data, error, isLoading } = useQuery(
		["categories", page, perPage, debouncedSearchTerm],
		() => getData(page, perPage, debouncedSearchTerm),
		{
			keepPreviousData: true, // Keep the previous data while fetching new data
			staleTime: 5000, // Data remains fresh for 5 seconds
		},
	);

	// Update selected category
	useEffect(() => {
		if (selectedCategory) {
			setSelected(selectedCategory); // Set initial value
		}
	}, [selectedCategory]);

	// Get the categories from the API response and map to desired format
	const categories =
		data?.data?.data?.data.map((category: any) => ({
			value: category.slug, // Using slug as the value
			label: category.name, // Using name as the label
		})) || [];

	// Handle selection of a category
	// Handle selection of a category
	const handleCategorySelect = (selectedValue: string) => {
		setSelected(selectedValue); // Update local state
		setRestaurantData((prev) => ({
			...prev,
			category: selectedValue, // Update category in restaurant data
		}));
	};
	return (
		<div>
			{/* Reusable SearchSelector with debounced input */}
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div>
					<SearchSelector
						data={categories}
						onSelect={handleCategorySelect}
						value={selected} // Set the preselected value
						placeholder="Search categories..."
						debounceDelay={500} // Debounce search input by 500ms
					/>
				</div>
			)}
		</div>
	);
}

export default CategorySelect;
