import { atom } from "jotai";

export const addressAtom = atom({
	flat_number: "",
	floor_number: "",
	building_name: "",
	street_address: "",
	city: "Asaba",
	state: "Delta",
	postal_code: "",
	note: "",
});

export const packagePayloadAtom = atom({
	packageType: "",
	weight: "",
	description: "",
	price: "",
	senderDetails: {},
	receiverDetails: {},
});

// Setter atom to update the address state from anywhere
export const setAddressAtom = atom(null, (get, set, updatedAddress) => {
	if (typeof updatedAddress === 'object' && updatedAddress !== null) {
		set(addressAtom, { ...get(addressAtom), ...updatedAddress });
	} else {
		console.error("Updated address must be an object");
	}
});