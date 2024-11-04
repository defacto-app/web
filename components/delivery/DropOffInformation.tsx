"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import GoogleAutoComplete from "@/components/GoogleAutoComplete";
import { useAtom } from "jotai/index";
import { packagePayloadAtom } from "@/app/store/sendPackageAtom";

const FormSchema = z.object({
	bio: z
		.string()
		.min(10, {
			message: "Message must be at least 10 characters.",
		})
		.max(160, {
			message: "Message must not be longer than 30 characters.",
		}),
});

export default function DropOffInformation() {
	const [packagePayload, setPackagePayload] = useAtom(packagePayloadAtom);
	const [pickupDate, setPickupDate] = useState(new Date());

	const handleInputChange = (e: { target: any }) => {
		const { name, value } = e.target;
		setPackagePayload((prev) => ({
			...prev,
			receiverDetails: {
				...prev.receiverDetails,
				[name]: value,
			},
		}));
	};

	const handleDateSelect = (selectedDate: any) => {
		setPickupDate(selectedDate);
		setPackagePayload((prev) => ({
			...prev,
			receiverDetails: {
				...prev.receiverDetails,
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
						Drop off Details
					</h1>
				</div>

				<div className="mb-4 mt-4">
					<Label>Full Name</Label>
					<Input
						id="fullName"
						name="fullName"
						type="text"
						placeholder="e.g Olusegun Obasanjo"
						value={packagePayload.receiverDetails.fullName}
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
							value={packagePayload.receiverDetails.phoneNumber}
							onChange={handleInputChange}
							required
						/>
					</div>
				</div>

				<div className="mb-4">
					<Label htmlFor="address">Drop Off address</Label>

					<GoogleAutoComplete
						onAddressSelect={(address) =>
							handleInputChange({
								target: { name: "deliveryAddress", value: address },
							})
						}
					/>
				</div>

				<div>
					<Label>Address Details</Label>
					<Textarea
						placeholder={`Building, number, floor number , landmark`}
						value={packagePayload.receiverDetails.addressNotes}
					/>
				</div>
			</div>
		</div>
	);
}

// Dependencies: npm install react-aria-components
