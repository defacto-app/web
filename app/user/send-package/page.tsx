"use client";
import DropOffInformation from "@/components/delivery/DropOffInformation";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DateTimePicker from "@/components/user/DateTimePicker";
import GoogleAutoComplete from "@/components/GoogleAutoComplete";
import { useAtom } from "jotai/index";
import {distanceAtom, packagePayloadAtom} from "@/app/store/sendPackageAtom";
import GoogleAddressInput from "@/components/GoogleAddressInput";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogAction,
	AlertDialogFooter,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Page() {
	const [packagePayload, setPackagePayload] = useAtom(packagePayloadAtom);
	const [pickupDate, setPickupDate] = useState(new Date());

	const [modalOpen, setModalOpen] = useState(false);

	const handleInputChange = (e: { target: any }) => {
		const { name, value } = e.target;
		setPackagePayload((prev) => ({
			...prev,
			senderDetails: {
				...prev.senderDetails,
				[name]: value,
			},
		}));
	};



	const handleDateSelect = (selectedDate: any) => {
		setPickupDate(selectedDate);
		setPackagePayload((prev) => ({
			...prev,
			senderDetails: {
				...prev.senderDetails,
				pickupTime: selectedDate,
			},
		}));
	};

	const setPickupAddress = (address: {
		address: string;
		additionalDetails: string;
		location: { lat: number; lng: number };
	}) => {
		setPackagePayload((prev) => ({
			...prev,
			senderDetails: {
				...prev.senderDetails,
				address: {
					address: address.address,
					additionalDetails: address.additionalDetails,
					location: address.location,
				},
			},
		}));
	};


	const setDropOffAddress = (address: {
		address: string;
		additionalDetails: string;
		location: { lat: number; lng: number };
	}) => {
		setPackagePayload((prev) => ({
			...prev,
			receiverDetails: {
				...prev.receiverDetails,
				address: {
					address: address.address,
					additionalDetails: address.additionalDetails,
					location: address.location,
				},
			},
		}));
	}



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
										value={packagePayload.description}
									/>
								</div>

								<div>
									<Label>Pickup Time</Label>
									<DateTimePicker
										showTimeSelect={true}
										selected={pickupDate}
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
													onAddressSelect={setPickupAddress}
													shouldSaveToLocalStorage={false} // Set to false for pickup/drop-off where you don't want to save
												/>
											</div>
										</AlertDialogContent>
									</AlertDialog>
								</div>

								<div className="mb-4">
									<Label htmlFor="address">Drop Off address</Label>

									<AlertDialog defaultOpen={modalOpen} open={modalOpen}>
										<AlertDialogTrigger asChild>
											<div>
												<Input
													onClick={() => setModalOpen(true)}
													value={packagePayload.senderDetails.address.address}
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
													onAddressSelect={setDropOffAddress}
													shouldSaveToLocalStorage={false} // Set to false for pickup/drop-off where you don't want to save
												/>
											</div>
										</AlertDialogContent>
									</AlertDialog>
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


type ReusableAlertDialogProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	trigger: React.ReactNode;
};

const ReusableAlertDialog: React.FC<ReusableAlertDialogProps> = ({ open, onClose, children, trigger }) => {
	return (
			<AlertDialog defaultOpen={open} open={open}>
					<AlertDialogTrigger asChild>
							{trigger}
					</AlertDialogTrigger>
					<AlertDialogContent className="h-full lg:h-[570px] max-w-4xl mx-auto px-4">
							<button
									type="button"
									onClick={onClose}
									className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
							>
									<X className="w-4 h-4" />
							</button>
							<div className={`mt-8`}>
									{children}
							</div>
					</AlertDialogContent>
			</AlertDialog>
	);
};