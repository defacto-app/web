import { useState, useEffect } from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const frameworks = [
	{ value: "next.js", label: "Next.js" },
	{ value: "sveltekit", label: "SvelteKit" },
	{ value: "nuxt.js", label: "Nuxt.js" },
	{ value: "remix", label: "Remix" },
	{ value: "astro", label: "Astro" },
	{ value: "sveltekit", label: "SvelteKit" },
	{ value: "nuxt.js", label: "Nuxt.js" },
	{ value: "remix", label: "Remix" },
	{ value: "astro", label: "Astro" },
];

export function SearchSelector() {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [highlightedIndex, setHighlightedIndex] = useState<number>(0); // For arrow key navigation

	const toggleDropdown = () => setIsOpen(!isOpen);

	const selectFramework = (selectedValue: string) => {
		setValue(selectedValue);
		setIsOpen(false);
		setSearchTerm("");
		setHighlightedIndex(0); // Reset highlighted index after selection
	};

	// Filter frameworks based on the search term
	const filteredFrameworks = frameworks.filter((framework) =>
		framework.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Handle arrow key navigation
	const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
		if (e.key === "ArrowDown") {
			setHighlightedIndex((prevIndex) =>
				prevIndex < filteredFrameworks.length - 1 ? prevIndex + 1 : prevIndex
			);
		} else if (e.key === "ArrowUp") {
			setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
		} else if (e.key === "Enter" || e.key === " ") {
			if (filteredFrameworks[highlightedIndex]) {
				selectFramework(filteredFrameworks[highlightedIndex].value);
			}
		}
	};

	useEffect(() => {
		// Reset highlighted index when search term changes
		setHighlightedIndex(0);
	}, [searchTerm]);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			{/* Trigger button */}
			<PopoverTrigger asChild>
				<Button
					onClick={toggleDropdown}
					variant="outline"
					className="w-48 justify-between text-left"
				>
					{value
						? frameworks.find((f) => f.value === value)?.label
						: "Select framework..."}
					<span>▼</span> {/* Dropdown icon */}
				</Button>
			</PopoverTrigger>

			{/* Popover content */}
			<PopoverContent sideOffset={4}>
				<div className="w-48">
					{/* Search input */}
					<Input
						type="text"
						placeholder="Search framework..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="mb-2"
					/>

					{/* Frameworks list */}
					<ul
						onKeyDown={handleKeyDown}
						tabIndex={0} // Make ul focusable
						className="outline-none"
					>
						<ScrollArea className="h-64">
							{filteredFrameworks.length > 0 ? (
								filteredFrameworks.map((framework, index) => (
									<li
										key={framework.value}
										onClick={() => selectFramework(framework.value)}
										className={`px-4 py-2 cursor-pointer ${
											index === highlightedIndex ? "bg-gray-200" : ""
										}`}
										tabIndex={-1} // Items are not focusable individually
									>
										{framework.label}
									</li>
								))
							) : (
								<li className="px-4 py-2 text-gray-500">No framework found</li>
							)}
						</ScrollArea>
					</ul>
				</div>
			</PopoverContent>
		</Popover>
	);
}
