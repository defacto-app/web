"use client"
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
import { json } from "stream/consumers";

export default function AdminLogin() {
  const schema = z.object({
    email: z.string().email({
      message: "Invalid email address eg example@gmail.com",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  };

  const handleSubmit = () => {
    setErrors({});
    const result = schema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = {} as any;
      result.error.errors.forEach((error) => {
        const fieldName = error.path[0];
        formattedErrors[fieldName] = error.message;
      });
      console.log("code is running", formattedErrors);
      setErrors(formattedErrors);
      return;
    }
    console.log("I am handled", result.success);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            {formData.email}
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />

            {errors.email && (
              <p className={`text-red-500 p-4`}>{errors.email}</p>
            )}
          </div>
          {JSON.stringify(formData)}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>

              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>
          {errors.password && (
            <p className={`text-red-500 p-4`}>{errors.password}</p>
          )}
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account ----?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
