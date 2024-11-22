import { useAtomAuthContext } from "@/app/store/authAtom";
import Loader from "@/components/Loader";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginSuccessful() {
	const searchParams = useSearchParams()
	const router = useRouter()
	const next = searchParams.get('next') || "/"
	const { setModalOpen, setCurrentStep, setIsLoggedIn } = useAtomAuthContext();

	useEffect(() => {
		const checkAuthAndRedirect = async () => {
			try {
				// Try multiple times with a delay
				for (let i = 0; i < 3; i++) {
					const authCheck = await fetch('/api/auth/check-auth');
					console.log(`Auth check attempt ${i + 1}:`, authCheck.status);

					if (authCheck.ok) {
						// Wait a moment to ensure cookie is properly set
						await new Promise(resolve => setTimeout(resolve, 1000));

						setModalOpen(false);
						setCurrentStep("welcome");
						setIsLoggedIn(true);

						const redirectTo = decodeURIComponent(next);
						router.push(redirectTo);
						return;
					}

					// Wait before trying again
					await new Promise(resolve => setTimeout(resolve, 1000));
				}

				console.error("Failed to verify authentication after multiple attempts");
			} catch (error) {
				console.error("Error checking auth:", error);
			}
		};

		checkAuthAndRedirect();
	}, []);

	return (
		<div className="h-80 flex flex-col justify-center items-center">
			<h1 className="text-2xl font-semibold mb-8">Login Successful</h1>
			<Loader/>
		</div>
	);
}

export default LoginSuccessful;