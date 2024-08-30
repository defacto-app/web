import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $api } from "@/http/endpoints";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Map } from "lucide-react";

function useDebounce(value, delay) {
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
			setIsPredictionVisible(false);
		}
	}, [debouncedSearchTerm]);

	const fetchSuggestions = async (input) => {
		setLoading(true);
		if (input.length < 3) {
			setSuggestions([]);
			setIsPredictionVisible(false);
			setLoading(false);
			return;
		}

		try {
			const response = await $api.guest.location.autocomplete(input);
			setSuggestions(response);
			setIsPredictionVisible(true);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSuggestionClick = (suggestion) => {
		setSelectedAddress(suggestion.description);
		setIsPredictionVisible(false);
	};

	const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					const { latitude, longitude } = position.coords;
					try {
						const response = await $api.guest.location.reverse_geocode(latitude, longitude);
						setSelectedAddress(response.formatted_address);
						setIsPredictionVisible(false);
					} catch (error) {
						console.error("Error fetching current location:", error);
					}
				},
				(error) => {
					console.error("Error getting current location:", error);
				}
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
						setIsPredictionVisible(true);
					}}
					onBlur={() => {
						// Delay hiding predictions to allow click events to fire
						setTimeout(() => setIsPredictionVisible(false), 200);
					}}
				/>
			</div>
			{isPredictionVisible && !loading && (
				<div className={`absolute w-96 bg-white z-10 border border-gray-200 rounded-md shadow-lg`}>
					<PredictionList
						onSelection={handleSuggestionClick}
						data={suggestions}
						setIsPredictionVisible={setIsPredictionVisible}
					/>
				</div>
			)}
			<Button className="mt-2" onClick={getCurrentLocation}>
				Use current location
			</Button>
		</div>
	);
}

function PredictionList({ data, onSelection, setIsPredictionVisible }) {
	const [focusedIndex, setFocusedIndex] = useState(-1);

	const handleKeyDown = (event, prediction, index) => {
		if (event.key === "Enter" || event.key === " ") {
			onSelection(prediction);
			setIsPredictionVisible(false);
		} else if (event.key === "ArrowDown") {
			setFocusedIndex((prevIndex) => (prevIndex + 1) % data.predictions.length);
		} else if (event.key === "ArrowUp") {
			setFocusedIndex((prevIndex) => (prevIndex - 1 + data.predictions.length) % data.predictions.length);
		}
	};

	return (
		<ScrollArea className="h-72">
			{data.predictions?.length > 0 ? (
				data.predictions.map((prediction, index) => (
					<div
						onClick={() => {
							onSelection(prediction);
							setIsPredictionVisible(false);
						}}
						onKeyDown={(event) => handleKeyDown(event, prediction, index)}
						tabIndex={0}
						key={prediction.place_id}
						role="button"
						className={`p-2 hover:bg-gray-100 cursor-pointer ${
							focusedIndex === index ? "bg-gray-100" : ""
						}`}
					>
						{prediction.description}
					</div>
				))
			) : (
				<div className="p-2">No predictions</div>
			)}
		</ScrollArea>
	);
}

export default GoogleAddressInput;