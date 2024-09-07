"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";

function TableSkeleton({ table }: any) {
	return (
		<TableBody>
			{table.getRowModel().rows?.length &&
				table.getRowModel().rows.map((row) => (
					<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
								<Skeleton className="h-3 w-1/2" />
							</TableCell>
						))}
					</TableRow>
				))}
		</TableBody>
	);
}

export default TableSkeleton;
