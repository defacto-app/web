"use client";
import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { $api } from "@/http/endpoints";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/FormError";
import { InputOTPPattern } from "@/components/ui/InputOTPPattern";
import { useAuthContext } from "@/app/provider/auth.context";
import { useAtomAuthContext } from "@/app/store/authAtom";

const PhoneNumberValidation = () => {
	const { setCurrentStep } = useAtomAuthContext();
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
			const res = await $api.auth.user.phone_login({
				phoneNumber: `${form.code}${form.phoneNumber}`,
				otp: form.otp,
			});

			setState({
				loading: false,
			});
			setCurrentStep("success");
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
						<p>
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

						<div className="flex justify-center">
							<Button
								loading={state.loading}
								onClick={login}
								variant="primary"
								className=" w-96 h-10 mt-4"
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
							className="w-full"
							value={form.phoneNumber}
							onChange={handleChange}
						/>
					</div>
					<FormError error={errors.phoneNumber} />
					<div className="mb-6 grid place-content-center">
						<Button
							loading={state.loading}
							onClick={confirm_phone_login}
							variant="primary"
							className="w-96 h-10 mt-4"
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
