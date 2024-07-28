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
import { Mail } from "lucide-react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/app/provider/auth.context";

function Email() {
  const { setForm, form, currentStep, setCurrentStep } = useAuthContext();

  const schema = z.object({
    email: z.string().email({
      message: "Invalid email address e.g example@gmail.com",
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
      for (const error of result.error.errors) {
        const fieldName = error.path[0];
        formattedErrors[fieldName] = error.message;
      }
      setErrors(formattedErrors);
      return;
    }
    setCurrentStep("password");

    setForm({
      email: formData.email,
      password: "",
    });

    console.log("Email submitted:", formData.email);
  };

  return (
    <div >
      <CardHeader>

        <CardTitle className="text-3xl text-center font-bold">
          {" "}
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Let's start with your email
        </CardTitle>
        <CardDescription className="text-center ">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
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
            {errors.email && <p className="text-red-500 font-semibold p-4">{errors.email}</p>}
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
    </div>
  );
}

export default Email;
