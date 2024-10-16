import type React from "react";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import env, { isDev } from "@/config/env";
import { $api } from "@/http/endpoints";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useGoogleAddressAtomContext } from "@/app/store/addressAtom"; // Use the Pickup Modal Context

function GoogleAddressInput() {
	const [suggestions, setSuggestions] = useState({ predictions: [] });
	const [loading, setLoading] = useState(false);
	const [searchAttempted, setSearchAttempted] = useState(false);
	const [predictionListVisible, setPredictionListVisible] = useState(false);
	const [hasSelectedAddress, setHasSelectedAddress] = useState(false);
	const [location, setLocation] = useState({ lat: 6.21, lng: 6.74 }); // Default to Asaba
	const [error, setError] = useState(""); // Error message state
	const [showMap, setShowMap] = useState(false); // State to control map display

	// Access modal state and actions from useGoogleAddressAtomContext
	const { modalOpen, setSavedAddress, openModal, handleCloseModal } =
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
		} else {
			setError("The area is not supported");
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
				<Label htmlFor="address">Delivery address</Label>
				<div className="flex items-center gap-x-2">
					<Input
						type="text"
						placeholder={isDev ? "Lifecamp Road" : "Enter your address"}
						className="w-80"
						autoComplete="off"
						value={googleAddress} // Use the saved address from context
						onChange={handleChange}
					/>
				</div>
				{predictionListVisible && (
					<section>
						{loading && <div>Loading...</div>}
						<ul className="absolute z-10 list-none bg-white  w-80 shadow-lg mt-1">
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

			{error && <div className="mt-4 text-red-500">{error}</div>}

			<div className="w-screen h-screen mt-8">
				{showMap ? (
					<APIProvider apiKey={env.google_map_api}>
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
							className="w-96 lg:w-2/5 h-1/2 lg:h-2/4"
						>
							<Marker position={location} />
						</Map>
					</APIProvider>
				) : (
					<Image
						width={600}
						height={400}
						className={`w-auto lg:w-2/5 h-1/2 lg:h-2/4`}
						src={`/blank-map.png`}
						alt="Default Map"
					/>
				)}
			</div>
		</div>
	);
}

export default GoogleAddressInput;
