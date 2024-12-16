import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import FormError from "@/components/ui/FormError";
import { isDev } from "@/config/envData";
import { $api } from "@/http/endpoints";
import { useAtomAuthContext } from "@/app/store/authAtom";
import { toast } from "react-toastify";
import PhoneInput from "@/app/components/PhoneInput";
import { InputOTPPattern } from "../ui/InputOTPPattern";
import ResendOTPButton from "@/app/components/ResendOTPButton";

export default function EditUserNumberModal() {
	const { getMe, authUser } = useAtomAuthContext();

	// Modal state
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// Form state
	const [form, setForm] = useState({
		code: "+234",
		phoneNumber: isDev ? authUser.phoneNumber : "",
		otp: "",
	});

	// Error state
	const [errors, setErrors] = useState({
		phoneNumber: "",
		otp: "",
	});

	// Loading states
	const [isSendingOTP, setIsSendingOTP] = useState(false);
	const [isUpdatingNumber, setIsUpdatingNumber] = useState(false);

	// OTP visibility state
	const [showOtpInput, setShowOtpInput] = useState(false);

	// Handle phone number input change
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, phoneNumber: value }));
    setErrors((prev) => ({ ...prev, phoneNumber: "" })); // Reset phone number errors
}

	// Handle OTP input change
	function handleOtpChange(value: string) {
		setForm((prev) => ({ ...prev, otp: value }));
		setErrors((prev) => ({ ...prev, otp: "" })); // Reset OTP errors
	}

	// Send OTP
	async function sendOtp() {
		if (!form.phoneNumber) {
			setErrors((prev) => ({
				...prev,
				phoneNumber: "Phone number is required.",
			}));
			return;
		}

		setIsSendingOTP(true);
		try {
			const response = await $api.auth.user.confirm_phone_login({
				phoneNumber: `${form.code}${form.phoneNumber}`,
			});
			toast.success("OTP sent successfully.");
			setShowOtpInput(true); // Show OTP input after successful OTP sending
		} catch (error: any) {
			setErrors((prev) => ({
				...prev,
				phoneNumber: error.error?.phoneNumber || "Failed to send OTP.",
			}));
		} finally {
			setIsSendingOTP(false);
		}
	}

	// Update phone number
	async function updateNumber() {
		if (!form.otp) {
			setErrors((prev) => ({
				...prev,
				otp: "OTP is required.",
			}));
			return;
		}

		setIsUpdatingNumber(true);
		try {
			const response = await $api.auth.user.account.update({
				phoneNumber: form.phoneNumber,
				otp: form.otp,
			});
			toast.success(response.message || "Phone number updated successfully.");
			await getMe();
			setIsDialogOpen(false); // Close dialog on success
		} catch (error: any) {
			setErrors((prev) => ({
				...prev,
				otp: error.error?.otp || "Failed to update phone number.",
			}));
		} finally {
			setIsUpdatingNumber(false);
		}
	}

	return (
		<div>
			<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AlertDialogTrigger asChild>
					<Button variant="link">Edit</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className="sm:max-w-[425px]">
					<AlertDialogHeader>
						<AlertDialogTitle>Edit Phone Number</AlertDialogTitle>
						<AlertDialogDescription>
							Change your phone number and verify it with an OTP.
						</AlertDialogDescription>
					</AlertDialogHeader>

					{showOtpInput ? (
						<div className="space-y-4">
							<Input
								className="border-2"
								value={`${form.code} ${form.phoneNumber}`}
								disabled
							/>
							<InputOTPPattern
								setOtp={handleOtpChange}
								defaultValue={form.otp}
							/>
							<FormError error={errors.otp} />
							<ResendOTPButton onResend={sendOtp} loading={isSendingOTP} />
						</div>
					) : (
						<div>
							<PhoneInput value={form.phoneNumber} onChange={handleChange} />
							<FormError error={errors.phoneNumber} />
						</div>
					)}

					<AlertDialogFooter>
						{showOtpInput ? (
							<Button
								loading={isUpdatingNumber}
								onClick={updateNumber}
								type="submit"
								variant="primary"
							>
								Confirm
							</Button>
						) : (
							<Button
								loading={isSendingOTP}
								onClick={sendOtp}
								type="submit"
								variant="primary"
							>
							Confirm Number
							</Button>
						)}
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
