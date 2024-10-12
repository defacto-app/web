import { useAtomAuthContext } from "@/app/store/authAtom";
import Loader from "@/components/Loader";
import React from "react";

function RegistrationSuccessful() {
	const { setModalOpen, setCurrentStep, setIsLoggedIn } = useAtomAuthContext();

	setTimeout(() => {
		setModalOpen(false);
		setCurrentStep("welcome");

		setIsLoggedIn(true);
	}, 3000);

	return (
		<div className={`h-full flex flex-col justify-center items-center`}>
			<h1 className={`text-2xl py-8`}>Registration Successful</h1>
			<p>Please Check Your inbox to confirm your email</p>
			<Loader />
		</div>
	);
}

export default RegistrationSuccessful;
