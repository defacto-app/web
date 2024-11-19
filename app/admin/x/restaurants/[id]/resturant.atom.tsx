import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { $admin_api } from "@/http/admin-endpoint";

// Define the restaurant type
type restaurantType = {
	name: string;
	description?: string;
	location?: string;
	image: "";
	deliveryTime?: string;
	category?: string;
	address?: string;
	phone?: string;
	email?: string;
	openingHours?: string;
	publicId: string;
	createdAt: string;
	updatedAt: string;
};

// Atoms for restaurant state management using Jotai
export const restaurantAtom = atom<any>({
	name: "",
	description: "",
	location: "",
	image: "",
	deliveryTime: "",
	category: "",
	address: "",
	phone: "",
	email: "",
	openingHours: "",
	publicId: "",
	createdAt: "",
	updatedAt: "",
});

export const loadingAtom = atom<boolean>(true);

export const errorAtom = atom<string | null>(null);

// Hook to use restaurant state
export const useAtomRestaurantContext = () => {
	const restaurant = useAtomValue(restaurantAtom);
	const loading = useAtomValue(loadingAtom);
	const error = useAtomValue(errorAtom);

	const setRestaurant = useSetAtom(restaurantAtom);
	const setLoading = useSetAtom(loadingAtom);
	const setError = useSetAtom(errorAtom);

	// Memoize the getRestaurant function to prevent recreation on every render
	const getRestaurant = useCallback(
		async (id: string) => {
			setLoading(true);
			setError(null); // Reset error before fetching new data

			try {
				const response = await $admin_api.restaurants.one(id);
				setRestaurant(response.data.data); // Set the restaurant data
			} catch (error: any) {
				setError(error.message || "An error occurred while fetching the data");
			} finally {
				setLoading(false); // Turn off loading
			}
		},
		[setRestaurant, setLoading, setError],
	);

	return {
		restaurant,
		loading,
		error,
		getRestaurant,
	};
};
