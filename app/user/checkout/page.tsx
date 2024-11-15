"use client";
import React from "react";
import { useCartContext } from "@/app/store/cart/cartAtom";

import OrderSummary from "@/app/user/checkout/OrderSummary";
import UserAddresses from "@/components/user/UserAddresses";
import CartItemList from "@/app/user/cart/CartItemList";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import BackButton from "@/app/components/BackButton";

function CheckoutPage() {
	return (
		<div className="p-8">
			{/* Cart Header */}
			{/*back butotn*/}

			<div className={`flex items-center pb-4`}>
				<BackButton />
				<div className="text-3xl font-bold ">Check Out</div>
			</div>

			<div className="flex flex-col lg:flex-row justify-between gap-8">
				{/* Left Side (Items and Delivery Info) */}
				<div className="flex-1 space-y-8">
					<UserAddresses />

					<div>
						<Textarea placeholder="Add a note to your order" />
					</div>

					<div className={`bg-white p-2`}>
						<CartItemList />
					</div>
				</div>

				{/* Right Side (Order Summary and Checkout) */}

				<div className="w-full lg:w-1/3 space-y-8 ">
					<div className={`sticky top-20 right-5`}>
						<OrderSummary checkoutPage />
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;
