"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { formatDateFromNow } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {Trash} from "lucide-react";
import {toast} from "react-toastify";
import {$admin_api} from "@/http/admin-endpoint";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {DataTableColumnHeader} from "@/app/admin/x/demo/components/data-table-column-header";

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
			const { name, image, publicId } = row.original;
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
		cell: ({ row }) => {
			const { menuCount } = row.original;
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

export const categoryColumns: ColumnDef<any>[] = [
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
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => {
			const { name, publicId } = row.original;
			return (
			<p>
				{name}
			</p>
			);
		},
		enableSorting: true,
	},
	{
		accessorKey: "menuCount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Menu Count" />
		),
		enableSorting: true,
	},
	{
		accessorKey: "restaurantCount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Restaurant Count" />
		),
		enableSorting: true,
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Created At" />
		),
		cell: ({ row }) => {
			const { updatedAt } = row.original;
			const formattedDate = formatDateFromNow(updatedAt);
			return <span>{formattedDate}</span>;
		},
		enableSorting: true,
	},
	{
		accessorKey: "updatedAt",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Updated At" />
		),
		cell: ({ row }) => {
			const { updatedAt } = row.original;
			const formattedDate = formatDateFromNow(updatedAt);
			return <span>{formattedDate}</span>;
		},
		enableSorting: true,
	},
	{
		accessorKey: "actions",
		header: "",
		cell: ({ row }) => {
			const handleDelete = async (id: string) => {
				if (confirm("Are you sure you want to delete this category?")) {
					try {
						await $admin_api.restaurants.deleteCategory(id); // Adjust endpoint as needed
						toast.success("Category deleted successfully.");
						// Optionally, refresh the table or refetch data
					} catch (error:any) {
						console.log(error.message);
					toast.error(error.message);
					}
				}
			};

			return (
				<div>
					<Trash
						className="cursor-pointer text-red-500"
						onClick={() => handleDelete(row.original.publicId)} // Pass the category ID
					/>
				</div>
			);
		}
	}

];
