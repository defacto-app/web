"use client";
import React, { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/components/ui/button";
import {
	cartAtom,
	addItemAtom,
	removeItemAtom,
	updateItemQuantityAtom,
	useCartContext,
	useCartSummaryContext,
} from "@/app/store/cartAtom";
import { formatPrice } from "@/utils";
import Link from "next/link";
import OrderSummary from "@/app/user/checkout/OrderSummary";

function Page() {
	const { cart, removeItem, updateItemQuantity, cartTotal } = useCartContext();

	const { totalPrice, deliveryFee, discountAmount, discount } =
		useCartSummaryContext();

	// Sample product to simulate adding to the cart

	return (
		<div className="p-8">
			{/* Cart Header */}
			<h1 className="text-4xl font-bold mb-8">Your cart</h1>

			{/* Main Container */}
			<div className="flex flex-col lg:flex-row justify-between gap-8">
				{/* Left Side (Items and Delivery Info) */}
				<div className="flex-1 space-y-8">
					{/* Delivery Section */}
					<div className="bg-white p-6 rounded-lg border">
						<h2 className="text-lg font-semibold mb-2">Deliver to</h2>
						<div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
							<div className="flex items-center">
								<span className="text-blue-500 mr-4">📍</span>
								<div>
									<p className="font-semibold">
										Home{" "}
										<span className="text-sm text-blue-500">(Default)</span>
									</p>
									<p className="text-sm text-gray-500">
										Times Square NYC, Manhattan
									</p>
								</div>
							</div>
							<Button className="text-blue-500 font-medium">Edit</Button>
						</div>
					</div>

					{/* Order Summary Section */}
					<div className={`bg-white p-4 border rounded-lg`}>
						<div className="space-y-6  ">
							{cart.length > 0 ? (
								cart.map((item) => (
									<div
										key={item.id}
										className="flex items-center justify-between p-4  border-b last:border-b-0"
									>
										<div className="flex items-center">
											<img
												src={item.image}
												alt={item.name}
												className="w-16 h-16 object-cover rounded-lg"
											/>
											<div className="ml-4">
												<p className="font-semibold">{item.name}</p>
												<p className="text-blue-500">{ formatPrice(item.price)}</p>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<Button
												className="px-3 py-1 bg-gray-200 rounded-lg"
												onClick={() =>
													updateItemQuantity({
														itemId: item.id,
														quantity: item.quantity - 1,
													})
												}
												disabled={item.quantity === 1} // Disable if the quantity is 1
											>
												-
											</Button>
											<span>{item.quantity}</span>
											<Button
												className="px-3 py-1 bg-gray-200 rounded-lg"
												onClick={() =>
													updateItemQuantity({
														itemId: item.id,
														quantity: item.quantity + 1,
													})
												}
											>
												+
											</Button>
											<Button
												className="text-red-500"
												onClick={() => removeItem(item.id)}
											>
												🗑
											</Button>
										</div>
									</div>
								))
							) : (
								<p>Your cart is empty.</p>
							)}
						</div>
					</div>
				</div>

				{/* Right Side (Order Summary and Checkout) */}
				<div className="w-full lg:w-1/3 space-y-8">
					{/* Payment & Discount */}
					<div className="bg-white p-6 rounded-lg border space-y-4">
						<div className="flex items-center justify-between">
							<span>Payment Methods</span>
							<span className="text-blue-500 font-medium">E-Wallet</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Get Discounts</span>
							<Button className="bg-blue-500 text-white px-4 py-1 rounded-lg">
								Discount {discount}%
							</Button>
						</div>
					</div>

					{/* Order Summary Section */}
					<div>
						<OrderSummary cartPage />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
