import { atom, useSetAtom } from 'jotai';

// Types
interface Location {
    lat: number;
    lng: number;
}

interface AddressDetails {
    address: string;
    additionalDetails: string;
    location: Location;
}

interface DropOffDetails {
    address: AddressDetails;
    name: string;
    phone: string;
    email: string;
}

interface CheckoutPayload {
    pickupDate: Date;
    dropOffDetails: DropOffDetails;
    notes: string;
}

// Initial State
const initialDropOffDetails: DropOffDetails = {
    address: {
        address: "",
        additionalDetails: "",
        location: { lat: 0, lng: 0 },
    },
    name: "",
    phone: "",
    email: "",
};

const initialPayload: CheckoutPayload = {
    pickupDate: new Date(),
    dropOffDetails: initialDropOffDetails,
    notes: "",
};

// Atoms
export const checkoutPayloadAtom = atom<CheckoutPayload>(initialPayload);
export const dropOffModalAtom = atom<boolean>(false);

// Get saved drop off address
export const getSavedDropOffAddressAtom = atom((get) => {
    if (typeof window === 'undefined') return null;

    const savedData = localStorage.getItem("selectedAddress");
    return savedData ? JSON.parse(savedData) : null;
});
// Action Atoms
export const updateNotesAtom = atom(
    null,
    (get, set, notes: string) => {
        const currentPayload = get(checkoutPayloadAtom);
        set(checkoutPayloadAtom, { ...currentPayload, notes });
    }
);

export const setDropOffAddressAtom = atom(
    null,
    (get, set, addressData: AddressDetails) => {
        const currentPayload = get(checkoutPayloadAtom);

        // Update local storage
        localStorage.setItem(
            "selectedAddress",
            JSON.stringify(addressData)
        );

        // Update state
        set(checkoutPayloadAtom, {
            ...currentPayload,
            dropOffDetails: {
                ...currentPayload.dropOffDetails,
                address: addressData,
            },
        });
    }
);

// Custom hook for checkout operations
export const useCheckout = () => {
    const savedDropOffAddress = () => {
        if (typeof window === 'undefined') return null;
        const savedData = localStorage.getItem("selectedAddress");
        try {
            return savedData ? JSON.parse(savedData) : null;
        } catch (error) {
            console.error("Failed to parse saved address:", error);
            return null;
        }
    };


    const setCheckoutPayload = useSetAtom(checkoutPayloadAtom);

    const initializeCheckout = () => {
        const saved = savedDropOffAddress();
        if (saved) {
            setCheckoutPayload((prevPayload) => ({
                ...prevPayload,
                dropOffDetails: {
                    ...prevPayload.dropOffDetails,
                    address: saved,
                },
            }));
        }
    };
    const getSavedDropOffAddress = () => {
        if (typeof window === 'undefined') return null;
        const savedData = localStorage.getItem("selectedAddress");
        return savedData ? JSON.parse(savedData) : null;
    };


    return {
        initializeCheckout,
        savedDropOffAddress,
        getSavedDropOffAddress,
    };
};