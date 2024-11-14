"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateFromNow } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export const restaurantColumns: ColumnDef<any>[] = [
	{
		accessorKey: "S/N",
		header: ({ column }) => <div>S/N</div>,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.index + 1}.
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			const { name,image,publicId } = row.original;
			return (
				<Link
					prefetch={true}
					className={`font-medium underline flex items-center gap-x-2`}
					href={`/admin/x/restaurants/${publicId}`}
				>
					<Image
						priority={true}
						width={100}
						height={100}
						src={image}
						alt="restaurant"
						className="max-w-md object-cover h-14 rounded-sm"
						placeholder="blur" // Blurred loading effect
						blurDataURL="data:image/png;base64,..." // Placeholder image in base64 format

					/>

					{name}
				</Link>
			);
		},
	},
	{
		accessorKey: "menuCount",
		header: "Menu Count",
		cell: ({row}) => {
			const {menuCount } = row.original;
			return (
				<Link
					prefetch={true}
					className={`font-medium underline`}
					href={`/admin/x/restaurants/${row.original.publicId}/menu`}
				>
					{menuCount}
				</Link>
			);
		},
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
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => {
			const { createdAt } = row.original;
			const formattedDate = formatDateFromNow(createdAt);
			return <span>{formattedDate}</span>;
		},
	},
	{
		accessorKey: "updatedAt",
		header: "Updated At",
		cell: ({ row }) => {
			const { updatedAt } = row.original;
			const formattedDate = formatDateFromNow(updatedAt);
			return <span>{formattedDate}</span>;
		},
	},
];
