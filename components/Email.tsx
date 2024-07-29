"use client";

import type React from "react";
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
import { Mail } from "lucide-react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/app/provider/auth.context";
import { isDev } from "@/config/env";
import { $api } from "@/http/endpoints";
import FormError from "@/components/ui/FormError";
import PasswordInput from "@/components/ui/PasswordInput";
import {setToken} from "@/utils/auth";

function Email() {
	const authSteps = [
		{
			id: "default",
			title: "Let's start with your email",
			description: `We will check if you already have an account, if not, we'll create
a new one.`,
		},
		{
			id: "new-user",
			title: "Create a password",
			description: "Add a way to secure your account.",
		},

		{
			id: "existing-user",
			title: `Welcome back!\nEnter your password`,
			description: "Use your password to log in to your existing account.",
		},
	];

	type authState = "default" | "new-user" | "existing-user";
	const [authState, setAuthState] = useState<authState>("default");
	const { currentStep, setCurrentStep } = useAuthContext();

	const getCurrentStep = () => {
		return authSteps.find((step) => step.id === authState);
	};

	const currentStepDetails = getCurrentStep();
	const schema = z.object({
		email: z.string().email({
			message: "Invalid email address e.g example@gmail.com",
		}),
	});

	const [formData, setFormData] = useState({
		email: isDev ? "kats.com.ng@gmail.com" : "",
		password: isDev ? "123456" : "",
	});

	const [errors, setErrors] = useState<{
		[key: string]: string;
	}>({});

	const [loading, setLoading] = useState<boolean>(false);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		console.log("Email Submitted");
		setErrors({});
		const result = schema.safeParse(formData);
		if (!result.success) {
			const formattedErrors: any = {};
			for (const error of result.error.errors) {
				const fieldName = error.path[0];
				formattedErrors[fieldName] = error.message;
			}
			setErrors(formattedErrors);
			return;
		}
		setCurrentStep("success");

		setFormData({
			email: formData.email,
			password: "",
		});

		console.log("Email submitted:", formData.email);
	};

	const check_email_exists = async () => {
		setLoading(true);
		console.log("Email Submitted");

		try {
			const res = await $api.auth.user.email_exists({
				email: formData.email,
			});

			console.log(res.data.exists);

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
		console.log("Email Submitted");

		try {
		/*	const res = await $api.auth.user.email_login({
				email: formData.email,
				password: formData.password,
			});

			console.log(res);*/

			const data = await fetch(`/api/auth/user`, {
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const res = await data.json();

			const token = res.data.data.token

			console.log(res.data.data.token);

			setToken('user',token);

			setLoading(false);
			setCurrentStep("success");
		} catch (error: any) {
			console.log(error);

			setErrors({
				...errors,
				password: error.error.password,
			});

			setLoading(false);
		}
	};

	const register_user = async () => {
		setLoading(true);
		console.log("Email Submitted");

		try {
			const res = await $api.auth.user.email_register({
				email: formData.email,
				password: formData.password,
			});

			console.log(res);

			setLoading(false);

			setCurrentStep("success");
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
				<div className={`py-4 w-96`}>
					<div className="text-2xl  font-bold">
						{" "}
						{/* eslint-disable-next-line react/no-unescaped-entities */}
						{currentStepDetails?.title}
						{}
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

							<FormError error={errors.email} />
							<Button
								loading={loading}
								variant="primary"
								onClick={check_email_exists}
								type="button"
								className="w-full mt-4"
							>
								Continue
							</Button>
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
								<FormError error={errors.password} />

								<Button
									loading={loading}
									variant="primary"
									onClick={login_user}
									type="button"
									className="w-full mt-4"
								>
									Continue
								</Button>
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
								<FormError error={errors.password} />

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
