import React from "react";
import Welcome from "@/app/components/Welcome";
import Email from "@/app/components/Email";
import { useAtomAuthContext } from "@/app/store/authAtom";
import LoginSuccessful from "@/app/components/LoginSuccessful";
import RegistrationSuccessful from "@/app/components/RegistrationSuccessful";

export default function SignInModal() {
	const { currentStep } = useAtomAuthContext();

	return (
		<div className="rounded-xl">
			<div>

				<div>
					{currentStep === "welcome" && <Welcome />}
					{currentStep === "email" && <Email />}
					{currentStep === "login-success" && <LoginSuccessful />}
					{currentStep === "registration-success" && <RegistrationSuccessful />}
				</div>
			</div>
		</div>
	);
}