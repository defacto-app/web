"use client";
import React, { useEffect, useState } from "react";

import OrderSummary from "@/app/user/checkout/OrderSummary";
import UserAddresses from "@/components/user/UserAddresses";
import dynamic from "next/dynamic";
import BackButton from "@/app/components/BackButton";
const CartItemList = dynamic(() => import("./CartItemList"), { ssr: false });
function CartPage() {
	// Sample product to simulate adding to the cart


	return (
		<div className="p-8">
			{/* Cart Header */}

			<div className={`flex items-center pb-4`}>
				<BackButton />
				<div className="text-3xl font-bold ">Your cart </div>
			</div>

			{/* Main Container */}
			<div className="flex flex-col lg:flex-row justify-between gap-8">
				{/* Left Side (Items and Delivery Info) */}
				<div className="flex-1 space-y-4">
					{/* Delivery Section */}
					<UserAddresses />

					{/* Order Summary Section */}

					<CartItemList />
				</div>

				{/* Right Side (Order Summary and Checkout) */}
				<div className="w-full lg:w-1/3 space-y-8">
					<div className={`sticky top-20 right-5`}>
						<OrderSummary cartPage />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
