"use client"
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormValues {
  oldPassword: string;
  newPassword: string;
}

const schema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const EditUserPasswordModal = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    oldPassword: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    setErrors({});
    const result = schema.safeParse(formValues);
    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        const fieldName = error.path[0];
        formattedErrors[fieldName] = error.message;
      });
      setErrors(formattedErrors);
      return;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit</DialogTitle>
              <DialogDescription>
                Change your password here and click save when done
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="old-password" className="text-right">
                    Old Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="old-password"
                      name="oldPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your old password"
                      required
                      onChange={handleInputChange}
                      className="w-full"
                    />
                    {errors.oldPassword && (
                      <p className="text-red-500 p-4">
                        {errors.oldPassword}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-right">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      required
                      onChange={handleInputChange}
                      className="w-full"
                    />
                    {errors.newPassword && (
                      <p className="text-red-500 p-4">
                        {errors.newPassword}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="primary"
                onClick={handleSubmit}
                type="submit"
                className="w-full"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EditUserPasswordModal;
