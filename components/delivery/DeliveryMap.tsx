import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import envData from "@/config/envData";
import mapStyleJson from "../../utils/mapStyle.json";

const mapContainerStyle = {
	width: "100%",
	height: "400px",
};

// Custom map style (grayscale/minimalistic)
const mapStyle = [...mapStyleJson];

type DeliveryMapProps = {
	pickupLocation?: { lat: number; lng: number };
	dropOffLocation?: { lat: number; lng: number };
};

const DeliveryMap = ({ pickupLocation, dropOffLocation }: DeliveryMapProps) => {
	// Check if both locations are provided
	const hasLocations = pickupLocation && dropOffLocation;

	// Calculate the center point between the two locations if available
	const center = hasLocations
		? {
			lat: (pickupLocation.lat + dropOffLocation.lat) / 2,
			lng: (pickupLocation.lng + dropOffLocation.lng) / 2,
		}
		: { lat: 0, lng: 0 }; // Default center (won't be used if map isn't displayed)

	// @ts-ignore
	// @ts-ignore
	return (
		<div className="w-full mx-auto ">

			{JSON.stringify({pickupLocation, dropOffLocation})}
			{hasLocations ? (
				<APIProvider apiKey={envData.google_map_api}>
					<Map
						center={center}
						zoom={13}
						styles={mapStyle}
						gestureHandling="auto"
						zoomControl={false}
						streetViewControl={false}
						mapTypeControl={false}
						fullscreenControl={true}
						scrollwheel={false}
						className="w-full h-64 object-cover"
					>
						{/* Display the pickup location marker */}
						<Marker
							position={pickupLocation}
							icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
						/>

						{/* Display the drop-off location marker */}
						<Marker
							position={dropOffLocation}
							icon="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
						/>
					</Map>
				</APIProvider>
			) : (
				<Image
					width={600}
					height={400}
					className="h-96 w-full object-cover rounded-lg"
					src={`/blank-map.png`}
					alt="Default Map"
				/>
			)}
		</div>
	);
};

export default DeliveryMap;
