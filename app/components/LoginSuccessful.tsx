import { useAtomAuthContext } from "@/app/store/authAtom";
import Loader from "@/components/Loader";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginSuccessful() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const next = searchParams.get("next") || "/"; // Set a default redirect
	const { setCurrentStep, setIsLoggedIn } = useAtomAuthContext();

	useEffect(() => {
		// Short delay to ensure smooth transition
		const timer = setTimeout(() => {
			// Update auth state
			setIsLoggedIn(true);

			// Redirect to the next page or default
			const redirectTo = decodeURIComponent(next);
			router.push(redirectTo);
		}, 1000);

		return () => clearTimeout(timer);
	}, [setCurrentStep, setIsLoggedIn, router, next]);

	return (
		<div className="h-80 flex flex-col justify-center items-center">
			<h1 className="text-2xl font-semibold mb-8">Login Successful</h1>
			<Loader />
		</div>
	);
}

export default LoginSuccessful;
