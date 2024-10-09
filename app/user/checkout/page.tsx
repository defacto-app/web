"use client";
import React, { useEffect, useState } from "react";
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
import { $axios } from "@/http/http.fn";
import { $api } from "@/http/endpoints";

function CheckoutPage() {
	const { cart, removeItem, updateItemQuantity, cartTotal } = useCartContext();

	const { totalPrice, deliveryFee, discountAmount, discount } =
		useCartSummaryContext();

	// Access cart state and atom functions

	// Sample product to simulate adding to the cart
	const [loading, setLoading] = useState(false);

	const totalAmount =
		cart.reduce((acc, item) => acc + item.price * item.quantity, 0) -
		cart.reduce((acc, item) => acc + item.price * item.quantity, 0) *
			(discount / 100) +
		deliveryFee;

	const initiatePayment = async () => {
		setLoading(true);

		try {
			const response = await $api.payments.card({
				amount: totalAmount,
				email: "customer@example.com", // Replace with actual user email
				phone_number: "08012345678", // Replace with actual user phone number
				fullname: "Customer Name", // Replace with actual user name
			});

			console.log("Payment initiated:", response);

			// Handle the response from your backend
			if (response.data.status === "success") {
				// For example, if your backend returns a payment link

				console.log("Payment initiated:", response.data.payment_link);
				// Redirect the user to the payment page if necessary
				/*		window.location.href = response.data.data.
					auth_url;*/
			} else {
				console.error("Payment initiation failed:", response.data.error);
			}
		} catch (error) {
			console.error("Error initiating payment:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="p-8">
			{/* Cart Header */}
			<h1 className="text-4xl font-bold mb-8">Your cart</h1>

			<div className="flex flex-col lg:flex-row justify-between gap-8">
				{/* Left Side (Items and Delivery Info) */}
				<div className="flex-1 space-y-8">
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
												<p className="text-blue-500">₦{item.price}</p>
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

					{/* Order Summary Section */}
					<div className="bg-white p-6 rounded-lg border space-y-4">
						<h2 className="text-lg font-semibold">Order Summary</h2>
						<div className="flex justify-between">
							<span>Subtotal</span>
							<span className="font-semibold">
								{formatPrice(
									cart.reduce(
										(acc, item) => acc + item.price * item.quantity,
										0,
									),
								)}
							</span>
						</div>
						<div className="flex justify-between text-red-500">
							<span>Discount (-{discount}%)</span>
							<span className="font-semibold">
								-
								{formatPrice(
									cart.reduce(
										(acc, item) => acc + item.price * item.quantity,
										0,
									) *
										(discount / 100),
								)}
							</span>
						</div>
						<div className="flex justify-between">
							<span>Delivery Fee</span>
							<span className="font-semibold">{formatPrice(deliveryFee)}</span>
						</div>
						<hr />
						<div className="flex justify-between text-xl font-bold">
							<span>Total</span>
							<span>
								{formatPrice(
									totalAmount -
										cart.reduce(
											(acc, item) => acc + item.price * item.quantity,
											0,
										) *
											(discount / 100) +
										deliveryFee,
								)}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<input
								type="text"
								placeholder="Add promo code"
								className="flex-1 border rounded-lg p-2"
							/>
							<Button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
								Apply
							</Button>
						</div>
						<Button
							onClick={initiatePayment}
							className="w-full bg-blue-500 text-white text- px-4 py-3 mt-4 rounded-lg"
						>
							Confirm order
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;
