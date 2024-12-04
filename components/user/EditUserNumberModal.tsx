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
import { useMutation } from "react-query";

export default function EditUserNumberModal() {
	const { getMe, authUser } = useAtomAuthContext();

	const [loading, setLoading] = useState(false);

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [form, setForm] = useState<any>({
		code: "+234",
		phoneNumber: isDev ? authUser.phoneNumber || "08063456622" : "",
		otp: "",
	});

	const [errors, setErrors] = useState<any>({
		phoneNumber: "",
		otp: "",
	});

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newValue = event.target.value;

		setForm({
			...form,
			phoneNumber: newValue,
		});
	}

	const updateNumber = () => {
		updatePhoneMutation.mutate(form.phoneNumber);
	};

	const updatePhoneMutation = useMutation(
		(phoneNumber: string) => $api.auth.user.account.update({ phoneNumber }),
		{
			onSuccess: async (response) => {
				await getMe();
				toast.success(response.message);
				setIsDialogOpen(false);
			},
			onError: (error: any) => {
				toast.error(
					error?.response?.data?.message || "Failed to update phone number",
				);
				setErrors((prev: any) => ({
					...prev,
					phoneNumber:
						error?.response?.data?.message || "Failed to update phone number",
				}));
			},
		},
	);

	return (
		<div>
			<div>
				<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<AlertDialogTrigger asChild>
						<Button variant="link">Edit</Button>
					</AlertDialogTrigger>
					<AlertDialogContent className="sm:max-w-[425px]">
						<AlertDialogHeader>
							<AlertDialogTitle>Edit</AlertDialogTitle>
							<AlertDialogDescription>
								Change your phone number
							</AlertDialogDescription>
						</AlertDialogHeader>
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
						<AlertDialogFooter>
							<Button
								loading={updatePhoneMutation.isLoading}
								onClick={updateNumber}
								type="submit"
								variant="primary"
							>
								Confirm
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
