"use client";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Map, Navigation } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "../ui/checkbox";
import PastAddresses from "./PastAddresses";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Label } from "@/components/ui/label";
import GoogleAddressInput from "@/components/ui/GoogleAddressInput";

const demoAddresses = [
	"No 2 Asaba Street, Lagos",
	"15 Aba Road, Port Harcourt",
	"20 Enugu Crescent, Abuja",
];

export default function PickupModal() {
	const [selectedAddress, setSelectedAddress] = useState("");
	const [savedAddress, setSavedAddress] = useState("");

	const handleAddressSelection = (address: string) => {
		setSelectedAddress(address);
	};

	const handleSaveChanges = () => {
		setSavedAddress(selectedAddress);
	};

	return (
		<div className="relative">
			<AlertDialog defaultOpen={true}>
				<AlertDialogTrigger asChild>
					<div className="relative mb-8  cursor-pointer">
						<Input
							type="text"
							placeholder={savedAddress ? savedAddress : "What's your address ?"}
						/>
						<Button
							variant={`primary`}
							className="absolute right-0 top-0 mt-3 mr-4"
							disabled
						>
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-blue-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								/>
							</svg>
							<div className="grid justify-items-center place-content-center">
								{/*<Navigation className="text-primary-500 items-center"/>*/}
							</div>
						</Button>
					</div>
				</AlertDialogTrigger>

				<AlertDialogContent id="dialog-trigger" className={`h-screen`}>
					<div className={`flex`}>
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<Map className="h-5 w-5 text-gray-400" aria-hidden="true" />
						</div>
						<div className={`flex items-center`}>
							<div>
								<GoogleAddressInput/>
							</div>
							<Button
								type="button"
								onClick={() => handleAddressSelection(selectedAddress)}
							>
								<Navigation
									className="-ml-0.5 h-5 w-5 text-gray-200"
									aria-hidden="true"
								/>
							</Button>
						</div>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
