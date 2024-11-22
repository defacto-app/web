import React from "react";
import Welcome from "@/app/components/Welcome";
import Email from "@/app/components/Email";
import { useAtomAuthContext } from "@/app/store/authAtom";
import LoginSuccessful from "@/app/components/LoginSuccessful";
import RegistrationSuccessful from "@/app/components/RegistrationSuccessful";

export default function SignInModal() {
	const { currentStep } = useAtomAuthContext();

	const renderStep = () => {
		switch (currentStep) {
			case "welcome":
				return <Welcome />;
			case "email":
				return <Email />;
			case "login-success":
				return <LoginSuccessful />;
			case "registration-success":
				return <RegistrationSuccessful />;
			default:
				return null;
		}
	};

	return (
		<div className="rounded-xl">
			<div>
				<div>
					{renderStep()}
				</div>
			</div>
		</div>
	);
}