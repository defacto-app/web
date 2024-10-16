"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateFromNow } from "@/lib/utils";
import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify";

const deleteOrder = async (id: string) => {
	try {
		await $admin_api.orders.delete(id);
		toast.success("User deleted successfully");
	} catch (error) {
		console.error(error);
		toast.error("Error deleting user");
	}
};
export const orderColumns: ColumnDef<any>[] = [
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
		accessorKey: "createdAt",
		header: "Created At",
		cell: ({ row }) => {
			const { createdAt } = row.original;
			const formattedDate = formatDateFromNow(createdAt);
			return <span>{formattedDate}</span>;
		},
	},

	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "charge",
		header: "Charge",
	},
	{
		accessorKey: "status",
		header: "Status",
	},

	{
		accessorKey: "pickupTime",
		header: "Pickup Time",
		cell: ({ row }) => {
			const { pickupTime } = row.original;
			const formattedDate = formatDateFromNow(pickupTime);
			return <span>{formattedDate}</span>;
		},
	},

	{
		accessorKey: "assignedTo",
		header: "Assigned To",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		accessorKey: "cashPaymentLocation",
		header: "Cash Payment Location",
	},

	{
		id: "actions",
		cell: ({ row }) => {
			const { userId } = row.original;
			console.log(userId);
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(userId)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => deleteOrder(userId)}>
							Delete User
						</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
