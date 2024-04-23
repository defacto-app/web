"use client";

import React from "react";
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
import { Mail } from "lucide-react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/app/provider/auth.context";



function Email() {
  const { user, setUser, currentStep, setCurrentStep } = useAuthContext();

  const schema = z.object({
    email: z.string().email({
      message: "Invalid email address eg example@gmail.com",
    }),
  });

  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Email Submitted");
    setErrors({});
    const result = schema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: any = {};
      result.error.errors.forEach((error) => {
        const fieldName = error.path[0];
        formattedErrors[fieldName] = error.message;
      });
      setErrors(formattedErrors);
      return;
    }
    setCurrentStep("password")

    setUser({
      email: formData.email,
      password: "",
    });

    console.log("Email submitted:", formData.email);
  };

  return (
    <Card className="mx-auto max-w-md rounded-xl">
      <CardHeader>
        <div className="grid justify-items-start py-6">
          <Mail color="red" size={48} />
        </div>
        <CardTitle className="text-3xl text-center font-bold">
          {" "}
          Let's start with your email
        </CardTitle>
        <CardDescription className="text-center ">
          We will check if you already have an account, if not, we'll create a
          new one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 ">
          <div className="grid gap-2 py-6">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 p-4">{errors.email}</p>}
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

export default Email;
