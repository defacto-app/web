import React from "react";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Image from "next/image";
import envData from "@/config/envData";
import mapStyleJson from "../../utils/mapStyle.json";


// Custom map style (grayscale/minimalistic)
const mapStyle = [...mapStyleJson];

type DeliveryMapProps = {
	pickupLocation?: { lat: number; lng: number };
	dropOffLocation?: { lat: number; lng: number };
};

const DeliveryMap = ({ pickupLocation, dropOffLocation }: DeliveryMapProps) => {
	// Check if both locations are provided and are not { lat: 0, lng: 0 }
	const hasLocations = pickupLocation && dropOffLocation &&
		!(pickupLocation.lat === 0 && pickupLocation.lng === 0 &&
			dropOffLocation.lat === 0 && dropOffLocation.lng === 0);

	// Calculate the center point between the two locations if available
	const center = hasLocations
		? {
			lat: (pickupLocation.lat + dropOffLocation.lat) / 2,
			lng: (pickupLocation.lng + dropOffLocation.lng) / 2,
		}
		: { lat: 0, lng: 0 }; // Default center (won't be used if map isn't displayed)


	return (
		<div className="w-full mx-auto ">


			{/*{JSON.stringify({pickupLocation, dropOffLocation})}*/}
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
							icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
						/>

						{/* Display the drop-off location marker */}
						<Marker
							position={dropOffLocation}
							icon="https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
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
