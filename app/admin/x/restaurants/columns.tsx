"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {formatDateFromNow} from "@/lib/utils";

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "address",
		header: "Address",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},


	{
		accessorKey: 'createdAt',
		header: 'Created At',
		cell: ({ row }) => {
			const { createdAt } = row.original;
			const formattedDate = formatDateFromNow(createdAt);
			return <span>{formattedDate}</span>;
		},
	},
	{
		accessorKey:"updatedAt",
		header: "Updated At",
		cell: ({ row }) => {
			const { updatedAt } = row.original;
			const formattedDate = formatDateFromNow(updatedAt);
			return <span>{formattedDate}</span>;
		},
	},

];
