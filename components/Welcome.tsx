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

import { useAuthContext } from "@/app/provider/auth.context";
import PhoneNo from "./PhoneNo";
import "react-phone-input-2/lib/style.css";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

export default function Welcome() {
	const { user, setUser, setCurrentStep, currentStep } = useAuthContext();

	function handleNext(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		setCurrentStep("email");
	}

	return (
		<div className="">
			<div className="rounded-xl">
				<CardHeader>
					<h3 className="text-xl text-center font-bold">Welcome</h3>
					<CardDescription className="text-center">
						Let's start with your phone number
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid place-content-center">
						<div className="mb-6 grid place-content-center w-full">
							<PhoneNo />
						</div>
						<div className="mb-6 grid place-content-center">
							<Button variant="primary" className=" w-72 h-10 ">
								Continue with SMS
							</Button>
						</div>
						<div className="flex justify-between items-center mb-6">
							<hr className="w-1/3 border-gray-300" />
							<span className="mx-4 text-gray-500">or with</span>
							<hr className="w-1/3 border-gray-300" />
						</div>
						<div className="flex justify-between items-center">
							<Button
								onClick={handleNext}
								variant="outline"
								className="w-full  h-12"
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
							<Link href="/terms-of-service">Terms of Service</Link>,{" "}
							<Link href="/privacy-policy">Privacy Policy</Link>, and{" "}
							<Link href="/cookies-policy">Cookies Policy</Link>
						</p>
					</div>
				</CardContent>
			</div>
		</div>
	);
}
