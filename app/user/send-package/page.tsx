"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DateTimePicker from "@/components/user/DateTimePicker";

import { distanceAtom, packagePayloadAtom } from "@/app/store/sendPackageAtom";
import GoogleAddressInput from "@/components/GoogleAddressInput";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import type { addressSelectionType } from "@/lib/types";
import { calculateDistance, formatPrice } from "@/utils";
import DeliveryMap from "@/components/delivery/DeliveryMap";
import Image from "next/image";
import PackageImageUploader from "@/components/delivery/PackageImage";
import { Button } from "@/components/ui/button";
import { $api } from "@/http/endpoints";
import envData, {isDev} from "@/config/envData";

export default function Page() {
	const [loading, setLoading] = useState(false);

	const RATE_PER_KM = 300; // Price per kilometer

	const [pickModalOpen, setPickModalOpen] = useState(false);
	const [dropOffModalOpen, setDropOffModalOpen] = useState(false);
	const [distance, setDistance] = useState<number>();
	const deliveryFee = distance ? distance * RATE_PER_KM : 0;

	const [payload, setPayload] = useState({
		description: isDev ? "This is a test package" : "",
		package_image: "",
		charge: deliveryFee,
		pickupDate: new Date(),
		pickupDetails: {
			address: {
				address: "",
				additionalDetails: "",
				location: { lat: 0, lng: 0 },
			},
		},
		dropOffDetails: {
			address: {
				address: "",
				additionalDetails: "",
				location: { lat: 0, lng: 0 },
			},
		},
	});


	const handleImageSelect = (base64Image: string) => {
		setPayload((prevPayload) => ({
			...prevPayload,
			package_image: base64Image,
		}));
	};

	const handleDateSelect = (date: Date) => {
		setPayload({
			...payload,
			pickupDate: date,
		});
	};

	const getSavedPickupAddress = () => {
		const savedData = sessionStorage.getItem("pickupAddress");

		return savedData ? JSON.parse(savedData) : null;
	};

	const setPickupAddress = (addressData: addressSelectionType) => {
		sessionStorage.setItem("pickupAddress", JSON.stringify(addressData));

		setPayload({
			...payload,
			pickupDetails: {
				...payload.pickupDetails,
				address: addressData,
			},
		});
	};

	const handlePickupAddressConfirm = (addressData: addressSelectionType) => {
		setPickupAddress(addressData);
		setPickModalOpen(false);
	};

	// Drop-off address functions
	const getSavedDropOffAddress = () => {
		const savedData = sessionStorage.getItem("dropOffAddress");
		return savedData ? JSON.parse(savedData) : null;
	};

	const setDropOffAddress = (addressData: addressSelectionType) => {
		sessionStorage.setItem("dropOffAddress", JSON.stringify(addressData));
		setPayload({
			...payload,
			dropOffDetails: {
				...payload.dropOffDetails,
				address: addressData,
			},
		});
	};

	const handleDropOffAddressConfirm = (addressData: addressSelectionType) => {
		setDropOffAddress(addressData);
		setDropOffModalOpen(false);
	};

	useEffect(() => {
		const savedPickupAddress = getSavedPickupAddress();
		if (savedPickupAddress) {
			setPayload((prevPayload) => ({
				...prevPayload,
				pickupDetails: {
					...prevPayload.pickupDetails,
					address: savedPickupAddress,
				},
			}));
		}

		const savedDropOffAddress = getSavedDropOffAddress();
		if (savedDropOffAddress) {
			setPayload((prevPayload) => ({
				...prevPayload,
				dropOffDetails: {
					...prevPayload.dropOffDetails,
					address: savedDropOffAddress,
				},
			}));
		}
	}, []);

	useEffect(() => {
		const { lat: pickLat, lng: pickLng } =
			payload.pickupDetails.address.location;
		const { lat: dropLat, lng: dropLng } =
			payload.dropOffDetails.address.location;

		if (pickLat && pickLng && dropLat && dropLng) {
			const calculatedDistance = calculateDistance(
				pickLat,
				pickLng,
				dropLat,
				dropLng,
			);
			setDistance(calculatedDistance);
		}
	}, [
		payload.pickupDetails.address.location,
		payload.dropOffDetails.address.location,
	]);

	useEffect(() => {
		if (distance) {
			const deliveryFee = distance * RATE_PER_KM;
			setPayload((prevPayload) => ({
				...prevPayload,
				charge: deliveryFee,
			}));
		}
	}, [distance]);

	const confirmOrder = async () => {
		try {

			console.log(payload);
			const response = await $api.auth.user.order.package(payload);

			console.log(response);
		} catch (e) {
			console.log("error", e);
		}
	};



	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://checkout.flutterwave.com/v3.js";
		script.async = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const initiatePayment = async () => {
		setLoading(true);

		try {
			const response = await $api.auth.user.order.restaurant(payload);

			console.log(response);
		} catch (e) {
			console.log(e);
		}
		FlutterwaveCheckout({
			public_key: envData.flutter_wave.test.public_key, // Replace with your public key
			tx_ref: `txref-${Date.now()}`, // Unique transaction reference
			amount: deliveryFee, // Total amount calculated from the cart
			currency: "NGN", // Replace with your currency
			payment_options: "card, banktransfer, ussd", // Payment methods
			meta: {
				source: "NextJS-checkout",
				consumer_mac: "92a3-912ba-1192a",
			},
			customer: {
				email: "customer@example.com", // Replace with actual customer email
				phone_number: "08012345678", // Replace with actual customer phone number
				name: "Customer Name", // Replace with actual customer name
			},
			customizations: {
				title: "Defacto", // Replace with your store's title
				description: "Payment for your delivery package", // Custom description
				logo: envData.logo,
			},
			callback: (data: any) => {
				console.log("Payment callback:", data);
				if (data.status === "successful") {
					// Handle successful payment here
					console.log("Payment was successful!", data);
					// Optionally: You can verify the transaction on the backend here
				} else {
					console.log("Payment failed or was canceled.");
				}
			},
			onclose: () => {
				console.log("Payment process closed by user.");
			},
		});

		setLoading(false);
	};

	return (
		<div>
			<div className="container mx-auto  ">
				<h1 className="text-start px-1 py-4 text-primary-600 text-3xl font-bold mt-5">
					Send Package
				</h1>
				<div className=" lg:grid lg:grid-cols-3 gap-x-10 items-start">
					<div className={`col-span-2 pb-40`}>
						<div>
							<div className="container mx-auto px-4  space-y-4">
								<div>
									<Label className={`font-bold text-lg`}>
										What do you need to transport ?
									</Label>
									<Textarea
										onChange={(e) =>
											setPayload({
												...payload,
												description: e.target.value,
											})
										}
										placeholder={`briefly describe the item`}
										rows={7}
										value={payload.description}
									/>
								</div>

								{/* Package Image Uploader */}
								<div className={`flex justify-start`}>
									<PackageImageUploader onImageSelect={handleImageSelect} />
								</div>

								<DeliveryMap
									pickupLocation={payload.pickupDetails.address.location}
									dropOffLocation={payload.dropOffDetails.address.location}
								/>

								<div>
									<Label className={`ml-5`} htmlFor="address">
										Pickup address
									</Label>

									<AlertDialog defaultOpen={pickModalOpen} open={pickModalOpen}>
										<AlertDialogTrigger asChild>
											{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
											<div
												onClick={() => setPickModalOpen(true)}
												className={`flex items-center cursor-pointer`}
											>
												<Image
													alt={`start point`}
													width={20}
													height={20}
													src={
														"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
													}
												/>

												<Input
													variant={`line`}
													className={`text-left`}
													onClick={() => setPickModalOpen(true)}
													value={payload.pickupDetails.address.address}
												/>
											</div>
										</AlertDialogTrigger>
										<AlertDialogContent className="h-full lg:h-[570px] max-w-4xl mx-auto px-4">
											<button
												type="button"
												onClick={() => setPickModalOpen(false)}
												className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
											>
												<X className="w-4 h-4" />
											</button>
											<div className={`mt-8 `}>
												<GoogleAddressInput
													initialAddress={payload.pickupDetails.address.address}
													initialLocation={
														payload.pickupDetails.address.location
													}
													onConfirm={handlePickupAddressConfirm}
													getSavedAddress={getSavedPickupAddress}
													setSavedAddress={setPickupAddress}
												/>
											</div>
										</AlertDialogContent>
									</AlertDialog>
								</div>

								<div className="mb-4">
									<div>
										<Label htmlFor="dropOffAddress" className={`ml-5`}>
											Drop-Off address
										</Label>
										<AlertDialog
											defaultOpen={dropOffModalOpen}
											open={dropOffModalOpen}
										>
											<AlertDialogTrigger asChild>
												<div className={`flex items-center`}>
													<Image
														alt={`start point`}
														width={20}
														height={20}
														src={
															"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
														}
													/>

													<Input
														variant={`line`}
														onClick={() => setDropOffModalOpen(true)}
														className={`text-left`}
														value={payload.dropOffDetails.address.address}
													/>
												</div>
											</AlertDialogTrigger>
											<AlertDialogContent className="h-full lg:h-[570px] max-w-4xl mx-auto px-4">
												<button
													type="button"
													onClick={() => setDropOffModalOpen(false)}
													className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
												>
													<X className="w-4 h-4" />
												</button>
												<div className="mt-8">
													<GoogleAddressInput
														initialAddress={
															payload.dropOffDetails.address.address
														}
														initialLocation={
															payload.dropOffDetails.address.location
														}
														onConfirm={handleDropOffAddressConfirm}
														getSavedAddress={getSavedDropOffAddress}
														setSavedAddress={setDropOffAddress}
													/>
												</div>
											</AlertDialogContent>
										</AlertDialog>
									</div>
								</div>

								<div>
									<Label>Pickup Time</Label>
									<DateTimePicker
										showTimeSelect={true}
										selected={payload.pickupDate}
										onSelect={handleDateSelect}
									/>
								</div>
							</div>
						</div>
					</div>
					<section className="sticky top-20 right-5 w-[350px] z-0 hidden lg:block">
						<div className="shadow-md rounded-md border p-6 max-w-sm mx-auto bg-white">
							<h2 className="text-2xl font-bold pb-2">Summary</h2>
							<hr className="my-4" />
							<div className="flex justify-between items-center mb-4">
								<p className="text-lg font-medium">
									Delivery {distance ? `(${distance.toFixed(2)} km)` : ""}
								</p>
								<p className="text-lg font-medium">
									{" "}
									{formatPrice(deliveryFee)}
								</p>
							</div>
							<hr className="my-4" />
							<div className="flex justify-between items-center mb-4">
								<p className="text-xl font-semibold">TOTAL</p>
								<p className="text-xl font-semibold">
									{" "}
									{formatPrice(deliveryFee)}
								</p>
							</div>
							<div>
								<Button
									onClick={confirmOrder}
									variant={`primary`}
									className="w-full"
								>
									{loading ? "Processing..." : "Confirm order"}
								</Button>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
