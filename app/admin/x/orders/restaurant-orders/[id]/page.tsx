"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { $admin_api } from "@/http/admin-endpoint";
import {
	Package,
	MapPin,
	User,
	Phone,
	Mail,
	ShoppingCart,
	Printer,
	X,
	Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { AssignDriverModal } from "@/app/admin/x/orders/restaurant-orders/components/AssignDriverModal";
import { formatPrice } from "@/utils";
import { formatDateFromNow } from "@/lib/utils";
import { useQuery } from "react-query";
import type { AxiosError } from "axios";

function Page({ params }: { params: { id: string } }) {
	const [isUpdating, setIsUpdating] = useState(false);

	// Fetch order data using React Query
	const {
		data: orderData,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery<any, AxiosError>(["order", params.id], async () => {
		const res = await $admin_api.orders.one(params.id);
		return res.data.data;
	});

	// Fetch getMenu data

	const updateOrderStatus = async (newStatus: string) => {
		setIsUpdating(true);
		try {
			// Simulated API call - replace with actual API
			await $admin_api.orders.updateStatus(params.id, newStatus);
			// setOrderData((prev: any) => ({ ...prev, status: newStatus }));
		} catch (error) {
			console.error("Failed to update status:", error);
		} finally {
			setIsUpdating(false);
		}
	};

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);

	if (error)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-red-500">{error.message}</div>
			</div>
		);

	if (!orderData) return null;

	const getStatusColor = (status: "pending" | "completed" | "cancelled") => {
		const colors = {
			pending: "bg-yellow-100 text-yellow-800",
			completed: "bg-green-100 text-green-800",
			cancelled: "bg-red-100 text-red-800",
		};
		return colors[status] || "bg-gray-100 text-gray-800";
	};

	// Action Buttons Component
	const ActionButtons = () => (
		<Card className="mt-6">
			<CardContent className="pt-6">
				<div className="flex flex-wrap gap-4">
					<Button
						variant="outline"
						className="flex items-center gap-2"
						onClick={() => window.print()}
					>
						<Printer className="w-4 h-4" />
						Print Order
					</Button>

					{orderData.status === "pending" && (
						<>
							<Button
								variant="outline"
								className="flex items-center gap-2 text-green-600 hover:text-green-700"
								onClick={() => updateOrderStatus("completed")}
								disabled={isUpdating}
							>
								<Check className="w-4 h-4" />
								Mark as Completed
							</Button>

							<Button
								variant="outline"
								className="flex items-center gap-2 text-red-600 hover:text-red-700"
								onClick={() => updateOrderStatus("cancelled")}
								disabled={isUpdating}
							>
								<X className="w-4 h-4" />
								Cancel Order
							</Button>

							<AssignDriverModal
								onDriverAssigned={refetch}
								orderId={orderData.publicId}
							/>
						</>
					)}
				</div>
			</CardContent>
		</Card>
	);

	return (
		<div className="min-h-screen bg-gray-50 p-6 pb-40">
			<div className="max-w-6xl mx-auto space-y-6">
				{/* Header Section */}
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
						<p className="text-gray-500">Order ID: {orderData.orderId}</p>
					</div>
					<Badge
						className={`text-sm px-4 py-2 rounded-full ${getStatusColor(orderData.status)}`}
					>
						{orderData.status.charAt(0).toUpperCase() +
							orderData.status.slice(1)}
					</Badge>
				</div>

				{/* Action Buttons */}
				<ActionButtons />

				{/* Existing Cards */}
				{/* Order Summary Card */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ShoppingCart className="w-5 h-5 " />
							Order Summary
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<p className="text-sm text-gray-500">Total Charge</p>
								<p className="font-medium">{formatPrice(orderData.charge)}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Created At</p>
								<p className="font-medium">
									{formatDateFromNow(orderData.createdAt)}
								</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Delivery Type</p>
								<p className="font-medium">
									{orderData.isInstant
										? "Instant Delivery"
										: "Scheduled Delivery"}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Customer Details Card */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<User className="w-5 h-5" />
							Customer Details
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<User className="w-5 h-5 text-gray-400 mt-1" />
								<div>
									<p className="text-sm text-gray-500">Name</p>
									<p className="font-medium">{orderData.dropOffDetails.name}</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Phone className="w-5 h-5 text-gray-400 mt-1" />
								<div>
									<p className="text-sm text-gray-500">Phone Number</p>
									<p className="font-medium">
										{orderData.dropOffDetails.phoneNumber}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Mail className="w-5 h-5 text-gray-400 mt-1" />
								<div>
									<p className="text-sm text-gray-500">Email</p>
									<p className="font-medium">
										{orderData.dropOffDetails.email}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<MapPin className="w-5 h-5 text-gray-400 mt-1" />
								<div>
									<p className="text-sm text-gray-500">Delivery Address</p>
									<p className="font-medium">
										{orderData.dropOffDetails.address}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Order Items Card */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Package className="w-5 h-5" />
							Order Items
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b">
										<th className="text-left py-3 px-4">Item</th>
										<th className="text-right py-3 px-4">Quantity</th>
										<th className="text-right py-3 px-4">Price</th>
										<th className="text-right py-3 px-4">Total</th>
									</tr>
								</thead>
								<tbody>
									{orderData.restaurantOrder.map((item: any) => (
										<tr key={item._id} className="border-b">
											<td className="py-3 px-4">{item.name}</td>
											<td className="text-right py-3 px-4">{item.quantity}</td>
											<td className="text-right py-3 px-4">
												{formatPrice(item.price)}
											</td>
											<td className="text-right py-3 px-4">
												{formatPrice(item.price * item.quantity)}
											</td>
										</tr>
									))}
									<tr className="font-medium">
										<td colSpan={3} className="py-3 px-4 text-right">
											Total Amount:
										</td>
										<td className="py-3 px-4 text-right">
											{formatPrice(orderData.charge)}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default Page;
