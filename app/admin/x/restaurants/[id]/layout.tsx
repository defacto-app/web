"use client";

import React, { useEffect, useState } from "react";
import { $admin_api } from "@/http/admin-endpoint";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ChevronLeft} from "lucide-react";

export default function RestaurantLayout({
											 children,
											 params,
										 }: {
	children: React.ReactNode;
	params: { id: string };
}) {
	const [restaurant, setRestaurant] = useState<any>(null); // You can adjust this type according to your data structure
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch restaurant data
	const fetchRestaurantData = async () => {
		try {
			const response = await $admin_api.restaurants.one(params.id);
			setRestaurant(response); // Set the restaurant data
			setLoading(false); // Turn off loading
		} catch (error: any) {
			setError(error.message || "An error occurred while fetching the data");
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRestaurantData();
	}, [params.id]);

	// Loading and Error states
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
							<ChevronLeft/>
							<Button variant={`ghost`}>Back to Restaurants</Button>
						</Link>
					</nav>
				</div>
			</header>

			{/* Main Content Section */}
			<main className="py-10">
				{/* Pass restaurant data to children components */}
				{React.cloneElement(children as React.ReactElement, {restaurant})}
			</main>
		</div>
	);
}
