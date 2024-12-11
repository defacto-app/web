"use client";
import React, { useEffect, useState } from "react";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import {
	useCartContext,
	useCartSummaryContext,
} from "@/app/store/cart/cartAtom";
import Link from "next/link";
import { $api } from "@/http/endpoints";
import { useAtomAuthContext } from "@/app/store/authAtom";

import envData from "@/config/envData";
import { useAtom } from "jotai/index";
import {
	checkoutPayloadAtom,
	useCheckout,
} from "@/app/store/restaurantOrderAtom";
import { toast } from "react-toastify";

function OrderSummary({
	restaurant
}: {
	restaurant: any
}) {
	const [payload, setPayload] = useAtom(checkoutPayloadAtom);
	const { cart } = useCartContext();
	const { deliveryFee, discount, discountAmount, firstAddress } =
		useCartSummaryContext();
	const { authUser } = useAtomAuthContext();

	const [skipPayment] = useState(true);

	const [restaurantId, setRestaurantId] = useState("");

	useEffect(() => {
		const restaurantId = sessionStorage.getItem("restaurant_id");
		if (restaurantId) {
			setRestaurantId(restaurantId);
		}
	}, []);

	const [loading, setLoading] = useState(false);

	const totalAmount =
		cart.reduce((acc, item) => acc + item.price * item.quantity, 0) -
		cart.reduce((acc, item) => acc + item.price * item.quantity, 0) *
			(discount / 100) +
		deliveryFee;

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
	const initiatePayment = async () => {
		setLoading(true);
		const body = {
			parentId: sessionStorage.getItem("restaurant_id"),
			restaurantOrder: cart.map((item) => ({
				publicId: item.publicId,
				quantity: item.quantity,
				name: item.name,
				price: item.price,
			})),
			restaurantId:restaurant.publicId,
			charge: totalAmount,
			deliveryFee,
			discount,
			dropOffDetails: {
				address: {
					location: {
						lat: payload.dropOffDetails.address.location.lat,
						lng: payload.dropOffDetails.address.location.lng,
					},
					address: payload.dropOffDetails.address.address,
				},
				phone: authUser.phoneNumber,
				name: authUser.firstName,
				// phoneNumber: authUser.phoneNumber,
				email: authUser.email,

				phoneNumber: "08063152617",
			},
		};

		console.log(payload, "payload");

		try {
			await $api.auth.user.order.restaurant(restaurantId, body);

			toast.success("Order placed successfully");
		} catch (e) {
			console.log(e);
		}
		if (!skipPayment) {
			FlutterwaveCheckout({
				public_key: envData.flutter_wave.test.public_key, // Replace with your public key
				tx_ref: `txref-${Date.now()}`, // Unique transaction reference
				amount: totalAmount, // Total amount calculated from the cart
				currency: "NGN", // Replace with your currency
				payment_options: "card, banktransfer, ussd", // Payment methods
				meta: {
					source: "NextJS-checkout",
					consumer_mac: "92a3-912ba-1192a",
				},
				customer: {
					email: "customer@example.com", // Replace with actual customer email
					phone_number: "08012345678", // Replace with actual customer phone number
					name: "Customer Name", // Replace with actual customer name
				},
				customizations: {
					title: "Your Store Name", // Replace with your store's title
					description: "Payment for your cart items", // Custom description
					logo: envData.logo,
				},
				callback: (data: any) => {
					console.log("Payment callback:", data);
					if (data.status === "successful") {
						// Handle successful payment here
						console.log("Payment was successful!", data);
						// Optionally: You can verify the transaction on the backend here
					} else {
						console.log("Payment failed or was canceled.");
					}
				},
				onclose: () => {
					console.log("Payment process closed by user.");
				},
			});
		}
		setLoading(false);
	};
	return (
		<div>
			{JSON.stringify(restaurant.publicId)} --
			<div className="bg-white p-6  rounded-lg border  space-y-4">
				<h2 className="text-lg font-semibold">Order Summary</h2>
				<div className="flex justify-between">
					<span>Subtotal</span>
					<span className="font-semibold">
						{formatPrice(
							cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
						)}
					</span>
				</div>
				<div className="flex justify-between text-red-500">
					<span>Discount (-{discount}%)</span>
					<span className="font-semibold">-{formatPrice(discountAmount)}</span>
				</div>
				<div className="flex justify-between">
					<span>Delivery Fee</span>
					<span className="font-semibold">{formatPrice(deliveryFee)}</span>
				</div>
				<hr />
				<div className="flex justify-between text-xl font-bold">
					<span>Total</span>
					<span>{formatPrice(totalAmount)}</span>
				</div>
				<Button
					variant={`primary`}
					onClick={initiatePayment}
					loading={loading}
					className="w-full"
				>
					{loading ? "Processing..." : "Confirm order"}
				</Button>
			</div>
		</div>
	);
}

export default OrderSummary;
