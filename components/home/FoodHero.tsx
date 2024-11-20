"use client";
import { BikeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import RotateBetween from "./RotataBetween";
import AddressSelectorModal from "../user/AddressSelectorModal";

import { useGoogleAddressAtomContext } from "@/app/store/addressAtom";

export default function FoodHero() {
	const { savedAddress, setSavedAddress } = useGoogleAddressAtomContext();

	const words = ["Cravings", "Joy", "Orders with speed", "Orders with ease"];


	const [selectedAddress, setSelectedAddress] = useState<{
		address: string;
		additionalDetails: string;
		location: { lat: number; lng: number };
	} | null>(null);



	useEffect(() => {
		const savedData = localStorage.getItem("selectedAddress");
		if (savedData) {
			try {
				const parsedAddress = JSON.parse(savedData);
				setSelectedAddress(parsedAddress.address);
				setSavedAddress(parsedAddress.address);
			} catch (e) {
				console.error("Error parsing saved address:", e);
			}
		}
	}, [setSavedAddress]);

	return (
		<div className={`container mx-auto`}>
			<div className="flex flex-col lg:flex-row items-center justify-between">
				<div className="max-w-2xl mb-10 lg:mb-0 ">
					<p className="inline-flex space-x-6 mb-8">
						<span
							className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
							<span>Riders Available</span>

							<BikeIcon className="text-primary-600"/>
						</span>
					</p>
					<div className="text-2xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
						<h1> Delivering</h1>
						<RotateBetween
							words={words}
							className="text-balance  from-primary-500 from-30% to-primary-300/60 bg-clip-text px-1 py-2 font-bold leading-none tracking-tighter  "
						/>
					</div>
					<p className="text-base lg:text-lg text-gray-700 mb-8">
						Bringing happiness to your doorstep, one delivery at a time. We
						deliver, you enjoy.
					</p>
					<div>
						<AddressSelectorModal/>
					</div>
				</div>

				<div className="relative bg-primary-900 lg:rounded-tl-full lg:w-1/2 w-full">
					<Image
						src="/hero/hero.png"
						alt="Foreground"
						className="w-full h-auto"
						width={500}
						height={500}
						priority
						style={{
							maxWidth: "100%",
							height: "auto",
						}}
					/>
					<div className="absolute inset-0 flex flex-col items-center justify-center lg:items-end p-4 lg:p-8">
						<h2 className="text-lg text-gray-100 w-full lg:w-56 text-center lg:text-end font-semibold mb-4 lg:mb-8">
							Download the Defacto app for faster ordering
						</h2>
						<div className="flex items-center gap-x-4 ">
							<Button
								size="lg"
								variant="secondary"
								className="bg-gray-900 text-white"
							>
								<div className="flex items-center">
									<Image
										className="mr-2 h-6 w-6"
										src="/hero/apple3.png"
										alt="Apple Store"
										height={50}
										width={154}
										style={{
											maxWidth: "100%",
											height: "auto",
										}}
									/>
									<div>
										<h1 className="text-xs font-light">Download on</h1>
										<div className="font-semibold">Apple Store</div>
									</div>
								</div>
							</Button>
							<Button
								size="lg"
								variant="secondary"
								className="bg-gray-900 text-white"
							>
								<div className="flex items-center">
									<Image
										className="mr-2 h-6 w-6"
										src="/hero/android2.png"
										alt="Play Store"
										height={50}
										width={154}
										style={{
											maxWidth: "100%",
											height: "auto",
										}}
									/>
									<div>
										<h1 className="text-xs font-light">Download on</h1>
										<div className="font-semibold">Play Store</div>
									</div>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
}
