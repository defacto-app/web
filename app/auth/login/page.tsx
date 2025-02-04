"use client";
import Link from "next/link";
import { useAtomAuthContext } from "@/app/store/authAtom";
import Welcome from "@/app/components/Welcome";
import Email from "@/app/components/Email";
import LoginSuccessful from "@/app/components/LoginSuccessful";
import RegistrationSuccessful from "@/app/components/RegistrationSuccessful";
import React from "react";
import Image from "next/image";

export default function LoginPage() {
	const { currentStep } = useAtomAuthContext();

	return (
		<div>
			<div>
				<div className="">
					<div className={`flex justify-center`}>
						<Link href="/">
							<span className="sr-only">Your Company</span>
							<Image
								className="h-20 pb-4 w-auto"
								src="/logo.png"
								priority={true}
								alt=""
								width={100}
								height={100}

							/>
						</Link>
					</div>
					<div>
						<div>
							{currentStep === "welcome" && <Welcome />}
							{currentStep === "email" && <Email />}
							{currentStep === "login-success" && <LoginSuccessful />}
							{currentStep === "registration-success" && (
								<RegistrationSuccessful />
							)}
						</div>
					</div>
				</div>
			</div>
			<p className="text-center text-xs pt-4 text-gray-600">
				By creating an account, you automatically accept our{" "}
				<Link className={`underline`} href="/terms-of-service">
					Terms of Service
				</Link>
				,{" "}
				<Link className={`underline`} href="/privacy-policy">
					Privacy Policy
				</Link>
				, and{" "}
				<Link className={`underline`} href="/cookies-policy">
					Cookies Policy
				</Link>
			</p>
		</div>
	);
}
