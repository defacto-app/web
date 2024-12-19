import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtomAuthContext } from "@/app/store/authAtom";
import { $api } from "@/http/endpoints";
import { toast } from "react-toastify";
import { InputOTPPattern } from "../ui/InputOTPPattern";
import ResendOTPButton from "@/app/components/ResendOTPButton";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function EditUserModal() {
  const { authUser, setAuthUser } = useAtomAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
      // Request email update (send OTP)
      await $api.auth.user.account.update_name_email({
        name: data.name,
        email: data.email,
      });
      setOtpSent(true);
      toast.success("OTP sent to your new email address");
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    setIsVerifying(true);
    try {
      await $api.auth.user.account.verifyEmailChange({ code: otp });
      setAuthUser((prev) => ({ ...prev, email: authUser.email })); // Update local state
      toast.success("Email updated successfully");
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to verify OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCancel = () => {
    reset({
      name: authUser.firstName || "",
      email: authUser.email || "",
    });
    setIsOpen(false);
  };

  return (
    <div>
      <Button variant="link" onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      {isOpen && (
        <div className="modal">
          <h2>Edit Profile</h2>
          {!otpSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} disabled={loading} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} disabled={loading} />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </form>
          ) : (
            <div>
              <p>Enter the OTP sent to your new email:</p>
              <InputOTPPattern setOtp={setOtp} />
              <ResendOTPButton
                onResend={() => handleSubmit(onSubmit)()}
                loading={loading}
              />
              <Button
                onClick={handleOTPSubmit}
                disabled={isVerifying || !otp}
                className="mt-4"
              >
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          )}
          <Button onClick={handleCancel} variant="secondary" className="mt-2">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
