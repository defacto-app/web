import type React from "react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import envData, { isDev } from "@/config/envData";
import { $api } from "@/http/endpoints";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { addressSelectionType } from "@/lib/types"; // Use the Pickup Modal Context

// Add this type definition at the top
type Suggestion = {
	place_id: string;
	description: string;
};

type GoogleAddressInputProps = {
	initialAddress?: string;
	initialLocation?: { lat: number; lng: number };
	onConfirm: (addressData: addressSelectionType) => void;
	getSavedAddress: () => addressSelectionType;
	setSavedAddress: (data: addressSelectionType) => void;
};
function GoogleAddressInput({
	onConfirm,
	getSavedAddress,
	setSavedAddress,
}: GoogleAddressInputProps) {
	const [suggestions, setSuggestions] = useState({ predictions: [] });
	const [loading, setLoading] = useState(false);
	const [searchAttempted, setSearchAttempted] = useState(false);
	const [predictionListVisible, setPredictionListVisible] = useState(false);
	const [hasSelectedAddress, setHasSelectedAddress] = useState(false);
	const [location, setLocation] = useState({ lat: 6.21, lng: 6.74 }); // Default to Asaba
	const [error, setError] = useState(""); // Error message state
	const [showMap, setShowMap] = useState(false); // State to control map display
	const [additionalDetails, setAdditionalDetails] = useState(""); // State for additional address details
	const [googleAddress, setGoogleAddress] = useState(""); // Local state for input value

	// Define the geographical boundaries for Asaba
	const asabaBounds = {
		north: 6.25,
		south: 6.1,
		east: 6.8,
		west: 6.65,
	};
	// Access modal state and actions from useGoogleAddressAtomContext

	useEffect(() => {
		const savedData = getSavedAddress();
		if (savedData) {
			setGoogleAddress(savedData.address || "");
			setAdditionalDetails(savedData.additionalDetails || "");
			setLocation(savedData.location);
			setHasSelectedAddress(!!savedData.address);
			setShowMap(!!savedData.location);
		}
	}, [getSavedAddress]);
	// Modified useEffect for loading saved address

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

	const handleSuggestionClick = async (suggestion: Suggestion) => {
		setGoogleAddress(suggestion.description);

		setPredictionListVisible(false);
		setHasSelectedAddress(true);

		const locationDetails = await $api.guest.location.details(
			suggestion.place_id,
		);
		const { lat, lng } = locationDetails.result.geometry.location;
		setLocation({ lat, lng });
		setShowMap(true);

		if (
			lat >= asabaBounds.south &&
			lat <= asabaBounds.north &&
			lng >= asabaBounds.west &&
			lng <= asabaBounds.east
		) {
			setError("");
		} else {
			setError("The area is not supported");
		}
	};

	const handleAdditionalDetailsChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setAdditionalDetails(e.target.value); // Update the state for additional address details
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

	const confirmSelection = () => {
		if (!googleAddress) {
			setError("Please enter your address");
			return;
		}

		if (!hasSelectedAddress) {
			setError("Please select an address from the suggestions");
			return;
		}



		// Store full data in localStorage
		const addressData = {
			address: googleAddress,
			additionalDetails: additionalDetails,
			location: location,
		};

		setSavedAddress(addressData);

		onConfirm(addressData);
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-5 gap-x-4">
			<div className="lg:col-span-2">
				<div>
					<div className="relative">
						<Label htmlFor="address">Delivery address</Label>
						<div className="flex items-center gap-x-2">
							<Input
								type="text"
								placeholder={"Search for street address"}
								className="w-80 md:w-full"
								autoComplete="off"
								value={googleAddress} // Use the saved address from context
								onChange={handleChange}
							/>
						</div>
						{predictionListVisible && (
							<section>
								{loading && <div>Loading...</div>}
								<ul className="absolute z-10 list-none bg-white  w-80 md:w-full shadow-lg mt-1">
									{searchAttempted &&
										(suggestions.predictions.length > 0 ? (
											suggestions.predictions.map((suggestion: any) => (
												<li
													key={suggestion.place_id}
													// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
													tabIndex={0}
													className="p-2 hover:bg-gray-100 cursor-pointer text-xs"
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

					{error && (
						<div className="mt-2 text-red-500 text-xs pb-4">{error}</div>
					)}
				</div>

				<div>
					<Label>Additional Address Details</Label>
					<Textarea
						value={additionalDetails}
						onChange={handleAdditionalDetailsChange}
						cols={3}
					/>
				</div>
			</div>

			<div className="lg:col-span-3 mt-4 lg:mt-0">
				<div className="w-full max-w-xs lg:max-w-lg mx-auto">
					{showMap ? (
						<APIProvider apiKey={envData.google_map_api}>
							<Map
								key={`${location.lat}-${location.lng}`} // Changing key forces re-render
								center={location}
								zoom={15}
								gestureHandling={"auto"}
								zoomControl={false}
								streetViewControl={false}
								mapTypeControl={false}
								fullscreenControl={false}
								scrollwheel={false}
								className="w-80  md:w-[500px] h-48 lg:h-64 object-cover"
							>
								<Marker position={location} />
							</Map>
						</APIProvider>
					) : (
						<Image
							width={600}
							height={400}
							className=" h-full object-cover rounded-lg"
							src={`/blank-map.png`}
							alt="Default Map"
						/>
					)}
				</div>

				<Button
					onClick={confirmSelection}
					variant={`primary`}
					className={`mt-4`}
					disabled={error !== "" || !googleAddress || !hasSelectedAddress}
				>
					Confirm Address
				</Button>
			</div>
		</div>
	);
}

export default GoogleAddressInput;
