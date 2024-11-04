"use client";
import React, {useEffect, useState} from "react";
import { Label } from "@/components/ui/label";
import DateTimePicker from "@/components/user/DateTimePicker";
import GoogleAutoComplete from "@/components/GoogleAutoComplete";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useAtom } from "jotai";
import { packagePayloadAtom, manualAddressAtom } from "@/app/store/sendPackageAtom";
import { Input } from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

export default function PickUpInformation() {
	const [packagePayload, setPackagePayload] = useAtom(packagePayloadAtom);
	const [pickupDate, setPickupDate] = useState(new Date());

	const handleInputChange = (e: { target: any; }) => {
		const { name, value } = e.target;
		setPackagePayload((prev) => ({
			...prev,
			senderDetails: {
				...prev.senderDetails,
				[name]: value,
			},
		}));
	};

	const handleDateSelect = (selectedDate:any) => {
		setPickupDate(selectedDate);
		setPackagePayload((prev) => ({
			...prev,
			senderDetails: {
				...prev.senderDetails,
				pickupTime: selectedDate,
			},
		}));
	};



	useEffect(() => {
		console.log(packagePayload);
	}, [packagePayload]);

	return (
		<div className="container mx-auto p-2 ">
			<div className="container mx-auto px-4 ">
				<div className="py-4 bg-gray-100 px-4 rounded-lg shadow-gray-500 text-start">
					<h1 className="sm:text-xl font-semibold text-lg text-primary-600">
						Pickup Details
					</h1>
				</div>

				<div className="mb-4 mt-4">
					<Label>Full Name</Label>
					<Input
						id="fullName"
						name="fullName"
						type="text"
						placeholder="e.g Olusegun Obasanjo"
						value={packagePayload.senderDetails.fullName}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className="mb-4">
					<Label>Phone Number</Label>
					<div className="flex items-center gap-x-2">
						<div className="border py-2 px-3 rounded-full flex">
							<span>🇳🇬</span>
							<span>+234</span>
						</div>
						<Input
							name="phoneNumber"
							type="tel"
							placeholder="Enter phone number"
							value={packagePayload.senderDetails.phoneNumber}
							onChange={handleInputChange}
							required
						/>
					</div>
				</div>

				<div className="mb-4">
					<Label>Pickup Time</Label>
					<DateTimePicker
						showTimeSelect={true}
						selected={pickupDate}
						onSelect={handleDateSelect}
					/>
				</div>

				<div className="mb-4">
					<Label htmlFor="address">Pickup address</Label>

					<GoogleAutoComplete
						onAddressSelect={(address) => handleInputChange({
							target: {name: "deliveryAddress", value: address}
						})}
					/>
				</div>

				<div>
					<Label>
						Address Details
					</Label>
					<Textarea placeholder={`Building, number, floor number , landmark`}
							  value={packagePayload.receiverDetails.addressNotes}/>
				</div>


			</div>
		</div>
	);
}
