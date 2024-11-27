import { useState } from "react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { $admin_api } from "@/http/admin-endpoint";
import { toast } from "react-toastify";
import { ErrorMessage } from "@/app/components/ErrorMessage";

export default function CreateUserDialog() {
	const [formData, setFormData] = useState({
		email: "",
		phoneNumber: "",
		firstName: "",
		lastName: "",
		password: "",
		role: "customer",
	});
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleInputChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleRoleChange = (value: any) => {
		setFormData((prev) => ({
			...prev,
			role: value,
		}));
	};

	// Add field errors state

	// Update handleSubmit to handle validation errors
	const handleSubmit = async () => {
		setLoading(true);
		setError("");
		setFieldErrors({}); // Reset field errors

		try {
			const response = await $admin_api.users.create({
				...formData,
			});

			// Check if response contains validation errors
			if (response.data?.errors) {
				setFieldErrors(response.data.errors);
				return;
			}

			toast.success("User created successfully");

			// Reset form and close dialog on success
			setFormData({
				email: "",
				phoneNumber: "",
				firstName: "",
				lastName: "",
				password: "",
				role: "customer",
			});
		} catch (err: any) {
			if (err.error) {
				setFieldErrors(err.error);
			} else {
				toast.error(err.message || "Failed to create user");
				setError(err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant={`outline`} className="gap-2">
					<PlusCircle className="w-4 h-4" />
					Create User
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent className="max-w-2xl  py-10 md:h-[500px]">
				<AlertDialogHeader>
					<AlertDialogTitle>Create New User</AlertDialogTitle>
				</AlertDialogHeader>

				<div className="grid grid-cols-2 gap-4 py-4">
					<div className="space-y-2">
						<Label htmlFor="firstName">First Name</Label>
						<Input
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleInputChange}
							placeholder="First name"
						/>
						<ErrorMessage
							fieldName="firstName"
							validationErrors={fieldErrors}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="lastName">Last Name</Label>
						<Input
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleInputChange}
							placeholder="Doe"
						/>
						<ErrorMessage fieldName="lastName" validationErrors={fieldErrors} />
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="john@example.com"
						/>
						<ErrorMessage fieldName="email" validationErrors={fieldErrors} />
					</div>

					<div className="space-y-2">
						<Label htmlFor="phoneNumber">Phone Number</Label>
						<Input
							id="phoneNumber"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleInputChange}
							placeholder="08012345678"
						/>
						<ErrorMessage
							fieldName="phoneNumber"
							validationErrors={fieldErrors}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleInputChange}
							placeholder="••••••••"
						/>
						<ErrorMessage fieldName="password" validationErrors={fieldErrors} />
					</div>

					<div className="space-y-2">
						<Label htmlFor="role">Role</Label>
						<Select
							name="role"
							value={formData.role}
							onValueChange={handleRoleChange}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="customer">Customer</SelectItem>
								<SelectItem value="admin">Admin</SelectItem>
								<SelectItem value="driver">Driver</SelectItem>
								<SelectItem value="manager">Manager</SelectItem>
								<SelectItem value="staff">Staff</SelectItem>
							</SelectContent>
						</Select>
						<ErrorMessage fieldName="role" validationErrors={fieldErrors} />
					</div>
				</div>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button variant={`primary`} onClick={handleSubmit} disabled={loading}>
						{loading ? "Creating..." : "Create User"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
