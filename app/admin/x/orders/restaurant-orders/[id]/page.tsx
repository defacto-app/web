"use client"
import React, {useCallback, useEffect, useState} from "react";
import { Badge } from '@/components/ui/badge';
import {$admin_api} from "@/http/admin-endpoint";
import { Package, MapPin, User, Phone, Mail, ShoppingCart, Printer, Send,  X, Check, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {AssignDriver} from "@/app/admin/x/orders/restaurant-orders/components/AssignDriver";

function Page({ params }: { params: { id: string } }) {
	const [orderData, setOrderData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isUpdating, setIsUpdating] = useState(false);

	// Fetch getMenu data
	const getData = useCallback(async () => {
		try {
			const res = await $admin_api.orders.one(params.id);
			setOrderData(res.data.data);
			setLoading(false);
		} catch (e: any) {
			setError(e.message || "An error occurred while fetching the data");
			setLoading(false);
		}
	}, [params.id]);

	const updateOrderStatus = async (newStatus: string) => {
		setIsUpdating(true);
		try {
			// Simulated API call - replace with actual API
			// await $admin_api.orders.updateStatus(params.id, newStatus);
			setOrderData((prev: any) => ({...prev, status: newStatus}));
		} catch (error) {
			console.error('Failed to update status:', error);
		} finally {
			setIsUpdating(false);
		}
	};

	useEffect(() => {
		getData();
	}, [getData]);

	if (loading) return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
		</div>
	);

	if (error) return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-red-500">{error}</div>
		</div>
	);

	if (!orderData) return null;

	const getStatusColor = (status: 'pending' | 'completed' | 'cancelled') => {
		const colors = {
			pending: 'bg-yellow-100 text-yellow-800',
			completed: 'bg-green-100 text-green-800',
			cancelled: 'bg-red-100 text-red-800',
		};
		return colors[status] || 'bg-gray-100 text-gray-800';
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'NGN',
		}).format(price);
	};

	// Action Buttons Component
	const ActionButtons = () => (
		<Card className="mt-6">
			<CardContent className="pt-6">
				<div className="flex flex-wrap gap-4">
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" className="flex items-center gap-2">
								<AlertCircle className="w-4 h-4" />
								Update Status
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Update Order Status</DialogTitle>
							</DialogHeader>
							<div className="space-y-4 pt-4">
								<Select
									onValueChange={(value) => updateOrderStatus(value)}
									defaultValue={orderData.status}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="pending">Pending</SelectItem>
										<SelectItem value="completed">Completed</SelectItem>
										<SelectItem value="cancelled">Cancelled</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</DialogContent>
					</Dialog>

					<Button variant="outline" className="flex items-center gap-2" onClick={() => window.print()}>
						<Printer className="w-4 h-4" />
						Print Order
					</Button>

					<Button
						variant="outline"
						className="flex items-center gap-2"
						// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
						onClick={() => window.location.href = `mailto:${orderData.dropOffDetails.email}`}
					>
						<Send className="w-4 h-4" />
						Contact Customer
					</Button>

					{orderData.status === 'pending' && (
						<>
							<Button
								variant="outline"
								className="flex items-center gap-2 text-green-600 hover:text-green-700"
								onClick={() => updateOrderStatus('completed')}
								disabled={isUpdating}
							>
								<Check className="w-4 h-4" />
								Mark as Completed
							</Button>

							<Button
								variant="outline"
								className="flex items-center gap-2 text-red-600 hover:text-red-700"
								onClick={() => updateOrderStatus('cancelled')}
								disabled={isUpdating}
							>
								<X className="w-4 h-4" />
								Cancel Order
							</Button>

							<AssignDriver/>


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
					<Badge className={`text-sm px-4 py-2 rounded-full ${getStatusColor(orderData.status)}`}>
						{orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
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
								<p className="text-sm text-gray-500">Order Type</p>
								<p className="font-medium">{orderData.type.charAt(0).toUpperCase() + orderData.type.slice(1)}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Total Charge</p>
								<p className="font-medium">{formatPrice(orderData.charge)}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Created At</p>
								<p className="font-medium">{formatDate(orderData.createdAt)}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Delivery Type</p>
								<p className="font-medium">{orderData.isInstant ? 'Instant Delivery' : 'Scheduled Delivery'}</p>
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
									<p className="font-medium">{orderData.dropOffDetails.phoneNumber}</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<Mail className="w-5 h-5 text-gray-400 mt-1" />
								<div>
									<p className="text-sm text-gray-500">Email</p>
									<p className="font-medium">{orderData.dropOffDetails.email}</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<MapPin className="w-5 h-5 text-gray-400 mt-1" />
								<div>
									<p className="text-sm text-gray-500">Delivery Address</p>
									<p className="font-medium">{orderData.dropOffDetails.address}</p>
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
										<td className="text-right py-3 px-4">{formatPrice(item.price)}</td>
										<td className="text-right py-3 px-4">{formatPrice(item.price * item.quantity)}</td>
									</tr>
								))}
								<tr className="font-medium">
									<td colSpan={3} className="py-3 px-4 text-right">Total Amount:</td>
									<td className="py-3 px-4 text-right">{formatPrice(orderData.charge)}</td>
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