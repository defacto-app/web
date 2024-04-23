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
  const [email, setEmail] = useState("bbbbb@gmail.com"); // Initialize with the first step
  const { user, setUser, setCurrentStep, currentStep, goBack } = useAuthContext();





  return (
    <div className="mx-auto max-w-md rounded-xl">
      <div>
      {currentStep !== "welcome" && (
          <div>
            <Button onClick={goBack}>Back</Button>
          </div>
        )}
        <div>
          {currentStep === "welcome" && (
            <Welcome

            />
          )}
          {currentStep === "email" && (
            <Email

            />
          )}

          {currentStep === "password" && <Password />}
        </div>
      </div>
      {email}
    </div>
  );
}
