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
import {toast} from "react-toastify";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



const deleteUser = async (id: string) => {

	try {
		await $admin_api.users.delete(id);
		toast.success("User deleted successfully");
	} catch (error) {
		console.error(error);
		toast.error("Error deleting user");
	}
};
export const userColumns: ColumnDef<any>[] = [
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
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "firstName",
		header: "first Name",
	},

	{
		accessorKey: "phoneNumber",
		header: "Phone Number",
	},

	{
		accessorKey: "lastSeenAt",
		header: "Last Seen",
		cell: ({ row }) => {
			const { lastSeenAt } = row.original;
			const formattedDate = formatDateFromNow(lastSeenAt || "");
			return <span>{formattedDate}</span>;
		},
	},

	{
		id: "actions",
		cell: ({ row }) => {
			const { userId } = row.original;
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
						<DropdownMenuItem onClick={() => deleteUser(userId)}>
							Delete User
						</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

/*	{
		id: "actions",
		cell: ({ row }) => {
			const payment = row.original;

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
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},*/
