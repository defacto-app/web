import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $api } from "@/http/endpoints";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Map } from "lucide-react";

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
	const [isPredictionVisible, setIsPredictionVisible] = useState(false);
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
			setIsPredictionVisible(false);
			return;
		}

		try {
			const response = await $api.guest.location.autocomplete(input);
			setSuggestions(response);
			setIsPredictionVisible(true);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const handleSuggestionClick = (suggestion: {
		description: React.SetStateAction<string>;
	}) => {
		setSelectedAddress(suggestion.description);
		setIsPredictionVisible(false);

		console.log("hide item here");
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
						setIsPredictionVisible(false); // Hide the prediction list
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
			<div className={`flex items-center gap-x-2`}>
				<Map className="h-6 w-6 text-gray-400" aria-hidden="true" />
				<Input
					type="text"
					placeholder="Lifecamp Road"
					className="w-80"
					value={selectedAddress}
					autoComplete="off"
					onChange={(e) => {
						setSelectedAddress(e.target.value);
						setIsPredictionVisible(true); // Show the prediction list when typing
					}}
				/>
			</div>
			{JSON.stringify(isPredictionVisible)}
			{isPredictionVisible && (
				<div className={`absolute w-96 bg-red-500 z-10`}>
					<PredictionList
						onSelection={handleSuggestionClick}
						data={suggestions}
					/>
				</div>
			)}

			<Button
				className="absolute top-40 right-0"
				onClick={() => getCurrentLocation()}
			>
				Use current location
			</Button>
		</div>
	);
}

export default GoogleAddressInput;

function PredictionList({ data, onSelection }: any) {
	const [focusedIndex, setFocusedIndex] = useState(-1);



	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLDivElement>,
		prediction: any,
		index: number,
	) => {
		if (event.key === "Enter" || event.key === " ") {
			onSelection(prediction);
		} else if (event.key === "ArrowDown") {
			setFocusedIndex((prevIndex) => (prevIndex + 1) % data.predictions.length);
		} else if (event.key === "ArrowUp") {
			setFocusedIndex(
				(prevIndex) =>
					(prevIndex - 1 + data.predictions.length) % data.predictions.length,
			);
		}
	};

	return (
		<div>
			{data.predictions?.length > 0 ? (
				<div>
					<ScrollArea className="h-72">
						{data.predictions.map((prediction: any, index: number) => (
							<div
								onClick={() => onSelection(prediction)}
								onKeyDown={(event) => handleKeyDown(event, prediction, index)}
								tabIndex={0} // Makes the div focusable
								key={prediction.place_id}
								role="button" // Indicates that this element is interactive
								style={{
									cursor: "pointer",
									backgroundColor:
										focusedIndex === index ? "#eee" : "transparent", // Highlights the focused item
								}}
							>
								{prediction.description}
							</div>
						))}
					</ScrollArea>
				</div>
			) : (
				<div>No predictions</div>
			)}
		</div>
	);
}
