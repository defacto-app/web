"use client";
import React, { useEffect, useState } from "react";
import { useCartContext, useCartSummaryContext } from "@/app/store/cartAtom";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import OrderSummary from "@/app/user/checkout/OrderSummary";
import UserAddresses from "@/components/user/UserAddresses";

function CheckoutPage() {
	const { cart, removeItem, updateItemQuantity } = useCartContext();

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://checkout.flutterwave.com/v3.js";
		script.async = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);

	// Initiate Flutterwave Payment

	return (
		<div className="p-8">
			{JSON.stringify(cart)}
			{/* Cart Header */}
			<h1 className="text-4xl font-bold mb-8">Your cart</h1>

			<div className="flex flex-col lg:flex-row justify-between gap-8">
				{/* Left Side (Items and Delivery Info) */}
				<div className="flex-1 space-y-8">
					<UserAddresses />
					<div className="bg-white p-4 border rounded-lg">
						<div className="space-y-6">
							{cart.length > 0 ? (
								cart.map((item) => (
									<div
										key={item.publicId}
										className="flex items-center justify-between p-4 border-b last:border-b-0"
									>
										<div className="flex items-center">
											<img
												src={item.image}
												alt={item.name}
												className="w-16 h-16 object-cover rounded-lg"
											/>
											<div className="ml-4">
												<p className="font-semibold">{item.name}</p>
												<p className="text-blue-500">₦{item.price}</p>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<Button
												className="px-3 py-1 bg-gray-200 rounded-lg"
												onClick={() =>
													updateItemQuantity({
														itemId: item.publicId,
														quantity: item.quantity - 1,
													})
												}
												disabled={item.quantity === 1}
											>
												-
											</Button>
											<span>{item.quantity}</span>
											<Button
												className="px-3 py-1 bg-gray-200 rounded-lg"
												onClick={() =>
													updateItemQuantity({
														itemId: item.publicId,
														quantity: item.quantity + 1,
													})
												}
											>
												+
											</Button>
											<Button
												className="text-red-500"
												onClick={() => removeItem(item.publicId)}
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
					<div>
						<OrderSummary checkoutPage />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;
