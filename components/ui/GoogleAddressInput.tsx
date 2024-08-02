import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { $axios } from "@/http/http.fn";
import { predictionJson } from "@/lib/data";
import { $api } from "@/http/endpoints";
import { set } from "date-fns";

function useDebounce(value: unknown, delay: unknown) {
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

	const fetchSuggestions = async (input) => {
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

	const handleSuggestionClick = (suggestion) => {
		setSelectedAddress(suggestion.description);
		setSuggestions([]);
	};

	return (
		<div className="relative">
			<Label htmlFor="address">Delivery address</Label>
			<Input
				id="address"
				type="text"
				placeholder="Lifecamp Road"
				className="w-full"
				value={selectedAddress}
				onChange={(e) => setSelectedAddress(e.target.value)}
			/>

			<PredicationList data={suggestions} />
		</div>
	);
}

export default GoogleAddressInput;

function PredicationList({ data }: any) {
	console.log("how come", data);
	return (
		<div>

			{
				data.predictions?.length > 0 ? (
					<div>
			{data.predictions.map((prediction: any) => (
				<div key={prediction.place_id}>
					<div>{prediction.description}</div>
					<div>{prediction.structured_formatting.secondary_text}</div>
				</div>
			))}
					</div>
				) : (
					<div>No predictions</div>
				)
			}

		</div>
	);
}
