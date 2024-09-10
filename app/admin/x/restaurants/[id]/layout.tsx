"use client";

import React, { useEffect, useState } from "react";
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
		<div className="min-h-screen">
			{/* Header Section */}
			<header className={` bg-white shadow-sm`}>
				<div className="container flex items-center justify-between p-4">
					<h1> {restaurant?.name}</h1>
					<nav>
						<Link className={`flex items-center`} href={`/admin/x/restaurants`}>
							<ChevronLeft />
							<Button variant={`ghost`}>Back to Restaurants</Button>
						</Link>
					</nav>
				</div>
			</header>

			{/* Main Content Section */}
			<main className="py-10">
				{/* Pass restaurant data to children components */}
				{React.cloneElement(children as React.ReactElement, { restaurant })}
			</main>
		</div>
	);
}
