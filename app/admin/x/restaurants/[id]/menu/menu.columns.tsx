"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateFromNow } from "@/lib/utils";
import Link from "next/link";
import {formatPrice} from "@/utils";
import Image from "next/image";

export const menuColumns: ColumnDef<any>[] = [
	{
		accessorKey: "S/N",
		header: ({ column }) => <div>S/N</div>,
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[50px] truncate font-medium">
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
			const { name, image } = row.original;
			return (
                <Link
                    className={`font-medium underline flex items-center gap-x-2`}
                    href={`/admin/x/restaurants/${row.original.parent}/menu/${row.original.publicId}`}
                >
                    <Image

						width={56}
						height={56}
						src={image} alt="restaurant" className="max-w-md object-cover h-14 rounded-sm"/>

                    {name}
                </Link>
            );
        },
    },

	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			const { price } = row.original;
			const formattedPrice = formatPrice(price); // Use the reusable function

			return <span>{formattedPrice}</span>;
		},
	},	{
		accessorKey: "menuType",
		header: "menu Type",
		cell: ({ row }) => {
			const { menuType } = row.original;

			return <span>{menuType}</span>;
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
		accessorKey: "updatedAt",
		header: "Updated At",
		cell: ({ row }) => {
			const { updatedAt } = row.original;
			const formattedDate = formatDateFromNow(updatedAt);
			return <span>{formattedDate}</span>;
		},
	},
];
