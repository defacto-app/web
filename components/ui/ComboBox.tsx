import React, { useState } from "react";
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
	{ value: "sveltekit", label: "SvelteKit" },
	{ value: "nuxt.js", label: "Nuxt.js" },
	{ value: "remix", label: "Remix" },
	{ value: "astro", label: "Astro" },
	{ value: "sveltekit", label: "SvelteKit" },
	{ value: "nuxt.js", label: "Nuxt.js" },
	{ value: "remix", label: "Remix" },
	{ value: "astro", label: "Astro" },
];

export function ComboboxDemo() {
	const [isOpen, setIsOpen] = useState(false);
	const [value, setValue] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const toggleDropdown = () => setIsOpen(!isOpen);

	const selectFramework = (selectedValue: React.SetStateAction<string>) => {
		setValue(selectedValue);
		setIsOpen(false);
		setSearchTerm("");
	};

	// Filter frameworks based on the search term
	const filteredFrameworks = frameworks.filter((framework) =>
		framework.label.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			{/* Trigger button */}
			<PopoverTrigger asChild>
				<Button
					onClick={toggleDropdown}
					variant="outline"
					className={`w-48 text-left`}
				>
					{value
						? frameworks.find((f) => f.value === value)?.label
						: "Select framework..."}
					<span>▼</span> {/* Dropdown icon */}
				</Button>
			</PopoverTrigger>

			{/* Popover content */}
			<PopoverContent sideOffset={4}>
				<div>
					{/* Search input */}
					<Input
						type="text"
						placeholder="Search framework..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					{/* Frameworks list */}
					<ul>
						<ScrollArea className={`h-64 mt-2`}>
							{filteredFrameworks.length > 0 ? (
								filteredFrameworks.map((framework) => (
									<li
										key={framework.value}
										onClick={() => selectFramework(framework.value)}
										style={{
											padding: "8px",
											cursor: "pointer",
											backgroundColor:
												value === framework.value ? "#e5e5e5" : "#fff",
										}}
									>
										{framework.label}
									</li>
								))
							) : (
								<li>No framework found</li>
							)}
						</ScrollArea>
					</ul>
				</div>
			</PopoverContent>
		</Popover>
	);
}
