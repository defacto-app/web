"use client";

import Link from "next/link";

export default function RestaurantLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto py-10 ">
			{/* Main Content Section */}

			<div className={`flex items-center gap-x-2`}>
				<Link href={`/admin/x/restaurants`}>All Restaurants</Link>{" "}
				<Link href={`/admin/x/restaurants/menu`}> | All Menu items</Link>|
				<Link href={`/admin/x/restaurants/categories`}>All Categories</Link>
			</div>
			<main className="pb-10">{children}</main>
		</div>
	);
}
//
//
//
//
//
//
//
