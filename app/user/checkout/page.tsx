"use client";
import React, { useEffect, useState } from "react";

import OrderSummary from "@/app/user/checkout/OrderSummary";
import UserAddresses from "@/components/user/UserAddresses";
import CartItemList from "@/app/user/cart/CartItemList";

import { Textarea } from "@/components/ui/textarea";
import BackButton from "@/app/components/BackButton";
import {
	DropOffAddress,
	PickupAddress,
} from "@/app/user/send-package/component";
import type { addressSelectionType } from "@/lib/types";
import { isDev } from "@/config/envData";
import { calculateDistance } from "@/utils";

function CheckoutPage() {
	const [dropOffModalOpen, setDropOffModalOpen] = useState(false);


	const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setPayload({ ...payload, notes: event.target.value });
	};

	const [payload, setPayload] = useState<any>({
		description: isDev ? "This is a test package" : "",
		pickupDate: new Date(),

		dropOffDetails: {
			address: {
				address: "",
				additionalDetails: "",
				location: { lat: 0, lng: 0 },
			},
			name: "",
			phone: "",
			email: "",
		},
		notes: "",
	});

	const setDropOffAddress = (addressData: addressSelectionType) => {
		sessionStorage.setItem(
			"restaurantDropOffAddress",
			JSON.stringify(addressData),
		);

		setPayload({
			...payload,
			dropOffDetails: {
				...payload.dropOffDetails,
				address: addressData,
			},
		});
	};

	const handleDropOffAddressConfirm = (addressData: addressSelectionType) => {
		setDropOffAddress(addressData);
		setDropOffModalOpen(false);
	};

	const getSavedDropOffAddress = () => {
		const savedData = sessionStorage.getItem("pickupAddress");

		return savedData ? JSON.parse(savedData) : null;
	};

	useEffect(() => {
		const savedDropOffAddress = getSavedDropOffAddress();
		if (savedDropOffAddress) {
			setPayload((prevPayload: any) => ({
				...prevPayload,
				dropOffDetails: {
					...prevPayload.dropOffDetails,
					address: savedDropOffAddress,
				},
			}));
		}
	}, []);

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
