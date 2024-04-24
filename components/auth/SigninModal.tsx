import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import Welcome from "@/components/Welcome";
import Email from "@/components/Email";
import Password from "@/components/Password";
import { useAuthContext } from "@/app/provider/auth.context";
import { MoveLeft } from "lucide-react";

export default function SigninModal() {
  const { user, setUser, setCurrentStep, currentStep, goBack } =
    useAuthContext();

  return (
    <div className="mx-auto max-w-md rounded-xl">
      <div>
        {currentStep !== "welcome" && (
          <div>
            <Button className="bg-primary-500 rounded-full" onClick={goBack}>
<MoveLeft/>
            </Button>
          </div>
        )}
        <div>
          {currentStep === "welcome" && <Welcome />}
          {currentStep === "email" && <Email />}

          {currentStep === "password" && <Password />}
        </div>
      </div>
    </div>
  );
}
