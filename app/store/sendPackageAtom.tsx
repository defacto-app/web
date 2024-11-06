import { atom } from "jotai";

export const manualAddressAtom = atom({
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
	senderDetails: {
		pickupTime: null,
		deliveryAddress: "",
		deliveryNote: "",
		addressNotes: "",
	},
	receiverDetails: {
		fullName: "",
		phoneNumber: "",
		deliveryNote: "",
		addressNotes: "",
	},
});

export const setAddressAtom = atom(null, (get, set, updatedAddress) => {
	if (typeof updatedAddress === "object" && updatedAddress !== null) {
		set(manualAddressAtom, { ...get(manualAddressAtom), ...updatedAddress });
	} else {
		console.error("Updated address must be an object");
	}
});
