"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, User, Phone, Package, Clock } from "lucide-react";
import { $admin_api } from "@/http/admin-endpoint";
import {formatPrice} from "@/utils";
import Image from "next/image";

function Page({ params }: { params: { id: string } }) {
	const [orderData, setOrderData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch package data
	const getData = useCallback(async () => {
		try {
			const res = await $admin_api.orders.one(params.id);
			setOrderData(res.data.data);
			setLoading(false);
		} catch (e) {
			setError("An error occurred while fetching order data.");
			setLoading(false);
		}
	}, [params.id]);

	useEffect(() => {
		getData();
	}, [getData]);

	if (loading)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);

	if (error)
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-red-500">{error}</div>
			</div>
		);

	if (!orderData) return null;

	// Helper functions for formatting
	const formatDate = (date: string | number | Date) =>
		new Date(date).toLocaleString();


	return (
		<div className="min-h-screen bg-gray-50 p-6 pb-40">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">
							Package Delivery Details
						</h1>
						<p className="text-gray-500">Order ID:d {orderData.orderId}</p>
					</div>
					<Badge
						className={`px-4 py-2 rounded-full ${orderData.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
					>
						{orderData.status.charAt(0).toUpperCase() +
							orderData.status.slice(1)}
					</Badge>
				</div>

				{/* Package Image */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Package className="w-5 h-5" />
							Package Image
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Image
							priority={true}
							width={500}
							height={500}
							src={orderData.package_image}
							alt="Package"
							className="rounded-lg w-full h-64 object-cover"
						/>
					</CardContent>
				</Card>

				{/* Pickup and Drop-off Details */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<MapPin className="w-5 h-5" />
							Address Details
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Pickup Details */}
							<div>
								<h2 className="font-semibold text-lg">Pickup Details</h2>
								<div className="mt-2 text-sm">
									<div className="flex items-center gap-2">
										<User className="w-5 h-5 text-gray-400" />
										<p>{orderData.pickupDetails.name}</p>
									</div>
									<div className="flex items-center gap-2 mt-1">
										<Phone className="w-5 h-5 text-gray-400" />
										<p>{orderData.pickupDetails.phone}</p>
									</div>
									<div className="flex items-start gap-2 mt-1">
										<MapPin className="w-5 h-5 text-gray-400" />
										<p>
											{orderData.pickupDetails.address.address},{" "}
											{orderData.pickupDetails.address.additionalDetails}
										</p>
									</div>
								</div>
							</div>

							{/* Drop-off Details */}
							<div>
								<h2 className="font-semibold text-lg">Drop-off Details</h2>
								<div className="mt-2 text-sm">
									<div className="flex items-center gap-2">
										<User className="w-5 h-5 text-gray-400" />
										<p>{orderData.dropOffDetails.name}</p>
									</div>
									<div className="flex items-center gap-2 mt-1">
										<Phone className="w-5 h-5 text-gray-400" />
										<p>{orderData.dropOffDetails.phone}</p>
									</div>
									<div className="flex items-start gap-2 mt-1">
										<MapPin className="w-5 h-5 text-gray-400" />
										<p>
											{orderData.dropOffDetails.address.address},{" "}
											{orderData.dropOffDetails.address.additionalDetails}
										</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Package Summary */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="w-5 h-5" />
							Package Summary
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<p className="text-sm text-gray-500">Description</p>
								<p className="font-medium">{orderData.description}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Delivery Fee</p>
								<p className="font-medium">{formatPrice(orderData.charge)}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Created At</p>
								<p className="font-medium">{formatDate(orderData.createdAt)}</p>
							</div>
							<div>
								<p className="text-sm text-gray-500">Pickup Date</p>
								<p className="font-medium">
									{formatDate(orderData.pickupDate)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default Page;
