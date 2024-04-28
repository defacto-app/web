import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/app/provider/auth.context";
import "react-phone-input-2/lib/style.css";

export default function ConfirmEmail() {

  const { user, setUser, currentStep, setCurrentStep } = useAuthContext();


  return (
    <div className="">
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-start text-primary-500 font-bold">
            Check your Email
          </CardTitle>
          <CardDescription className="text-start">
            Use the link we  sent {user.email} to set a new password.
            Can’t see it? Try your spam folder or ask us to resend the link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid place-content-center">
            <div className="mb-6 grid place-content-center w-full">
              <div className="my-2">
                <Button variant="primary" className="w-72">
                  Go to Login
                </Button>
              </div>
              <div className="my-4">
                <Button variant="outline" className="w-72">
                  Resend Link
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
