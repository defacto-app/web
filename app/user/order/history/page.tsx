"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { $api } from "@/http/endpoints";
import Image from "next/image";
import OrderHistoryLoading from "@/app/user/order/components/OrderHistoryLoading";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {isDev} from "@/config/envData";

function Page() {
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

	const pageWrapper = (content: React.ReactNode) => (
		<div className="min-h-[calc(100vh-4rem)] bg-background">
			<div className="max-w-5xl mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">Orders</h1>
				{content}
			</div>
		</div>
	);


	if (loading) {
		return pageWrapper(<OrderHistoryLoading />);
	}

	return (
		<div className="max-w-5xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Orders</h1>

			{error && <ErrorMessage message={error} />}

			{orders.length === 0 && !loading && <div>No orders found.</div>}

			<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
				{orders.map((order) => (
					<OrderItem key={order.orderId} order={order} />
				))}
			</div>
		</div>
	);
}

function ErrorMessage({ message }: { message: string }) {
	return <div className="text-center text-red-500">{message}</div>;
}

function OrderItem({ order }: { order: any }) {
	return (
		<div className="flex items-center p-4 bg-white shadow-sm rounded-lg border">
			<div className="w-20 h-20 overflow-hidden rounded-lg">
				<AspectRatio ratio={1}>
					{order.type === "food" && order.restaurantOrder.length > 0 ? (
						// Display restaurant image (placeholder)
						<Image
							src="https://placehold.co/600x600.png" // Replace with actual image if available in data
							alt="Restaurant"
							width={80}
							height={80}
							priority
							className="object-cover w-auto h-auto"
						/>
					) : (
						// Display package image if available
						<Image
							src={order.package_image || "https://placehold.co/600x600.png"} // Use a placeholder if no image
							alt="Package"
							width={80}
							height={80}
							priority
							className="object-cover w-auto h-auto"
						/>
					)}
				</AspectRatio>
			</div>
			<div className="ml-4">
				{
					isDev && <div>
						<span className="text-xs">{JSON.stringify(order.publicId)}</span>
						<span className="text-xs">{JSON.stringify(order.orderId)}</span>
					</div>
				}

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
	);
}

export default Page;
