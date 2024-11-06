// components/AddressSelectorModal.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, X } from "lucide-react";
import GoogleAddressInput from "@/components/GoogleAddressInput";
import { useGoogleAddressAtomContext } from "@/app/store/addressAtom";
import { MapPin } from "lucide-react";
type PickupModalProps = {
	handleOnSelect: (address: string) => void;
	title?: string;
};

function AddressSelectorModal({
	handleOnSelect,
	title = "Add a delivery address",
}: PickupModalProps) {
	const { modalOpen, savedAddress, openModal, handleCloseModal } =
		useGoogleAddressAtomContext();

	return (
		<div className="relative w-full">
			<AlertDialog defaultOpen={modalOpen} open={modalOpen}>
				<AlertDialogTrigger asChild>
					<div>
						{savedAddress ? (
							<div className={`flex flex-col gap-2`}>
								<span className="text-blue-500 text-sm lg:hidden">
									Deliver Here:
								</span>
								<Button
									variant={`outline`}
									onClick={openModal}
									className={`pr-4 py-1 gap-x-4 w-80 lg:w-full`} // Removed `px-4`
								>
									<div className="w-full truncate flex items-center">
										<span className="text-blue-500 hidden lg:block">
											Deliver Here:
										</span>
										<span className="truncate ml-1">{savedAddress}</span>
									</div>

									<ChevronDown size={`30`} className={`text-blue-500`} />
								</Button>
							</div>
						) : (
							<div className="relative mb-8 cursor-pointer">
								<Input
									onClick={openModal}
									type="text"
									placeholder={
										savedAddress ? savedAddress : "What's your address ?"
									}
								/>
								<Button
									variant="ghost"
									className="absolute right-0 top-0 "
									disabled
									type="button"
								>
									<MapPin />
								</Button>
							</div>
						)}
					</div>
				</AlertDialogTrigger>

				<AlertDialogContent className="h-full lg:h-[570px] max-w-4xl mx-auto px-4">
					<AlertDialogDescription>
						<span>{title}</span>
					</AlertDialogDescription>
					<button
						type="button"
						onClick={handleCloseModal}
						className="absolute top-4 right-2 bg-gray-200 rounded-full p-2"
					>
						<X className="w-4 h-4" />
					</button>
					<AlertDialogTitle className="text-center">
						{/*<span>{title}</span>*/}
					</AlertDialogTitle>
					<div className="absolute top-20 px-10">
						<div className="flex items-center">
							<GoogleAddressInput />
						</div>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}


export default AddressSelectorModal;
