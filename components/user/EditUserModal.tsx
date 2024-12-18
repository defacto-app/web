import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogCancel,
	AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtomAuthContext } from "@/app/store/authAtom";
import { $api } from "@/http/endpoints";
import { toast } from "react-toastify";
import { InputOTPPattern } from "../ui/InputOTPPattern";
import ResendOTPButton from "@/app/components/ResendOTPButton";
import FormError from "../ui/FormError";

// Define Zod schema for form validation
const formSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.min(2, "Name must be at least 2 characters"),
	email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function EditUserModal() {
	const { authUser, setAuthUser } = useAtomAuthContext();
	const [isOpen, setIsOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// Initialize React Hook Form with Zod schema
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
			const res = await $api.auth.user.account.updateEmail({
				name: data.name,
				email: data.email,
			});

			// Update local auth user state

			toast.success("Account details updated successfully");
			setIsOpen(false);
		} catch (error: any) {
			console.error("Update failed:", error);
			toast.error(error.message || "Failed to update account details");
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		reset({
			name: authUser.firstName || "",
			email: authUser.email || "",
		});
		setIsOpen(false);
	};

	useEffect(() => {
		if (isOpen) {
			reset({
				name: authUser.firstName || "",
				email: authUser.email || "",
			});
		}
	}, [isOpen, reset, authUser]);

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="link">Edit</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Edit Profile</AlertDialogTitle>
					<AlertDialogDescription>
						Update your account details below
					</AlertDialogDescription>
				</AlertDialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							{...register("name")}
							className={errors.name ? "border-red-500" : ""}
							disabled={loading}
						/>

						<FormError error={errors.name?.message || ""} />
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							{...register("email")}
							className={errors.email ? "border-red-500" : ""}
							disabled={loading}
						/>
						<FormError error={errors.email?.message || ""} />
					</div>

					<AlertDialogFooter>
						<AlertDialogCancel
							type="button"
							onClick={handleCancel}
							disabled={loading}
						>
							Cancel
						</AlertDialogCancel>
						<Button
							loading={loading}
							type="submit"
							disabled={loading}
							variant="primary"
						>
							Save changes
						</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
}
