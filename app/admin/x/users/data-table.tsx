"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import React, {useCallback} from "react";

interface TableSorting {
	field: string;
	direction: "asc" | "desc";
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pageCount: number;
	pageIndex: number;
	perPage: number;
	onSortingChange?: (sorting: TableSorting) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageCount,
	pageIndex,
	perPage,
	onSortingChange,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState({});
	const [columnFilters, setColumnFilters] = React.useState([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState({
		pageIndex: pageIndex - 1,
		pageSize: perPage,
	});

	React.useEffect(() => {
		setPagination({
			pageIndex: pageIndex - 1,
			pageSize: perPage,
		});
	}, [pageIndex, perPage]);

	const handleSortingChange = useCallback((newSorting: SortingState) => {
		setSorting(newSorting);
		if (newSorting.length > 0) {
			onSortingChange?.({
				field: newSorting[0].id,
				direction: newSorting[0].desc ? "desc" : "asc",
			});
		} else {
			onSortingChange?.({ field: "", direction: "asc" });
		}
	}, [onSortingChange]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		pageCount: pageCount,
		manualSorting: true, // Enable manual sorting

		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination,
		},
	});
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>

				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
