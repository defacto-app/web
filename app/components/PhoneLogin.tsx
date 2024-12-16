"use client";
import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { $api } from "@/http/endpoints";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/FormError";
import { InputOTPPattern } from "@/components/ui/InputOTPPattern";
import { useAtomAuthContext } from "@/app/store/authAtom";
import { setToken } from "@/utils/auth";
import { toast } from "react-toastify";
import ResendOTPButton from "@/app/components/ResendOTPButton";
import PhoneInput from "./PhoneInput";

const PhoneLogin = () => {
	const { setCurrentStep, getMe, setIsLoggedIn } = useAtomAuthContext();

	const [form, setForm] = useState<any>({
		code: "+234",
		phoneNumber: "08063145125",
		otp: "",
	});

	const [errors, setErrors] = useState<any>({
		phoneNumber: "",
		otp: "",
	});

	const [state, setState] = useState<any>({
		loading: false,
		error: "",
		showOtp: false,
		login_success: false,
	});

	// Handle input change
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newValue = event.target.value;

		setForm({
			...form,
			phoneNumber: newValue,
		});
	}

	// Function to send OTP
	async function confirm_phone_login() {
		setState({
			...state, // Preserve the current state
			loading: true,
		});

		setErrors({
			phoneNumber: "",
			otp: "",
		});

		try {
			const res = await $api.auth.user.confirm_phone_login({
				phoneNumber: `${form.code}${form.phoneNumber}`,
			});

			if (res.success) {
				console.log("OTP sent successfully");
			}

			setState({
				...state,
				showOtp: true, // Ensure this remains true
				loading: false,
			});
			toast.success("OTP sent successfully");
		} catch (error: any) {
			console.log(error, "error.error");
			setErrors({
				...errors,
				phoneNumber: error.error.phoneNumber,
			});

			setState({
				...state,
				loading: false,
			});
		}
	}

	// Function to log in
	async function login(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		setErrors({
			phoneNumber: "",
			otp: "",
		});

		setState({
			loading: true,
		});

		try {
			const res = await $api.auth.user.phone_login({
				phoneNumber: `${form.code}${form.phoneNumber}`,
				otp: form.otp,
			});

			setToken("user", res.data.token);

			await fetch("/api/auth/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: res.data.token,
				}),
			});

			toast.success("Login Successful");

			setState({
				loading: false,
			});
			setIsLoggedIn(true);
			getMe();
			setCurrentStep("login-success");
		} catch (error: any) {
			console.log(error, "otp error");

			setErrors({
				...errors,
				otp: error.error.otp,
			});

			setState({
				...state,
				loading: false,
			});
		}
	}

	return (
		<div>
			{state.showOtp ? (
				<div className={``}>
					<div>
						<p className={`text-gray-500`}></p>
						<div className={`space-y-4`}>
							<div>
								<Input
									className={`border-2`}
									value={`${form.code} ${form.phoneNumber}`}
									disabled={true}
								/>
							</div>
							<div className={`flex items-center gap-x-4`}>
								<InputOTPPattern
									setOtp={(otp: string) => {
										setForm({
											...form,
											otp,
										});
									}}
									defaultValue={form.otp}
								/>
								{/* Replace existing resend button with ResendOTPButton */}
								<ResendOTPButton
									onResend={confirm_phone_login}
									loading={state.loading}
								/>
							</div>
						</div>
						<FormError error={errors.otp} />

						<div className="flex justify-center items-center">
							<Button
								loading={state.loading}
								onClick={login}
								variant="primary"
								className="w-72 mt-4"
							>
								Login
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div>
					<PhoneInput value={form.phoneNumber} onChange={handleChange} />
					<FormError error={errors.phoneNumber} />
					<div className="flex justify-center">
						<Button
							loading={state.loading}
							onClick={confirm_phone_login}
							variant="primary"
							className="w-72  mt-4"
						>
							Continue with SMS
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PhoneLogin;
