import { useAtomAuthContext } from "@/app/store/authAtom";
import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function RegistrationSuccessful() {
	const { setModalOpen, setCurrentStep, setIsLoggedIn } = useAtomAuthContext();
	const router = useRouter();
	const [email, setEmail] = useState<string | null>(null); // Store email in state

	// Get new email from session storage
	useEffect(() => {
		const storedEmail = sessionStorage.getItem("new-email");
		setEmail(storedEmail); // Set email to state
		console.log(storedEmail);
	}, []);


	return (
		<div className={`h-full flex flex-col justify-center items-center`}>
			<h1 className={`text-2xl py-8`}>Registration Successful</h1>
			{email && <p>Please Check <span className={`font-medium text-lg`}>{email} </span>to confirm your email</p>} {/* Display the email */}


		</div>
	);
}

export default RegistrationSuccessful;
