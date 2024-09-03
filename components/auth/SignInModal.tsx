import React, { useState } from "react";

import Welcome from "@/components/Welcome";
import Email from "@/components/Email";
import { useAuthContext } from "@/app/provider/auth.context";

export default function SignInModal() {
	const { form, setForm, setCurrentStep, setModalOpen, currentStep, goBack } =
		useAuthContext();
	function hideBackButton() {
		const shouldShow = ["welcome", "confirm-email"];
		return !shouldShow.includes(currentStep);
	}
	return (
		<div className="mx-auto max-w-md rounded-xl">
			<div>
				{/*     {hideBackButton() && (
          <div>
            <Button className="bg-primary-600 rounded-full" onClick={goBack}>
              <MoveLeft />
            </Button>
          </div>
        )}*/}
				<div>
					{currentStep === "welcome" && <Welcome />}
					{currentStep === "email" && <Email />}
					{/*{currentStep === "password" && <Password />}*/}
					{/*{currentStep === "confirm-email" && <ConfirmEmail />}*/}
					{currentStep === "success" && <LoginSuccessful />}
				</div>
			</div>
		</div>
	);
}

function LoginSuccessful() {
	const { form, setForm, setCurrentStep, setModalOpen, currentStep, goBack } =
		useAuthContext();

	// run a funtion after 5 seconds
	setTimeout(() => {
		setModalOpen(false);
	}, 3000);

	return (
		<div>
			<h1 className={`text-2xl py-8`}>Login Successful</h1>
		</div>
	);
}
