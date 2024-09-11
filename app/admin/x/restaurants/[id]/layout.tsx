"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { $admin_api } from "@/http/admin-endpoint";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useAtomRestaurantContext } from "@/app/admin/x/restaurants/[id]/resturant.atom";
import {Separator} from "@/components/ui/separator";

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
				<div className={` py-4 mb-4`}>

					<div className="flex h-5 items-center space-x-4 text-sm">
						<div>
							<Link href={`/admin/x/restaurants/${params.id}`} prefetch={true}>
								<Button className={`text-xl`} variant={`ghost`}> {restaurant?.name}</Button>
							</Link>
						</div>
						<Separator orientation="vertical"/>
						<div>
							<Link
								href={`/admin/x/restaurants/${params.id}/menu`}
								prefetch={true}
							>
								<Button variant={`ghost`}> Menu</Button>
							</Link>
						</div>
						<Separator orientation="vertical"/>
						<div>
							<Link
								href={`/admin/x/restaurants/${params.id}/menu/create`}
								prefetch={true}
							>
								<Button variant={`ghost`}>Add Menu</Button>
							</Link>
						</div>
					</div>
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
