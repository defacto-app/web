"use client";

import React, { useState } from "react";
import { z } from "zod";
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


const [formData, setFormData] = useState({
  password: "",
});

const schema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });

function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
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


  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your new password below to reset your account password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="forgotpassword"
              type="password"
              placeholder="Enter new password"
              required
              value={password}
              onChange={handleInputChange}
              className="py-2"
            />
            <Label htmlFor="password">Confirm Password</Label>

            <Input
              id="confirm-password"
              type="password"
              placeholder="Enter new password"
              required
              value={password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 p-4">{errors.password}</p>
            )}
          </div>
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Reset Password
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Remembered your password?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ForgotPassword;
