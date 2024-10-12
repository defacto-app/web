"use client";

import type React from "react";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isDev } from "@/config/env";
import { $api } from "@/http/endpoints";
import FormError from "@/components/ui/FormError";
import PasswordInput from "@/components/ui/PasswordInput";
import { setToken } from "@/utils/auth";
import { toast } from "react-toastify";
import { useAtomAuthContext } from "@/app/store/authAtom";

function Email() {
	const authSteps = [
		{
			id: "default",
			title: "Let's start with your email",
			description: `We will check if you already have an account, if not, we'll create a new one.`,
		},
		{
			id: "new-user",
			title: "Create a password",
			description: "Add a way to secure your account.",
		},

		{
			id: "existing-user",
			title: `Welcome back! <br/>Enter your password`,
			description: "Use your password to log in to your existing account.",
		},
	];

	type authState = "default" | "new-user" | "existing-user";
	const [authState, setAuthState] = useState<authState>("default");
	const { setCurrentStep, setIsLoggedIn, getMe,setModalOpen } = useAtomAuthContext();

	const getCurrentStep = () => {
		return authSteps.find((step) => step.id === authState);
	};

	const currentStepDetails = getCurrentStep();

	const [formData, setFormData] = useState({
		email: isDev ? "kats.com.ng@gmail.com" : "",
		password: isDev ? "123456" : "",
	});

	const [errors, setErrors] = useState<{
		[key: string]: string;
	}>({});

	const [loading, setLoading] = useState<boolean>(false);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const check_email_exists = async () => {
		setLoading(true);

		try {
			const res = await $api.auth.user.email_exists({
				email: formData.email,
			});

			if (res.data.exists) {
				setAuthState("existing-user");
			} else {
				setAuthState("new-user");
			}

			setLoading(false);
		} catch (error: any) {
			console.log(error);

			setErrors({
				...errors,
				email: error.error.email,
			});

			setLoading(false);
		}
	};

	const login_user = async () => {
		setLoading(true);
		try {
			setCurrentStep("login-success");

			const res = await $api.auth.user.email_login({
				email: formData.email,
				password: formData.password,
			});

			setToken("user", res.data.token);

			// Send token to the server to set the cookie
			await fetch("/api/auth/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: res.data.token,
				}),
			});

			console.log("Current step after login:", "login-success");
			getMe();


			setLoading(false);
			// toast.success("Login Successful");
		} catch (error: any) {
			setErrors({
				...errors,
				password: error.password,
			});
			toast.error(error.message);

			setLoading(false);
		}
	};
	const register_user = async () => {
		setLoading(true);
		console.log("Email Submitted");
		setCurrentStep("registration-success");

		try {
			const res = await $api.auth.user.email_register({
				email: formData.email,
				password: formData.password,
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

			toast.success("Registration Succesful");

			setLoading(false);
			getMe();


			// setCurrentStep("success");
		} catch (error: any) {
			console.log(error);

			setErrors({
				...errors,
				password: error.error.password,
			});

			setLoading(false);
		}
	};

	return (
		<div>
			<CardContent>
				<div className={`py-4 `}>
					<div className="lg:text-xl font-bold">
						{currentStepDetails?.title.split("<br/>").map((line, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<span key={index}>
								{line}
								{index <
									currentStepDetails?.title.split("<br/>").length - 1 && <br />}
							</span>
						))}
					</div>

					<CardDescription className="text-left whitespace-pre-wrap">
						{currentStepDetails?.description}
					</CardDescription>
				</div>
				<div>
					{authState === "default" && (
						<div className=" py-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								required
								value={formData.email}
								onChange={handleInputChange}
							/>

							<FormError error={errors.email}/>
							<div className={`flex justify-center`}>
								<Button
									loading={loading}
									variant="primary"
									onClick={check_email_exists}
									type="button"
									className="w-72 mt-4"
								>
									Continue
								</Button></div>
							</div>
							)}

							{
								// Show password field if user is existing
								authState === "existing-user" && (
									<div className=" py-2">
										<Label htmlFor="password">Password</Label>
										<PasswordInput
											placeholder="Enter your password"
											name="password"
											value={formData.password}
											handleInputChange={handleInputChange}
											required
										/>
										<FormError error={errors.password}/>

										<div className={`flex justify-center`}>
											<Button
												loading={loading}
												variant="primary"
												onClick={login_user}
												type="button"
												className="w-72 mt-4"
											>
												Continue
											</Button>
										</div>
									</div>
								)
							}
							{
								// Show password field if user is new
								authState === "new-user" && (
									<div className=" py-2">
										<Label htmlFor="password">Password</Label>
										<PasswordInput
											placeholder="Enter your password"
											name="password"
											value={formData.password}
											handleInputChange={handleInputChange}
											required
										/>
										<FormError error={errors.password}/>

										<Button
											loading={loading}
											variant="primary"
											onClick={register_user}
											type="button"
											className="w-full mt-4"
										>
											Continue
										</Button>
									</div>
								)
							}
						</div>
						</CardContent>
						</div>
						);
					}

					export default Email;
