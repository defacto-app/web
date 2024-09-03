"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import GoogleAddressInput from "@/components/GoogleAddressInput";
import { X } from "lucide-react";

type PickupModalProps = {
	handleOnSelect: (address: string) => void;
};

function PickupModal({ handleOnSelect }: PickupModalProps) {
	const [savedAddress, setSavedAddress] = useState("");

	const [modalOpen, setModalOpen] = useState(false);

	const handleCloseModal = () => {
		setModalOpen(false);

		const savedAddresses = JSON.parse(
			localStorage.getItem("selectedAddresses") || "[]",
		);
		const lastAddress =
			savedAddresses.length > 0
				? savedAddresses[savedAddresses.length - 1]
				: "";

		console.log(lastAddress, "lastAddress");

		handleOnSelect(lastAddress);
	};
	return (
		<div className="relative ">
			<AlertDialog defaultOpen={modalOpen} open={modalOpen}>
				<AlertDialogTrigger asChild>
					<div className="relative mb-8  cursor-pointer">
						<Input
							onClick={() => setModalOpen(true)}
							type="text"
							placeholder={
								savedAddress ? savedAddress : "What's your address ?"
							}
						/>
						<Button
							variant={`primary`}
							className="absolute right-0 top-0 mt-3 mr-4"
							disabled
							type="button" // Add the type prop with value "button"
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

				<AlertDialogContent
					id="dialog-trigger"
					className={`h-full lg:h-[670px] max-w-2xl`}
				>
					<button
						type="button"
						onClick={() => setModalOpen(false)}
						role={`button`}
						className={`absolute top-4 right-2 bg-gray-200 rounded-full p-2`}
					>
						<X className={`w-4 h-4`} />
					</button>
					<AlertDialogTitle className={`text-center`}>
						<span>Add a delivery address</span>
					</AlertDialogTitle>
					<VisuallyHidden>
						<AlertDialogDescription />
					</VisuallyHidden>
					<div className={`absolute top-20 px-10`}>
						<div className={`flex items-center`}>
							<GoogleAddressInput handleCloseModal={handleCloseModal} />
						</div>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default PickupModal;
