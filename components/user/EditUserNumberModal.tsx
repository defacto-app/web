import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FormError from "@/components/ui/FormError";

export default function EditUserNumberModal() {
	const [form, setForm] = useState<any>({
		code: "+234",
		phoneNumber: "08063145125",
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

	return (
		<div>
			<div>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="link">Edit</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Edit</DialogTitle>
							<DialogDescription>Change your phone number</DialogDescription>
						</DialogHeader>
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
						<DialogFooter>
							<Button type="submit" variant="primary">
								Confirm
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
