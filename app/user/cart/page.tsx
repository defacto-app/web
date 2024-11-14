"use client";
import React, { useEffect } from "react";



import OrderSummary from "@/app/user/checkout/OrderSummary";
import UserAddresses from "@/components/user/UserAddresses";
import dynamic from "next/dynamic";
const CartItemList = dynamic(() => import("./CartItemList"), { ssr: false });
function CartPage() {



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
			<div>
						<OrderSummary cartPage />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
