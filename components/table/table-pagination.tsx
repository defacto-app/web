
import { Button } from "@/components/ui/button";

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
		console.log('handlePrevious', page);

	};

	const handleNext = () => {
		if (page < totalPages) {
			onPageChange(page + 1);
			console.log('handleNext', page, totalPages);

		}

	};

	return (
		<div>
			{JSON.stringify({ page, totalPages })}
			<Button onClick={handlePrevious}>Previous</Button>

			<Button onClick={handleNext}>Next</Button>
		</div>
	);
}
