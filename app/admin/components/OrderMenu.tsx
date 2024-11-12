"use client"; // Ensures this component is rendered on the client side

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to determine the active route

// Tabs configuration with count values
const tabs = [
	{ name: "Restaurant Orders", href: "/admin/x/orders/restaurant-orders", count: 52 },
	{ name: "Package Delivery", href: "/admin/x/orders/package-deliveries", count: 6 },
];

// Utility function for conditional classes
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

function OrderMenu() {
	const pathname = usePathname();
	const isOrderRoute = pathname.startsWith("/admin/x/orders");

	// Only display the menu on specific routes
	if (!isOrderRoute) {
		return null;
	}

	return (
		<div className="container mx-auto">
			<div className="sm:hidden">
				{/* Dropdown for small screens */}
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				<select
					id="tabs"
					name="tabs"
					defaultValue={tabs.find((tab) => pathname.includes(tab.href))?.name}
					className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					onChange={(e) => {
						const selectedTab = tabs.find((tab) => tab.name === e.target.value);
						if (selectedTab) {
							window.location.href = selectedTab.href; // Redirect to selected tab's href
						}
					}}
				>
					{tabs.map((tab) => (
						<option key={tab.name} value={tab.name}>
							{tab.name} ({tab.count})
						</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				{/* Tab navigation for larger screens */}
				<div className="border-b border-gray-200">
					<nav aria-label="Tabs" className="-mb-px flex space-x-8">
						{tabs.map((tab) => (
							<Link key={tab.name} href={tab.href} passHref>
								<p
									aria-current={pathname.includes(tab.href) ? "page" : undefined}
									className={classNames(
										pathname.includes(tab.href)
											? "border-indigo-500 text-indigo-600"
											: "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
										"flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
									)}
								>
									{tab.name}
									{tab.count != null && (
										<span
											className={classNames(
												pathname.includes(tab.href) ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-900",
												"ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block"
											)}
										>
											{tab.count}
										</span>
									)}
								</p>
							</Link>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
}

export default OrderMenu;
