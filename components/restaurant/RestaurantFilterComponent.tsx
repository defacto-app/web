import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { $api } from "@/http/endpoints";
import SingleCategorySelect from "./SingleCategorySelect";

interface FilterOption {
	id: string;
	name: string;
}

interface PriceRange extends FilterOption {
	min: number;
	max: number;
}

interface SideBarProps {
	selectedFilters: {
		category: string;
		menuCategory: string;
		dietary: string[];
		priceRange: string;
		quickFilter: string;
		sort: string;
	};
	onFilterChange: (filters: any) => void;
}

const RestaurantFilterComponent = ({
	selectedFilters,
	onFilterChange,
}: SideBarProps) => {
	const [filters, setFilters] = useState<{
		menuCategories: FilterOption[];
		dietary: FilterOption[];
		priceRanges: PriceRange[];
		quickFilters: FilterOption[];
		sort: FilterOption[];
	}>({
		menuCategories: [],
		dietary: [],
		priceRanges: [],
		quickFilters: [],
		sort: [],
	});

	useEffect(() => {
		const fetchFilters = async () => {
			try {
				const response = await $api.guest.restaurant.filtersData();

				console.log("response:", response);
				if (response.success) {
					setFilters(response.data);
				}
			} catch (error) {
				console.error("Error fetching filters:", error);
			}
		};

		fetchFilters();
	}, []);
	// Update these handlers in SideBarRestaurant

	const handleQuickFilterClick = (filterId: string) => {
		console.log("Quick filter clicked:", filterId);
		onFilterChange({
			...selectedFilters,
			quickFilter: selectedFilters.quickFilter === filterId ? "" : filterId,
		});
	};

	return (
		<div className="mt-4 space-x-4 overflow-x-auto flex px-4 ">
			{/* Quick Filters */}
			{filters.quickFilters.map((filter) => (
				<Button
					key={filter.id}
					variant={
						selectedFilters.quickFilter === filter.id ? "default" : "outline"
					}
					className="rounded-full flex-shrink-0"
					onClick={() => handleQuickFilterClick(filter.id)}
				>
					{filter.name}
				</Button>
			))}

			{/* Category Filter */}
			<SingleCategorySelect
				selectedCategory={selectedFilters.category}
				onSelect={(value) =>
					onFilterChange({
						...selectedFilters,
						category: value,
					})
				}
				categories={filters.menuCategories}
			/>

			{/* Sort Options */}


		</div>
	);
};

export default RestaurantFilterComponent;
