import React, { useEffect, useState } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import SignInModal from "@/app/components/auth/SignInModal";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MoveLeft, X } from "lucide-react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuthContext } from "@/app/provider/auth.context";
import UserPopover from "@/components/user/UserPopover";
import { $api } from "@/http/endpoints";
import { useAtomAuthContext } from "@/app/store/authAtom";
import Link from "next/link";

export default function UserAuth() {
	const {
		isLoggedIn,
		setIsLoggedIn,
		currentStep,
		goBack,
		modalOpen,
		setModalOpen,
	} = useAtomAuthContext();

	const [hideCloseButton, setHideCloseButton] = useState(false);

	useEffect(() => {
		const shouldShow = ["welcome", "confirm-email", "success"];
		setHideCloseButton(!shouldShow.includes(currentStep));
	}, [currentStep]);

	function hideBackButton() {
		const shouldShow = ["welcome", "confirm-email"];
		return !shouldShow.includes(currentStep);
	}

	useEffect(() => {
		localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
	}, [isLoggedIn]);

	return (
		<div>
			<div className={`flex items-center`}>
				{isLoggedIn ? (
					<div>
						{" "}
						<UserPopover />
					</div>
				) : (
					<div className={`flex items-center gap-x-4`}>

						<div>
							<Link href={`/auth/login`}>
								<Button variant={`primary`}>Get Started</Button>
								Login
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
