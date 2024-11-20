"use client";

export default function RestaurantLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container mx-auto py-10 ">
			{/* Main Content Section */}

			<div>Restaurant | All Menu items | All Categories</div>

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
