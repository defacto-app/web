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
import UserAddresses from "@/components/user/UserAddresses";
import dynamic from "next/dynamic";
const CartItemList = dynamic(() => import("./CartItemList"), { ssr: false });
function CartPage() {
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
					<UserAddresses />

					{/* Order Summary Section */}

					<CartItemList />
				</div>

				{/* Right Side (Order Summary and Checkout) */}
				<div className="w-full lg:w-1/3 space-y-8">
				{/*	<div className="bg-white p-6 rounded-lg border space-y-4">
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
					*/}<div>
						<OrderSummary cartPage />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
