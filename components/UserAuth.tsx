"use client";
import React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import SigninModal from "./auth/SigninModal";
import { Button } from "@/components/ui/button";

export default function UserAuth() {
	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger className="w-32 h-10 bg-blue-500 rounded-full text-white" >
					{/* <User className="text-primary-600"/> */}

					Get Started
				</AlertDialogTrigger>
				<AlertDialogContent>
					<SigninModal />
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
