import type { addressSelectionType, DeliveryPayloadType } from "@/lib/types";
import type React from "react";
import { useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Pencil, X } from "lucide-react";
import GoogleAddressInput from "@/components/GoogleAddressInput";
import {Button} from "@/components/ui/button";

export const PickupAddress = ({
	payload,
	setPickModalOpen,
	pickModalOpen,
	handlePickupAddressConfirm,
	getSavedPickupAddress,
	setPickupAddress,
}: {
	payload: DeliveryPayloadType;
	setPickModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	pickModalOpen: boolean;
	handlePickupAddressConfirm: (addressData: addressSelectionType) => void;
	getSavedPickupAddress: () => addressSelectionType | null;
	setPickupAddress: (addressData: addressSelectionType) => void;
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (pickModalOpen && inputRef.current) {
			// Short delay to ensure modal is fully rendered
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [pickModalOpen]);
	return (
		<div>
			<Label className={`ml-5`} htmlFor="address">
				Pickup address
			</Label>

			<AlertDialog defaultOpen={pickModalOpen} open={pickModalOpen}>
				<AlertDialogTrigger asChild>
					<div
						onClick={() => setPickModalOpen(true)}
						onKeyUp={(e) => e.key === "Enter" && setPickModalOpen(true)}
						className={`flex items-center cursor-pointer`}
						// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
						tabIndex={0}
					>
						<Image
							alt={`start point`}
							width={20}
							height={20}
							src={"https://maps.google.com/mapfiles/ms/icons/green-dot.png"}
						/>
						<Input
							variant="line"
							className="text-left cursor-pointer"
							onClick={() => setPickModalOpen(true)}
							readOnly={true}
							value={payload.pickupDetails.address.address}
						/>
					</div>
				</AlertDialogTrigger>
				<AlertDialogContent className="h-full lg:h-[570px] max-w-4xl mx-auto px-4">
					<AlertDialogTitle>Choose Pickup Address</AlertDialogTitle>

					<button
						type="button"
						onClick={() => setPickModalOpen(false)}
						className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
					>
						<X className="w-4 h-4" />
					</button>
					<div>
						<GoogleAddressInput
							initialAddress={payload.pickupDetails.address.address}
							initialLocation={payload.pickupDetails.address.location}
							onConfirm={handlePickupAddressConfirm}
							getSavedAddress={getSavedPickupAddress}
							setSavedAddress={setPickupAddress}
						/>
					</div>
					<AlertDialogDescription />
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

//drop off address

///
///
///
///
//
//
//
//
//
export const DropOffAddress = ({
	payload,
	setDropOffModalOpen,
	dropOffModalOpen,
	handleDropOffAddressConfirm,
	getSavedDropOffAddress,
	setDropOffAddress,
}: {
	payload: DeliveryPayloadType;
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
			<Label htmlFor="dropOffAddress" className={`ml-5`}>
				Drop-Off Address
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

//
//
//
//
//
export const ReceiverDetails = ({
	payload,
	setPayload,
}: {
	payload: DeliveryPayloadType;
	setPayload: React.Dispatch<React.SetStateAction<DeliveryPayloadType>>;
}) => {
	const { name, phone, email } = payload.dropOffDetails;

	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<div
						className={`bg-white mt-4 p-4 flex justify-between border rounded-lg`}
					>
						<div>
							{name || phone || email ? (
								<div className="space-y-1">
									<p className={`underline text-gray-700`}>Receiver details</p>
									<div>
										<strong>Name:</strong> {name}
									</div>
									<div>
										<strong>Phone:</strong> {phone}
									</div>
									<div>
										<strong>Email:</strong> {email}
									</div>
								</div>
							) : (
								<div>Receiver details</div>
							)}
						</div>
						<div>
							<Pencil className="text-blue-500" />
						</div>
					</div>
				</AlertDialogTrigger>

				<AlertDialogContent className=" h-auto min-h-0 max-h-[95vh]">
					<AlertDialogDescription />
					<AlertDialogHeader>
						<AlertDialogTitle>Receiver Information</AlertDialogTitle>
					</AlertDialogHeader>
					<div className="space-y-2">
						<div>
							<Label className="mt-4">Name</Label>
							<Input
								placeholder="Enter receiver name"
								value={payload.dropOffDetails.name}
								onChange={(e) =>
									setPayload({
										...payload,
										dropOffDetails: {
											...payload.dropOffDetails,
											name: e.target.value,
										},
									})
								}
							/>
						</div>
						<div>
							<Label className="mt-4">Phone</Label>
							<Input
								placeholder="Enter receiver phone"
								value={payload.dropOffDetails.phone}
								onChange={(e) =>
									setPayload({
										...payload,
										dropOffDetails: {
											...payload.dropOffDetails,
											phone: e.target.value,
										},
									})
								}
							/>
						</div>
						<div>
							<Label className="mt-4">Email</Label>
							<Input
								placeholder="Enter receiver email"
								value={payload.dropOffDetails.email}
								onChange={(e) =>
									setPayload({
										...payload,
										dropOffDetails: {
											...payload.dropOffDetails,
											email: e.target.value,
										},
									})
								}
							/>
						</div>
					</div>
					<div className={``}>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};




export const Summary = ({
                     distance,
                     deliveryFee,
                     loading,
                     confirmOrder,
                     formatPrice,
                 }: {
    distance: number | undefined;
    deliveryFee: number ;
    loading: boolean;
    confirmOrder: () => void;
    formatPrice: (amount: number) => string;
}) => {
    return (
        <div className="shadow-md rounded-md border p-6 max-w-sm mx-auto bg-white">
            <h2 className="text-2xl font-bold pb-2">Summary</h2>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-medium">
                    Delivery {distance ? `(${distance.toFixed(2)} km)` : ""}
                </p>
                <p className="text-lg font-medium">{formatPrice(deliveryFee)}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-semibold">TOTAL</p>
                <p className="text-xl font-semibold">{formatPrice(deliveryFee)}</p>
            </div>
            <div>
                <Button
                    onClick={confirmOrder}
                    variant="primary"
                    className="w-full"
                >
                    {loading ? "Processing..." : "Confirm order"}
                </Button>
            </div>
        </div>
    );
};

