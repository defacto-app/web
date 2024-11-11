import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import envData from "@/config/envData";

const mapContainerStyle = {
	width: "100%",
	height: "400px",
};

// Define the two locations
const pickupLocation = { lat: 6.207420099999999, lng: 6.6608866 };
const dropOffLocation = { lat: 6.226404499999999, lng: 6.7034341 };

const DeliveryMap = () => {
	// Calculate the center point between the two locations
	const center = {
		lat: (pickupLocation.lat + dropOffLocation.lat) / 2,
		lng: (pickupLocation.lng + dropOffLocation.lng) / 2,
	};

	return (
		<div className="w-full   mx-auto bg-green-500">
			<APIProvider apiKey={envData.google_map_api}>
				<Map
					center={center} // Center the map between the two points
					zoom={13} // Adjust zoom level as needed
					style={mapContainerStyle}
					gestureHandling="auto"
					zoomControl={false}
					streetViewControl={false}
					mapTypeControl={false}
					fullscreenControl={true}
					scrollwheel={true}
					className="w-full h-64 object-cover"
				>
					{/* Display the pickup location marker */}
					<Marker position={pickupLocation} />

					{/* Display the drop-off location marker */}
					<Marker position={dropOffLocation} />
				</Map>
			</APIProvider>
		</div>
	);
};

export default DeliveryMap;
