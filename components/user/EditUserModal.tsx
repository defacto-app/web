import React from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";

export default function EditUserModal() {
	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="link">Edit</Button>
				</AlertDialogTrigger>
				<AlertDialogContent className={`h-[400px]`}>
					<AlertDialogHeader>
						<AlertDialogTitle>Edit</AlertDialogTitle>
						<AlertDialogDescription>
							Update your account details
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4 py-4">
						<div >
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								defaultValue="Jay Jay Okocha"
								className="col-span-3"
							/>
						</div>
						<div >
							<Label htmlFor="user-emai" className="text-right">
								Email
							</Label>
							<Input
								id="username"
								defaultValue="jayjayokocha@gmail.com"
								className="col-span-3"
							/>
						</div>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<Button type="submit" variant="primary">
							Save changes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
