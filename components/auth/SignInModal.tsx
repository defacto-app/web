import React from "react";
import Welcome from "@/components/auth/Welcome";
import Email from "@/components/auth/Email";
import { useAtomAuthContext } from "@/app/store/authAtom";
import LoginSuccessful from "@/components/auth/LoginSuccessful";
import RegistrationSuccessful from "@/components/auth/RegistrationSuccessful";

export default function SignInModal() {
	const { currentStep } = useAtomAuthContext();

	return (
		<div className="rounded-xl">
			<div>

				<div>
					{currentStep === "welcome" && <Welcome />}
					{currentStep === "email" && <Email />}
					{/*{currentStep === "login-success" && <LoginSuccessful />}*/}
					{/*{currentStep === "registration-success" && <RegistrationSuccessful />}*/}
				</div>
			</div>
		</div>
	);
}