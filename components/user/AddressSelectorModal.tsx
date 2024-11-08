// components/AddressSelectorModal.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, X } from "lucide-react";
import GoogleAddressInput from "@/components/GoogleAddressInput";
import { useGoogleAddressAtomContext } from "@/app/store/addressAtom";
import { MapPin } from "lucide-react";
import type { addressSelectionType } from "@/lib/types";
type PickupModalProps = {
	title?: string;
};

function AddressSelectorModal({
	title = "Add a delivery address",
}: PickupModalProps) {
	const [savedAddress, setSavedAddressState] = useState<addressSelectionType>({
		location: { lat: 6.21, lng: 6.74 },
		address: "",
		additionalDetails: "",
	});
	const [location, setLocation] = useState({ lat: 6.21, lng: 6.74 });

	const getSavedAddress = () => {
		const savedData = localStorage.getItem("selectedAddress");
		return savedData ? JSON.parse(savedData) : null;
	};

	const setSavedAddress = (addressData: addressSelectionType) => {
		localStorage.setItem("selectedAddress", JSON.stringify(addressData));
		setSavedAddressState(addressData);
	};

	// Handle confirmation action when address is confirmed
	const handleAddressConfirm = () => {
		console.log("Address confirmed");
		// close the modal
		setModalOpen(false);
		// Add any additional logic for when the address is confirmed
	};

	// Handle selection of the address to update location and state
	const handleOnSelect = (addressData: addressSelectionType) => {
		setLocation(addressData.location);
		setSavedAddress(addressData);
	};

	useEffect(() => {
		const savedData = getSavedAddress();
		if (savedData) {
			setSavedAddressState(savedData);
		}
	}, []);

	const [modalOpen, setModalOpen] = useState(false);
	return (
		<div className="relative w-full">
			<AlertDialog defaultOpen={modalOpen} open={modalOpen}>
				<AlertDialogTrigger asChild>
					<div>
						{savedAddress ? (
							<div className={`flex flex-col gap-2`}>
								<span className="text-blue-500 text-sm lg:hidden">
									Deliver Here:
								</span>
								<Button
									variant={`outline`}
									onClick={() => {
										setModalOpen(true);
									}}
									className={`pr-4 py-1 gap-x-4 w-80 lg:w-full`} // Removed `px-4`
								>
									<div className="w-full truncate flex items-center">
										<span className="text-blue-500 hidden lg:block">
											Deliver Here:
										</span>
										<span className="truncate ml-1">
											{savedAddress.address || "What's your address ?"}
										</span>
									</div>

									<ChevronDown size={`30`} className={`text-blue-500`} />
								</Button>
							</div>
						) : (
							<div className="relative mb-8 cursor-pointer">
								<Input
									onClick={() => {
										setModalOpen(true);
									}}
									type="text"
									placeholder={
										savedAddress ? savedAddress : "What's your address ?"
									}
								/>
								<Button
									variant="ghost"
									className="absolute right-0 top-0 "
									disabled
									type="button"
								>
									<MapPin />
								</Button>
							</div>
						)}
					</div>
				</AlertDialogTrigger>

				<AlertDialogContent className="h-full lg:h-[570px] max-w-4xl mx-auto px-4">
					<AlertDialogDescription>
						<span>{title}</span>
					</AlertDialogDescription>
					<button
						type="button"
						onClick={() => {
							setModalOpen(false);
						}}
						className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
					>
						<X className="w-4 h-4" />
					</button>
					<AlertDialogTitle className="text-center">
						{/*<span>{title}</span>*/}
					</AlertDialogTitle>
					<div className="absolute top-20 px-10">
						<div className="flex items-center">
							<GoogleAddressInput
								initialAddress={savedAddress?.address || ""}
								initialLocation={savedAddress?.location || location}
								onConfirm={handleAddressConfirm}
								onAddressSelect={handleOnSelect}
								getSavedAddress={getSavedAddress}
								setSavedAddress={setSavedAddress}
							/>
						</div>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default AddressSelectorModal;
