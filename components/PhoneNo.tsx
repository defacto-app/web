"use client";
import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label";

const PhoneNumberValidation = () => {
	const [phoneNumber, setPhoneNumber] = useState<string>("");

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newValue = event.target.value;
		setPhoneNumber(newValue);
	}

	return (
		<div>
			<Label>Phone Number</Label>{JSON.stringify(phoneNumber)}
			<Input className="w-full" value={phoneNumber} onChange={handleChange} />
		</div>
	);
};

export default PhoneNumberValidation;
