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
		phoneNumber: isDev ? authUser.phoneNumber : "08102289245",
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
	function resetForm() {
		setForm({ code: "+234", phoneNumber: "", otp: "" });
		setErrors({ phoneNumber: "", otp: "" });
		setShowOtpInput(false);
	}
	function closeDialog() {
		setIsDialogOpen(false);
		resetForm();
	}
	const isValidPhoneNumber = (phone: string) =>
		/^\d{10,15}$/.test(phone.replace(/\s/g, "")); // Adjust regex to match your expected format

	// Send OTP
	async function sendOtp() {
		if (!isValidPhoneNumber(form.phoneNumber)) {
			setErrors((prev) => ({
				...prev,
				phoneNumber: "Invalid phone number format.",
			}));
			return;
		}

		setIsSendingOTP(true);
		try {
		const res = 	await $api.auth.user.account.update_phone_number({
			phoneNumber: `${form.code}${form.phoneNumber}`,
			});
			console.log(res.message);
			toast.success(res.message || "OTP sent successfully.");
			setShowOtpInput(true);
		} catch (error: any) {

			console.log(error.message);
			setErrors((prev) => ({
				...prev,
				phoneNumber: error.message || "Failed to send OTP.",
			}));
		} finally {
			setIsSendingOTP(false);
		}
	}

	async function updateNumber() {
		if (!form.otp) {
			setErrors((prev) => ({ ...prev, otp: "OTP is required." }));
			return;
		}

		setIsUpdatingNumber(true);
		try {
			const response = await $api.auth.user.account.verify_phone_number({
				phoneNumber: form.phoneNumber,
				otp: form.otp,
			});
			toast.success(response.message || "Phone number updated successfully.");
			await getMe();
			closeDialog();
		} catch (error: any) {
			setErrors((prev) => ({
				...prev,
				otp: error?.response?.data?.message || "Failed to verify OTP.",
			}));
		} finally {
			setIsUpdatingNumber(false);
		}
	}

	// Update phone number

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
