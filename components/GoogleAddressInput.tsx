import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { isDev } from "@/config/env";
import { $api } from "@/http/endpoints";

function GoogleAddressInput() {
    const [selectedAddress, setSelectedAddress] = useState("");
    const [suggestions, setSuggestions] = useState({ predictions: [] });
    const [loading, setLoading] = useState(false);
    const [searchAttempted, setSearchAttempted] = useState(false);
    const [predictionListVisible, setPredictionListVisible] = useState(false);
    const [hasSelectedAddress, setHasSelectedAddress] = useState(false);

    // Custom hook for debouncing
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

    const debouncedSearchTerm = useDebounce(selectedAddress, 500);

    useEffect(() => {
        if (debouncedSearchTerm && !hasSelectedAddress) {
            fetchSuggestions(debouncedSearchTerm);
            setSearchAttempted(true);
        } else {
            setSuggestions({ predictions: [] });
            setSearchAttempted(false);
        }
    }, [debouncedSearchTerm, hasSelectedAddress]);

    const fetchSuggestions = async (input) => {
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

    const handleSuggestionClick = (suggestion) => {
        setSelectedAddress(suggestion.description);
        setPredictionListVisible(false);
        setHasSelectedAddress(true);
    };

    const handleChange = (e) => {
        setSelectedAddress(e.target.value);
        if (hasSelectedAddress) {
            setHasSelectedAddress(false);  // Reset selection state when user starts typing again
            setPredictionListVisible(true);  // Allow showing predictions again as user types
        }
    };

    return (
        <div>
            <div className="relative">
                <Label htmlFor="address">Delivery address</Label>
                <div className={`flex items-center gap-x-2`}>
                    <Map className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    <Input
                        type="text"
                        placeholder={isDev ? "Lifecamp Road" : "Enter your address"}
                        className="w-80"
                        autoComplete="off"
                        value={selectedAddress}
                        onChange={handleChange}
                    />
                </div>
                {predictionListVisible && (
                    <section>
                        {loading && <div>Loading...</div>}
                        <ul className="absolute z-10 list-none bg-white w-full shadow-lg mt-1">
                            {searchAttempted && (suggestions.predictions.length > 0 ? (
                                suggestions.predictions.map((suggestion) => (
                                    <li
                                        key={suggestion.id}
                                        tabIndex="0"  // Make the element focusable
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSuggestionClick(suggestion);
                                        }} // Handle Enter key press
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
        </div>
    );
}

export default GoogleAddressInput;
