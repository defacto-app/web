"use client";
import React from "react";
import { z } from "zod";
import { useState } from "react";

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
import { InputOTPPattern } from "@/components/ui/InputOTPPattern";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { $admin_api } from "@/http/admin-endpoint";
import { setToken } from "@/utils/auth";

export default function AdminLogin() {
	const router = useRouter();

	const schema = z.object({
		email: z.string().email({
			message: "Invalid email address eg example@gmail.com",
		}),
		password: z.string().min(5, {
			message: "Password must be at least 5 characters long",
		}),
	});

	const [formData, setFormData] = useState({
		email: "kats.com.ng@gmail.com",
		otp: "336065",
	});
	const [isPending, setIsPending] = useState(false);

	const [userExists, setUserExists] = useState(false);

	function setOtp(otp: string) {
		setFormData({ ...formData, otp: otp });
	}

	const [errors, setErrors] = useState<{
		[key: string]: string;
	}>({});

	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async () => {
		setIsPending(true);
		try {
			const res = await $admin_api.auth.login({
				email: formData.email,
				otp: formData.otp,
			});
			// save to local storage
			setToken("admin", res.token);

			// Send token to the server to set the cookie
			await fetch("/api/auth/admin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					token: res.token,
				}),
			});

			toast.success("Login successful");

			router.push("/admin/orders");

			setIsPending(false);
		} catch (error: any) {
			setIsPending(false);

			toast.error(error.message);
		}
	};

	async function sendEmailOtp() {
		const body = {
			email: "kats.com.ng@gmail.com",
		};
		setIsPending(true);

		try {
			const res = await $admin_api.auth.sendEmailOtp(body);
			setIsPending(false);

			toast.success("OTP sent to your email");
		} catch (error) {
			console.log(error);

			setIsPending(false);
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="mx-auto max-w-lg">
				<CardHeader>
					<CardDescription className={`text-center`}>
						Administrator Access
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							{formData.email}
							<div className={"flex gap-x-2"}>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="m@example.com"
									required
									value={formData.email}
									onChange={handleInputChange}
								/>
								<Button
									onClick={sendEmailOtp}
									variant={"outline"}
									className={`w-20`}
								>
									Send OTP
								</Button>
							</div>

							{errors.email && (
								<p className={`text-red-500 p-4`}>{errors.email}</p>
							)}
						</div>
						<InputOTPPattern setOtp={setOtp} defaultValue={formData.otp} />
						{errors.otp && <p className={"text-red-500 p-4"}>{errors.otp}</p>}
						<Button
							variant="primary"
							loading={isPending}
							onClick={handleSubmit}
							type="submit"
							className="w-full"
						>
							Login
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function ErrorMsg() {
	return <div>page</div>;
}

export const runtime = "edge";
