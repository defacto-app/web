"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { $admin_api } from "@/http/admin-endpoint";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useAtomRestaurantContext } from "@/app/admin/x/restaurants/[id]/resturant.atom";

export default function RestaurantLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const { restaurant, loading, error, getRestaurant } =
		useAtomRestaurantContext();

	useEffect(() => {
		getRestaurant(params.id); // Fetch restaurant data on component mount
	}, [params.id, getRestaurant]); // Now safe to include getRestaurant

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			{/* Header Section */}
			<header className={`bg-white shadow-sm`}>
				<div className="container flex items-center justify-between p-4">
					<div className={`flex items-center gap-x-2`}>
						<Link href={`/admin/x/restaurants/${params.id}`} prefetch={true}>
							<Button variant={`link`}> {restaurant?.name}</Button>
						</Link>
						|
						<Link
							href={`/admin/x/restaurants/${params.id}/menu`}
							prefetch={true}
						>
							<Button variant={`link`}> Menu</Button>
						</Link>
						|
						<Link
							href={`/admin/x/restaurants/${params.id}/menu/create`}
							prefetch={true}
						>
							<Button variant={`link`}>Add Menu</Button>
						</Link>
					</div>
					<nav>
						<Link className={`flex items-center`} href={`/admin/x/restaurants`}>
							<ChevronLeft />
							<Button variant={`ghost`}>All Restaurants</Button>
						</Link>
					</nav>
				</div>
			</header>

			{/* Main Content Section */}
			<main className="pb-10">
				{/* Pass restaurant data to children components */}
				{children}
			</main>
		</div>
	);
}
