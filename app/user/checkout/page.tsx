"use client";
import React from "react";
import { useCartContext } from "@/app/store/cartAtom";

import OrderSummary from "@/app/user/checkout/OrderSummary";
import UserAddresses from "@/components/user/UserAddresses";
import CartItemList from "@/app/user/cart/CartItemList";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {Textarea} from "@/components/ui/textarea";

function CheckoutPage() {

	// Initiate Flutterwave Payment

	return (
		<div className="p-8">
			{/* Cart Header */}
			<h1 className="text-3xl font-bold mb-8">Check Out</h1>

			<div className="flex flex-col lg:flex-row justify-between gap-8">
				{/* Left Side (Items and Delivery Info) */}
				<div className="flex-1 space-y-8">
					<UserAddresses />

					<div>
						<Textarea placeholder="Add a note to your order" />
					</div>

					<div className={`bg-white p-2`}>
						<Accordion type="single" collapsible>
							<AccordionItem className={``} value="item-1 ">
								<AccordionTrigger className={` border rounded-lg`}>
									Your Cart
								</AccordionTrigger>
								<AccordionContent className={`mt-4`}>
						<CartItemList />
								</AccordionContent>
							</AccordionItem>
						</Accordion>
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
