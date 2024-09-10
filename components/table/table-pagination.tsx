import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface TablePaginationProps {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function TablePagination({
	page,
	totalPages,
	onPageChange,
}: TablePaginationProps) {
	const handlePrevious = () => {
		if (page > 1) onPageChange(page - 1);
		console.log("handlePrevious", page - 1);
	};

	const handleNext = () => {
		if (page < totalPages) {
			onPageChange(page + 1);
			console.log("handleNext", page + 1, totalPages);
		}
	};

	const handlePageClick = (newPage: number) => {
		onPageChange(newPage);
		console.log("handlePageClick", newPage);
	};

	return (
		<Pagination className={`py-2`}>
			<PaginationContent>
				{/* Previous Button */}
				<PaginationItem>
					<PaginationPrevious onClick={handlePrevious} />
				</PaginationItem>

				{/* Page Numbers */}
				{Array.from({ length: totalPages }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<PaginationItem key={index}>
						<PaginationLink
							isActive={page === index + 1}
							onClick={() => handlePageClick(index + 1)}
						>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}

				{/* Ellipsis for large page ranges (optional) */}
				{totalPages > 5 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{/* Next Button */}
				<PaginationItem>
					<PaginationNext onClick={handleNext} />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
