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

const PhoneNumberValidation = () => {
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

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newValue = event.target.value;

		setForm({
			...form,
			phoneNumber: newValue,
		});
	}

	async function confirm_phone_login(
		event: React.MouseEvent<HTMLButtonElement>,
	) {
		setState({
			loading: true,
		});
		event.preventDefault();

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

			console.log(res);
			setState({
				...state,
				showOtp: true,
				loading: false,
			});
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

	async function login(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		// 894150

		setErrors({
			phoneNumber: "",
			otp: "",
		});

		setState({
			loading: true,
		});

		try {
			// setCurrentStep("login-success");

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
			// setIsLoggedIn(true);
			setIsLoggedIn(true);
			getMe();

			// setCurrentStep("success");
		} catch (error: any) {
			console.log(error, "otp error");

			// console.log(error);
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
				<div className={`flex justify-center`}>
					<div>
						<p className={`text-gray-500`}>
							{form.code} {form.phoneNumber}
						</p>
						<InputOTPPattern
							setOtp={(otp: string) => {
								setForm({
									...form,
									otp,
								});
							}}
							defaultValue={form.otp}
						/>
						<FormError error={errors.otp} />

						<div className="flex justify-between items-center">
							<Button
								loading={state.loading}
								onClick={login}
								variant="primary"
								className="w-full mt-4"
							>
								Login
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div>
					<div className={`flex items-center gap-x-2`}>
						<div className={`border py-2 px-3 rounded-full flex`}>
							<span>🇳🇬</span>
							<span>+234</span>
						</div>
						<Input
							className="md:w-full"
							value={form.phoneNumber}
							onChange={handleChange}
						/>
					</div>
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

export default PhoneNumberValidation;
