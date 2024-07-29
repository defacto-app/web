"use client";
import React from "react";
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

import SigninModal from "./auth/SigninModal";
import { Button, buttonVariants } from "@/components/ui/button";
import { TiMessage } from "react-icons/ti";
import {ChevronLeft, MoveLeft, X} from "lucide-react";
import { cn } from "@/utils/cn";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {useAuthContext} from "@/app/provider/auth.context";

export default function UserAuth() {
	const { form,setForm, setCurrentStep, currentStep, goBack } =
		useAuthContext();
	const [open, setOpen] = React.useState(true);

	function hideBackButton(){
		const shouldShow =["welcome","confirm-email"]
		return !shouldShow.includes(currentStep);

	}
	return (
		<div>
			<div>
				<AlertDialog defaultOpen={open} open={open}>
					<AlertDialogTrigger
						onClick={() => setOpen(true)}
						className="w-32 h-10 bg-blue-500 rounded-full text-white"
					>
						{/* <User className="text-primary-600"/> */}
						Get Started
					</AlertDialogTrigger>
					<AlertDialogContent className={`min-h-min py-12`}>
						<VisuallyHidden>
							<AlertDialogTitle />
							<AlertDialogDescription />
						</VisuallyHidden>

						<SigninModal />
						<AlertDialogFooter>
							{/*			<Button
								onClick={() => setOpen(false)}
								variant="outline"
								className="absolute bg-gray-400 hover:bg-gray-400 hover:text-white top-2 left-2 text-white p-2 rounded-full"
							>
								<X />
							</Button>*/}

							{hideBackButton() && (
								<Button variant={`ghost`} className="absolute rounded-full top-2 left-2 ">
									<ChevronLeft />
								</Button>
							)}



							<Button
								onClick={() => setOpen(false)}
								variant="outline"
								className="absolute bg-gray-400 hover:bg-gray-400 hover:text-white top-2 right-2 text-white p-2 rounded-full"
							>
								<X />
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
