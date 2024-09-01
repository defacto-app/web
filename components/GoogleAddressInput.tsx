import React, {useEffect, useState} from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import env, {isDev} from '@/config/env';
import {$api} from '@/http/endpoints';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

function GoogleAddressInput() {
    const [selectedAddress, setSelectedAddress] = useState("");
    const [suggestions, setSuggestions] = useState({predictions: []});
    const [loading, setLoading] = useState(false);
    const [searchAttempted, setSearchAttempted] = useState(false);
    const [predictionListVisible, setPredictionListVisible] = useState(false);
    const [hasSelectedAddress, setHasSelectedAddress] = useState(false);
    const [location, setLocation] = useState({lat: 6.210, lng: 6.740}); // Default to Asaba
    const [error, setError] = useState("");  // Error message state
    const [showMap, setShowMap] = useState(false);  // State to control map display

    // Define the geographical boundaries for Asaba
    const asabaBounds = {
        north: 6.250,
        south: 6.100,
        east: 6.800,
        west: 6.650
    };

    // Custom hook for debouncing
    function useDebounce(value: any, delay: any) {
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
            setSuggestions({predictions: []});
            setSearchAttempted(false);
        }
    }, [debouncedSearchTerm, hasSelectedAddress]);

    const fetchSuggestions = async (input: string | any[]) => {
        setLoading(true);
        if (input.length < 3) {
            setSuggestions({predictions: []});
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
            setSuggestions({predictions: []});
            setLoading(false);
            setPredictionListVisible(false);
        }
    };

    const handleSuggestionClick = async (suggestion: any) => {
        setSelectedAddress(suggestion.description);
        setPredictionListVisible(false);
        setHasSelectedAddress(true);

        // Fetching the location details using place_id
        const locationDetails = await $api.guest.location.details(suggestion.place_id);
        const {lat, lng} = locationDetails.result.geometry.location;

        // Check if the location is within Asaba bounds
        if (lat >= asabaBounds.south && lat <= asabaBounds.north && lng >= asabaBounds.west && lng <= asabaBounds.east) {
            setLocation({lat, lng});
            setError("");  // Clear any previous error
            setShowMap(true);  // Show the map once a valid location is selected
        } else {
            setError("The area is not supported");
            setShowMap(false);  // Hide the map if the location is not supported
        }
    };

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedAddress(e.target.value);
        if (hasSelectedAddress) {
            setHasSelectedAddress(false);  // Reset selection state when user starts typing again
            setPredictionListVisible(true);  // Allow showing predictions again as user types
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
                        value={selectedAddress}
                        onChange={handleChange}
                    />
                </div>
                {predictionListVisible && (
                    <section>
                        {loading && <div>Loading...</div>}
                        <ul className="absolute z-10 list-none bg-white w-full shadow-lg mt-1">
                            {searchAttempted && (suggestions.predictions.length > 0 ? (
                                suggestions.predictions.map((suggestion: any) => (
                                    <li
                                        key={suggestion.place_id}
                                        tabIndex={0}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSuggestionClick(suggestion);
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
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}

            <div className="w-[700px] mt-8">
                {showMap ? (
                    <APIProvider apiKey={env.google_map_api}>
                        <Map
                            key={`${location.lat}-${location.lng}`}  // Changing key forces re-render
                            style={{height: '40vh'}}
                            center={location}
                            zoom={15}
                            gestureHandling={'auto'}
                            zoomControl={false}
                            streetViewControl={false}
                            mapTypeControl={false}
                            fullscreenControl={false}
                            scrollwheel={false}

                        >
                            <Marker position={location}/>
                        </Map>
                    </APIProvider>
                ) : (
                    <img src={`blank-map.jpg`} alt="Default Map" style={{height: '40vh', width: '100%'}}/>
                )}
            </div>
        </div>
    );
}

export default GoogleAddressInput;
