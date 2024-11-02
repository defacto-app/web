import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { isDev } from "@/config/envData";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { manualAddressAtom, setAddressAtom } from "@/app/store/sendPackageAtom";
import { atom, useAtom, useSetAtom } from "jotai";

type ManualAddressInputProps = {
	address: {
		flat_number: string;
		floor_number: string;
		building_name: string;
		street_address: string;
		city: string;
		state: string;
		note: string;
	};
	updateAddress: (address: any) => void;
};

const ManualAddressInput = ({
	address,
	updateAddress,
}: ManualAddressInputProps) => {
	const handleChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target;
		// Update the address state with the changed field
		updateAddress({ ...address, [name]: value });
	};

	return (
		<div>
			<div className={`px-1 space-y-2`}>
				<div>
					<Label>Flat Number:</Label>
					<Input
						type="text"
						name="flat_number"
						value={address.flat_number}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Label>Floor Number:</Label>
					<Input
						type="text"
						name="floor_number"
						value={address.floor_number}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Label>Building Name:</Label>
					<Input
						type="text"
						name="building_name"
						value={address.building_name}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Label>Street Address:</Label>
					<Input
						type="text"
						name="street_address"
						value={address.street_address}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Label>City:</Label>
					<Input
						type="text"
						name="city"
						value={address.city}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Label>State:</Label>
					<Input
						type="text"
						name="state"
						value={address.state}
						onChange={handleChange}
					/>
				</div>

				<div>
					<Label>Note:</Label>
					<Textarea
						value={address.note}
						placeholder={`landmark or additional description `}
					/>
				</div>
			</div>
		</div>
	);
};

export default ManualAddressInput;
