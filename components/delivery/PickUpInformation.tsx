"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";

import ManualAddressInput from "@/components/ManualAddressInput";
import DateTimePicker from "@/components/user/DateTimePicker";
import GoogleAutoComplete from "@/components/GoogleAutoComplete";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useAtomValue } from "jotai/index";
import { addressAtom } from "@/app/store/sendPackageAtom";
import { z } from "zod";
import { Input } from "@/components/ui/input";

export default function PickUpInformation() {
	const [date, setDate] = React.useState<Date>();
	const [dropOffAddress, setDropOffAddress] = useState("");
	const [pickupAddress, setPickupAddress] = useState("");
	const handlePickupAddressSelect = (address: string) => {
		console.log("pickup", address);
		setPickupAddress(address);
	};
	const handleDropOffAddressSelect = (address: string) => {
		setDropOffAddress(address);
	};

	const [pickupDate, setPickupDate] = React.useState<Date>(new Date());

	const handleDateSelect = (selectedDate: Date) => {
		setPickupDate(selectedDate);
	};
	const pickupDetails = useAtomValue(addressAtom);

	const schema = z.object({
		pickupAddress: z.string().email({
			message: "",
		}),
		pickupDate: z.string().min(5, {
			message: "Password must be at least 5 characters long",
		}),
	});

	return (
		<div className="container mx-auto p-2 ">
			<div className="container mx-auto px-4 ">
				<div className="py-4 bg-gray-100 px-4 rounded-lg shadow-gray-500 text-start">
					<h1 className="sm:text-xl font-semibold text-lg text-primary-600">
						Pickup Details
					</h1>
				</div>
				{/*{JSON.stringify(pickupDetails)}*/}

				<div className="mb-4 mt-4">
					<Label>Full Name</Label>
					<Input
						id="name"
						name="full-name"
						type="name"
						placeholder="e.g Olusegun Obasanjo"
						required
					/>
				</div>

				<div className="mb-4">
					<Label>Phone Number</Label>
					<div className={`flex items-center gap-x-2`}>
						<div className={`border py-2 px-3 rounded-full flex`}>
							<span>🇳🇬</span>
							<span>+234</span>
						</div>
						<Input className="md:w-full" />
					</div>
				</div>

				<div>
					<Label>Pickup Time</Label>
					<DateTimePicker
						showTimeSelect={true}
						selected={pickupDate}
						onSelect={handleDateSelect}
					/>
				</div>

				<GoogleAutoComplete />
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-2">
						<AccordionTrigger>Location Description ?</AccordionTrigger>
						<AccordionContent>
							<ManualAddressInput />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
