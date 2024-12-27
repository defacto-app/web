import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBar from "@/components/SearchBar";

interface SingleCategorySelectProps {
	selectedCategory: string;
	onSelect: (value: string) => void;
	categories: Array<{ id: string; name: string }>;
}

function SingleCategorySelect({
	selectedCategory,
	onSelect,
	categories,
}: SingleCategorySelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredCategories = categories.filter((category) =>
		category.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const selectedCategoryName =
		categories.find((cat) => cat.name === selectedCategory)?.name ||
		"Categories";

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="rounded-full flex-shrink-0">
					{selectedCategoryName}
					<ChevronDown className="ml-2 h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="p-4">
					<h4 className="font-semibold mb-4">Categories</h4>
					<SearchBar
						placeholder="Search categories..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					{/* Update this ScrollArea section */}
					<ScrollArea className="h-[300px] overflow-y-auto">
						<div className="pr-4">
							{" "}
							{/* Add padding for scroll */}
							<RadioGroup
								value={selectedCategory}
								onValueChange={(value) => {
									onSelect(value);
									setIsOpen(false);
								}}
							>
								{filteredCategories.map((category) => (
									<div
										key={category.id}
										className="flex items-center space-x-2 py-2"
									>
										<RadioGroupItem value={category.name} id={category.id} />
										<Label htmlFor={category.id}>{category.name}</Label>
									</div>
								))}
							</RadioGroup>
							{filteredCategories.length === 0 && (
								<div className="text-center text-gray-500 py-4">
									No categories found
								</div>
							)}
						</div>
					</ScrollArea>
					{selectedCategory && (
						<div className="flex justify-end mt-4 border-t pt-4">
							<Button
								variant="outline"
								onClick={() => {
									onSelect("");
									setIsOpen(false);
								}}
							>
								Clear
							</Button>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}

export default SingleCategorySelect;
