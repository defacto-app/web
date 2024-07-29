"use client";
import type React from "react";
import { z } from "zod";
import { useState } from "react";
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
import { Eye, EyeOff, Key } from "lucide-react";
import { useAuthContext } from "@/app/provider/auth.context";
import FormError from "@/components/ui/FormError";
import PasswordInput from "@/components/ui/PasswordInput";

function Password() {
  const {form,setForm, currentStep,setCurrentStep } = useAuthContext();

  const schema = z.object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  });




  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };



function RegisterUser() {
  const url = 'https://api.defactoapp.com.ng/api/admin/auth/register';
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: form.email, password: form.password})
};

fetch(url, requestOptions)
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  if (data.user){

setCurrentStep("confirm-email")

  }
  console.log('User registered successfully:', data);
})
.catch(error => {
  console.error('Problem with Registration:', error);
});
}

  const handleSubmit = () => {
    setErrors({});
    const result = schema.safeParse(form);
    if (!result.success) {
      const formattedErrors: any = {};
      for (const error of result.error.errors) {
        const fieldName = error.path[0];
        formattedErrors[fieldName] = error.message;
      }
      setErrors(formattedErrors);
      return;
  }
setCurrentStep("confirm-email")

RegisterUser()

  }

    console.log("Password submitted:", form.email, form.password);

  return (
    <Card className="mx-auto max-w-md rounded-xl">
      <CardHeader>
        <div className="grid justify-items-start py-2">
        </div>
        <CardTitle className="text-3xl text-center font-bold">
          Create password
        </CardTitle>
        <CardDescription className="text-center">
          Create a secure password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 ">
          <div className="grid gap-2 py-6">
            <p>{form.email}</p>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
                placeholder="Enter your password"
                name="password"
                value={form.password}
                handleInputChange={handleInputChange}
                required
            />


            <FormError error={errors.password} />
              <div className="grid place-content-end">
              <Button onClick={handleSubmit} variant="ghost" className="text-sm">
                Forgot your password?
              </Button>
              </div>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={handleSubmit}
          type="submit"
          className="w-full"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}

export default Password;
