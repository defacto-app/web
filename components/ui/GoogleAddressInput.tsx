import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $api } from "@/http/endpoints";
import { $axios } from "@/http/http.fn";
import { predictionJson } from "@/lib/data";
import { set } from "date-fns";
import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

function useDebounce(value: string, delay: number) {
	const [debouncedValue, setDebouncedValue] = useState(value);

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

function GoogleAddressInput() {
	const [selectedAddress, setSelectedAddress] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const debouncedSearchTerm = useDebounce(selectedAddress, 500);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (debouncedSearchTerm) {
			fetchSuggestions(debouncedSearchTerm);
		} else {
			setSuggestions([]);
		}
	}, [debouncedSearchTerm]);

	const fetchSuggestions = async (input: any) => {
		setLoading(true);
		if (input.length < 3) {
			setSuggestions([]);
			return;
		}

		try {
			const response = await $api.guest.location.autocomplete(input);

			console.log("response", response);
			setSuggestions(response);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const handleSuggestionClick = (suggestion: {
		description: React.SetStateAction<string>;
	}) => {
		setSelectedAddress(suggestion.description);
		setSuggestions([]);
	};

	const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					try {
						const response = await $api.guest.location.reverse_geocode(
							latitude,
							longitude,
						);

						setSelectedAddress(response.formatted_address);
					} catch (error) {
						console.error("Error fetching current location:", error);
					}
				},
				(error) => {
					console.error("Error getting current location:", error);
				},
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
		}
	};

	return (
		<div className="relative">
			<Label htmlFor="address">Delivery address</Label>
			<Input
				id=""
				type="text"
				placeholder="Lifecamp Road"
				className="w-full"
				value={selectedAddress}
				autoComplete="off"
				onChange={(e) => setSelectedAddress(e.target.value)}
			/>

			<PredicationList

				onSelection={handleSuggestionClick}

				data={suggestions} />

			<Button
				className="absolute top-40 right-0"
				onClick={() => getCurrentLocation("")}
			>
				Use current location
			</Button>
		</div>
	);
}

export default GoogleAddressInput;

function PredicationList({ data }: any) {
	const onSelection = (prediction: any) => {
		console.log(prediction);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, prediction: any) => {
		if (event.key === 'Enter' || event.key === ' ') {
			onSelection(prediction);
		}
	};

	return (
		<div>
			{data.predictions?.length > 0 ? (
				<div>

						{data.predictions.map((prediction: any) => (

							<div
								onClick={() => onSelection(prediction)}
								onKeyDown={(event) => handleKeyDown(event, prediction)}
								tabIndex={0} // Makes the div focusable
								key={prediction.place_id}
								role="button" // Indicates that this element is interactive
								style={{ cursor: 'pointer' }} // Optional: Changes cursor to pointer
							>
								{prediction.description}
							</div>
						))}


				</div>
			) : (
				<div>No predictions</div>
			)}
		</div>
	);
}

