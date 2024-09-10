"use client";

import {
	Table, TableBody, TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Key } from "react";

interface DataTableSkeletonProps {
	columns: any[];
}

export function DataTableSkeleton({ columns }: DataTableSkeletonProps) {
	// Render 10 skeleton rows
	const skeletonRows = Array.from({ length: 10 });

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((column, index) => (
							<TableHead key={index}>{column.header}</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>
					{skeletonRows.map((_, index) => (
						<TableRow key={index}>
							{columns.map((column, index) => (
								<TableCell key={index}>
									<Skeleton className="h-3 w-1/2" />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
