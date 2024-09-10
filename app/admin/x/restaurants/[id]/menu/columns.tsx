"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateFromNow } from "@/lib/utils";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
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
            const { name } = row.original;
            return (
                <Link
                    className={`font-medium underline`}
                    href={`/admin/x/restaurants/${row.original.publicId}`}
                >
                    {name}
                </Link>
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
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({ row }) => {
            const { updatedAt } = row.original;
            const formattedDate = formatDateFromNow(updatedAt);
            return <span>{formattedDate}</span>;
        },
    },
];
