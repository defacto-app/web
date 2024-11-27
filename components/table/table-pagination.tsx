import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

interface TablePaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	perPage?: number;
}

export function TablePagination({
	page,
	totalPages,
	perPage = 10,
	onPageChange,
}: TablePaginationProps) {
	const handlePrevious = () => {
		if (page > 1) onPageChange(page - 1);
	};

	const handleNext = () => {
		if (page < totalPages) onPageChange(page + 1);
	};

	const handlePageClick = (newPage: number) => {
		onPageChange(newPage);
	};

	// Generate pages with ellipsis logic
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxPagesToShow = 5;

		if (totalPages <= maxPagesToShow) {
			// If total pages are less than or equal to max, show all
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			// Always show the first and last pages
			pages.push(1);
			if (page > 3) pages.push("...");

			// Add range around the current page
			const startPage = Math.max(2, page - 1);
			const endPage = Math.min(totalPages - 1, page + 1);
			for (let i = startPage; i <= endPage; i++) pages.push(i);

			if (page < totalPages - 2) pages.push("...");
			pages.push(totalPages);
		}
		return pages;
	};

	const pages = getPageNumbers();

	return (
		<Pagination className={`py-2`}>
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem className={`flex items-center`}>
					<Button
						variant="ghost"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => onPageChange(1)}
						disabled={page === 1}
					>
						<span className="sr-only">Go to first page</span>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<PaginationPrevious onClick={handlePrevious} />
				</PaginationItem>

				{/* Page Numbers */}
				{pages.map((p, index) =>
					p === "..." ? (
						<PaginationItem
							key={`ellipsis-${
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								index
							}`}
						>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={`page-${p}`}>
							<PaginationLink
								isActive={page === p}
								onClick={() => handlePageClick(p as number)}
							>
								{p}
							</PaginationLink>
						</PaginationItem>
					),
				)}

				{/* Next Button */}
				<PaginationItem className={`flex items-center`}>
					<PaginationNext onClick={handleNext} />

					<Button
						variant="ghost"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => onPageChange(totalPages)}
						disabled={page === totalPages}
					>
						<span className="sr-only">Go to last page</span>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
