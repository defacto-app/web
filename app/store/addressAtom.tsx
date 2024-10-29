// atoms/pickupModalAtoms.ts
import { useAtomValue, useSetAtom, atom } from "jotai";
import { useCallback } from "react";

// Define the atom to manage modal open/close state
export const modalOpenAtom = atom<boolean>(false);

// Atom for managing saved address
export const savedAddressAtom = atom<string>("");

// Create an atom for handling `handleOnSelect` logic
export const handleOnSelectAtom = atom(
	null,
	(get, set, lastAddress: string) => {
		// Check if window and localStorage are available
		if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
			const selectedAddresses = JSON.parse(
				localStorage.getItem("selectedAddresses") || "[]"
			);
			const lastSavedAddress =
				selectedAddresses.length > 0
					? selectedAddresses[selectedAddresses.length - 1]
					: "";
			set(savedAddressAtom, lastAddress || lastSavedAddress);
		}
	},
);

// Create an atom to reset the modal (when closing, etc.)
export const resetModalAtom = atom(null, (get, set) => {
	set(modalOpenAtom, false); // Close modal
	// set(savedAddressAtom, ""); // Clear saved address
});

// hooks/useGoogleAddressAtomContext.ts

export const useGoogleAddressAtomContext = () => {
	// Read-only atom values
	const modalOpen = useAtomValue(modalOpenAtom);
	const savedAddress = useAtomValue(savedAddressAtom);



	// Setters (write atoms)
	const setModalOpen = useSetAtom(modalOpenAtom);
	const setSavedAddress = useSetAtom(savedAddressAtom);
	const handleOnSelect = useSetAtom(handleOnSelectAtom);
	const resetModal = useSetAtom(resetModalAtom);

	// Close the modal and update address
	const handleCloseModal = useCallback(() => {
		resetModal();
	}, [resetModal]);

	// Open the modal and clear the saved address
	const openModal = useCallback(() => {
		// Ensure window and localStorage are available before clearing the saved address
		if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
			setModalOpen(true);
		}
	}, [setModalOpen, setSavedAddress]);


	return {
		modalOpen,
		savedAddress,
		setModalOpen,
		setSavedAddress,
		handleOnSelect,
		handleCloseModal,
		openModal,
	};
};
