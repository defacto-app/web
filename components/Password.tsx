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
import { Key } from "lucide-react"; // Import the Key icon for password
import { useAuthContext } from "@/app/provider/auth.context";

function Password() {
  const { user, setUser } = useAuthContext();

  const schema = z.object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  });

  const [formData, setFormData] = useState({
    password: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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

    console.log("Password submitted:", formData.password);
  };

  return (
    <Card className="mx-auto max-w-md rounded-xl">
      <CardHeader>
        <div className="grid justify-items-start py-2">
          <Key color="red" size={48} />
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
            <p>{user.email}</p>
            <Label htmlFor="password">Password</Label>
            <Input
              id="sign-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 p-4">{errors.password}</p>
            )}
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
