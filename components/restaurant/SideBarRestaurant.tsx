import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

const SideBarRestaurant = () => {
	// Array to store the filter items for different sections
	const sortByOptions = [
		{ id: "near_me", name: "Near me", isActive: true },
		{ id: "ratings", name: "Ratings", isActive: false },
		{ id: "delivery_fee", name: "Delivery Fee", isActive: false },
	];

	const popularFilters = [
		{ id: "chicken", name: "Chicken" },
		{ id: "traditional", name: "Traditional" },
		{ id: "chinese_food", name: "Chinese Food" },
	];

	const moreFilters = [
		{ id: "breakfasts", name: "Breakfasts" },
		{ id: "lunch", name: "Lunch" },
		{ id: "bakery_pastry", name: "Bakery & Pastry" },
		{ id: "alcohol_beer", name: "Alcohol/Beer" },
		{ id: "ice_cream", name: "Ice Cream" },
	];

	function getDta() {}

	useEffect(() => {
		getDta();
	}, []);

	return (
		<div className=" p-6  rounded-xl max-w-xs overflow-y-scroll h-[700px]">
			{/* Sort by Section */}
			<div className="mb-8">
				<h4 className="text-lg font-bold mb-4">Sort by</h4>
				{sortByOptions.map((option) => (
					<div key={option.id} className="mb-2">
						<span
							className={`block py-1 px-4 rounded-lg cursor-pointer ${
								option.isActive
									? "text-blue-500  font-semibold"
									: " text-gray-500 font-medium"
							}`}
						>
							{option.name}
						</span>
					</div>
				))}
			</div>

			{/* Popular Filters Section */}
			<div className="mb-8">
				<h4 className="text-lg font-bold mb-4">Popular Filters</h4>
				{popularFilters.map((filter) => (
					<div key={filter.id} className="mb-2">
						<span className="block py-2 px-4 rounded-lg  text-gray-700 font-medium cursor-pointer">
							{filter.name}
						</span>
					</div>
				))}
			</div>

			{/* More Filters Section */}
			<div className="mb-8">
				<h4 className="text-lg font-bold mb-4">More Filters</h4>
				{moreFilters.map((filter) => (
					<div key={filter.id} className="mb-2">
						<span className="block py-2 px-4 rounded-lg  text-gray-700 font-medium cursor-pointer">
							{filter.name}
						</span>
					</div>
				))}
			</div>

			{/* View More Button */}
			<Button className="w-full py-2 px-4 text-white bg-blue-500 rounded-full font-medium hover:bg-blue-600 transition duration-200">
				View more
			</Button>
		</div>
	);
};

export default SideBarRestaurant;
