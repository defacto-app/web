import React, { useEffect, useState } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import SignInModal from "./auth/SignInModal";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MoveLeft, X } from "lucide-react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuthContext } from "@/app/provider/auth.context";

export default function UserAuth() {
	const { isLoggedIn, currentStep, goBack , modalOpen,setModalOpen} = useAuthContext();

	const [hideCloseButton, setHideCloseButton] = useState(false);

	useEffect(() => {
		const shouldShow = ["welcome", "email"];
		setHideCloseButton(!shouldShow.includes(currentStep));
	}, [currentStep]);

	function hideBackButton() {
		const shouldShow = ["welcome", "confirm-email"];
		return !shouldShow.includes(currentStep);
	}

	return (
		<div>
			<div>
				{JSON.stringify(isLoggedIn)}
				<AlertDialog defaultOpen={modalOpen} open={modalOpen}>
					<AlertDialogTrigger
						onClick={() => setModalOpen(true)}
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

						<SignInModal />
						<AlertDialogFooter>
							{/*			<Button
								onClick={() => setOpen(false)}
								variant="outline"
								className="absolute bg-gray-400 hover:bg-gray-400 hover:text-white top-2 left-2 text-white p-2 rounded-full"
							>
								<X />
							</Button>*/}

							{hideBackButton() && (
								<Button
									onClick={goBack}
									variant={`ghost`}
									className="absolute rounded-full top-2 left-2 "
								>
									<ChevronLeft />
								</Button>
							)}

							{!hideCloseButton && (
								<Button
									onClick={() => setModalOpen(false)}
									variant="outline"
									className="absolute bg-gray-400 hover:bg-gray-400 hover:text-white top-2 right-2 text-white p-2 rounded-full"
								>
									<X />
								</Button>
							)}
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
