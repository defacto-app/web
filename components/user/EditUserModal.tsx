import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtomAuthContext } from "@/app/store/authAtom";
import { $api } from "@/http/endpoints";
import { toast } from "react-toastify";
import { InputOTPPattern } from "../ui/InputOTPPattern";
import ResendOTPButton from "@/app/components/ResendOTPButton";
import FormError from "../ui/FormError";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function EditUserModal() {
  const { authUser, setAuthUser, getMe } = useAtomAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otpError, setOtpError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: authUser.firstName || "",
      email: authUser.email || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await $api.auth.user.account.update_name_email({
        name: data.name,
        email: data.email,
      });

      if (res.data.isEmailChange) {
        setNewEmail(data.email);
        setOtpSent(true);
        toast.info("Please check your new email for the verification code");
      } else {
        await getMe();
        toast.success("Profile updated successfully");
        setIsOpen(false);
      }
    } catch (error: any) {
      if (error.message.includes("already in use")) {
        setError("email", {
          type: "manual",
          message: "This email is already associated with another account"
        });
      } else {
        toast.error(error.message || "Failed to update account details");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (!otp) {
      setOtpError("Please enter the verification code");
      return;
    }

    setIsVerifying(true);
    setOtpError("");

    try {
      await $api.auth.user.account.verifyEmailChange({ code: otp });
      await getMe(); // Refresh user data
      toast.success("Email updated successfully");
      handleClose(); // Close modal and reset states
    } catch (error: any) {
      if (error.message.includes("expired")) {
        setOtpError("Verification code has expired. Please request a new code.");
      } else if (error.message.includes("invalid")) {
        setOtpError("Invalid verification code. Please try again.");
      } else if (error.message.includes("already in use")) {
        // Return to email form with error
        setOtpSent(false);
        setError("email", {
          type: "manual",
          message: "This email is already associated with another account"
        });
      } else {
        setOtpError(error.message || "Failed to verify code");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setOtpSent(false);
    setOtp("");
    setOtpError("");
    setNewEmail("");
    reset({
      name: authUser.firstName || "",
      email: authUser.email || "",
    });
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        name: authUser.firstName || "",
        email: authUser.email || "",
      });
    }
  }, [isOpen, reset, authUser]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="link">Edit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {otpSent ? "Verify Email Change" : "Edit Profile"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {otpSent
              ? "Please verify your new email address"
              : "Update your account information below"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {!otpSent ? (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
                disabled={loading}
              />
              <FormError error={errors.name?.message || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
                disabled={loading}
              />
              <FormError error={errors.email?.message || ""} />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel
                type="button"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </AlertDialogCancel>
              <Button loading={loading} type="submit" variant="primary">
                Save changes
              </Button>
            </AlertDialogFooter>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-4 p-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Verification code sent to:
              </p>
              <p className="font-medium">{newEmail}</p>
            </div>

            <div className="w-full max-w-sm">
              <p className="mb-2 text-sm text-gray-600">
                Enter the verification code:
              </p>
              <InputOTPPattern defaultValue={otp} setOtp={setOtp} />
              {otpError && (
                <p className="mt-2 text-sm text-red-500">{otpError}</p>
              )}
            </div>

            <div className="flex flex-col items-center gap-2 w-full">
              <Button
                onClick={handleOTPSubmit}
                disabled={isVerifying}
                className="w-full max-w-sm"
                variant="primary"
                loading={isVerifying}
              >
                Verify Email
              </Button>

              <div className="flex gap-2">
                <Button
                  onClick={() => setOtpSent(false)}
                  variant="ghost"
                  disabled={isVerifying}
                >
                  Back
                </Button>
                <ResendOTPButton
                  onResend={() => handleSubmit(onSubmit)()}
                  loading={loading}
                  variant="link"
                />
              </div>
            </div>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}