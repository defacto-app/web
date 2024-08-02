import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { $axios } from "@/http/http.fn";

// Custom debounce hook
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
	const [selectedAddress, setSelectedAddress] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const debouncedSearchTerm = useDebounce(selectedAddress, 500); // Debounce delay of 500ms

	useEffect(() => {
		if (debouncedSearchTerm) {
			fetchSuggestions(debouncedSearchTerm);
		} else {
			setSuggestions([]);
		}
	}, [debouncedSearchTerm]);

	const fetchSuggestions = async (input) => {
		if (input.length < 3) {
			setSuggestions([]);
			return;
		}

		try {
			const response = await $axios.get('/g/google-places', {
				params: { input },
			});

			setSuggestions(response.data.predictions);
		} catch (error) {
			console.error('Error fetching suggestions:', error);
		}
	};

	return (
		<div>
			<div>
				<Label>Label: </Label>
				<Input
					type="text"
					placeholder="What's your address?"
					className="w-96"
					value={selectedAddress}
					onChange={(e) => setSelectedAddress(e.target.value)}
				/>
				{suggestions.length > 0 && (
					<ul className="suggestions-list" style={{ listStyleType: 'none', padding: 0 }}>
						{suggestions.map((suggestion) => (
							<li
								key={suggestion.place_id}
								onClick={() => {
									setSelectedAddress(suggestion.description);
									setSuggestions([]);
								}}
								style={{ cursor: 'pointer', padding: '8px 0' }}
							>
								<strong>{suggestion.structured_formatting.main_text}</strong>
								<small style={{ display: 'block', color: 'gray' }}>
									{suggestion.structured_formatting.secondary_text}
								</small>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default GoogleAddressInput;
