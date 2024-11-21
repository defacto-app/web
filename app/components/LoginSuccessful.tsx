import { useAtomAuthContext } from "@/app/store/authAtom";
import Loader from "@/components/Loader";
import React from "react";
import {useRouter} from "next/navigation";


function LoginSuccessful() {
	const { setModalOpen, setCurrentStep, setIsLoggedIn } = useAtomAuthContext();

	const router = useRouter();
	setTimeout(() => {
		setModalOpen(false);
		setCurrentStep("welcome");
		setIsLoggedIn(true);

		router.push("/");


	}, 3000);

	return (
		<div className="h-80 flex flex-col justify-center items-center">
			<h1 className="text-2xl font-semibold mb-8">Login Successful</h1>
			<Loader/>
		</div>
	);
}

export default LoginSuccessful;
