import React from "react";

import Welcome from "@/components/auth/Welcome";
import Email from "@/components/auth/Email";
import { modalOpenAtom, useAtomAuthContext } from "@/app/store/authAtom";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import LoginSuccessful from "@/components/auth/LoginSuccessful";

export default function SignInModal() {
	const { currentStep, goBack, modalOpen } = useAtomAuthContext();

	return (
		<div className="mx-auto max-w-md rounded-xl">
			<div>
				<div>
					{currentStep === "welcome" && <Welcome />}
					{currentStep === "email" && <Email />}
					{/*{currentStep === "password" && <Password />}*/}
					{/*{currentStep === "confirm-email" && <ConfirmEmail />}*/}
					{currentStep === "success" && <LoginSuccessful />}
				</div>
			</div>
		</div>
	);
}
