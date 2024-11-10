"use client";
import DropOffInformation from "@/components/delivery/DropOffInformation";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DateTimePicker from "@/components/user/DateTimePicker";
import GoogleAutoComplete from "@/components/GoogleAutoComplete";
import { useAtom } from "jotai/index";
import { distanceAtom, packagePayloadAtom } from "@/app/store/sendPackageAtom";
import GoogleAddressInput from "@/components/GoogleAddressInput";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import type { addressSelectionType } from "@/lib/types";

export default function Page() {
	const [modalOpen, setModalOpen] = useState(false);

	const [payload, setPayload] = useState({
		description: "",
		pickupDate: new Date(),
		senderDetails: {
			address: {
				address: "",
				additionalDetails: "",
				location: { lat: 0, lng: 0 },
			},
		},
	});

	const handleDateSelect = (date: Date) => {
		setPayload({
			...payload,
			pickupDate: date,
		});
	};

	const [dropOffAddress, setDropOffAddress] = useState<addressSelectionType>({
		location: { lat: 6.21, lng: 6.74 },
		address: "",
		additionalDetails: "",
	});

	const getSavedPickupAddress = () => {
		const savedData = localStorage.getItem("pickupAddress");
		return savedData ? JSON.parse(savedData) : null;
	};

	const setPickupAddress = (addressData: addressSelectionType) => {
		localStorage.setItem("pickupAddress", JSON.stringify(addressData));

		setPayload({
			...payload,
			senderDetails: {
				...payload.senderDetails,
				address: addressData,
			},
		});
	};

	const handlePickupAddressConfirm = (addressData: addressSelectionType) => {
		setPickupAddress(addressData);
		setModalOpen(false);
	};

	return (
		<div>
			<div className="container mx-auto px-4">
				<h1 className="text-start px-1 py-4 text-primary-600 text-3xl font-bold mt-5">
					Send Package
				</h1>
				<div className=" lg:grid lg:grid-cols-3  items-start">
					<div>
						<div className="container mx-auto p-2 ">
							<div className="container mx-auto px-4  space-y-4">
								<div>
									<Label className={`font-bold text-lg`}>
										What do you need to transport ?
									</Label>
									<Textarea
										placeholder={`briefly describe the item`}
										rows={7}
										value={payload.description}
									/>
								</div>

								<div>
									<Label>Pickup Time</Label>
									<DateTimePicker
										showTimeSelect={true}
										selected={payload.pickupDate}
										onSelect={handleDateSelect}
									/>
								</div>

								<div>
									{JSON.stringify(distanceAtom)}
									<Label htmlFor="address">Pickup address</Label>

									<AlertDialog defaultOpen={modalOpen} open={modalOpen}>
										<AlertDialogTrigger asChild>
											<div>
												<Input
													onClick={() => setModalOpen(true)}
													value={payload.senderDetails.address.address}
												/>
											</div>
										</AlertDialogTrigger>
										<AlertDialogContent className="h-full lg:h-[570px] max-w-4xl mx-auto px-4 bg-red-100">
											<button
												type="button"
												onClick={() => setModalOpen(false)}
												className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
											>
												<X className="w-4 h-4" />
											</button>
											<div className={`mt-8 bg-red-100`}>
												<GoogleAddressInput
													initialAddress={payload.senderDetails.address.address}
													initialLocation={
														payload.senderDetails.address.location
													}
													onConfirm={handlePickupAddressConfirm}
													getSavedAddress={getSavedPickupAddress}
													setSavedAddress={setPickupAddress}
												/>
											</div>
										</AlertDialogContent>
									</AlertDialog>
								</div>

								<div className="mb-4">
									<Label htmlFor="address">Drop Off address</Label>

									{/*	<AlertDialog defaultOpen={modalOpen} open={modalOpen}>
										<AlertDialogTrigger asChild>
											<div>
												<Input
													onClick={() => setModalOpen(true)}
													value={packagePayload.receiverDetails.address.address}
												/>
											</div>
										</AlertDialogTrigger>
										<AlertDialogContent className="h-full lg:h-[570px] max-w-4xl mx-auto px-4">
											<button
												type="button"
												onClick={() => setModalOpen(false)}
												className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
											>
												<X className="w-4 h-4" />
											</button>
											<div className={`mt-8`}>
												<GoogleAddressInput
													onConfirm={() => setModalOpen(false)}
													onAddressSelect={(address) =>
														handleAddressSelect(address, "dropoff")
													}
												/>

												<GoogleAddressInput
													initialAddress={savedAddress?.address || ""}
													initialLocation={savedAddress?.location || location}
													onConfirm={handleAddressConfirm}
													onAddressSelect={handleOnSelect}
													getSavedAddress={getSavedAddress}
													setSavedAddress={setSavedAddress}
												/>
											</div>
										</AlertDialogContent>
									</AlertDialog>*/}
								</div>
							</div>
						</div>
					</div>
					<div>
						<DropOffInformation />
					</div>
				</div>
			</div>
		</div>
	);
}
