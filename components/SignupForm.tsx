"use client";
import React, { useState } from "react";
import Welcome from "@/components/Welcome";
import Email from "@/components/Email";
import Password from "@/components/Password";

export default function SignupForm() {
  const [step, setStep] = useState(1);

  const handleEmailSubmit = () => {
    // Logic to handle email submission and move to the next step
    setStep(2); // Move to the password step
  };

  const handlePasswordSubmit = () => {
    // Logic to handle password submission and move to the next step
    setStep(3); // Move to the next step or complete signup
  };

  return (
    <>
      {step === 1 && <Welcome />}
      {step === 2 && <Email onSubmit={handleEmailSubmit} />}
      {step === 3 && <Password onSubmit={handlePasswordSubmit} />}
    </>
  );
}
