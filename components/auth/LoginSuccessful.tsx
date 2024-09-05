import { useAtomAuthContext } from "@/app/store/authAtom";
import Loader from "@/components/Loader";
import React from "react";

function LoginSuccessful() {
	const { setModalOpen,setCurrentStep } = useAtomAuthContext();

	setTimeout(() => {
		setModalOpen(false);
		setCurrentStep("welcome");

	}, 3000);

	return (
		<div className={`h-full flex flex-col justify-center items-center`}>
			<h1 className={`text-2xl py-8`}>Login Successful</h1>
			<Loader />
		</div>
	);
}

export default LoginSuccessful;
