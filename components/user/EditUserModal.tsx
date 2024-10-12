import React from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
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
				<AlertDialogContent className="sm:max-w-[425px]">
					<AlertDialogHeader>
						<AlertDialogTitle>Edit</AlertDialogTitle>
						<AlertDialogDescription>
							Make changes to your profile here. Click save when you're done.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input
								id="name"
								defaultValue="Jay Jay Okocha"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
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
						<Button type="submit" variant="primary">
							Save changes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
