"use client";

import Link from "next/link";

export default function RestaurantLayout({
											 children,
										 }: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto py-10 px-4 sm:px-6">
			{/* Navigation that stacks on mobile, horizontal on desktop */}
			<nav className="mb-6">
				<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-4">
					<Link
						href="/admin/x/restaurants"
						className="text-gray-700 hover:text-gray-900 hover:underline"
					>
						All Restaurants
					</Link>
					<div className="hidden sm:block text-gray-400">|</div>
					<Link
						href="/admin/x/restaurants/menu"
						className="text-gray-700 hover:text-gray-900 hover:underline"
					>
						All Menu Items
					</Link>
					<div className="hidden sm:block text-gray-400">|</div>
					<Link
						href="/admin/x/restaurants/categories"
						className="text-gray-700 hover:text-gray-900 hover:underline"
					>
						All Categories
					</Link>
				</div>
			</nav>

			<main className="pb-10">
				{children}
			</main>
		</div>
	);
}