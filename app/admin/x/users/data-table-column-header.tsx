import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";

interface DataTableColumnHeaderProps {
	column: {
		id: string;
	};
	title: string;
	className?: string;
}

interface DataTableColumnHeaderProps {
	column: {
		id: string;
	};
	title: string;
	className?: string;
	onSort: (field: string, direction: "asc" | "desc") => void;
	currentSort?: { field: string; direction: "asc" | "desc" };
}

export function DataTableColumnHeader({
	column,
	title,
	className,
	onSort,
	currentSort,
}: DataTableColumnHeaderProps) {
	const handleSort = () => {
		const isCurrentColumn = currentSort?.field === column.id;
		const newDirection =
			isCurrentColumn && currentSort.direction === "asc" ? "desc" : "asc";
		onSort(column.id, newDirection);
	};

	const renderSortIcon = () => {
		if (currentSort?.field === column.id) {
			return currentSort.direction === "asc" ? (
				<ArrowDown className="ml-2 h-4 w-4" />
			) : (
				<ArrowUp className="ml-2 h-4 w-4" />
			);
		}
		return <CaretSortIcon className="ml-2 h-4 w-4" />;
	};

	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<Button
				onClick={handleSort}
				variant="ghost"
				size="sm"
				className="-ml-3 h-8 data-[state=open]:bg-accent"
			>
				<div className="flex items-center">
					<span>{title}</span>
					<span>{renderSortIcon()}</span>
				</div>
			</Button>
		</div>
	);
}
