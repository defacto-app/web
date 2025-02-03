import { useState, useEffect } from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FileBox, MapPin, Flag, CreditCard } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { $api } from "@/http/endpoints";
import { formatDateFromNow } from "@/lib/utils";

function OrderItem({ order }: { order: any }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [orderDetails, setOrderDetails] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchOrderDetails = async () => {
		setIsLoading(true);
		try {
			const response = await $api.auth.user.order.one(order.publicId);
			setOrderDetails(response.data);
		} catch (error) {
			console.error("Failed to fetch order details:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleOpenDialog = () => {
		setIsDialogOpen(true);
		fetchOrderDetails();
	};

	return (
		<>
			<div
				className="flex items-center p-4 bg-white shadow-sm rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
				onClick={handleOpenDialog}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						handleOpenDialog();
					}
				}}
			>
				<div className="w-20 h-20 overflow-hidden rounded-lg">
					<AspectRatio ratio={1}>
						<Image
							src={
								order.type === "food"
									? order.restaurant_image || "https://placehold.co/600x600.png"
									: order.package_image || "https://placehold.co/600x600.png"
							}
							alt={order.type}
							fill
							sizes="(max-width: 80px) 100vw, 80px"
							priority
							className="object-cover"
						/>
					</AspectRatio>
				</div>
				{/* Rest of your existing content */}
				<div className="ml-4">
					<h2 className="text-base font-semibold">
						{order.type === "food"
							? order.restaurant_name || "Restaurant order"
							: "Package Delivery"}
					</h2>

					{order.type === "food" && (
						<div className="mt-2">
							{order.restaurantOrder.map((item: any) => (
								<div key={item._id} className="flex items-center gap-2">
									<span className="text-sm">
										{item.quantity} x {item.name}
									</span>
								</div>
							))}
						</div>
					)}

					<p
						className={`text-sm font-medium ${
							order.status === "completed"
								? "text-green-500"
								: "text-yellow-500"
						}`}
					>
						{order.status}
					</p>
				</div>
			</div>

			<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AlertDialogContent className="h-full lg:h-5/6">
					<AlertDialogHeader>
						<AlertDialogTitle>Order Details</AlertDialogTitle>
						<AlertDialogDescription className="pt-2">
							{isLoading ? (
								<div className="space-y-2 animate-pulse">
									<div className="h-4 bg-gray-200 rounded w-3/4"></div>
									<div className="h-4 bg-gray-200 rounded w-1/2"></div>
									<div className="h-4 bg-gray-200 rounded w-2/3"></div>
								</div>
							) : orderDetails ? (
								<div>
									{/* Header with Status */}
									<div className="flex items-start gap-3">
										<div className="p-2 bg-gray-100 rounded-lg">
											<FileBox className="w-6 h-6 text-gray-600" />
										</div>
										<div>
											<h3 className="text-lg font-semibold text-gray-700">
												{orderDetails.status.charAt(0).toUpperCase() +
													orderDetails.status.slice(1)}
											</h3>
											<p className="text-gray-600 text-sm">
                        {formatDateFromNow(orderDetails.createdAt)}
											</p>
											<p className="text-sm text-gray-500">
												ID: {orderDetails.orderId}
											</p>
										</div>
									</div>

									<div className="mt-8 space-y-6">
										{/* Your Order Section */}
										<div>
											<h3 className="text-xl font-bold mb-4">Your order</h3>
											{orderDetails.restaurantOrder?.map((item: any) => (
												<div
													key={item._id}
													className="flex items-start gap-2 mb-3"
												>
													<span className="font-semibold text-gray-700">
														{item.quantity}x
													</span>
													<div>
														<p className="font-medium text-gray-800">
															{item.name}
														</p>
														<p className="text-sm text-gray-500">
															No customization
														</p>
													</div>
												</div>
											))}
										</div>

										{/* Delivery Details */}
										<div>
											<h3 className="text-xl font-bold mb-4">
												Delivery details
											</h3>
											<div className="space-y-4">
												<div className="flex items-start gap-3">
													<MapPin className="w-5 h-5 mt-1 text-gray-400" />
													<p className="text-gray-600">
														{orderDetails.pickupDetails?.name ||
															"No pickup address"}
													</p>
												</div>
												<div className="flex items-start gap-3">
													<Flag className="w-5 h-5 mt-1 text-emerald-500" />
													<p className="text-gray-600">
														{orderDetails.dropOffDetails?.address?.location}
													</p>
												</div>
											</div>
										</div>

										{/* Summary */}
										<div className="pt-4 border-t border-gray-200">
											<h3 className="text-xl font-bold mb-4">Summary</h3>
											<div className="space-y-2">
												<div className="flex justify-between items-center">
													<span className="text-gray-600">Services</span>
													<span className="font-medium">
														₦{orderDetails.charge?.toLocaleString() || "0.00"}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-gray-600">Delivery</span>
													<span className="font-medium">No cost</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-gray-600">Products</span>
													<span className="font-medium">
														₦
														{orderDetails.restaurantOrder
															?.reduce(
																(acc: number, item: any) =>
																	acc + item.price * item.quantity,
																0,
															)
															?.toLocaleString() || "0.00"}
													</span>
												</div>
												<div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
													<span className="font-bold">Total</span>
													<span className="font-bold">
														₦
														{(
															orderDetails.charge +
															orderDetails.restaurantOrder?.reduce(
																(acc: number, item: any) =>
																	acc + item.price * item.quantity,
																0,
															)
														)?.toLocaleString() || "0.00"}
													</span>
												</div>
											</div>
											{orderDetails.paymentStatus === "completed" && (
												<div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
													<CreditCard className="w-4 h-4" />
													<span>
														Was charged on your card ending in{" "}
														{orderDetails.cardLastFour || "****"}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							) : (
								<p className="text-red-500">Failed to load order details</p>
							)}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Close</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}

export default OrderItem;
