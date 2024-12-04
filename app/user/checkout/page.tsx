"use client";
import type React from "react";
import { useEffect, useState } from "react";

import OrderSummary from "@/app/user/cart/OrderSummary";
import CartItemList from "@/app/user/cart/CartItemList";

import { Textarea } from "@/components/ui/textarea";
import BackButton from "@/app/components/BackButton";
import { DropOffAddress } from "@/app/user/send-package/component";

import { useAtom } from "jotai";
import {
	checkoutPayloadAtom,
	dropOffModalAtom,
	setDropOffAddressAtom,
	updateNotesAtom,
	useCheckout,
} from "@/app/store/restaurantOrderAtom";

function CheckoutPage() {
	const [payload, setPayload] = useAtom(checkoutPayloadAtom);
	const [dropOffModalOpen, setDropOffModalOpen] = useAtom(dropOffModalAtom);
	const [, updateNotes] = useAtom(updateNotesAtom);
	const [, setDropOffAddress] = useAtom(setDropOffAddressAtom);
	const { initializeCheckout, getSavedDropOffAddress } = useCheckout();

	// For notes:

	// Initialize saved address on component mount
	useEffect(() => {
		initializeCheckout();
	}, []); // Run only once on mount

	// Handle note changes
	const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		updateNotes(event.target.value);
	};

	// Handle drop-off address confirmation
	const handleDropOffAddressConfirm = (addressData: any) => {
		setDropOffAddress(addressData);
		setDropOffModalOpen(false);
	};

	return (
		<div className="p-8">
			{/* Cart Header */}
			{/*back butotn*/}

			<div className={`flex items-center pb-4`}>
				<BackButton />
				<div className="text-3xl font-bold ">Check Out</div>
			</div>
			{JSON.stringify(payload)}
			<div className="flex flex-col lg:flex-row justify-between gap-8">
				{/* Left Side (Items and Delivery Info) */}
				<div className="flex-1 space-y-8">
					<div className="bg-white p-6 rounded-lg border">
						<DropOffAddress
							label={"Deliver To"}
							payload={payload}
							setDropOffModalOpen={setDropOffModalOpen}
							dropOffModalOpen={dropOffModalOpen}
							handleDropOffAddressConfirm={handleDropOffAddressConfirm}
							getSavedDropOffAddress={getSavedDropOffAddress}
							setDropOffAddress={setDropOffAddress}
						/>
					</div>

					<div>
						<Textarea
							placeholder="Add a note to your order"
							value={payload.notes}
							onChange={handleNoteChange}
						/>
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
