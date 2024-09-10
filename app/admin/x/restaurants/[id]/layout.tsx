import type React from "react";
import Link from "next/link";

export default function RestaurantLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
		>
			{/* Header Section */}
			<header
				style={{
					padding: "20px",
					background: "#f5f5f5",
					borderBottom: "1px solid #ddd",
				}}
			>
				<h1>Restaurant Menu</h1>
				<nav>
				{/*	<Link href={`/restaurants`}>
						<a>Back to Restaurants</a>
					</Link>*/}
					{/* Add other navigation links if needed */}
				</nav>
			</header>

			{/* Main Content Section */}
			<main style={{ flex: 1, padding: "20px" }}>{children}</main>

			{/* Footer Section */}
			<footer
				style={{
					padding: "20px",
					background: "#f5f5f5",
					borderTop: "1px solid #ddd",
				}}
			>
				<p>&copy; 2024 Your Restaurant App</p>
			</footer>
		</div>
	);
}
