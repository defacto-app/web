"use client";
import React, { useEffect, useState } from "react";
import { $api } from "@/http/endpoints";
import Image from "next/image";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function OrderHistoryPage() {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [orders, setOrders] = useState<any[]>([]);

	// Function to fetch order history data
	const getData = async () => {
		try {
			const res = await $api.auth.user.order.history();
			setOrders(res.data); // Assuming res.data contains the orders array
		} catch (e) {
			setError("Failed to fetch data");
			console.log("error", e);
		} finally {
			setLoading(false); // Stop the loading spinner after request
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="max-w-5xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Orders</h1>

			{loading && <div className="text-center">Loading...</div>}
			{error && <div className="text-center text-red-500">{error}</div>}

			{orders.length === 0 && !loading && <div>No orders found.</div>}

			<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 ">
				{orders.map((order) => (
					<div
						key={order.orderId}
						className="flex items-center p-4 bg-white shadow-sm rounded-lg border"
					>
						<div className="w-20 h-20 overflow-hidden rounded-lg">
							{order.type === "food" && order.restaurantOrder.length > 0 ? (
								// Display restaurant image (placeholder)
								<Image
									src="/images/pizza-hut-placeholder.png" // Replace with actual image if available in data
									alt="Restaurant"
									width={80}
									height={80}
									className="object-cover"
								/>
							) : (
								// Display package image if available
								<Image
									src={order.package_image || "/images/package-placeholder.png"} // Use a placeholder if no image
									alt="Package"
									width={80}
									height={80}
									className="object-cover"
								/>
							)}
						</div>
						<div className="ml-4">
							<span className="text-xs">{JSON.stringify(order.publicId)}</span>
							<span className="text-xs">{JSON.stringify(order.orderId)}</span>
							<h2 className="text-xl font-semibold">
								{order.type === "food" ? "Restaurant Order" : "Package Delivery"}
							</h2>
							<p className="text-gray-700">
								{order.type === "food"
									? `${order.restaurantOrder[0]?.quantity} x ${order.restaurantOrder[0]?.name}`
									: order.description || "Package description"}
							</p>
							<p
								className={`text-sm font-medium ${
									order.status === "completed"
										? "text-green-500"
										: order.status === "pending"
											? "text-yellow-500"
											: "text-gray-500"
								}`}
							>
								{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>

	);
}

export default OrderHistoryPage;

