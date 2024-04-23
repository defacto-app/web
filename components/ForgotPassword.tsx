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

const schema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" });

function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    setErrors({});
    const result = schema.safeParse(password);
    if (!result.success) {
      const formattedErrors = {} as any;
      result.error.errors.forEach((error) => {
        formattedErrors["password"] = error.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      // Simulate password reset request to the backend API
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      console.log("Password reset successful");
      // Display a success message to the user
      alert(
        "Password reset successful. Please check your email for further instructions.",
      );
    } catch (error:any) {
      console.error("Password reset error:", error.message);
      // Display an error message to the user
      alert(
        "An error occurred while resetting your password. Please try again later.",
      );
    }
  };

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
              id="new-password"
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
