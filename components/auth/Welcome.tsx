import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { useAtomAuthContext } from "@/app/store/authAtom";
import PhoneLogin from "../PhoneLogin";
import "react-phone-input-2/lib/style.css";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";


export default function Welcome() {
	const {
		form,
		setForm,
		currentStep,
		setCurrentStep,
		goBack,
		isLoggedIn,
		logOut,
		modalOpen,
		setModalOpen,
	} = useAtomAuthContext();

	async function handleNext(event: React.MouseEvent<HTMLButtonElement>) {

		event.preventDefault();

		setCurrentStep("email");
	}


	return (
		<div className="">
			<div className="rounded-xl h-80 px-10">
				<div>
					<h3 className="text-xl text-left font-bold">Welcome</h3>
					<CardDescription className="text-left">Let's start with your phone number</CardDescription>
				</div>
				<div>
					<div className="grid place-content-center">
						<div className="py-4">
							<PhoneLogin />
						</div>

						<div className="flex justify-between items-center mb-4">
							<hr className="w-1/3 border-gray-300" />
							<span className="mx-2 text-gray-500">or with</span>
							<hr className="w-1/3 border-gray-300" />
						</div>
						<div className="flex justify-between items-center">
							<Button
								onClick={handleNext}
								variant="outline"
								className="w-96  h-12"
							>
								<div className="">
									<div className="flex items-center">
										<EnvelopeClosedIcon className="mr-2 text-primary-600" />
										<p>Email</p>
									</div>
								</div>
							</Button>
						</div>
						<p className="text-center text-xs pt-4 text-gray-600">
							By creating an account, you automatically accept our{" "}
							<Link className={`underline`} href="/terms-of-service">Terms of Service</Link>,{" "}
							<Link className={`underline`} href="/privacy-policy">Privacy Policy</Link>, and{" "}
							<Link className={`underline`} href="/cookies-policy">Cookies Policy</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
