"use client";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { $admin_api } from "@/http/admin-endpoint";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import {
	Users,
	Store,
	ShoppingBag,
	Menu,
	ArrowUp,
	ArrowDown,
	Clock,
	RefreshCcw,
} from "lucide-react";

interface Role {
	_id: string;
	count: number;
}




export default function AdminIndex() {
	const [data, setData] = React.useState<any>();

	const [isLoading, setLoading] = React.useState<boolean>(true);
	const [error, setError] = React.useState<string | null>(null);

	const fetchDashboardData = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await $admin_api.dashboard();
			setData(res.data.data);
		} catch (error) {
			setError("Failed to fetch dashboard data. Please try again.");
			console.error("Error fetching dashboard data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDashboardData();
	}, []);

	if (isLoading) {
		return (
			<div className="p-6 space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Dashboard Overview</h1>
					<Skeleton className="h-10 w-24" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{[...Array(4)].map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<Card key={i} className="p-4">
							<div className="space-y-3">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-8 w-24" />
								<Skeleton className="h-4 w-32" />
							</div>
						</Card>
					))}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{[...Array(2)].map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<Card key={i} className="p-4">
							<Skeleton className="h-6 w-32 mb-4" />
							<div className="space-y-3">
								{[...Array(3)].map((_, j) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<Skeleton key={j} className="h-4 w-full" />
								))}
							</div>
						</Card>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6 flex flex-col items-center justify-center space-y-4">
				<h1 className="text-xl font-bold text-red-500">{error}</h1>
				<Button onClick={fetchDashboardData}>
					<RefreshCcw className="mr-2 h-4 w-4" />
					Try Again
				</Button>
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Dashboard Overview</h1>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Total Users</p>
							<h2 className="text-2xl font-bold">{data.users.total}</h2>
							<div className="flex items-center mt-2 text-sm">
								<p>Verified: {data.users.verified}</p>
								<span className="mx-2">•</span>
								<p>Unverified: {data.users.unverified}</p>
							</div>
						</div>
						<Users className="h-8 w-8 text-muted-foreground" />
					</div>
				</Card>

				<Card className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Restaurants</p>
							<h2 className="text-2xl font-bold">{data.restaurants.total}</h2>
							<p className="text-sm mt-2">
								Popular: {data.restaurants.popularCategory}
							</p>
						</div>
						<Store className="h-8 w-8 text-muted-foreground" />
					</div>
				</Card>

				<Card className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Orders</p>
							<h2 className="text-2xl font-bold">{data.orders.total}</h2>
							<p className="text-sm mt-2">
								Avg Value: ₦{Math.round(data.orders.avgValue)}
							</p>
						</div>
						<ShoppingBag className="h-8 w-8 text-muted-foreground" />
					</div>
				</Card>

				<Card className="p-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Menu Items</p>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<h2 className="text-2xl font-bold">{data.menu.total}</h2>
									</TooltipTrigger>
									<TooltipContent>
										<p>Total number of menu items across all restaurants</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<div className="flex items-center mt-2 text-sm">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<span className="text-green-500 flex items-center">
												<ArrowUp className="h-4 w-4" /> {data.menu.available}
											</span>
										</TooltipTrigger>
										<TooltipContent>
											<p>Currently available menu items</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<span className="mx-2">•</span>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<span className="text-red-500 flex items-center">
												<ArrowDown className="h-4 w-4" />{" "}
												{data.menu.unavailable}
											</span>
										</TooltipTrigger>
										<TooltipContent>
											<p>Currently unavailable menu items</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
						<Menu className="h-8 w-8 text-muted-foreground" />
					</div>
				</Card>
			</div>

			{/* Detailed Statistics */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="p-4">
					<h3 className="font-semibold mb-4">Order Statistics</h3>
					<div className="space-y-4">
						<div className="flex justify-between">
							<span>Instant Orders</span>
							<span>{data.orders.instantOrders}</span>
						</div>
						<div className="flex justify-between">
							<span>Pending 48hrs</span>
							<span>{data.orders.pendingOlderThan48Hours}</span>
						</div>
						<div className="flex justify-between">
							<span>Average Order Value</span>
							<span>{formatPrice(data.orders.avgValue)}</span>
						</div>
					</div>
				</Card>

				<Card className="p-4">
					<h3 className="font-semibold mb-4">User Distribution</h3>
					<div className="space-y-4">
						{data.users.roles.map((role: any) => (
							<div key={role._id} className="flex justify-between">
								<span className="capitalize">{role._id}s</span>
								<span>{role.count}</span>
							</div>
						))}
					</div>
				</Card>
			</div>

			<div className="text-sm text-muted-foreground text-right">
				<Clock className="h-4 w-4 inline mr-2" />
				Last updated: {data.timestamp}
			</div>
		</div>
	);
}

export const runtime = "edge";
