// components/PickupModal.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import GoogleAddressInput from "@/components/GoogleAddressInput";
import { useGoogleAddressAtomContext } from "@/app/store/addressAtom";

type PickupModalProps = {
	handleOnSelect: (address: string) => void;
};

function PickupModal({ handleOnSelect }: PickupModalProps) {
	const { modalOpen, savedAddress, openModal, handleCloseModal } =
		useGoogleAddressAtomContext();

	return (
		<div className="relative">
			{savedAddress} --
			<AlertDialog defaultOpen={modalOpen} open={modalOpen}>
				<AlertDialogTrigger asChild>
					<div className="relative mb-8 cursor-pointer">
						<Input
							onClick={openModal}
							type="text"
							placeholder={
								savedAddress ? savedAddress : "What's your address ?"
							}
						/>
						<Button
							variant="primary"
							className="absolute right-0 top-0 mt-3 mr-4"
							disabled
							type="button"
						>
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
						</Button>
					</div>
				</AlertDialogTrigger>

				<AlertDialogContent className="h-full lg:h-[570px] max-w-2xl">
					<button
						type="button"
						onClick={handleCloseModal}
						className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
					>
						<X className="w-4 h-4" />
					</button>
					<AlertDialogTitle className="text-center">
						<span>Add a delivery address</span>
					</AlertDialogTitle>
					<div className="absolute top-20 px-10">
						<div className="flex items-center">
							<GoogleAddressInput  />
						</div>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}

export default PickupModal;
