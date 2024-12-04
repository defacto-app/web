"use client";
import type React from "react";
import {useEffect} from "react";

import OrderSummary from "@/app/user/cart/OrderSummary";
import UserAddresses from "@/components/user/UserAddresses";
import dynamic from "next/dynamic";
import BackButton from "@/app/components/BackButton";
import {Textarea} from "@/components/ui/textarea";
import {useAtom} from "jotai/index";
import {
	checkoutPayloadAtom,
	dropOffModalAtom,
	setDropOffAddressAtom,
	updateNotesAtom, useCheckout
} from "@/app/store/restaurantOrderAtom";
import {DropOffAddress} from "@/app/user/send-package/component";
const CartItemList = dynamic(() => import("./CartItemList"), { ssr: false });
function CartPage() {
	// Sample product to simulate adding to the cart

	const [payload, setPayload] = useAtom(checkoutPayloadAtom);

	const [dropOffModalOpen, setDropOffModalOpen] = useAtom(dropOffModalAtom);
	const [, updateNotes] = useAtom(updateNotesAtom);
	const [, setDropOffAddress] = useAtom(setDropOffAddressAtom);
	const { initializeCheckout, getSavedDropOffAddress } = useCheckout();

	const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		updateNotes(event.target.value);
	};
	// Initialize saved address on component mount
	useEffect(() => {
		initializeCheckout();
	}, []); // Run only once on mount
	const handleDropOffAddressConfirm = (addressData: any) => {
		setDropOffAddress(addressData);
		setDropOffModalOpen(false);
	};
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


					{/* Order Summary Section */}

					<CartItemList/>

					<div>
						<Textarea
							placeholder="Add a note to your order"
							value={payload.notes}
							onChange={handleNoteChange}
						/>

					</div>
					{JSON.stringify(payload)}

					<DropOffAddress
						label={"Deliver To"}
						payload={payload}
						setDropOffModalOpen={setDropOffModalOpen}
						dropOffModalOpen={dropOffModalOpen}
						handleDropOffAddressConfirm={handleDropOffAddressConfirm}
						getSavedDropOffAddress={getSavedDropOffAddress}
						setDropOffAddress={setDropOffAddress}
					/>

					<UserAddresses/>

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
