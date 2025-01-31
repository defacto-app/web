"use client";
import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { contactSchema } from "@/lib/validators";
import PhoneInput from "@/app/components/PhoneInput";
import { $api } from "@/http/endpoints";

// Define Zod schema

function ContactForm() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneNumber: "",
		message: "",
	});

	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const validatedData = contactSchema.parse(formData);
			console.log("Valid form data:", validatedData);

			// Clear any previous errors
			setValidationErrors({});

			const response = await $api.guest.contact(validatedData);

			console.log(response);

			// Handle successful submission (e.g., API call)
			// await submitForm(validatedData);
		} catch (error) {
			if (error instanceof z.ZodError) {
				// Convert Zod errors to validation errors object
				const errors = error.errors.reduce(
					(acc, curr) => {
						acc[curr.path[0]] = curr.message;
						return acc;
					},
					{} as Record<string, string>,
				);

				setValidationErrors(errors);
			}
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear validation error when user starts typing
		if (validationErrors[name]) {
			setValidationErrors((prev) => ({
				...prev,
				[name]: "",
			}));
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
			>
				<div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
					<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
						{/* First Name */}
						<div className="sm:col-span-2">
							<Label
								htmlFor="first-name"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Full name
							</Label>
							<div className="mt-2.5">
								<Input
									type="text"
									name="fullName"
									id="first-name"
									autoComplete="name"
									value={formData.fullName}
									onChange={handleInputChange}
								/>
								<ErrorMessage
									fieldName="fullName"
									validationErrors={validationErrors}
								/>
							</div>
						</div>

						{/* Email */}
						<div className="sm:col-span-2">
							<Label
								htmlFor="email"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Email
							</Label>
							<div className="mt-2.5">
								<Input
									type="email"
									name="email"
									id="email"
									autoComplete="email"
									value={formData.email}
									onChange={handleInputChange}
								/>
								<ErrorMessage
									fieldName="email"
									validationErrors={validationErrors}
								/>
							</div>
						</div>

						{/* Phone Number */}
						<div className="sm:col-span-2">
							<Label
								htmlFor="phone-number"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Phone number
							</Label>
							<div className="mt-2.5">
								<PhoneInput
									value={formData.phoneNumber}
									onChange={handleInputChange}
								/>

								<ErrorMessage
									fieldName="phoneNumber"
									validationErrors={validationErrors}
								/>
							</div>
						</div>

						{/* Message */}
						<div className="sm:col-span-2">
							<Label
								htmlFor="message"
								className="block text-sm font-semibold leading-6 text-gray-900"
							>
								Message
							</Label>
							<div className="mt-2.5">
								<Textarea
									name="message"
									id="message"
									rows={4}
									value={formData.message}
									onChange={handleInputChange}
								/>
								<ErrorMessage
									fieldName="message"
									validationErrors={validationErrors}
								/>
							</div>
						</div>
					</div>
					<div className="mt-8 flex justify-end">
						<Button type="submit" variant="primary">
							Send message
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ContactForm;
