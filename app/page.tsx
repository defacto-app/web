"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Welcome from "@/components/Welcome";
import Email from "@/components/Email";
import Password from "@/components/Password";
import { UserProvider } from "./provider/auth.context";
import { useAuthContext } from "@/app/provider/auth.context";

export default function HomePage() {
  const allSteps = ["welcome", "email", "password", "complete"];
  const [step, setStep] = useState(allSteps[0]); // Initialize with the first step
  const [email, setEmail] = useState("bbbbb@gmail.com"); // Initialize with the first step
  const { user, setUser, setCurrentStep, currentStep } = useAuthContext();

  const handleStepChange = (nextStep: React.SetStateAction<string>) => {
    setStep(nextStep);
  };

  function goBack() {
    setStep(allSteps[allSteps.indexOf(step) - 1]);
  }

  return (
    <div className="mx-auto max-w-md rounded-xl">
      <div>
        <div>
          <Button onClick={goBack}>Back</Button>
        </div>
        <div>
          {step === "welcome" && (
            <Welcome
              onNext={() => {
                setStep("email");
              }}
            />
          )}
          {step === "email" && (
            <Email
              onNext={(payload) => {
                setStep("password");
                setEmail(payload);
                console.log("logssss", payload);
              }}
            />
          )}

          {step === "password" && <Password />}
        </div>
      </div>
      {step}
      {email}
    </div>
  );
}
