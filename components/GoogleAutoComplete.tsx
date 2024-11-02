import type React from "react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import envData, { isDev } from "@/config/envData";
import { $api } from "@/http/endpoints";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useGoogleAddressAtomContext } from "@/app/store/addressAtom"; // Use the Pickup Modal Context

type GoogleAddressInputProps = {
	onAddressSelect?: (address: string) => void;
};

function GoogleAddressInput({ onAddressSelect }: GoogleAddressInputProps) {
	const [suggestions, setSuggestions] = useState({ predictions: [] });
	const [loading, setLoading] = useState(false);
	const [searchAttempted, setSearchAttempted] = useState(false);
	const [predictionListVisible, setPredictionListVisible] = useState(false);
	const [hasSelectedAddress, setHasSelectedAddress] = useState(false);
	const [location, setLocation] = useState({ lat: 6.21, lng: 6.74 }); // Default to Asaba
	const [error, setError] = useState(""); // Error message state
	const [showMap, setShowMap] = useState(false); // State to control map display

	// Access modal state and actions from useGoogleAddressAtomContext
	const { modalOpen, setSavedAddress,savedAddress, openModal, handleCloseModal } =
		useGoogleAddressAtomContext();

	const [googleAddress, setGoogleAddress] = useState(""); // Local state for input value

	// Define the geographical boundaries for Asaba
	const asabaBounds = {
		north: 6.25,
		south: 6.1,
		east: 6.8,
		west: 6.65,
	};

	// Custom hook for debouncing
	function useDebounce<T>(value: T, delay: number): T {
		const [debouncedValue, setDebouncedValue] = useState<T>(value);

		useEffect(() => {
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			return () => {
				clearTimeout(handler);
			};
		}, [value, delay]);

		return debouncedValue;
	}

	const debouncedSearchTerm = useDebounce<string>(googleAddress, 500); // Use savedAddress from context

	useEffect(() => {
		if (debouncedSearchTerm && !hasSelectedAddress) {
			fetchSuggestions(debouncedSearchTerm);
			setSearchAttempted(true);
		} else {
			setSuggestions({ predictions: [] });
			setSearchAttempted(false);
		}
	}, [debouncedSearchTerm, hasSelectedAddress]);

	const fetchSuggestions = async (input: string) => {
		setLoading(true);
		if (input.length < 3) {
			setSuggestions({ predictions: [] });
			setLoading(false);
			setPredictionListVisible(false);
			return;
		}

		try {
			const response = await $api.guest.location.autocomplete(input);
			setSuggestions(response);
			setPredictionListVisible(true);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
			setSuggestions({ predictions: [] });
			setLoading(false);
			setPredictionListVisible(false);
		}
	};

	const handleSuggestionClick = async (suggestion: any) => {
		setSavedAddress(suggestion.description); // Update the saved address in context
		setPredictionListVisible(false);
		setHasSelectedAddress(true);

		// Fetching the location details using place_id
		const locationDetails = await $api.guest.location.details(
			suggestion.place_id,
		);
		const { lat, lng } = locationDetails.result.geometry.location;
		setLocation({ lat, lng });

		setShowMap(true);

		// Check if the location is within Asaba bounds
		if (
			lat >= asabaBounds.south &&
			lat <= asabaBounds.north &&
			lng >= asabaBounds.west &&
			lng <= asabaBounds.east
		) {
			setError(""); // Clear any previous error

			// Save the selected address to sessionStorage

			const existingAddresses = JSON.parse(
				localStorage.getItem("selectedAddresses") || "[]",
			);

			existingAddresses.push(suggestion.description);
			localStorage.setItem(
				"selectedAddresses",
				JSON.stringify(existingAddresses),
			);

			handleCloseModal(); // Close the modal after selection
			if (onAddressSelect) {
				onAddressSelect(suggestion.description);
			}
		} else {
			setError("Only Areas within Asaba are supported for now");
		}
	};

	const handleChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setGoogleAddress(e.target.value); // Update the local state for input value
		if (hasSelectedAddress) {
			setHasSelectedAddress(false); // Reset selection state when user starts typing again
			setPredictionListVisible(true); // Allow showing predictions again as user types
		}
	};

	return (
		<div className="flex-col">
			<div className="relative">
				{savedAddress}
				<Label htmlFor="address">Delivery address</Label>
				<div className="flex items-center gap-x-2">
					<Input
						type="text"
						placeholder={!isDev ? "Asaba Road" : "Auto-complete address"}
						className="w-full"
						autoComplete="off"
						value={googleAddress} // Use the saved address from context
						onChange={handleChange}
					/>
				</div>
				{predictionListVisible && (
					<section>
						{loading && <div>Loading...</div>}
						<ul className="absolute z-10 list-none bg-white  w-full shadow-lg mt-1">
							{searchAttempted &&
								(suggestions.predictions.length > 0 ? (
									suggestions.predictions.map((suggestion: any) => (
										<li
											key={suggestion.place_id}
											// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
											tabIndex={0}
											className="p-2 hover:bg-gray-100 cursor-pointer"
											onClick={() => handleSuggestionClick(suggestion)}
											onKeyDown={(e) => {
												if (e.key === "Enter")
													handleSuggestionClick(suggestion);
											}}
										>
											{suggestion.description}
										</li>
									))
								) : (
									<li className="p-2">No suggestions found</li>
								))}
						</ul>
					</section>
				)}
			</div>

			{error && <div className="mt-4 text-xs text-red-500">{error}</div>}

		</div>
	);
}

export default GoogleAddressInput;
