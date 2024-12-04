import type React from "react";
import { useEffect, useRef } from "react";
import type { addressSelectionType } from "@/lib/types";
import { Label } from "@/components/ui/label";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import GoogleAddressInput from "@/components/GoogleAddressInput";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import envData from "@/config/envData";
import { useAtom } from "jotai/index";
import { checkoutPayloadAtom } from "@/app/store/restaurantOrderAtom";
import { isValidCoordinates } from "@/utils";
import MarkerOptions = google.maps.MarkerOptions;

export const CheckOutDropOffAddress = ({
	payload,
	setDropOffModalOpen,
	dropOffModalOpen,
	handleDropOffAddressConfirm,
	getSavedDropOffAddress,
	setDropOffAddress,
	label = "Drop-Off Address",
}: {
	payload: any;
	label?: string;
	setDropOffModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dropOffModalOpen: boolean;
	handleDropOffAddressConfirm: (addressData: addressSelectionType) => void;
	getSavedDropOffAddress: () => addressSelectionType | null;
	setDropOffAddress: (addressData: addressSelectionType) => void;
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (dropOffModalOpen && inputRef.current) {
			// Short delay to ensure modal is fully rendered
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [dropOffModalOpen]);


	return (
		<div className="mb-4">


			<div>
				<div className="lg:col-span-3 mt-4 lg:mt-0">
					<div className="w-full max-w-xs lg:max-w-lg mx-auto">
						{isValidCoordinates(payload.dropOffDetails.address.location) ? (
							<APIProvider apiKey={envData.google_map_api}>
								<Map
									key={`${payload.dropOffDetails.address.location.lat}-${payload.dropOffDetails.address.location.lng}`}
									center={payload.dropOffDetails.address.location}
									zoom={15}
									gestureHandling={"auto"}
									zoomControl={false}
									streetViewControl={false}
									mapTypeControl={false}
									fullscreenControl={false}
									scrollwheel={false}
									className="w-80 md:w-[500px] h-48 lg:h-64 object-cover"
								>
									<Marker
										position={payload.dropOffDetails.address.location}
										icon="https://maps.google.com/mapfiles/ms/icons/green-dot.png"
									/>
								</Map>
							</APIProvider>
						) : (
							<Image
								width={600}
								height={400}
								className="h-full object-cover rounded-lg"
								src={`/blank-map.png`}
								alt="Default Map"
							/>
						)}
					</div>
				</div>
			</div>

			<Label htmlFor="dropOffAddress" className={`ml-5`}>
				{label}
			</Label>

			<AlertDialog defaultOpen={dropOffModalOpen} open={dropOffModalOpen}>
				<AlertDialogTrigger asChild>
					<div
						onClick={() => setDropOffModalOpen(true)}
						onKeyUp={(e) => e.key === "Enter" && setDropOffModalOpen(true)}
						className={`flex items-center cursor-pointer`}
						// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
						tabIndex={0}
					>
						<Image
							alt={`start point`}
							width={20}
							height={20}
							src={"https://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
						/>
						<Input
							readOnly={true}
							variant="line"
							className="text-left cursor-pointer"
							onClick={() => setDropOffModalOpen(true)}
							value={payload.dropOffDetails.address.address}
						/>
					</div>
				</AlertDialogTrigger>

				<AlertDialogContent className="h-full lg:h-[570px] max-w-4xl mx-auto px-4">
					<AlertDialogTitle>Choose Drop-Off Address</AlertDialogTitle>

					<button
						type="button"
						onClick={() => setDropOffModalOpen(false)}
						className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
					>
						<X className="w-4 h-4" />
					</button>

					<div className="mt-8">
						<GoogleAddressInput
							initialAddress={payload.dropOffDetails.address.address}
							initialLocation={payload.dropOffDetails.address.location}
							onConfirm={handleDropOffAddressConfirm}
							getSavedAddress={getSavedDropOffAddress}
							setSavedAddress={setDropOffAddress}
						/>
					</div>

					<AlertDialogDescription />
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default CheckOutDropOffAddress;
