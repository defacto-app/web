import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import UserPopover from "@/components/user/UserPopover";
import { useAtomAuthContext } from "@/app/store/authAtom";
import Link from "next/link";

export default function UserAuth() {
	const { isLoggedIn, currentStep } = useAtomAuthContext();

	const [hideCloseButton, setHideCloseButton] = useState(false);

	useEffect(() => {
		const shouldShow = ["welcome", "confirm-email", "success"];
		setHideCloseButton(!shouldShow.includes(currentStep));
	}, [currentStep]);


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
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
