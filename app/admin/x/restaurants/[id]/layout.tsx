"use client";

import type React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAtomRestaurantContext } from "@/app/admin/x/restaurants/[id]/resturant.atom";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RestaurantLayout({
											 children,
											 params,
										 }: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const { restaurant, loading, error, getRestaurant } = useAtomRestaurantContext();

	useEffect(() => {
		getRestaurant(params.id);
	}, [params.id, getRestaurant]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<header className="bg-white shadow-sm">
				<div className="py-2 mb-4 px-4">
					{/* Desktop Navigation */}
					<div className="hidden md:flex justify-between items-center">
						<div className="flex h-5 items-center space-x-2 text-sm">
							<Link href={`/admin/x/restaurants/${params.id}`} prefetch={true}>
								<Button className="text-xl" variant="ghost">
									{restaurant?.name}
								</Button>
							</Link>
							<Separator orientation="vertical" />
							<Link href={`/admin/x/restaurants/${params.id}/menu`} prefetch={true}>
								<Button variant="ghost">Menu</Button>
							</Link>
							<Separator orientation="vertical" />
							<Link href={`/admin/x/restaurants/${params.id}/menu/create`} prefetch={true}>
								<Button variant="ghost">Add Menu Item</Button>
							</Link>
						</div>
						<Link href="/admin/x/restaurants/" prefetch={true}>
							<Button variant="ghost">All Restaurants</Button>
						</Link>
					</div>

					{/* Mobile Navigation */}
					<div className="md:hidden flex justify-between items-center">
						<Link href={`/admin/x/restaurants/${params.id}`} prefetch={true}>
							<Button className="text-lg" variant="ghost">
								{restaurant?.name}
							</Button>
						</Link>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu className="h-5 w-5" />
									<span className="sr-only">Open menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuItem asChild>
									<Link href={`/admin/x/restaurants/${params.id}/menu`}>
										Menu
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href={`/admin/x/restaurants/${params.id}/menu/create`}>
										Add Menu Item
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/admin/x/restaurants/">
										All Restaurants
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>

			<main className="pb-10">
				{children}
			</main>
		</div>
	);
}