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
import PhoneNo from "./PhoneLogin";
import "react-phone-input-2/lib/style.css";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { $api } from "@/http/endpoints";

export default function Welcome() {
	const { form, setForm, setCurrentStep, currentStep } = useAuthContext();

	async function handleNext(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		setCurrentStep("email");
	}

	async function submit(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		try {
			const res = await $api.auth.user.confirm_phone_login({
				phoneNumber: "+2347030000000",
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		}

	}

	return (
		<div className="">
			<div className="rounded-xl h-80 px-10">
				<div>
					<h3 className="text-xl text-center font-bold">Welcome</h3>
					<p className="text-center">Let's start with your phone number</p>
				</div>
				<div>
					<div className="grid place-content-center">
						<div className="py-4">
							<PhoneNo />
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
				</div>
			</div>
		</div>
	);
}
