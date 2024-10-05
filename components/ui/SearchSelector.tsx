import { useEffect, useState } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useDebounce } from "react-haiku";

// Reusable SearchSelector component
export function SearchSelector({
								   data = [],
								   onSelect,
								   placeholder = "Search...",
								   debounceDelay = 300, // Default debounce delay
							   }: {
	data: { value: string; label: string }[];
	onSelect: (value: string) => void;
	placeholder?: string;
	debounceDelay?: number;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
	const [selectedValue, setSelectedValue] = useState<string>(""); // New state to hold selected value
	const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay); // Debounce the search term

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (selectedValue: string) => {
		setSelectedValue(selectedValue); // Set the selected value
		onSelect(selectedValue); // Pass the selected value to the parent component
		setIsOpen(false);
		setSearchTerm("");
		setHighlightedIndex(0);
	};

	// Filter data based on the debounced search term
	const filteredData = data.filter((item) =>
		item.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
	);

	// Handle arrow key navigation
	const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
		if (e.key === "ArrowDown") {
			setHighlightedIndex((prevIndex) =>
				prevIndex < filteredData.length - 1 ? prevIndex + 1 : prevIndex
			);
		} else if (e.key === "ArrowUp") {
			setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
		} else if (e.key === "Enter" || e.key === " ") {
			if (filteredData[highlightedIndex]) {
				handleSelect(filteredData[highlightedIndex].value);
			}
		}
	};

	useEffect(() => {
		setHighlightedIndex(0);
	}, [debouncedSearchTerm]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			{/* Trigger button */}
			<PopoverTrigger asChild>
				<Button
					onClick={toggleDropdown}
					variant="outline"
					className="w-64 justify-between text-left"
				>
					{/* Display selected value or placeholder */}
					{selectedValue
						? data.find((item) => item.value === selectedValue)?.label
						: placeholder}
					<span>▼</span> {/* Dropdown icon */}
				</Button>
			</PopoverTrigger>

			{/* Popover content */}
			<PopoverContent sideOffset={4}>
				<div className="w-64">
					{/* Search input */}
					<Input
						type="text"
						placeholder={placeholder}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="mb-2"
					/>

					{/* Filtered list */}
					<ul
						onKeyDown={handleKeyDown}
						className="outline-none"
					>
						<ScrollArea className="h-64">
							{filteredData.length > 0 ? (
								filteredData.map((item, index) => (
									<li
										key={item.value}
										onClick={() => handleSelect(item.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												handleSelect(item.value);
											}
										}}
										tabIndex={0} // Make items focusable
										className={`px-4 py-2 cursor-pointer ${
											index === highlightedIndex ? "bg-gray-100" : ""
										}`}
									>
										{item.label}
									</li>
								))
							) : (
								<li className="px-4 py-2 text-gray-500">No results found</li>
							)}
						</ScrollArea>
					</ul>
				</div>
			</PopoverContent>
		</Popover>
	);
}