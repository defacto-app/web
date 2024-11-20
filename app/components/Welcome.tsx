import type React from "react";
import { Button } from "@/components/ui/button";
import {

	CardDescription,

} from "@/components/ui/card";

import { useAtomAuthContext } from "@/app/store/authAtom";
import PhoneLogin from "./PhoneLogin";
import "react-phone-input-2/lib/style.css";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";

export default function Welcome() {
	const { setCurrentStep } = useAtomAuthContext();

	async function handleNext(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		setCurrentStep("email");
	}

	return (
			<div className="rounded-xl h-80 ">
				<div>
					<h3 className="text-xl text-left font-bold">Welcome</h3>
					<CardDescription className="text-left">
						Let's start with your phone number
					</CardDescription>
				</div>
				<div>
					<div >
						<div className="py-4">
							<PhoneLogin />
						</div>

						<div className="flex justify-between items-center mb-4">
							<hr className="w-1/3 border-gray-300" />
							<span className="mx-2 text-gray-500">or with</span>
							<hr className="w-1/3 border-gray-300" />
						</div>
						<div className="flex justify-center items-center">
							<Button
								onClick={handleNext}
								variant="outline"
								className="w-72 "
							>
									<div className="flex gap-x-2 items-center">
										<EnvelopeClosedIcon className="text-primary-600" />
										<p>Email</p>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</div>
	);
}
