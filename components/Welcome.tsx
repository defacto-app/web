import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/app/provider/auth.context";

export default function Welcome() {
  const { user, setUser, setCurrentStep, currentStep } = useAuthContext();

  function handleNext(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setCurrentStep("email");
  }

  return (
    <div className=" ">
<Card className=" rounded-xl ">
      <CardHeader>
        <CardTitle className="text-4xl text-center font-bold">
          Welcome {currentStep}
        </CardTitle>
        <CardDescription className="text-center ">
          Let's start with your phone number
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label htmlFor="phone" className="block mb-2">
            Phone Number
          </Label>
          <Input
            id="welcomephone"
            type="tel"
            placeholder="Enter your phone number"
            className="w-full border-gray-300 rounded-md h-12 px-4 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between items-center mb-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="mx-4 text-gray-500">or with</span>
          <hr className="w-1/3 border-gray-300" />
        </div>
        <div className="mb-6">
          <Button
            onClick={handleNext}
            variant="primary"
            className="w-full h-12"
          >
            Email
          </Button>
        </div>

        <div>
          <Button variant="destructive" className="w-full h-12">
            Continue with SMS
          </Button>
        </div>
        <p className="text-center text-sm text-gray-600">
          By creating an account, you automatically accept our{" "}
          <Link href="/terms-of-service">Terms of Service</Link>,{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>, and{" "}
          <Link href="/cookies-policy">Cookies Policy</Link>
        </p>
      </CardContent>
    </Card>
    </div>

  );
}
