import { useAtomAuthContext } from "@/app/store/authAtom";
import Loader from "@/components/Loader";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginSuccessful() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const next = searchParams.get("next") || "/";
	const { setIsLoggedIn } = useAtomAuthContext();

	useEffect(() => {
		// First, let's add some debug logging
		console.log("Starting redirect process");
		console.log("Redirect URL:", next);

		// Immediately set the login state
		setIsLoggedIn(true);

		// Use a shorter timeout and force the navigation
		const timer = setTimeout(() => {
			console.log("Attempting redirect to:", next);
			try {
				const redirectTo = decodeURIComponent(next);
				// Force a hard navigation if the router push doesn't work
				window.location.href = redirectTo;
			} catch (error) {
				console.error("Redirect failed:", error);
				// Fallback to homepage if there's an error
				window.location.href = '/';
			}
		}, 500); // Reduced timeout to 500ms

		return () => clearTimeout(timer);
	}, [setIsLoggedIn, router, next]);

	return (
		<div className="min-h-screen flex flex-col justify-center items-center">
			<h1 className="text-2xl font-semibold mb-8">Login Successful</h1>
			<Loader />
			<div className="mt-8 text-sm text-gray-500">
				By creating an account, you automatically accept our{" "}
				<a href="/terms" className="underline">Terms of Service</a>,{" "}
				<a href="/privacy" className="underline">Privacy Policy</a>, and{" "}
				<a href="/cookies" className="underline">Cookies Policy</a>
			</div>
		</div>
	);
}

export default LoginSuccessful;