"use client";
import type React from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import type { AxiosError } from "axios";
import { $api } from "@/http/endpoints";
import { useAtom } from "jotai/index";
import {
	checkoutPayloadAtom,
	dropOffModalAtom,
	setDropOffAddressAtom,
	updateNotesAtom,
	useCheckout,
} from "@/app/store/restaurantOrderAtom";
import BackButton from "@/app/components/BackButton";
import { Textarea } from "@/components/ui/textarea";
import CheckOutDropOffAddress from "@/app/user/cart/components/CheckOutDropOffAddress";
import UserAddresses from "@/components/user/UserAddresses";
import OrderSummary from "@/app/user/cart/components/OrderSummary";
const CartItemList = dynamic(() => import("../components/CartItemList"), { ssr: false });

import {
	ErrorState,
	LoadingState,
} from "@/app/(guest)/restaurants/components/SingleRestaurantComponents";
import dynamic from "next/dynamic";
function CartPage({ params }: { params: { slug: string } }) {
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

	const {
		data: restaurantData,
		isLoading,
		isError,
		error,
	} = useQuery<any, AxiosError>(
		["restaurant", params.slug],
		async () => {
			const res = await $api.guest.restaurant.one(params.slug);
			return res.data;
		},
		{
			staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
		},
	);

	if (isLoading) return <LoadingState />;
	if (isError) return <ErrorState error={error?.message || "Failed to load"} />;
	if (!restaurantData) return null;

	return (
		<div className={`container mx-auto lg:px-10`}>

			<div className="lg:px-20">
				{/* Cart Header */}

				<div className={`flex items-center pb-4`}>
					<BackButton />
					<div className="text-2xl font-bold ">Your cart</div>
					<br />
				</div>

				<div className={`text-xl lg:text-3xl pl-8 font-bold`}>
					{restaurantData.restaurant.name}
				</div>

				{/* Main Container */}
				<div className="flex flex-col lg:flex-row justify-between gap-8">
					{/* Left Side (Items and Delivery Info) */}
					<div className="flex-1 space-y-4">
						{/* Delivery Section */}

						{/* Order Summary Section */}


						<CartItemList />

						<div>
							<Textarea
								placeholder="Add a note to your order"
								value={payload.notes}
								onChange={handleNoteChange}
							/>
						</div>

						<CheckOutDropOffAddress
							label={"Deliver To"}
							payload={payload}
							setDropOffModalOpen={setDropOffModalOpen}
							dropOffModalOpen={dropOffModalOpen}
							handleDropOffAddressConfirm={handleDropOffAddressConfirm}
							getSavedDropOffAddress={getSavedDropOffAddress}
							setDropOffAddress={setDropOffAddress}
						/>

						<UserAddresses />
					</div>

					{/* Right Side (Order Summary and Checkout) */}
					<div className="w-full lg:w-1/3 space-y-8">
						<div className={`lg:sticky lg:top-20 right-5`}>
							<OrderSummary  restaurant={restaurantData.restaurant} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
