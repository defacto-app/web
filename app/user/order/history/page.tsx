"use client";
import type React from "react";
import { useEffect, useState, useRef } from "react";
import { $api } from "@/http/endpoints";
import Image from "next/image";
import OrderHistoryLoading from "@/app/user/order/components/OrderHistoryLoading";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { isDev } from "@/config/envData";
import debounce from "lodash/debounce";
import { SearchBar } from "@/components/SearchBar";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

function Page() {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [orders, setOrders] = useState<any[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [type, setType] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
	const [sortBy, setSortBy] = useState<"createdAt" | "updatedAt" | "status" | "type">("createdAt");
	const perPage = 10;

	const observerRef = useRef<HTMLDivElement | null>(null);

	const getData = async (searchId = "", pageNum = 1, orderType: string | null = null) => {
		try {
			setLoading(true);
			const res = await $api.auth.user.order.history({
				...(searchId && { orderId: searchId }),
				...(orderType && { type: orderType }),
				page: pageNum,
				perPage,
				sort: sortDirection,
				sortBy,
			});

			const orderData = Array.isArray(res.data.data)
				? res.data.data
				: Array.isArray(res.data)
					? res.data
					: [];

			if (pageNum === 1) {
				setOrders(orderData);
			} else {
				setOrders((prev) => [...prev, ...orderData]);
			}

			setHasMore(orderData.length === perPage);
		} catch (e) {
			setError("Failed to fetch data");
			console.log("error", e);
		} finally {
			setLoading(false);
		}
	};

	const debouncedSearch = debounce((query: string) => {
		setPage(1);
		getData(query, 1, type);
	}, 500);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchQuery(query);
		debouncedSearch(query);
	};

	const handleTypeChange = (selectedType: string | null) => {
		setType(selectedType);
		setPage(1);
		getData(searchQuery, 1, selectedType);
	};

	const handleSortChange = (newSortBy: typeof sortBy) => {
		if (newSortBy === sortBy) {
			setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortBy(newSortBy);
			setSortDirection("desc");
		}
		setPage(1);
		getData(searchQuery, 1, type);
	};

	useEffect(() => {
		getData();
		return () => {
			debouncedSearch.cancel();
		};
	}, []);

	useEffect(() => {
		if (loading || !hasMore) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setPage((prevPage) => {
						const nextPage = prevPage + 1;
						getData(searchQuery, nextPage, type);
						return nextPage;
					});
				}
			},
			{ threshold: 1.0 }
		);

		if (observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => {
			if (observerRef.current) {
				observer.unobserve(observerRef.current);
			}
		};
	}, [loading, hasMore, searchQuery, type]);

	const pageWrapper = (content: React.ReactNode) => (
		<div className="min-h-[calc(100vh-4rem)] bg-background">
			<div className="max-w-5xl mx-auto p-4">
				<h1 className="text-3xl font-bold mb-4">Orders</h1>
				<div className="mb-6 flex items-center justify-between gap-4">
					<div className="flex items-center gap-4 flex-1">
						<SearchBar
							value={searchQuery}
							onChange={handleSearchChange}
							isLoading={loading}
							placeholder="Search by order ID..."
						/>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="min-w-[120px]">
									<ArrowUpDown className="h-4 w-4 mr-2" />
									Sort
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Sort by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{["createdAt", "updatedAt", "status", "type"].map((field) => (
									<DropdownMenuItem
										key={field}
										onClick={() => handleSortChange(field as typeof sortBy)}
										className="flex items-center justify-between"
									>
										{field.charAt(0).toUpperCase() + field.slice(1)}
										{sortBy === field && (
											<span className="text-xs ml-2">
                                                ({sortDirection === "asc" ? "↑" : "↓"})
                                            </span>
										)}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								{type ? (type === "food" ? "Restaurant Orders" : "Delivery Orders") : "Filter by Type"}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => handleTypeChange(null)}>All Orders</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleTypeChange("food")}>Restaurant Orders</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleTypeChange("package")}>Delivery Orders</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				{content}
			</div>
		</div>
	);

	if (loading && page === 1) {
		return pageWrapper(<OrderHistoryLoading />);
	}

	return pageWrapper(
		<div>
			{error && <ErrorMessage message={error} />}
			{orders.length === 0 && !loading && (
				<div className="text-center py-8 text-gray-500">
					{searchQuery ? "No orders found matching your search." : "No orders found."}
				</div>
			)}
			<div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
				{orders.map((order) => (
					<OrderItem key={order.orderId} order={order} />
				))}
			</div>
			<div ref={observerRef} className="mt-6 text-center">
				{loading && <span>Loading...</span>}
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
					<Image
						src={
							order.type === "food"
								? "https://placehold.co/600x600.png"
								: order.package_image || "https://placehold.co/600x600.png"
						}
						alt={order.type}
						width={80}
						height={80}
						priority
						className="object-cover w-auto h-auto"
					/>
				</AspectRatio>
			</div>
			<div className="ml-4">
				<h2 className="text-xl font-semibold">
					{order.type === "food" ? "Restaurant Order" : "Package Delivery"}
				</h2>
				<p className="text-gray-700">{order.description || "No description provided"}</p>
				<p className={`text-sm font-medium ${order.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
					{order.status}
				</p>
			</div>
		</div>
	);
}

export default Page;
